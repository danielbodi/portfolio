import React from 'react';
import { flagshipCards } from '../content/caseStudies/cards';
import { WorkCard } from '../ui/components/work/WorkCard';
import { useSeo } from '../hooks/useSeo';

export function WorkIndex() {
  useSeo({
    title: 'Selected Work — Daniel Bodi Gil',
    description:
      'Flagship case studies in enterprise product design, design systems and UX engineering: Bridgestone, Solidaris and Trasis.',
    path: '/work'
  });

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 md:mb-14">
          <h1 className="mb-4 text-3xl font-bold text-purple-300 md:text-4xl">Selected work</h1>
          <p className="text-lg leading-relaxed text-gray-400">
            Three flagship cases in enterprise product design, design systems and UX engineering.
          </p>
        </header>

        <div className="space-y-4">
          {flagshipCards.map((card) => (
            <WorkCard key={card.slug} card={card} variant="index" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkIndex;
