import { DeliveryState } from "../types";

export interface VisualStoryFact {
  label: string;
  value: string;
}

export type VisualEvidenceStatus =
  | "Verified"
  | "Reported"
  | "Prototype"
  | "Ongoing"
  | "Planned";

/**
 * Interactive demos that run in the page. Every id here must have an entry in
 * the registry at src/ui/components/demos/registry.ts.
 */
export type VisualDemoId = "bridgestone-token-pipeline";

/**
 * A technique re-implemented so it runs in the page. The registry supplies the
 * label, heading, description and provenance line; the fields below only exist
 * to override them per chapter.
 */
export interface VisualStoryLiveDemo {
  kind: "live-demo";
  demoId: VisualDemoId;
  label?: string;
  title?: string;
  description?: string;
  /** States what the demo is and is not, in place of the registry default. */
  provenance?: string;
  evidenceStatus?: VisualEvidenceStatus;
}

export type VisualStoryMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      label?: string;
      caption?: string;
      myPart?: string;
      evidenceStatus?: VisualEvidenceStatus;
      state?: DeliveryState;
    }
  | {
      kind: "video";
      src: string;
      /** Poster frame shown before play; also used if the clip fails to load. */
      poster: string;
      alt: string;
      label?: string;
      caption?: string;
      myPart?: string;
      evidenceStatus?: VisualEvidenceStatus;
      state?: DeliveryState;
    }
  | {
      kind: "system-evidence";
      sourceIndex: number;
    }
  | VisualStoryLiveDemo;

export interface VisualStoryChapter {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  media: VisualStoryMedia[];
  layout?: "stacked" | "split";
  evidenceLine?: string;
  decision?: {
    constraint: string;
    choice: string;
    tradeOff: string;
  };
  sequence?: {
    label: string;
    text: string;
  }[];
}

export interface VisualStoryOutcome {
  label: string;
  text: string;
  evidenceStatus: VisualEvidenceStatus;
}

export interface VisualStory {
  title: string;
  statement: string;
  facts: VisualStoryFact[];
  /** Anchors rendered under the facts strip, pointing at the evidence worth seeing first. */
  jumpTo?: { label: string; href: string }[];
  heroMedia: VisualStoryMedia;
  chapters: VisualStoryChapter[];
  outcomesTitle: string;
  outcomes: VisualStoryOutcome[];
  boundary: string;
  reflection: {
    repeat: string;
    /** An array renders as a list, for cases with more than one lesson. */
    change: string | string[];
    next: string;
  };
}

