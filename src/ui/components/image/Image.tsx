import React, { useRef } from 'react';
import { useMouseGradient } from '../../../hooks/useMouseGradient';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'auto';
  objectFit?: 'cover' | 'contain';
  frame?: 'desktop' | 'tablet' | 'none';
}

export function Image({ 
  src, 
  alt,
  className = '',
  aspectRatio = 'video',
  objectFit = 'cover',
  frame = 'none'
}: ImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { degree, intensity } = useMouseGradient(imageRef);
  
  const aspectRatioClass = `image--aspect-${aspectRatio}`;
  const frameClass = frame !== 'none' ? `image--frame-${frame}` : '';
  const objectFitClass = objectFit === 'contain' ? 'image__img--contain' : '';
  
  return (
    <div 
      ref={imageRef}
      className={`image ${aspectRatioClass} ${frameClass} ${className}`}
    >
      {/* Only show gradient border when frame is not 'none' */}
      {frame !== 'none' && (
        <div 
          className="image__border"
          style={{
            background: `linear-gradient(${degree}deg, rgba(55, 55, 62, 0.9) 0%, rgba(105, 100, 247, 0.6) 50%, rgba(180, 144, 255, 1) 100%)`,
            opacity: intensity
          }}
        />
      )}
      <div className="image__content">
        <div className={`image__wrapper ${frame !== 'none' ? `image__wrapper--${frame}` : ''}`}>
          <img 
            src={src} 
            alt={alt} 
            className={`image__img ${objectFitClass}`}
          />
          <div className="image__overlay" />
        </div>
      </div>
    </div>
  );
}