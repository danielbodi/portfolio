import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import {
  getCachedImagePlateColor,
  sampleImagePlateColor,
  setCachedImagePlateColor,
} from '../../../utils/imagePlateColor';

interface ExpandableImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Aspect / size of the letterbox frame. Plate colour paints this surface. */
  frameClassName?: string;
}

/**
 * Thumbnail that opens a full-viewport lightbox. Used for decision visuals
 * and artefact figures that would otherwise be too small to read.
 */
export function ExpandableImage({ src, alt, className, frameClassName }: ExpandableImageProps) {
  const [open, setOpen] = useState(false);
  const [plateColor, setPlateColor] = useState<string | undefined>(() => getCachedImagePlateColor(src));
  const triggerRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();
  const prefersReducedMotion = useReducedMotion();

  const capturePlateColor = useCallback(
    (image: HTMLImageElement) => {
      const cached = getCachedImagePlateColor(src);
      if (cached) {
        setPlateColor(cached);
        return;
      }
      const sampled = sampleImagePlateColor(image);
      if (!sampled) return;
      setCachedImagePlateColor(src, sampled);
      setPlateColor(sampled);
    },
    [src]
  );

  useEffect(() => {
    setPlateColor(getCachedImagePlateColor(src));
    const image = imageRef.current;
    if (image?.complete) capturePlateColor(image);
  }, [src, capturePlateColor]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      triggerRef.current?.focus();
    };
  }, [open, close]);

  const plateStyle = plateColor ? { backgroundColor: plateColor } : undefined;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Expand image: ${alt}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-lg text-left ${
          frameClassName ?? ''
        }`}
        style={plateStyle}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading="lazy"
          className={className}
          style={plateStyle}
          onLoad={(event) => capturePlateColor(event.currentTarget)}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-md bg-gray-950/80 text-gray-200 opacity-80 ring-1 ring-white/10 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            className={`fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 ${
              prefersReducedMotion ? '' : 'animate-lightbox-in'
            }`}
          >
            <div
              aria-hidden="true"
              onClick={close}
              className="absolute inset-0 bg-gray-950/85 backdrop-blur-md"
            />
            <figure className="relative z-[301] flex max-h-[90vh] max-w-[min(96vw,80rem)] flex-col items-center">
              <img
                src={src}
                alt=""
                className="max-h-[82vh] w-auto max-w-full rounded-lg border border-gray-700/60 object-contain shadow-2xl"
                style={plateStyle}
              />
              <figcaption
                id={labelId}
                className="mt-3 max-w-3xl text-center text-sm leading-relaxed text-gray-300"
              >
                {alt}
              </figcaption>
            </figure>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close expanded image"
              className="absolute right-4 top-4 z-[302] flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 md:right-8 md:top-8"
            >
              <X className="h-5 w-5" />
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
