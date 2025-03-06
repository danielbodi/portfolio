import React, { useState, useRef, useEffect } from 'react';
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

      </div>

      <div className="carousel__dots">
        <button 
          className="carousel__arrow"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M20.8204 12.0918H7.10716L15.315 4.9668C15.4462 4.85195 15.3665 4.63867 15.1931 4.63867H13.1189C13.0275 4.63867 12.9408 4.67148 12.8728 4.73008L4.01575 12.4152C3.93463 12.4856 3.86958 12.5725 3.82499 12.6701C3.7804 12.7678 3.75732 12.8739 3.75732 12.9813C3.75732 13.0886 3.7804 13.1947 3.82499 13.2924C3.86958 13.39 3.93463 13.4769 4.01575 13.5473L12.9243 21.2793C12.9595 21.3098 13.0017 21.3262 13.0462 21.3262H15.1908C15.3642 21.3262 15.4439 21.1105 15.3126 20.998L7.10716 13.873H20.8204C20.9236 13.873 21.0079 13.7887 21.0079 13.6855V12.2793C21.0079 12.1762 20.9236 12.0918 20.8204 12.0918Z" fill="#B490FF"/>
          </svg>
        </button>
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
        <button 
          className="carousel__arrow"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M20.751 12.4152L11.8963 4.73008C11.8283 4.67148 11.7416 4.63867 11.6502 4.63867H9.57598C9.40254 4.63867 9.32285 4.8543 9.4541 4.9668L17.6619 12.0918H3.94629C3.84316 12.0918 3.75879 12.1762 3.75879 12.2793V13.6855C3.75879 13.7887 3.84316 13.873 3.94629 13.873H17.6596L9.45176 20.998C9.32051 21.1129 9.4002 21.3262 9.57363 21.3262H11.7182C11.7627 21.3262 11.8072 21.3098 11.84 21.2793L20.751 13.5496C20.8321 13.4791 20.8972 13.3919 20.9418 13.2941C20.9863 13.1962 21.0094 13.0899 21.0094 12.9824C21.0094 12.8749 20.9863 12.7686 20.9418 12.6708C20.8972 12.5729 20.8321 12.4858 20.751 12.4152Z" fill="#B490FF"/>
          </svg>
        </button>
      </div>
    </div>
  );
}