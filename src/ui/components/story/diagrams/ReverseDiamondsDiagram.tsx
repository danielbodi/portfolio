import type { ReactNode } from 'react';

interface Step {
  number: string;
  label: string;
  note: string;
}

interface Phase {
  title: string;
  steps: [Step, Step];
}

const phases: Phase[] = [
  {
    title: '#1 Design a thing',
    steps: [
      { number: '01', label: 'Explore', note: 'Designers explore solutions' },
      { number: '02', label: 'Deliver', note: 'Designers deliver the feature' }
    ]
  },
  {
    title: '#2 Improve the thing',
    steps: [
      { number: '01', label: 'Insight', note: 'Designers check if the idea works' },
      { number: '02', label: 'Improve', note: 'Designers improve the idea' }
    ]
  }
];

const ARIA_LABEL =
  'The FleetBridge delivery loop as two connected diamonds. A solution to a problem enters the first diamond, design a thing: designers explore solutions, then deliver the feature. After launch, the second diamond, improve the thing: designers check if the idea works, then improve the idea — and the improvements feed the next iteration.';

const chipClass =
  'rounded-full border border-purple-300/35 bg-slate-950/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-purple-100';

const pillClass =
  'rounded-lg border border-gray-700/60 bg-[#32323A] px-3 py-2 text-center text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.12em] text-gray-200';

const dashClass = 'border-t border-dashed border-purple-300/50';

/*
 * One proportional canvas per phase: the diamond fills the top 200 of the
 * 250-unit viewBox and the strip below carries the callouts. Anchor dots sit
 * on the halves and the dashed leaders angle outward to the captions, which
 * overlay from 88.8% down centred on 15% and 85% of the width — under the
 * diamond's flanks, matching the leader tips at x=30 and x=170.
 * Because the captions are absolute, the block's height is the SVG's alone,
 * so the diamonds' centreline is a fixed fraction of it: 100 / 250 = 40%.
 */
const DIAMOND_CENTER = 'top-[40%]';

/** Split diamond with callouts anchored on its halves. */
function Diamond({ steps }: { steps: [Step, Step] }) {
  return (
    <div className="relative mx-auto w-full max-w-[16rem]">
      <svg viewBox="0 0 200 250" className="block h-auto w-full">
        <path d="M100 8 L8 100 L100 192 Z" fill="#3D3D46" />
        <path d="M100 8 L192 100 L100 192 Z" fill="#32323A" />
        <line
          x1="100"
          y1="14"
          x2="100"
          y2="186"
          stroke="#FFFFFF"
          strokeOpacity="0.08"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M100 8 L192 100 L100 192 L8 100 Z"
          fill="none"
          stroke="#C084FC"
          strokeOpacity="0.7"
          strokeWidth="1.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Flow arrows: diverge from the left vertex, converge into the right. */}
        <g fill="#C084FC" fillOpacity="0.85">
          <path d="M-4 -3.5 L4 0 L-4 3.5 Z" transform="translate(54 54) rotate(-45)" />
          <path d="M-4 -3.5 L4 0 L-4 3.5 Z" transform="translate(54 146) rotate(45)" />
          <path d="M-4 -3.5 L4 0 L-4 3.5 Z" transform="translate(146 54) rotate(45)" />
          <path d="M-4 -3.5 L4 0 L-4 3.5 Z" transform="translate(146 146) rotate(-45)" />
        </g>
        {/* Anchor dots on the halves, dashed leaders down to the captions. */}
        <g>
          <circle cx="54" cy="132" r="6" fill="rgba(168,85,247,0.12)" />
          <circle cx="54" cy="132" r="3" fill="#020617" stroke="#D8B4FE" strokeWidth="1.5" />
          <circle cx="146" cy="132" r="6" fill="rgba(168,85,247,0.12)" />
          <circle cx="146" cy="132" r="3" fill="#020617" stroke="#D8B4FE" strokeWidth="1.5" />
        </g>
        <g stroke="#D8B4FE" strokeOpacity="0.5" strokeDasharray="3 3">
          <line x1="54" y1="138" x2="30" y2="216" vectorEffect="non-scaling-stroke" />
          <line x1="146" y1="138" x2="170" y2="216" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      {/* Step labels over the diamond area only (top 80% of the canvas). */}
      <div className="absolute inset-x-0 top-0 grid h-[80%] grid-cols-2">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center justify-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-purple-200">
              {step.number}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{step.label}</p>
          </div>
        ))}
      </div>
      {steps.map((step, index) => (
        <p
          key={step.number}
          className={`absolute top-[88.8%] w-[44%] -translate-x-1/2 text-center text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.08em] text-slate-400 ${
            index === 0 ? 'left-[15%]' : 'left-[85%]'
          }`}
        >
          {step.note}
        </p>
      ))}
    </div>
  );
}

