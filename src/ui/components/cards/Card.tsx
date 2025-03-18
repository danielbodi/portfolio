import React, { ReactNode, useRef, useEffect, useCallback } from 'react';
import { useMouseGradient } from '../../../hooks/useMouseGradient';
import { useGradientSettings } from '../../../context/GradientSettingsContext';

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

interface ColorStop {
  id: string;
  hue: number;
  saturation: number;
  lightness: number;
  opacity: number;
  position: number;
}

interface GradientColors {
  startColor: string;
  midColor: string;
  endColor: string;
  gradientPositions: string;
}

// Default gradient settings for fallback
const defaultGradientSettings = {
  baseAngle: 45,
  intensityMultiplier: 1,
  throttleMs: 16,
  springTension: 0.15,
  performanceMode: false,
  disableAnimation: false
};

// Default colors for fallback
const getDefaultColors = (intensity: number, isNested: boolean): GradientColors => {
  const startColor = isNested 
    ? `rgba(55, 55, 62, ${Math.max(0.5, 0.9 - intensity * 0.4)})`
    : `rgba(55, 55, 62, ${Math.max(0.3, 0.9 - intensity * 0.7)})`;
  const midColor = isNested
    ? `rgba(105, 100, 247, ${Math.min(0.5, intensity * 0.6)})`
    : `rgba(105, 100, 247, ${Math.min(0.6, intensity * 0.8)})`;
  const endColor = isNested
    ? `rgba(180, 144, 255, ${Math.min(0.6, intensity * 0.7)})`
    : `rgba(180, 144, 255, ${Math.min(1, intensity * 1.5)})`;
    
  return { 
    startColor, 
    midColor, 
    endColor,
    gradientPositions: isNested ? "66%, 88%, 100%" : "33%, 66%, 100%"
  };
};

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  isSticky = false,
  showShadow = false,
  onClick,
  performanceMode,
  disableAnimation
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prevColorsRef = useRef<GradientColors | null>(null);
  const prevPropsRef = useRef({ isSticky, disableAnimation });
  
  // Try to get gradient settings from context, fall back to defaults if not available
  let contextSettings;
  let getComputedColors;
  let colorStops: ColorStop[] = [];
  
  try {
    const gradientContext = useGradientSettings();
    contextSettings = gradientContext?.settings;
    getComputedColors = gradientContext?.getComputedGradientColors;
    colorStops = contextSettings?.colorStops || [];
  } catch (error) {
    console.warn('GradientSettings context not available, using default settings');
    contextSettings = defaultGradientSettings;
    getComputedColors = getDefaultColors;
  }
  
  // Use settings from context if not provided as props
  const effectivePerformanceMode = performanceMode !== undefined ? performanceMode : contextSettings?.performanceMode || defaultGradientSettings.performanceMode;
  const effectiveDisableAnimation = disableAnimation !== undefined ? disableAnimation : contextSettings?.disableAnimation || defaultGradientSettings.disableAnimation;
  
  const { 
    degree, 
    intensity, 
    isAnimating,
    startAnimation,
    resetAnimation
  } = useMouseGradient(cardRef, { 
    throttleMs: contextSettings?.throttleMs || defaultGradientSettings.throttleMs, 
    performanceMode: effectivePerformanceMode,
    springTension: contextSettings?.springTension || defaultGradientSettings.springTension
  });
  
  const isNested = variant === 'nested';
  const isNav = variant === 'nav';

  // Apply base angle from settings
  const adjustedDegree = degree + ((contextSettings?.baseAngle || defaultGradientSettings.baseAngle) - 45); // Adjust relative to default 45°

  // Helper function to generate CSS gradient position string
  const generateGradientPositions = useCallback(() => {
    // If not using context or no color stops, use defaults
    if (!colorStops || colorStops.length === 0) {
      return isNav ? "33%, 66%, 100%" : "66%, 88%, 100%";
    }
    
    // Sort stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    
    // Generate the position string
    return sortedStops.map(stop => `${stop.position}%`).join(', ');
  }, [colorStops, isNav]);

  // Memoize the computeGradientColors function to prevent unnecessary recalculations
  const computeAndSetGradientColors = useCallback(() => {
    if (!cardRef.current) return;
    
    // Get gradient colors based on settings
    let colors: GradientColors;
    try {
      colors = getComputedColors ? 
        { ...(getComputedColors(intensity, isNested)), gradientPositions: '' } :
        getDefaultColors(intensity, isNested);
    } catch (error) {
      colors = getDefaultColors(intensity, isNested);
    }
    
    // Get gradient positions
    const gradientPositions = generateGradientPositions();
    colors.gradientPositions = gradientPositions;
    
    // If colors haven't changed, don't update
    if (prevColorsRef.current && 
        prevColorsRef.current.startColor === colors.startColor &&
        prevColorsRef.current.midColor === colors.midColor &&
        prevColorsRef.current.endColor === colors.endColor &&
        prevColorsRef.current.gradientPositions === colors.gradientPositions) {
      return;
    }
    
    // Update ref with new colors
    prevColorsRef.current = colors;
    
    // Set shadows
    if (isNav && isSticky) {
      cardRef.current.style.setProperty('--nav-shadow', `-8px 8px 40px 0px rgba(0, 0, 0, ${0.5 + intensity * 0.1})`);
    } else if (!isNested || (isNested && showShadow)) {
      cardRef.current.style.setProperty('--default-shadow', `-8px 8px 40px 0px rgba(0, 0, 0, ${0.17 + intensity * 0.1})`);
    } else {
      // Reset shadows for nested cards without shadow
      cardRef.current.style.removeProperty('--default-shadow');
    }
    
    // Create dynamic gradient with all color stops if available
    if (colorStops && colorStops.length > 0) {
      // Sort stops by position
      const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
      
      // Create gradient with all stops
      const fullGradientColors = sortedStops.map(stop => {
        // Adjust opacity based on card type and intensity
        const adjustedOpacity = isNested 
          ? Math.min(0.6, intensity * 0.7) * stop.opacity
          : Math.min(1, intensity * 1.2) * stop.opacity;
        
        return `hsla(${stop.hue}, ${stop.saturation}%, ${stop.lightness}%, ${adjustedOpacity})`;
      });
      
      // Create the full gradient string
      const fullGradientString = sortedStops.map((stop, index) => 
        `${fullGradientColors[index]} ${stop.position}%`
      ).join(', ');
      
      // Set the full gradient
      cardRef.current.style.setProperty('--gradient-background', `linear-gradient(${adjustedDegree}deg, ${fullGradientString})`);
      
      // Set individual color properties for backwards compatibility
      if (sortedStops.length >= 1) cardRef.current.style.setProperty('--gradient-start-color', fullGradientColors[0]);
      if (sortedStops.length >= 2) cardRef.current.style.setProperty('--gradient-mid-color', fullGradientColors[Math.floor(sortedStops.length / 2)]);
      if (sortedStops.length >= 3) cardRef.current.style.setProperty('--gradient-end-color', fullGradientColors[sortedStops.length - 1]);
    } else {
      // Fall back to the three-color gradient
      cardRef.current.style.setProperty('--gradient-degree', `${adjustedDegree}deg`);
      cardRef.current.style.setProperty('--gradient-start-color', colors.startColor);
      cardRef.current.style.setProperty('--gradient-mid-color', colors.midColor);
      cardRef.current.style.setProperty('--gradient-end-color', colors.endColor);
      cardRef.current.style.setProperty('--gradient-distribution', colors.gradientPositions);
      cardRef.current.style.removeProperty('--gradient-background');
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
  }, [isNav, isSticky, isNested, intensity, showShadow, adjustedDegree, getComputedColors, generateGradientPositions, colorStops]);
  
  // Handle sticky nav animation
  useEffect(() => {
    // Only trigger if these props changed
    if (prevPropsRef.current.isSticky === isSticky && 
        prevPropsRef.current.disableAnimation === effectiveDisableAnimation) {
      return;
    }
    
    // Update ref
    prevPropsRef.current = { 
      isSticky, 
      disableAnimation: effectiveDisableAnimation 
    };
    
    if (effectiveDisableAnimation) return;
    
    if (variant === 'nav') {
      if (isSticky && !isAnimating) {
        startAnimation(contextSettings?.baseAngle || defaultGradientSettings.baseAngle);
      } else if (!isSticky) {
        resetAnimation();
      }
    }
  }, [variant, isSticky, isAnimating, startAnimation, resetAnimation, effectiveDisableAnimation, contextSettings]);

  // This effect applies the colors whenever needed
  useEffect(() => {
    // Use RAF to avoid batched DOM updates that might cause layout thrashing
    try {
      requestAnimationFrame(() => {
        computeAndSetGradientColors();
      });
    } catch (error) {
      console.error('Error updating gradient colors:', error);
    }
  }, [computeAndSetGradientColors]);

  const cardClasses = `c-card ${
    isNested 
      ? `c-card--nested ${showShadow ? 'c-card--nested--shadow' : ''}`
      : isNav 
        ? `c-card--nav ${isSticky ? 'c-card--nav--sticky' : 'c-card--nav--default'}`
        : 'c-card--default'
  } ${effectiveDisableAnimation ? 'c-card--no-animation' : ''} ${className}`;
  
  const contentClasses = `c-card__content ${isNested ? 'c-card__content--nested' : ''} ${className.includes('px-0') || className.includes('py-0') ? 'c-card__content--no-padding' : ''}`;
  
  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onClick={onClick}
      aria-disabled={effectiveDisableAnimation ? 'true' : undefined}
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