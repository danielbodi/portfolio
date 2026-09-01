import type { ReactNode } from 'react';
import { CaseCard } from '../../../content/types';
import { WorkCard } from './WorkCard';

interface SelectedWorkSectionProps {
  id: string;
  headingId: string;
  /** h1 where the group title is also the page title (/work), h2 within a page. */
  headingLevel: 1 | 2;
  title: string;
  description: string;
  cards: CaseCard[];
  variant?: 'editorial' | 'index';
  /** Vertical rhythm only — the section's inner structure stays uniform. */
  className?: string;
  /** Trailing affordance, e.g. the home teaser's link to the full index. */
  footer?: ReactNode;
}

/**
 * One group of cases: heading, one-line framing, then a stack of rows.
 * The home teaser and both groups on /work render through this, so the listing
 * markup exists once and every surface emits the same section, header and row
 * wrappers — differing only in card set, card variant and heading level.
 */
export function SelectedWorkSection({
  id,
  headingId,
  headingLevel,
  title,
  description,
  cards,
  variant = 'editorial',
  className = 'pb-10 pt-16 md:pb-14 md:pt-24',
  footer
}: SelectedWorkSectionProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <section id={id} aria-labelledby={headingId} className={className}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <Heading id={headingId} className="mb-3 text-3xl font-bold text-purple-300 md:text-4xl">
            {title}
          </Heading>
          <p className="max-w-2xl text-gray-400">{description}</p>
        </header>

        <div className={variant === 'index' ? 'space-y-4' : 'space-y-6'}>
          {cards.map((card, index) => (
            <WorkCard
              key={card.slug}
              card={card}
              variant={variant}
              imagePosition={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>

        {footer}
      </div>
    </section>
  );
}
