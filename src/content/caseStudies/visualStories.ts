import { DeliveryState } from "../types";

export interface VisualStoryFact {
  label: string;
  value: string;
}

/**
 * Interactive demos that run in the page. Every id here must have an entry in
 * the registry at src/ui/components/demos/registry.ts.
 */
export type VisualDemoId = "bridgestone-token-pipeline";

/** Responsive diagrams resolved by the story diagram registry. */
export type VisualDiagramId =
  | "solidaris-agent-delegation"
  | "solidaris-operating-model"
  | "solidaris-token-architecture"
  | "solidaris-contracts-index"
  | "solidaris-handoff"
  | "bridgestone-reverse-diamonds";

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
}

export interface VisualStoryDiagram {
  kind: "diagram";
  diagramId: VisualDiagramId;
  label?: string;
  caption?: string;
  myPart?: string;
  state?: DeliveryState;
}

export type VisualStoryMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      label?: string;
      caption?: string;
      myPart?: string;
      state?: DeliveryState;
    }
  | VisualStoryDiagram
  | {
      kind: "video";
      src: string;
      /** Poster frame shown before play; also used if the clip fails to load. */
      poster: string;
      alt: string;
      /** False for optional demos that should play only when requested. */
      playOnScroll?: boolean;
      /** Preserve a narrow editor capture at its native reading width. */
      orientation?: "portrait";
      /** Short text account of what the clip shows, available without playback. */
      steps?: string[];
      label?: string;
      caption?: string;
      myPart?: string;
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
  tocLabel?: string;
  /** Previous deep links that should land on this consolidated chapter. */
  legacyAnchors?: string[];
  evidenceLine?: string;
  sources?: { label: string; href: string }[];
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
}

