import React from 'react';
import { SystemEvidenceVisual as SystemEvidenceVisualContent } from '../../../content/types';
import { ExpandableImage } from './ExpandableImage';

interface SystemEvidenceVisualProps {
  visual: SystemEvidenceVisualContent;
}

export function SystemEvidenceVisual({ visual }: SystemEvidenceVisualProps) {
  if (visual.kind === 'image') {
    return (
      <figure className="max-w-5xl overflow-hidden rounded-lg border border-gray-600/80 bg-gray-900/60">
        <div className="border-b border-gray-700/70 bg-gray-950/50">
          <ExpandableImage src={visual.src} alt={visual.alt} className="w-full" />
        </div>
        {visual.caption && (
          <figcaption className="px-4 py-3 text-xs leading-relaxed text-gray-300">
            {visual.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="max-w-4xl overflow-hidden rounded-lg border border-gray-600/80 bg-gray-950/75">
      <div className="flex items-center justify-between border-b border-gray-700/80 px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-purple-300">
          {visual.label ?? 'Implementation excerpt'}
        </span>
        {visual.language && (
          <span className="font-mono text-[0.68rem] uppercase tracking-wide text-gray-400">
            {visual.language}
          </span>
        )}
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-gray-200 md:p-5">
        <code>{visual.code}</code>
      </pre>
      {visual.caption && (
        <figcaption className="border-t border-gray-700/80 px-4 py-3 text-xs leading-relaxed text-gray-300">
          {visual.caption}
        </figcaption>
      )}
    </figure>
  );
}