export const bridgestoneVisualStory: VisualStory = {
  title: "Building shared UI foundations without a mandate",
  statement:
    "I built the UI foundation for FleetBridge — Bridgestone’s fleet and tyre operations platform — from inside feature delivery. There was no UI library, the team chose to write every component itself, and my request for dedicated resources was declined every time it came up. So I shipped the foundation piece by piece until the difference showed in the product, and the investment followed.",
  facts: [
    { label: "Role", value: "Product designer + UX engineer" },
    { label: "Period", value: "2019–2025 · sole designer → team of three" },
    {
      label: "Ownership",
      value:
        "Product UX through UI — pages, templates, shared patterns, CSS and Storybook",
    },
    {
      label: "Documentation",
      value: "Storybook foundations generated from the shipped CSS",
    },
  ],
  jumpTo: [
    {
      label: "Live · the token pipeline runs in this page",
      href: "#demo-bridgestone-token-pipeline",
    },
  ],
  heroMedia: {
    kind: "image",
    src: "/screenshots/bs/bs_desktop_ws-light.png",
    alt: "FleetBridge production worksheet in its light theme",
    label: "Service worksheet · light theme",
    caption:
      "Vehicle layout, per-position tyre state and the inspection form on one surface. This component is where the argument for a system was finally won.",
    myPart:
      "Designed the workflow and its composite patterns, then worked with developers to integrate them into the shared UI foundation.",
    evidenceStatus: "Verified",
    state: "In production",
  },
  chapters: [
    {
      id: "delivery-constraint",
      number: "01",
      eyebrow: "Starting point",
      title: "Invert the double diamond around delivery",
      paragraphs: [
        "Business needs and feature definitions were already supplied. Instead of opening with discovery, I designed and shipped from those commitments, then used what implementation and feedback exposed to improve both the product and the emerging system.",
        "There was no design system and nobody had asked for one. The precedent was the legacy applications, designed as well as built by front-end developers on off-the-shelf libraries such as Angular Material, so consistency had always been treated as a developer concern rather than a product one. For the back office nothing had been decided and nothing was imposed on me: no UI library, no theme, no foundation.",
        "I started from the Ant Design UI kit in Figma and extended it with FleetBridge components, so design work was reusable from the first sprint. The team then chose to build the components in code <strong>from scratch</strong> rather than adopt the Ant Design implementation, keeping behaviour, accessibility and theming under our own control.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/bs/bs_design-approach.png",
          alt: "Diagram comparing a conventional double diamond with the reverse-diamond delivery approach used for FleetBridge",
          label: "Process model",
          caption:
            "Definition and delivery came first; research insights and improvements fed later iterations.",
          myPart:
            "Adapted the loop with the other designers and fed recurring findings into product and system backlogs.",
          evidenceStatus: "Reported",
        },
      ],
      decision: {
        constraint:
          "Nothing was decided for the back office — no UI library, no theme, no foundation — and nobody had asked for a design system.",
        choice:
          "Design from the Ant Design kit in Figma, then build the components in code from scratch rather than adopt its implementation.",
        tradeOff:
          "Full control over behaviour, accessibility and theming, paid for in build time — and a shared foundation stopped being optional.",
      },
    },
    {
      id: "make-value-visible",
      number: "02",
      eyebrow: "Influence without authority",
      title: "No mandate, so let the product argue",
      paragraphs: [
        "Owning every component made a shared foundation a requirement rather than a nice-to-have. I asked for dedicated resources to build it, laid out the trade-offs, and was turned down every time: the feature backlog came first. So I built what I could inside delivery and spent the rest of the time trying to keep the gaps out of production — pairing, reviewing and writing guidance as the work went through.",
        "The problems surfaced anyway, and they surfaced on their own. The same defects and inconsistencies turned up in demos and retrospectives, and management was visibly surprised by them. What I added was the diagnosis: I named the cause each time instead of letting it read as carelessness. The developers were not short of effort, they were <strong>short of tools</strong> — stories estimated at three or five points could run into a second sprint, because every screen re-decided questions nobody had answered once.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/bs/bs_desktop_storybook-home.png",
          alt: "Bridgestone UI design system home in Storybook, with foundations, components, colours and icons documented",
          label: "Where it landed",
          caption:
            "The end state of the sequence below: the Storybook stakeholders funded once shared patterns had shipped.",
          evidenceStatus: "Verified",
          state: "In production",
        },
      ],
      evidenceLine:
        "Reported, not measured: the evangelising had spread beyond the front-end team — back-end developers began raising UI and pattern issues in review before I reached the change.",
      sequence: [
        {
          label: "Request",
          text: "I asked for dedicated resources. It was declined.",
        },
        {
          label: "Evidence",
          text: "The same defects returned in demos and retrospectives.",
        },
        {
          label: "Demonstration",
          text: "Shared patterns shipped visibly cleaner than the screens around them.",
        },
        {
          label: "Decision",
          text: "Funded only once the difference showed in the product.",
        },
      ],
      decision: {
        constraint:
          "The backlog was the priority, and arguing the case in meetings had already failed multiple times.",
        choice:
          "Build the foundation inside feature delivery, and name the cause each time a gap showed up in a demo.",
        tradeOff:
          "The system grew in product-priority order rather than by architecture, and the effort stayed invisible on the plan.",
      },
    },
    {
      id: "earlier-collaboration",
      number: "03",
      eyebrow: "Operating model",
      title: "Turn a review gate into coaching",
      paragraphs: [
        "We agreed that any pull request touching UI would wait for my approval. The gate caught what review is meant to catch, and some pull requests came back with twenty-odd comments: spacing, missing states, interaction details, CSS that would not survive the next screen.",
        "It also slowed the team down and concentrated the friction on me, and that was not sustainable: I was one person with a long queue. Blaming the developers would have been the wrong reading — they had no patterns, no documentation and no utilities to build from, so the same corrections came back on every screen.",
        "The slowdown changed behaviour more than the corrections did. Developers began coming to me <strong>during implementation</strong> — for the design translation, and often for the HTML and CSS itself — instead of waiting for review. I kept the gate temporary and moved the effort into pairing, coaching and written guidance.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/bs/bs_example of the anatomy section for Tags in Figma.png",
          alt: "Figma documentation page showing the anatomy of the FleetBridge tag component",
          label: "Component anatomy",
          caption:
            "Naming the parts of a component made review comments teachable instead of repetitive.",
          evidenceStatus: "Reported",
        },
        {
          kind: "image",
          src: "/screenshots/bs/bs_example of the best practices section for Tags in Figma.png",
          alt: "Figma documentation page listing do and do-not usage rules for the FleetBridge tag component",
          label: "Reusable guidance",
          caption:
            "Written usage rules replaced repeated review comments: the guidance a developer could read before opening a pull request.",
          evidenceStatus: "Reported",
        },
      ],
      evidenceLine:
        "Observed, not measured: design input moved from pull-request correction into implementation.",
      decision: {
        constraint:
          "Letting UI defects merge was costly, but making one designer approve every UI change could not scale.",
        choice:
          "Use the gate as a temporary diagnostic and spend the time it bought on patterns, documentation and utilities.",
        tradeOff:
          "Velocity dropped and tension rose in the team while the tooling caught up.",
      },
    },
    {
      id: "product-patterns",
      number: "04",
      eyebrow: "Product craft",
      title: "Standardise the recurring decision—not every screen",
      paragraphs: [
        "Dense tables, forms, status patterns and vehicle workflows became reusable only when their behaviour genuinely repeated. Product-specific decisions stayed local where a generic abstraction would have slowed expert work.",
        "This is where <strong>the argument was settled</strong>, and the hard components carried it: a date picker every screen had been reinventing, and the service worksheet — vehicle layout, axles, per-position tyre state and the inspection form on one surface. Once those shipped with visibly fewer defects than the screens around them, stakeholders allocated time and people to system work.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/bs/bs_desktop_vehicle-list-light.png",
          alt: "FleetBridge vehicle list in its light theme",
          label: "Dense list pattern",
          evidenceStatus: "Verified",
          state: "In production",
        },
        {
          kind: "image",
          src: "/screenshots/bs/bs_desktop_ws-dark.png",
          alt: "FleetBridge production worksheet in its dark theme",
          label: "Vehicle configuration",
          caption:
            "Axles, positions and per-tyre state, composed from the same table, form and status patterns — the component that settled the argument.",
          evidenceStatus: "Verified",
          state: "In production",
        },
        {
          kind: "image",
          src: "/screenshots/bs/bs_tablet_ws-light.png",
          alt: "FleetBridge worksheet adapted to a tablet working surface",
          label: "Responsive behaviour",
          caption:
            "The same worksheet on a tablet, the surface the workshop floor actually works from.",
          evidenceStatus: "Verified",
          state: "In production",
        },
      ],
      evidenceLine:
        "The public gallery shows selected implementation evidence; it does not expose every component or workflow.",
      decision: {
        constraint:
          "Dense operational workflows risked becoming unrelated one-off implementations.",
        choice:
          "Standardise domain behaviour only where it genuinely repeated; keep workflow-specific decisions local.",
        tradeOff:
          "The system grew unevenly, but avoided abstractions that would slow expert work.",
      },
    },
    {
      id: "shared-source",
      number: "05",
      eyebrow: "System + code",
      title: "Make shipped CSS the shared source",
      paragraphs: [
        "The style foundation followed eight ITCSS layers. BEMIT connected placement and naming: <code>.o-</code> for layout objects, <code>.c-</code> for components and <code>%u-</code> for utility placeholders; <code>__</code> marked elements, <code>--</code> modifiers and suffixes such as <code>@md</code> responsive variants.",
        "I defined and implemented the core CSS and Storybook mechanisms; product delivery remained cross-functional. CSS custom properties were authoritative, and TypeScript read selected values from the live CSSOM so the token nomenclature acted as the contract between shipped code and documentation.",
        "The usual foundations setup in Storybook re-declares every token list — palette, typography, iconography, borders, shadows, animation — as documentation constants: a second copy, maintained in step with the CSS. Here the foundation pages rendered <strong>from the live CSSOM</strong> instead, so changing a value in shipped CSS meant the documentation was already correct. What stayed hand-built was structure — the story templates that read and display those values — not token upkeep.",
      ],
      media: [
        {
          kind: "video",
          src: "/videos/token-pipeline.mp4",
          poster: "/videos/token-pipeline-poster.jpg",
          alt: "Screen recording: a token added to the semantic palette SCSS, saved, and the Storybook Semantic Palette page documenting the new token-pipeline group after the rebuild",
          label: "The pipeline, recorded",
          caption:
            "One token added to the semantic SCSS and saved. After the rebuild, the Semantic Palette page documents the new token-pipeline group on its own — no documentation file was touched. Clicking a swatch copies its var().",
          evidenceStatus: "Verified",
        },
        { kind: "live-demo", demoId: "bridgestone-token-pipeline" },
        { kind: "system-evidence", sourceIndex: 1 },
        { kind: "system-evidence", sourceIndex: 2 },
        { kind: "system-evidence", sourceIndex: 3 },
      ],
      evidenceLine:
        "The excerpts are reduced implementation code from the recorded project snapshot, where the Storybook workspace held 39 story files and 51 MDX pages. Selected foundation pages — not every page — were generated from production CSS.",
      decision: {
        constraint:
          "Foundation values repeated across product CSS, Storybook constants and documentation could diverge.",
        choice:
          "Keep selected definitions in shipped CSS and let Storybook read the live CSSOM.",
        tradeOff:
          "The naming grammar became an API, and the custom parsers had to be maintained.",
      },
    },
    {
      id: "shared-capability",
      number: "06",
      eyebrow: "Adoption",
      title: "Make the rules explicit when the team grew",
      paragraphs: [
        "The design team went from one to three and delivery became distributed across sites. The third designer arrived with a different way of working, and the informal agreement my design partner and I had relied on stopped being enough.",
        "So I made the process explicit rather than personal: onboarding through Storybook, written contribution guidance, and Figma branch review so every proposed change was visible before it reached delivery. The goal was not to keep approval with me — it was to make the reasoning <strong>inspectable by more people</strong>.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/bs/bs_storybook tag anatomy.png",
          alt: "Storybook documentation explaining the anatomy of a FleetBridge tag component",
          label: "Component anatomy",
          caption: "Production-backed Storybook guidance.",
          evidenceStatus: "Reported",
        },
        {
          kind: "image",
          src: "/screenshots/bs/bs_storybook tag best practices.png",
          alt: "Storybook documentation explaining best practices for the FleetBridge tag component",
          label: "Usage guidance",
          caption: "Shared rules made review less dependent on memory.",
          evidenceStatus: "Reported",
        },
      ],
      evidenceLine:
        "Onboarding, written guidance and branch review are outputs I can show; independent use of them after my engagement was not measured.",
    },
  ],
  outcomesTitle: "What changed",
  outcomes: [
    {
      label: "Earlier collaboration",
      text: "Developers moved design input into implementation and worked from Storybook rather than from my review comments; rework and recurring UI defects dropped with it.",
      evidenceStatus: "Reported",
    },
    {
      label: "Shared foundation",
      text: "I delivered the reusable product patterns, the production CSS foundation and the Storybook pages generated from it.",
      evidenceStatus: "Verified",
    },
    {
      label: "Organisational investment",
      text: "Stakeholders declined every request at first; once shared patterns shipped, they funded dedicated design-system resources.",
      evidenceStatus: "Reported",
    },
  ],
  boundary:
    "No formal pre/post baseline was captured for usability, defects, delivery speed, review effort or long-term independent adoption. The defect, delivery-effect and adoption statements here are recollections from working on the team, not measurements. The claims above describe implementation evidence and observed workflow change.",
  reflection: {
    repeat:
      "Diagnose recurring quality problems as a system gap rather than an individual failure.",
    change: [
      "Negotiate mandate, ownership and measurement into the initial backlog.",
      "Record a defect and estimation baseline before the first refusal, so the argument does not rest on memory.",
    ],
    next: "Trace one shared pattern across workflows, contributors and a before/after review or defect baseline.",
  },
};

