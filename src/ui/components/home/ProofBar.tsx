import React from 'react';
import { proofBar } from '../../../content/site';

/** Three or four concise proof points under the hero (brief section 6.2). */
export function ProofBar() {
  return (
    <section aria-label="Proof points" className="border-y border-gray-700/40 bg-gray-900/30 px-4 py-8 md:px-6">
      <dl className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {proofBar.map((item, i) => (
          <div key={i}>
            <dt className="sr-only">Proof point {i + 1}</dt>
            <dd>
              <p className="text-lg font-bold leading-snug text-gray-100">
                {item.value}
                {item.confidence !== 'verified' && (
                  <span className="ml-1.5 align-middle text-[0.65rem] font-medium uppercase tracking-wide text-amber-300/80">
                    {item.confidence}
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">{item.label}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