export interface VisualStory {
  title: string;
  statement: string;
  /** Four-line summary under the statement: problem, what I built, scale, result. */
  glance: VisualStoryFact[];
  facts: VisualStoryFact[];
  /** Anchors rendered under the facts strip, pointing at the evidence worth seeing first. */
  jumpTo?: { label: string; href: string }[];
  heroMedia: VisualStoryMedia;
  chapters: VisualStoryChapter[];
  outcomesTitle: string;
  outcomes: VisualStoryOutcome[];
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
    "I built the design system for FleetBridge, Bridgestone’s fleet and tyre operations platform, from inside feature delivery. There was no UI library, the team built every component itself, and my requests for dedicated resources were declined. So I shipped the foundation piece by piece until the difference showed in the product, and the investment followed.",
  glance: [
    { label: "Problem", value: "No UI library, no design-system mandate, and every request for dedicated resources declined." },
    { label: "What I built", value: "The FleetBridge design system, from inside feature delivery: 40+ components, production CSS as the single source and Storybook documentation generated from it." },
    { label: "Scale", value: "15+ developers on a fleet platform used across several European countries; design grew from one to three designers." },
    { label: "Result", value: "Stakeholders funded design-system work once shared patterns shipped, and the team estimated ~60% faster UI feature delivery." },
  ],
  facts: [
    { label: "Role", value: "Design-system lead · product designer · UX engineer" },
    { label: "Period", value: "2019 – 2025" },
    { label: "Scale", value: "15+ developers · 40+ components · 1 → 3 designers" },
    { label: "Stack", value: "Angular · SCSS (ITCSS/BEMIT) · Storybook · Figma" },
  ],
  jumpTo: [
    { label: "How the mandate was won", href: "#make-value-visible" },
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
      "Vehicle layout, per-position tyre state and the inspection form on one surface. This component is where the argument for a system was won.",
    myPart:
      "Designed the workflow and its composite patterns, then worked with developers to integrate them into the shared UI foundation.",
    state: "In production",
  },
  chapters: [
    {
      id: "make-value-visible",
      legacyAnchors: ["delivery-constraint"],
      tocLabel: "Winning the mandate",
      number: "01",
      eyebrow: "Influence without authority",
      title: "No mandate, so let the product argue",
      paragraphs: [
        "For the new back office nothing had been decided: no UI library, no theme, no foundation, and nobody had asked for a design system. I started from the Ant Design kit in Figma and extended it with FleetBridge components. The team chose to build every component in code <strong>from scratch</strong>, which kept behaviour, accessibility and theming under our control, and made a shared foundation unavoidable.",
        "I asked for dedicated resources to build it and was turned down every time: the feature backlog came first. So I built what I could inside delivery, and named the cause each time the same defects and inconsistencies came back in demos and retrospectives. The developers were not short of effort, they were <strong>short of tools</strong>: stories estimated at three or five points ran into a second sprint because every screen re-decided the same questions.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/bs/bs_desktop_storybook-home.png",
          alt: "Bridgestone UI design system home in Storybook, with foundations, components, colours and icons documented",
          label: "Where it landed",
          caption:
            "The Storybook that stakeholders funded once shared patterns had shipped.",
          state: "In production",
        },
      ],
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
          text: "Design-system work was funded.",
        },
      ],
      decision: {
        constraint:
          "The backlog was the priority, and arguing the case in meetings had already failed.",
        choice:
          "Build the foundation inside feature delivery, and name the cause each time a gap showed up in a demo.",
        tradeOff:
          "The system grew in product-priority order rather than by architecture.",
      },
    },
    {
      id: "earlier-collaboration",
      tocLabel: "From review to coaching",
      number: "02",
      eyebrow: "Operating model",
      title: "Turn a review gate into coaching",
      paragraphs: [
        "We agreed that any pull request touching UI would wait for my approval. Some came back with twenty-odd comments: spacing, missing states, interaction details, CSS that would not survive the next screen. The gate worked, but it slowed the team and concentrated the friction on one person.",
        "The slowdown changed behaviour more than the corrections did. Developers began coming to me <strong>during implementation</strong> rather than at review. I kept the gate temporary and moved the effort into pairing, coaching and written guidance, so the same corrections stopped coming back.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/bs/bs_example of the anatomy section for Tags in Figma.png",
          alt: "Figma documentation page showing the anatomy of the FleetBridge tag component",
          label: "Component anatomy",
          caption:
            "Naming the parts of a component made review comments teachable instead of repetitive.",
        },
        {
          kind: "image",
          src: "/screenshots/bs/bs_example of the best practices section for Tags in Figma.png",
          alt: "Figma documentation page listing do and do-not usage rules for the FleetBridge tag component",
          label: "Reusable guidance",
          caption:
            "Written usage rules a developer could read before opening a pull request.",
        },
      ],
      evidenceLine:
        "The practice spread beyond the front-end team: back-end developers began raising UI and pattern issues in review before I reached the change.",
      decision: {
        constraint:
          "Letting UI defects merge was costly, but one designer approving every UI change could not scale.",
        choice:
          "Use the gate as a temporary diagnostic and spend the time it bought on patterns, documentation and utilities.",
        tradeOff:
          "Velocity dropped while the tooling caught up.",
      },
    },
    {
      id: "product-patterns",
      tocLabel: "Product patterns",
      number: "03",
      eyebrow: "Product craft",
      title: "Standardise the recurring decision, not every screen",
      paragraphs: [
        "Dense tables, forms, status patterns and vehicle workflows became shared only when their behaviour genuinely repeated. Product-specific decisions stayed local, where a generic abstraction would have slowed expert work.",
        "The hard components settled the argument: a date picker every screen had been reinventing, and the service worksheet, with vehicle layout, axles, per-position tyre state and the inspection form on one surface. I also designed the web back office that progressively replaced FleetBridge mobile, built from the same patterns.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/bs/bs_desktop_vehicle-list-light.png",
          alt: "FleetBridge vehicle list in its light theme",
          label: "Dense list pattern",
          state: "In production",
        },
        {
          kind: "image",
          src: "/screenshots/bs/bs_desktop_ws-dark.png",
          alt: "FleetBridge production worksheet in its dark theme",
          label: "Vehicle configuration",
          caption:
            "Axles, positions and per-tyre state, composed from the same table, form and status patterns.",
          state: "In production",
        },
        {
          kind: "image",
          src: "/screenshots/bs/bs_tablet_ws-light.png",
          alt: "FleetBridge worksheet adapted to a tablet working surface",
          label: "Responsive behaviour",
          caption:
            "The same worksheet on a tablet, the surface the workshop floor works from.",
          state: "In production",
        },
      ],
      decision: {
        constraint:
          "Dense operational workflows risked becoming unrelated one-off implementations.",
        choice:
          "Standardise behaviour only where it genuinely repeated; keep workflow-specific decisions local.",
        tradeOff:
          "The system grew unevenly, but avoided abstractions that would slow expert work.",
      },
    },
    {
      id: "shared-source",
      tocLabel: "CSS as the source",
      number: "04",
      eyebrow: "System + code",
      title: "Make shipped CSS the single source",
      paragraphs: [
        "I designed the style foundation on eight ITCSS layers with BEMIT naming, so every rule had a predictable place and name, and a colour system built from 15 base hues for two themes.",
        "Most Storybook setups re-declare every token as documentation constants: a second copy to keep in step with the CSS. Here the foundation pages <strong>read the live CSS</strong> instead, so changing a value in shipped code meant the documentation was already correct. The token names became the contract between code and docs.",
      ],
      media: [
        {
          kind: "video",
          src: "/videos/token-pipeline.mp4",
          poster: "/videos/token-pipeline-poster.jpg",
          alt: "Screen recording: a token added to the semantic palette SCSS, saved, and the Storybook Semantic Palette page documenting the new token-pipeline group after the rebuild",
          label: "The pipeline, recorded",
          caption:
            "One token added to the CSS and saved. After the rebuild, Storybook documents it on its own; no documentation file was touched.",
        },
        { kind: "live-demo", demoId: "bridgestone-token-pipeline" },
        { kind: "system-evidence", sourceIndex: 1 },
      ],
      decision: {
        constraint:
          "Values repeated across product CSS, Storybook constants and documentation could diverge.",
        choice:
          "Keep definitions in shipped CSS and let Storybook read them from the browser.",
        tradeOff:
          "The naming grammar became an API, and the parsers had to be maintained.",
      },
    },
    {
      id: "shared-capability",
      tocLabel: "Scaling the team",
      number: "05",
      eyebrow: "Team & adoption",
      title: "Make the rules explicit as the team grows",
      paragraphs: [
        "Design grew from one to three designers and delivery spread across sites. The informal agreements I had relied on stopped being enough, so I made the process explicit: onboarding through Storybook, written contribution guidance, and Figma branch review so every proposed change was visible before it reached delivery.",
        "The goal was not to keep approval with me but to make the reasoning <strong>inspectable by more people</strong>. By the time I left, more than 15 developers were building with the system.",
      ],
      media: [
        {
          kind: "image",
          src: "/screenshots/bs/bs_storybook tag anatomy.png",
          alt: "Storybook documentation explaining the anatomy of a FleetBridge tag component",
          label: "Component anatomy",
          caption: "Production-backed Storybook guidance.",
        },
        {
          kind: "image",
          src: "/screenshots/bs/bs_storybook tag best practices.png",
          alt: "Storybook documentation explaining best practices for the FleetBridge tag component",
          label: "Usage guidance",
          caption: "Shared rules made review less dependent on memory.",
        },
      ],
    },
  ],
  outcomesTitle: "What changed",
  outcomes: [
    {
      label: "A mandate won by the product",
      text: "Stakeholders who had declined every request funded dedicated design-system work once shared patterns shipped.",
    },
    {
      label: "Faster, cleaner delivery",
      text: "Adopted by 15+ developers; the team estimated ~60% faster UI feature delivery, with fewer recurring UI defects.",
    },
    {
      label: "A team and a practice",
      text: "Design grew from one to three designers, with onboarding, written guidance and branch review replacing approval by memory.",
    },
  ],
  reflection: {
    repeat:
      "Diagnose recurring quality problems as a system gap rather than an individual failure.",
    change: [
      "Negotiate mandate, ownership and measurement into the initial backlog.",
      "Record a defect and estimation baseline early, so the case rests on data rather than memory.",
    ],
    next: "Measure one shared pattern end to end: adoption, review effort and defects, before and after.",
  },
};

