import React from 'react';
import { Link } from 'react-router-dom';
import { capabilities } from '../../../content/site';

/** "How I create leverage" — three connected capabilities (brief section 6.4). */
export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-heading" className="border-y border-gray-700/40 bg-gray-900/30 px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 id="capabilities-heading" className="mb-3 text-3xl font-bold text-purple-300 md:text-4xl">
          How I create leverage
        </h2>
        <p className="mb-10 max-w-2xl text-gray-400">
          Three connected capabilities — each case study shows them working together.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((capability) => (
            <article key={capability.id} className="flex flex-col rounded-xl border border-gray-700/60 bg-gray-950/40 p-6">
              <h3 className="mb-3 text-xl font-semibold text-gray-100">{capability.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-gray-400">{capability.text}</p>
              <ul className="mt-auto space-y-1.5">
                {capability.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-purple-300 underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/approach" className="text-sm text-gray-400 underline-offset-4 hover:text-purple-300 hover:underline">
            Read the full approach, including the quality standards I hold work to
          </Link>
        </div>
      </div>
    </section>
  );
}