export const solidarisVisualStory: VisualStory = {
  title: "Connecting fragmented healthcare tools to a shared system",
  statement:
    "Hired to work on the design system, I arrived to find the foundation already chosen and the decisions held by a core team in another region. I built the bridge anyway: research and redesigns for three converging tools, the first repository and Storybook these applications had, and a route back into the central decisions — where I now sit.",
  facts: [
    { label: "Role", value: "Embedded consultant · product + systems" },
    { label: "Period", value: "Oct 2025 – Oct 2026 · handoff planned" },
    {
      label: "Scope",
      value: "iShare · iCRM · iGED converging into one portal",
    },
    {
      label: "Foundation",
      value: "PrimeNG + Plectrum · decided before I arrived",
    },
  ],
  heroMedia: {
    kind: "image",
    src: "/screenshots/solidaris/ishare-affiliate-dossier.png",
    alt: "Anonymised iShare affiliate dossier prototype with affiliate context, document tracking and a workflow journey",
    label: "iShare affiliate dossier · prototype",
    caption:
      "One reading surface for affiliate context, documents, status and the active workflow step. Anonymised, with fictional affiliate data.",
    myPart:
      "Designed the dossier model, information hierarchy and journey treatment, and tested them.",
    evidenceStatus: "Prototype",
    state: "Tested concept",
  },
  chapters: [
    {
      id: "fragmented-tools",
      number: "01",
      eyebrow: "The context",
      title: "Hired for the system, outside its decisions",
      paragraphs: [
        "Solidaris is organised by region, and each region carried its own products, ways of working and applications. The programme goal was to merge them behind a single portal — one shell holding every application an employee needs — which meant several tools would be merged and redesigned at once.",
        "The reality check came first. The component foundation was fixed before I arrived: PrimeNG, themed as Plectrum with Solidaris branding. The core design team sat in another region, and as an external consultant I was <strong>outside the decisions</strong> I had been brought in to work on.",
        "The product managers for iShare, iCRM and iGED were sceptical about the merge but willing to attempt it without destabilising expert work, and redesign was not a leadership priority. They asked for research. I started with shadowing, then workshops, then scenario tests on prototypes — and recommended adopting Plectrum locally, which was not the assumed path for these workstreams.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/solidaris/icrm-inbox.png",
          alt: "Anonymised iCRM inbox concept",
          label: "iCRM · Figma concept",
          evidenceStatus: "Prototype",
          state: "Concept",
        },
        {
          kind: "image",
          src: "/screenshots/solidaris/iged-draft.png",
          alt: "First iGED interface draft with a dense document list",
          label: "iGED · first draft",
          evidenceStatus: "Ongoing",
          state: "Ongoing",
        },
      ],
      decision: {
        constraint:
          "Convergence was the direction, but the foundation was fixed and I held no decision rights in it.",
        choice:
          "Adopt the inherited Plectrum direction locally and add only the product patterns the work actually required.",
        tradeOff:
          "Less reinvention and faster convergence, but every local addition still needed a path back upstream.",
      },
    },
    {
      id: "ishare",
      number: "02",
      eyebrow: "iShare",
      title: "Make the journey understandable",
      paragraphs: [
        "The dossier brings affiliate context, document states and the end-to-end journey into <strong>one reading surface</strong>. Scenario-based prototype testing moved the active step, alerts and navigation into clearer positions before implementation decisions were finalised.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/solidaris/ishare-journey.png",
          alt: "iShare journey component showing workflow progress",
          label: "Journey model",
          caption:
            "The compact overview with expandable step detail, validated in scenario-based prototype tests.",
          evidenceStatus: "Prototype",
          state: "Tested concept",
        },
      ],
      layout: "split",
      evidenceLine:
        "The project account records a first scenario-based test round and a second round prepared around comprehension, navigation and trust.",
      decision: {
        constraint:
          "A horizontal journey improved orientation; a vertical journey gave each step enough room for work.",
        choice: "Combine a compact overview with expandable vertical detail.",
        tradeOff:
          "Both representations must remain synchronised and accessible.",
      },
    },
    {
      id: "icrm",
      number: "03",
      eyebrow: "iCRM",
      title: "Preserve expert speed",
      paragraphs: [
        "The subject remains primary, recent activity becomes secondary and chronology appears only where it adds context. The design avoids forcing specialists through a generic dashboard before they can act.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/solidaris/icrm-inbox.png",
          alt: "Anonymised iCRM inbox concept with a dense master list beside a selected request",
          label: "Work-oriented inbox",
          caption:
            "Subject first, recent activity second, status and alerts before the detail opens.",
          evidenceStatus: "Prototype",
          state: "Concept",
        },
        {
          kind: "image",
          src: "/screenshots/solidaris/icrm-timeline.png",
          alt: "iCRM chronological history concept beside a selected request detail",
          label: "Complementary history",
          caption:
            "The inbox and history relationship, built around expert scanning speed.",
          evidenceStatus: "Prototype",
          state: "Concept",
        },
      ],
      decision: {
        constraint:
          "Large cards hid recent activity; a timeline-first view hid the business subject users recognised.",
        choice:
          "Use a work-oriented inbox with subject first, recent activity second and chronology as complementary context.",
        tradeOff:
          "Less visual richness per row in exchange for density and faster comparison.",
      },
    },
    {
      id: "iged",
      number: "04",
      eyebrow: "iGED",
      title: "Extend the language carefully",
      paragraphs: [
        "The first iGED draft applies the same status, filtering and dense-list principles to document processing. The draft is my contribution; the wider iGED programme has its own owners.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/solidaris/iged-draft.png",
          alt: "First iGED interface draft with dense filters and a document list",
          label: "iGED · first draft",
          caption:
            "Status, filtering and dense-list principles carried into document processing.",
          myPart: "The first draft shown is mine.",
          evidenceStatus: "Ongoing",
          state: "Ongoing",
        },
      ],
      layout: "split",
    },
    {
      id: "shared-contribution",
      number: "05",
      eyebrow: "System direction",
      title: "Build the bridge, then the repository",
      paragraphs: [
        "With no contribution path into the core library, I forked it in Figma and added only the product-specific components the work required — four or five at that point — keeping the divergence and its ownership visible.",
        "No repository existed for this work. I created the first one and built inside it: the iShare and iGED front ends, the custom components, an ITCSS/BEMIT structure and a Storybook that renders live components. What existed before documented the system as screenshots and embedded Figma frames.",
        "Then I approached the core design team directly and offered to help, including ownership of token synchronisation for Plectrum. Their strength was UX rather than design systems, so the offer met a real gap. The group was later restructured and re-formed, and I have been <strong>part of its decisions</strong> since.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/solidaris/token-architecture.svg",
          alt: "Proposed primitive, semantic and component token tiers connected to the inherited PrimeNG foundation",
          label: "Token tiers",
          caption:
            "Product variables and semantic decisions mapped onto the inherited PrimeNG/Plectrum foundation.",
          myPart:
            "I mapped the tiers and the bridge; synchronisation still runs by hand.",
          evidenceStatus: "Ongoing",
          state: "Strategic proposal",
        },
        {
          kind: "image",
          src: "/screenshots/solidaris/contracts-index.svg",
          alt: "Machine-readable component contracts, working rules and knowledge-base structure",
          label: "Component contracts",
          caption:
            "Contract schemas state intended use, token boundaries and accessibility expectations, which makes design-to-code constraints inspectable rather than tacit.",
          myPart:
            "Authored the contract schema, the working rules and the knowledge-base structure.",
          evidenceStatus: "Ongoing",
          state: "Ongoing",
        },
      ],
      layout: "split",
      decision: {
        constraint:
          "Local products had to move before any contribution path into the core system existed.",
        choice:
          "Fork deliberately, keep it small, and state the ownership boundary in the artefacts themselves.",
        tradeOff:
          "The bridge unblocked delivery while carrying real shadow-system and divergence risk.",
      },
      sequence: [
        {
          label: "Starting point",
          text: "Outside the central contribution loop.",
        },
        {
          label: "Local proof",
          text: "A bounded fork, then the first repository and Storybook these apps had.",
        },
        {
          label: "Initiative",
          text: "Direct outreach, offering to own token synchronisation.",
        },
        {
          label: "Current state",
          text: "Part of the core group’s decisions; formal rights stay with the programme.",
        },
      ],
    },
    {
      id: "workflow-experiment",
      number: "06",
      eyebrow: "Workflow experiment",
      title: "Design the graph, then audit it",
      paragraphs: [
        "Two rules produced the shape of this workflow, and neither one is the number of roles.",
        "<strong>Data dependency</strong>: the UX Engineer is a join waiting on both research roles, and the Frontend Dev cannot start before tokens exist.",
        "<strong>Write conflict</strong>: the UX Engineer and the Frontend Dev edit the same component’s files, so they would clobber each other even with no data passing between them.",
        "What falls out is <em>parallelise readers, serialise writers</em> — one research role reads Figma while the other reads the repository, and the QA pair both read one finished artefact and write to disjoint paths.",
        "The dashed layer is a later review of my own proposal, and it argues against three of the seven boxes. Orchestration is a graph runner, not an agent: with the contracts fixed and the shape static, a model in that slot adds a round trip and a lossy summary at every hop. The Token Auditor is deterministic — prefix, coverage and drift are a lint rule plus a declared-versus-used diff, so they belong in CI on every commit. The Tester splits down the middle: axe-core covers the mechanical half of WCAG AA, while writing meaningful tests is judgement, kept separate from the Frontend Dev because a reviewer who did not write the code finds more.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/solidaris/ai-agent-workflow.svg",
          alt: "Four-stage workflow: two readers in parallel, then two writers in sequence, then two readers in parallel again, with a dashed amber outline marking Orchestration, the Token Auditor and half of the Tester as work that does not need an agent",
          label: "Proposal and review in one diagram",
          caption:
            "Solid strokes are the workflow as proposed; the dashed layer is the review pass.",
          myPart:
            "Defined the role model and the stage dependencies, then wrote the review that removes three of its own boxes.",
          evidenceStatus: "Prototype",
          state: "Strategic proposal",
        },
      ],
      evidenceLine:
        "Two stages are marked parallel in the workflow definition and the two middle stages are not, so the staged shape was deliberate. This chapter evidences that definition and my review of it — not production-grade operation or adoption.",
      decision: {
        constraint:
          "Parallelism was limited by which roles write to the same files, not by how many roles the graph contains.",
        choice:
          "A staged graph with two parallel pairs: readers run together, writers run in sequence.",
        tradeOff:
          "A four-stage critical path caps the achievable speed-up — more agents widen a stage, they cannot shorten the path.",
      },
    },
  ],
  outcomesTitle: "Evidence at the current snapshot",
  outcomes: [
    {
      label: "Delivery evidence",
      text: "I delivered research and prototypes across iShare and iCRM, a first iGED draft, and the first repository and Storybook these applications had — two of them now built on Plectrum.",
      evidenceStatus: "Reported",
    },
    {
      label: "Validated direction",
      text: "I tested the iShare prototypes in scenario-based sessions — a first round run and a second prepared around comprehension, navigation and trust.",
      evidenceStatus: "Prototype",
    },
    {
      label: "Organisational movement",
      text: "I moved from outside the central design-system loop into its decisions, without a mandate to do so.",
      evidenceStatus: "Reported",
    },
  ],
  boundary:
    "All visuals are anonymised or recreated with fictional data. Exact build states, upstream acceptance, independent adoption, handoff acceptance and post-departure effects remain open; no quantified user or business impact is claimed. Organisational changes are context here, not outcomes I caused.",
  reflection: {
    repeat:
      "Start from each product’s real user question before translating legacy screens.",
    change: [
      "Secure a documented contribution path before creating a product-local fork.",
      "Decide which steps are deterministic before assigning them an agent — the token audit was a lint rule, not a role.",
    ],
    next: "Ship the Storybook that documents the custom components, the contract model and how to run the agent workflow — then confirm every artefact state and future owner before handoff.",
  },
};

