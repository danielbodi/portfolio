import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MasonryGallery.scss';

interface MasonryGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    info?: string;
  }>;
}

export function MasonryGallery({ images }: MasonryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const columns = 3;

  const getColumnImages = (columnIndex: number) => {
    return images.filter((_, index) => index % columns === columnIndex);
  };

  return (
    <div className="masonry-gallery">
      <div className="masonry-gallery__grid">
        {Array.from({ length: columns }).map((_, columnIndex) => (
          <div key={columnIndex} className="masonry-gallery__column">
            {getColumnImages(columnIndex).map((image, index) => (
              <motion.div
                key={index}
                className="masonry-gallery__item"
                layoutId={`masonry-${columnIndex}-${index}`}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(images.indexOf(image))}
              >
                <img src={image.src} alt={image.alt} className="masonry-gallery__image" />
                <div className="masonry-gallery__item-overlay">
                  <h4 className="masonry-gallery__item-title">{image.alt}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="masonry-gallery__modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="masonry-gallery__modal-content"
              layoutId={`masonry-${selectedImage % columns}-${Math.floor(selectedImage / columns)}`}
            >
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="masonry-gallery__modal-image"
              />
              <div className="masonry-gallery__modal-info">
                <h3 className="masonry-gallery__modal-title">
                  {images[selectedImage].alt}
                </h3>
                {images[selectedImage].info && (
                  <p className="masonry-gallery__modal-description">
                    {images[selectedImage].info}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}