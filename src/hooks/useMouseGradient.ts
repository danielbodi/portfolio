import { useEffect, useRef, RefObject, useReducer, useCallback } from 'react';

interface GradientState {
  degree: number;
  intensity: number;
  mousePosition: {
    x: number;
    y: number;
  };
  targetDegree: number;
  targetIntensity: number;
  isAnimating: boolean;
  animationStartDegree: number;
  animationProgress: number;
}

type GradientAction = 
  | { type: 'SET_POSITION'; x: number; y: number; elementRef?: RefObject<HTMLElement> }
  | { type: 'START_ANIMATION'; startDegree: number }
  | { type: 'UPDATE_ANIMATION'; progress: number }
  | { type: 'COMPLETE_ANIMATION' }
  | { type: 'RESET' };

interface UseMouseGradientOptions {
  throttleMs?: number;
  performanceMode?: boolean;
  springTension?: number;
  maxSpotlightDistance?: number;  // Maximum distance for spotlight effect in pixels
  intensityFalloff?: number;      // Controls how quickly intensity falls off (1-3)
}

// Springs create more natural animations
function springInterpolation(current: number, target: number, tension: number = 0.1): number {
  return current + (target - current) * tension;
}

// Reducer for managing gradient state
function gradientReducer(state: GradientState, action: GradientAction): GradientState {
  switch (action.type) {
    case 'SET_POSITION': {
      // Based on device position, calculate angle and intensity
      const { x, y, elementRef } = action;

      // Calculate angle based on viewport center
      const dx = x - window.innerWidth / 2;
      const dy = y - window.innerHeight / 2;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const targetDegree = 45 + angle * 0.7;
      
      // Calculate intensity
      let targetIntensity = 0.5;

      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from element center to mouse
        const distance = Math.sqrt(
          Math.pow(x - elementCenterX, 2) + 
          Math.pow(y - elementCenterY, 2)
        );
        
        // Get options from element's dataset if available, or use defaults
        const element = elementRef.current;
        const maxDistance = element.dataset.maxSpotlightDistance 
          ? parseInt(element.dataset.maxSpotlightDistance, 10) 
          : 600; // Default max spotlight distance (px)
        
        const falloff = element.dataset.intensityFalloff
          ? parseFloat(element.dataset.intensityFalloff)
          : 2; // Default falloff factor (squared)
        
        // Calculate relative distance (0-1+)
        const relativeDistance = distance / maxDistance;
        
        // Use exponential falloff for more natural spotlight effect
        // falloff of 2 = inverse square, higher = faster falloff
        const spotlightIntensity = Math.max(0, 1 - Math.pow(relativeDistance, falloff));
        
        // Apply min and max constraints - allow full range from 0 to 1
        targetIntensity = Math.max(0, Math.min(1, spotlightIntensity));
      }

      return {
        ...state,
        // Apply spring physics for smoother movement
        degree: springInterpolation(state.degree, targetDegree),
        intensity: springInterpolation(state.intensity, targetIntensity),
        targetDegree,
        targetIntensity,
        mousePosition: { x, y }
      };
    }
    
    case 'START_ANIMATION':
      if (state.isAnimating) {
        return state; // Prevent duplicating animation if already running
      }
      return {
        ...state,
        isAnimating: true,
        animationStartDegree: action.startDegree,
        animationProgress: 0
      };
      
    case 'UPDATE_ANIMATION': {
      if (!state.isAnimating) {
        return state; // Don't update if not animating
      }
      // Calculate degree based on animation progress
      const rotationDegree = state.animationStartDegree + (720 * action.progress);
      
      return {
        ...state,
        degree: rotationDegree,
        animationProgress: action.progress
      };
    }
    
    case 'COMPLETE_ANIMATION':
      if (!state.isAnimating) {
        return state; // Don't complete if not animating
      }
      return {
        ...state,
        isAnimating: false
      };
      
    case 'RESET':
      if (!state.isAnimating && state.degree === 45) {
        return state; // Avoid unnecessary updates
      }
      return {
        ...state,
        degree: 45,
        isAnimating: false,
        animationProgress: 0,
        animationStartDegree: 45
      };
      
    default:
      return state;
  }
}

