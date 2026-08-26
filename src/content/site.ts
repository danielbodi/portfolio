import { Artefact } from './types';

/**
 * Site-wide content: positioning, homepage sections, career progression,
 * contact. Copy follows the transformation brief (sections 3, 6, 14, 15).
 */

export const positioning = {
  name: 'Daniel Bodi Gil',
  /** Discipline framing — Senior claimed, staff-leaning scope carried by case evidence. */
  descriptor: 'Senior Product Design · Design Systems · UX Engineering',
  seoTitle: 'Daniel Bodi Gil — Product Design, Design Systems & UX Engineering',
  seoDescription:
    'Portfolio of Daniel Bodi Gil, a product designer and UX engineer specialising in complex enterprise products, design systems, Figma, Storybook and front-end UI architecture.'
};

export const hero = {
  eyebrow: 'Product design at systems scale',
  title: 'I design the systems behind complex products\u2014and help teams ship them.',
  support:
    'I turn complex workflows into clear product experiences, reusable design foundations and implementation-ready UI across Figma, Storybook and front-end systems.',
  ctaPrimary: { label: 'Explore selected work', href: '#selected-work' },
  ctaSecondary: {
    label: 'Download CV',
    href: '/cv/daniel-bodi-gil-cv.pdf',
    download: 'daniel-bodi-gil-cv.pdf'
  },
  contextLink: {
    label: 'Solidaris · ongoing through the planned October 2026 handoff',
    href: '/work/solidaris'
  },
  proof: {
    href: '/work/solidaris',
    image: {
      src: '/screenshots/solidaris/ishare-affiliate-dossier.png',
      alt: 'Anonymised iShare affiliate dossier prototype with a member summary, document list and workflow journey'
    },
    eyebrow: 'Solidaris · product prototype',
    caption: 'A dossier view that makes documents, status and workflow easier to read together.',
    evidenceClass: 'OUTPUT' as const,
    state: 'Ongoing' as const
  }
};

/**
 * Optional technical specimen: production UI plus an experimental contract
 * and workflow layer. The maturity of each part is stated in the caption.
 */
export const heroSpecimen = {
  href: '/work/bridgestone',
  chrome: 'Bridgestone UI \u00b7 Storybook',
  image: {
    src: '/screenshots/bs/bs_desktop_storybook-home.png',
    alt: 'Bridgestone UI design system home in Storybook: foundations, components, colours and icons documented from the live CSS'
  },
  caption:
    'Bridgestone UI in production Storybook. Overlay: Solidaris contract and workflow outputs that remain experimental and are not presented as adopted.',
  state: 'In production' as const,
  contract: {
    kicker: 'Component contract',
    file: 'journey.metadata.ts',
    schema: 'ComponentMetadata',
    fields: [
      {
        key: 'component',
        value: "name: 'Journey'  bemBlock: 'c-journey'  itcssLayer: '06-components'"
      },
      {
        key: 'usage',
        value: 'antiPatterns \u2192 a linear stepper for a single-step form'
      },
      {
        key: 'accessibility',
        value: "wcagLevel: 'AA'"
      },
      {
        key: 'tokens',
        value: '--pds-color-brand  --pds-color-text  --pds-color-text-muted'
      },
      {
        key: 'aiHints',
        value: "keywords: ['workflow', 'journey', 'status']"
      }
    ]
  },
  supervisor: {
    kicker: 'Workflow experiment',
    name: 'Solidaris',
    role: 'Proposed orchestration role',
    rule: 'A documented role model for design-to-code work; independent use is not yet claimed.',
    grounding: 'Figma MCP \u00b7 PrimeNG MCP',
    steps: [
      {
        id: 'research',
        parallel: true,
        roles: [
          { name: 'UX Researcher', hint: 'Figma MCP' },
          { name: 'Architect', hint: 'SSOT / ITCSS' }
        ]
      },
      {
        id: 'engineer',
        parallel: false,
        roles: [{ name: 'UX Engineer', hint: 'authors tokens \u00b7 SCSS' }]
      },
      {
        id: 'implement',
        parallel: false,
        roles: [{ name: 'Frontend Dev', hint: 'writes Angular \u00b7 ARIA' }]
      },
      {
        id: 'qa',
        parallel: true,
        roles: [
          { name: 'Tester', hint: 'WCAG AA' },
          { name: 'Token Auditor', hint: 'Figma drift' }
        ]
      }
    ]
  }
};

