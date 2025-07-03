import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
  const [currentOrientation, setCurrentOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTransitionState, setLightboxTransitionState] = useState<'active' | 'slide-out-left' | 'slide-out-right' | 'slide-in-left' | 'slide-in-right'>('active');
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const fadeTopRef = useRef<HTMLDivElement>(null);
  const fadeBottomRef = useRef<HTMLDivElement>(null);
  const fadeLeftRef = useRef<HTMLDivElement>(null);
  const fadeRightRef = useRef<HTMLDivElement>(null);

  // Handle responsive orientation based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint
      setCurrentOrientation(isDesktop ? 'horizontal' : 'vertical');
    };

    // Set initial orientation
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lightbox handlers
  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 300);
  };

  const handleLightboxNext = () => {
    if (lightboxTransitionState !== 'active') return;
    
    // Start slide out left animation
    setLightboxTransitionState('slide-out-left');
    
    setTimeout(() => {
      // Change image and start slide in from right
      setLightboxIndex((prev) => (prev + 1) % images.length);
      setLightboxTransitionState('slide-in-right');
      
      setTimeout(() => {
        // Finish transition to active state
        setLightboxTransitionState('active');
      }, 50);
    }, 200);
  };

  const handleLightboxPrev = () => {
    if (lightboxTransitionState !== 'active') return;
    
    // Start slide out right animation
    setLightboxTransitionState('slide-out-right');
    
    setTimeout(() => {
      // Change image and start slide in from left
      setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
      setLightboxTransitionState('slide-in-left');
      
      setTimeout(() => {
        // Finish transition to active state
        setLightboxTransitionState('active');
      }, 50);
    }, 200);
  };

  const handleLightboxGoTo = (index: number) => {
    if (index === lightboxIndex || lightboxTransitionState !== 'active') return;
    
    // Determine slide direction based on index comparison
    const isNext = index > lightboxIndex;
    setLightboxTransitionState(isNext ? 'slide-out-left' : 'slide-out-right');
    
    setTimeout(() => {
      // Change image and start slide in from opposite direction
      setLightboxIndex(index);
      setLightboxTransitionState(isNext ? 'slide-in-right' : 'slide-in-left');
      
      setTimeout(() => {
        // Finish transition to active state
        setLightboxTransitionState('active');
      }, 50);
    }, 200);
  };

  const handleLightboxKeyDown = useCallback((event: KeyboardEvent) => {
    if (!lightboxOpen) return;
    
    switch (event.key) {
      case 'Escape':
        handleLightboxClose();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        handleLightboxPrev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        handleLightboxNext();
        break;
    }
  }, [lightboxOpen]);

  useEffect(() => {
    if (lightboxOpen) {
      // Add keyboard navigation
      window.addEventListener('keydown', handleLightboxKeyDown);
      
      // Add touch events for lightbox
      let startX = 0;
      let startY = 0;
      let startTime = 0;

      const handleLightboxTouchStart = (event: TouchEvent) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        startTime = Date.now();
      };

      const handleLightboxTouchEnd = (event: TouchEvent) => {
        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        const endTime = Date.now();
        const deltaTime = endTime - startTime;
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Only process horizontal swipes that are fast enough and long enough
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && deltaTime < 300) {
          if (deltaX > 0) {
            // Swipe left - go to next image
            handleLightboxNext();
          } else {
            // Swipe right - go to previous image
            handleLightboxPrev();
          }
        }
      };
      
      document.addEventListener('touchstart', handleLightboxTouchStart, { passive: true });
      document.addEventListener('touchend', handleLightboxTouchEnd, { passive: true });
      
      return () => {
        window.removeEventListener('keydown', handleLightboxKeyDown);
        document.removeEventListener('touchstart', handleLightboxTouchStart);
        document.removeEventListener('touchend', handleLightboxTouchEnd);
      };
    }
  }, [lightboxOpen, handleLightboxKeyDown, handleLightboxNext, handleLightboxPrev]);

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
    
    if (currentOrientation === 'horizontal') {
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
  }, [images.length, currentOrientation]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxOpen) return; // Don't handle showcase navigation when lightbox is open
      
      const prevKey = currentOrientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = currentOrientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      
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
  }, [activeIndex, images.length, scrollToImage, currentOrientation, lightboxOpen]);

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

      if (currentOrientation === 'horizontal') {
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
  }, [activeIndex, images.length, scrollToImage, currentOrientation]);

  // Handle scroll detection to update active index
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isScrolling.current) return;

      const container = containerRef.current;
      let newActiveIndex;
      
      if (currentOrientation === 'horizontal') {
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
  }, [activeIndex, images.length, currentOrientation]);

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

  const goToIndex = (index: number) => {
    if (index !== activeIndex && index >= 0 && index < images.length) {
      setActiveIndex(index);
      scrollToImage(index);
    }
  };

  // Lightbox component rendered as a portal
  const lightboxPortal = lightboxOpen ? createPortal(
    <div className={`stacked-image-showcase__lightbox ${lightboxOpen ? 'is-open' : ''}`}>
      <div 
        className="stacked-image-showcase__lightbox-backdrop"
        onClick={handleLightboxClose}
      />
      
      <button 
        onClick={handleLightboxClose}
        className="stacked-image-showcase__lightbox-close"
        aria-label="Close lightbox"
      >
        <X className="stacked-image-showcase__lightbox-nav-icon" />
      </button>

             <div className="stacked-image-showcase__lightbox-content">
         <div className="stacked-image-showcase__lightbox-image-container">
           <img 
             src={images[lightboxIndex].src} 
             alt={images[lightboxIndex].alt}
             className={`stacked-image-showcase__lightbox-image stacked-image-showcase__lightbox-image--${lightboxTransitionState}`}
           />
         </div>
         
         {images[lightboxIndex].description && (
           <div className="stacked-image-showcase__lightbox-description">
             <p>{images[lightboxIndex].description}</p>
           </div>
         )}

         {/* Lightbox Navigation - Only show if more than 1 image */}
         {images.length > 1 && (
           <div className="stacked-image-showcase__lightbox-navigation">
             <button
               onClick={handleLightboxPrev}
               className="stacked-image-showcase__lightbox-nav-button"
               disabled={lightboxTransitionState !== 'active'}
               aria-label="Previous image"
             >
               <ChevronLeft className="stacked-image-showcase__lightbox-nav-icon" />
             </button>
             
             <div className="stacked-image-showcase__lightbox-indicators">
               {images.map((_, index) => (
                 <button
                   key={index}
                   className={`stacked-image-showcase__lightbox-indicator ${
                     index === lightboxIndex ? 'stacked-image-showcase__lightbox-indicator--active' : ''
                   }`}
                   onClick={() => handleLightboxGoTo(index)}
                   disabled={lightboxTransitionState !== 'active'}
                   aria-label={`Go to image ${index + 1}`}
                 />
               ))}
             </div>
             
             <button
               onClick={handleLightboxNext}
               className="stacked-image-showcase__lightbox-nav-button"
               disabled={lightboxTransitionState !== 'active'}
               aria-label="Next image"
             >
               <ChevronRight className="stacked-image-showcase__lightbox-nav-icon" />
             </button>
           </div>
         )}
       </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div className={`stacked-image-showcase ${currentOrientation === 'horizontal' ? 'stacked-image-showcase--horizontal' : ''} ${className}`}>
        <div 
          ref={containerRef}
          className="stacked-image-showcase__container"
          tabIndex={0}
          role="region"
          aria-label="Image showcase"
        >
          <div 
            className="stacked-image-showcase__content"
            data-single-image={images.length === 1 ? "true" : "false"}
          >
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
                onClick={() => handleImageClick(index)}
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
        
        {/* Combined Navigation and Indicators - Only show if more than 1 image */}
        {images.length > 1 && (
          <div className="stacked-image-showcase__nav-container">
            <button
              className="stacked-image-showcase__nav-button stacked-image-showcase__nav-button--prev"
              onClick={goToPrevious}
              disabled={activeIndex === 0}
              aria-label={currentOrientation === 'horizontal' ? 'Previous image' : 'Previous image'}
            >
              {currentOrientation === 'horizontal' ? (
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
                  onClick={() => goToIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              className="stacked-image-showcase__nav-button stacked-image-showcase__nav-button--next"
              onClick={goToNext}
              disabled={activeIndex === images.length - 1}
              aria-label={currentOrientation === 'horizontal' ? 'Next image' : 'Next image'}
            >
              {currentOrientation === 'horizontal' ? (
                <ChevronRight className="stacked-image-showcase__nav-icon" />
              ) : (
                <ChevronDown className="stacked-image-showcase__nav-icon" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Render lightbox as portal to document.body */}
      {lightboxPortal}
    </>
  );
} 