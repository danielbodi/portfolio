import React, { useEffect, useRef, useState } from 'react';
import { useMouseGradient } from '../../../hooks/useMouseGradient';
import { GradientControls, GradientSettings, defaultSettings } from '../gradient-controls/GradientControls';
import { read as readMotion } from './backgroundMotion';

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

  // Motion bus: an invisible presence that warps the wave field as it
  // passes, driven by route transitions and loading states.
  uniform vec2 u_presence;
  uniform float u_presence_amp;
  uniform float u_flow;
  // Accumulated field offset. Increasing it slides waves to the right.
  uniform float u_shift;

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
    
    // Domain warp around the travelling presence: the same wave field
    // deforms — nothing new is drawn on top of it. Presence stays in
    // screen space; the field slides underneath via u_shift.
    vec2 toward = st - u_presence;
    float d = length(toward);
    float swell = exp(-d * d * 9.0);
    vec2 warp = normalize(toward + vec2(0.0001)) * swell * u_presence_amp * 0.04;

    vec2 field = vec2(st.x - u_shift, st.y);
    vec2 st1 = (field + warp) * u_scale;
    vec2 st2 = (field - warp * 0.6) * u_scale2;
    
    // u_time is integrated on the CPU. Flow speeds the current frame only —
    // never scale accumulated time (that rewinds the field by session age).
    float t = u_time * u_time_scale;
    float n1 = noise(st1 * u_multx + t);
    float n2 = noise(st2 * u_multy + t * 0.5);

    // Punch contrast so the blobs read during a pulse, instead of flattening
    // into the mean (which made the field look empty).
    float punch = 1.0 + u_flow * 1.4;
    n1 = clamp(0.5 + (n1 - 0.5) * punch, 0.0, 1.0);
    n2 = clamp(0.5 + (n2 - 0.5) * punch, 0.0, 1.0);
    
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
    
    color = mix(backgroundColor, color, color);

    color += u_color1 * swell * u_flow * 0.035;
    
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

/**
 * Flow scales *rate*, not accumulated time. Multiplying `elapsed` by a
 * factor rewinds or fast-forwards the field by session age.
 */
const FLOW_TIME_BOOST = 1.6;
const MAX_FRAME_DT_SEC = 0.1;

function advanceFieldTime(
  now: number,
  flow: number,
  lastFrameRef: React.MutableRefObject<number>,
  fieldTimeRef: React.MutableRefObject<number>
): number {
  const prev = lastFrameRef.current;
  lastFrameRef.current = now;
  const dt =
    prev === 0 ? 0 : Math.min(MAX_FRAME_DT_SEC, Math.max(0, (now - prev) / 1000));
  const boost = Math.min(1, Math.max(0, flow)) * FLOW_TIME_BOOST;
  fieldTimeRef.current += dt * (1 + boost);
  return fieldTimeRef.current;
}

