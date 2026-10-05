import { SystemDiagramFrame } from './SystemDiagramFrame';

const stages = [
  { owner: 'Designers', title: 'Figma decisions', detail: 'PrimeNG 21 holds token variables; Custom components holds component designs.', mechanism: 'Plugin → staging branch' },
  { owner: 'Repository + reviewers', title: 'Audit & promote', detail: 'Drift checks, sync report and reviewed pull request.', mechanism: 'Approved tokens.json' },
  { owner: 'Plectrum packages', title: 'Build the contract', detail: 'Compiled CSS, PrimeNG theme and Angular components.', mechanism: 'Release 2.1.0' },
  { owner: 'Application teams', title: 'Install a version', detail: 'Use the stable --pds-* surface and documented components.', mechanism: 'Upgrade by reviewed package change' },
];

export function TokenArchitectureDiagram() {
  return (
    <SystemDiagramFrame
      id="token-architecture-title"
      eyebrow="Design-to-code architecture"
      title="Reviewed visual decisions become an installable contract"
      primaryLegend="Inbound delivery path"
      secondaryLegend="Reviewed return path"
    >
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
          <h4 className="text-sm font-semibold text-slate-100">Rendered values: compiled CSS</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Imported design tokens and code-owned tokens compile into the stylesheet. The token finder reads those rendered values.</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <h4 className="text-sm font-semibold text-slate-100">Component facts: metadata</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Usage, states, consumed tokens, status and ownership feed documentation and checks.</p>
        </div>
      </div>
      <aside className="mt-5 rounded-xl border border-dashed border-amber-300/45 bg-amber-300/[0.04] p-4">
        <h4 className="text-sm font-semibold text-amber-200">Return path: code → proposal → Figma review</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">A code-origin token can be proposed on the right Figma branch through the agent with Figma MCP or the Plectrum tokens plugin. Designers review and merge it. The separate REST Variables route depends on the client’s licence.</p>
      </aside>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">The packages were published on 4 October 2026. This diagram does not imply an unattended round trip or adoption by independent application teams.</p>
    </SystemDiagramFrame>
  );
}
