import React from 'react';
import { Link } from 'react-router-dom';
import { flagshipCards } from '../../../content/caseStudies/cards';
import { WorkCard } from '../work/WorkCard';

/** The three flagship cases, each with a project-specific CTA (brief section 6.3). */
export function FeaturedCases() {
  return (
    <section aria-labelledby="featured-heading" className="px-4 pb-10 pt-16 md:px-6 md:pb-14 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="featured-heading" className="mb-3 text-3xl font-bold text-purple-300 md:text-4xl">
              Selected work
            </h2>
            <p className="max-w-2xl text-gray-400">
              Three flagship cases: a healthcare application ecosystem, a design system for a fleet
              platform, and a safety-critical device interface.
            </p>
          </div>
          <Link to="/work" className="c-button c-button--secondary flex-shrink-0">
            All work, including earlier foundations
          </Link>
        </div>

        <div className="space-y-6">
          {flagshipCards.map((card, index) => (
            <WorkCard key={card.slug} card={card} imagePosition={index % 2 === 0 ? 'left' : 'right'} />
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-gray-700/60 bg-gray-900/40 p-5 md:p-6">
          <p className="mb-3 text-sm font-semibold text-gray-300">Hiring for a specific role?</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              to="/staff-product-design"
              className="text-sm text-purple-300 underline-offset-4 hover:underline"
            >
              Staff product design path — strategy, ambiguity, validation
            </Link>
            <Link
              to="/design-engineering"
              className="text-sm text-purple-300 underline-offset-4 hover:underline"
            >
              Design engineering path — tokens, Storybook, architecture
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
