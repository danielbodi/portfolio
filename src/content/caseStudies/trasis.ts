import { CaseStudy } from '../types';
import { trasisCard } from './cards';

export const trasisStudy: CaseStudy = {
  card: trasisCard,

  seo: {
    title: 'Trasis QC1 — Safety-Critical Quality-Control Interface | Daniel Bodi Gil',
    description:
      'Designing and building the interface for a radiopharmaceutical quality-control device: realistic device visualisation, unambiguous workflows, accessibility for visual impairments, and task-based validation.'
  },

  impactStatement:
    'A team that had never worked with a designer shipped a safety-critical interface — and kept the design role through COVID-era cuts.',

  hero: {
    summary:
      'The interface for the QC1, a device that runs quality-control tests on radiopharmaceuticals — complex laboratory workflows made unambiguous.',
    role: 'Sole designer — and front-end contributor — in an engineering team that had never worked with a designer.',
    period: '2019 – 2021 · via CTG',
    team: '1 UI/UX designer (me), 1 back-end developer, 1 product owner; domain experts consulted throughout.',
    context:
      'Radiopharmaceutical equipment manufacturer. Tablet interface controlling and monitoring QC test workflows on the QC1 device.',
    stack: ['Figma', 'Illustrator', 'Nx · Angular', 'HTML/SCSS · ITCSS/BEM', 'Storybook'],
    image: {
      src: '/screenshots/trasis/trasis-qc1-homepage.png',
      alt: 'QC1 device interface home screen',
      what: 'The QC1 home screen: schedules, device state and test entry points.',
      why: 'One glance answers what the device is doing and what runs next.',
      contribution: 'Designed end to end; front-end foundations built by me.',
      state: 'Shipped'
    }
  },

  recruiterSummary: {
    challenge:
      'Technicians run quality-control tests on radiopharmaceuticals — a domain where ambiguity in the interface translates into wasted doses, invalid tests or operational risk. The device UI had to mirror physical components faithfully while staying operable by users with varying visual abilities.',
    ownership: [
      'End-to-end design: research, flows, high-fidelity UI, realistic device illustrations',
      'Front-end foundations: Nx/Angular workspace, ITCSS/BEM, Storybook base',
      'Task-based user testing and iteration; design-process introduction to the team'
    ],
    changed: [
      'Internal device processes (fluid channels, reagents, rotations) became visible and trackable in real time',
      'Test scheduling and results were structured with data-driven graphs, tables and redundant state cues',
      'A team unfamiliar with designers built design reviews into its routine'
    ],
    evidence: [
      'Shipped interface for the QC1 device',
      'Task-based prototype testing informed revisions; participant counts, task lists and calculations were not formally documented',
      'Stakeholder buy-in strong enough to keep the design role through COVID-era cuts'
    ]
  },

  framing: {
    heading: 'Why this mattered',
    paragraphs: [
      'QC1 performs quality control on <strong>radiopharmaceuticals</strong>. Technicians needed to see what the device was doing, what happened next and what each result meant; a misread state could waste material, invalidate a test or delay dose release.',
      'The interface also had to represent physical hardware faithfully in a domain new to me, so the design relied on domain experts and repeated task-based prototypes.'
    ]
  },

  ownership: [
    {
      verb: 'Led',
      items: [
        'The introduction of a design process into an engineering-only team',
        'The design-system direction (reused UI kit + atomic methodology) under a tight budget'
      ]
    },
    {
      verb: 'Designed',
      items: [
        'Realistic illustrations of device components and process schemas (fluid channels, reagent movements, test flows)',
        'Test scheduling, protocol creation, isotope selection and import flows',
        'Results screens with graphs, tables and visual references for colour/clarity tests'
      ]
    },
    {
      verb: 'Implemented',
      items: [
        'Front-end foundations in an Nx/Angular workspace',
        'ITCSS structure with BEM naming for the styling layer',
        'The initial Storybook setup for component documentation'
      ]
    },
    {
      verb: 'Tested',
      items: [
        'Frequent task-based sessions on prototypes, iterating flows before development'
      ]
    },
    {
      verb: 'Influenced',
      items: [
        'Twice-weekly stakeholder sessions that turned scepticism about design into demand for it'
      ]
    }
  ],

  constraints: {
    items: [
      {
        constraint:
          'No designer had ever worked with this team, and the value of the role was itself in question.',
        soWhat:
          'Twice-weekly visible progress — plans, reasoning, working prototypes — turned scepticism into demand for design.'
      },
      {
        constraint:
          'The domain was new to me: radiopharmacy knowledge had to come from the business experts.',
        soWhat:
          'Consulted domain experts at every iteration and anchored the flows in their process knowledge.'
      }
    ],
    limitedBy:
      'The budget ended before Storybook matured past a basic stage, and the retained testing record does not support publishing participant counts or task-level success rates.'
  },

  decisions: [
    {
      id: 'decision-realism',
      title: 'Represent the device realistically instead of abstracting it',
      tension:
        'Abstract icons are cheaper to produce and maintain — but technicians reason about physical parts: this valve, that column, this tube.',
      alternatives: [
        'Abstract schematic icons',
        'Photographic imagery',
        'Realistic vector illustrations of the actual components'
      ],
      evidence:
        'Users interpret device state through their mental model of the hardware; schematics forced translation, photos aged badly and rendered poorly at UI sizes.',
      decision:
        'Realistic vector illustrations of valves, columns, injectors and tubes, composed into diagrams and schemas that replicate the device\u2019s internal processes in real time.',
      tradeOff:
        'Significant illustration effort, and the visuals must be maintained when hardware revisions change components.',
      result:
        'Technicians track fluid channels, reagent movements and test progress directly on a picture of their machine.',
      resultState: 'Shipped',
      visual: {
        src: '/screenshots/trasis/trasis-qc1-real-parts-ui.png',
        alt: 'Realistic vector illustrations of the QC1 device components in the interface'
      }
    },
    {
      id: 'decision-kit',
      title: 'Reuse a UI kit and atomic methodology to buy validation time',
      tension:
        'One designer, one budget, a whole device interface — custom foundations from scratch would have consumed the schedule before a single user test.',
      alternatives: [
        'Fully custom design language',
        'Reuse Ant Design\u2019s kit and extend it with atomic-methodology components'
      ],
      evidence:
        'The kit\u2019s structure and update cadence meant foundation work could be redirected into domain-specific components and testing rounds.',
      decision:
        'Build on the kit, extend with custom components where the domain demanded (device visualisation, results displays), and spend the saved time on user testing.',
      tradeOff: 'Some visual genericity in standard controls.',
      result: 'High-fidelity prototypes early and often — which is what made frequent validation possible at all.',
      resultState: 'Shipped',
      visual: {
        src: '/screenshots/trasis/trasis-qc1-new-tap-creation-page.png',
        alt: 'QC1 protocol creation flow combining reusable controls with domain-specific steps'
      }
    },
    {
      id: 'decision-a11y',
      title: 'Design for visual impairment from the start',
      tension:
        'Data-heavy QC results lean on colour (pass/fail, spot readings) — but some users have impaired colour vision, and lab lighting varies.',
      alternatives: [
        'Colour-coded results with a legend',
        'Colour plus redundant encodings: patterns, textures, text and hierarchy'
      ],
      evidence:
        'Accessibility practice for colour-blind users; the consequence of misreading a QC result is not cosmetic.',
      decision:
        'Strong text/background contrast, deliberate visual hierarchy, and patterns/textures/indicators alongside colour everywhere a state is communicated.',
      tradeOff: 'A more constrained visual palette and busier component states to design and document.',
      result: 'Results screens legible regardless of colour perception — precision without decoration.',
      resultState: 'Shipped',
      visual: {
        src: '/screenshots/trasis/trasis-qc1-spots--results.png',
        alt: 'Spot-test results with redundant encodings beyond colour'
      }
    }
  ],

  influence: {
    aligned: [
      'Engineering and business around a fixed twice-weekly review of direction, reasoning and working prototypes'
    ],
    convinced: [
      'A design-sceptical team and business through visible reasoning and working prototypes'
    ],
    changed: [
      'Design reviews became part of the team\u2019s routine',
      'The internal developer was coached to carry the front-end foundations after handover'
    ]
  },

  craft: {
    intro:
      'Shipped interface screens: scheduling, device monitoring, protocol management and results. The visual language balances technical accuracy with fast scanning.',
    artefacts: [
      {
        src: '/screenshots/trasis/trasis-qc1-dashboard.png',
        alt: 'QC1 dashboard with test schedules and real-time component monitoring',
        what: 'Dashboard: schedules and real-time device monitoring.',
        why: 'The technician\u2019s home base — what is running, what is queued, what needs attention.',
        contribution: 'Designed the layout, states and monitoring visualisation.',
        state: 'Shipped'
      },
      {
        src: '/screenshots/trasis/trasis-qc1-appearance--results.png',
        alt: 'Colour and clarity test results with visual references',
        what: 'Appearance-test results with visual references.',
        why: 'Subjective assessments (colour, clarity) anchored against reference visuals to reduce inter-operator variance.',
        contribution: 'Designed the comparison interaction.',
        state: 'Shipped'
      },
      {
        src: '/screenshots/trasis/trasis-qc1-tracer-creation.png',
        alt: 'Radiopharmaceutical isotope selection screen',
        what: 'Isotope selection.',
        why: 'Domain-specific picker where a wrong choice invalidates everything downstream.',
        contribution: 'Designed the selection model with domain experts.',
        state: 'Shipped'
      }
    ]
  },

  systemEvidence: [
    {
      heading: 'Front-end foundations, built to hand over',
      paragraphs: [
        'I set up the front-end in an <strong>Nx monorepo with Angular</strong>, structured the CSS with <strong>ITCSS and BEM</strong>, and established <strong>Storybook</strong> as the component documentation platform. Storybook reached a basic stage before the budget ended — an honest limitation, not a finished system.',
        'Before leaving I ran coaching sessions with the internal developer who took over the front-end: the Figma prototypes, the design system, the Storybook setup and the CSS methodology. Continuity was part of the deliverable.'
      ]
    }
  ],

  validation: {
    method: [
      'Task-based prototype sessions and twice-weekly stakeholder walkthroughs using realistic QC scenarios',
      'Domain-expert review at each iteration because radiopharmacy knowledge came from the business'
    ],
    observed: [
      'Comprehension gaps in early flow drafts, especially around scheduling and multi-step test setup',
      'Iterations needed on how results and device state were presented'
    ],
    changed: [
      'Flows and visualisations were reworked before development rather than after',
      'The results presentation evolved toward redundant encodings and reference-anchored comparisons'
    ],
    limitations:
      'Task-success and prototyping-speed figures were reported during the engagement, but participant counts, task lists, calculations and baselines were not preserved. They are therefore not published as portfolio metrics. Domain validity relied on business experts rather than independent research.'
  },

  outcomes: {
    user: [
      {
        text: 'Technicians manage injections, flushes, rotations and test schedules with the device\u2019s state visible in real time on a faithful representation of the hardware.'
      },
      {
        text: 'Results are readable regardless of colour perception, with reference visuals reducing subjective variance.'
      }
    ],
    team: [
      {
        text: 'A team that had never worked with a designer kept the role through COVID-era cuts and built design reviews into its routine.',
        evidenceNote: 'Many parallel projects were cancelled in that period; this engagement continued.'
      }
    ],
    system: [
      {
        text: 'An Nx/Angular front-end foundation with ITCSS/BEM and a Storybook base, handed over with coaching to the internal team.'
      },
      {
        text: 'A reusable illustration system for device components, extensible to future hardware revisions.'
      }
    ],
    learning: [
      'When users reason about physical objects, the interface should meet their mental model — realism was a usability decision, not an aesthetic one.',
      'In high-consequence domains, redundant encoding is the baseline, not an enhancement.',
      'Trust in a new discipline is built on cadence: visible progress at a fixed rhythm beat any pitch.'
    ]
  },

  metrics: [
    {
      value: 'Shipped',
      label: 'QC1 interface delivered, with handover coaching',
      confidence: 'verified',
      evidenceNote: 'Interface delivered before the engagement ended; internal developer coached for continuity.'
    }
  ],

  reflection: {
    repeat: [
      'Realistic visualisation wherever users\u2019 mental models are physical.',
      'Twice-weekly visible progress as the trust-building mechanism with design-sceptical teams.',
      'Spending kit-reuse savings on validation rounds instead of custom foundations.'
    ],
    change: [
      'Secure the Storybook investment earlier — it reached only a basic stage before budget end.',
      'Document participant counts, task definitions, calculations and baselines at the time so validation evidence remains publishable.'
    ]
  },

  connection: {
    title: 'Where the methodology was first taught',
    description:
      'The CSS architecture and coaching practice visible here started at <strong>Sopra Banking</strong>, teaching BEM and systematic thinking to a junior front-end team.',
    buttonText: 'Read the Sopra Banking case',
    href: '/work/sopra-banking'
  }
};
