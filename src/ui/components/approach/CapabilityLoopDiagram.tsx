import React, { Fragment } from 'react';

const nodes = [
  { number: '01', label: 'Product direction' },
  { number: '02', label: 'Systems' },
  { number: '03', label: 'Delivery' }
];

/* Straight restatements of the page intro — the diagram invents no claims. */
const edges = [
  'Without systems, direction doesn\u2019t scale',
  'Without delivery, systems don\u2019t ship',
  'Without direction, delivery solves the wrong problem'
];

function NodeCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="h-full rounded-xl border border-gray-700/60 bg-[#32323A] px-4 py-3.5 text-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-purple-200">
        {number}
      </p>
      <p className="mt-1 text-sm font-semibold text-white">{label}</p>
    </div>
  );
}

/**
 * The three capabilities as a loop, drawn in the same grammar as the
 * case-study diagrams. A model of the method, not evidence from a system —
 * which is why it appears only on the Approach page.
 */
export function CapabilityLoopDiagram() {
  return (
    <figure
      role="img"
      aria-label="The three capabilities form a loop: product direction feeds systems, systems feed delivery, and delivery feeds back into direction. Without systems, direction doesn't scale; without delivery, systems don't ship; without direction, delivery solves the wrong problem."
      className="overflow-hidden rounded-2xl border border-gray-700/60 bg-slate-950/70"
    >
      <div className="px-5 py-6 sm:px-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-purple-300">
          The loop
        </p>

        {/* Stacked chain on small screens */}
        <div className="mt-5 md:hidden" aria-hidden="true">
          {nodes.map((node, index) => (
            <Fragment key={node.number}>
              <NodeCard number={node.number} label={node.label} />
              {index < nodes.length - 1 && (
                <div className="flex min-h-11 items-stretch gap-3 py-1.5 pl-6">
                  <span className="flex flex-col items-center">
                    <span className="w-px flex-1 bg-purple-400/70" />
                    <span className="h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-purple-400/70" />
                  </span>
                  <span className="self-center text-xs leading-snug text-slate-400">
                    {edges[index]}
                  </span>
                </div>
              )}
            </Fragment>
          ))}
          <div className="mt-4 flex items-center gap-3 pl-1.5">
            <span className="text-base leading-none text-purple-300">{'\u21BA'}</span>
            <span className="text-xs leading-snug text-slate-400">{edges[2]}</span>
          </div>
        </div>

        {/* Horizontal loop from md up */}
        <div className="mt-6 hidden md:block" aria-hidden="true">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,11rem)_minmax(0,1fr)_minmax(0,11rem)_minmax(0,1fr)] items-stretch gap-x-3">
            <NodeCard number={nodes[0].number} label={nodes[0].label} />
            <div className="flex flex-col items-center justify-center gap-2 px-1">
              <span className="flex w-full items-center">
                <span className="h-px flex-1 bg-purple-400/70" />
                <span className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-purple-400/70" />
              </span>
              <span className="text-center text-[0.7rem] leading-snug text-slate-400">
                {edges[0]}
              </span>
            </div>
            <NodeCard number={nodes[1].number} label={nodes[1].label} />
            <div className="flex flex-col items-center justify-center gap-2 px-1">
              <span className="flex w-full items-center">
                <span className="h-px flex-1 bg-purple-400/70" />
                <span className="h-0 w-0 border-y-4 border-l-4 border-y-transparent border-l-purple-400/70" />
              </span>
              <span className="text-center text-[0.7rem] leading-snug text-slate-400">
                {edges[1]}
              </span>
            </div>
            <NodeCard number={nodes[2].number} label={nodes[2].label} />
          </div>

          {/* Return path: delivery feeds back into direction */}
          <div className="mx-[13%] mt-3">
            <div className="relative h-8 rounded-b-2xl border-b border-l border-r border-purple-400/50">
              <span className="absolute -left-[5px] -top-1 h-0 w-0 border-x-[5px] border-b-[7px] border-x-transparent border-b-purple-400/70" />
            </div>
            <p className="mt-2 text-center text-[0.7rem] leading-snug text-slate-400">{edges[2]}</p>
          </div>
        </div>
      </div>
    </figure>
  );
}
