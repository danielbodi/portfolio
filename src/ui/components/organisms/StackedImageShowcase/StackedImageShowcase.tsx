import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Image } from '../../image/Image';
import './StackedImageShowcase.scss';

interface StackedImageShowcaseProps {
  images: Array<{
    src: string;
    alt: string;
    description?: string;
  }>;
  aspectRatio?: 'video' | 'square' | 'auto';
  className?: string;
}

export function StackedImageShowcase({ 
  images, 
  aspectRatio = 'video', 
  className = '' 
}: StackedImageShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

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
    const imageHeight = container.scrollHeight / images.length;
    const scrollPosition = index * imageHeight;
    
    container.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          if (activeIndex > 0) {
            const newIndex = activeIndex - 1;
            setActiveIndex(newIndex);
            scrollToImage(newIndex);
          }
          break;
        case 'ArrowDown':
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
  }, [activeIndex, images.length, scrollToImage]);

  // Handle touch events
  useEffect(() => {
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const endY = event.changedTouches[0].clientY;
      const endTime = Date.now();
      const deltaY = startY - endY;
      const deltaTime = endTime - startTime;

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
  }, [activeIndex, images.length, scrollToImage]);

  // Handle scroll detection to update active index
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isScrolling.current) return;

      const container = containerRef.current;
      const imageHeight = container.scrollHeight / images.length;
      const scrollTop = container.scrollTop;
      const newActiveIndex = Math.round(scrollTop / imageHeight);
      
      if (newActiveIndex !== activeIndex && newActiveIndex >= 0 && newActiveIndex < images.length) {
        setActiveIndex(newActiveIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex, images.length]);

  return (
    <div className={`stacked-image-showcase ${className}`}>
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
      <div className="stacked-image-showcase__fade-top" />
      <div className="stacked-image-showcase__fade-bottom" />
      
      {/* Navigation indicators */}
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
    </div>
  );
} 