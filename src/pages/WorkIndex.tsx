import React from 'react';
import { flagshipCards, supportingCards } from '../content/caseStudies/cards';
import { WorkCard } from '../ui/components/work/WorkCard';
import { useSeo } from '../hooks/useSeo';

export function WorkIndex() {
  useSeo({
    title: 'Selected Work — Daniel Bodi Gil',
    description:
      'Flagship case studies in enterprise product design, design systems and UX engineering: Bridgestone, Solidaris and Trasis, with earlier foundations at Sopra Banking and Base.',
    path: '/work'
  });

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 md:mb-14">
          <h1 className="mb-4 text-3xl font-bold text-purple-300 md:text-4xl">Selected work</h1>
          <p className="text-lg leading-relaxed text-gray-400">
            Ordered by relevance, not chronology. The three flagship cases show product direction,
            design systems and implementation work in depth; the earlier projects show where those
            foundations come from.
          </p>
        </header>

        <section aria-labelledby="flagship-heading" className="mb-16">
          <h2 id="flagship-heading" className="mb-6 text-xl font-semibold text-gray-200">
            Flagship cases
          </h2>
          <div className="space-y-6">
            {flagshipCards.map((card, index) => (
              <WorkCard
                key={card.slug}
                card={card}
                imagePosition={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="earlier-heading">
          <h2 id="earlier-heading" className="mb-2 text-xl font-semibold text-gray-200">
            Earlier foundations
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-500">
            Shorter reads. These projects built the engineering discipline behind the recent work.
          </p>
          <div className="space-y-4">
            {supportingCards.map((card) => (
              <WorkCard key={card.slug} card={card} variant="compact" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default WorkIndex;
