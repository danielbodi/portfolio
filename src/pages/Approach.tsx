import React from 'react';
import { Link } from 'react-router-dom';
import { capabilities } from '../content/site';
import { useSeo } from '../hooks/useSeo';
import { TextLink } from '../ui/components/links/TextLink';
import { SectionHeader } from '../ui/components/layout/SectionHeader';
import { CapabilityLoopDiagram } from '../ui/components/approach/CapabilityLoopDiagram';

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

const qualityStandards = [
  'Empty, loading, error and edge states are designed, not discovered in production.',
  'Status is never communicated by colour alone — text, icons and semantics carry the meaning.',
  'Expert users keep their density and codes; newer users get readable explanations alongside.',
  'Components declare when not to use them — anti-patterns are documented, not tribal knowledge.',
  'Accessibility is an interaction and information concern, checked during design, not audited after.',
  'Metrics only appear with a baseline and a method; otherwise the claim stays qualitative.'
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
        <header className="mb-16">
          <h1 className="text-3xl font-bold text-purple-300 md:text-4xl">How I create leverage</h1>
          <div className="mt-4 h-1 w-10 rounded bg-purple-400" aria-hidden="true" />
          <p className="mt-8 text-lg leading-relaxed text-gray-400">
            Three connected capabilities. Each one is only useful because of the other two: direction
            without systems doesn&apos;t scale, systems without delivery don&apos;t ship, and delivery
            without direction solves the wrong problem.
          </p>
        </header>

        <div className="mb-16 md:mb-20">
          <CapabilityLoopDiagram />
        </div>

        {capabilities.map((capability, index) => {
          const points = practice.find((p) => p.capabilityId === capability.id)?.points ?? [];
          return (
            <section
              key={capability.id}
              className="border-t border-gray-700/60 py-12 md:py-16"
              aria-labelledby={`${capability.id}-heading`}
            >
              <SectionHeader
                number={String(index + 1).padStart(2, '0')}
                eyebrow="Capability"
                title={capability.title}
                titleId={`${capability.id}-heading`}
              />
              <p className="mb-6 text-gray-400">{capability.text}</p>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                In practice
              </h3>
              <ul className="mb-6 space-y-3">
                {points.map((point, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {capability.links.map((link) => (
                  <TextLink key={link.href} to={link.href}>
                    {link.label}
                  </TextLink>
                ))}
              </div>
            </section>
          );
        })}

        <section
          className="border-t border-gray-700/60 py-12 md:py-16"
          aria-labelledby="standards-heading"
        >
          <SectionHeader
            number="04"
            eyebrow="Standards"
            title="Quality standards I hold work to"
            titleId="standards-heading"
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {qualityStandards.map((standard, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                {standard}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="border-t border-gray-700/60 py-12 md:py-16"
          aria-labelledby="next-heading"
        >
          <h2 id="next-heading" className="mb-3 text-xl font-semibold text-gray-100">
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
