import { SystemDiagramFrame } from './SystemDiagramFrame';

const stages = [
  { owner: 'Designers', title: 'Plectrum UI Kit', detail: 'Visual decisions in Figma', mechanism: 'Plugin → staging branch' },
  { owner: 'Repository + reviewers', title: 'Audit & promote', detail: 'Drift checks → reviewed PR → tokens.json', mechanism: 'Generate CSS + manifest' },
  { owner: 'Design-system team', title: 'CSS + components', detail: '--pds-* · PrimeNG preset · ITCSS', mechanism: 'Pack UI, theme and styles' },
  { owner: 'Application team', title: 'Install a version', detail: 'Consume tokens and components', mechanism: 'Tarballs today · registry pending' },
];

export function TokenArchitectureDiagram() {
  return (
    <SystemDiagramFrame id="token-architecture-title" eyebrow="Plectrum architecture"
      title="Design decisions become a consumer contract"
      primaryLegend="Documented delivery path" secondaryLegend="Manual / pending boundary">
      <ol className="mt-6 grid gap-3 lg:grid-cols-4">
        {stages.map((stage, index) => (
          <li key={stage.title} className="min-w-0 rounded-xl border border-purple-400/30 bg-purple-400/[0.06] p-4">
            <p className="text-xs font-medium text-purple-300">0{index + 1} · {stage.owner}</p>
            <h4 className="mt-3 text-base font-semibold text-slate-100">{stage.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{stage.detail}</p>
            <p className="mt-4 border-t border-purple-400/20 pt-3 text-xs leading-relaxed text-purple-200">
              {stage.mechanism} {index < 3 && <span aria-hidden="true">→</span>}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <h4 className="text-sm font-semibold text-slate-100">One compiled stylesheet</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Imported design tokens + code-owned spacing, typography and feature tokens.</p>
          <p className="mt-3 text-xs leading-relaxed text-purple-200">Compiled CSS → live Storybook foundations</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <h4 className="text-sm font-semibold text-slate-100">CSS responsibilities</h4>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-xs">
            <dt className="font-mono text-sky-300">01-settings</dt><dd className="text-slate-300">Values + PrimeNG bridges</dd>
            <dt className="font-mono text-sky-300">o-</dt><dd className="text-slate-300">Layout objects</dd>
            <dt className="font-mono text-sky-300">c-</dt><dd className="text-slate-300">Component identity + states</dd>
            <dt className="font-mono text-sky-300">u-</dt><dd className="text-slate-300">Single-purpose utilities</dd>
          </dl>
        </div>
      </div>
      <aside className="mt-5 rounded-xl border border-dashed border-amber-300/40 bg-amber-300/[0.04] p-4">
        <h4 className="text-sm font-semibold text-amber-200">Return path: code → proposal → designer review → Figma</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">Both directions are implemented. Proposal generation runs; the automated reverse write is parked by the Figma API licensing constraint. A designer currently enters and reviews the proposal in Figma.</p>
      </aside>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">September 2026: inbound promotion recorded; registry packages unreleased. This diagram describes the published architecture, not a claim of end-to-end production adoption.</p>
    </SystemDiagramFrame>
  );
}
