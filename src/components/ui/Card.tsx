import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { useMouseGradient } from '../../hooks/useMouseGradient';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'nested' | 'nav';
  isSticky?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  isSticky = false 
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { degree, intensity } = useMouseGradient(cardRef);
  const [initialDegree, setInitialDegree] = useState(45);
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (variant === 'nav') {
      if (isSticky && !shouldAnimate && !isInitialAnimationComplete) {
        setShouldAnimate(true);
      } else if (!isSticky) {
        setShouldAnimate(false);
        setIsInitialAnimationComplete(false);
        setInitialDegree(45);
      }
    }
  }, [variant, isSticky, shouldAnimate, isInitialAnimationComplete]);

  useEffect(() => {
    if (shouldAnimate) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / 1000;

        if (progress < 1) {
          setInitialDegree(45 + (720 * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setIsInitialAnimationComplete(true);
          setShouldAnimate(false);
          cancelAnimationFrame(animationFrame);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [shouldAnimate]);

  const isNested = variant === 'nested';
  const isNav = variant === 'nav';

  // Unified gradient colors for both nav and regular cards
  const startColor = isNested 
    ? `rgba(55, 55, 62, ${Math.max(0.5, 0.9 - intensity * 0.4)})`
    : `rgba(55, 55, 62, ${Math.max(0.3, 0.9 - intensity * 0.7)})`;
  const midColor = isNested
    ? `rgba(105, 100, 247, ${Math.min(0.5, intensity * 0.6)})`
    : `rgba(105, 100, 247, ${Math.min(0.6, intensity * 0.8)})`;
  const endColor = isNested
    ? `rgba(180, 144, 255, ${Math.min(0.6, intensity * 0.7)})`
    : `rgba(180, 144, 255, ${Math.min(1, intensity * 1.5)})`;

  // Different gradient distributions for nav and regular cards
  const gradientBackground = isNav
    ? `linear-gradient(${shouldAnimate ? initialDegree : isInitialAnimationComplete ? degree : 45}deg, ${startColor} 33%, ${midColor} 66%, ${endColor} 100%)`
    : `linear-gradient(${degree}deg, ${startColor} 66%, ${midColor} 88%, ${endColor} 100%)`;
  
  return (
    <div
      ref={cardRef}
      className={`rounded-[0.3125rem] ${isNested ? 'flex flex-1' : ''} relative ${className}`}
      style={{
        padding: isNested ? '1px' : isNav ? (isSticky ? '1px' : '0') : '1px',
        boxShadow: isNested 
          ? 'none' 
          : isNav 
            ? (isSticky ? `-8px 8px 40px 0px rgba(0, 0, 0, ${0.17 + intensity * 0.1})` : 'none')
            : `-8px 8px 40px 0px rgba(0, 0, 0, ${0.17 + intensity * 0.1})`,
        transition: 'padding 0.3s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
        background: 'transparent'
      }}
    >
      {/* Gradient background layer */}
      <div 
        className="absolute inset-0 rounded-[0.3125rem] transition-opacity duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
        style={{
          background: gradientBackground,
          opacity: isNav ? (isSticky ? 1 : 0) : 1
        }}
      />

      {/* Content layer */}
      <div 
        className={`relative rounded-[0.25rem] ${className.includes('px-0') ? 'px-0' : 'px-4'} ${className.includes('py-0') ? 'py-0' : 'py-4'} ${isNested ? 'flex-1' : ''} transition-colors duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]`}
        style={{
          background: isNested 
            ? 'radial-gradient(circle at 100% 0%, rgba(180, 144, 255, 0.2) -30%, rgba(55, 55, 62, 0.2) 30%), rgb(55, 55, 62)'
            : isNav
              ? (isSticky ? '#32323A' : 'transparent')
              : '#32323A'
        }}
      >
        {children}
      </div>
    </div>
  );
}