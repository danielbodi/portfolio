import { Artefact } from "./types";

/**
 * Site-wide content: positioning, homepage sections, career progression,
 * contact. Copy follows the transformation brief (sections 3, 6, 14, 15).
 */

export const positioning = {
  name: "Daniel Bodi Gil",
  /** Discipline framing — no level word; scope is carried by the case evidence. */
  descriptor: "Product Design · Design Systems · UX Engineering",
  seoTitle: "Daniel Bodi Gil — Product Design, Design Systems & UX Engineering",
  seoDescription:
    "Portfolio of Daniel Bodi Gil, a product designer and UX engineer specialising in complex enterprise products, design systems, Figma, Storybook and front-end UI architecture.",
};

export const hero = {
  eyebrow: "Product design at systems scale",
  title:
    "I design the systems behind complex products and build what teams ship them with.",
  support:
    "I turn complex workflows into clear product experiences, reusable design foundations and implementation-ready UI across Figma, Storybook and front-end systems.",
  ctaTalk: { label: "Let's talk" },
  ctaSecondary: {
    label: "Download CV",
    href: "/cv/daniel-bodi-gil-cv.pdf",
    download: "daniel-bodi-gil-cv.pdf",
  },
  contextLink: {
    label: "Solidaris · assignment ongoing · handoff planned for October 2026",
    href: "/work/solidaris",
  },
  proof: {
    href: "/work/solidaris",
    image: {
      src: "/screenshots/solidaris/ishare-affiliate-dossier.png",
      alt: "Anonymised iShare affiliate dossier prototype with a member summary, document list and workflow journey",
    },
    eyebrow: "Solidaris · ongoing product output",
    caption:
      "A dossier concept bringing affiliate context, documents, status and workflow into one reading surface.",
    evidenceClass: "OUTPUT" as const,
    state: "Ongoing" as const,
  },
};

/**
 * Optional technical specimen: production UI plus an experimental contract
 * and workflow layer. The maturity of each part is stated in the caption.
 */
export const heroSpecimen = {
  href: "/work/bridgestone",
  chrome: "Bridgestone UI \u00b7 Storybook",
  image: {
    src: "/screenshots/bs/bs_desktop_storybook-home.png",
    alt: "Bridgestone UI design system home in Storybook: foundations, components, colours and icons documented from the live CSS",
  },
  caption:
    "Bridgestone UI in production Storybook. Overlay: Solidaris contract and workflow outputs that remain experimental and are not presented as adopted.",
  state: "In production" as const,
  contract: {
    kicker: "Component contract",
    file: "journey.metadata.ts",
    schema: "ComponentMetadata",
    fields: [
      {
        key: "component",
        value:
          "name: 'Journey'  bemBlock: 'c-journey'  itcssLayer: '06-components'",
      },
      {
        key: "usage",
        value: "antiPatterns \u2192 a linear stepper for a single-step form",
      },
      {
        key: "accessibility",
        value: "wcagLevel: 'AA'",
      },
      {
        key: "tokens",
        value: "--pds-color-brand  --pds-color-text  --pds-color-text-muted",
      },
      {
        key: "aiHints",
        value: "keywords: ['workflow', 'journey', 'status']",
      },
    ],
  },
  supervisor: {
    kicker: "Workflow experiment",
    name: "Solidaris",
    role: "Proposed orchestration role",
    rule: "A documented role model for design-to-code work; independent use is not yet claimed.",
    grounding: "Figma MCP \u00b7 PrimeNG MCP",
    steps: [
      {
        id: "research",
        parallel: true,
        roles: [
          { name: "UX Researcher", hint: "Figma MCP" },
          { name: "Architect", hint: "SSOT / ITCSS" },
        ],
      },
      {
        id: "engineer",
        parallel: false,
        roles: [{ name: "UX Engineer", hint: "authors tokens \u00b7 SCSS" }],
      },
      {
        id: "implement",
        parallel: false,
        roles: [{ name: "Frontend Dev", hint: "writes Angular \u00b7 ARIA" }],
      },
      {
        id: "qa",
        parallel: true,
        roles: [
          { name: "Tester", hint: "WCAG AA" },
          { name: "Token Auditor", hint: "Figma drift" },
        ],
      },
    ],
  },
};

