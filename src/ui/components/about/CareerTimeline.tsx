import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
  const timelineRef = useRef<HTMLDivElement>(null);
  const [glowPosition, setGlowPosition] = useState<{ x: number; y: number; startY: number; tailLength: number } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  const pointsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? focusedIndex ?? 0;
  const returnTimer = useRef<number>();
  const cancelReturn = () => window.clearTimeout(returnTimer.current);
  const scheduleReturn = () => {
    cancelReturn();
    if (reducedMotion) {
      setHoveredIndex(null);
      return;
    }
    returnTimer.current = window.setTimeout(() => setHoveredIndex(null), 500);
  };
  useEffect(() => () => window.clearTimeout(returnTimer.current), []);
  const travelTransition = {
    duration: reducedMotion ? 0 : hoveredIndex === null && focusedIndex === null ? 0.65 : 0.48,
    ease: [0.22, 1, 0.36, 1] as const
  };

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const positionGlow = () => {
      const point = pointsRef.current[activeIndex];
      if (!point) return;
      // Use layout offsets so scroll reveals never displace the rail.
      const center = (node: HTMLElement) => {
        let x = node.offsetWidth / 2;
        let y = node.offsetHeight / 2;
        let ancestor: HTMLElement | null = node;
        while (ancestor && ancestor !== timeline) {
          x += ancestor.offsetLeft;
          y += ancestor.offsetTop;
          ancestor = ancestor.offsetParent as HTMLElement | null;
        }
        return { x, y };
      };
      const active = center(point);
      const first = center(pointsRef.current[0]!);
      const second = pointsRef.current[1];
      const next = {
        x: active.x - 16,
        y: active.y - 16,
        startY: first.y,
        tailLength: second ? center(second).y - first.y : 120
      };
      setGlowPosition((previous) =>
        previous?.x === next.x && previous.y === next.y &&
        previous.startY === next.startY && previous.tailLength === next.tailLength ? previous : next
      );
    };

    positionGlow();
    const observer = new ResizeObserver(positionGlow);
    observer.observe(timeline);
    pointsRef.current.forEach((point) => {
      const row = point?.closest('li');
      if (row) observer.observe(row);
    });
    return () => observer.disconnect();
  }, [activeIndex]);

  return (
    <div
      ref={timelineRef}
      className="career-timeline relative"
      onPointerLeave={scheduleReturn}
      onPointerCancel={scheduleReturn}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusedIndex(null);
      }}
    >
      {glowPosition && (
        <>
          {/* Separate the filled rail from its fixed fade: no calculated gradient
              stops, and the fade remains visible even at the first point. */}
          <motion.div
            className="career-timeline__gradient"
            aria-hidden="true"
            initial={false}
            animate={{
              x: glowPosition.x + 15,
              height: Math.max(0, glowPosition.y + 16 - glowPosition.startY)
            }}
            transition={travelTransition}
            style={{
              position: 'absolute', top: glowPosition.startY, left: 0, width: 2,
              zIndex: 2, pointerEvents: 'none', backgroundColor: 'rgba(192,132,252,0.85)'
            }}
          >
            <span
              className="career-timeline__gradient-tail"
              style={{
                display: 'block', position: 'absolute', top: '100%', left: 0,
                width: 2, height: glowPosition.tailLength,
                backgroundImage: 'linear-gradient(180deg, rgba(192,132,252,0.85), rgba(192,132,252,0))'
              }}
            />
          </motion.div>
          <motion.span
            className="career-timeline__glow"
            aria-hidden="true"
            initial={false}
            animate={{ x: glowPosition.x, y: glowPosition.y }}
            transition={travelTransition}
            style={{ position: 'absolute', top: 0, left: 0, width: 32, height: 32, zIndex: 3, pointerEvents: 'none' }}
          >
            <motion.span
              className="career-timeline__breath"
              initial={{ scale: 0.85, opacity: 0.55 }}
              animate={reducedMotion ? { scale: 1, opacity: 0.7 } : { scale: [0.85, 1.4, 0.85], opacity: [0.55, 1, 0.55] }}
              transition={reducedMotion ? { duration: 0 } : { duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
              style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,144,255,0.45), rgba(180,144,255,0.12) 45%, transparent 72%)' }}
            />
            <span style={{ position: 'absolute', inset: 11, borderRadius: '50%', background: '#d8b4fe', boxShadow: '0 0 10px 2px rgba(180,144,255,0.55)' }} />
          </motion.span>
        </>
      )}
      <ol>
        {careerProgression.map((step, index) => {
          const isCurrent = index === 0;
          const year = startYear(step.period);
          return (
            <li
              key={step.company}
              data-timeline-point={index}
              data-active={activeIndex === index || undefined}
              onPointerEnter={(event) => {
                if (event.pointerType !== 'touch') {
                  cancelReturn();
                  setHoveredIndex(index);
                }
              }}
              onFocusCapture={() => {
                cancelReturn();
                setHoveredIndex(null);
                setFocusedIndex(index);
              }}
              className="career-timeline__row relative group grid grid-cols-[1.75rem_1fr] gap-x-3 md:grid-cols-[8rem_1.75rem_1fr] md:gap-x-4"
            >
              {/* Year rail (md+): the numeral is decorative; the period line carries the info */}
              <div data-scroll-reveal className="hidden text-right md:block">
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
                      ? 'top-1.5 bg-white/15'
                      : 'top-0 bg-white/15'
                  }`}
                />
                <span
                  ref={(point) => { pointsRef.current[index] = point; }}
                  className={`career-timeline__point relative z-10 mt-1.5 h-2.5 w-2.5 rounded-full transition-colors motion-reduce:transition-none ${activeIndex === index ? 'bg-purple-300' : 'bg-gray-500'}`}
                />
              </div>

              {/* Role content */}
              <div data-scroll-reveal className="pb-9 md:pb-10">
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
            </li>
          );
        })}

        {/* Earlier roles: fading tail of the spine */}
        <li
          onPointerEnter={scheduleReturn}
          data-scroll-reveal
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
        </li>
      </ol>
    </div>
  );
}