export const trasisVisualStory: VisualStory = {
  title: "Making safety-critical quality control visible",
  statement:
    "On QC1, a misread state could waste material, invalidate a test or delay the release of a dose. I designed the interface end to end — every test module, the physical-assembly visualisation and the results system — and built the Angular front-end foundations with the engineering team. Pass and fail never depended on colour alone.",
  facts: [
    { label: "Role", value: "Product designer + front-end contributor" },
    { label: "Period", value: "2019–2021" },
    { label: "Team", value: "First designer in a small engineering team" },
    { label: "Product", value: "Radiopharmaceutical quality-control device" },
  ],
  heroMedia: {
    kind: "image",
    src: "/screenshots/trasis/trasis-qc1-homepage.png",
    alt: "QC1 device interface home screen from the archived project material",
    label: "QC1 home screen · archived material",
    caption:
      "The device entry point: available test modules, live state and the work waiting on the machine.",
    evidenceStatus: "Verified",
    state: "Shipped",
  },
  chapters: [
    {
      id: "configurations",
      number: "01",
      eyebrow: "System model",
      title: "One interface language across configurations",
      paragraphs: [
        "Different test modules share a stable layout and interaction grammar while preserving the technical parameters specialists need. Consistency reduces relearning; explicit labels keep the interface auditable.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-µgc--cfg.png",
          alt: "QC1 micro gas chromatography configuration screen",
          label: "µGC configuration",
          caption:
            "The configuration hierarchy and interaction grammar shared across modules.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-hplc--cfg.png",
          alt: "QC1 HPLC configuration screen",
          label: "HPLC configuration",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
      ],
    },
    {
      id: "physical-model",
      number: "02",
      eyebrow: "Mental model",
      title: "Translate the physical assembly",
      paragraphs: [
        "Technicians already understood the hardware. A <strong>faithful visual representation</strong> made channels, reagents, rotations and device state easier to map between screen and machine.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-real-parts-ui.png",
          alt: "QC1 interface showing realistic representations of physical device parts",
          label: "Hardware-to-interface mapping",
          caption:
            "A reusable vector system for valves, columns, injectors and tubes, matching the technicians’ physical mental model.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
      ],
      layout: "split",
      decision: {
        constraint:
          "Abstract icons were cheaper, but technicians reasoned about specific physical parts.",
        choice:
          "Represent the actual components as reusable vector illustrations and live process diagrams.",
        tradeOff:
          "More illustration and maintenance effort when hardware revisions changed components.",
      },
    },
    {
      id: "setup-flow",
      number: "03",
      eyebrow: "Workflow",
      title: "Guide setup without hiding complexity",
      paragraphs: [
        "Multi-step setup remained explicit: create or import the protocol, verify technical parameters, then connect it to the tracer workflow. Task-based prototypes exposed comprehension gaps before development.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-new-tap-creation-page.png",
          alt: "QC1 new test and protocol creation screen",
          label: "Create",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-tap-import.png",
          alt: "QC1 protocol import screen",
          label: "Import",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-tracer-creation.png",
          alt: "QC1 tracer creation workflow",
          label: "Connect",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
      ],
      decision: {
        constraint:
          "One designer, one budget and an entire device interface left little room for custom foundations from scratch.",
        choice:
          "Reuse mature UI foundations and customise only the domain-specific parts.",
        tradeOff:
          "Some genericity in standard controls bought more time for realistic prototype rounds.",
      },
    },
    {
      id: "status-results",
      number: "04",
      eyebrow: "Feedback",
      title: "Make status and results scannable",
      paragraphs: [
        "The dashboard surfaces schedules and live device state. Result screens combine graphs, tables, labels and visual references so meaning <strong>does not depend on colour alone</strong>.",
        "A pass or fail state was too consequential to encode in hue: pattern, text, contrast and position repeat the same information, so the reading survives a colour-vision deficiency or a poor screen.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-dashboard.png",
          alt: "QC1 dashboard with test schedules and component monitoring",
          label: "Device overview",
          caption:
            "Schedules, live device state and monitoring in one hierarchy.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-spots--results.png",
          alt: "QC1 test spots result screen",
          label: "Measured results",
          caption:
            "Text, contrast, patterns and indicators reinforce states that also use colour.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-appearance--results.png",
          alt: "QC1 colour and clarity results with visual references",
          label: "Reference comparison",
          caption:
            "The comparison interaction, with state cues repeated beyond colour.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
      ],
      evidenceLine:
        "Task-based sessions and twice-weekly domain-expert walkthroughs informed revisions before development.",
    },
    {
      id: "continuity",
      number: "05",
      eyebrow: "Delivery + handover",
      title: "Build for continuity",
      paragraphs: [
        "I contributed the Angular front-end foundations, ITCSS/BEM structure and an initial Storybook base. Before leaving, I coached the internal developer on the Figma prototypes, component reasoning and CSS methodology so continuity was <strong>part of the deliverable</strong>.",
      ],
      media: [],
      sequence: [
        {
          label: "Built",
          text: "Angular foundations and reusable device patterns.",
        },
        {
          label: "Documented",
          text: "A basic Storybook foundation before budget end.",
        },
        {
          label: "Transferred",
          text: "Figma, CSS methodology and reasoning through coaching.",
        },
      ],
    },
  ],
  outcomesTitle: "What the work established",
  outcomes: [
    {
      label: "Shipped interface",
      text: "I designed and, with the engineering team, shipped the QC1 interface connecting schedules, device state, setup and results.",
      evidenceStatus: "Verified",
    },
    {
      label: "Validated direction",
      text: "My realistic-scenario prototypes exposed comprehension gaps and changed flows before development.",
      evidenceStatus: "Reported",
    },
    {
      label: "Team practice",
      text: "Twice-weekly working prototypes turned scepticism into a regular review practice; the design role survived budget pressure.",
      evidenceStatus: "Reported",
    },
  ],
  boundary:
    "This case uses archived project screens. I no longer have product access, so it does not recreate live interaction, current performance, analytics or long-term adoption. Reported task-success figures are omitted because their source details were not preserved.",
  reflection: {
    repeat:
      "Use realistic visualisation when the user’s mental model is physical.",
    change: "Secure Storybook investment and validation documentation earlier.",
    next: "If new evidence becomes available, document tasks, participant counts, baselines and long-term ownership.",
  },
};

