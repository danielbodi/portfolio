import { DB_MARK_PATH, DB_MARK_VIEWBOX } from '../brand/dbGeometry';

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
      viewBox={DB_MARK_VIEWBOX}
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={DB_MARK_PATH} />
    </svg>
  );
}