/** Aligns a side cell's content to the diamonds' horizontal centreline. */
function RowCenter({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full">
      <div className={`absolute ${DIAMOND_CENTER} w-full -translate-y-1/2`}>{children}</div>
    </div>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  return (
    <div className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 p-4">
      <span className={chipClass}>{phase.title}</span>
      <ol className="mt-3.5 space-y-3">
        {phase.steps.map((step) => (
          <li key={step.number} className="flex gap-3">
            <span className="pt-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-purple-200">
              {step.number}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{step.label}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{step.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DownConnector() {
  return (
    <div className="flex flex-col items-center py-1.5">
      <span className="h-5 w-px bg-purple-400/70" />
      <span className="h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-purple-400/70" />
    </div>
  );
}

/**
 * The FleetBridge reverse-diamond delivery model: definition enters, design
 * ships, and post-launch insight feeds the next loop. Two-diamond layout from
 * md up, a vertical chain below; both are decorative duplicates of the
 * aria-label, following the CapabilityLoopDiagram pattern.
 */
export function ReverseDiamondsDiagram() {
  return (
    <div role="img" aria-label={ARIA_LABEL} className="px-4 pb-10 pt-6 sm:px-6 sm:pt-8">
      <div aria-hidden="true">
        <div className="mx-auto hidden max-w-4xl md:block">
          <div className="grid grid-cols-[minmax(0,6.5rem)_minmax(0,2.25rem)_minmax(0,1fr)_minmax(0,7rem)_minmax(0,1fr)_minmax(0,2.25rem)_minmax(0,6.5rem)] gap-y-3">
            <div className="col-start-3 row-start-1 flex justify-center">
              <span className={chipClass}>{phases[0].title}</span>
            </div>
            <div className="col-start-5 row-start-1 flex justify-center">
              <span className={chipClass}>{phases[1].title}</span>
            </div>

            <div className="col-start-1 row-start-2">
              <RowCenter>
                <p className={pillClass}>Solution to problem</p>
              </RowCenter>
            </div>
            <div className="col-start-2 row-start-2">
              <RowCenter>
                <span className={`block w-full ${dashClass}`} />
              </RowCenter>
            </div>
            <div className="col-start-3 row-start-2">
              <Diamond steps={phases[0].steps} />
            </div>
            <div className="col-start-4 row-start-2">
              <RowCenter>
                <div className="flex w-full items-center gap-1">
                  <span className={`min-w-1.5 flex-1 ${dashClass}`} />
                  <p className={pillClass}>Launch</p>
                  <span className={`min-w-1.5 flex-1 ${dashClass}`} />
                </div>
              </RowCenter>
            </div>
            <div className="col-start-5 row-start-2">
              <Diamond steps={phases[1].steps} />
            </div>
            <div className="col-start-6 row-start-2">
              <RowCenter>
                <span className={`block w-full ${dashClass}`} />
              </RowCenter>
            </div>
            <div className="col-start-7 row-start-2">
              <RowCenter>
                <p className={pillClass}>Improve</p>
              </RowCenter>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <p className={`mx-auto w-fit ${pillClass}`}>Solution to problem</p>
          <DownConnector />
          <PhaseCard phase={phases[0]} />
          <DownConnector />
          <p className={`mx-auto w-fit ${pillClass}`}>Launch</p>
          <DownConnector />
          <PhaseCard phase={phases[1]} />
          <DownConnector />
          <p className={`mx-auto w-fit ${pillClass}`}>Improve</p>
        </div>
      </div>
    </div>
  );
}