export const sopraVisualStory: VisualStory = {
  title: "Turning float-based CSS into conventions a team kept",
  statement:
    "A junior front-end team was shipping enterprise banking software on float layouts, unstructured CSS and a PDF style guide. I replaced the grid with a BEM-compliant Flexbox one written from scratch, restructured the components by real usage, and taught the convention through the defects the team was already fighting. They kept both after I left.",
  facts: [
    { label: "Role", value: "UI/UX designer + front-end architecture" },
    { label: "Period", value: "April – December 2018" },
    { label: "Team", value: "2 designers · 5 developers · tester · architect" },
    {
      label: "Context",
      value: "Core banking platforms for financial institutions",
    },
  ],
  heroMedia: {
    kind: "image",
    src: "/screenshots/sopra/sopra-login-page.png",
    alt: "Banking platform login screen built on the reworked design foundations",
    label: "Login screen · reworked foundations",
    caption:
      "The first screen users meet, and the first one built on the atomic component set.",
    evidenceStatus: "Verified",
    state: "Shipped",
  },
  chapters: [
    {
      id: "inherited-debt",
      number: "01",
      eyebrow: "Starting point",
      title: "Debt in the CSS, pictures in the style guide",
      paragraphs: [
        "Banking software outlives its authors. This platform’s front end was being built on float-based layouts and unstructured CSS, and the design side compounded it: components existed as <strong>pictures in a PDF</strong> rather than as a system anyone could build from.",
        "The leverage was not another redesign. It was changing how the team built UI — structure in the CSS, methodology in the components, and enough coaching that both would outlast my engagement.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/sopra/sopra-payment-creation.png",
          alt: "Payment creation screen in the banking platform",
          label: "Payment creation",
          caption:
            "Built on the reworked component set — the class of dense banking form the team had to keep delivering while the foundations changed underneath it.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
      ],
      layout: "split",
      decision: {
        constraint:
          "The team found BEM verbose and resisted it, while fighting CSS collisions and unpredictable overrides every day.",
        choice:
          "Teach the convention through their own defects, so every demonstration was a fix they needed anyway.",
        tradeOff:
          "Slower adoption than a mandate, and far more of my time spent pairing.",
      },
    },
    {
      id: "system-evidence",
      number: "02",
      eyebrow: "System evidence",
      title: "Own the grid, restructure by usage",
      paragraphs: [
        "The float grid generated hacks, but importing a framework would have brought unused weight and foreign conventions with it. I built a minimal Flexbox grid <strong>from scratch</strong>, BEM-compliant, so the naming in the markup matched the naming in the stylesheet.",
        "Components were restructured with atomic design in the order prototypes actually reused them. The set stayed mixed during the transition, and that was the acceptable price for not stopping delivery.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/sopra/sopra-eu-standing-order.png",
          alt: "European standing order setup flow in the banking platform",
          label: "Multi-step form",
          caption:
            "A standing-order flow laid out on the custom Flexbox grid; its form patterns exercised the atomic component set.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/sopra/sopra-account-hystory.png",
          alt: "Account history screen with dense transaction details",
          label: "Dense table pattern",
          caption:
            "Account history on the restructured table and filter components.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
      ],
      evidenceLine:
        "Both conventions were adopted during the engagement and, as I observed first-hand, kept afterwards. No defect, review-effort or delivery-speed baseline was recorded.",
      decision: {
        constraint:
          "Delivery could not pause for a full component rework, and a third-party framework would have replaced one set of unowned conventions with another.",
        choice:
          "A from-scratch Flexbox grid on BEM, plus progressive restructuring prioritised by real usage in prototypes.",
        tradeOff:
          "Owning the grid means maintaining it, and the component set was inconsistent while the transition ran.",
      },
    },
    {
      id: "design-system-proposal",
      number: "03",
      eyebrow: "Handover",
      title: "A proposal, deliberately unfinished",
      paragraphs: [
        "A PDF cannot hold components, states or code guidance. The reworked components were already the inventory for a web-based design system, so I documented the proposal on top of them: foundations, component library and usage guidance.",
        "Building it sat outside the engagement’s scope and I left before it could start. What survived is the architecture and the conventions — <strong>not the system</strong>.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/sopra/sopra-end-screen.png",
          alt: "Transaction confirmation screen with a clear completion state",
          label: "End-of-flow feedback",
          caption:
            "A confirmation pattern reused across flows rather than designed per screen.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
      ],
      layout: "split",
      sequence: [
        {
          label: "Taught",
          text: "BEM demonstrated on the team’s own defects.",
        },
        {
          label: "Adopted",
          text: "The convention and the new grid became the default.",
        },
        {
          label: "Proposed",
          text: "A web-based design system, documented but not delivered.",
        },
      ],
    },
  ],
  outcomesTitle: "What the team kept",
  outcomes: [
    {
      label: "Team practice",
      text: "The junior front-end team adopted BEM and the new grid by conviction rather than mandate, and kept both after I left.",
      evidenceStatus: "Reported",
    },
    {
      label: "Shipped foundation",
      text: "My BEM-compliant Flexbox grid replaced the float layouts, and I restructured strategic components in the order prototypes reused them.",
      evidenceStatus: "Verified",
    },
    {
      label: "Proposed direction",
      text: "I documented a web-based design system as the successor to the PDF style guide; the engagement ended before delivery could start.",
      evidenceStatus: "Planned",
    },
  ],
  boundary:
    "The screens are shipped work from a 2018 engagement and I no longer have access to the codebase. No before/after baseline was recorded for defects, delivery speed or CSS maintenance. The design team reported faster prototyping from component reuse, but the figures cited at the time had no documented baseline, so they are not published here; adoption after my departure is first-hand report rather than measurement.",
  reflection: {
    repeat:
      "Teach architecture through the team’s own defects — the verbosity objection dissolves once the convention fixes pain they already feel.",
    change:
      "Raise the design-system proposal early enough that delivery could start before the engagement ended.",
    next: "A repeat of this work would agree the defect, review-effort and prototyping baselines before the first convention landed, so adoption could be evidenced instead of reported.",
  },
};