export function useMouseGradient(
  elementRef?: RefObject<HTMLElement>, 
  options: UseMouseGradientOptions = {}
) {
  const { 
    throttleMs = 16, 
    performanceMode = false,
    springTension = 0.1,
    maxSpotlightDistance,
    intensityFalloff
  } = options;
  
  // Keep track of previous options to avoid unnecessary re-renders
  const optionsRef = useRef({ throttleMs, performanceMode, springTension, maxSpotlightDistance, intensityFalloff });
  
  // Keep track of animation state to avoid duplicate animations
  const animationRef = useRef<{
    animationFrame?: number,
    cleanup?: () => void,
    isRunning: boolean
  }>({ isRunning: false });
  
  // Use reducer for more organized state management
  const [state, dispatch] = useReducer(gradientReducer, {
    degree: 45,
    intensity: 0.5,
    mousePosition: { x: 0, y: 0 },
    targetDegree: 45,
    targetIntensity: 0.5,
    isAnimating: false,
    animationStartDegree: 45,
    animationProgress: 0
  });

  const frameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const lastTouchUpdateRef = useRef<number>(0);
  const mediaQueryRef = useRef<MediaQueryList | null>(null);
  const prefersReducedMotion = useRef<boolean>(false);

  // Check for reduced motion preference once
  useEffect(() => {
    mediaQueryRef.current = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQueryRef.current.matches;
    
    const updateMotionPreference = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    
    mediaQueryRef.current.addEventListener('change', updateMotionPreference);
    return () => {
      mediaQueryRef.current?.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  // Update options ref when they change
  useEffect(() => {
    optionsRef.current = { throttleMs, performanceMode, springTension, maxSpotlightDistance, intensityFalloff };
  }, [throttleMs, performanceMode, springTension, maxSpotlightDistance, intensityFalloff]);

  // Handle mouse movement with stable reference
  const handlePointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    const now = performance.now();
    let x: number, y: number;
    const { throttleMs } = optionsRef.current;
    
    // Handle both mouse and touch events
    if ('touches' in e) {
      // Skip if we're throttling and it's too soon for another update
      if (now - lastTouchUpdateRef.current < throttleMs) return;
      lastTouchUpdateRef.current = now;
      
      // Get position from touch
      const touch = e.touches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else {
      // Skip if we're throttling and it's too soon for another update
      if (now - lastUpdateRef.current < throttleMs) return;
      lastUpdateRef.current = now;
      
      // Get position from mouse
      x = e.clientX;
      y = e.clientY;
    }
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    // If user prefers reduced motion or performance mode is on, skip detailed calculations
    if (prefersReducedMotion.current || optionsRef.current.performanceMode) {
      // Update only position without complex calculations
      dispatch({ 
        type: 'SET_POSITION', 
        x,
        y
      });
      return;
    }

    // Use requestAnimationFrame for smoother updates
    frameRef.current = requestAnimationFrame(() => {
      dispatch({ 
        type: 'SET_POSITION', 
        x,
        y,
        elementRef
      });
    });
  }, [elementRef]);

  // Setup event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handlePointerMove as any, { passive: true });
    document.addEventListener('touchmove', handlePointerMove as any, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handlePointerMove as any);
      document.removeEventListener('touchmove', handlePointerMove as any);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [handlePointerMove]);

  // Function to start an animation - optimized for nav transitions
  const startAnimation = useCallback((startAngle: number = 45) => {
    if (animationRef.current.isRunning) {
      return; // Prevent duplicate animations
    }

    animationRef.current.isRunning = true;
    dispatch({ type: 'START_ANIMATION', startDegree: startAngle });

    // Get starting timestamp
    let startTime: number | null = null;
    const duration = 1000; // Animation duration in ms

    // Animation loop with timestamp
    const animate = (timestamp: number) => {
      // Initialize start time on first frame
      if (startTime === null) {
        startTime = timestamp;
      }

      // Calculate progress from 0 to 1
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Update animation state
      dispatch({ type: 'UPDATE_ANIMATION', progress });

      // Continue animation if not complete
      if (progress < 1) {
        animationRef.current.animationFrame = requestAnimationFrame(animate);
      } else {
        // Complete the animation
        dispatch({ type: 'COMPLETE_ANIMATION' });
        animationRef.current.isRunning = false;
      }
    };

    // Start the animation loop
    animationRef.current.animationFrame = requestAnimationFrame(animate);

    // Return cleanup function
    return () => {
      if (animationRef.current.animationFrame) {
        cancelAnimationFrame(animationRef.current.animationFrame);
        animationRef.current.isRunning = false;
      }
    };
  }, [dispatch]);

  // Function to reset animation state
  const resetAnimation = useCallback(() => {
    // Cancel any running animation
    if (animationRef.current.animationFrame) {
      cancelAnimationFrame(animationRef.current.animationFrame);
    }
    
    // Reset animation state
    dispatch({ type: 'RESET' });
    animationRef.current.isRunning = false;
  }, [dispatch]);

  // Function to force gradient values without requiring mouse movement
  const forceGradient = useCallback((forcedDegree: number = 45, forcedIntensity: number = 0.8) => {
    dispatch({ 
      type: 'SET_POSITION',
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });
    
    // Force the intensity higher to ensure gradient is visible
    if (forcedIntensity > 0) {
      state.intensity = forcedIntensity;
      state.targetIntensity = forcedIntensity;
    }
    
    // Force the degree to match specified value
    if (forcedDegree !== state.degree) {
      state.degree = forcedDegree;
      state.targetDegree = forcedDegree; 
    }
  }, [state, dispatch]);

  return {
    degree: state.degree,
    intensity: state.intensity,
    mousePosition: state.mousePosition,
    isAnimating: state.isAnimating,
    startAnimation,
    resetAnimation,
    forceGradient
  };
}