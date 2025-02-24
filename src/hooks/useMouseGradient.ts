import { useState, useEffect, useRef, RefObject } from 'react';

interface GradientEffect {
  degree: number;
  intensity: number;
  mousePosition: {
    x: number;
    y: number;
  };
}

export function useMouseGradient(elementRef?: RefObject<HTMLElement>) {
  const [gradientEffect, setGradientEffect] = useState<GradientEffect>({ 
    degree: 45,
    intensity: 0.5,
    mousePosition: { x: 0, y: 0 }
  });

  const frameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        // Calculate angle based on viewport center for all cards
        const dx = e.clientX - window.innerWidth / 2;
        const dy = e.clientY - window.innerHeight / 2;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        let intensity: number;

        if (elementRef?.current) {
          const rect = elementRef.current.getBoundingClientRect();
          const elementCenterX = rect.left + rect.width / 2;
          const elementCenterY = rect.top + rect.height / 2;
          
          // Calculate distance from element center for intensity only
          const distance = Math.sqrt(
            Math.pow(e.clientX - elementCenterX, 2) + 
            Math.pow(e.clientY - elementCenterY, 2)
          );
          
          // Calculate max distance based on viewport size
          const maxDistance = Math.sqrt(
            Math.pow(window.innerWidth / 2, 2) + 
            Math.pow(window.innerHeight / 2, 2)
          );
          
          // Smoother intensity falloff
          intensity = Math.max(0.2, Math.min(0.9, 1 - (distance / maxDistance)));
        } else {
          intensity = 0.5;
        }

        // Store raw mouse coordinates
        setGradientEffect(prev => ({
          degree: prev.degree + ((45 + angle * 0.7) - prev.degree) * 0.1,
          intensity: prev.intensity + (intensity - prev.intensity) * 0.1,
          mousePosition: {
            x: e.clientX,
            y: e.clientY
          }
        }));
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [elementRef]);

  return gradientEffect;
}