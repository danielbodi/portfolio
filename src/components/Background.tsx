import React, { useEffect, useRef, useState } from 'react';
import { useMouseGradient } from '../hooks/useMouseGradient';
import { GradientControls, GradientSettings, defaultSettings } from './GradientControls';

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  
  uniform float u_multx;
  uniform float u_multy;
  uniform float u_brightness;
  uniform float u_mouse_influence;
  uniform float u_scale;
  uniform float u_scale2;
  uniform float u_noise;
  uniform float u_bw;
  uniform float u_bw2;
  uniform float u_time_scale;
  uniform vec3 u_color1;
  uniform vec3 u_color2;

  // Simplified noise function for better performance
  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
      mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
      mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
    return res*res;
  }

  void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse;
    
    // Background color (dark theme)
    vec3 backgroundColor = vec3(0.165, 0.165, 0.196); // #2A2A32
    
    // Apply scales with fewer calculations
    vec2 st1 = st * u_scale;
    vec2 st2 = st * u_scale2;
    
    // Simplified noise calculation
    float n1 = noise(st1 * u_multx + u_time * u_time_scale);
    float n2 = noise(st2 * u_multy + u_time * u_time_scale * 0.5);
    
    // Optimized color mixing
    vec3 color = mix(
      u_color1 * n1,
      u_color2 * n2,
      0.5
    ) * u_noise * u_brightness;
    
    // Enhanced mouse interaction with larger radius and sharper falloff
    float dist = length(st - mouse);
    float spotlight = (1.0 - smoothstep(0.0, 0.3, dist)) * u_mouse_influence;
    
    // Use primary purple color for spotlight (#B490FF)
    vec3 spotlightColor = vec3(0.706, 0.565, 1.0);
    color = mix(color, spotlightColor, spotlight);
    
    // Mix with background color
    color = mix(backgroundColor, color, color);
    
    // Optimized B&W conversion
    float bw = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(color, vec3(bw), u_bw);
    color = mix(color, vec3(1.0 - bw), u_bw2);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(performance.now());
  const uniformLocationsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const [settings, setSettings] = useState<GradientSettings>(defaultSettings);
  const { mousePosition } = useMouseGradient();
  const [isVisible, setIsVisible] = useState(true);

  // Initialize WebGL with optimizations
  const initGL = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try WebGL with optimizations
    const gl = canvas.getContext('webgl', {
      alpha: false, // Disable alpha channel
      depth: false, // Disable depth buffer
      stencil: false, // Disable stencil buffer
      antialias: false, // Disable antialiasing
      preserveDrawingBuffer: false // Don't preserve buffer
    });
    
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    // Create and compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Create and link program
    const program = gl.createProgram();
    if (!program) return;
    programRef.current = program;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Cache uniform locations
    const uniforms = [
      'u_resolution', 'u_mouse', 'u_time', 'u_multx', 'u_multy',
      'u_brightness', 'u_mouse_influence', 'u_scale', 'u_scale2',
      'u_noise', 'u_bw', 'u_bw2', 'u_time_scale', 'u_color1', 'u_color2'
    ];
    
    uniforms.forEach(name => {
      uniformLocationsRef.current[name] = gl.getUniformLocation(program, name);
    });

    // Set up geometry once
    const vertices = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  };

  // Optimized render loop
  const render = () => {
    const gl = glRef.current;
    if (!gl || !isVisible) return;

    const time = (performance.now() - startTimeRef.current) / 1000;
    const uniforms = uniformLocationsRef.current;

    // Normalize mouse coordinates to [0,1] range and flip Y coordinate
    const normalizedX = mousePosition.x / window.innerWidth;
    const normalizedY = 1.0 - (mousePosition.y / window.innerHeight); // Flip Y coordinate

    // Update uniforms efficiently
    gl.uniform2f(uniforms.u_mouse!, normalizedX, normalizedY);
    gl.uniform1f(uniforms.u_time!, time);
    gl.uniform1f(uniforms.u_time_scale!, settings.time);
    gl.uniform1f(uniforms.u_multx!, settings.multx);
    gl.uniform1f(uniforms.u_multy!, settings.multy);
    gl.uniform1f(uniforms.u_brightness!, settings.brightness);
    gl.uniform1f(uniforms.u_mouse_influence!, settings.mouse);
    gl.uniform1f(uniforms.u_scale!, settings.scale);
    gl.uniform1f(uniforms.u_scale2!, settings.scale2);
    gl.uniform1f(uniforms.u_noise!, settings.noise);
    gl.uniform1f(uniforms.u_bw!, settings.bw);
    gl.uniform1f(uniforms.u_bw2!, settings.bw2);
    gl.uniform3f(uniforms.u_color1!, settings.red, settings.green, settings.blue);
    gl.uniform3f(uniforms.u_color2!, settings.red2, settings.green2, settings.blue2);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    animationFrameRef.current = requestAnimationFrame(render);
  };

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Setup effect
  useEffect(() => {
    initGL();
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render effect - now depends on settings and isVisible
  useEffect(() => {
    if (isVisible) {
      render();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [settings, isVisible, mousePosition]); // Added mousePosition as dependency

  // Handle resize
  const handleResize = () => {
    if (!canvasRef.current || !glRef.current) return;

    const canvas = canvasRef.current;
    const gl = glRef.current;

    // Use devicePixelRatio for proper scaling
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniformLocationsRef.current.u_resolution!, canvas.width, canvas.height);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: -1 }}
      />
      <GradientControls
        settings={settings}
        onChange={setSettings}
        onReset={() => setSettings(defaultSettings)}
      />
    </>
  );
}