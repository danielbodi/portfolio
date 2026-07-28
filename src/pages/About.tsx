import React from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { contact, earlierRoles } from '../content/site';
import { analytics } from '../utils/basicAnalytics';

export function About() {
  useSeo({
    title: 'About — Daniel Bodi Gil',
    description:
      'Product designer and UX engineer based in Belgium. Fifteen years across interface design and front-end delivery, focused on the systems that help teams ship coherent products.',
    path: '/about'
  });

  return (
    <div className="min-h-screen px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10">
          <h1 className="mb-4 text-3xl font-bold text-purple-300 md:text-4xl">About</h1>
          <p className="text-lg leading-relaxed text-gray-300">
            I have spent around 15 years working in the space between interface design and front-end
            delivery. I started by building UI, moved deeper into product and user experience, and
            increasingly focused on the systems, patterns and decisions that help teams ship coherent
            products at scale.
          </p>
        </header>

        <section aria-labelledby="focus-heading" className="mb-10">
          <h2 id="focus-heading" className="mb-3 text-xl font-semibold text-gray-100">
            Current focus
          </h2>
          <p className="leading-relaxed text-gray-400">
            I work as a consultant embedded at Solidaris, a Belgian health insurance fund, modernising
            the UX of a connected application ecosystem and evolving Plectrum, its PrimeNG-based design
            system. A large part of that work is making the design system consumable by machines as
            well as people, so that AI-assisted development strengthens consistency instead of eroding
            it.
          </p>
        </section>

        <section aria-labelledby="progression-heading" className="mb-10">
          <h2 id="progression-heading" className="mb-3 text-xl font-semibold text-gray-100">
            How I got here
          </h2>
          <div className="space-y-4 leading-relaxed text-gray-400">
            <p>
              I started by teaching web design, then spent years building UI — high-traffic telecom
              sites at Design is Dead/Emakina, where cross-browser discipline and BEM became habits. At
              Sopra Banking I crossed from building UI to changing how a team builds it: CSS
              architecture, atomic components, coaching.
            </p>
            <p>
              Consulting via CTG/Cegeka took that further — a safety-critical device interface at
              Trasis, six years of design-system ownership at Bridgestone, and now an AI-ready design
              system at Solidaris. The pattern: I&apos;m most useful where design decisions and
              implementation reality have to meet.
            </p>
          </div>
        </section>

        <section aria-labelledby="reinforce-heading" className="mb-10">
          <h2 id="reinforce-heading" className="mb-3 text-xl font-semibold text-gray-100">
            Why the two backgrounds matter together
          </h2>
          <div className="space-y-4 leading-relaxed text-gray-400">
            <p>
              Because I build front-ends, my design work arrives implementation-ready: components have
              states, tokens have names, layouts have a CSS strategy. Because I design, the engineering
              protects intent — fewer translation losses between Figma and production, and a design
              system developers actually want to use.
            </p>
          </div>
        </section>

        <section aria-labelledby="style-heading" className="mb-10">
          <h2 id="style-heading" className="mb-3 text-xl font-semibold text-gray-100">
            Working style
          </h2>
          <ul className="space-y-2.5">
            {[
              'Evidence over opinion — prototypes and task-based tests settle debates.',
              'Autonomous but transparent — direction first, reasoning visible to stakeholders.',
              'Teaching multiplies the work — coaching developers, documenting patterns.',
              'Calm with ambiguity — complex domains reward patient modelling.'
            ].map((item, i) => (
              <li key={i} className="flex gap-2 leading-relaxed text-gray-400">
                <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="earlier-heading" className="mb-10">
          <h2 id="earlier-heading" className="mb-3 text-xl font-semibold text-gray-100">
            Earlier roles
          </h2>
          <ul className="space-y-1.5 text-sm text-gray-500">
            {earlierRoles.map((role) => (
              <li key={role.company}>
                {role.role} · {role.company} · {role.period}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="contact-heading" className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-6">
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
        </section>
      </div>
    </div>
  );
}

export default About;
