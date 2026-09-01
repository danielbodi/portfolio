import { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CaseStudy, DeliveryState } from '../content/types';
import {
  VisualEvidenceStatus,
  VisualStory,
  VisualStoryMedia
} from '../content/caseStudies/visualStories';
import { useSeo } from '../hooks/useSeo';
import { analytics } from '../utils/basicAnalytics';
import { Card } from '../ui/components/cards/Card';
import {
  DeliveryStateTag,
  ExpandableImage,
  SystemEvidenceVisual
} from '../ui/components/evidence';
import { DefinitionStrip, EvidenceStatusBadge, StoryFigure } from '../ui/components/story';
import { StoryDiagram } from '../ui/components/story/diagrams/registry';
import { LiveDemo } from '../ui/components/demos';

interface VisualCaseStudyTemplateProps {
  study: CaseStudy;
  story: VisualStory;
}

interface MediaProps {
  media: VisualStoryMedia;
  study: CaseStudy;
  /**
   * Set when the figure shares a row with another. Source screenshots run from
   * 1.4:1 to 2:1, so a row of natural heights ends at different points; a
   * figure standing alone has nothing to line up with and keeps its own shape.
   */
  sharesRow?: boolean;
}

/* A state tag earns its place only when it adds information the evidence badge
   does not already carry: "Verified" implies shipped work and "Prototype"
   implies a concept, so those pairs collapse to the evidence badge alone. The
   two vocabularies also overlap on words like "Ongoing", and repeating one
   word as two adjacent pills reads as a rendering fault rather than nuance. */
const REDUNDANT_STATES: Partial<Record<VisualEvidenceStatus, DeliveryState[]>> = {
  Verified: ['Shipped', 'In production'],
  Prototype: ['Concept']
};

/**
 * Muted clip that plays while it is on screen and pauses off screen. Under
 * prefers-reduced-motion it stays a poster with controls, like any video.
 */
function StoryVideo({ media }: { media: Extract<VisualStoryMedia, { kind: 'video' }> }) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* Autoplay can be denied; the controls remain. */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <video
      ref={videoRef}
      controls
      muted
      loop
      playsInline
      preload="metadata"
      poster={media.poster}
      aria-label={media.alt}
      className="aspect-video w-full bg-gray-950"
    >
      <source src={media.src} type="video/mp4" />
    </video>
  );
}

function VisualMedia({ media, study, sharesRow = false }: MediaProps) {
  if (media.kind === 'system-evidence') {
    const visual = study.systemEvidence?.[media.sourceIndex]?.visual;
    if (!visual) return null;

    return (
      <div className="[&>figure]:max-w-none">
        <SystemEvidenceVisual visual={visual} />
      </div>
    );
  }

  if (media.kind === 'live-demo') {
    return <LiveDemo media={media} />;
  }

  if (media.kind === 'video') {
    const showState =
      media.state &&
      media.state !== media.evidenceStatus &&
      !(media.evidenceStatus && REDUNDANT_STATES[media.evidenceStatus]?.includes(media.state));
    const badges =
      media.evidenceStatus || showState ? (
        <>
          {media.evidenceStatus && <EvidenceStatusBadge status={media.evidenceStatus} />}
          {showState && media.state && <DeliveryStateTag state={media.state} />}
        </>
      ) : undefined;

    return (
      <StoryFigure
        plate="dark"
        label={media.label}
        caption={media.caption}
        myPart={media.myPart}
        badges={badges}
        mediaLayout="block"
      >
        <StoryVideo media={media} />
      </StoryFigure>
    );
  }

  if (media.kind === 'diagram') {
    const showState =
      media.state &&
      media.state !== media.evidenceStatus &&
      !(media.evidenceStatus && REDUNDANT_STATES[media.evidenceStatus]?.includes(media.state));
    const badges =
      media.evidenceStatus || showState ? (
        <>
          {media.evidenceStatus && <EvidenceStatusBadge status={media.evidenceStatus} />}
          {showState && media.state && <DeliveryStateTag state={media.state} />}
        </>
      ) : undefined;

    return (
      <StoryFigure
        plate="dark"
        label={media.label}
        caption={media.caption}
        myPart={media.myPart}
        badges={badges}
        mediaLayout="block"
      >
        <StoryDiagram diagramId={media.diagramId} />
      </StoryFigure>
    );
  }

  const showState =
    media.state &&
    media.state !== media.evidenceStatus &&
    !(media.evidenceStatus && REDUNDANT_STATES[media.evidenceStatus]?.includes(media.state));
  const badges =
    media.evidenceStatus || showState ? (
      <>
        {media.evidenceStatus && <EvidenceStatusBadge status={media.evidenceStatus} />}
        {showState && media.state && <DeliveryStateTag state={media.state} />}
      </>
    ) : undefined;

  /* Authored SVGs carry their own dark canvas. Screenshots letterbox onto a
     plate sampled from the image itself inside ExpandableImage. */
  const plate = media.src.endsWith('.svg') ? 'dark' : 'none';

  return (
    <StoryFigure
      plate={plate}
      label={media.label}
      caption={media.caption}
      myPart={media.myPart}
      badges={badges}
    >
      <ExpandableImage
        src={media.src}
        alt={media.alt}
        frameClassName={sharesRow ? 'lg:aspect-[16/9]' : undefined}
        className={
          sharesRow
            ? 'h-auto w-full object-contain object-center lg:h-full lg:w-full'
            : 'h-auto max-h-[70vh] w-full object-contain object-center'
        }
      />
    </StoryFigure>
  );
}

