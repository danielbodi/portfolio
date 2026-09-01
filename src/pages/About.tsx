import React from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { contact } from '../content/site';
import { analytics } from '../utils/basicAnalytics';
import { SectionHeader } from '../ui/components/layout/SectionHeader';
import { CareerTimeline } from '../ui/components/about/CareerTimeline';

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
        <header className="mb-16">
          <h1 className="text-3xl font-bold text-purple-300 md:text-4xl">About</h1>
          <div className="mt-4 h-1 w-10 rounded bg-purple-400" aria-hidden="true" />
          <p className="mt-8 text-lg leading-relaxed text-gray-400">
            I have spent around 15 years working in the space between interface design and front-end
            delivery. I started by building UI, moved deeper into product and user experience, and
            increasingly focused on the systems, patterns and decisions that help teams ship coherent
            products at scale.
          </p>
        </header>

        <section
          className="border-t border-gray-700/60 py-12 md:py-16"
          aria-labelledby="progression-heading"
        >
          <SectionHeader
            number="01"
            eyebrow="Path"
            title="How I got here"
            titleId="progression-heading"
          />
          <p className="mb-6 text-gray-400">
            The pattern: I&apos;m most useful where design decisions and implementation reality
            have to meet.
          </p>
          <ul className="space-y-3">
            {pathPoints.map((point) => (
              <li key={point} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <CareerTimeline />
          </div>
        </section>

        <section
          className="border-t border-gray-700/60 py-12 md:py-16"
          aria-labelledby="reinforce-heading"
        >
          <SectionHeader
            number="02"
            eyebrow="Design x engineering"
            title="Why the two backgrounds matter together"
            titleId="reinforce-heading"
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {togetherPoints.map((point) => (
              <li key={point} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="border-t border-gray-700/60 py-12 md:py-16"
          aria-labelledby="style-heading"
        >
          <SectionHeader
            number="03"
            eyebrow="Working style"
            title="Working style"
            titleId="style-heading"
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {workingStyle.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="border-t border-gray-700/60 py-12 md:py-16"
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading" className="mb-3 text-xl font-semibold text-gray-100">
            Location and contact
          </h2>
          <p className="mb-6 text-gray-400">{contact.location}</p>
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
        </section>
      </div>
    </div>
  );
}

export default About;