export { solidarisVisualStory } from './solidarisStory';

export const trasisVisualStory: VisualStory = {
  title: "Making safety-critical quality control visible",
  statement:
    "On QC1, a misread state could waste material, invalidate a test or delay the release of a dose. I designed the interface end to end — every test module, the physical-assembly visualisation and the results system — and built the Angular front-end foundations with the engineering team. Pass and fail never depended on colour alone.",
  glance: [
    { label: "Problem", value: "On a radiopharmaceutical quality-control device, a misread state could waste material, invalidate a test or delay a dose." },
    { label: "What I built", value: "The whole QC1 interface: test modules, a device-realistic visualisation system and the results system, plus the Angular front-end foundations." },
    { label: "Validation", value: "Task-based prototype sessions with laboratory users (85% task success) and twice-weekly walkthroughs with domain experts." },
    { label: "Result", value: "The interface shipped, and I handed the front-end foundations to the internal developer I coached." },
  ],
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
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-hplc--cfg.png",
          alt: "QC1 HPLC configuration screen",
          label: "HPLC configuration",
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
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-tap-import.png",
          alt: "QC1 protocol import screen",
          label: "Import",
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-tracer-creation.png",
          alt: "QC1 tracer creation workflow",
          label: "Connect",
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
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-spots--results.png",
          alt: "QC1 test spots result screen",
          label: "Measured results",
          caption:
            "Text, contrast, patterns and indicators reinforce states that also use colour.",
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/trasis/trasis-qc1-appearance--results.png",
          alt: "QC1 colour and clarity results with visual references",
          label: "Reference comparison",
          caption:
            "The comparison interaction, with state cues repeated beyond colour.",
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
    },
    {
      label: "Validated direction",
      text: "My realistic-scenario prototypes exposed comprehension gaps and changed flows before development.",
    },
    {
      label: "Team practice",
      text: "Twice-weekly working prototypes turned scepticism into a regular review practice; the design role survived budget pressure.",
    },
  ],
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
  glance: [
    { label: "Problem", value: "A junior team was shipping banking software on float layouts, unstructured CSS and a PDF style guide." },
    { label: "What I built", value: "A BEM-compliant Flexbox grid written from scratch, and atomic components restructured by real usage." },
    { label: "Team", value: "2 designers and 5 developers, coached through the defects they were already fighting." },
    { label: "Result", value: "The team adopted both conventions by conviction and kept them after I left." },
  ],
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
          state: "Shipped",
        },
        {
          kind: "image",
          src: "/screenshots/sopra/sopra-account-hystory.png",
          alt: "Account history screen with dense transaction details",
          label: "Dense table pattern",
          caption:
            "Account history on the restructured table and filter components.",
          state: "Shipped",
        },
      ],
      evidenceLine:
        "Both conventions were adopted during the engagement and kept afterwards.",
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
    },
    {
      label: "Shipped foundation",
      text: "My BEM-compliant Flexbox grid replaced the float layouts, and I restructured strategic components in the order prototypes reused them.",
    },
    {
      label: "Proposed direction",
      text: "I documented a web-based design system as the successor to the PDF style guide; the engagement ended before delivery could start.",
    },
  ],
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
  glance: [
    { label: "Problem", value: "Telecom sites where authors could assemble components in any combination, on a browser matrix that still included legacy Internet Explorer." },
    { label: "What I built", value: "Robust AEM components, a Flexbox grid with engineered fallbacks, and npm tooling that removed the Java compile cycle from front-end work." },
    { label: "Scope", value: "Base and JIM Mobile, high-traffic telecom properties." },
    { label: "Result", value: "The components shipped across both properties, and the team adopted the tooling alongside the official build." },
  ],
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
    },
    {
      label: "Team workflow",
      text: "My npm auto-reload scripts took the compile cycle out of front-end iteration, and the embedded team adopted them alongside the official build.",
    },
    {
      label: "Durable pattern",
      text: "The Flexbox/BEM grid and its fallbacks outlived the engagement and seeded the grid work at Sopra Banking.",
    },
  ],
  reflection: {
    repeat:
      "Invest in the team’s tooling, not only its output — developer experience compounds every day.",
    change:
      "Push the component documentation further; too many conventions lived in people’s heads.",
    next: "Repeated today, the grid, its fallbacks and the component conventions would ship as a documented package rather than as habits the team carried forward.",
  },
};