function MediaGrid({
  media,
  study,
  singleColumn = false
}: {
  media: VisualStoryMedia[];
  study: CaseStudy;
  /** Split chapters hand the media a little over half the measure; splitting it
      again shrinks dense diagrams below the size at which they can be read. */
  singleColumn?: boolean;
}) {
  /* Demos and stacked system evidence need the full measure to stay readable. */
  const needsFullWidth =
    singleColumn ||
    media.length === 1 ||
    media.some(
      (item) =>
        item.kind === 'live-demo' || item.kind === 'video' || item.kind === 'diagram'
    ) ||
    media.every((item) => item.kind === 'system-evidence');
  /* Two columns at most. Three dense UI screenshots across the measure land at
     roughly 350px each, where the caption outweighs the thing it describes. */
  const columns = needsFullWidth ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2';
  /* An odd count would otherwise leave the last figure alone beside an empty
     cell; giving it the full measure reads as a deliberate closing beat. */
  const spansLast = !needsFullWidth && media.length % 2 === 1;

  return (
    <div className={`grid gap-5 ${columns}`}>
      {media.map((item, index) => {
        const spans = spansLast && index === media.length - 1;

        return (
          <div key={`${item.kind}-${index}`} className={`h-full${spans ? ' lg:col-span-2' : ''}`}>
            <VisualMedia media={item} study={study} sharesRow={!needsFullWidth && !spans} />
          </div>
        );
      })}
    </div>
  );
}

function StoryCopy({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="story-copy space-y-4 text-base leading-relaxed text-gray-300 [&_strong]:font-medium [&_strong]:text-gray-100">
      {paragraphs.map((paragraph, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
      ))}
    </div>
  );
}

