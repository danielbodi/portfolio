import type { VisualStory } from './visualStories';

const storybook = 'https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/';
const source = (label: string, id: string) => ({ label, href: `${storybook}?path=/docs/${id}` });

export const solidarisVisualStory: VisualStory = {
  title: 'Making Plectrum a system teams can build with',
  statement:
    'At Solidaris, I led and built the design-system engineering work myself: Storybook, both Figma–repository token flows, the CSS and metadata sources of truth, CI gates and every foundation. Alongside the product design, I defined the architecture and implemented the system that I will hand over when my assignment ends in October 2026.',
  facts: [
    { label: 'My ownership', value: 'Sole lead and implementer · design + engineering' },
    { label: 'Period', value: 'Oct 2025–Oct 2026 · assignment ends in October' },
    { label: 'Inherited', value: 'PrimeNG · Plectrum UI Kit · portal direction' },
    { label: 'Current state', value: 'Live Storybook · packages pre-release' },
  ],
  jumpTo: [
    { label: 'Explore the Storybook work', href: '/work/solidaris#storybook' },
    { label: 'Architecture & trade-offs', href: '/work/solidaris#shared-contribution' },
    { label: 'Product design', href: '/work/solidaris#ishare' },
  ],
  heroMedia: {
    kind: 'image',
    src: '/screenshots/solidaris/storybook-introduction.png',
    alt: 'Live Plectrum Storybook introduction with consumer onboarding, component discovery and token selection routes',
    label: 'Plectrum Storybook · captured 10 September 2026',
    caption: 'The entry point I built around the tasks of using, extending and maintaining the system. The catalogue is live; its package banner explicitly marks the pre-release state.',
    myPart: 'Led and implemented the Storybook, its documentation and the architecture connecting it to the libraries.',
    evidenceStatus: 'Verified',
  },
  chapters: [
    {
      id: 'fragmented-tools', tocLabel: 'Context & influence', number: '01', eyebrow: 'Scope & influence',
      title: 'Start with the products. Build a shared way forward.',
      paragraphs: [
        'Solidaris was bringing regional applications into one employee portal. I worked across iShare and iCRM, with an initial iGED interface draft. The challenge was to preserve expert workflows while giving the products a consistent foundation.',
        'PrimeNG and the original Plectrum UI Kit were already chosen. Initially outside the core design-system decisions, I used research and prototypes to make local needs concrete, recommended Plectrum for these workstreams, and created a small Figma fork to keep delivery moving.',
        'I took ownership of the system engineering, set its technical direction and implemented it myself: the repository, Storybook, both token flows, CSS architecture, metadata contracts, CI gates and all foundations. I also approached the core team directly to connect that work to the shared Plectrum direction. <strong>I owned both the strategy and its implementation.</strong>',
      ],
      media: [],
      decision: {
        constraint: 'An inherited foundation, regional ownership and product delivery running in parallel.',
        choice: 'Extend Plectrum from concrete product needs and build a contribution path into the core team.',
        tradeOff: 'A local fork helped work progress, but introduced divergence that needed governance and eventual reconciliation.',
      },
      sequence: [
        { label: 'Understand', text: 'Shadowing, workshops and prototype scenarios.' },
        { label: 'Make concrete', text: 'Product patterns, a repository and a live catalogue.' },
        { label: 'Connect', text: 'Direct outreach and shared design-system contribution.' },
        { label: 'Transfer', text: 'Documented ownership and October handoff preparation.' },
      ],
    },
    {
      id: 'storybook', tocLabel: 'Storybook & foundations', number: '02', eyebrow: 'Developer experience',
      title: 'Make the right implementation easier to find',
      paragraphs: [
        'I organised Storybook around practical questions: how to install Plectrum, whether a component already exists, which token to use, and how to propose a missing capability. Consumers and contributors have separate starting points. PrimeNG examples show the theme; custom components document the additional behaviour.',
        'I designed and implemented every foundation, including its catalogue, usage guidance and playground, to make implementation values inspectable. <strong>The token finder reads the compiled stylesheet</strong> and connects a styling task to a semantic role and a copyable CSS reference. Spacing and typography playgrounds let developers inspect the scale and try real content, including long French labels.',
        'Component pages connect usage, states, API information and ownership. Form Field makes the composition principle concrete: a shared label, hint and error shell around a PrimeNG or native input. The control engine remains PrimeNG’s responsibility.',
      ],
      media: [
        {
          kind: 'image', src: '/screenshots/solidaris/storybook-token-finder.png',
          alt: 'Plectrum token finder showing semantic text roles, CSS variable references and live colour values',
          label: 'Find a token by the job it does',
          caption: 'Task guidance, snippets and live values share one surface. This is a capture of the deployed tool.',
          myPart: 'Designed and built all foundation tooling, playgrounds and usage guidance.',
          evidenceStatus: 'Verified',
        },
        {
          kind: 'image', src: '/screenshots/solidaris/storybook-form-field.png',
          alt: 'Plectrum Form Field documentation with Core status, design-system ownership and usage guidance',
          label: 'A component is also a usage contract',
          caption: 'Status, owner and intended use are visible before a consumer chooses the component.',
          evidenceStatus: 'Verified',
        },
        {
          kind: 'video', src: '/videos/solidaris-typography.mp4',
          poster: '/screenshots/solidaris/storybook-typography-playground.png',
          alt: 'Recorded Plectrum typography playground: French sample text updates across type roles, then search narrows the examples to headings',
          label: 'Typography foundations · 11-second live capture',
          caption: 'I enter a French reimbursement label and amount, filter to heading roles, then try a longer status message. The rendered previews update as the content changes. Recorded 10 September 2026; no audio.',
          myPart: 'Designed and implemented the typography foundation and its interactive previews.',
          evidenceStatus: 'Verified',
        },
      ],
      decision: {
        constraint: 'Static reference pages can diverge from implementation and leave consumers guessing.',
        choice: 'Render foundations from CSS and component documentation from colocated metadata.',
        tradeOff: 'The documentation becomes software to maintain and test, with loading and interaction behaviour of its own.',
      },
      sources: [source('Open Storybook', 'introduction--docs'), source('Try the token finder', 'foundations-token-finder--docs'), source('Explore typography', 'foundations-typography-roles--docs'), source('Inspect Form Field', 'custom-components-form-field--docs')],
    },
    {
      id: 'shared-contribution', tocLabel: 'Token & CSS architecture', number: '03', eyebrow: 'Architecture',
      title: 'One CSS contract, with clear ownership at each boundary',
      paragraphs: [
        'I established CSS as the single source of truth for the rendered foundations and the interface applications consume. Figma remains the visual design reference; the repository imports its decisions, generates CSS and packages the implementation. Applications consume <strong>the stable --pds-* surface</strong>, with PrimeNG theme details contained inside Plectrum. This keeps application authors from copying token values or coupling their screens to theme internals.',
        'I structured the shared SCSS with ITCSS and BEMIT: settings own values and vendor bridges, objects own layout, component blocks own identity and states, and utilities do one small job. A component should not restate layout that a shared object already provides.',
        'I designed and implemented both directions of the token pipeline. The inbound flow connects the Figma plugin to a staging branch, drift checks and a promotion pull request. The published sync record shows a promotion on 7 September. Code-owned spacing, typography and feature tokens compile alongside imported values and have a proposal path back to Figma.',
        'I also implemented the repository-to-Figma proposal and write flow. Its automated write is currently parked because the required Figma API is unavailable on the client’s plan. I documented the choice between a custom plugin and a licence change, while preserving a manual designer-reviewed proposal path. <strong>Application consumption can continue while that decision remains open.</strong>',
      ],
      media: [{
        kind: 'diagram', diagramId: 'solidaris-token-architecture',
        label: 'Design intent → reviewed change → consumer contract',
        caption: 'Architecture redrawn from the deployed pipeline documentation. The inbound sync is live; registry publishing and reverse Figma automation have separate readiness states.',
        myPart: 'Sole lead and implementer of both token flows, the CSS source of truth and their integration boundaries.',
        evidenceStatus: 'Verified',
      }],
      decision: {
        constraint: 'Design and code have different owners, and the reverse Figma transport has a licensing dependency.',
        choice: 'Use reviewed imports, a CSS consumer contract and an explicit proposal route for code-owned tokens.',
        tradeOff: 'Automatic round-trip sync is incomplete; a designer still reviews and enters reverse proposals.',
      },
      sources: [source('Token pipeline', 'docs-token-pipeline--docs'), source('Latest promoted sync', 'docs-token-pipeline-sync-status--docs'), source('Figma transport decision', 'docs-token-pipeline-figma-sync--docs'), source('CSS architecture', 'docs-css-architecture--docs')],
    },
    {
      id: 'governance', tocLabel: 'Ownership & releases', number: '04', eyebrow: 'Contribution & distribution',
      title: 'Make reuse an ownership decision',
      paragraphs: [
        'A component appearing in Storybook does not automatically make it shared. I made the distinction explicit through status and ownership: Core belongs to the design-system team; Candidate and App-specific work belongs to an application team. Generic controls and application patterns have different places in the catalogue.',
        'The contribution strategy starts with a proposal. The core team can point to an existing solution, take a system-level need, or return an application-specific need to its owner. Promotion requires a generic API, shared tokens, changed ownership and a package upgrade that replaces the local copy.',
        'I implemented the distribution strategy and its CI gates. UI, theme and styles version together, and the packaging check builds a consumer against packed tarballs without repository path aliases. <strong>Today the packages are pre-release.</strong> The release workflow is configured; first registry publication and independent application upgrades are still milestones to demonstrate.',
      ],
      media: [{
        kind: 'image', src: '/screenshots/solidaris/storybook-component-status.png',
        alt: 'Live component status index listing Core and App-specific components with owners and dependencies',
        label: 'Governance made visible in the catalogue',
        caption: 'Status, owner and dependencies come from the generated contract index. Catalogue presence and permission to reuse are separate questions.',
        myPart: 'Defined the contribution strategy and implemented its metadata, documentation, packaging and CI gates.',
        evidenceStatus: 'Verified',
      }],
      sources: [source('Contribution & promotion', 'get-started-contribute--docs'), source('Live component status', 'docs-component-status--docs'), source('Consumer setup', 'get-started-use-plectrum-in-an-app--docs'), source('Release strategy', 'docs-releases-and-versioning--docs')],
    },
    {
      id: 'workflow-experiment', tocLabel: 'Contracts & AI', number: '05', eyebrow: 'AI-assisted engineering',
      title: 'Give agents the same contracts as people',
      paragraphs: [
        'I designed and implemented the metadata source of truth and the contract-driven AI workflow. A generated index tells an agent what exists and who owns it; one colocated metadata file explains the selected component; short protocols define how to query, create and audit. A running Storybook supplies live documentation through MCP, while the index remains available offline.',
        'I made the same metadata feed human-readable docs and implemented the gates that keep it aligned with code. Props checks compare the contract with Angular inputs and outputs; token checks compare declared consumption with compiled CSS; generated-file checks detect a stale index. This places repeatable checks in tooling instead of depending on an agent to remember them.',
        'Specialist roles separate research, architecture, styling, Angular implementation and review. Independent investigation can run in parallel; dependent implementation waits for its inputs. The coordinator brings the results back for human review. The architecture and contracts are inspectable; measured productivity gains and autonomous reliability are not yet established.',
      ],
      media: [{
        kind: 'diagram', diagramId: 'solidaris-contracts-index',
        label: 'Shared metadata, two reading paths, deterministic checks',
        caption: 'People see documentation and ownership. Agents read a focused contract. Both routes return to the same component and verification gates.',
        myPart: 'Sole author and implementer of the metadata source of truth, generated index, CI gates, agent protocols and specialist workflow.',
        evidenceStatus: 'Verified',
      }],
      evidenceLine: 'The documented MCP setup supplies discovery and previews. Story tests still run through the test runner; the MCP test tool is not wired. Token checks detect declared names missing from CSS, not every possible token-usage defect.',
      sources: [source('AI strategy & specialist roles', 'docs-ai-strategy--docs'), source('Token contracts', 'foundations-token-contracts--docs'), source('Story authoring', 'docs-writing-stories--docs')],
    },
    {
      id: 'ishare', tocLabel: 'iShare · case comprehension', number: '06', eyebrow: 'Product design · iShare',
      title: 'Make a complex case understandable',
      paragraphs: [
        'The product work gave the system concrete problems to solve. For iShare, I designed a dossier bringing affiliate context, documents, status and the active workflow into one reading surface, while leaving specialist processing in its authoritative tools.',
        'A horizontal journey helped orientation; a vertical model had room for dates, alerts and actions. I developed a compact overview with expandable detail. The project account records one scenario-based test round and a second prepared around comprehension, navigation and trust. These are prototype findings, with production effects still unmeasured.',
      ],
      media: [{
        kind: 'image', src: '/screenshots/solidaris/ishare-affiliate-dossier.png',
        alt: 'Anonymised iShare dossier prototype combining affiliate context, documents and workflow steps',
        label: 'A product need behind the reusable patterns',
        caption: 'Case context, status and progressive detail establish requirements for shared components. Product imagery uses fictional affiliate data.',
        myPart: 'Dossier model, information hierarchy, journey explorations and prototype testing.',
        evidenceStatus: 'Prototype', state: 'Tested concept',
      }],
      decision: {
        constraint: 'An overview is easy to scan; detailed steps need room for real work.',
        choice: 'Combine orientation with expandable step detail.',
        tradeOff: 'Two representations must stay synchronised and accessible.',
      },
    },
    {
      id: 'icrm', tocLabel: 'iCRM · expert workflows', number: '07', eyebrow: 'Product design · iCRM',
      title: 'Preserve expert density, improve the reading order',
      paragraphs: [
        'The prototype below exposes the tension: large ticket cards make it difficult to compare subjects and recent activity. A timeline-first alternative loses the business subject specialists recognise. My subsequent direction was to prioritise the subject, make recent activity secondary and keep chronology as complementary history.',
        'This work informed reusable list, detail and contextual-navigation patterns. I kept the business decisions visible instead of treating every dense screen as a candidate for simplification.',
      ],
      media: [{
        kind: 'image', src: '/screenshots/solidaris/icrm-inbox.png',
        alt: 'Earlier anonymised iCRM prototype with large ticket cards beside selected request details',
        label: 'iCRM prototype · the density problem', caption: 'The available capture shows the card-based prototype that informed the reading-order decision. It does not show the later compact-list direction.',
        myPart: 'Interaction model, information hierarchy and inbox/history relationship.', evidenceStatus: 'Prototype',
      }],
      layout: 'split',
    },
    {
      id: 'iged', tocLabel: 'iGED · document processing', number: '08', eyebrow: 'Product design · iGED',
      title: 'Carry shared patterns into document processing',
      paragraphs: ['The initial iGED interface draft carries filtering, status and dense-list principles into document processing. My contribution here is the draft shown; the wider programme and its implementation have their own owners.'],
      media: [{
        kind: 'image', src: '/screenshots/solidaris/iged-draft.png',
        alt: 'Initial iGED document-processing interface draft with filters and a dense document list',
        label: 'Initial document-processing draft', caption: 'A third product context for the shared visual language.',
        myPart: 'Initial interface draft.', evidenceStatus: 'Prototype',
      }],
      layout: 'split',
    },
    {
      id: 'handoff', tocLabel: 'October handoff', number: '09', eyebrow: 'Continuity · October 2026',
      title: 'Design for the people who inherit the system',
      paragraphs: [
        'My Solidaris assignment ends in October 2026. Having led and implemented this work myself, I am preparing the transfer of its architecture, operating decisions and maintenance knowledge so the next maintainers can work independently.',
        '<strong>The final Storybook is a consumer catalogue.</strong> Installation, foundations, component APIs, states and usage belong beside the running examples. Broader architecture records, release operations and handoff material are intended to move to Confluence or the team’s general documentation platform, with links between the two.',
        'The next proof is operational: a named maintainer can make a change, run the checks, explain a failed sync and guide an application upgrade without depending on me. Ownership acceptance and that handoff rehearsal remain open milestones.',
      ],
      media: [{
        kind: 'diagram', diagramId: 'solidaris-handoff',
        label: 'Planned documentation split',
        caption: 'Keep consumer guidance next to the implementation; transfer operating knowledge to the team’s documentation platform. This migration is planned, not completed.',
        myPart: 'Preparing the handoff of the system I led and built, ahead of my October 2026 departure.', evidenceStatus: 'Planned',
      }],
      decision: {
        constraint: 'A temporary maintainer knowledge base can overwhelm the long-term consumer catalogue.',
        choice: 'Separate consumer reference from operating and decision records, with clear links and owners.',
        tradeOff: 'Two surfaces need deliberate navigation and maintenance; copying the same content into both would recreate drift.',
      },
    },
  ],
  outcomesTitle: 'What the work demonstrates today',
  outcomes: [
    { label: 'Inspectable system', text: 'A deployed Storybook with live foundations, component contracts, ownership and a recorded inbound token promotion. These are concrete engineering outputs.', evidenceStatus: 'Verified' },
    { label: 'Product & influence', text: 'I led and implemented the system work myself, from architecture and both token flows to foundations, metadata and CI, alongside product research and design. I also established a path into the core team’s decisions.', evidenceStatus: 'Reported' },
    { label: 'Next evidence', text: 'First registry release, independent consumer upgrades and an accepted October handoff. These will establish how the system performs beyond its author.', evidenceStatus: 'Planned' },
  ],
  boundary: 'Reviewed against the deployed Storybook on 10 September 2026. Screenshots show the running catalogue; pipeline and CI descriptions reflect its published documentation, not an independent execution of the private repository. Product visuals are anonymised or recreated. Team adoption, quantified impact and completed handoff are not claimed.',
  reflection: {
    repeat: 'Connect a real product problem to a reusable component, a clear owner and an inspectable implementation.',
    change: ['Establish the contribution path before a local fork becomes necessary.', 'Agree the next maintainer and capture consumer evidence earlier.'],
    next: 'Complete the documentation transfer, confirm ownership and rehearse a change and an application upgrade with the receiving team.',
  },
};
