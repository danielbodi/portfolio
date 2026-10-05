import type { VisualStory } from './visualStories';

const releasedStorybook = 'https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/releases/2.1.0-devkit-0.7.2/';
const source = (label: string, id: string) => ({ label, href: `${releasedStorybook}?path=/docs/${id}` });
const release = 'https://github.com/solidaris-danielbodigil/solidaris-plectrum/releases/tag/plectrum-v2.1.0-devkit-0.7.2';
const dashboard = 'https://solidaris-danielbodigil.github.io/solidaris-plectrum/dashboard/#/design-system/overview';

export const solidarisVisualStory: VisualStory = {
  title: 'Building an AI-first design system teams can own',
  statement:
    'Solidaris already had a UI kit. What teams still needed was a way to turn it into consistent application code: choose the right pattern, understand its limits and know who owned the next decision. I led and built that layer in Plectrum, giving developers and AI agents the same component knowledge, contribution rules and checks to work from.',
  facts: [
    { label: 'Role', value: 'Sole lead and implementer · design-system engineering' },
    { label: 'Period', value: 'Oct 2025–Oct 2026 · assignment ends 8 October' },
    { label: 'Built on', value: 'Angular · PrimeNG · existing Plectrum design foundation' },
    { label: 'Released', value: 'Plectrum 2.1.0 · developer toolkit 0.7.2' },
  ],
  jumpTo: [
    { label: 'Agent workflow', href: '/work/solidaris#fragmented-tools' },
    { label: 'Contracts & governance', href: '/work/solidaris#workflow-experiment' },
    { label: 'Core insights', href: '/work/solidaris#core-insights' },
  ],
  heroMedia: {
    kind: 'diagram',
    diagramId: 'solidaris-operating-model',
    label: 'The Plectrum operating model',
    caption: 'A team describes a need, finds a pattern and builds locally. Shared contracts connect that work to checks and Core review; teams can also choose to report usage. The architecture I implemented in Plectrum.',
    myPart: 'I defined and implemented the system architecture, tooling and rules that connect these stages.',
    evidenceStatus: 'Verified',
  },
  chapters: [
    {
      id: 'fragmented-tools', tocLabel: 'Start with the need', number: '01', eyebrow: 'Agent & intent',
      title: 'Start with the need, then ask Plectrum',
      paragraphs: [
        'My starting point was product design across iSHARE and iCRM, as Solidaris brought regional applications into one employee portal. PrimeNG and the Plectrum UI Kit were already chosen. But finding a component still left the harder questions: how should it behave while data loads, what belongs around it, and who decides when something is missing?',
        'I took ownership of the system engineering and built <strong>/plectrum as a first adviser</strong>. A developer describes the task; the agent reads the installed component catalogue and workflow rules, then proposes something to reuse or compose. I wanted the system’s reasoning to be available at the moment a developer makes the choice.',
        'The document-list recording below shows that choice in practice. The agent finds that List already handles loading, recommends Empty State for empty results, and points to a separate message and retry action for errors. Each recommendation can be traced back to the catalogue and the documentation for the installed version.',
      ],
      media: [{
        kind: 'video',
        src: '/videos/solidaris-agent-workflow.mp4?v=2',
        poster: '/screenshots/solidaris/agent-workflow-poster.webp',
        orientation: 'portrait',
        alt: 'VS Code recording of the Plectrum agent reading the installed 0.7.2 catalogue and recommending list, loading, empty-result and error-recovery patterns for a fictional employee document list',
        label: 'Ask about the task, find the pattern · 30 sec',
        caption: 'A fictional employee document list leads to existing components, their limits and matching documentation. Recorded in VS Code on 5 October 2026 with toolkit 0.7.2; startup and idle waits removed.',
        myPart: 'Designed and built the agent workflow, catalogue contract and versioned developer toolkit.',
        evidenceStatus: 'Verified',
        playOnScroll: false,
        steps: [
          'Check the installed version and read its catalogue.',
          'Reuse List’s loading state and Empty State for empty results.',
          'Compose an error message with a retry action.',
          'Follow the links to the matching Storybook release.',
        ],
      }],
      decision: {
        constraint: 'A chosen UI kit did not tell application teams how to compose it for their work or when to create locally.',
        choice: 'Give the agent the versioned catalogue and the same decision rules available to developers.',
        tradeOff: 'Every gap in the catalogue is also a gap in what the agent can reliably recommend.',
      },
      sources: [source('Use the Plectrum agent', 'start-here-use-the-agent--docs'), source('How agents work', 'docs-ai-strategy--docs')],
    },
    {
      id: 'workflow-experiment', tocLabel: 'Contracts & MCP', number: '02', eyebrow: 'Contract-driven development',
      title: 'Give the agent the same facts as the developer',
      paragraphs: [
        'An agent needs more than component names. It needs to know what a component does, when to use it and who maintains it. Writing those facts separately in Storybook, code and agent instructions would leave several copies to keep aligned. I made <strong>component metadata the shared source</strong> and kept it beside the implementation.',
        'I used the same approach for the work around a component: a process contract defines the workflows and checks, a registry names teams and applications, and short protocols explain how to query, create and audit. Schemas validate the structure. Generation builds the indexes, toolkit catalogue and documentation facts from those sources. That is the Contract-Driven Development behind Plectrum.',
        'Versioning makes the approach useful inside an application. The installed Plectrum MCP exposes the catalogue for that application’s package version; release snapshots and drift checks keep the generated views aligned. When connected, Figma, PrimeNG and local Storybook MCPs add design context, supplier APIs and running examples. The local catalogue remains available on its own.',
      ],
      media: [{
        kind: 'diagram', diagramId: 'solidaris-contracts-index',
        label: 'Write the facts once, make them available where work happens',
        caption: 'A component’s metadata feeds the documentation facts, catalogue and checks. The installed toolkit gives the agent that same knowledge for the version the application uses.',
        myPart: 'Designed and implemented metadata, protocols, indexes, generation and the validation path.',
        evidenceStatus: 'Verified',
      }],
      decision: {
        constraint: 'Copies of component facts and process instructions can diverge between docs, code and agent guidance.',
        choice: 'Keep component facts beside the code and generate the catalogue, indexes and documentation facts from them.',
        tradeOff: 'The generators and version compatibility become part of the system I have to maintain.',
      },
      sources: [source('Process and contracts', 'docs-pipeline-contracts--docs'), source('How agents work', 'docs-ai-strategy--docs')],
    },
    {
      id: 'governance', tocLabel: 'Core & team ownership', number: '03', eyebrow: 'Governance',
      title: 'Let teams build locally, with a route back to Core',
      paragraphs: [
        'My first model made Core the authority. Teams would call Core in as early as possible; Core would guide them, then decide whether a candidate joined Core, whether an existing component already covered it, or whether the need was real at all. When I presented that strategy, Solidaris pointed out two problems. Application teams were used to governing themselves around their own needs, and an approval step cut against that culture. The Core team was also new and ran other projects in parallel, so routing every decision through it would have created a bottleneck nobody could clear.',
        'I redesigned the model around that feedback. A team now builds what it needs locally, without approval, using the same scaffold, metadata and checks as Core. <strong>Core stops being a gate and goes looking for what is worth sharing.</strong>',
        'That only works if someone still asks the reuse question. Teams new to a design system were unlikely to judge on their own which components deserved a place in Core, so the Plectrum agent raises it while a developer builds, and the evidence checklist records a reuse estimate. When a team merges to its main branch, a usage report sends its local components and that estimate to Core. The Core dashboard turns those reports into recommendations, such as similar components across teams, and Core contacts the owning team.',
        'Ownership stays explicit in metadata and packages. A Candidate can appear in the catalogue for review while staying outside the Core runtime exports: being visible and being shared are different commitments. If Core adopts a component, it generalises it, a release ships it and the application replaces its local copy. I built that route into the process contract so both developers and agents can follow it.',
      ],
      media: [{
        kind: 'image', src: '/screenshots/solidaris/storybook-promote-local-work-2026-10-05.png',
        alt: 'Plectrum contribution guide, Promote existing work: the application team builds locally, CI reports usage, then the Core team spots what to share and contacts the team',
        label: 'Core comes to the teams',
        caption: 'Teams build locally; the usage report and dashboard let Core find what is worth sharing. Local Storybook build at f59d9c3, after release 2.1.0, captured 5 October 2026.',
        myPart: 'Redesigned the contribution model after Solidaris feedback and implemented its metadata, usage report and validation rules.',
        evidenceStatus: 'Verified',
      }],
      decision: {
        constraint: 'Teams were used to governing their own delivery, and a new Core team with parallel projects could not review every need.',
        choice: 'Let teams deliver locally without approval, and give Core the reports and dashboard to find what is worth sharing.',
        tradeOff: 'Core gives up early control: similar components can appear before it spots them, and teams keep local copies until release and upgrade.',
      },
      sources: [source('Contribute to Plectrum', 'get-started-contribute--docs'), source('At a glance', 'start-here-at-a-glance--docs')],
    },
    {
      id: 'storybook', tocLabel: 'Portable onboarding', number: '04', eyebrow: 'Developer experience',
      title: 'Put the guidance inside the application’s workflow',
      paragraphs: [
        'The next problem was getting that knowledge out of the design-system repository. I organised Storybook around the questions a developer arrives with: how to install Plectrum, find a component, choose a token and contribute a missing capability. The catalogue accepts task language such as “side panel”, so discovery can start before someone knows our component names.',
        'I built a separate developer toolkit to carry the guidance into an application. Its starter sets up the Angular and Storybook targets, SCSS layers, tests and CI job, alongside the agent instructions and protocols. That puts the rules next to the code a team is changing.',
        'Upgrades needed the same care as the first install. Managed files refresh with conflicts reported, so team edits stay visible. A separate consumer build checks the packed packages outside the monorepo. Teams still configure registry access and connect the supplied CI job to their own branch protection.',
      ],
      media: [{
        kind: 'video',
        src: '/videos/solidaris-component-discovery.mp4',
        poster: '/screenshots/solidaris/component-discovery-poster.png',
        alt: 'Screen recording of Plectrum Storybook: a side-panel search finds Drawer and opens its Core-owned documentation and usage guidance',
        label: 'From a need to a documented component · 24 sec',
        caption: 'Searching for “side panel” leads to Drawer, its ownership and its usage guidance. Recorded from a local Plectrum Storybook build (f59d9c3 with the fixed-width search field, after release 2.1.0) on 5 October 2026.',
        myPart: 'Designed and built the task-oriented catalogue, documentation structure and component contracts.',
        evidenceStatus: 'Verified',
        playOnScroll: false,
        steps: [
          'Search “side panel” by task rather than component name.',
          'Compare Core and application-specific results.',
          'Open Drawer to inspect ownership and usage rules.',
        ],
      }],
      sources: [source('Build with Plectrum', 'get-started-use-plectrum-in-an-app--docs'), source('Find a component', 'start-here-catalogue--docs'), source('Versioned release', 'docs-releases-and-versioning--docs'), { label: 'Release manifest', href: release }],
    },
    {
      id: 'shared-contribution', legacyAnchors: ['ishare', 'icrm', 'iged'], tocLabel: 'Tokens & foundations', number: '05', eyebrow: 'Design to code',
      title: 'Make the foundations match what applications render',
      paragraphs: [
        'Reliable advice also needs reliable values underneath it. I made <strong>compiled CSS the source of truth for rendered foundations</strong> and gave applications a stable --pds-* token surface. Figma remains the reference for visual decisions; Plectrum contains the PrimeNG theme details so application authors can work through the shared tokens.',
        'I designed and implemented both token directions. The Figma plugin sends changes to a staging branch, where build, drift checks and a reviewed pull request prepare them for use. Code-origin tokens take a proposal path back through the agent with Figma MCP or the tokens plugin. Designers review those proposals. This keeps review in both directions while providing a route beyond the REST Variables API restricted by the client’s licence.',
        'I built all the foundations and their playgrounds on that structure. The token finder reads compiled values; typography and spacing previews let a developer try real French labels. ITCSS and BEMIT give styles predictable places: values and vendor bridges in settings, layout in objects, states in component blocks. Form Field applies the same composition principle to a shared label, hint and error shell around a PrimeNG or native control.',
        'The product work supplied concrete questions for this guidance. An iSHARE dossier needed a compact overview alongside detailed steps, statuses and documents. iCRM raised different density and reading-order needs. Those explorations gave me cases to design composition and state guidance around, which developers and agents can now consult through the same catalogue.',
      ],
      media: [
        {
          kind: 'diagram', diagramId: 'solidaris-token-architecture',
          label: 'Two token directions, with review in each',
          caption: 'Figma changes enter through staging and checks; code-origin proposals return for design review. Applications consume the resulting CSS token surface.',
          myPart: 'Led and implemented the token flows, CSS architecture, foundations and consumer contract.',
          evidenceStatus: 'Verified',
        },
        {
          kind: 'image', src: '/screenshots/solidaris/storybook-token-finder-local-2026-10-04.png',
          alt: 'Local Plectrum token finder preview in table view, showing token names, authored CSS and computed values without a Figma column',
          label: 'Find a token by the job it does',
          caption: 'Token names, authored CSS and computed values together, so a developer can inspect what a token renders. Local 2.1.0 preview captured 4 October 2026; this simplified table awaits publication.',
          evidenceStatus: 'Ongoing',
        },
        {
          kind: 'image', src: '/screenshots/solidaris/ishare-affiliate-dossier.png',
          alt: 'Anonymised iSHARE dossier prototype showing case context, documents and workflow steps',
          label: 'The product question behind the patterns',
          caption: 'Case context, documents and workflow steps need to remain readable together. An iSHARE prototype using fictional affiliate data.',
          myPart: 'Designed the dossier model, hierarchy and workflow explorations.',
          evidenceStatus: 'Prototype', state: 'Tested concept',
        },
      ],
      decision: {
        constraint: 'Design decisions and implementation values change in different tools, with different owners.',
        choice: 'Use compiled CSS for rendered values and reviewed token paths to connect code with Figma.',
        tradeOff: 'Changes in either direction wait for review before becoming shared values.',
      },
      sources: [source('Figma token sync', 'docs-token-pipeline-figma-sync--docs'), source('CSS architecture', 'docs-css-architecture--docs'), source('Token finder', 'foundations-token-finder--docs')],
    },
    {
      id: 'quality-gates', tocLabel: 'Executable quality', number: '06', eyebrow: 'Delivery gates',
      title: 'Turn the rules into checks that run with the work',
      paragraphs: [
        'A component can change while its metadata still describes yesterday’s API. A token can be documented before its CSS exists. I added checks at those points: metadata against Angular inputs, declared tokens against compiled CSS, and generated files against their sources. Stories exercise states and interactions, including accessibility and navigation checks.',
        'I wanted the feedback available during implementation. Storybook MCP exposes <strong>test-run through the Vitest addon</strong>, while the Storybook CI job checks the change in delivery. Work produced with the agent follows the same review path. The checks have explicit limits: preset validation is advisory in the main CI, and visual testing runs conditionally.',
        'I also defined a regression suite using task descriptions for catalogue search. In the 0.7.1 evaluation, a member-panel task missed the right component. That exposed a gap between the language of a need and the way a component was indexed, giving me a specific catalogue improvement to investigate.',
      ],
      media: [],
      sources: [source('Writing stories', 'docs-writing-stories--docs'), source('Process and contracts', 'docs-pipeline-contracts--docs')],
    },
    {
      id: 'core-insights', tocLabel: 'Telemetry & Core insights', number: '07', eyebrow: 'Feedback & governance',
      title: 'Give Core a way to see what needs attention',
      paragraphs: [
        'Once the system can advise teams, Core needs a way to learn where that advice falls short. I built telemetry for local CLI and MCP calls around the facts needed for that question: tool names, component IDs and outcomes. Requests, code and file names stay out. Teams can disable collection and separately choose to share aggregates.',
        'I gave Core a separate dashboard because its job differs from the released Storybook. Storybook explains how to use a version; the dashboard brings together repository facts, contribution history, search evaluation and application reports to identify work worth investigating. I implemented explicit rules whose inputs can be inspected, with source dates and coverage visible beside the recommendation.',
        'A failed search can prompt Core to investigate a missing pattern. An empty usage table needs more care: without reports, usage is unknown. I kept <strong>Demo and Reported views separate</strong> so the dashboard can demonstrate its decision rules while showing exactly which application evidence is available.',
      ],
      media: [{
        kind: 'video',
        src: '/videos/solidaris-core-insights.mp4',
        poster: '/screenshots/solidaris/core-insights-poster.png',
        alt: 'Screen recording of Plectrum Core dashboard: inspect a Demo recommendation and its evidence, then switch to Reported mode with zero of three application reports',
        label: 'From a search signal to a Core question · 28 sec',
        caption: 'Open a Demo recommendation and inspect its sources, then switch to Reported: 0/3 application reports in this snapshot. Demo counts are synthetic. Captured 5 October 2026 from the 4 October dashboard build, runtime 2.1.0 / toolkit 0.7.2.',
        myPart: 'Designed and built the dashboard, telemetry reporting and rules behind its recommendations.',
        playOnScroll: false,
        steps: [
          'Inspect a Demo recommendation in Agent & MCP.',
          'Open its evidence and source details.',
          'Switch to Reported and check actual coverage.',
        ],
      }],
      decision: {
        constraint: 'Documentation explains how to use the system; Core also needs to know where teams may need help.',
        choice: 'Keep versioned guidance in Storybook and bring sources, coverage and recommendations together in a Core dashboard.',
        tradeOff: 'Optional reporting respects team control but leaves gaps in what Core can see.',
      },
      sources: [source('What the agent measures', 'start-here-use-the-agent--docs'), { label: 'Open the Core dashboard', href: dashboard }],
    },
    {
      id: 'handoff', tocLabel: 'Release & continuity', number: '08', eyebrow: 'Continuity · October 2026',
      title: 'Leave a system others can operate',
      paragraphs: [
        'My assignment ends on 8 October 2026, so continuing without me is a practical requirement. I published the UI, theme and styles at 2.1.0 with toolkit 0.7.2, a fixed contract snapshot and matching Storybook documentation. A maintainer has a reference for exactly what an application installed.',
        'I put the operating decisions into the starter, process contract, checks and recovery notes. Consumer guidance stays beside working examples in Storybook; broader architecture and maintenance records need a lasting team home. The remaining handoff work is to confirm receiving owners and rehearse the runbooks with them.',
        'The rehearsal I want is concrete: a colleague changes a contract, interprets a failed check and guides an application upgrade without my intervention. That is how I will judge whether the knowledge has become usable by someone else.',
      ],
      media: [],
      sources: [{ label: 'Published release', href: release }, source('Release and versioning', 'docs-releases-and-versioning--docs')],
    },
  ],
  outcomesTitle: 'What I built for teams to work from',
  outcomes: [
    { label: 'An installable foundation', text: 'UI, theme and styles 2.1.0, toolkit 0.7.2 and matching Storybook documentation, connected by versioned contracts and checked package boundaries.', evidenceStatus: 'Verified' },
    { label: 'Shared reasoning', text: 'I led and built the agent and the knowledge it works from: component facts, usage guidance, token foundations and rules that developers can inspect too.', evidenceStatus: 'Reported' },
    { label: 'A route from local work to Core', text: 'Ownership in metadata, a contribution and release path, and a dashboard that makes the sources behind Core recommendations visible.', evidenceStatus: 'Verified' },
  ],
  boundary: 'This case reflects the system and recordings available on 4–5 October 2026. The packages are published; independent team onboarding, adoption reports and a full accepted contribution round trip remain to validate. Handoff is in preparation. I have no measured delivery-speed or usability impact to report. Media labels identify the local preview, product prototype and synthetic dashboard data.',
  reflection: {
    repeat: 'Write down why a pattern exists and who owns it alongside how it works. That knowledge serves both the developer and the agent.',
    change: 'Bring a receiving maintainer into the work earlier, and test onboarding with someone who did not build the toolkit.',
    next: 'Rehearse a contract change and an application upgrade with the receiving team, then use their questions to improve the guidance.',
  },
};
