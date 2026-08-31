import { ReactNode } from 'react';

export type StoryFigurePlate = 'light' | 'dark' | 'none';

export type StoryFigureMediaLayout = 'center' | 'block';

export interface StoryFigureProps {
  /** The media itself: a screenshot, a diagram, a code panel or a live demo. */
  children: ReactNode;
  /** Chrome rendered above the media area, inside the same surface. */
  header?: ReactNode;
  /** Eyebrow above the caption text. */
  label?: string;
  /** What the media shows. */
  caption?: ReactNode;
  /** Contribution line, rendered after a "My part" lead-in. */
  myPart?: string;
  /** Status tags aligned to the end of the caption row. */
  badges?: ReactNode;
  /**
   * Backdrop behind the media. `light` suits product screenshots, `dark` suits
   * diagrams and demos, `none` leaves full-bleed media untouched.
   */
  plate?: StoryFigurePlate;
  /** `center` centres a single image; `block` lets the child own its layout. */
  mediaLayout?: StoryFigureMediaLayout;
  className?: string;
  /** Extra classes on the media area, for aspect ratios and padding. */
  mediaClassName?: string;
}

const plateStyles: Record<StoryFigurePlate, string> = {
  light: 'bg-gray-50',
  dark: 'bg-gray-950/60',
  none: ''
};

/*
 * The media area keeps its natural height instead of growing. Letting it absorb
 * the figure's spare height made plates in the same row end at different points
 * whenever their captions differed in length, which reads as ragged against a
 * light plate. The caption takes the slack instead — see `mt-auto` below.
 */
const mediaLayoutStyles: Record<StoryFigureMediaLayout, string> = {
  center: 'flex items-center justify-center',
  block: ''
};

/**
 * The single media surface shared by the case-study templates. Owns the border,
 * radius, backdrop and caption row so screenshots, diagrams and demos all read
 * as the same family of evidence.
 */
export function StoryFigure({
  children,
  header,
  label,
  caption,
  myPart,
  badges,
  plate = 'dark',
  mediaLayout = 'center',
  className = '',
  mediaClassName = ''
}: StoryFigureProps) {
  const hasCaption = Boolean(label || caption || myPart || badges);

  return (
    <figure
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-900/40 shadow-xl ${className}`}
    >
      {header}
      {/* The rule sits on the plate, not on the caption. Plates are equal height
          across a row while captions are not, so a rule above the caption landed
          at a different height in every column. */}
      <div
        className={`${mediaLayoutStyles[mediaLayout]} ${plateStyles[plate]} ${
          hasCaption ? 'border-b border-gray-700/60' : ''
        } ${mediaClassName}`}
      >
        {children}
      </div>
      {hasCaption && (
        <figcaption className="flex flex-wrap items-start justify-between gap-3 px-4 py-3.5">
          {/* A basis wide enough that two status pills wrap to their own line
              rather than squeezing the caption into three-word lines. */}
          <div className="min-w-0 flex-1 basis-48">
            {label && (
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-300">
                {label}
              </p>
            )}
            {caption && <p className="mt-1 text-xs leading-relaxed text-gray-400">{caption}</p>}
            {myPart && (
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                <span className="font-semibold uppercase tracking-wide text-gray-300">
                  My part ·{' '}
                </span>
                {myPart}
              </p>
            )}
          </div>
          {badges && <div className="flex flex-wrap justify-end gap-2">{badges}</div>}
        </figcaption>
      )}
    </figure>
  );
}
