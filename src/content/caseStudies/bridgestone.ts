import { CaseStudy, EvidenceClaim } from '../types';
import { bridgestoneCard } from './cards';

const systemFoundationClaim: EvidenceClaim = {
  id: 'bridgestone-system-foundation',
  evidenceClass: 'OUTPUT',
  claim:
    'Shared product patterns, a CSS-led foundation and Storybook documentation were delivered for FleetBridge.',
  source: 'FleetBridge implementation inventory, Storybook workspace and product screens',
  scope: 'The shared UI and design-system work documented in this case',
  confidence: 'verified',
  attribution:
    'I defined the system direction and implemented core CSS and Storybook mechanisms; product delivery remained cross-functional.',
  deliveryState: 'In production'
};

const productPatternClaim: EvidenceClaim = {
  id: 'bridgestone-product-patterns',
  evidenceClass: 'OUTPUT',
  claim:
    'Complex product work—including date selection and vehicle, axle and tyre configuration—became reusable patterns instead of repeated one-off solutions.',
  source: 'Project designs, implementation work and stakeholder demonstrations',
  scope: 'Selected FleetBridge workflows; the public gallery does not expose every component in detail',
  confidence: 'reported',
  attribution: 'I designed the patterns and worked with developers on their implementation.',
  deliveryState: 'In production'
};

const workflowShiftClaim: EvidenceClaim = {
  id: 'bridgestone-workflow-shift',
  evidenceClass: 'OUTCOME',
  claim:
    'UI collaboration moved earlier: developers began involving design during implementation instead of waiting for late pull-request correction.',
  source: 'First-hand observation of the team workflow and recurring implementation support',
  scope: 'The FleetBridge delivery team during my engagement',
  confidence: 'reported',
  attribution:
    'The shift emerged through a temporary review gate, pairing, coaching and increasingly reusable guidance.',
  limitation: 'No count of review cycles, defects or support requests was captured.'
};

const investmentClaim: EvidenceClaim = {
  id: 'bridgestone-investment',
  evidenceClass: 'OUTCOME',
  claim:
    'After the initial request was declined, stakeholders later allocated dedicated time and resources to design-system work.',
  source: 'Project planning decision following demonstrations of system-backed product work',
  scope: 'Organisational investment in the FleetBridge design system',
  confidence: 'reported',
  attribution:
    'I kept the need visible and demonstrated the difference; stakeholders owned the investment decision.',
  limitation: 'No budget amount, before/after baseline or formal causal study is available.'
};

const governanceClaim: EvidenceClaim = {
  id: 'bridgestone-governance',
  evidenceClass: 'OUTPUT',
  claim:
    'Storybook onboarding, shared contribution guidance and Figma branch review made design governance explicit as the team became distributed.',
  source: 'Storybook guidance, design workflow and Figma branching history',
  scope: 'The expanded FleetBridge design and delivery organisation',
  confidence: 'reported',
  attribution:
    'I introduced the workflow and onboarded incoming designers; the wider team used it.',
  limitation: 'Long-term use after my engagement ended was not measured.'
};

