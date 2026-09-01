import { SystemDiagramFrame } from './diagrams/SystemDiagramFrame';

interface AgentRole {
  name: string;
  scope: string;
  detail: string;
}

interface DelegationStage {
  number: string;
  name: string;
  mode: string;
  reason: string;
  roles: AgentRole[];
}

const systemContext = [
  'Plectrum tokens',
  'Contracts + index',
  'PrimeNG-first',
  'ITCSS / BEMIT',
  'Storybook + WCAG'
];

const stages: DelegationStage[] = [
  {
    number: '01',
    name: 'Ground',
    mode: 'Parallel read',
    reason: 'Source intent and repository reality are read independently, then joined.',
    roles: [
      {
        name: 'UX Researcher',
        scope: 'Figma route',
        detail:
          'Extracts design intent, states, tokens, spacing and accessibility cues via Figma MCP; checks relevant PrimeNG patterns.'
      },
      {
        name: 'Architect',
        scope: 'Every route',
        detail:
          'Checks the repository index, contracts, existing components and source-of-truth boundaries.'
      }
    ]
  },
  {
    number: '02',
    name: 'Engineer',
    mode: 'One owner',
    reason: 'Consumes the approved brief and both grounding outputs.',
    roles: [
      {
        name: 'UX Engineer',
        scope: 'Design to system',
        detail:
          'Turns the joined direction into tokens, BEMIT SCSS, PrimeNG mappings and Storybook states.'
      }
    ]
  },
  {
    number: '03',
    name: 'Build',
    mode: 'One owner',
    reason: 'Consumes the engineered tokens, styles and story states.',
    roles: [
      {
        name: 'Frontend Dev',
        scope: 'System to product',
        detail:
          'Builds the Angular component, behaviour, semantics, ARIA, exports and index entry.'
      }
    ]
  },
  {
    number: '04',
    name: 'Verify',
    mode: 'Parallel review',
    reason: 'Two evidence passes inspect one finished snapshot.',
    roles: [
      {
        name: 'Tester',
        scope: 'Behaviour + access',
        detail: 'Validates behaviour, tests, Storybook states and WCAG 2.1 AA.'
      },
      {
        name: 'Token Auditor',
        scope: 'System integrity',
        detail:
          'Checks token prefixes, semantic coverage, PrimeNG mappings and Figma drift.'
      }
    ]
  }
];

function AgentCard({ role }: { role: AgentRole }) {
  return (
    <article className="min-w-0 rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-3.5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h5 className="text-sm font-semibold text-slate-100">{role.name}</h5>
        <span className="rounded-full border border-purple-400/25 bg-purple-400/[0.07] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-purple-200">
          {role.scope}
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">{role.detail}</p>
    </article>
  );
}