/** Live prefers-reduced-motion flag; when set, loops render one frame and stop. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

// Canvas 2D Fallback Component - Performance optimized for mobile
function Canvas2DFallbackBackground({ settings }: { settings: GradientSettings }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastFrameRef = useRef(0);
  const fieldTimeRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const frameSkipRef = useRef<number>(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Simplified noise function - optimized for mobile
  const noise = (x: number, y: number) => {
    // Simplified hash for better performance
    const hash = (x: number, y: number) => {
      const h = Math.sin(x * 12.9898 + y * 4.1414) * 43758.5453;
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

  // Draws one frame; the loop is scheduled separately so reduced motion
  // can render a single static field.
  const drawFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const now = performance.now();
    // Motion bus: per-pixel warp is too expensive at 30fps, so on mobile
    // flow speeds the waves and punches their contrast.
    const { flow, shiftX } = readMotion(now);
    const time = advanceFieldTime(now, flow, lastFrameRef, fieldTimeRef);
    
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
    const mobileTime = settings.time * 0.7;
    const brightness = settings.brightness;
    const punch = 1 + flow * 1.4;
    
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        // Normalize coordinates
        const st = [x / width - shiftX, y / height];
        
        // Apply simplified scales
        const st1 = [st[0] * mobileScale1, st[1] * mobileScale1];
        const st2 = [st[0] * mobileScale2, st[1] * mobileScale2];
        
        // Simplified noise calculations
        const rawN1 = noise(st1[0] * mobileMultX + time * mobileTime, st1[1] * mobileMultX + time * mobileTime);
        const rawN2 = noise(st2[0] * mobileMultY + time * mobileTime * 0.5, st2[1] * mobileMultY + time * mobileTime * 0.5);

        const n1 = Math.min(1, Math.max(0, 0.5 + (rawN1 - 0.5) * punch));
        const n2 = Math.min(1, Math.max(0, 0.5 + (rawN2 - 0.5) * punch));

        // Simplified color mixing
        const intensity1 = n1 * brightness * 0.8;
        const intensity2 = n2 * brightness * 0.8;
        
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

    drawFrame();
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
    if (!isVisible) return;
    lastFrameRef.current = performance.now();
    if (prefersReducedMotion) {
      // One static frame, no loop.
      drawFrame();
      return;
    }
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [settings, isVisible, prefersReducedMotion]);

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
  const lastFrameRef = useRef(0);
  const fieldTimeRef = useRef(0);
  const uniformLocationsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const [settings, setSettings] = useState<GradientSettings>(defaultSettings);
  const { mousePosition } = useMouseGradient();
  // The rAF loop reads the mouse from a ref so pointer movement never
  // tears down and restarts the loop (it used to restart on every move).
  const mousePositionRef = useRef(mousePosition);
  const [isVisible, setIsVisible] = useState(true);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [isMobile] = useState(() => isMobileDevice());
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    mousePositionRef.current = mousePosition;
  }, [mousePosition]);

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
        'u_noise', 'u_bw', 'u_bw2', 'u_time_scale', 'u_color1', 'u_color2',
        'u_presence', 'u_presence_amp', 'u_flow', 'u_shift'
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
    } catch {
      setWebglSupported(false);
      return false;
    }
  };

  // Draws one frame with current uniforms; scheduling happens in the effect.
  const drawFrame = () => {
    const gl = glRef.current;
    if (!gl) return;

    const now = performance.now();
    const uniforms = uniformLocationsRef.current;

    const mouse = mousePositionRef.current;
    const normalizedX = mouse.x / window.innerWidth;
    const normalizedY = 1.0 - (mouse.y / window.innerHeight);

    const motion = readMotion(now);
    const time = advanceFieldTime(now, motion.flow, lastFrameRef, fieldTimeRef);

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
    gl.uniform2f(uniforms.u_presence!, motion.presenceX, motion.presenceY);
    gl.uniform1f(uniforms.u_presence_amp!, motion.flow);
    gl.uniform1f(uniforms.u_flow!, motion.flow);
    gl.uniform1f(uniforms.u_shift!, motion.shiftX);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const render = () => {
    if (!glRef.current || !isVisible) return;
    drawFrame();
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

  // Render effect: starts the loop once per settings/visibility change.
  // Mouse position deliberately excluded — the loop reads it from a ref.
  useEffect(() => {
    if (!webglSupported || !isVisible) return;
    lastFrameRef.current = performance.now();
    if (prefersReducedMotion) {
      // One static frame, no loop.
      drawFrame();
      return;
    }
    render();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [settings, isVisible, webglSupported, prefersReducedMotion]);

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
        <Canvas2DFallbackBackground settings={settings} />
      )}
      
      {import.meta.env.DEV && (
        <GradientControls
          settings={settings}
          onChange={setSettings}
          onReset={() => setSettings(defaultSettings)}
        />
      )}
    </>
  );
}
