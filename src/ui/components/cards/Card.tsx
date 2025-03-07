import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { useMouseGradient } from '../../../hooks/useMouseGradient';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'nested' | 'nav';
  isSticky?: boolean;
  showShadow?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  isSticky = false,
  showShadow = false,
  onClick
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
        const progress = (timestamp - startTime) / 1500; // Slower animation (1.5s)

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
  
  const cardClasses = `c-card ${
    isNested 
      ? `c-card--nested ${showShadow ? 'c-card--nested--shadow' : ''}`
      : isNav 
        ? `c-card--nav ${isSticky ? 'c-card--nav--sticky' : 'c-card--nav--default'}`
        : 'c-card--default'
  } ${className}`;
  
  const contentClasses = `c-card__content ${isNested ? 'c-card__content--nested' : ''} ${className.includes('px-0') || className.includes('py-0') ? 'c-card__content--no-padding' : ''}`;
  
  // Set CSS custom properties for dynamic values
  useEffect(() => {
    if (cardRef.current) {
      if (isNav && isSticky) {
        cardRef.current.style.setProperty('--nav-shadow', `-8px 8px 40px 0px rgba(0, 0, 0, ${0.5 + intensity * 0.1})`);
      } else if (!isNested || (isNested && showShadow)) {
        cardRef.current.style.setProperty('--default-shadow', `-8px 8px 40px 0px rgba(0, 0, 0, ${0.17 + intensity * 0.1})`);
      } else {
        // Reset shadows for nested cards without shadow
        cardRef.current.style.removeProperty('--default-shadow');
      }
    }
  }, [isNav, isSticky, isNested, intensity, showShadow]);
  
  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onClick={onClick}
    >
      {/* Gradient background layer */}
      <div 
        className="c-card__gradient"
        style={{
          background: gradientBackground,
          opacity: isNav ? (isSticky ? 1 : 0) : 1
        }}
      />

      {/* Content layer */}
      <div 
        className={contentClasses}
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