import React from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { flagshipCards } from '../content/caseStudies/cards';
import { TextLink } from '../ui/components/links/TextLink';

export function NotFound() {
  useSeo({
    title: 'Page not found — Daniel Bodi Gil',
    description: 'This page does not exist. Browse the selected work instead.',
    path: '/404'
  });

  return (
    <div className="flex min-h-[70vh] items-center py-16">
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">404</p>
        <h1 className="mb-4 text-3xl font-bold text-purple-300 md:text-4xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mb-8 text-lg text-gray-400">
          The address may have changed — case studies now live under{' '}
          <Link to="/work" className="text-purple-300 underline underline-offset-4">
            /work
          </Link>
          .
        </p>
        <nav aria-label="Suggested destinations">
          <ul className="space-y-2">
            <li>
              <TextLink to="/work">Browse the selected work</TextLink>
            </li>
            {flagshipCards.map((card) => (
              <li key={card.slug}>
                <TextLink to={`/work/${card.slug}`}>{card.ctaLabel}</TextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NotFound;
