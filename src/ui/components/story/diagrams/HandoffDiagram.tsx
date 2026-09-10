import { SystemDiagramFrame } from './SystemDiagramFrame';

export function HandoffDiagram() {
  return (
    <SystemDiagramFrame id="handoff-diagram-title" eyebrow="October handoff · planned"
      title="Two audiences, with linked sources"
      primaryLegend="Retain with implementation" secondaryLegend="Planned transfer">
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-purple-400/40 bg-purple-400/[0.06] p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-purple-300">Use the system</p>
          <h4 className="mt-2 text-xl font-semibold text-slate-100">Storybook</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>Installation and first component</li>
            <li>Live foundations and token selection</li>
            <li>Component usage, API, states and accessibility</li>
            <li>Status, owner and route to propose a change</li>
          </ul>
        </div>
        <div className="rounded-xl border border-dashed border-amber-300/40 bg-amber-300/[0.04] p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-200">Operate and evolve it</p>
          <h4 className="mt-2 text-xl font-semibold text-slate-100">Team documentation</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>Architecture decisions and trade-offs</li>
            <li>Sync, release and recovery procedures</li>
            <li>Contribution policy and ownership transfer</li>
            <li>Open decisions and handoff rehearsal</li>
          </ul>
        </div>
      </div>
      <p className="my-4 text-center text-sm text-slate-300">Link between the two; keep one maintained copy of each explanation.</p>
      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
        <h4 className="text-sm font-semibold text-slate-100">Acceptance evidence still to collect</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">A named maintainer can change a component, interpret the checks and guide a consumer upgrade. Confluence or the team’s chosen platform receives the operating knowledge.</p>
      </div>
    </SystemDiagramFrame>
  );
}
