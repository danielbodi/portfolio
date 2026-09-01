import { SystemDiagramFrame } from './SystemDiagramFrame';

const contractFields = [
  { name: 'component', detail: 'name · BEM block · ITCSS layer · category' },
  { name: 'usage', detail: 'anti-patterns · alternatives' },
  { name: 'accessibility', detail: 'WCAG level AA' },
  { name: 'tokens', detail: 'consumed CSS custom properties' },
  { name: 'aiHints', detail: 'context · keywords' }
];

const knowledgeEntries = [
  { name: 'rules/', detail: 'Constraints that must never be violated' },
  { name: 'skills/', detail: 'Guidance for doing the work correctly' },
  {
    name: 'contracts/protocols',
    detail: 'Role boundaries · proposed loading order and checks'
  },
  { name: 'index.json', detail: 'Proposed codebase map and discovery entry point' }
];

export function ContractsIndexDiagram() {
  return (
    <SystemDiagramFrame
      id="contracts-index-title"
      eyebrow="Contract signal"
      title="Make system constraints inspectable"
      primaryLegend="Proposed structure"
      secondaryLegend="Evidence boundary"
    >
      <div className="mt-6 rounded-xl border border-purple-400/45 bg-purple-400/[0.08] px-4 py-3.5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-purple-300">
          Shared working layer
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-100">Contracts, rules and guidance</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          One inspectable working layer for design-to-code constraints.
        </p>
      </div>

      <div
        className="relative pt-7"
        role="group"
        aria-label="Two complementary artefact families"
      >
        <span
          className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-purple-400/60"
          aria-hidden="true"
        />
        <span
          className="absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-purple-300 bg-slate-950 shadow-[0_0_0_4px_rgba(168,85,247,0.12)]"
          aria-hidden="true"
        />
        <span
          className="absolute left-1/4 right-1/4 top-6 hidden h-px bg-purple-400/50 xl:block"
          aria-hidden="true"
        />

        <div className="grid gap-3 xl:grid-cols-2">
          <article className="min-w-0 rounded-xl border border-slate-700/80 bg-slate-900/80 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-slate-100">Component contract</h4>
              <code className="font-mono text-xs text-purple-200">.metadata.ts</code>
            </div>
            <dl className="mt-4 space-y-2">
              {contractFields.map((field) => (
                <div key={field.name} className="rounded-lg bg-slate-950/50 px-3 py-2.5">
                  <dt className="font-mono text-xs font-semibold text-sky-300">{field.name}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-slate-400">{field.detail}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 rounded-lg border border-purple-400/25 bg-purple-400/[0.06] px-3 py-2.5">
              <p className="font-mono text-xs font-semibold text-purple-200">TokenContract</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Figma variable · PrimeNG mapping · change risk · deprecation
              </p>
            </div>
          </article>

          <article className="min-w-0 rounded-xl border border-slate-700/80 bg-slate-900/80 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-slate-100">Knowledge base</h4>
              <code className="font-mono text-xs text-purple-200">.ai/</code>
            </div>
            <ul className="mt-4 space-y-2">
              {knowledgeEntries.map((entry) => (
                <li
                  key={entry.name}
                  className="rounded-lg border border-purple-400/20 bg-purple-400/[0.06] px-3 py-2.5"
                >
                  <code className="font-mono text-xs font-semibold text-purple-200">
                    {entry.name}
                  </code>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{entry.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Plus token-governance working notes.
            </p>
          </article>
        </div>
      </div>

      <aside
        className="mt-6 rounded-2xl border border-dashed border-amber-400/45 bg-amber-400/[0.05] p-4"
        aria-labelledby="contracts-boundary-title"
      >
        <p
          id="contracts-boundary-title"
          className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-amber-200"
        >
          Evidence boundary · output is not adoption
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          These authored artefacts make constraints inspectable; they do not establish independent
          use, repeatability or team adoption.
        </p>
      </aside>
    </SystemDiagramFrame>
  );
}
