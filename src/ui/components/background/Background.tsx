import React, { useEffect, useRef, useState } from 'react';
import { useMouseGradient } from '../../../hooks/useMouseGradient';
import { GradientControls, GradientSettings, defaultSettings } from '../gradient-controls/GradientControls';
import './Background.scss';

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

// Mobile detection utility - Conservative approach for actual mobile devices only
const isMobileDevice = () => {
  // Only detect actual mobile devices, not desktop browsers or touch-enabled desktops
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// CSS Mobile Fallback Component
function MobileFallbackBackground({ settings, mousePosition }: { 
  settings: GradientSettings; 
  mousePosition: { x: number; y: number } 
}) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  // Handle touch events for mobile interaction
  useEffect(() => {
    if (!fallbackRef.current) return;

    const element = fallbackRef.current;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      setIsInteracting(true);
      const touch = e.touches[0];
      setTouchPosition({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setTouchPosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsInteracting(false);
    };

    // Add touch event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (!fallbackRef.current) return;

    const element = fallbackRef.current;
    
    // Update CSS custom properties based on settings
    element.style.setProperty('--brightness', settings.brightness.toString());
    element.style.setProperty('--color1-r', Math.round(settings.red * 255).toString());
    element.style.setProperty('--color1-g', Math.round(settings.green * 255).toString());
    element.style.setProperty('--color1-b', Math.round(settings.blue * 255).toString());
    element.style.setProperty('--color2-r', Math.round(settings.red2 * 255).toString());
    element.style.setProperty('--color2-g', Math.round(settings.green2 * 255).toString());
    element.style.setProperty('--color2-b', Math.round(settings.blue2 * 255).toString());
    element.style.setProperty('--time-scale', settings.time.toString());
    element.style.setProperty('--mouse-influence', settings.mouse.toString());
    
    // Use touch position if interacting, otherwise use mouse position
    const activePosition = isInteracting ? touchPosition : mousePosition;
    const normalizedX = (activePosition.x / window.innerWidth) * 100;
    const normalizedY = (activePosition.y / window.innerHeight) * 100;
    element.style.setProperty('--mouse-x', `${normalizedX}%`);
    element.style.setProperty('--mouse-y', `${normalizedY}%`);
    
    // Add interaction state for enhanced effects
    element.style.setProperty('--interaction-state', isInteracting ? '1' : '0');
  }, [settings, mousePosition, touchPosition, isInteracting]);

  return (
    <div 
      ref={fallbackRef}
      className="mobile-background-fallback fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
      data-touching={isInteracting}
    >
      {/* Floating blob elements for additional animation */}
      <div className="floating-blob"></div>
      <div className="floating-blob"></div>
      <div className="floating-blob"></div>
    </div>
  );
}

// Canvas 2D Fallback Component - Performance optimized for mobile
function Canvas2DFallbackBackground({ settings, mousePosition }: { 
  settings: GradientSettings; 
  mousePosition: { x: number; y: number } 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(performance.now());
  const [isVisible, setIsVisible] = useState(true);
  const frameSkipRef = useRef<number>(0);

  // Simplified noise function - optimized for mobile
  const noise = (x: number, y: number) => {
    // Simplified hash for better performance
    const hash = (x: number, y: number) => {
      let h = Math.sin(x * 12.9898 + y * 4.1414) * 43758.5453;
      return Math.abs(h - Math.floor(h));
    };
    
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    
    // Simpler interpolation
    const ux = fx * fx * (3.0 - 2.0 * fx);
    const uy = fy * fy * (3.0 - 2.0 * fy);
    
    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);
    
    const i1 = a + (b - a) * ux;
    const i2 = c + (d - c) * ux;
    
    return i1 + (i2 - i1) * uy;
  };

  // Simple color mixing
  const mixColors = (color1: [number, number, number], color2: [number, number, number], t: number) => {
    return [
      color1[0] + (color2[0] - color1[0]) * t,
      color1[1] + (color2[1] - color1[1]) * t,
      color1[2] + (color2[2] - color1[2]) * t
    ] as [number, number, number];
  };

  // Performance-optimized animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    // Skip frames for better performance (30fps instead of 60fps)
    frameSkipRef.current = (frameSkipRef.current + 1) % 2;
    if (frameSkipRef.current !== 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const time = (performance.now() - startTimeRef.current) / 1000;
    
    // Background color
    const backgroundColor: [number, number, number] = [0.165, 0.165, 0.196];
    
    // Colors from settings (simplified)
    const color1: [number, number, number] = [settings.red, settings.green, settings.blue];
    const color2: [number, number, number] = [settings.red2, settings.green2, settings.blue2];
    
    // Increased step size for better performance (larger blocks)
    const step = Math.min(8, Math.max(4, Math.floor(width / 100))); // Adaptive step size
    
    // Reduced complexity settings for mobile
    const mobileScale1 = Math.min(settings.scale, 1.5);
    const mobileScale2 = Math.min(settings.scale2, 1.5);
    const mobileMultX = Math.min(settings.multx, 1.5);
    const mobileMultY = Math.min(settings.multy, 1.5);
    const mobileTime = settings.time * 0.7; // Slower animation for smoother performance
    
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        // Normalize coordinates
        const st = [x / width, y / height];
        
        // Apply simplified scales
        const st1 = [st[0] * mobileScale1, st[1] * mobileScale1];
        const st2 = [st[0] * mobileScale2, st[1] * mobileScale2];
        
        // Simplified noise calculations
        const n1 = noise(st1[0] * mobileMultX + time * mobileTime, st1[1] * mobileMultX + time * mobileTime);
        const n2 = noise(st2[0] * mobileMultY + time * mobileTime * 0.5, st2[1] * mobileMultY + time * mobileTime * 0.5);
        
        // Simplified color mixing
        const intensity1 = n1 * settings.brightness * 0.8;
        const intensity2 = n2 * settings.brightness * 0.8;
        
        let finalColor = mixColors(
          [color1[0] * intensity1, color1[1] * intensity1, color1[2] * intensity1],
          [color2[0] * intensity2, color2[1] * intensity2, color2[2] * intensity2],
          0.5
        );
        
        // No mouse interaction for better performance
        // (Disabled to improve scroll performance)
        
        // Apply noise multiplier
        finalColor = [
          finalColor[0] * settings.noise,
          finalColor[1] * settings.noise,
          finalColor[2] * settings.noise
        ];
        
        // Mix with background
        const colorIntensity = Math.min(1, Math.max(0, (finalColor[0] + finalColor[1] + finalColor[2]) / 3));
        finalColor = mixColors(backgroundColor, finalColor, colorIntensity);
        
        // Convert to 0-255 range
        const r = Math.round(Math.min(255, Math.max(0, finalColor[0] * 255)));
        const g = Math.round(Math.min(255, Math.max(0, finalColor[1] * 255)));
        const b = Math.round(Math.min(255, Math.max(0, finalColor[2] * 255)));
        
        // Fill larger pixel blocks for better performance
        for (let dy = 0; dy < step && y + dy < height; dy++) {
          for (let dx = 0; dx < step && x + dx < width; dx++) {
            const index = ((y + dy) * width + (x + dx)) * 4;
            data[index] = r;     // Red
            data[index + 1] = g; // Green
            data[index + 2] = b; // Blue
            data[index + 3] = 255; // Alpha
          }
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize with performance considerations
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Lower pixel ratio for better performance on mobile
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(pixelRatio, pixelRatio);
    }
  };

  // Setup and cleanup
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Animation loop with performance throttling
  useEffect(() => {
    if (isVisible) {
      animate();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [settings, isVisible]); // Removed mousePosition for better performance

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
}

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
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [isMobile] = useState(() => isMobileDevice());

  // Detect WebGL support - prioritize desktop experience
  useEffect(() => {
    // Desktop always gets WebGL if available - no compromises
    if (!isMobile) {
      const testCanvas = document.createElement('canvas');
      const testGl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      setWebglSupported(!!testGl);
      return;
    }
    
    // Mobile gets Canvas 2D fallback for better performance
    setWebglSupported(false);
  }, [isMobile]);

  // Initialize WebGL - EXACTLY as original
  const initGL = () => {
    const canvas = canvasRef.current;
    if (!canvas || webglSupported === false) return false;

    try {
      const gl = canvas.getContext('webgl', {
        alpha: false, 
        depth: false, 
        stencil: false, 
        antialias: false, 
        preserveDrawingBuffer: false 
      });
      
      if (!gl) {
        setWebglSupported(false);
        return false;
      }
      
      glRef.current = gl;

      // Shader creation and compilation - EXACTLY as original
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      if (!vertexShader || !fragmentShader) {
        setWebglSupported(false);
        return false;
      }

      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.shaderSource(fragmentShader, fragmentShaderSource);
      gl.compileShader(vertexShader);
      gl.compileShader(fragmentShader);

      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) ||
          !gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        setWebglSupported(false);
        return false;
      }

      const program = gl.createProgram();
      if (!program) {
        setWebglSupported(false);
        return false;
      }
      programRef.current = program;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        setWebglSupported(false);
        return false;
      }

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

      // Set up geometry
      const vertices = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const positionLocation = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      return true;
    } catch (error) {
      setWebglSupported(false);
      return false;
    }
  };

  // Original render loop - EXACTLY as before
  const render = () => {
    const gl = glRef.current;
    if (!gl || !isVisible) return;

    const time = (performance.now() - startTimeRef.current) / 1000;
    const uniforms = uniformLocationsRef.current;

    const normalizedX = mousePosition.x / window.innerWidth;
    const normalizedY = 1.0 - (mousePosition.y / window.innerHeight);

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

  // Setup effect - original behavior
  useEffect(() => {
    if (webglSupported === null) return;
    
    if (webglSupported) {
      const success = initGL();
      if (success) {
        handleResize();
        window.addEventListener('resize', handleResize);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (webglSupported) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [webglSupported]);

  // Render effect - original behavior
  useEffect(() => {
    if (webglSupported && isVisible) {
      render();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [settings, isVisible, mousePosition, webglSupported]);

  // Handle resize - original behavior
  const handleResize = () => {
    if (!canvasRef.current || !glRef.current) return;

    const canvas = canvasRef.current;
    const gl = glRef.current;

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
      {/* WebGL Canvas for desktop and supported browsers - EXACTLY as original */}
      {webglSupported && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full"
          style={{ zIndex: -1 }}
        />
      )}
      
      {/* Performance-optimized Canvas 2D fallback for mobile only */}
      {webglSupported === false && isMobile && (
        <Canvas2DFallbackBackground 
          settings={settings} 
          mousePosition={mousePosition} 
        />
      )}
      
      <GradientControls
        settings={settings}
        onChange={setSettings}
        onReset={() => setSettings(defaultSettings)}
      />
    </>
  );
}