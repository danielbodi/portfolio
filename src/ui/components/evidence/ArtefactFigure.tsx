import React from 'react';
import { Artefact } from '../../../content/types';
import { DeliveryStateTag } from './DeliveryStateTag';
import { EvidenceClassTag } from './EvidenceClassTag';
import { ExpandableImage } from './ExpandableImage';
import { Card } from '../cards/Card';

interface ArtefactFigureProps {
  artefact: Artefact;
  /** Compact rendering for grid galleries. */
  compact?: boolean;
  /**
   * cover: uniform 16:9 crop for grids.
   * natural: full image at intrinsic ratio — required for diagrams and
   * full screens shown at readable scale (brief section 7.6).
   */
  fit?: 'cover' | 'natural';
}

/**
 * An artefact with a structured caption: what it is, why it mattered,
 * the contribution, and its delivery state (brief section 6.5 / 13).
 */
export function ArtefactFigure({ artefact, compact = false, fit = 'cover' }: ArtefactFigureProps) {
  return (
    <Card className="h-full overflow-hidden px-0 py-0">
    <figure className="flex h-full flex-col">
      <div className="border-b border-gray-700/60 bg-gray-950/40">
        {artefact.videoSrc ? (
          <video
            controls
            preload="metadata"
            poster={artefact.src}
            aria-label={artefact.alt}
            className="aspect-video w-full"
          >
            <source src={artefact.videoSrc} type="video/mp4" />
            Your browser does not support embedded videos.
          </video>
        ) : (
          <ExpandableImage
            src={artefact.src}
            alt={artefact.alt}
            className={
              fit === 'cover' ? 'aspect-video w-full object-cover object-top' : 'w-full'
            }
          />
        )}
      </div>
      <figcaption className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold leading-snug text-gray-200">{artefact.what}</p>
          <div className="flex flex-wrap justify-end gap-2">
            {artefact.evidenceClass && <EvidenceClassTag label={artefact.evidenceClass} />}
            <DeliveryStateTag state={artefact.state} />
          </div>
        </div>
        {!compact && artefact.why && (
          <p className="text-sm leading-relaxed text-gray-400">{artefact.why}</p>
        )}
        {artefact.contribution && (
          <p className="text-xs leading-relaxed text-gray-500">
            <span className="font-semibold uppercase tracking-wide text-gray-400">My part: </span>
            {artefact.contribution}
          </p>
        )}
        {artefact.evidenceNote && (
          <p className="text-xs leading-relaxed text-amber-200/70">
            <span className="font-semibold uppercase tracking-wide">Evidence limit: </span>
            {artefact.evidenceNote}
          </p>
        )}
        {!compact && artefact.technicalNote && (
          <p className="text-xs leading-relaxed text-gray-500">{artefact.technicalNote}</p>
        )}
      </figcaption>
    </figure>
    </Card>
  );
}