export const baseVisualStory: VisualStory = {
  title: "Front-end foundations for high-traffic telecom sites",
  statement:
    "I built the front-end foundations for Base and JIM Mobile: components that survived any combination content authors assembled in Adobe Experience Manager, a Flexbox grid with engineered fallbacks for a browser matrix that still included legacy Internet Explorer, and the npm tooling that took the Java compile cycle out of front-end iteration.",
  facts: [
    {
      label: "Role",
      value: "UI developer · components and front-end foundations",
    },
    { label: "Period", value: "2016 – 2018 · at Design is Dead/Emakina" },
    {
      label: "Team",
      value: "2 UI developers inside an embedded delivery team",
    },
    {
      label: "Context",
      value: "High-traffic telecom sites authored in Adobe Experience Manager",
    },
  ],
  heroMedia: {
    kind: "image",
    src: "/screenshots/base/base-custom-layout.png",
    alt: "Custom list and picture container components built for the Base website",
    label: "Authorable components",
    caption:
      "Lists and picture containers that content editors could assemble into any page.",
    myPart: "Built the components and their cross-browser behaviour.",
    evidenceStatus: "Verified",
    state: "Shipped",
  },
  chapters: [
    {
      id: "authorable-components",
      number: "01",
      eyebrow: "The constraint",
      title: "Robust in any combination an editor invents",
      paragraphs: [
        "Editors assembled pages from blocks in AEM, in orders nobody had designed for, on sites carrying serious traffic. A component that only worked in its intended context was <strong>a defect waiting to be authored</strong>.",
        "This was also my first senior, systematic team. It introduced me to BEM and to Scrum practised properly, and it is where “designer who codes” hardened into an engineering discipline.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/base/base-interactive-dynamic-settings.png",
          alt: "Canvas-based animated header with custom subscription plan sliders",
          label: "Interactive components",
          caption:
            "A canvas-based animated header and subscription sliders, responsive and authorable.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
      ],
      layout: "split",
    },
    {
      id: "flexbox-grid",
      number: "02",
      eyebrow: "Foundations",
      title: "A Flexbox grid before Flexbox was safe",
      paragraphs: [
        "Float grids were the safe default and they generated hacks. Flexbox was the right model but had gaps in the required support matrix, old Internet Explorer included, so I built a minimal BEM-compliant Flexbox grid from scratch and <strong>engineered fallbacks</strong> where support failed.",
        "The same conventions carried across both brands: a slider built for Base could be re-themed for JIM Mobile instead of rebuilt.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/base/base-icustom-slider-component-example.png",
          alt: "JIM Mobile custom slider component",
          label: "One component, two brands",
          caption:
            "The JIM Mobile slider: the same modular component, re-themed rather than rebuilt.",
          myPart: "Built it as a reusable, brand-themable component.",
          evidenceStatus: "Verified",
          state: "Shipped",
        },
      ],
      layout: "split",
      decision: {
        constraint:
          "The supported browser matrix still included legacy Internet Explorer, where Flexbox failed.",
        choice:
          "A from-scratch Flexbox grid on BEM, with engineered fallbacks for the weak browsers.",
        tradeOff:
          "Fallback work for a shrinking browser population, and a grid the team now owned and maintained.",
      },
    },
    {
      id: "tooling",
      number: "03",
      eyebrow: "Developer experience",
      title: "Take the compile cycle out of the loop",
      paragraphs: [
        "Every front-end change went through the full Java/AEM build, pure CSS tweaks included: minutes lost per change, dozens of changes a day, multiplied across the front-end work.",
        "I researched and wired npm scripts that reloaded front-end changes straight into the browser, running alongside the official build. The team adopted them, and iteration <strong>stopped waiting on compilation</strong>.",
      ],
      media: [],
      sequence: [
        {
          label: "Before",
          text: "Every CSS change waited on a full Java/AEM compile.",
        },
        {
          label: "Change",
          text: "npm scripts reloaded front-end changes in the browser.",
        },
        {
          label: "After",
          text: "The parallel tool layer became the team’s daily workflow.",
        },
      ],
    },
  ],
  outcomesTitle: "What the work established",
  outcomes: [
    {
      label: "Shipped components",
      text: "I shipped lists, containers, sliders and a canvas-based animated header across the Base and JIM Mobile properties, robust in any editor-assembled combination.",
      evidenceStatus: "Verified",
    },
    {
      label: "Team workflow",
      text: "My npm auto-reload scripts took the compile cycle out of front-end iteration, and the embedded team adopted them alongside the official build.",
      evidenceStatus: "Reported",
    },
    {
      label: "Durable pattern",
      text: "The Flexbox/BEM grid and its fallbacks outlived the engagement and seeded the grid work at Sopra Banking.",
      evidenceStatus: "Reported",
    },
  ],
  boundary:
    "I was one of two UI developers in an embedded team: the UX designer owned the designs and the full team owned delivery. The screenshots are archived project material from 2016–2018, and no traffic, performance or defect baseline from the engagement is available.",
  reflection: {
    repeat:
      "Invest in the team’s tooling, not only its output — developer experience compounds every day.",
    change:
      "Push the component documentation further; too many conventions lived in people’s heads.",
    next: "Repeated today, the grid, its fallbacks and the component conventions would ship as a documented package rather than as habits the team carried forward.",
  },
};
