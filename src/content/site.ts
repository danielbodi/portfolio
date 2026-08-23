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
  title: 'I set direction for complex product ecosystems\u2014and build the systems teams use to ship them.',
  support:
    'Across product, design and engineering, I turn ambiguous workflows into shared models, reusable foundations and production-ready experiences.',
  ctaPrimary: { label: 'Explore selected work', href: '#selected-work' },
  ctaSecondary: { label: 'See my Staff design path', href: '/staff-product-design' },
  contextLink: {
    label: 'Now · Building an AI-ready design system at Solidaris',
    href: '/work/solidaris'
  }
};

/**
 * Homepage specimen: real product UI plus the machine-readable layer —
 * component metadata and the Solidaris supervisor pipeline.
 */
export const heroSpecimen = {
  href: '/work/bridgestone',
  chrome: 'Bridgestone UI \u00b7 Storybook',
  image: {
    src: '/screenshots/bs/bs_desktop_storybook-home.png',
    alt: 'Bridgestone UI design system home in Storybook: foundations, components, colours and icons documented from the live CSS'
  },
  caption:
    'Bridgestone UI in Storybook \u2014 documentation generated from live CSS. Overlay: Plectrum component metadata and the Solidaris supervisor.',
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
    kicker: 'Agent workflow',
    name: 'Solidaris',
    role: 'Supervisor \u00b7 never writes code',
    rule: 'Specialists implement. The supervisor only orchestrates.',
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
    id: 'ai-ready-systems',
    heading: 'AI-ready design systems',
    supportingLine: 'Rules, context and quality gates for AI-assisted delivery.'
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
    text: 'I turn recurring product decisions into tokens, components, patterns and documentation — architected so they cannot drift from production.',
    links: [
      { label: 'Bridgestone — system evidence', href: '/work/bridgestone#system-evidence' },
      { label: 'Solidaris — Plectrum patterns', href: '/work/solidaris#system-evidence' }
    ]
  },
  {
    id: 'delivery',
    title: 'Delivery',
    text: 'I ship alongside developers: front-end architecture, Storybook, design QA in pull requests, and hands-on CSS coaching.',
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
    why: 'Tokens live once in CSS; TypeScript parsers read the CSSOM and feed the swatches, docs tables and playgrounds — documentation cannot drift.',
    contribution: 'Built the CSS-to-Storybook pipeline.',
    state: 'In production'
  },
  {
    src: '/screenshots/solidaris/token-architecture.svg',
    alt: 'Three-tier design token architecture with a PrimeNG bridge',
    what: 'Three-tier token chain bridging Figma variables to PrimeNG.',
    why: 'Lets the vendor library evolve without breaking the Solidaris theme.',
    contribution: 'Defined the architecture; mapped 170+ variables.',
    state: 'Ongoing'
  },
  {
    src: '/screenshots/bs/bs_desktop_ws-light.png',
    alt: 'Bridgestone vehicle worksheet interface, light theme',
    what: 'Fleet worksheet UI on the shared component library.',
    why: 'Dense operational data made consistent and scannable through system components.',
    contribution: 'Designed the screens and their components.',
    state: 'In production'
  },
  {
    src: '/screenshots/solidaris/contracts-index.svg',
    alt: 'Machine-readable design-system contracts and knowledge base structure',
    what: 'Machine-readable contracts and rules for AI-assisted development.',
    why: 'With the rules in the assistant\u2019s context, my AI-assisted delivery produces on-system, accessible code by default — built for the client teams to adopt.',
    contribution: 'Designed the contract schema and agent workflow.',
    state: 'Ongoing'
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
    what: 'Hybrid workflow journey, coded on Plectrum.',
    why: 'Resolved the overview-versus-detail tension in document journeys.',
    contribution: 'Designed both models and the tests that chose the hybrid.',
    state: 'Validated prototype'
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
    period: 'Oct 2025 – present',
    scope: 'Sole embedded consultant building an AI-ready design system across a healthcare application ecosystem.',
    contributions: [
      'Plectrum design-system patterns and an AI-ready contract layer',
      'Cross-product case-reading model spanning iCRM, iShare and iGED'
    ],
    href: '/work/solidaris'
  },
  {
    heading: 'Design system ownership and UX engineering',
    company: 'Bridgestone · via CTG/Cegeka',
    period: '2019 – 2025',
    scope: 'From sole designer to leading design workflows on a fleet-management platform.',
    contributions: [
      'CSS as the single source of truth: tokens written once feed the apps and a self-updating Storybook',
      'ITCSS/BEM architecture (254 SCSS files), browser-computed color system and pull-request reviews'
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
