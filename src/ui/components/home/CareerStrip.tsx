import React from 'react';
import { Link } from 'react-router-dom';
import { careerProgression, earlierRoles } from '../../../content/site';
import { Card } from '../cards/Card';

/** Compact career progression replacing the long narrative (brief section 6.6). */
export function CareerStrip() {
  return (
    <section aria-labelledby="career-heading" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 id="career-heading" className="mb-10 text-3xl font-bold text-purple-300 md:text-4xl">
          Career progression
        </h2>
        <Card>
        <ol className="space-y-0">
          {careerProgression.map((step, index) => (
            <li
              key={step.company}
              className={`grid gap-2 py-5 md:grid-cols-[14rem_1fr_auto] md:gap-6 ${
                index > 0 ? 'border-t border-gray-700/40' : ''
              }`}
            >
              <div>
                <p className="font-semibold text-gray-100">{step.heading}</p>
                <p className="mt-0.5 text-sm text-gray-500">
                  {step.company} · {step.period}
                </p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-gray-400">{step.scope}</p>
              </div>
              <div className="md:self-center">
                {step.href && (
                  <Link
                    to={step.href}
                    className="text-sm text-purple-300 underline-offset-4 hover:underline"
                  >
                    Read the {step.company.split(' · ')[0]} case
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 border-t border-gray-700/40 pt-5 text-sm text-gray-500">
          Earlier:{' '}
          {earlierRoles.map((role, i) => (
            <span key={role.company}>
              {role.role} at {role.company} ({role.period}){i < earlierRoles.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>
        </Card>
      </div>
    </section>
  );
}
