import React from 'react';
import { capabilities } from '../../../content/site';
import { TextLink } from '../links/TextLink';

/**
 * "How I create leverage" — three connected capabilities (brief section 6.4).
 * A condensed preview of the Approach page: same numbers, eyebrow and titles
 * as its sections 01–03, in the site's open numbered-section language.
 */
export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-heading" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 id="capabilities-heading" className="mb-3 text-3xl font-bold text-purple-300 md:text-4xl">
          How I create leverage
        </h2>
        <p className="mb-10 max-w-2xl text-gray-400">
          Three connected capabilities — each case study shows them working together.
        </p>
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {capabilities.map((capability, index) => (
            <article key={capability.id} className="border-t border-gray-700/60 pt-6">
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
                <span className="text-purple-300">{String(index + 1).padStart(2, '0')}</span>
                <span className="h-px w-8 bg-gray-700" aria-hidden="true" />
                <span className="text-gray-500">Capability</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-100">{capability.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-gray-400">{capability.text}</p>
              <ul className="space-y-1.5">
                {capability.links.map((link) => (
                  <li key={link.href}>
                    <TextLink to={link.href}>{link.label}</TextLink>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <TextLink to="/approach">
            Read the full approach, including the quality standards I hold work to
          </TextLink>
        </div>
      </div>
    </section>
  );
}
