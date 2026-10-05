import { SystemDiagramFrame } from './SystemDiagramFrame';

const steps = [
  {
    number: '01',
    title: 'Describe the need',
    detail: 'A team starts with a task, a state or a missing capability.',
  },
  {
    number: '02',
    title: 'Ask Plectrum',
    detail: 'The agent consults the installed catalogue and process contract.',
  },
  {
    number: '03',
    title: 'Build locally',
    detail: 'Reuse or compose first; scaffold an app-owned component when needed.',
  },
  {
    number: '04',
    title: 'Run the gates',
    detail: 'Stories, contracts, tokens and package checks test the change.',
  },
  {
    number: '05',
    title: 'Read the signals',
    detail: 'Core reviews repository facts and any reported usage with its coverage.',
  },
];

export function PlectrumOperatingModelDiagram() {
  return (
    <SystemDiagramFrame
      id="plectrum-operating-model-title"
      eyebrow="The operating model"
      title="One contract connects advice, delivery and Core decisions"
      primaryLegend="Implemented path"
      secondaryLegend="Reviewed or optional step"
    >
      <div className="mt-6 rounded-xl border border-purple-400/35 bg-purple-400/[0.08] px-5 py-4">
        <p className="text-sm font-semibold text-purple-200">Versioned component and process contracts</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">
          The same rules feed Storybook, the installed toolkit, the local MCP catalogue and checks.
        </p>
      </div>

      <ol className="mt-4 grid gap-3 lg:grid-cols-5">
        {steps.map((step) => (
          <li key={step.number} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold tracking-[0.12em] text-purple-300">{step.number}</p>
            <h4 className="mt-3 text-base font-semibold text-slate-100">{step.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.detail}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-dashed border-amber-300/45 bg-amber-300/[0.04] p-4">
          <p className="text-sm font-semibold text-amber-200">Teams can deliver local work</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">
            An opt-in report can add evidence. Missing reports leave usage unknown.
          </p>
        </div>
        <div className="rounded-xl border border-dashed border-amber-300/45 bg-amber-300/[0.04] p-4">
          <p className="text-sm font-semibold text-amber-200">Core decides what becomes shared</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">
            Review, release and consumer upgrade are distinct steps; the next version updates the installed contract.
          </p>
        </div>
      </div>
    </SystemDiagramFrame>
  );
}
