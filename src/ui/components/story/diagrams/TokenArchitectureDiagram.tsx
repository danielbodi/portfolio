import { SystemDiagramFrame } from './SystemDiagramFrame';

const tokenTiers = [
  {
    number: '01',
    name: 'Primitive',
    question: 'What the value is',
    variable: '--pds-color-primary-500: #527191;',
    explanation: 'A reusable base value with no product meaning attached.'
  },
  {
    number: '02',
    name: 'Semantic',
    question: 'What the value means',
    variable: '--pds-color-brand: var(--pds-color-primary-500);',
    explanation: 'A design decision expressed in the product language.'
  },
  {
    number: '03',
    name: 'Component / vendor',
    question: 'Where the value is applied',
    variable: '--p-button-primary-background: var(--pds-color-brand);',
    explanation: 'The bridge into a PrimeNG component token.'
  }
];

export function TokenArchitectureDiagram() {
  return (
    <SystemDiagramFrame
      id="token-architecture-title"
      eyebrow="Token signal"
      title="Three decisions from value to vendor"
      primaryLegend="Proposed mapping"
      secondaryLegend="Current boundary"
    >
      <ol className="mt-6">
        {tokenTiers.map((tier, index) => {
          const cardClass =
            index === tokenTiers.length - 1
              ? 'rounded-xl border border-purple-400/45 bg-purple-400/[0.08] px-4 py-3.5'
              : 'rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-3.5';

          return (
            <li
              key={tier.number}
              className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2 pb-4 last:pb-0 sm:grid-cols-[6.5rem_1.5rem_minmax(0,1fr)] sm:gap-x-3"
            >
              <div className="hidden pt-1 text-right sm:block">
                <p className="text-sm font-semibold tabular-nums text-slate-200">{tier.number}</p>
                <p className="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-purple-300">
                  {tier.name}
                </p>
              </div>
              <div className="relative flex justify-center" aria-hidden="true">
                {index < tokenTiers.length - 1 && (
                  <span className="absolute left-1/2 top-3 h-[calc(100%+0.25rem)] w-px -translate-x-1/2 bg-purple-400/60" />
                )}
                <span className="relative mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-purple-300 bg-slate-950 shadow-[0_0_0_4px_rgba(168,85,247,0.12)]" />
              </div>
              <div>
                <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-purple-300 sm:hidden">
                  {tier.number} · {tier.name}
                </p>
                <div className={cardClass}>
                  <p className="text-sm font-semibold text-slate-100">{tier.question}</p>
                  <code className="mt-2 block break-words rounded-lg bg-slate-950/55 px-3 py-2 font-mono text-xs leading-relaxed text-sky-300 sm:text-[0.8125rem]">
                    {tier.variable}
                  </code>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{tier.explanation}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <aside
        className="mt-6 rounded-2xl border border-dashed border-amber-400/45 bg-amber-400/[0.05] p-4"
        aria-labelledby="token-boundary-title"
      >
        <p
          id="token-boundary-title"
          className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-amber-200"
        >
          Concept boundary · not another token level
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          The mapping is intentional; exact inventory and automated synchronisation are not
          claimed. The bridge still runs by hand.
        </p>
      </aside>
    </SystemDiagramFrame>
  );
}
