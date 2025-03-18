import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { useMouseGradient } from '../../../hooks/useMouseGradient';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'nested' | 'nav';
  isSticky?: boolean;
  showShadow?: boolean;
  onClick?: () => void;
  performanceMode?: boolean;
  disableAnimation?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  isSticky = false,
  showShadow = false,
  onClick,
  performanceMode = false,
  disableAnimation = false
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { 
    degree, 
    intensity, 
    isAnimating,
    startAnimation,
    resetAnimation
  } = useMouseGradient(cardRef, { 
    throttleMs: 16, 
    performanceMode,
    springTension: 0.15 // Slightly more responsive spring
  });
  
  const isNested = variant === 'nested';
  const isNav = variant === 'nav';

  // Handle sticky nav animation
  useEffect(() => {
    if (disableAnimation) return;
    
    if (variant === 'nav') {
      if (isSticky && !isAnimating) {
        startAnimation(45);
      } else if (!isSticky) {
        resetAnimation();
      }
    }
  }, [variant, isSticky, isAnimating, startAnimation, resetAnimation, disableAnimation]);

  // Set CSS custom properties for dynamic values
  useEffect(() => {
    if (cardRef.current) {
      // Calculate unified gradient colors
      const startColor = isNested 
        ? `rgba(55, 55, 62, ${Math.max(0.5, 0.9 - intensity * 0.4)})`
        : `rgba(55, 55, 62, ${Math.max(0.3, 0.9 - intensity * 0.7)})`;
      const midColor = isNested
        ? `rgba(105, 100, 247, ${Math.min(0.5, intensity * 0.6)})`
        : `rgba(105, 100, 247, ${Math.min(0.6, intensity * 0.8)})`;
      const endColor = isNested
        ? `rgba(180, 144, 255, ${Math.min(0.6, intensity * 0.7)})`
        : `rgba(180, 144, 255, ${Math.min(1, intensity * 1.5)})`;
        
      // Set shadows
      if (isNav && isSticky) {
        cardRef.current.style.setProperty('--nav-shadow', `-8px 8px 40px 0px rgba(0, 0, 0, ${0.5 + intensity * 0.1})`);
      } else if (!isNested || (isNested && showShadow)) {
        cardRef.current.style.setProperty('--default-shadow', `-8px 8px 40px 0px rgba(0, 0, 0, ${0.17 + intensity * 0.1})`);
      } else {
        // Reset shadows for nested cards without shadow
        cardRef.current.style.removeProperty('--default-shadow');
      }
      
      // Set gradient properties
      cardRef.current.style.setProperty('--gradient-degree', `${degree}deg`);
      cardRef.current.style.setProperty('--gradient-start-color', startColor);
      cardRef.current.style.setProperty('--gradient-mid-color', midColor);
      cardRef.current.style.setProperty('--gradient-end-color', endColor);
      
      // Set gradient distributions based on card type
      if (isNav) {
        cardRef.current.style.setProperty('--gradient-distribution', `33%, 66%, 100%`);
      } else {
        cardRef.current.style.setProperty('--gradient-distribution', `66%, 88%, 100%`);
      }
      
      // Set content background
      if (isNested) {
        cardRef.current.style.setProperty('--content-bg', 'radial-gradient(circle at 100% 0%, rgba(180, 144, 255, 0.2) -30%, rgba(55, 55, 62, 0.2) 30%), rgb(55, 55, 62)');
      } else if (isNav) {
        cardRef.current.style.setProperty('--content-bg', isSticky ? '#32323A' : 'transparent');
      } else {
        cardRef.current.style.setProperty('--content-bg', '#32323A');
      }
      
      // Set gradient opacity
      cardRef.current.style.setProperty('--gradient-opacity', isNav ? (isSticky ? '1' : '0') : '1');
    }
  }, [isNav, isSticky, isNested, intensity, showShadow, degree]);
  
  const cardClasses = `c-card ${
    isNested 
      ? `c-card--nested ${showShadow ? 'c-card--nested--shadow' : ''}`
      : isNav 
        ? `c-card--nav ${isSticky ? 'c-card--nav--sticky' : 'c-card--nav--default'}`
        : 'c-card--default'
  } ${disableAnimation ? 'c-card--no-animation' : ''} ${className}`;
  
  const contentClasses = `c-card__content ${isNested ? 'c-card__content--nested' : ''} ${className.includes('px-0') || className.includes('py-0') ? 'c-card__content--no-padding' : ''}`;
  
  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onClick={onClick}
      aria-disabled={disableAnimation ? 'true' : undefined}
    >
      {/* Gradient background layer */}
      <div 
        className="c-card__gradient"
        style={{
          background: 'var(--gradient-background, linear-gradient(var(--gradient-degree, 45deg), var(--gradient-start-color), var(--gradient-mid-color), var(--gradient-end-color)))',
          opacity: 'var(--gradient-opacity, 1)'
        }}
      />

      {/* Content layer */}
      <div 
        className={contentClasses}
        style={{
          background: 'var(--content-bg, #32323A)'
        }}
      >
        {children}
      </div>
    </div>
  );
} 