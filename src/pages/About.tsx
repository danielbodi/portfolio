import React from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { contact, earlierRoles } from '../content/site';
import { analytics } from '../utils/basicAnalytics';
import { Card } from '../ui/components/cards/Card';

const pathPoints = [
  'Taught web design, then spent years building UI \u2014 high-traffic telecom sites at Design is Dead/Emakina, where cross-browser discipline and BEM became habits.',
  'At Sopra Banking I crossed from building UI to changing how a team builds it: CSS architecture, atomic components, coaching.',
  'Consulting via CTG/Cegeka took that further \u2014 a safety-critical device at Trasis, six years of design-system ownership at Bridgestone, and an ongoing product-and-systems assignment at Solidaris.'
];

const togetherPoints = [
  'Because I build front-ends, design work arrives implementation-ready: components have states, tokens have names, layouts have a CSS strategy.',
  'Because I design, the engineering protects intent \u2014 fewer translation losses between Figma and production, and a design system developers actually want to use.'
];

const workingStyle = [
  'Evidence over opinion \u2014 prototypes and task-based tests settle debates.',
  'Autonomous but transparent \u2014 direction first, reasoning visible to stakeholders.',
  'Teaching multiplies the work \u2014 coaching developers, documenting patterns.',
  'Calm with ambiguity \u2014 complex domains reward patient modelling.'
];

export function About() {
  useSeo({
    title: 'About — Daniel Bodi Gil',
    description:
      'Product designer and UX engineer based in Belgium. Fifteen years across interface design and front-end delivery, focused on the systems that help teams ship coherent products.',
    path: '/about'
  });

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="mb-4 text-3xl font-bold text-purple-300 md:text-4xl">About</h1>
          <p className="text-lg leading-relaxed text-gray-400">
            I have spent around 15 years working in the space between interface design and front-end
            delivery. I started by building UI, moved deeper into product and user experience, and
            increasingly focused on the systems, patterns and decisions that help teams ship coherent
            products at scale.
          </p>
        </header>

        <div className="mb-10 space-y-6">
          <section aria-labelledby="focus-heading">
            <Card>
              <h2 id="focus-heading" className="mb-2 text-2xl font-bold text-gray-100">
                Solidaris assignment · October 2025–October 2026
              </h2>
              <p className="leading-relaxed text-gray-400">
                I work across three Solidaris product workstreams, extending an inherited
                PrimeNG/Plectrum foundation through research, product prototypes, reusable patterns
                and design-to-code artefacts. The wider programme continues beyond my planned
                assignment handoff, so I separate concrete outputs from adoption and outcomes that
                were not yet measurable.
              </p>
            </Card>
          </section>

          <section aria-labelledby="progression-heading">
            <Card>
              <h2 id="progression-heading" className="mb-2 text-2xl font-bold text-gray-100">
                How I got here
              </h2>
              <p className="mb-4 text-gray-400">
                The pattern: I&apos;m most useful where design decisions and implementation reality
                have to meet.
              </p>
              <ul className="space-y-2.5">
                {pathPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section aria-labelledby="reinforce-heading">
            <Card>
              <h2 id="reinforce-heading" className="mb-4 text-2xl font-bold text-gray-100">
                Why the two backgrounds matter together
              </h2>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {togetherPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section aria-labelledby="style-heading">
            <Card>
              <h2 id="style-heading" className="mb-4 text-2xl font-bold text-gray-100">
                Working style
              </h2>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {workingStyle.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section aria-labelledby="earlier-heading">
            <Card>
              <h2 id="earlier-heading" className="mb-4 text-2xl font-bold text-gray-100">
                Earlier roles
              </h2>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {earlierRoles.map((role) => (
                  <li key={role.company} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                    {role.role} · {role.company} · {role.period}
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        </div>

        <section aria-labelledby="contact-heading">
          <Card>
            <h2 id="contact-heading" className="mb-2 text-xl font-semibold text-gray-100">
              Location and contact
            </h2>
            <p className="mb-4 text-gray-400">{contact.location}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="c-button c-button--primary"
                onClick={() => analytics.trackPortfolioEvent('contact_click', { from: '/about' })}
              >
                Email me
              </a>
              <a
                href={contact.cv.file}
                download={contact.cv.fileName}
                className="c-button c-button--secondary"
                onClick={() => analytics.trackPortfolioEvent('cv_download', { variant: 'default', from: '/about' })}
              >
                {contact.cv.label}
              </a>
              <Link to="/work" className="c-button c-button--secondary">
                View selected work
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default About;
