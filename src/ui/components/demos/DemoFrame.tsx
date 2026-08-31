import { ReactNode, useId } from 'react';
import { Activity } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { StoryFigure } from '../story/StoryFigure';

export interface DemoFrameProps {
  /** Anchor id on the demo heading, so hero jump links and deep links land here. */
  anchorId?: string;
  /** Eyebrow above the heading. */
  label?: string;
  title: string;
  /** One line on what the visitor can do here. */
  description?: string;
  /** What the demo is and is not. Rendered as the figure's caption. */
  provenance?: string;
  /** Status tags for the caption row. */
  badges?: ReactNode;
  /** Header controls such as tabs. Must stay reachable by keyboard. */
  toolbar?: ReactNode;
  /** Shown instead of `children` when the visitor prefers reduced motion. */
  reducedMotionFallback?: ReactNode;
  /** Restores the demo's initial state. Rendered as a header button. */
  onReset?: () => void;
  resetLabel?: string;
  className?: string;
  children: ReactNode;
}

const DEFAULT_PROVENANCE =
  'A re-implementation of the technique in this page\u2019s own code, not a capture of client software.';

/**
 * Shared chrome for the in-page demos: it names the demo, states that it runs
 * here rather than being a recording, labels the interactive region for screen
 * readers, and honours prefers-reduced-motion.
 */
export function DemoFrame({
  anchorId,
  label = 'Live demo',
  title,
  description,
  provenance = DEFAULT_PROVENANCE,
  badges,
  toolbar,
  reducedMotionFallback,
  onReset,
  resetLabel = 'Reset demo',
  className = '',
  children
}: DemoFrameProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const noteId = useId();
  const showFallback = prefersReducedMotion && Boolean(reducedMotionFallback);

  const header = (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-700/60 px-4 py-3.5 md:px-5">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-300">
            {label}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-2.5 py-0.5 text-[0.68rem] font-medium text-purple-200">
            <Activity className="h-3 w-3" aria-hidden="true" />
            Runs in this page
          </span>
        </div>
        {/* The rail only collects h2[id], so an id here serves deep links without
            entering the table of contents. */}
        <h3 id={anchorId} className="mt-2 scroll-mt-28 text-base font-semibold leading-snug text-gray-100 md:text-lg">
          {title}
        </h3>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-gray-400">{description}</p>
        )}
      </div>
      {(toolbar || onReset) && (
        <div className="flex flex-wrap items-center justify-end gap-2">
          {toolbar}
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="rounded-md border border-gray-600/80 bg-gray-800/80 px-2.5 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700"
            >
              {resetLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <StoryFigure
      header={header}
      caption={<span id={noteId}>{provenance}</span>}
      badges={badges}
      plate="dark"
      mediaLayout="block"
      mediaClassName="px-4 py-5 md:px-5 md:py-6"
      className={`focus-within:border-purple-500/50 ${
        prefersReducedMotion ? '' : 'transition-colors'
      } ${className}`}
    >
      <div
        role="group"
        aria-label={title}
        aria-describedby={noteId}
        data-reduced-motion={prefersReducedMotion ? 'true' : undefined}
      >
        {showFallback ? reducedMotionFallback : children}
      </div>
      {showFallback && (
        <p className="mt-4 text-xs leading-relaxed text-gray-400">
          A static version is shown because your system asks for reduced motion.
        </p>
      )}
    </StoryFigure>
  );
}
