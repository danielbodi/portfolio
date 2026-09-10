import { SystemDiagramFrame } from './SystemDiagramFrame';

export function ContractsIndexDiagram() {
  return (
    <SystemDiagramFrame id="contracts-index-title" eyebrow="Contract-driven development"
      title="One component contract, shared by people and agents"
      primaryLegend="Generated / consumed" secondaryLegend="Human review">
      <div className="mt-6 rounded-xl border border-purple-400/40 bg-purple-400/[0.08] p-5">
        <p className="font-mono text-sm font-semibold text-purple-200">ComponentMetadata · colocated with the component</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">Usage · props · accessibility · consumed tokens · status · owner · agent hints</p>
      </div>
      <div className="py-3 text-center text-purple-300" aria-hidden="true">↓</div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <h4 className="text-base font-semibold text-slate-100">For people</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Storybook renders status and contract information alongside component states and examples.</p>
          <p className="mt-4 text-xs text-purple-200">Metadata → docs figures + component status</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <h4 className="text-base font-semibold text-slate-100">For agents</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Load the generated index, query live Storybook when available, then read one metadata file and its protocol.</p>
          <p className="mt-4 text-xs text-purple-200">Index → live docs → selected contract → protocol</p>
        </div>
      </div>
      <div className="py-3 text-center text-purple-300" aria-hidden="true">↓</div>
      <div className="rounded-xl border border-purple-400/30 bg-purple-400/[0.05] p-5">
        <h4 className="text-base font-semibold text-slate-100">Checks turn expectations into failures</h4>
        <ul className="mt-3 grid gap-3 text-sm leading-relaxed text-slate-300 md:grid-cols-2">
          <li><span className="font-medium text-sky-300">Props</span> · metadata matches Angular inputs and outputs</li>
          <li><span className="font-medium text-sky-300">Tokens</span> · declared consumption exists in compiled CSS</li>
          <li><span className="font-medium text-sky-300">Docs</span> · no duplicate handwritten contract blocks</li>
          <li><span className="font-medium text-sky-300">Index</span> · generated inventory stays current</li>
        </ul>
      </div>
      <aside className="mt-5 rounded-xl border border-dashed border-amber-300/40 p-4">
        <p className="text-sm font-semibold text-amber-200">Specialists contribute → coordinator integrates → human reviews</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">Contracts constrain the workflow. They do not establish autonomous reliability or measured delivery gains. Story tests run separately from MCP.</p>
      </aside>
    </SystemDiagramFrame>
  );
}