export const bridgestoneStudy: CaseStudy = {
  card: bridgestoneCard,

  seo: {
    title:
      'Bridgestone — Building Shared UI Foundations Without an Initial Mandate | Daniel Bodi Gil',
    description:
      'How live product work, temporary UI review, coaching, Storybook and production-backed CSS foundations moved FleetBridge quality into earlier shared practices.'
  },

  impactStatement:
    'The team built every FleetBridge component itself and dedicated resources were refused, so I built the foundation inside feature delivery, then moved UI quality out of my reviews and into tools the team could use earlier.',

  hero: {
    summary:
      'From 2019 to 2025, I helped move FleetBridge from feature-by-feature UI decisions toward shared product patterns, production-backed documentation and explicit design governance.',
    role:
      'Product designer and UX engineer — product patterns, design-system architecture, front-end implementation, developer coaching and design governance. Joined as the sole designer; the design team later grew to three.',
    period: '2019 – 2025 · via CTG/Cegeka',
    team:
      'A design team that grew from one to three, working with a distributed cross-functional delivery organisation.',
    context:
      'FleetBridge — Bridgestone’s fleet and tyre operations platform. The applications in my scope were built from scratch in Angular, then connected through shared operational patterns and two visual themes.',
    stack: ['Figma', 'Storybook', 'Angular · Nx', 'SCSS · ITCSS/BEM', 'TypeScript', 'Chromatic'],
    image: {
      src: '/screenshots/bs/bs_desktop_ws-light.png',
      alt: 'FleetBridge vehicle worksheet interface in its light theme',
      what: 'A production worksheet where reusable table, status, form and action patterns meet a dense operational workflow.',
      why:
        'The design system earned credibility through real product work like this—not through a separate foundations exercise.',
      contribution:
        'I designed the workflow and composite patterns, then worked with developers to integrate them into the FleetBridge UI foundation we were building.',
      evidenceClass: 'OUTPUT',
      evidenceNote: 'Shown as implementation evidence; no usability baseline was recorded.',
      state: 'In production'
    }
  },

  recruiterSummary: {
    challenge:
      'FleetBridge started without a design-system mandate or dedicated time. The new Angular applications still needed a consistent, reusable UI while product delivery was already under way.',
    ownership: [
      'Adapted an Ant Design UI kit in Figma and extended it with custom FleetBridge components so design work could stay consistent from the start',
      'Used pull-request review as a temporary quality check, then brought design into implementation earlier through pairing and coaching',
      'Built the CSS foundation and Storybook documentation later, alongside live product delivery, and formalised governance as the team grew'
    ],
    evidenceClaims: [
      systemFoundationClaim,
      productPatternClaim,
      workflowShiftClaim,
      investmentClaim,
      governanceClaim
    ]
  },

  framing: {
    heading: 'The problem was not individual developer effort',
    paragraphs: [
      'When I joined FleetBridge, the business had already defined the needs and feature backlog. Unlike a conventional discovery-first double diamond, design entered inside definition and delivery; research insights and improvements would have to feed later iterations. The applications in my scope were built from scratch in Angular. To design consistently before a coded system existed, I adapted an Ant Design UI kit in Figma and extended it with custom FleetBridge components; the coded foundation followed later through delivery.',
      'Dedicated design-system time was initially declined while the backlog remained the priority. The consequences appeared in pull requests, demos and retrospectives: repeated decisions, inconsistent implementations and rework—not because developers lacked effort, but because they lacked shared product patterns and implementation guidance.',
      'I worked on two things at once: deliver the product and turn repeated UI decisions into reusable foundations. The bigger change was moving quality from late personal review into the team’s daily workflow.'
    ]
  },

  chronology: {
    heading: 'From individual control to shared capability',
    intro:
      'The system emerged through delivery pressure rather than a funded greenfield programme. These phases explain how the operating model changed.',
    items: [
      {
        period: 'Starting point',
        title: 'Invert the double diamond around delivery',
        description:
          'Business needs and feature definitions were already supplied. Design had to start from those commitments, deliver, then turn later insights and feedback into improvements.',
        label: 'CONTEXT'
      },
      {
        period: 'Built through delivery',
        title: 'Product work became the proof',
        description:
          'With no dedicated mandate, I adapted an Ant Design UI kit in Figma and added custom FleetBridge components. Coded foundations, utilities and Storybook guidance followed as live features were delivered.',
        label: 'OUTPUT'
      },
      {
        period: 'Temporary review',
        title: 'Pull-request review protected quality—and exposed a bottleneck',
        description:
          'UI changes required design approval. The gate caught issues, but late review created rework, slowed delivery and made too much depend on one person.',
        label: 'VALIDATED'
      },
      {
        period: 'Earlier collaboration and investment',
        title: 'Correction became coaching—and product evidence changed the decision',
        description:
          'Developers increasingly involved design during implementation, while system-backed product patterns helped stakeholders see the difference. Dedicated design-system time and resources were later allocated.',
        label: 'OUTCOME'
      },
      {
        period: 'Team expansion',
        title: 'Informal collaboration became explicit governance',
        description:
          'As new designers and a distributed delivery team joined, Storybook onboarding, contribution guidance and Figma branch review replaced reliance on tacit alignment.',
        label: 'OUTPUT'
      }
    ]
  },

  ownership: [
    {
      verb: 'Inherited',
      items: [
        'A feature-first backlog and Angular as the chosen framework for the new applications',
        'No initial design-system mandate or dedicated investment',
        'A quality model that depended heavily on late individual review'
      ]
    },
    {
      verb: 'Designed',
      items: [
        'Reusable table, form, date-selection and vehicle/tyre workflow patterns',
        'Light and dark themes for dense desktop and tablet interfaces',
        'The design workflow used as the team expanded'
      ]
    },
    {
      verb: 'Implemented',
      items: [
        'The shared SCSS/ITCSS foundation and BEM nomenclature',
        'Selected CSSOM-to-Storybook foundation pages and interactive documentation',
        'Production UI behaviours and utilities used by FleetBridge screens',
        'Foundations, component anatomy, contribution guidance and implementation examples in Storybook',
        'The onboarding path for designers and developers using the shared system'
      ]
    },
    {
      verb: 'Facilitated',
      items: [
        'Implementation-time pairing and HTML/CSS coaching with front-end developers',
        'Figma branching and review as distributed design collaboration became more complex'
      ]
    },
    {
      verb: 'Influenced',
      items: [
        'The later decision to allocate design-system time by making the product difference observable',
        'Earlier design involvement in delivery and implementation conversations'
      ]
    }
  ],

  constraints: {
    items: [
      {
        constraint:
          'There was no initial mandate or protected backlog, and arguments alone did not change the investment decision.',
        soWhat:
          'I tied system work to recurring product needs and used demos of working patterns to show the difference between one-off and reusable delivery.'
      },
      {
        constraint:
          'Making every UI pull request depend on my approval protected quality but made me a bottleneck.',
        soWhat:
          'I treated the gate as temporary and moved the work earlier through pairing, coaching, documentation, utilities and reusable components.'
      },
      {
        constraint:
          'Direct communication worked while the design team was small, but not once delivery became distributed.',
        soWhat:
          'I formalised onboarding, contribution guidance and Figma branch review so changes could be discussed and validated explicitly.'
      }
    ],
    limitedBy:
      'No formal baseline was captured for usability, defects, delivery speed, review effort or independent adoption. The outcome claims are therefore bounded to observable workflow changes and stakeholder decisions.'
  },

  decisions: [
    {
      id: 'decision-demonstration',
      title: 'Use a reverse-diamond approach to learn through delivery',
      tension:
        'The business supplied requirements and definition up front, and delivery had already begun. We could not restart with open-ended discovery, but later insights still needed a route back into the product.',
      alternatives: [
        'Pause the committed backlog and restart with a conventional discovery-first process',
        'Implement the supplied definition literally and treat later findings as out of scope',
        'Start from the business-defined need, deliver, then feed implementation and stakeholder insights into later product and system iterations'
      ],
      evidence:
        'Demos, retrospectives and delivery feedback exposed workflow-level needs that the initial feature definitions did not cover. Complex date-selection and vehicle, axle and tyre work made recurring decisions visible.',
      decision:
        'With the other designers, I adapted a reverse-diamond model: begin from the supplied definition, prototype and deliver, then treat implementation, stakeholder and later user feedback as discovery input for the next iteration and the system backlog.',
      tradeOff:
        'Important insights arrived after commitments had been made, so some rework was unavoidable and the system grew in the order product priorities exposed it.',
      result:
        'Later insights became reusable patterns instead of isolated corrections, and the visible product difference helped stakeholders allocate dedicated design-system time. This is not evidence of a quantified business gain.',
      visual: {
        src: '/screenshots/bs/bs_design-approach.png',
        alt: 'The FleetBridge reverse-diamond approach, starting from business definition and feeding later insights into improvement'
      }
    },
    {
      id: 'decision-design-qa',
      title: 'Use the pull-request gate as a diagnostic—then design it out',
      tension:
        'Custom UI implementations reached review with recurring layout, interaction and CSS issues. Letting them merge was costly, but making one designer approve every UI change could not scale.',
      alternatives: [
        'Rely on post-release audits',
        'Make design approval a permanent merge dependency',
        'Use the gate temporarily, identify recurring failure modes and move the knowledge earlier'
      ],
      evidence:
        'Some UI pull requests required many corrections. The gate caught issues but exposed rework, delay and an unhealthy dependency on late review.',
      decision:
        'We required design approval for significant UI changes while I shifted support into implementation-time pairing, HTML/CSS coaching, reusable guidance and system rules.',
      tradeOff:
        'The temporary gate slowed some work and increased my review load before earlier collaboration became routine.',
      result:
        'Developers increasingly involved design during implementation rather than waiting for the pull request. No formal review-volume or defect baseline was captured.'
    },
    {
      id: 'decision-product-patterns',
      title: 'Standardise recurring decisions, not every screen',
      tension:
        'The FleetBridge applications were built from scratch in Angular. Without shared foundations, dense tables, vehicle structures, tyre operations, date selection and inspection workflows risked becoming separate one-off implementations.',
      alternatives: [
        'Continue resolving each workflow inside its feature story',
        'Force every product need into generic components',
        'Create reusable domain patterns where behaviour repeated and preserve specific solutions where it did not'
      ],
      evidence:
        'The date picker, vehicle/axle/tyre visualisation and worksheet flows repeatedly exposed the same interaction and implementation decisions.',
      decision:
        'I translated recurring decisions into documented patterns and composite components, while keeping the boundary between shared behaviour and workflow-specific design explicit.',
      tradeOff:
        'Reuse required judgment: an abstraction was only useful when it preserved the speed and clarity of expert workflows.',
      result:
        'FleetBridge screens shared table, form, status and action patterns across multiple operational contexts.',
      resultState: 'In production',
      visual: {
        src: '/screenshots/bs/bs_desktop_vehicle-list-light.png',
        alt: 'FleetBridge vehicle list using shared table, filter and status patterns'
      }
    },
    {
      id: 'decision-css-ssot',
      title: 'Use shipped CSS as the authoritative source for documented values',
      tension:
        'Maintaining foundation values separately in product CSS, Storybook constants and documentation created several places that could diverge.',
      alternatives: [
        'Maintain a parallel Storybook token catalogue by hand',
        'Introduce a separate build-time token manifest',
        'Keep token definitions in CSS custom properties and let selected documentation read the shipped CSSOM'
      ],
      evidence:
        'The shared style library followed an eight-layer ITCSS structure. Storybook contained 39 story files and 51 MDX pages at the recorded project snapshot.',
      decision:
        'CSS custom properties acted as the authoritative source for foundations. TypeScript utilities parsed selected values from the live CSSOM to populate Storybook swatches, tables and playgrounds.',
      tradeOff:
        'The naming grammar became an API, and the parsers were custom code the team had to maintain.',
      result:
        'Selected foundation pages were generated from production CSS, reducing duplicate maintenance and the risk of documentation drift.',
      resultState: 'In production',
      visual: {
        src: '/screenshots/bs/bs_desktop_storybook-home.png',
        alt: 'FleetBridge Storybook documentation home'
      }
    },
    {
      id: 'decision-distributed-governance',
      title: 'Make governance explicit when the team became distributed',
      tension:
        'Direct communication and trust worked while the design group was small. New designers and a distributed delivery team made that informal model insufficient.',
      alternatives: [
        'Continue resolving conflicts through ad-hoc conversations',
        'Centralise every decision with one designer',
        'Create an onboarding path, shared references and reviewable design changes'
      ],
      evidence:
        'The team expansion introduced new contributors who needed a consistent way to learn the system and propose changes.',
      decision:
        'I used Storybook for onboarding, documented contribution expectations and introduced Figma branches and review before design changes were integrated.',
      tradeOff:
        'The workflow added ceremony, but made the basis for review visible instead of relying on tacit knowledge.',
      result:
        'The expanded team had an explicit path for learning, proposing and reviewing system changes during my engagement.',
      visual: {
        src: '/screenshots/bs/bs_example of the anatomy section for Tags in Figma.png',
        alt: 'Figma component anatomy guidance used in the Bridgestone design workflow'
      }
    }
  ],

  influence: {
    aligned: [
      'Front-end developers and design around the same patterns through implementation-time pairing, pull-request review and Storybook references',
      'Incoming designers around a shared onboarding and Figma branch-review workflow'
    ],
    convinced: [
      'Stakeholders to allocate design-system time after concrete product work made the difference observable',
      'The delivery organisation to involve design while implementation choices were still inexpensive to change'
    ],
    changed: [
      'A reverse-diamond loop gave later insights a route back into product and system improvements',
      'Late correction became earlier collaboration and coaching',
      'Repeated product decisions and a trust-based design workflow became documented patterns, guidance and explicit governance'
    ]
  },

  craft: {
    intro:
      'The system was grounded in dense operational work, not an abstract component inventory. These production screens show how shared decisions supported vehicles, maintenance, settings and tablet use.',
    artefacts: [
      {
        src: '/screenshots/bs/bs_desktop_vehicle-list-dark.png',
        alt: 'Vehicle list view in dark theme with filtering and sorting',
        what: 'Vehicle management list: filtering, sorting and dense scanning.',
        why:
          'Fleet operators work through large vehicle sets. Shared table, filter, selection and status patterns made those recurring decisions explicit.',
        contribution:
          'I designed the list patterns and component states and implemented the CSS-driven sticky-column affordance.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'Product implementation evidence; no task-performance study was recorded.',
        state: 'In production'
      },
      {
        src: '/screenshots/bs/bs_desktop_ws-dark.png',
        alt: 'Vehicle worksheet interface in dark theme',
        what: 'The same worksheet in dark theme.',
        why:
          'Both themes use a shared token structure instead of independently maintained screen palettes.',
        contribution:
          'I designed and implemented the theming foundation used by the product UI.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'The screenshots demonstrate the two visual themes; the shared structure is documented from the project implementation.',
        state: 'In production'
      },
      {
        src: '/screenshots/bs/bs_desktop_settings-light.png',
        alt: 'Settings panel in light theme with custom form controls',
        what: 'Settings with custom form controls.',
        why:
          'Forms made validation, states and action hierarchy reusable rather than feature-specific.',
        contribution: 'I designed the form patterns and documented their intended use.',
        evidenceClass: 'OUTPUT',
        state: 'In production'
      },
      {
        src: '/screenshots/bs/bs_tablet_ws-light.png',
        alt: 'Tablet layout of the worksheet interface in light theme',
        what: 'Worksheet on tablet.',
        why:
          'The same product foundation had to support field use and a smaller working surface.',
        contribution: 'I defined the responsive behaviour for the shared patterns.',
        evidenceClass: 'OUTPUT',
        state: 'In production'
      }
    ]
  },

  systemEvidence: [
    {
      heading: 'Product needs shaped the system',
      paragraphs: [
        'The foundations grew from recurring work such as date selection, vehicle and tyre configuration, dense lists, worksheets and forms. That kept the system connected to real workflow constraints instead of optimising for a generic component catalogue.',
        'Patterns were standardised when behaviour genuinely repeated. Workflow-specific decisions stayed local when a generic abstraction would have made expert work slower or less clear.'
      ]
    },
    {
      heading: 'A CSS architecture designed for shared work',
      paragraphs: [
        'The shared style library followed <strong>eight ITCSS layers</strong>. Settings and tools emitted no CSS; generic, element, object, component, utility and trump layers then increased in explicitness and specificity.',
        'BEMIT connected placement and naming: ITCSS decided where a rule belonged, while BEM made its role readable in the selector. <code>.o-</code> prefixed layout objects, <code>.c-</code> UI components and <code>%u-</code> utility placeholders. Within a block, <code>__</code> marked an element, <code>--</code> a modifier and responsive variants added suffixes such as <code>@md</code>.',
        'Utilities remained SCSS placeholders by default and became runtime <code>.u-</code> classes only where template composition required them. Stylelint reinforced naming and specificity constraints so the architecture did not depend on reviewer memory.'
      ],
      visual: {
        kind: 'code',
        language: 'SCSS',
        label: 'ITCSS + BEMIT map',
        code: [
          'libs/styles/',
          '├── 1-settings/     tokens and SCSS maps',
          '├── 2-tools/        mixins and functions',
          '├── 3-generic/      reset, normalize and box sizing',
          '├── 4-elements/     bare HTML elements',
          '├── 5-objects/      undecorated layout patterns',
          '├── 6-components/   product UI components',
          '├── 7-utilities/    generated helpers and placeholders',
          '└── 8-trumps/       controlled overrides and Storybook chrome',
          '',
          '// Namespaces declared in settings',
          "$bs-objects:    '.o-';   // layout objects",
          "$bs-components: '.c-';   // product UI components",
          "$bs-utilities:  '%u-';   // placeholder until extended",
          '',
          '// prefix + block__element--modifier@breakpoint',
          '.o-flex__item--6@md',
          '.typo__bold--xl--xl',
          'animation__entry--fade-in'
        ].join('\n'),
        caption:
          'The folder determines cascade responsibility; the selector communicates object, element, modifier and—when present—responsive breakpoint.'
      }
    },
    {
      heading: 'CSS → TypeScript → selected Storybook foundations',
      paragraphs: [
        'CSS custom properties were the authoritative source for foundation values. TypeScript utilities read selected values from the live CSSOM and populated Storybook swatches, tables and interactive examples.',
        'The colour nomenclature reused BEM-like separators as a parser contract: <code>--color--{category}--{subcategory}__{property}</code>. Repeated <code>--</code> segments expressed the semantic hierarchy; <code>__</code> isolated the final property. That consistency let the parser validate a name and place its computed value in the corresponding Storybook group.',
        'The Storybook workspace contained <strong>39 story files and 51 MDX pages</strong>. Not every page was generated, but the foundation pages that read production CSS reduced duplicate maintenance and the risk of documentation drift.'
      ],
      visual: {
        kind: 'code',
        language: 'CSS + TypeScript',
        label: 'Nomenclature → computed output',
        code: [
          '// 1. The name carries semantic coordinates.',
          '--color--{category}--{subcategory}__{property}',
          '',
          '--color--palette--base__primary',
          '--color--generic--background__surface',
          '--color--component--button__background-primary',
          '--color--status--hover__typo',
          '',
          '// 2. getColors() validates and groups the live CSSOM.',
          'if (!/^--color--.+-[^-]+__.*$/.test(varName)) return;',
          '',
          "const [path] = varName.split('__');",
          "const [, , category, subcategory] = path.split('--');",
          '',
          "acc[category][subcategory][`var(${varName})`] =",
          '  getComputedStyle(document.body).getPropertyValue(varName);',
          '',
          '// 3. Representative computed output.',
          'const colors = {',
          '  palette: {',
          '    base: {',
          "      'var(--color--palette--base__primary)': 'rgb(226, 0, 26)',",
          "      'var(--color--palette--base__secondary)': 'rgb(19, 19, 25)',",
          "      'var(--color--palette--base__success)': 'rgb(82, 196, 26)',",
          "      'var(--color--palette--base__cyan)': 'rgb(19, 194, 194)'",
          '    }',
          '  }',
          '};'
        ].join('\n'),
        caption:
          'The output shows exact documented base variables. Generic, component and status tokens follow the same grouping after the browser resolves their values.'
      }
    },
    {
      heading: 'Shared themes and modern CSS',
      paragraphs: [
        'Fifteen base hues supported broader semantic palettes for light and dark themes. The public screens show both themes; the exact derived-token total remains intentionally unpublished until the counting scope is reconciled.',
        'For selected interactions, modern CSS replaced application-level JavaScript—for example scroll-driven animation for sticky-column shadows and style queries for theme behaviour. This reduced implementation code without turning the technology itself into the product story.'
      ],
      visual: {
        kind: 'code',
        language: 'CSS',
        label: 'Composable color mixes',
        code: [
          ':root {',
          '  --color--secondary__shade-9: var(--color--mix) 10%;',
          '  --color--secondary__shade-4: var(--color--mix) 90%;',
          '',
          '  --color--generic--background__odd: color-mix(',
          '    in srgb,',
          '    var(--color--palette--base__secondary),',
          '    var(--color--secondary__shade-2)',
          '  );',
          '}'
        ].join('\n'),
        caption:
          'Shade tokens store relationships rather than duplicate colours; semantic tokens compose them at runtime for both themes.'
      }
    },
    {
      heading: 'Governance extended beyond the repository',
      paragraphs: [
        'Storybook carried component anatomy, best practices and contribution guidance. Pairing and pull-request review connected those references to implementation decisions while the system was still maturing.',
        'When the team expanded, onboarding and Figma branch review made change proposals visible. The goal was not to keep one designer in control; it was to make the reasoning reviewable by more people.'
      ],
      visual: {
        kind: 'image',
        src: '/screenshots/bs/bs_desktop_storybook-tag.png',
        alt: 'FleetBridge Storybook Tag component page showing usage, states and implementation guidance',
        caption:
          'A production Storybook component page combining usage guidance, state examples and implementation reference.'
      }
    }
  ],

  validation: {
    method: [
      'A reverse-diamond loop: business-defined requirements → prototype and delivery → later insight and improvement',
      'Recurring UI issues reviewed in pull requests, demos and retrospectives',
      'Implementation-time pairing and coaching with front-end developers',
      'Stakeholder walkthroughs of complex product patterns before and during delivery',
      'Storybook accessibility checks, visual regression and CSS lint rules as implementation safeguards'
    ],
    observed: [
      'Late pull-request correction created substantial rework and made design a bottleneck',
      'Developers began asking for design and HTML/CSS input before the review stage',
      'Stakeholders could see a qualitative difference when complex workflows reused documented patterns',
      'Team expansion exposed the limits of informal, trust-based design governance'
    ],
    changed: [
      'Support moved earlier through pairing, coaching and reusable guidance',
      'Recurring decisions moved into product patterns, Storybook and implementation rules',
      'Stakeholders allocated dedicated time and resources to the design system',
      'Onboarding and Figma branches created an explicit review path for distributed design work'
    ],
    limitations:
      'These are implementation and team-workflow observations. No formal pre/post baseline was captured for task success, defects, review time, delivery speed, adoption or autonomy.'
  },

  outcomes: {
    user: [],
    team: [],
    system: [],
    learning: [
      'A review gate can expose a missing system, but it should remain a temporary diagnostic—not the operating model.',
      'Demonstration changed the investment decision where explanation alone did not.',
      'The most useful documentation moves decisions earlier, before code reaches review.',
      'Governance that works through trust at small scale must become explicit as contributors and locations multiply.'
    ]
  },

  metrics: [
    {
      value: '39 + 51',
      label: 'Story files + MDX pages in the recorded Storybook workspace',
      confidence: 'verified',
      evidenceNote:
        'Internal workspace inventory; selected foundation pages—not every page—were populated from production CSS.'
    },
    {
      value: '15',
      label: 'base hues used to derive broader semantic palettes',
      confidence: 'verified',
      evidenceNote:
        'Internal settings inventory. The total derived-token count is withheld until its counting scope is reconciled.'
    },
    {
      value: '2 themes',
      label: 'light and dark product themes from a shared token structure',
      confidence: 'verified',
      evidenceNote: 'Supported by implementation records and the paired product screenshots in this case.'
    }
  ],

  evidenceStatus: {
    intro:
      'The strongest evidence combines implementation artefacts with first-hand workflow observations. Quantified business or usability impact was not measured, so organisational claims stay explicitly qualitative.',
    claims: [
      systemFoundationClaim,
      productPatternClaim,
      workflowShiftClaim,
      investmentClaim,
      governanceClaim
    ],
    measurementNote:
      'No formal pre/post baseline was captured, so the published metrics describe implementation scope rather than speed, quality or business impact.'
  },

  reflection: {
    repeat: [
      'Diagnose recurring quality problems as a system gap rather than an individual failure.',
      'Earn credibility through real product patterns before broadening the system.',
      'Connect design guidance to implementation through Storybook, code review and pairing.',
      'Make governance explicit as soon as team growth changes the collaboration model.'
    ],
    change: [
      'Negotiate mandate, ownership and measurement into the initial backlog instead of building the case retroactively.',
      'Define the pull-request gate as temporary from the start, with a clear path toward distributed review.',
      'Capture baselines for defects, review effort, delivery time and independent system use.',
      'Grow contribution ownership earlier so system maintenance is not concentrated in one person.'
    ],
    next:
      'The next evidence upgrade for this case is not another output count: it is a traceable example of one pattern reused across workflows, contributor activity, and a before/after review or defect baseline.'
  },

  connection: {
    title: 'Product craft under harder constraints',
    description:
      'Before Bridgestone, the same designer-engineer combination shipped a <strong>safety-critical device interface</strong> at Trasis—where ambiguity was not an option.',
    buttonText: 'Read the Trasis QC1 case',
    href: '/work/trasis'
  }
};
