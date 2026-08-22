import React from 'react';
import { proofBar } from '../../../content/site';

/** Quiet proof strip under the specimen — type, not a dashboard widget. */
export function ProofBar() {
  return (
    <section aria-label="Proof points" className="pb-8 pt-2 md:pb-10">
      <div className="mx-auto max-w-6xl border-t border-gray-700/50 pt-8">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {proofBar.map((item, i) => (
            <div key={i}>
              <dt className="sr-only">Proof point {i + 1}</dt>
              <dd>
                <p className="text-xl font-bold leading-snug tracking-display text-gray-100 md:text-2xl">
                  {item.value}
                  {item.confidence !== 'verified' && (
                    <span className="ml-1.5 align-middle text-[0.65rem] font-medium uppercase tracking-wide text-amber-300/80">
                      {item.confidence}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.label}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