export interface PositioningPillar {
  id: string;
  heading: string;
  supportingLine: string;
}

export const positioningPillars: PositioningPillar[] = [
  {
    id: "product-direction",
    heading: "Complex product direction",
    supportingLine:
      "Healthcare, mobility, banking and high-consequence workflows.",
  },
  {
    id: "shared-foundations",
    heading: "Reusable UI foundations",
    supportingLine:
      "Product patterns, Storybook and front-end architecture grounded in delivery.",
  },
  {
    id: "production-fluency",
    heading: "Design-to-production fluency",
    supportingLine: "Figma through Angular, TypeScript and CSS.",
  },
];

export interface Capability {
  id: string;
  title: string;
  text: string;
  links: { label: string; href: string }[];
}

export const capabilities: Capability[] = [
  {
    id: "product-direction",
    title: "Product direction",
    text: "I frame complex workflows around the decisions users need to make, then turn that direction into prototypes that can be tested and refined.",
    links: [
      {
        label: "Solidaris — product tension",
        href: "/work/solidaris#fragmented-tools",
      },
      {
        label: "Trasis — physical mental model",
        href: "/work/trasis#physical-model",
      },
    ],
  },
  {
    id: "systems",
    title: "Systems",
    text: "I turn recurring product decisions into reusable foundations, patterns and documentation, with inherited and product-local layers made explicit.",
    links: [
      {
        label: "Bridgestone — the token pipeline, live in the page",
        href: "/work/bridgestone#demo-bridgestone-token-pipeline",
      },
      {
        label: "Solidaris — inherited foundations and product-local outputs",
        href: "/work/solidaris#shared-contribution",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    text: "I work close to implementation through Storybook, front-end architecture, pull-request review and hands-on coaching.",
    links: [
      {
        label: "Bridgestone — PR reviews and coaching",
        href: "/work/bridgestone#earlier-collaboration",
      },
      {
        label: "Sopra Banking — CSS architecture",
        href: "/work/sopra-banking#system-evidence",
      },
    ],
  },
];

/** Compact artefact gallery for the homepage. Every item carries a delivery state. */
export const homeArtefacts: Artefact[] = [
  {
    src: "/screenshots/bs/bs_desktop_storybook-home.png",
    alt: "Bridgestone design system documentation home in Storybook",
    what: "Selected Storybook foundation pages populated from production CSS.",
    why: "CSS custom properties feed documented values and interactive examples, reducing duplicate maintenance.",
    contribution: "Built the CSS-to-Storybook pipeline.",
    state: "In production",
    href: "/work/bridgestone#shared-source",
    caseLabel: "Bridgestone",
  },
  {
    src: "/screenshots/solidaris/token-architecture.svg",
    alt: "Three-tier design token architecture with a PrimeNG bridge",
    what: "A proposed token-governance model linking Figma, semantic tokens and PrimeNG.",
    why: "Documents how product work could stay aligned with an inherited component foundation.",
    contribution: "Defined and documented the mapping approach.",
    evidenceClass: "OUTPUT",
    evidenceNote:
      "The exact implemented token inventory and synchronisation state are still being verified.",
    state: "Ongoing",
    href: "/work/solidaris#shared-contribution",
    caseLabel: "Solidaris",
  },
  {
    src: "/screenshots/bs/bs_desktop_ws-light.png",
    alt: "Bridgestone vehicle worksheet interface, light theme",
    what: "A FleetBridge worksheet built from reusable table, form, status and action patterns.",
    why: "Shows shared product decisions inside a dense operational workflow.",
    contribution:
      "Designed the workflow and the reusable patterns it exercises.",
    state: "In production",
    href: "/work/bridgestone#product-patterns",
    caseLabel: "Bridgestone",
  },
  {
    src: "/screenshots/trasis/trasis-qc1-spots--results.png",
    alt: "Trasis QC1 quality-control test results screen",
    what: "Quality-control results for a radiopharmaceutical device.",
    why: "Presents precise measurements and pass/fail states in one results view.",
    contribution: "Designed the data presentation and state system.",
    state: "Shipped",
    href: "/work/trasis#status-results",
    caseLabel: "Trasis",
  },
  {
    src: "/screenshots/solidaris/ishare-journey.png",
    alt: "iShare journey panel: horizontal step summary with statuses above the expanded step detail, in the coded mockup",
    what: "Hybrid workflow journey explored in an iShare prototype.",
    why: "Combines a compact overview with expandable step detail.",
    contribution: "Designed both models and prepared task-based comparison.",
    evidenceClass: "OUTPUT",
    evidenceNote:
      "Participant counts, scores and final delivery state are not published.",
    state: "Tested concept",
    href: "/work/solidaris#ishare",
    caseLabel: "Solidaris",
  },
  {
    src: "/screenshots/bs/bs_desktop_vehicle-list-light.png",
    alt: "FleetBridge vehicle list using shared table, filter and status patterns",
    what: "A FleetBridge vehicle list using shared table, filter and status patterns.",
    why: "The same product decisions appear across operational contexts instead of one-off screens.",
    contribution:
      "Translated recurring list and status decisions into documented patterns.",
    state: "In production",
    href: "/work/bridgestone#product-patterns",
    caseLabel: "Bridgestone",
  },
  {
    src: "/screenshots/solidaris/ishare-affiliate-dossier.png",
    alt: "Anonymised iShare affiliate dossier prototype with affiliate context, document tracking and a workflow journey",
    what: "One reading surface for affiliate context, documents, status and the active workflow step.",
    why: "Anonymised prototype used in scenario-based tests; fictional affiliate data.",
    contribution:
      "Designed the dossier model, information hierarchy and journey treatment, and tested them.",
    evidenceClass: "OUTPUT",
    evidenceNote:
      "Participant counts, scores and final delivery state are not published.",
    state: "Tested concept",
    href: "/work/solidaris#ishare",
    caseLabel: "Solidaris",
  },
  {
    src: "/screenshots/trasis/trasis-qc1-homepage.png",
    alt: "QC1 device interface home screen from the archived project material",
    what: "The device entry point: available test modules, live state and the work waiting on the machine.",
    contribution: "Designed the device overview and module entry point.",
    state: "Shipped",
    href: "/work/trasis",
    caseLabel: "Trasis",
  },
  {
    src: "/screenshots/bs/bs_desktop_storybook-tag.png",
    alt: "Storybook documentation explaining the anatomy of a FleetBridge tag component",
    what: "Production-backed Storybook guidance for a FleetBridge tag component.",
    why: "Shared rules made review less dependent on memory.",
    contribution:
      "Documented component anatomy in Storybook for onboarding and review.",
    state: "In production",
    href: "/work/bridgestone#shared-capability",
    caseLabel: "Bridgestone",
  },
  {
    src: "/screenshots/solidaris/icrm-inbox.png",
    alt: "Anonymised iCRM inbox concept with a dense master list beside a selected request",
    what: "A work-oriented inbox: subject first, recent activity second, status and alerts before the detail opens.",
    contribution:
      "Designed the dense master-list pattern and information hierarchy.",
    evidenceClass: "OUTPUT",
    evidenceNote: "Implementation and user outcome are not claimed.",
    state: "Concept",
    href: "/work/solidaris#icrm",
    caseLabel: "Solidaris",
  },
  {
    src: "/screenshots/trasis/trasis-qc1-real-parts-ui.png",
    alt: "QC1 interface showing realistic representations of physical device parts",
    what: "A reusable vector system for valves, columns, injectors and tubes, matching the technicians’ physical mental model.",
    contribution: "Designed the hardware-to-interface mapping.",
    state: "Shipped",
    href: "/work/trasis#physical-model",
    caseLabel: "Trasis",
  },
  {
    src: "/screenshots/solidaris/iged-draft.png",
    alt: "First iGED interface draft with a dense document list",
    what: "The first iGED draft applying status, filtering and dense-list principles to document processing.",
    contribution:
      "Designed the first draft; the wider iGED programme has its own owners.",
    evidenceClass: "OUTPUT",
    state: "Ongoing",
    href: "/work/solidaris#iged",
    caseLabel: "Solidaris",
  },
  {
    src: "/screenshots/trasis/trasis-qc1-dashboard.png",
    alt: "QC1 dashboard with test schedules and component monitoring",
    what: "Schedules, live device state and monitoring in one hierarchy.",
    contribution: "Designed the device overview hierarchy.",
    state: "Shipped",
    href: "/work/trasis#status-results",
    caseLabel: "Trasis",
  },
  {
    src: "/screenshots/solidaris/icrm-timeline.png",
    alt: "iCRM chronological history concept beside a selected request detail",
    what: "Chronology as complementary context beside a selected request, built around expert scanning speed.",
    contribution: "Designed the inbox and history relationship.",
    evidenceClass: "OUTPUT",
    evidenceNote: "Implementation and user outcome are not claimed.",
    state: "Concept",
    href: "/work/solidaris#icrm",
    caseLabel: "Solidaris",
  },
];

export interface CareerStep {
  heading: string;
  company: string;
  period: string;
  scope: string;
  contributions: string[];
  href?: string;
}

export const careerProgression: CareerStep[] = [
  {
    heading: "Product design and systems contribution",
    company: "Solidaris · via Cegeka",
    period: "Oct 2025 – Oct 2026",
    scope:
      "Embedded consultancy across ongoing healthcare product work, working within inherited PrimeNG/Plectrum foundations and preparing a bounded handoff.",
    contributions: [
      "Research and prototypes for complex case-management workflows",
      "Product-local Figma, repository and Storybook outputs with their delivery state made explicit",
    ],
    href: "/work/solidaris",
  },
  {
    heading: "Product design, UI foundations and UX engineering",
    company: "Bridgestone · via CTG/Cegeka",
    period: "2019 – 2025",
    scope:
      "Built product patterns and system foundations inside a distributed FleetBridge team, initially without a design-system mandate.",
    contributions: [
      "Reusable foundations, Storybook and CSS utilities grounded in live product work",
      "Earlier collaboration, onboarding and Figma branch review after late UI review became a bottleneck",
    ],
    href: "/work/bridgestone",
  },
  {
    heading: "Safety-critical product design",
    company: "Trasis · via CTG",
    period: "2019 – 2021",
    scope: "Interface for a radiopharmaceutical quality-control device.",
    contributions: [
      "Device-realistic visualisation system and test workflows",
      "Task-based validation with laboratory users",
    ],
    href: "/work/trasis",
  },
  {
    heading: "Front-end architecture and team enablement",
    company: "Sopra Banking Software",
    period: "2018",
    scope: "Design reinforcement for enterprise banking software.",
    contributions: [
      "BEM methodology and a custom Flexbox grid replacing float layouts",
      "Atomic components and hands-on developer coaching",
    ],
    href: "/work/sopra-banking",
  },
  {
    heading: "UI engineering foundations",
    company: "Base · at Design is Dead/Emakina",
    period: "2016 – 2018",
    scope: "UI development for high-traffic telecom websites.",
    contributions: [
      "Cross-browser component work in Adobe Experience Manager",
      "npm tooling that removed compile cycles from front-end changes",
    ],
    href: "/work/base",
  },
];

export const earlierRoles = [
  { company: "Stepstone", role: "Front-End Developer", period: "2015" },
  { company: "BTI Belgium", role: "Web Designer", period: "2011 – 2015" },
  { company: "JL Gestion", role: "Web Design Trainer", period: "2010 – 2011" },
];

export const contact = {
  email: "daniel.bodi.gil@gmail.com",
  location: "Morlanwelz, Belgium · Europe/Brussels",
  cv: {
    /**
     * Single CV until role-specific variants are provided
     * (see CONTENT_CHECKLIST.md — the brief forbids generating CVs here).
     */
    file: "/cv/daniel-bodi-gil-cv.pdf",
    fileName: "daniel-bodi-gil-cv.pdf",
    label: "Download CV",
  },
  /** Populated once role-specific, ATS-friendly PDFs exist in public/cv/. */
  roleCvs: [] as { label: string; file: string; fileName: string }[],
};
