import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Carousel.scss';

interface CarouselProps {
  images: Array<{
    src: string;
    alt: string;
    info?: string;
  }>;
  autoplayInterval?: number;
}

export function Carousel({ images, autoplayInterval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout>();
  const [showInfo, setShowInfo] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setShowInfo(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setShowInfo(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setShowInfo(false);
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    
    setIsDragging(false);
    setTranslateX(0);
  };

  useEffect(() => {
    if (autoplayInterval) {
      autoplayTimeoutRef.current = setInterval(handleNext, autoplayInterval);
      
      return () => {
        if (autoplayTimeoutRef.current) {
          clearInterval(autoplayTimeoutRef.current);
        }
      };
    }
  }, [autoplayInterval]);

  return (
    <div className="carousel">
      <div 
        className="carousel__container"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onClick={() => setShowInfo(!showInfo)}
      >
        <div 
          className="carousel__track"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          }}
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className="carousel__slide"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="carousel__image"
                draggable="false"
              />
              <AnimatePresence>
                {showInfo && index === currentIndex && (
                  <motion.div
                    className="carousel__info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <h3 className="carousel__title">{image.alt}</h3>
                    {image.info && (
                      <p className="carousel__description">{image.info}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <button 
          className="carousel__arrow carousel__arrow--prev"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          className="carousel__arrow carousel__arrow--next"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="carousel__dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel__dot ${index === currentIndex ? 'carousel__dot--active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleDotClick(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}