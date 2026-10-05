import type { VisualStory } from './visualStories';

const releasedStorybook = 'https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/releases/2.1.0-devkit-0.7.2/';
const source = (label: string, id: string) => ({ label, href: `${releasedStorybook}?path=/docs/${id}` });
const release = 'https://github.com/solidaris-danielbodigil/solidaris-plectrum/releases/tag/plectrum-v2.1.0-devkit-0.7.2';
const dashboard = 'https://solidaris-danielbodigil.github.io/solidaris-plectrum/dashboard/#/design-system/overview';

export const solidarisVisualStory: VisualStory = {
  title: 'Building an AI-first design system teams can own',
  statement:
    'Solidaris already had a UI kit. What its application teams lacked was a reliable way to turn it into consistent products: which pattern to use, how it behaves while data loads, and who decides when something is missing. As sole design-system lead, I built that layer in Plectrum, while designing the UX and UI of the case-management apps it had to serve.',
  glance: [
    { label: 'Problem', value: 'A UI kit, but no reliable way for 100+ developers across dozens of teams to turn it into consistent applications.' },
    { label: 'What I built', value: 'An AI agent and MCP server, one source of truth for components and tokens, a versioned Storybook, CI quality gates and a governance model.' },
    { label: 'Scale', value: 'Built for 100+ developers in teams across Belgium; piloted with 3 teams on 2 prototype applications.' },
    { label: 'Result', value: 'Plectrum 2.1.0 released and handed over ahead of the teams’ application redesigns.' },
  ],
  facts: [
    { label: 'Role', value: 'Sole design-system lead · product designer' },
    { label: 'Period', value: 'Oct 2025 – Oct 2026' },
    { label: 'Scale', value: '100+ developers · 21 components on PrimeNG · 19 foundation pages' },
    { label: 'Stack', value: 'Angular · PrimeNG · Storybook · Figma · MCP' },
  ],
  jumpTo: [
    { label: 'The agent in action', href: '/work/solidaris#fragmented-tools' },
    { label: 'Governance redesign', href: '/work/solidaris#governance' },
    { label: 'Core dashboard', href: '/work/solidaris#core-insights' },
  ],
  heroMedia: {
    kind: 'diagram',
    diagramId: 'solidaris-operating-model',
    label: 'The Plectrum operating model',
    caption: 'A team describes a need, finds a pattern and builds locally. Shared contracts connect that work to automated checks and to Core decisions.',
    myPart: 'I defined and implemented the architecture, tooling and rules behind every stage.',
  },
  chapters: [
    {
      id: 'fragmented-tools', tocLabel: 'The agent', number: '01', eyebrow: 'AI agent',
      title: 'Ask the design system before you build',
      paragraphs: [
        'PrimeNG and the Plectrum UI kit were already chosen. But finding a component still left the harder questions: how should it behave while data loads, what belongs around it, and who decides when something is missing?',
        'I built <strong>/plectrum, an agent that answers those questions at the moment a developer makes the choice</strong>. The developer describes the task; the agent reads the component catalogue installed in their application and proposes what to reuse or compose, with links to the matching documentation.',
      ],
      media: [{
        kind: 'video',
        src: '/videos/solidaris-agent-workflow.mp4?v=2',
        poster: '/screenshots/solidaris/agent-workflow-poster.webp',
        orientation: 'portrait',
        alt: 'VS Code recording of the Plectrum agent reading the installed catalogue and recommending list, loading, empty-result and error-recovery patterns for an employee document list',
        label: 'From a task to the right patterns · 30 sec',
        caption: 'For an employee document list, the agent reuses List’s loading state, recommends Empty State and composes an error message with a retry action.',
        myPart: 'Designed and built the agent workflow, the catalogue it reads and the developer toolkit that installs it.',
        playOnScroll: false,
        steps: [
          'Check the installed version and read its catalogue.',
          'Reuse List’s loading state and Empty State for empty results.',
          'Compose an error message with a retry action.',
          'Follow the links to the matching Storybook release.',
        ],
      }],
      decision: {
        constraint: 'A UI kit does not tell teams how to compose it for their work, or when to build something new.',
        choice: 'Give the agent the versioned catalogue and the same decision rules developers use.',
        tradeOff: 'Every gap in the catalogue is also a gap in what the agent can recommend.',
      },
      sources: [source('Use the Plectrum agent', 'start-here-use-the-agent--docs'), source('How agents work', 'docs-ai-strategy--docs')],
    },
    {
      id: 'workflow-experiment', legacyAnchors: ['shared-contribution', 'storybook'], tocLabel: 'One source of truth', number: '02', eyebrow: 'Components & tokens',
      title: 'Write every fact once',
      paragraphs: [
        'An agent is only as good as what it knows, and the same is true for developers. Rather than describing each component separately in Storybook, in code and in agent instructions, I kept <strong>component metadata beside the implementation and generated the catalogue, documentation and checks from it</strong>. The installed toolkit serves that catalogue to the agent for the exact version an application uses.',
        'Tokens follow the same principle. Compiled CSS is the source of truth for what applications render, behind a stable token surface. I built both directions between Figma and code, each with designer review, then every foundation and its Storybook playground on top.',
        'Storybook is organised around the questions a developer arrives with, and its search accepts task language: “side panel” finds Drawer before anyone knows the component’s name.',
      ],
      media: [
        {
          kind: 'diagram', diagramId: 'solidaris-contracts-index',
          label: 'One source, several uses',
          caption: 'Component metadata feeds the documentation, the agent’s catalogue and the checks on every contribution.',
          myPart: 'Designed and implemented the metadata, generation and validation path.',
        },
        {
          kind: 'diagram', diagramId: 'solidaris-token-architecture',
          label: 'Two token directions, reviewed in both',
          caption: 'Figma changes enter through staging and checks; code-origin proposals go back for design review. Applications consume the resulting CSS tokens.',
          myPart: 'Led and implemented the token flows, CSS architecture and foundations.',
        },
      ],
      decision: {
        constraint: 'Copies of the same facts in docs, code and agent guidance drift apart.',
        choice: 'Keep facts beside the code and generate everything else from them.',
        tradeOff: 'The generators become part of the system someone has to maintain.',
      },
      sources: [source('Find a component', 'start-here-catalogue--docs'), source('Figma token sync', 'docs-token-pipeline-figma-sync--docs'), source('CSS architecture', 'docs-css-architecture--docs')],
    },
    {
      id: 'governance', tocLabel: 'Governance', number: '03', eyebrow: 'Governance',
      title: 'Redesign governance when the first model is rejected',
      paragraphs: [
        'My first model made Core the authority: teams would bring every need to Core, which would decide what joined the system. When I presented it, Solidaris pushed back. Application teams were used to governing their own delivery, and the Core team was new and running other projects. Routing every decision through it would have created a bottleneck nobody could clear.',
        'I redesigned the model around that feedback. <strong>Teams now build what they need locally, without approval, using the same scaffold and checks as Core. Core stops being a gate and goes looking for what is worth sharing.</strong>',
        'Someone still has to ask the reuse question, so the agent raises it while a developer builds. When a team merges, a usage report sends its local components to Core, and the Core dashboard turns those reports into recommendations, such as similar components across teams.',
      ],
      media: [{
        kind: 'image', src: '/screenshots/solidaris/storybook-promote-local-work-2026-10-05.png',
        alt: 'Plectrum contribution guide: the application team builds locally, CI reports usage, then the Core team spots what to share and contacts the team',
        label: 'Core comes to the teams',
        caption: 'Teams build locally; usage reports and the dashboard let Core find what is worth sharing.',
        myPart: 'Redesigned the contribution model and implemented its metadata, usage report and validation rules.',
      }],
      decision: {
        constraint: 'Teams governed their own delivery, and a new Core team could not review every need.',
        choice: 'Let teams deliver locally, and give Core the reports and dashboard to find what to share.',
        tradeOff: 'Core gives up early control: similar components can appear before it spots them.',
      },
      sources: [source('Contribute to Plectrum', 'get-started-contribute--docs')],
    },
    {
      id: 'ishare', legacyAnchors: ['icrm', 'iged'], tocLabel: 'Product design', number: '04', eyebrow: 'Product design',
      title: 'Design the products the system has to serve',
      paragraphs: [
        'I also designed the UX and UI of Solidaris’ case-management applications, iSHARE and iCRM, as regional tools moved into one employee portal. I ran research and workshops, then tested prototypes with expert users on realistic scenarios.',
        'An iSHARE case needed a compact overview alongside detailed steps, statuses and documents; iCRM raised different density and reading-order needs. Those questions shaped the composition and state guidance that developers and the agent now find in Plectrum.',
      ],
      media: [{
        kind: 'image', src: '/screenshots/solidaris/ishare-affiliate-dossier.png',
        alt: 'Anonymised iSHARE case prototype showing case context, documents and workflow steps',
        label: 'An iSHARE case, readable at a glance',
        caption: 'Case context, documents and workflow steps on one surface. Prototype with fictional data, tested with expert users.',
        myPart: 'Designed the case model, information hierarchy and workflow treatment, and tested them.',
        state: 'Tested concept',
      }],
    },
    {
      id: 'core-insights', legacyAnchors: ['quality-gates', 'handoff'], tocLabel: 'Quality & insights', number: '05', eyebrow: 'Quality & feedback',
      title: 'Turn the rules into checks and signals',
      paragraphs: [
        'Rules that only live in documentation drift. I turned them into CI checks that run with every change: component metadata against the real Angular inputs, tokens against compiled CSS, generated files against their sources, plus story, interaction and accessibility tests. On a reference set of 17 developer requests, the agent’s search finds the right component 16 times.',
        'Core also needs to know where the system falls short. I built opt-out telemetry for agent and catalogue calls, without request text, code or file names, and <strong>a Core dashboard that turns usage, searches and contributions into recommendations</strong> with their sources visible.',
        'I released Plectrum 2.1.0 with its developer toolkit and a matching Storybook, and documented the operating decisions in the starter app, the contracts and runbooks so the team can run it without me.',
      ],
      media: [{
        kind: 'video',
        src: '/videos/solidaris-core-insights.mp4?v=2',
        poster: '/screenshots/solidaris/core-insights-poster.png?v=2',
        alt: 'Screen recording of the Plectrum Core dashboard: a recommendation and its evidence, then the view of reported application data',
        label: 'From a search signal to a Core decision · 22 sec',
        caption: 'A recommendation flags that searches from one team find nothing, with the facts behind it. Demo data; the Reported view shows real application coverage.',
        myPart: 'Designed and built the dashboard, the telemetry and the rules behind its recommendations.',
        playOnScroll: false,
        steps: [
          'Inspect a recommendation.',
          'Open its evidence and sources.',
          'Switch to reported application data.',
        ],
      }],
      decision: {
        constraint: 'Documentation explains how to use the system, not where teams struggle with it.',
        choice: 'Keep guidance in Storybook and give Core a dashboard of signals and recommendations.',
        tradeOff: 'Optional reporting respects team control but leaves gaps in what Core can see.',
      },
      sources: [{ label: 'Open the Core dashboard', href: dashboard }, { label: 'Published release', href: release }],
    },
  ],
  outcomesTitle: 'What teams can now work from',
  outcomes: [
    { label: 'A system teams can install', text: 'Plectrum 2.1.0 with its developer toolkit, versioned Storybook and quality gates, built for 100+ developers and piloted with 3 teams.' },
    { label: 'One adviser for people and agents', text: 'Developers and coding agents share the same component knowledge, usage rules and tokens, for the version their application installed.' },
    { label: 'Governance that fits the culture', text: 'Teams build locally without approval; usage reports and a dashboard show Core what deserves to be shared.' },
  ],
  reflection: {
    repeat: 'Write down why a pattern exists and who owns it alongside how it works. That knowledge serves both the developer and the agent.',
    change: 'Bring a receiving maintainer into the work earlier, and test onboarding with someone who did not build the toolkit.',
    next: 'Watch the first teams adopt Plectrum in their application redesigns, and turn their questions into better guidance.',
  },
};
