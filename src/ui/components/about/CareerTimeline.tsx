import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { careerProgression, earlierRoles } from '../../../content/site';
import { TextLink } from '../links/TextLink';

/** First 4-digit year in a period string, e.g. "Oct 2025 – Oct 2026" → "2025". */
function startYear(period: string): string {
  return period.match(/\d{4}/)?.[0] ?? period;
}

/**
 * Career progression as a vertical timeline (brief section 6.6, moved to About).
 * The spine glows purple at the present and fades toward the earliest roles;
 * the fading tail absorbs the former "Earlier roles" list.
 */
export function CareerTimeline() {
  const reduceMotion = useReducedMotion();

  const revealProps = (index: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-40px 0px' },
          transition: { duration: 0.45, delay: index * 0.05, ease: 'easeOut' as const }
        };

  return (
    <ol>
      {careerProgression.map((step, index) => {
        const isCurrent = index === 0;
        const year = startYear(step.period);
        return (
          <motion.li
            key={step.company}
            {...revealProps(index)}
            className="group grid grid-cols-[1.75rem_1fr] gap-x-3 md:grid-cols-[8rem_1.75rem_1fr] md:gap-x-4"
          >
            {/* Year rail (md+): the numeral is decorative; the period line carries the info */}
            <div className="hidden text-right md:block">
              <span
                aria-hidden="true"
                className="text-3xl font-light tabular-nums leading-none text-gray-500"
              >
                {year}
              </span>
              <p className="mt-1.5 text-xs tabular-nums text-gray-400">{step.period}</p>
            </div>

            {/* Node + spine segment */}
            <div aria-hidden="true" className="relative flex justify-center">
              <span
                className={`absolute bottom-0 w-0.5 rounded-full ${
                  isCurrent
                    ? 'top-1.5 bg-gradient-to-b from-purple-400/70 to-white/15'
                    : 'top-0 bg-white/15'
                }`}
              />
              {isCurrent && (
                <span className="absolute mt-1.5 h-2.5 w-2.5 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-purple-400/60 motion-reduce:hidden" />
              )}
              <span
                className={`relative z-10 mt-1.5 h-2.5 w-2.5 rounded-full transition-colors ${
                  isCurrent
                    ? 'bg-purple-300 shadow-[0_0_12px_rgba(180,144,255,0.8)]'
                    : 'bg-gray-500 group-hover:bg-purple-300'
                }`}
              />
            </div>

            {/* Role content */}
            <div className="pb-9 md:pb-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-semibold text-gray-100">{step.heading}</h3>
                {isCurrent && (
                  <span className="rounded-full border border-purple-400/40 px-2 py-0.5 text-[11px] font-medium text-purple-300">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-gray-400">
                {step.company}
                <span className="md:hidden"> · {step.period}</span>
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">
                {step.scope}
              </p>
              {step.href && (
                <TextLink to={step.href} className="mt-3">
                  Read the {step.company.split(' · ')[0]} case
                </TextLink>
              )}
            </div>
          </motion.li>
        );
      })}

      {/* Earlier roles: fading tail of the spine */}
      <motion.li
        {...revealProps(careerProgression.length)}
        className="grid grid-cols-[1.75rem_1fr] gap-x-3 md:grid-cols-[8rem_1.75rem_1fr] md:gap-x-4"
      >
        <div className="hidden md:block" />
        <div aria-hidden="true" className="relative flex justify-center">
          <span className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-white/15 to-transparent" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Earlier</p>
          <ul className="mt-2 space-y-1.5">
            {earlierRoles.map((role) => (
              <li key={role.company} className="text-sm text-gray-400">
                {role.role} · {role.company}{' '}
                <span className="tabular-nums">({role.period})</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.li>
    </ol>
  );
}
