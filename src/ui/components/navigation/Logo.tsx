import React from 'react';

interface LogoProps {
  className?: string;
}

/**
 * The "DB" monogram, inlined so it inherits `currentColor` and can follow the
 * navigation's hover state. Source asset: `public/daniel-logo.svg`.
 *
 * Decorative here: the link that wraps it carries the accessible name.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 155 136"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M33.5 0C46.9794 0 59.5221 4.0105 70 10.9033V125.096C59.522 131.989 46.9796 136 33.5 136H0V0H33.5ZM118.468 61.0127C138.731 61.526 155 78.1129 155 98.5C155 119.211 138.211 136 117.5 136H70V125.096C88.0706 113.208 100 92.7473 100 69.5V66.5C100 43.2525 88.0709 22.7912 70 10.9033V0H117.5C134.345 9.01965e-07 148 13.6553 148 30.5C148 47.3447 134.345 61 117.5 61L118.468 61.0127Z" />
    </svg>
  );
}
