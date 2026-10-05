import { SystemDiagramFrame } from './SystemDiagramFrame';

const inputs = [
  { title: 'Component metadata', detail: 'Identity, usage, API, owner and distribution live beside the component.' },
  { title: 'Process & protocols', detail: 'Versioned commands, checks, transitions and practical procedures.' },
  { title: 'Registry & schemas', detail: 'Known teams and applications, valid record shapes and compatibility.' },
];

export function ContractsIndexDiagram() {
  return (
    <SystemDiagramFrame
      id="contracts-index-title"
      eyebrow="Contract-driven development"
      title="One governed source, several ways to use it"
      primaryLegend="Generated or distributed"
      secondaryLegend="Reviewed decision"
    >
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {inputs.map((input) => (
          <div key={input.title} className="rounded-xl border border-purple-400/35 bg-purple-400/[0.06] p-4">
            <h4 className="text-sm font-semibold text-purple-200">{input.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{input.detail}</p>
          </div>
        ))}
      </div>
      <p className="py-3 text-center text-sm text-purple-300" aria-hidden="true">↓ Generate and validate</p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <h4 className="text-base font-semibold text-slate-100">Storybook for people</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">States, examples, status and usage sit beside the working component.</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <h4 className="text-base font-semibold text-slate-100">Toolkit for teams and agents</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">The installed package carries a versioned catalogue, CLI guidance and an offline Plectrum MCP.</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <h4 className="text-base font-semibold text-slate-100">Checks for every contribution</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Generated drift, props, token use, documentation and story tests make specific failures visible.</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/40 p-4">
        <p className="text-sm font-semibold text-slate-100">Three indexes, three jobs</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">
          The central source inventory, the immutable release snapshot and Storybook’s runtime index are different views. An application-local index adds its own components without replacing the shared record.
        </p>
      </div>
      <aside className="mt-4 rounded-xl border border-dashed border-amber-300/45 bg-amber-300/[0.04] p-4">
        <p className="text-sm font-semibold text-amber-200">People still decide what becomes shared</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">
          PrimeNG, Figma and Storybook MCPs add context when available. Tool access and test feedback do not replace Core review or the CI gate.
        </p>
      </aside>
    </SystemDiagramFrame>
  );
}
