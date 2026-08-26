import React from 'react';
import { Link } from 'react-router-dom';
import { capabilities } from '../content/site';
import { useSeo } from '../hooks/useSeo';
import { Card } from '../ui/components/cards/Card';

interface PracticePoint {
  capabilityId: string;
  points: string[];
}

const practice: PracticePoint[] = [
  {
    capabilityId: 'product-direction',
    points: [
      'Start from the question the user is answering — at Solidaris, iShare was reframed from task management into case comprehension.',
      'Map the objects behind a workflow before drawing layouts; make trade-offs explicit and test the alternatives.'
    ]
  },
  {
    capabilityId: 'systems',
    points: [
      'Recurring decisions become named patterns: case summaries, master lists, journeys, status semantics, drawers.',
      'Keep inherited and created layers explicit — CSS is the production source of truth at Bridgestone; Solidaris shows a product-local token-governance proposal whose implementation state is still bounded.'
    ]
  },
  {
    capabilityId: 'delivery',
    points: [
      'Prototype the risky interactions, so feedback happens on behaviour rather than promises.',
      'Work inside the front-end: ITCSS/BEM architecture, PrimeNG theming, pull-request review and developer coaching.'
    ]
  }
];

export function Approach() {
  useSeo({
    title: 'Approach — Daniel Bodi Gil',
    description:
      'How I work: framing complex workflows, building reusable design foundations, and staying close to implementation through prototypes, Storybook and code review.',
    path: '/approach'
  });

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="mb-4 text-3xl font-bold text-purple-300 md:text-4xl">How I create leverage</h1>
          <p className="text-lg leading-relaxed text-gray-400">
            Three connected capabilities. Each one is only useful because of the other two: direction
            without systems doesn&apos;t scale, systems without delivery don&apos;t ship, and delivery
            without direction solves the wrong problem.
          </p>
        </header>

        <div className="mb-14 space-y-10">
          {capabilities.map((capability) => {
            const points = practice.find((p) => p.capabilityId === capability.id)?.points ?? [];
            return (
              <section key={capability.id} aria-labelledby={`${capability.id}-heading`}>
                <Card>
                  <h2 id={`${capability.id}-heading`} className="mb-2 text-2xl font-bold text-gray-100">
                    {capability.title}
                  </h2>
                  <p className="mb-5 text-gray-400">{capability.text}</p>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    In practice
                  </h3>
                  <ul className="mb-5 space-y-2.5">
                    {points.map((point, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                        <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-x-5 gap-y-1">
                    {capability.links.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="text-sm text-purple-300 underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </Card>
              </section>
            );
          })}
        </div>

        <section aria-labelledby="standards-heading" className="mb-14">
          <h2 id="standards-heading" className="mb-4 text-2xl font-bold text-gray-100">
            Quality standards I hold work to
          </h2>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {[
              'Empty, loading, error and edge states are designed, not discovered in production.',
              'Status is never communicated by colour alone — text, icons and semantics carry the meaning.',
              'Expert users keep their density and codes; newer users get readable explanations alongside.',
              'Components declare when not to use them — anti-patterns are documented, not tribal knowledge.',
              'Accessibility is an interaction and information concern, checked during design, not audited after.',
              'Metrics only appear with a baseline and a method; otherwise the claim stays qualitative.'
            ].map((standard, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                {standard}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="next-heading">
          <h2 id="next-heading" className="mb-4 text-2xl font-bold text-gray-100">
            See it applied
          </h2>
          <p className="mb-6 text-gray-400">
            The case studies show these capabilities working together on real products.
          </p>
          <Link to="/work" className="c-button c-button--primary">
            View selected work
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Approach;
