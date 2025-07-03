import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '../../image/Image';
import './StackedImageShowcase.scss';

interface StackedImageShowcaseProps {
  images: Array<{
    src: string;
    alt: string;
    description?: string;
  }>;
  aspectRatio?: 'video' | 'square' | 'auto';
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export function StackedImageShowcase({ 
  images, 
  aspectRatio = 'video', 
  orientation = 'vertical',
  className = '' 
}: StackedImageShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const fadeTopRef = useRef<HTMLDivElement>(null);
  const fadeBottomRef = useRef<HTMLDivElement>(null);
  const fadeLeftRef = useRef<HTMLDivElement>(null);
  const fadeRightRef = useRef<HTMLDivElement>(null);

  // Calculate which images should be visible (3 at a time)
  const getVisibleImages = () => {
    const startIndex = Math.max(0, activeIndex - 1);
    const endIndex = Math.min(images.length, startIndex + 3);
    return images.slice(startIndex, endIndex).map((image, index) => ({
      ...image,
      originalIndex: startIndex + index,
      relativeIndex: index
    }));
  };

  // Calculate opacity based on distance from active image
  const getImageOpacity = (imageIndex: number) => {
    const distance = Math.abs(imageIndex - activeIndex);
    if (distance === 0) return 1; // Active image
    if (distance === 1) return 0.6; // Adjacent images
    if (distance === 2) return 0.3; // Further images
    return 0.1; // Very far images
  };

  // Calculate glow intensity
  const getGlowIntensity = (imageIndex: number) => {
    const distance = Math.abs(imageIndex - activeIndex);
    if (distance === 0) return 1; // Active image - full glow
    return 0.4; // Non-active images - reduced glow
  };

  // Scroll to specific image
  const scrollToImage = useCallback((index: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    if (orientation === 'horizontal') {
      const imageWidth = container.scrollWidth / images.length;
      const scrollPosition = index * imageWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    } else {
      const imageHeight = container.scrollHeight / images.length;
      const scrollPosition = index * imageHeight;
      
      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [images.length, orientation]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      
      switch (event.key) {
        case prevKey:
          event.preventDefault();
          if (activeIndex > 0) {
            const newIndex = activeIndex - 1;
            setActiveIndex(newIndex);
            scrollToImage(newIndex);
          }
          break;
        case nextKey:
          event.preventDefault();
          if (activeIndex < images.length - 1) {
            const newIndex = activeIndex + 1;
            setActiveIndex(newIndex);
            scrollToImage(newIndex);
          }
          break;
        case 'Home':
          event.preventDefault();
          setActiveIndex(0);
          scrollToImage(0);
          break;
        case 'End':
          event.preventDefault();
          const lastIndex = images.length - 1;
          setActiveIndex(lastIndex);
          scrollToImage(lastIndex);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, images.length, scrollToImage, orientation]);

  // Handle touch events
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;
      const endTime = Date.now();
      const deltaTime = endTime - startTime;

      if (orientation === 'horizontal') {
        const deltaX = startX - endX;
        // Only process swipes that are fast enough and long enough
        if (Math.abs(deltaX) > 50 && deltaTime < 300) {
          if (deltaX > 0 && activeIndex < images.length - 1) {
            // Swipe left - go to next image
            const newIndex = activeIndex + 1;
            setActiveIndex(newIndex);
            scrollToImage(newIndex);
          } else if (deltaX < 0 && activeIndex > 0) {
            // Swipe right - go to previous image
            const newIndex = activeIndex - 1;
            setActiveIndex(newIndex);
            scrollToImage(newIndex);
          }
        }
      } else {
        const deltaY = startY - endY;
        // Only process swipes that are fast enough and long enough
        if (Math.abs(deltaY) > 50 && deltaTime < 300) {
          if (deltaY > 0 && activeIndex < images.length - 1) {
            // Swipe up - go to next image
            const newIndex = activeIndex + 1;
            setActiveIndex(newIndex);
            scrollToImage(newIndex);
          } else if (deltaY < 0 && activeIndex > 0) {
            // Swipe down - go to previous image
            const newIndex = activeIndex - 1;
            setActiveIndex(newIndex);
            scrollToImage(newIndex);
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [activeIndex, images.length, scrollToImage, orientation]);

  // Handle scroll detection to update active index
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isScrolling.current) return;

      const container = containerRef.current;
      let newActiveIndex;
      
      if (orientation === 'horizontal') {
        const imageWidth = container.scrollWidth / images.length;
        const scrollLeft = container.scrollLeft;
        newActiveIndex = Math.round(scrollLeft / imageWidth);
        
        // Update horizontal fade overlays
        const scrollPercentage = scrollLeft / (container.scrollWidth - container.clientWidth);
        
        if (fadeLeftRef.current) {
          const leftOpacity = Math.min(1, scrollPercentage * 5); // Fade in first 20%
          fadeLeftRef.current.style.opacity = leftOpacity.toString();
        }
        
        if (fadeRightRef.current) {
          const rightOpacity = Math.max(0, 1 - (scrollPercentage - 0.8) * 5); // Fade out last 20%
          fadeRightRef.current.style.opacity = rightOpacity.toString();
        }
      } else {
        const imageHeight = container.scrollHeight / images.length;
        const scrollTop = container.scrollTop;
        newActiveIndex = Math.round(scrollTop / imageHeight);
        
        // Update vertical fade overlays
        const scrollPercentage = scrollTop / (container.scrollHeight - container.clientHeight);
        
        if (fadeTopRef.current) {
          const topOpacity = Math.min(1, scrollPercentage * 5); // Fade in first 20%
          fadeTopRef.current.style.opacity = topOpacity.toString();
        }
        
        if (fadeBottomRef.current) {
          const bottomOpacity = Math.max(0, 1 - (scrollPercentage - 0.8) * 5); // Fade out last 20%
          fadeBottomRef.current.style.opacity = bottomOpacity.toString();
        }
      }
      
      if (newActiveIndex !== activeIndex && newActiveIndex >= 0 && newActiveIndex < images.length) {
        setActiveIndex(newActiveIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex, images.length, orientation]);

  // Navigation functions
  const goToPrevious = () => {
    if (activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      scrollToImage(newIndex);
    }
  };

  const goToNext = () => {
    if (activeIndex < images.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      scrollToImage(newIndex);
    }
  };

  return (
    <div className={`stacked-image-showcase ${orientation === 'horizontal' ? 'stacked-image-showcase--horizontal' : ''} ${className}`}>
      <div 
        ref={containerRef}
        className="stacked-image-showcase__container"
        tabIndex={0}
        role="region"
        aria-label="Image showcase"
      >
        <div className="stacked-image-showcase__content">
          {images.map((image, index) => (
            <div
              key={index}
              className={`stacked-image-showcase__item ${
                index === activeIndex ? 'stacked-image-showcase__item--active' : ''
              }`}
              style={{
                opacity: getImageOpacity(index),
                '--glow-intensity': getGlowIntensity(index),
              } as React.CSSProperties}
              onClick={() => {
                setActiveIndex(index);
                scrollToImage(index);
              }}
            >
              <div className="stacked-image-showcase__image-wrapper">
                <Image
                  src={image.src}
                  alt={image.alt}
                  aspectRatio={aspectRatio}
                  frame="none"
                  className="stacked-image-showcase__image"
                />
              </div>
              {image.description && (
                <div className="stacked-image-showcase__description">
                  {image.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Fade overlays */}
      <div ref={fadeTopRef} className="stacked-image-showcase__fade-top" />
      <div ref={fadeBottomRef} className="stacked-image-showcase__fade-bottom" />
      
      {/* Horizontal fade overlays */}
      <div ref={fadeLeftRef} className="stacked-image-showcase__fade-left" />
      <div ref={fadeRightRef} className="stacked-image-showcase__fade-right" />
      
      {/* Combined Navigation and Indicators */}
      <div className="stacked-image-showcase__nav-container">
        <button
          className="stacked-image-showcase__nav-button stacked-image-showcase__nav-button--prev"
          onClick={goToPrevious}
          disabled={activeIndex === 0}
          aria-label={orientation === 'horizontal' ? 'Previous image' : 'Previous image'}
        >
          {orientation === 'horizontal' ? (
            <ChevronLeft className="stacked-image-showcase__nav-icon" />
          ) : (
            <ChevronUp className="stacked-image-showcase__nav-icon" />
          )}
        </button>
        
        <div className="stacked-image-showcase__indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`stacked-image-showcase__indicator ${
                index === activeIndex ? 'stacked-image-showcase__indicator--active' : ''
              }`}
              onClick={() => {
                setActiveIndex(index);
                scrollToImage(index);
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          className="stacked-image-showcase__nav-button stacked-image-showcase__nav-button--next"
          onClick={goToNext}
          disabled={activeIndex === images.length - 1}
          aria-label={orientation === 'horizontal' ? 'Next image' : 'Next image'}
        >
          {orientation === 'horizontal' ? (
            <ChevronRight className="stacked-image-showcase__nav-icon" />
          ) : (
            <ChevronDown className="stacked-image-showcase__nav-icon" />
          )}
        </button>
      </div>
    </div>
  );
} 