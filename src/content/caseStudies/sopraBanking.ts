import { CaseStudy } from '../types';
import { sopraBankingCard } from './cards';

export const sopraBankingStudy: CaseStudy = {
  card: sopraBankingCard,

  seo: {
    title: 'Sopra Banking — Modernising CSS Architecture and Design Workflows | Daniel Bodi Gil',
    description:
      'BEM methodology, a custom Flexbox grid and atomic components for enterprise banking software — plus the coaching that made a junior front-end team adopt them.'
  },

  impactStatement:
    'A junior team\u2019s CSS went from float hacks to conventions they adopted by conviction — and kept after I left.',

  hero: {
    summary:
      'Enterprise banking software with a junior front-end team, float-based CSS and a PDF style guide. The work: modern CSS architecture, atomic components, and the coaching to make both stick.',
    role: 'Senior UI/UX designer — design reinforcement with a front-end architecture mandate that emerged on the job.',
    period: 'April – December 2018',
    team: '2 UI/UX designers, 3 front-end and 2 back-end developers, a tester, an architect and a scrum master.',
    context: 'Core banking platforms serving financial institutions; high transaction volumes, long product lifetimes.',
    stack: ['Sketch', 'InVision', 'HTML/SCSS · BEM', 'TS', 'Git'],
    image: {
      src: '/screenshots/sopra/sopra-login-page.png',
      alt: 'Banking platform login screen built on the reworked design foundations',
      what: 'Login screen on the reworked foundations.',
      why: 'The first screen users meet — and the first built on the new component approach.',
      contribution: 'Designed on the atomic component set I introduced.',
      state: 'Shipped'
    }
  },

  recruiterSummary: {
    challenge:
      'A junior front-end team was accumulating technical debt on a float-based grid and unstructured CSS, guided only by a PDF style guide. Design output could not scale and neither could its implementation.',
    ownership: [
      'Introduced BEM and restructured the CSS approach',
      'Designed and built a custom Flexbox grid replacing float layouts',
      'Applied atomic design to strategic components; coached the developers hands-on'
    ],
    changed: [
      'The team\u2019s CSS became organised, named and reusable',
      'Layouts moved from float hacks to a flexible, future-proof grid',
      'A web-based design system was proposed to replace the PDF style guide'
    ],
    evidence: [
      'BEM and the new grid adopted by the team during the engagement',
      'Design team reported faster prototyping from component reuse',
      'The design-system proposal was left as a strategic direction (not delivered — I left before)'
    ]
  },

  framing: {
    heading: 'Why this mattered',
    paragraphs: [
      'Banking software outlives its authors. The platform\u2019s front-end was being built by a capable but junior team on <strong>float-based layouts and unstructured CSS</strong> — each new screen added debt, and the design side compounded it: components existed as pictures in a PDF, not as a system anyone could build from.',
      'The leverage was not another redesign. It was changing <strong>how the team built UI</strong>: structure in the CSS, methodology in the components, and enough coaching that the changes would survive my departure.'
    ]
  },

  ownership: [
    {
      verb: 'Led',
      items: [
        'The CSS modernisation: BEM adoption and the grid replacement',
        'The design-system proposal evolving the PDF style guide into a web platform'
      ]
    },
    {
      verb: 'Designed',
      items: [
        'Banking flows on the reworked component set (account history, standing orders, confirmations)',
        'Strategic components restructured with atomic design methodology'
      ]
    },
    {
      verb: 'Implemented',
      items: ['The custom Flexbox-based grid, designed from scratch and BEM-compliant']
    },
    {
      verb: 'Documented',
      items: ['Component structure, naming conventions and grid usage for the team']
    },
    {
      verb: 'Influenced',
      items: ['Developer practices through pairing, examples on their real problems, and coaching']
    },
    {
      verb: 'Team outcome',
      items: ['Platform features delivered by the full team on the improved foundations']
    }
  ],

  constraints: {
    items: [
      {
        constraint:
          'The team found BEM verbose and resisted it — while fighting daily CSS collisions and unpredictable overrides.',
        soWhat:
          'Taught through their own defects: every demonstration was a fix they needed anyway, and adoption came by conviction.'
      },
      {
        constraint: 'Delivery could not pause for a full component rework.',
        soWhat:
          'Restructured progressively, prioritised by actual usage in prototypes, so the rework paid for itself instead of blocking the roadmap.'
      },
      {
        constraint: 'Building a design system was beyond the engagement\u2019s scope.',
        soWhat:
          'Left a documented proposal for a web-based design system on top of the reworked foundations.'
      }
    ],
    limitedBy:
      'I left the project before the design-system proposal could be delivered; it remains a strategic direction, not a shipped system.'
  },

  decisions: [
    {
      id: 'decision-bem',
      title: 'Introduce BEM by solving the team\u2019s actual problems, not by decree',
      tension:
        'The team found BEM verbose and resisted it — while struggling daily with CSS collisions and unpredictable overrides.',
      alternatives: [
        'Mandate the convention top-down',
        'Keep the status quo and clean up case by case',
        'Demonstrate BEM on the exact issues the team was fighting'
      ],
      evidence:
        'Live examples: recurring specificity wars and naming collisions from their own codebase, re-solved with BEM structure.',
      decision: 'Teach through their real defects — every demonstration was a fix they needed anyway.',
      tradeOff: 'Slower initial adoption than a mandate, more of my time spent pairing.',
      result: 'The team adopted BEM by conviction; it survived after I left.',
      resultState: 'Shipped'
    },
    {
      id: 'decision-grid',
      title: 'Replace the float grid with a custom Flexbox grid',
      tension:
        'The float-based grid generated hacks and technical debt, but a framework swap (e.g. Bootstrap) would have imported unused weight and foreign conventions.',
      alternatives: [
        'Keep patching the float grid',
        'Adopt a third-party CSS framework',
        'Build a minimal custom Flexbox grid, BEM-compliant'
      ],
      evidence: 'The debt patterns traced directly to float behaviour; the team needed less grid, not more framework.',
      decision: 'A from-scratch Flexbox grid following the BEM convention.',
      tradeOff: 'Owning the grid means maintaining it.',
      result: 'More flexible layouts, less debt, and a pattern I refined again in later engagements.',
      resultState: 'Shipped'
    },
    {
      id: 'decision-atomic',
      title: 'Apply atomic design to strategic components first',
      tension:
        'Every existing component was unscaled and inconsistent — but reworking all of them would have stopped delivery.',
      alternatives: [
        'Full component rework before new features',
        'Atomic methodology on new and strategic components, catching up progressively as prototypes reuse them'
      ],
      evidence: 'Delivery could not pause; the components used most often were the ones worth fixing first.',
      decision: 'Progressive restructuring, prioritised by actual usage in prototypes.',
      tradeOff: 'A mixed system during the transition.',
      result:
        'The design team prototyped faster through reuse, and the rework paid for itself instead of blocking the roadmap.',
      resultState: 'Shipped'
    },
    {
      id: 'decision-ds-proposal',
      title: 'Propose a web-based design system to replace the PDF style guide',
      tension: 'A PDF cannot hold components, states or code guidance — but building a design system was beyond the engagement\u2019s scope.',
      alternatives: ['Extend the PDF', 'Propose a web platform: foundations, component library, usage documentation'],
      evidence: 'The reworked components already formed the inventory; the missing piece was a living home for them.',
      decision: 'A documented proposal for the web-based system, built on the atomic component work.',
      tradeOff: 'I left the project before it could be delivered.',
      result: 'Left as a strategic direction with the foundations in place — proposed, not shipped.',
      resultState: 'Strategic proposal'
    }
  ],

  influence: {
    aligned: [
      'Design output and front-end implementation on one component structure and naming convention'
    ],
    convinced: [
      'A junior front-end team that adopted BEM and the new grid by conviction, not mandate — through pairing on their real problems'
    ],
    changed: [
      'The team\u2019s CSS became organised, named and reusable, and the conventions survived my departure',
      'Layouts moved from float hacks to a flexible, future-proof grid'
    ]
  },

  craft: {
    intro: 'Banking flows built on the reworked foundations during the engagement.',
    artefacts: [
      {
        src: '/screenshots/sopra/sopra-account-hystory.png',
        alt: 'Account history screen with transaction details',
        what: 'Account history: dense transaction data on the new component structure.',
        contribution: 'Designed with the restructured table and filter components.',
        state: 'Shipped'
      },
      {
        src: '/screenshots/sopra/sopra-eu-standing-order.png',
        alt: 'European standing order setup flow',
        what: 'Standing-order setup: multi-step banking form on the new grid.',
        contribution: 'Designed the flow; the form patterns exercised the atomic component set.',
        state: 'Shipped'
      },
      {
        src: '/screenshots/sopra/sopra-end-screen.png',
        alt: 'Transaction confirmation screen',
        what: 'Confirmation screen with clear completion state.',
        contribution: 'Designed the end-of-flow feedback pattern.',
        state: 'Shipped'
      }
    ]
  },

  systemEvidence: [
    {
      heading: 'CSS architecture as team enablement',
      paragraphs: [
        'The BEM introduction and the custom Flexbox grid were not style preferences — they were the difference between CSS the team fought and CSS the team could reason about. Both were taught through the team\u2019s own defects, with pairing and coaching until the conventions were self-sustaining.',
        'This engagement is where the coaching-and-architecture pattern in my later work (Trasis, Bridgestone) was first proven: structure plus teaching beats either alone.'
      ]
    }
  ],

  outcomes: {
    user: [
      { text: 'Banking screens became more consistent as reworked components spread through the flows.' }
    ],
    team: [
      {
        text: 'The design team reported faster prototyping from component reuse.',
        evidenceNote:
          'The engagement cited ~40% faster prototyping and ~30% cost reduction; baselines were not documented, so both remain team-reported estimates (see content checklist).'
      },
      { text: 'The junior front-end team adopted BEM and the new grid by conviction, not mandate.' }
    ],
    system: [
      { text: 'A BEM-compliant Flexbox grid and progressively atomic component set.' },
      {
        text: 'A web-based design-system direction proposed on top of the reworked foundations.',
        evidenceNote: 'Proposal only — I left the project before delivery.'
      }
    ],
    learning: [
      'Convention adoption is a teaching problem: verbosity objections dissolve when the convention fixes the pain the team already feels.',
      'Progressive restructuring, prioritised by usage, beats big-bang rework in delivery-constrained teams.'
    ]
  },

  reflection: {
    repeat: [
      'Teaching architecture through the team\u2019s own defects.',
      'Usage-prioritised component rework that never blocks delivery.'
    ],
    change: [
      'Raise the design-system proposal earlier in the engagement so delivery could start before my exit.'
    ]
  },

  connection: {
    title: 'Where the discipline was learned',
    description:
      'The systematic habits taught here were forged at <strong>Base</strong> — high-traffic telecom front-ends where cross-browser discipline was survival.',
    buttonText: 'Read the Base case',
    href: '/work/base'
  }
};