export interface PositioningPillar {
  id: string;
  heading: string;
  supportingLine: string;
}

export const positioningPillars: PositioningPillar[] = [
  {
    id: 'judgment',
    heading: 'Judgment built over 15 years',
    supportingLine: 'Across product design, systems and front-end delivery.'
  },
  {
    id: 'ai-assisted-systems',
    heading: 'Systems for AI-assisted work',
    supportingLine: 'Inspectable rules and boundaries, labelled by maturity.'
  },
  {
    id: 'production-fluency',
    heading: 'Design-to-production fluency',
    supportingLine: 'Figma and Storybook through Angular and TypeScript.'
  },
  {
    id: 'b2b-ecosystems',
    heading: 'Complex B2B ecosystems',
    supportingLine: 'Healthcare, mobility, banking and telecom.'
  }
];

export interface Capability {
  id: string;
  title: string;
  text: string;
  links: { label: string; href: string }[];
}

export const capabilities: Capability[] = [
  {
    id: 'product-direction',
    title: 'Product direction',
    text: 'I reframe products around the question their users actually ask — turning ambiguous, workflow-heavy domains into a direction that can be prototyped and tested.',
    links: [
      { label: 'Solidaris — key decisions', href: '/work/solidaris#key-decisions' },
      { label: 'Trasis — strategic framing', href: '/work/trasis#strategic-framing' }
    ]
  },
  {
    id: 'systems',
    title: 'Systems',
    text: 'I turn recurring product decisions into tokens, components, patterns and documentation, then make the implementation boundary visible.',
    links: [
      { label: 'Bridgestone — system evidence', href: '/work/bridgestone#system-evidence' },
      { label: 'Solidaris — Plectrum patterns', href: '/work/solidaris#system-evidence' }
    ]
  },
  {
    id: 'delivery',
    title: 'Delivery',
    text: 'I work close to delivery through front-end architecture, Storybook, design QA in pull requests, coded prototypes and hands-on CSS coaching.',
    links: [
      { label: 'Bridgestone — PR reviews and coaching', href: '/work/bridgestone#key-decisions' },
      { label: 'Sopra Banking — CSS architecture', href: '/work/sopra-banking#system-evidence' }
    ]
  }
];

