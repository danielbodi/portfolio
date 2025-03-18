import { useState, useEffect, useRef, RefObject, useReducer } from 'react';

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
        
        const distance = Math.sqrt(
          Math.pow(x - elementCenterX, 2) + 
          Math.pow(y - elementCenterY, 2)
        );
        
        const maxDistance = Math.sqrt(
          Math.pow(window.innerWidth / 2, 2) + 
          Math.pow(window.innerHeight / 2, 2)
        );
        
        targetIntensity = Math.max(0.2, Math.min(0.9, 1 - (distance / maxDistance)));
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
      return {
        ...state,
        isAnimating: true,
        animationStartDegree: action.startDegree,
        animationProgress: 0
      };
      
    case 'UPDATE_ANIMATION': {
      // Calculate degree based on animation progress
      const rotationDegree = state.animationStartDegree + (720 * action.progress);
      
      return {
        ...state,
        degree: rotationDegree,
        animationProgress: action.progress
      };
    }
    
    case 'COMPLETE_ANIMATION':
      return {
        ...state,
        isAnimating: false
      };
      
    case 'RESET':
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
    springTension = 0.1 
  } = options;
  
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

  // Check for reduced motion preference
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

  // Handle mouse movement
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const now = performance.now();
      let x: number, y: number;
      
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
      if (prefersReducedMotion.current || performanceMode) {
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
    };

    // Setup handlers for both mouse and touch events
    document.addEventListener('mousemove', handlePointerMove as any, { passive: true });
    document.addEventListener('touchmove', handlePointerMove as any, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handlePointerMove as any);
      document.removeEventListener('touchmove', handlePointerMove as any);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [elementRef, throttleMs, performanceMode, springTension]);

  // Handle start/stop animation
  const startAnimation = (startDegree: number = 45) => {
    dispatch({ type: 'START_ANIMATION', startDegree });
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / 1500; // 1.5s animation
      
      dispatch({ type: 'UPDATE_ANIMATION', progress: Math.min(1, progress) });

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        dispatch({ type: 'COMPLETE_ANIMATION' });
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  };

  const resetAnimation = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    // Return only what's needed by consumers
    degree: state.degree,
    intensity: state.intensity,
    mousePosition: state.mousePosition,
    isAnimating: state.isAnimating,
    // Also expose animation controls
    startAnimation,
    resetAnimation
  };
}