function StorySequence({
  items
}: {
  items: NonNullable<VisualStory['chapters'][number]['sequence']>;
}) {
  return (
    <ol className={`mt-8 grid gap-3 ${items.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
      {items.map((item, index) => (
        <li
          key={`${item.label}-${index}`}
          className="rounded-xl border border-gray-700/60 bg-gray-900/20 p-4"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/15 text-xs font-semibold text-purple-300">
              {index + 1}
            </span>
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gray-500">
              {item.label}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

function ReflectionCard({
  label,
  text,
  accent
}: {
  label: string;
  text: string | string[];
  accent: 'emerald' | 'amber' | 'purple';
}) {
  const accentClass = {
    emerald: 'text-emerald-300',
    amber: 'text-amber-300',
    purple: 'text-purple-300'
  }[accent];

  return (
    <Card className="h-full">
      <h3 className={`mb-3 text-xs font-semibold uppercase tracking-[0.12em] ${accentClass}`}>
        {label}
      </h3>
      {Array.isArray(text) ? (
        <ul className="space-y-2">
          {text.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-gray-300">
              <span
                aria-hidden="true"
                className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-600"
              />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-relaxed text-gray-300">{text}</p>
      )}
    </Card>
  );
}

export function VisualCaseStudyTemplate({ study, story }: VisualCaseStudyTemplateProps) {
  const { card } = study;
  const pathname = `/work/${card.slug}`;

  useSeo({
    title: study.seo.title,
    description: study.seo.description,
    path: pathname,
    image: card.thumbnail
  });

  useEffect(() => {
    analytics.trackPortfolioEvent('project_view', { slug: card.slug });
  }, [card.slug]);

  return (
    <article className="case-page visual-story pb-24 pt-4 md:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="pb-16 md:pb-24">
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gray-700/80 ring-1 ring-gray-600/80">
              <img
                src={card.logo}
                alt=""
                className={`h-7 w-7 object-contain${card.logoInvert ? ' brightness-0 invert' : ''}`}
              />
            </div>
            <span className="text-lg font-semibold text-gray-100">{card.company}</span>
            <DeliveryStateTag state={card.deliveryState} />
          </div>

          <h1 className="max-w-5xl text-4xl font-bold leading-[1.04] tracking-display text-purple-300 md:text-6xl lg:text-7xl">
            {story.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
            {story.statement}
          </p>

          <DefinitionStrip
            className="mt-10"
            items={story.facts.map((fact) => ({ label: fact.label, text: fact.value }))}
          />

          {story.jumpTo && story.jumpTo.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {story.jumpTo.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-200 transition-colors hover:bg-purple-500/20 focus-visible:bg-purple-500/20"
                  onClick={(event) => {
                    /* A second click on the same hash is not a navigation, so
                       App.tsx's hash effect does not run. Scroll ourselves. */
                    const hashIndex = item.href.indexOf('#');
                    const id = hashIndex >= 0 ? item.href.slice(hashIndex + 1) : '';
                    if (!id || window.location.hash !== `#${id}`) return;
                    event.preventDefault();
                    const target = document.getElementById(id);
                    if (!target) return;
                    const top = target.getBoundingClientRect().top + window.scrollY - 112;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }}
                >
                  <Activity className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 md:mt-14">
            <VisualMedia media={story.heroMedia} study={study} />
          </div>
        </header>

        {story.chapters.map((chapter) => {
          const isSplit = chapter.layout === 'split';

          return (
            <section
              key={chapter.id}
              id={chapter.id}
              className="border-t border-gray-700/60 py-16 md:py-24"
              aria-labelledby={`${chapter.id}-title`}
            >
              <div className="mb-6 max-w-3xl">
                <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
                  <span className="text-purple-300">{chapter.number}</span>
                  <span className="h-px w-8 bg-gray-700" aria-hidden="true" />
                  <span className="text-gray-500">{chapter.eyebrow}</span>
                </div>
                <h2
                  id={`${chapter.id}-title`}
                  className={`text-3xl font-bold leading-tight tracking-display text-gray-100 ${
                    isSplit ? 'md:text-4xl' : 'md:text-5xl'
                  }`}
                >
                  {chapter.title}
                </h2>
              </div>
              {chapter.decision && (
                <DefinitionStrip
                  className="mb-10"
                  items={[
                    { label: 'Constraint', text: chapter.decision.constraint },
                    { label: 'Choice', text: chapter.decision.choice },
                    { label: 'Trade-off', text: chapter.decision.tradeOff }
                  ]}
                />
              )}
              {isSplit ? (
                <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
                  {/* Five columns rather than four: at four, a chapter with more than
                      one paragraph wraps at roughly 35 characters a line. */}
                  <div className="lg:col-span-5">
                    <StoryCopy paragraphs={chapter.paragraphs} />
                    {chapter.evidenceLine && (
                      <p className="mt-6 border-l-2 border-purple-500/60 pl-4 text-sm leading-relaxed text-gray-400">
                        {chapter.evidenceLine}
                      </p>
                    )}
                  </div>
                  <div className="lg:col-span-7">
                    {chapter.media.length > 0 && (
                      <MediaGrid media={chapter.media} study={study} singleColumn />
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-10 max-w-3xl">
                    <StoryCopy paragraphs={chapter.paragraphs} />
                  </div>
                  {chapter.media.length > 0 && <MediaGrid media={chapter.media} study={study} />}
                  {chapter.evidenceLine && (
                    <p className="mt-6 max-w-4xl border-l-2 border-purple-500/60 pl-4 text-sm leading-relaxed text-gray-400">
                      {chapter.evidenceLine}
                    </p>
                  )}
                </>
              )}
              {chapter.sequence && <StorySequence items={chapter.sequence} />}
            </section>
          );
        })}

        <section className="border-t border-gray-700/60 py-16 md:py-24" aria-labelledby="outcomes">
          <div className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-purple-300">
                Evidence
              </p>
              <h2
                id="outcomes"
                className="text-3xl font-bold tracking-display text-gray-100 md:text-5xl"
              >
                {story.outcomesTitle}
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-gray-500">
              Claims are deliberately separated from the limits of the available evidence.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {story.outcomes.map((outcome) => (
              <Card key={outcome.label} className="h-full">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-300">
                    {outcome.label}
                  </h3>
                  <EvidenceStatusBadge status={outcome.evidenceStatus} />
                </div>
                <p className="text-sm leading-relaxed text-gray-300">{outcome.text}</p>
              </Card>
            ))}
          </div>
          {/* Neutral surface on purpose: amber is the site's alert colour, and a warning-
              coloured panel outweighed the outcome cards it qualifies. */}
          <div className="mt-5 rounded-xl border border-gray-700/60 bg-gray-900/20 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
              Evidence boundary
            </p>
            <p className="mt-2 max-w-5xl text-sm leading-relaxed text-gray-400">{story.boundary}</p>
          </div>
        </section>

        <section className="border-t border-gray-700/60 py-16 md:py-24" aria-labelledby="reflection">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-purple-300">
            Looking back
          </p>
          <h2
            id="reflection"
            className="mb-9 text-3xl font-bold tracking-display text-gray-100 md:text-5xl"
          >
            Reflection
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <ReflectionCard label="I would repeat" text={story.reflection.repeat} accent="emerald" />
            <ReflectionCard label="I would change" text={story.reflection.change} accent="amber" />
            <ReflectionCard label="Next" text={story.reflection.next} accent="purple" />
          </div>
        </section>

        {study.connection && (
          <footer className="border-t border-gray-700/60 pt-9">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                  Continue reading
                </p>
                <h3 className="text-2xl font-semibold text-purple-300">{study.connection.title}</h3>
                <p
                  className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400"
                  dangerouslySetInnerHTML={{ __html: study.connection.description }}
                />
              </div>
              <Link to={study.connection.href} className="c-button c-button--secondary flex-shrink-0">
                {study.connection.buttonText}
              </Link>
            </div>
          </footer>
        )}
      </div>
    </article>
  );
}