/** Compact artefact gallery for the homepage. Every item carries a delivery state. */
export const homeArtefacts: Artefact[] = [
  {
    src: '/screenshots/bs/bs_desktop_storybook-home.png',
    alt: 'Bridgestone design system documentation home in Storybook',
    what: 'A Storybook that documents itself from the live CSS.',
    why: 'CSS holds the foundation values; TypeScript parsers feed selected swatches, docs tables and playgrounds, reducing duplicate maintenance and drift risk.',
    contribution: 'Built the CSS-to-Storybook pipeline.',
    state: 'In production'
  },
  {
    src: '/screenshots/solidaris/token-architecture.svg',
    alt: 'Three-tier design token architecture with a PrimeNG bridge',
    what: 'A proposed token-governance model linking Figma, semantic tokens and PrimeNG.',
    why: 'Documents how product work could stay aligned with an inherited component foundation.',
    contribution: 'Defined and documented the mapping approach.',
    evidenceClass: 'OUTPUT',
    evidenceNote: 'The exact implemented token inventory and synchronisation state are still being verified.',
    state: 'Ongoing'
  },
  {
    src: '/screenshots/bs/bs_desktop_ws-light.png',
    alt: 'Bridgestone vehicle worksheet interface, light theme',
    what: 'Fleet worksheet UI built on the custom foundation created for FleetBridge.',
    why: 'Dense operational data organised through reusable components and product patterns developed for the platform.',
    contribution: 'Designed the screens, components and shared patterns.',
    state: 'In production'
  },
  {
    src: '/screenshots/solidaris/contracts-index.svg',
    alt: 'AI-oriented component contracts and knowledge-base structure',
    what: 'Contract, rule and workflow files for an AI-assisted development experiment.',
    why: 'Makes intended component usage, accessibility constraints and role boundaries inspectable.',
    contribution: 'Designed the working model and documentation.',
    evidenceClass: 'OUTPUT',
    evidenceNote: 'No independent adoption, repeatability or delivery outcome is claimed.',
    state: 'Strategic proposal'
  },
  {
    src: '/screenshots/trasis/trasis-qc1-spots--results.png',
    alt: 'Trasis QC1 quality-control test results screen',
    what: 'Quality-control results for a radiopharmaceutical device.',
    why: 'Technicians read precise measurements and pass/fail states at a glance.',
    contribution: 'Designed the data presentation and state system.',
    state: 'Shipped'
  },
  {
    src: '/screenshots/solidaris/ishare-journey.png',
    alt: 'iShare journey panel: horizontal step summary with statuses above the expanded step detail, in the coded mockup',
    what: 'Hybrid workflow journey explored in an iShare prototype.',
    why: 'Combines a compact overview with expandable step detail.',
    contribution: 'Designed both models and prepared task-based comparison.',
    evidenceClass: 'OUTPUT',
    evidenceNote: 'Participant counts, scores and final delivery state are not published.',
    state: 'Tested concept'
  }
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
    heading: 'Product and systems leadership',
    company: 'Solidaris · via Cegeka',
    period: 'Oct 2025 – Oct 2026',
    scope: 'Embedded consultancy across three product workstreams, extending inherited PrimeNG/Plectrum foundations and preparing an unfinished handoff.',
    contributions: [
      'Product research, prototypes and reusable case-management patterns',
      'A product-local Figma fork, repository/Storybook outputs and AI-oriented working files'
    ],
    href: '/work/solidaris'
  },
  {
    heading: 'Design system ownership and UX engineering',
    company: 'Bridgestone · via CTG/Cegeka',
    period: '2019 – 2025',
    scope: 'From sole designer to establishing shared design workflows as the team grew.',
    contributions: [
      'Made the need for shared foundations observable through live product patterns after an initial investment refusal',
      'Moved UI decisions earlier through coaching, Storybook, CSS architecture and explicit design governance'
    ],
    href: '/work/bridgestone'
  },
  {
    heading: 'Safety-critical product design',
    company: 'Trasis · via CTG',
    period: '2019 – 2021',
    scope: 'Interface for a radiopharmaceutical quality-control device.',
    contributions: [
      'Device-realistic visualisation system and test workflows',
      'Task-based validation with laboratory users'
    ],
    href: '/work/trasis'
  },
  {
    heading: 'Front-end architecture and team enablement',
    company: 'Sopra Banking Software',
    period: '2018',
    scope: 'Design reinforcement for enterprise banking software.',
    contributions: [
      'BEM methodology and a custom Flexbox grid replacing float layouts',
      'Atomic components and hands-on developer coaching'
    ],
    href: '/work/sopra-banking'
  },
  {
    heading: 'UI engineering foundations',
    company: 'Base · at Design is Dead/Emakina',
    period: '2016 – 2018',
    scope: 'UI development for high-traffic telecom websites.',
    contributions: [
      'Cross-browser component work in Adobe Experience Manager',
      'npm tooling that removed compile cycles from front-end changes'
    ],
    href: '/work/base'
  }
];

export const earlierRoles = [
  { company: 'Stepstone', role: 'Front-End Developer', period: '2015' },
  { company: 'BTI Belgium', role: 'Web Designer', period: '2011 – 2015' },
  { company: 'JL Gestion', role: 'Web Design Trainer', period: '2010 – 2011' }
];

export const contact = {
  email: 'daniel.bodi.gil@gmail.com',
  location: 'Morlanwelz, Belgium · Europe/Brussels',
  cv: {
    /**
     * Single CV until role-specific variants are provided
     * (see CONTENT_CHECKLIST.md — the brief forbids generating CVs here).
     */
    file: '/cv/daniel-bodi-gil-cv.pdf',
    fileName: 'daniel-bodi-gil-cv.pdf',
    label: 'Download CV'
  },
  /** Populated once role-specific, ATS-friendly PDFs exist in public/cv/. */
  roleCvs: [] as { label: string; file: string; fileName: string }[]
};
