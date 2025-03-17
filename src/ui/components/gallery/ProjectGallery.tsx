import React, { useState, useRef } from 'react';
import { useMouseGradient } from '../../../hooks/useMouseGradient';
import { Card } from '../cards/Card';
import { Button } from '../buttons/Button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectImage {
  src: string;
  alt: string;
  description?: string;
  info?: string;
  aspectRatio?: 'video' | 'square';
}

interface ProjectGalleryProps {
  images: ProjectImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const { degree, intensity } = useMouseGradient(backdropRef);

  const handleImageClick = (image: ProjectImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
      document.body.style.overflow = '';
    }, 300);
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedImage(images[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  const handleGridNext = () => {
    setVisibleIndex((prev) => (prev + 1) % images.length);
  };

  const handleGridPrev = () => {
    setVisibleIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? images.length - 1 : newIndex;
    });
  };

  const visibleImages = images.slice(visibleIndex, visibleIndex + 3);

  return (
    <>
      <div className="relative">
        <div 
          ref={galleryRef}
          className="grid grid-cols-3 gap-6"
        >
          {visibleImages.map((image, index) => (
            <Card
              key={visibleIndex + index}
              variant="nested"
              showShadow
              className="group cursor-pointer transform-gpu transition-all duration-500 hover:scale-[1.02]"
              onClick={() => handleImageClick(image, visibleIndex + index)}
            >
              <div 
                className="c-gallery__image"
              >
                <div 
                  className="c-gallery__image-container"
                  style={{ 
                    backgroundImage: `url(${image.src})`
                  }}
                />
                {(image.description || image.info) && (
                  <div className="c-gallery__image-overlay">
                    <p className="text-white text-center">{image.description || image.info}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Grid Navigation */}
        <div className="c-gallery__grid-nav">
          <Button 
            onClick={handleGridPrev}
            variant="ghost"
            className="w-8 h-8 !p-0 gallery-nav-btn flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </Button>
          <div className="c-gallery__pagination">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`c-gallery__dot transition-all duration-300 ease-in-out
                  ${i === visibleIndex ? 'c-gallery__dot--active' : ''}`}
                onClick={() => setVisibleIndex(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
          <Button 
            onClick={handleGridNext}
            variant="ghost"
            className="w-8 h-8 !p-0 gallery-nav-btn flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      {selectedImage && (
        <div className={`c-gallery__fullscreen ${isOpen ? 'is-open' : ''}`}>
          <div 
            ref={backdropRef}
            className="c-gallery__fullscreen-backdrop"
            onClick={handleClose}
            style={{
              background: `linear-gradient(${degree}deg, 
                rgba(0, 0, 0, ${0.95 - intensity * 0.1}) 0%,
                rgba(20, 20, 20, ${0.98 - intensity * 0.1}) 50%,
                rgba(40, 40, 40, ${0.95 - intensity * 0.1}) 100%)`
            }}
          />
          <Button 
            onClick={handleClose}
            variant="ghost"
            className="w-12 h-12 !p-0 absolute top-8 right-8 z-[51]"
            aria-label="Close fullscreen view"
          >
            <X size={24} />
          </Button>

          <div className="c-gallery__fullscreen-content">
            <Card variant="nested" className="w-full max-w-6xl">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg"
              />
              {(selectedImage.description || selectedImage.info) && (
                <div className="mt-4 text-center text-gray-300">
                  <p>{selectedImage.description || selectedImage.info}</p>
                </div>
              )}
            </Card>

            {/* Fullscreen Navigation */}
            <div className="c-gallery__fullscreen-pagination mt-6">
              <Button 
                onClick={handlePrev}
                variant="ghost"
                className="w-8 h-8 !p-0 gallery-nav-btn flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </Button>
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`c-gallery__dot transition-all duration-300 ease-in-out
                    ${i === selectedIndex ? 'c-gallery__dot--active' : ''}`}
                  onClick={() => {
                    setSelectedImage(images[i]);
                    setSelectedIndex(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
              <Button 
                onClick={handleNext}
                variant="ghost"
                className="w-8 h-8 !p-0 gallery-nav-btn flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 