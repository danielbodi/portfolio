import React from 'react';
import { Artefact } from '../../../content/types';
import { analytics } from '../../../utils/basicAnalytics';
import { DeliveryStateTag } from './DeliveryStateTag';
import { EvidenceClassTag } from './EvidenceClassTag';
import { ExpandableImage } from './ExpandableImage';
import { Card } from '../cards/Card';
import { TextLink } from '../links/TextLink';

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
  /** When false, the case-study link is taken out of the tab order (marquee clones). */
  linkTabbable?: boolean;
}

/**
 * An artefact with a structured caption: what it is, why it mattered,
 * the contribution, and its delivery state (brief section 6.5 / 13).
 */
export function ArtefactFigure({
  artefact,
  compact = false,
  fit = 'cover',
  linkTabbable = true,
}: ArtefactFigureProps) {
  return (
    <Card className="h-full overflow-hidden px-0 py-0">
      <figure className="flex h-full flex-col">
        <div className="border-b border-gray-700/60">
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
              frameClassName={fit === 'cover' ? 'aspect-video' : undefined}
              className={
                fit === 'cover'
                  ? 'h-full w-full object-contain object-center'
                  : 'w-full'
              }
            />
          )}
        </div>
        <figcaption className={`flex flex-1 flex-col gap-2 ${compact ? 'p-4' : 'p-5'}`}>
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold leading-snug text-gray-200">{artefact.what}</p>
            <div className="flex flex-wrap justify-end gap-2">
              {artefact.evidenceClass && <EvidenceClassTag label={artefact.evidenceClass} />}
              <DeliveryStateTag state={artefact.state} />
            </div>
          </div>
          {artefact.contribution && (
            <p className="text-xs leading-relaxed text-gray-400">
              <span className="font-semibold uppercase tracking-wide text-gray-300">My part: </span>
              {artefact.contribution}
            </p>
          )}
          {artefact.href && artefact.caseLabel && (
            <TextLink
              to={artefact.href}
              tabIndex={linkTabbable ? undefined : -1}
              className="mt-auto self-start"
              onClick={() =>
                analytics.trackPortfolioEvent('case_study_opened', {
                  href: artefact.href,
                  source: 'artefact-gallery',
                })
              }
            >
              Read the {artefact.caseLabel} case
            </TextLink>
          )}
        </figcaption>
      </figure>
    </Card>
  );
}
