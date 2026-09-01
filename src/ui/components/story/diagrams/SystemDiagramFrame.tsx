import type { ReactNode } from 'react';

interface SystemDiagramFrameProps {
  id: string;
  eyebrow: string;
  title: string;
  primaryLegend: string;
  secondaryLegend: string;
  children: ReactNode;
}

/**
 * Shared visual grammar for the Solidaris system diagrams. Relationship and
 * proposal use purple; later review or evidence limits use dashed amber.
 */
export function SystemDiagramFrame({
  id,
  eyebrow,
  title,
  primaryLegend,
  secondaryLegend,
  children
}: SystemDiagramFrameProps) {
  return (
    <section
      className="bg-slate-950 px-4 py-5 sm:px-6 sm:py-6 lg:px-8"
      aria-labelledby={id}
    >
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-purple-300">
            {eyebrow}
          </p>
          <h3 id={id} className="mt-1 text-lg font-semibold text-slate-100">
            {title}
          </h3>
        </div>
        <ul
          className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400"
          aria-label="Diagram legend"
        >
          <li className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 bg-purple-400" aria-hidden="true" />
            {primaryLegend}
          </li>
          <li className="inline-flex items-center gap-2">
            <span className="w-6 border-t border-dashed border-amber-300" aria-hidden="true" />
            {secondaryLegend}
          </li>
        </ul>
      </div>
      {children}
    </section>
  );
}
