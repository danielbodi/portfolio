import { Artefact, Metric } from './types';

/**
 * Site-wide content: positioning, homepage sections, career progression,
 * contact. Copy follows the transformation brief (sections 3, 6, 14, 15).
 */

export const positioning = {
  name: 'Daniel Bodi Gil',
  /** Discipline framing — signals staff-level scope without claiming a held title. */
  descriptor: 'Staff Product Design · Design Systems · UX Engineering',
  seoTitle: 'Daniel Bodi Gil — Product Design, Design Systems & UX Engineering',
  seoDescription:
    'Portfolio of Daniel Bodi Gil, a product designer and UX engineer specialising in complex enterprise products, design systems, Figma, Storybook and front-end UI architecture.'
};

export const hero = {
  eyebrow: positioning.descriptor,
  title: 'I design the systems behind complex products\u2014and help teams ship them.',
  support:
    'I turn complex workflows into clear product experiences, reusable design foundations and implementation-ready UI across Figma, Storybook and front-end systems.',
  ctaPrimary: { label: 'View selected work', href: '/work' },
  ctaSecondary: { label: 'Download CV', href: '/cv/daniel-bodi-gil-cv.pdf' },
  contextLink: {
    label: 'Currently building an AI-ready design system at Solidaris',
    href: '/work/solidaris'
  }
};

export const proofBar: Metric[] = [
  {
    value: '15 years',
    label: 'across product design and front-end UI',
    confidence: 'verified',
    evidenceNote: 'Career start October 2010 (JL Gestion); continuous roles since.'
  },
  {
    value: '40+',
    label: 'reusable components delivered at Bridgestone',
    confidence: 'reported',
    evidenceNote: 'Component and guideline count from the Bridgestone design system backlog.'
  },
  {
    value: 'Figma · Storybook · Angular · TypeScript',
    label: 'the bridge between design and implementation',
    confidence: 'verified'
  },
  {
    value: 'B2B complexity',
    label: 'healthcare, mobility, banking and telecom products',
    confidence: 'verified'
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
    text: 'I frame complex workflows, align user and business needs, and turn ambiguity into a coherent product direction.',
    links: [
      { label: 'Solidaris — key decisions', href: '/work/solidaris#key-decisions' },
      { label: 'Trasis — strategic framing', href: '/work/trasis#strategic-framing' }
    ]
  },
  {
    id: 'systems',
    title: 'Systems',
    text: 'I translate recurring product decisions into foundations, components, patterns and documentation that teams can reuse.',
    links: [
      { label: 'Bridgestone — system evidence', href: '/work/bridgestone#system-evidence' },
      { label: 'Solidaris — Plectrum patterns', href: '/work/solidaris#system-evidence' }
    ]
  },
  {
    id: 'delivery',
    title: 'Delivery',
    text: 'I work close to implementation through prototypes, front-end architecture, Storybook, design QA and code-level collaboration.',
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
    why: 'Makes AI coding assistants produce on-system, accessible code by default.',
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