export function AgentDelegationWorkflow() {
  return (
    <SystemDiagramFrame
      id="agent-delegation-title"
      eyebrow="Delegation strategy"
      title="From design intent to one coherent implementation"
      primaryLegend="Delegated work"
      secondaryLegend="Human decision"
    >
      <div
        className="mt-6 grid gap-3 lg:grid-cols-2"
        role="group"
        aria-label="The target and shared direction that enter the supervisor brief"
      >
        <article className="rounded-xl border border-slate-700/80 bg-slate-900/80 p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-purple-300">
            Delivery target
          </p>
          <h4 className="mt-1 text-sm font-semibold text-slate-100">
            Figma design or scoped prompt
          </h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <li className="rounded-lg bg-slate-950/50 px-3 py-2.5">
              <p className="text-xs font-semibold text-slate-200">Figma design</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Node, states, source tokens and interaction intent.
              </p>
            </li>
            <li className="rounded-lg bg-slate-950/50 px-3 py-2.5">
              <p className="text-xs font-semibold text-slate-200">Scoped prompt</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Intent, constraints and acceptance criteria.
              </p>
            </li>
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Prompt-only work starts once the brief is approved.
          </p>
        </article>

        <article className="rounded-xl border border-purple-400/35 bg-purple-400/[0.07] p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-purple-300">
            Shared direction · established above
          </p>
          <h4 className="mt-1 text-sm font-semibold text-slate-100">
            The context every specialist inherits
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Shared system context">
            {systemContext.map((item) => (
              <li
                key={item}
                className="rounded-full border border-purple-400/25 bg-slate-950/45 px-2.5 py-1.5 text-xs text-purple-100"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            The source changes; the product and technical direction does not.
          </p>
        </article>
      </div>

      <div className="flex flex-col items-center" aria-hidden="true">
        <span className="h-5 w-px bg-purple-400/60" />
        <span className="h-2.5 w-2.5 rounded-full border-2 border-purple-300 bg-slate-950 shadow-[0_0_0_4px_rgba(168,85,247,0.12)]" />
        <span className="h-3 w-px bg-purple-400/60" />
      </div>

      <article className="rounded-xl border border-purple-400/50 bg-purple-400/[0.1] px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-purple-300">
              Supervisor
            </p>
            <h4 className="mt-1 text-base font-semibold text-slate-100">Solidaris coordinator</h4>
          </div>
          <span className="rounded-full border border-purple-300/35 bg-slate-950/40 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-purple-100">
            Coordinates · does not implement
          </span>
        </div>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-300">
          Frames the delivery brief, delegates bounded scopes, waits at each join and
          consolidates the result.
        </p>
      </article>

      <div className="flex h-7 justify-center" aria-hidden="true">
        <span className="h-full w-px bg-purple-400/60" />
      </div>

      <ol>
        {stages.map((stage, index) => {
          const roleGrid = stage.roles.length > 1 ? 'grid gap-2 md:grid-cols-2' : 'grid gap-2';

          return (
            <li
              key={stage.number}
              className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2 pb-5 last:pb-0 sm:grid-cols-[6rem_1.5rem_minmax(0,1fr)] sm:gap-x-3"
            >
              <div className="hidden pt-1 text-right sm:block">
                <p className="text-sm font-semibold tabular-nums text-slate-200">{stage.number}</p>
                <p className="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-purple-300">
                  {stage.name}
                </p>
              </div>
              <div className="relative flex justify-center" aria-hidden="true">
                {index < stages.length - 1 && (
                  <span className="absolute left-1/2 top-3 h-[calc(100%+0.5rem)] w-px -translate-x-1/2 bg-purple-400/60" />
                )}
                <span className="relative mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-purple-300 bg-slate-950 shadow-[0_0_0_4px_rgba(168,85,247,0.12)]" />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-purple-300 sm:hidden">
                    {stage.number} · {stage.name}
                  </p>
                  <span className="rounded-full border border-slate-700 bg-slate-900/70 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-slate-300">
                    {stage.mode}
                  </span>
                </div>
                <div className={roleGrid} role="group" aria-label={stage.name + ' roles'}>
                  {stage.roles.map((role) => (
                    <AgentCard key={role.name} role={role} />
                  ))}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{stage.reason}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <aside
        className="mt-6 rounded-2xl border border-dashed border-amber-400/45 bg-amber-400/[0.05] p-4"
        aria-labelledby="delegation-human-gate-title"
      >
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-amber-200">
          Converge · human gate
        </p>
        <h4 id="delegation-human-gate-title" className="mt-1 text-sm font-semibold text-slate-100">
          Supervisor synthesis → design-system owner review
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          Changed files, validation evidence, open issues and next steps return as one reviewable
          package. A human decides what enters the system.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Final review checks">
          {['Source intent', 'System contracts', 'Accessibility', 'Working build'].map((check) => (
            <li
              key={check}
              className="rounded-full border border-amber-300/20 bg-slate-950/35 px-2.5 py-1 text-xs text-amber-100"
            >
              {check}
            </li>
          ))}
        </ul>
      </aside>
    </SystemDiagramFrame>
  );
}
