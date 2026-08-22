import { CaseStudy } from '../types';
import { solidarisCard } from './cards';

export const solidarisStudy: CaseStudy = {
  card: solidarisCard,

  seo: {
    title: 'Solidaris — An AI-Ready Design System for a Healthcare Ecosystem | Daniel Bodi Gil',
    description:
      'Building Plectrum, a machine-readable design system — token architecture, component contracts and a seven-role AI agent workflow — while modernising the UX of Solidaris\u2019s iCRM, iShare and iGED applications.'
  },

  impactStatement:
    'I made the design system machine-readable — contracts and an agent workflow that keep AI-assisted delivery on-system.',

  hero: {
    summary:
      'Building an AI-ready design system for Solidaris\u2019s internal applications, grounded in a cross-product UX modernisation of iCRM, iShare and iGED.',
    role: 'UX/UI Consultant — UX architecture, UX engineering, design systems and prototyping. Sole embedded Cegeka consultant.',
    period: 'October 2025 – October 2026 · ongoing',
    team: 'Embedded alone client-side, working directly with product owners, business analysts and Angular developers.',
    context:
      'Belgian health insurance fund. Internal tools used daily by front-office and back-office employees for healthcare and insurance casework.',
    stack: ['Figma', 'Angular', 'PrimeNG', 'Plectrum', 'Storybook', 'SCSS · ITCSS/BEMIT', 'MCP · AI agents'],
    confidentialityNote:
      'Screens on this page are high-fidelity mockups and prototypes using fictional affiliate data, plus schematic diagrams. Production data, real affiliate information and internal identifiers are not shown.',
    image: {
      src: '/screenshots/solidaris/ishare-affiliate-dossier.png',
      alt: 'iShare affiliate dossier: affiliate header with alerts and identifiers, document-tracking list with status tags, and the workflow journey panel',
      what: 'The iShare affiliate dossier — high-fidelity mockup coded with the Plectrum design system.',
      why: 'One reading surface answers "what is the state of this case?": affiliate header, document tracking and the workflow journey, without reassembling fragments across applications.',
      contribution: 'I designed the dossier model and the journey, and built the mockup on Plectrum.',
      state: 'Ongoing'
    }
  },

  recruiterSummary: {
    challenge:
      'The teams ship daily with AI coding assistants on one design system — documentation written only for humans meant every AI-generated pull request was a drift vector. At the same time, employees reconstructed an affiliate\u2019s situation from fragmented tickets, documents and workflows across applications.',
    ownership: [
      'Plectrum design-system strategy: token architecture, patterns and AI-ready governance',
      'Sole embedded consultant across iCRM, iShare and iGED integration',
      'UX architecture, prototyping and scenario-based user testing'
    ],
    changed: [
      'A machine-readable governance layer: component contracts, rules, skills, protocols and a seven-role agent workflow',
      'A shared case-reading model: context, summary, attention, recent activity, detail, action, source',
      'iCRM tickets became a work-oriented inbox; iShare reframed to affiliate-dossier comprehension with a hybrid journey'
    ],
    evidence: [
      '170+ Figma variables mapped 1:1 into a three-tier token architecture',
      'Two apps I redesigned on Plectrum; 10+ more of the estate awaiting the same system',
      'iShare and iGED running as high-fidelity mockups coded on Plectrum',
      'Task-based user testing on the iShare journey models'
    ]
  },

  framing: {
    heading: 'Why this mattered',
    paragraphs: [
      'Solidaris\u2019s development teams use AI coding assistants every day — and a design system documented only for humans is invisible to those assistants.',
      'Every AI-generated pull request then erodes consistency: hardcoded hex values, wrong component choices, off-system spacing. The design system itself had to become <strong>machine-readable</strong>, or it would drift faster than anyone could govern it.',
      'The system exists to serve real work. Employees answer affiliates about cases that span <strong>iCRM</strong> (contacts and tickets), <strong>iShare</strong> (documents and process journeys) and <strong>iGED</strong> (operational document processing). The task rarely respects product boundaries — but the tools did, so employees mentally reassembled each case from disconnected screens full of truncated titles, unclear statuses and overlapping concepts.',
      'These are expert users doing repetitive, information-heavy work; a visually dramatic redesign would reduce productivity. The success criteria were precise: an employee should understand the state, history and next step of a case quickly — and every recurring solution should land in <strong>Plectrum</strong> as a reusable, machine-documented pattern.'
    ]
  },

  ownership: [
    {
      verb: 'Led',
      items: [
        'Reframing each application around the question its users actually ask',
        'Cross-product information architecture and navigation responsibilities (shell, app, tabs, steps, drawers)',
        'The design-system pattern strategy: which solutions become reusable Plectrum patterns'
      ]
    },
    {
      verb: 'Designed',
      items: [
        'iCRM: work-oriented ticket inbox, complementary timeline, proactivity and notification drawers',
        'iShare: dossier summary and the hybrid horizontal/vertical workflow journey',
        'Status semantics and readable interpretations alongside expert codes'
      ]
    },
    {
      verb: 'Implemented',
      items: [
        'Three-tier token architecture with PrimeNG CSS-variable bridges',
        'ITCSS/BEMIT styling foundations across the shared libraries',
        'Machine-readable component contracts, rules, protocols and the AI agent workflow'
      ]
    },
    {
      verb: 'Tested',
      items: [
        'Scenario-based user tests combining observation with task-anchored ratings',
        'Comparative evaluation of the horizontal and vertical journey models'
      ]
    },
    {
      verb: 'Influenced',
      items: [
        'Business validation of action labels and result taxonomies for proactive signals',
        'Source-system boundaries: surface context, link to the authoritative tool, never duplicate it'
      ]
    },
    {
      verb: 'Team outcome',
      items: [
        'Angular delivery by the client development teams',
        'Business rules and priorities owned by product owners and analysts'
      ]
    }
  ],

  constraints: {
    items: [
      {
        constraint:
          'The big decisions predated me: the stack (Angular, PrimeNG, the monorepo), the product roadmap and the existence of the design system were all fixed before I arrived.',
        soWhat:
          'I focused on the leverage that remained — how the system is architected, governed and consumed: the token bridge, the contracts, the patterns, the agent workflow.'
      },
      {
        constraint:
          'Sole embedded consultant on the client side: Angular delivery belongs to the client teams, business rules and priorities to product owners and analysts.',
        soWhat:
          'Influence runs through working prototypes and testable decisions — business and interaction questions became testable instead of debatable.'
      },
      {
        constraint:
          'The users are experts doing repetitive, information-heavy work; a visually dramatic redesign would reduce their productivity.',
        soWhat:
          'Reframed each application around the question its users actually ask, instead of translating the legacy UI component for component.'
      },
      {
        constraint:
          'Test participants were reachable only through intermediaries, which slowed iteration rounds.',
        soWhat:
          'Built scenario-based rounds around concrete tasks with anchored ratings, so each session produced actionable findings.'
      }
    ],
    limitedBy:
      'The engagement is ongoing: the client developer teams have not yet adopted the AI governance layer, outcome metrics await approval after October 2026, and several workstreams (iCRM inbox, drawers) remain concepts pending business validation.'
  },

  decisions: [
    {
      id: 'decision-ai',
      title: 'Treat AI assistants as first-class design-system consumers',
      tension:
        'The teams generate code with AI assistants every day. Documentation written for humans is invisible to machines — so every AI-generated pull request was a potential drift vector.',
      alternatives: [
        'A style-guide wiki plus reviewer vigilance',
        'Lint rules alone',
        'A machine-readable contract layer with an orchestrated agent workflow'
      ],
      evidence:
        'Recurring drift patterns in AI-generated code: hardcoded hex values, wrong component choices, off-system spacing, missing accessibility semantics.',
      decision:
        'Every component ships a <strong>TypeScript metadata contract</strong>: usage, anti-patterns, consumed tokens, AI hints. Token contracts mirror Figma variables and PrimeNG mappings, so drift is detectable by script. A knowledge base of <strong>nine rules, four skills and four protocols</strong> defines the constraints and their loading order, over a generated index that maps the codebase. On top of it, a <strong>seven-role agent team</strong> — grounded by Figma and PrimeNG MCP servers — runs research, architecture, engineering and QA.',
      tradeOff: 'Up-front authoring and ongoing maintenance of the governance layer itself.',
      result:
        'In my own AI-assisted delivery, output lands on-system by default: semantic tokens, correct ITCSS placement, BEMIT naming and accessibility semantics on the first pass. Adoption by the client developer teams is the next step.',
      resultState: 'Ongoing',
      visual: {
        src: '/screenshots/solidaris/ai-agent-workflow.svg',
        alt: 'Seven-role AI agent workflow: coordinator, researcher, architect, engineer, developer, tester and auditor in a fan-out/fan-in pipeline'
      }
    },
    {
      id: 'decision-primeng',
      title: 'Theme PrimeNG through its CSS variables, never its DOM',
      tension:
        'Two applications had to share one visual language on top of a vendor component library — without the selector-override wars that make every vendor upgrade a breaking event.',
      alternatives: [
        'Selector overrides and !important on PrimeNG internals',
        'Wrap every PrimeNG component in a custom facade',
        'A CSS-variable bridge plus selective wrapping'
      ],
      evidence:
        'Override-based themes break on vendor upgrades because they depend on internal DOM; wrapping everything creates a maintenance bottleneck every time PrimeNG changes.',
      decision:
        'A three-tier token chain (primitive → semantic → component) where PrimeNG\u2019s own CSS variables are mapped to Plectrum\u2019s semantic tokens, scoped by BEM wrapper in dedicated settings files. Components are wrapped only when a smaller API, defaults or accessibility behaviour justify it.',
      tradeOff:
        'Requires discipline: raw <code>--p-*</code> variables outside the settings layer are treated as audit errors.',
      result:
        'PrimeNG upgrades stop shattering the theme; design decisions live in CSS where designers can read them; a full rebrand is a one-line prefix change.',
      resultState: 'Ongoing',
      visual: {
        src: '/screenshots/solidaris/token-architecture.svg',
        alt: 'Three-tier token architecture: primitive, semantic and component tiers with a PrimeNG bridge'
      }
    },
    {
      id: 'decision-inbox',
      title: 'Represent tickets as a work-oriented inbox, not bigger cards',
      tension:
        'Legacy ticket cards tried to show everything — type, long title, status, dates, indicators, related requests — so titles truncated, cards ate vertical space and the latest action stayed invisible. Users needed both density and comprehension.',
      alternatives: [
        'A denser, conservative ticket list',
        'A business inbox oriented around the latest action',
        'A hybrid master list with an inline activity summary',
        'A compact card timeline in a narrow column'
      ],
      evidence:
        'Analysis of the legacy cards and a timeline variant showed the representation model, not typography, was the problem: generic activities ("Outgoing email") repeat across tickets and cannot be the dominant identifier; a narrow timeline showed even less.',
      decision:
        'A structured list where the business subject stays primary and the latest action becomes a strong secondary element, with status, alerts and related-request indicators scannable without opening items. Master-detail interaction preserved for operational speed.',
      tradeOff:
        'Less visual richness per ticket, and the timeline was demoted to a complementary "history of the dossier" view rather than the default.',
      result:
        'A dossier that reads like a professional inbox: ordered by recent activity, clear about what changed last, dense enough for daily work.',
      resultState: 'Concept',
      visual: {
        src: '/screenshots/solidaris/icrm-inbox.png',
        alt: 'iCRM ticket inbox and webrequest detail in the high-fidelity Figma prototype'
      }
    },
    {
      id: 'decision-signals',
      title: 'Separate proactive signals and notifications from tickets',
      tension:
        'A coloured proactivity block lived inside the ticket area, and system notifications looked like items to process. Three different object types — tickets to work, signals to qualify, notifications to consult — shared one visual identity.',
      alternatives: [
        'Keep everything inline in the ticket area',
        'Separate tabs per object type',
        'Dedicated contextual drawers with object-appropriate actions'
      ],
      evidence:
        'Reconstructing the information model showed a notification is evidence that a message was sent, not a task; a proactive signal needs a recorded business result, not a "treated" flag.',
      decision:
        'Dedicated drawers. Signals get a decision panel — reason, context, expected action and a meaningful result to record ("affiliate informed", "already covered"…). Notifications get delivery-oriented statuses and a "View content" action, not "Process".',
      tradeOff:
        'One more navigation layer, and the result taxonomy requires business validation before implementation.',
      result:
        'Interaction copy now matches consequence: qualify a signal, consult a notification, work a ticket. The recorded result preserves business value a simple flag would lose.',
      resultState: 'Concept'
    },
    {
      id: 'decision-journey',
      title: 'A hybrid workflow journey for iShare',
      tension:
        'Document journeys needed both an at-a-glance answer to "where are we in the process?" and comfortable detailed work on a single step — and the two pull the layout in opposite directions.',
      alternatives: [
        'Horizontal, overview-first stepper',
        'Vertical, detail-first timeline/accordion',
        'A hybrid of both'
      ],
      evidence:
        'Task-based tests: the first round revealed steps lacking prominence, related information needing stronger visibility and navigation buttons being missed. A second round was built around comprehension, active-step visibility, alert recognition, navigation and trust.',
      decision:
        'The hybrid: a compact horizontal journey summary to orient, a vertical expandable structure to work, and persistent previous/next navigation to move confidently.',
      tradeOff: 'Two synchronised representations of the same journey to keep consistent.',
      result: 'The direction consolidated after testing; it also seeded a reusable "case overview" pattern for Plectrum.',
      resultState: 'Validated prototype',
      visual: {
        src: '/screenshots/solidaris/ishare-journey.png',
        alt: 'iShare hybrid journey panel in the coded mockup: horizontal step summary above the expanded step detail'
      }
    }
  ],

  influence: {
    aligned: [
      'Products that previously solved the same problem differently now share a pattern vocabulary: case summary, master list, journey, drawer',
      'Source-system boundaries agreed across products: surface context, link to the authoritative tool, never duplicate it'
    ],
    convinced: [
      'Product owners and analysts — of the object model and the reframing (work-oriented inbox, signals separated from notifications), through working prototypes that made trade-offs concrete',
      'Business validation secured for action labels and result taxonomies on proactive signals'
    ],
    changed: [
      'As the only profile specialised in UX engineering for design systems, designers and managers rely on my vision and decisions for the system\u2019s direction',
      'My AI-assisted delivery follows the design system by default — the rules live in the assistant\u2019s context, ready for the developer teams to adopt',
      'Recurring solutions land in Plectrum as named, machine-documented patterns while the products are still being designed'
    ]
  },

  craft: {
    intro:
      'The system layer first, then the product surfaces it serves. Screens are high-fidelity mockups and Figma prototypes with fictional affiliate data — production screens cannot be shown. iShare and iGED are coded mockups running on Plectrum itself. Each visual is labeled with its delivery state.',
    artefacts: [
      {
        src: '/screenshots/solidaris/contracts-index.svg',
        alt: 'Machine-readable layer: component contract fields and the .ai knowledge base structure',
        what: 'The machine-readable governance layer: contracts, rules, skills, protocols and a generated codebase index.',
        why: 'An AI assistant loads one JSON map and knows what exists and where, instead of grepping and hallucinating.',
        contribution: 'I designed the contract schemas and authored the rules, skills and protocols.',
        state: 'Ongoing'
      },
      {
        src: '/screenshots/solidaris/ai-agent-workflow.svg',
        alt: 'Seven-role AI agent team in a fan-out/fan-in pipeline: coordinator, researcher, architect, engineer, developer, tester, auditor',
        what: 'The seven-role AI agent workflow mirroring a real design-system team.',
        why: 'Research and architecture run in parallel, then engineering, implementation and QA — grounded by Figma and PrimeNG MCP servers so agents query real values instead of guessing.',
        contribution: 'I designed the roles, the orchestration and the MCP grounding.',
        state: 'Ongoing'
      },
      {
        src: '/screenshots/solidaris/token-architecture.svg',
        alt: 'Three-tier token architecture: primitive, semantic and component tiers with a PrimeNG bridge',
        what: 'The three-tier token architecture with the PrimeNG bridge.',
        why: 'Components consume meaning ("brand", "field border"), not raw values — so rebranding, theming and vendor upgrades stay cheap.',
        contribution: 'I defined the architecture and mapped 170+ Figma variables into the settings layer.',
        state: 'Ongoing'
      },
      {
        src: '/screenshots/solidaris/icrm-inbox.png',
        alt: 'iCRM affiliate view in the Figma prototype: work-oriented ticket inbox with status tags and alerts on the left, webrequest detail with linked tickets on the right',
        what: 'The iCRM case-reading model in the high-fidelity Figma prototype: inbox and detail.',
        why: 'The business subject stays primary, the latest action is scannable, alerts read at a glance.',
        contribution: 'I designed the representation model and the prototype.',
        state: 'Concept'
      },
      {
        src: '/screenshots/solidaris/icrm-timeline.png',
        alt: 'iCRM chronological view in the Figma prototype: the same dossier read as a dated history of actions next to the webrequest detail',
        what: 'The complementary timeline: the same dossier read as chronological history.',
        why: 'Generic activities cannot identify tickets — so the timeline became a secondary "history of the dossier" view.',
        contribution: 'I designed the inbox/history toggle and the timeline reading.',
        state: 'Concept'
      },
      {
        src: '/screenshots/solidaris/ishare-journey.png',
        alt: 'iShare journey panel in the coded mockup: horizontal step summary with statuses and previous/next navigation above the expanded step detail',
        what: 'The hybrid document journey in the coded iShare mockup.',
        why: 'Horizontal summary answers "where are we?"; the vertical structure supports the actual work.',
        contribution: 'I designed both models and the task-based tests that selected the hybrid, then built it on Plectrum.',
        state: 'Validated prototype'
      },
      {
        src: '/screenshots/solidaris/iged-draft.png',
        alt: 'iGED document-processing screen: business-domain navigation, filters and a dense document list with reception dates and states — first high-fidelity draft',
        what: 'iGED — first high-fidelity draft, coded with Plectrum.',
        why: 'The third application on the same system: shared tokens and patterns take a new product to a credible screen quickly.',
        contribution: 'I designed and coded the draft on the shared design system.',
        state: 'Concept'
      }
    ]
  },

  systemEvidence: [
    {
      heading: 'A governance layer machines can read',
      paragraphs: [
        'Every component ships a colocated <strong>TypeScript metadata contract</strong>: when to use it, when not to, which tokens it consumes, plus hints that help an AI assistant pick the right component. A parallel token-contract schema records each token\u2019s Figma variable, PrimeNG mapping and change risk — so drift between Figma, code and documentation is detectable by script.',
        'Around the contracts sits a knowledge base with a defined loading order: nine rules, four skills, four protocols with anti-drift tripwires, and a generated codebase index. Scaffolding makes the correct path the laziest path — one command generates a component with its stories, contract and SCSS file in the right layer.'
      ]
    },
    {
      heading: 'Plectrum: tokens, ITCSS and the vendor bridge',
      paragraphs: [
        'The styling foundation is an <strong>8-layer ITCSS architecture</strong> with <strong>BEMIT naming</strong> (<code>c-</code>/<code>o-</code>/<code>u-</code>/<code>is-</code>): layer, file name and class prefix are all derivable from the rule set, so style placement is decidable — by a junior developer or by an AI agent.',
        '<strong>170+ Figma variables</strong> map 1:1 into CSS custom properties across a primitive → semantic → component chain; the entire token prefix is emitted from one SCSS variable, so a full white-label is a one-line change. PrimeNG is themed by assigning the vendor\u2019s own CSS variables from semantic tokens — never by depending on its internal DOM.'
      ]
    },
    {
      heading: 'Reusable enterprise patterns over wrapped primitives',
      paragraphs: [
        'Simple primitives stay direct PrimeNG usage under token control; thin facades exist only where a smaller API or accessibility default pays for itself. The leverage lives in composed <strong>product patterns</strong> — affiliate header, case summary, rich master list, workflow journey, contextual drawers — that encode how Solidaris work is actually performed.'
      ]
    }
  ],

  validation: {
    method: [
      'Realistic scenarios instead of preference questions: identify the current state of a request, find the step requiring attention, locate a reception date, navigate to the next step, explain the situation as if speaking to an affiliate',
      'Observation of completion (with and without help), errors, hesitation, navigation paths and action visibility',
      'Five-point ratings always attached to a concrete task: ease, clarity, status visibility, next-step understanding, confidence, readability'
    ],
    observed: [
      'Workflow steps were not prominent enough in the first iShare round',
      'Related information needed stronger visibility to be trusted',
      'Previous/next navigation controls were not always noticed'
    ],
    changed: [
      'Stronger step prominence and alert visibility in the journey',
      'Persistent, clearly visible previous/next navigation',
      'The hybrid journey consolidated as the direction; a second test round was designed around comprehension, navigation and trust'
    ],
    limitations:
      'Participant counts and per-round scores are not published here; the engagement is ongoing and approved metrics will be added once available (tracked in the content checklist). Findings above come from the first iShare round and stakeholder prototype walkthroughs.'
  },

  outcomes: {
    user: [
      {
        text: 'The state, history and next step of an affiliate case are designed to be readable without reconstructing them across applications — the latest action is visible from the ticket list.'
      },
      {
        text: 'Expert codes (insurability, contribution states) remain for experienced employees, supplemented with human-readable interpretation for newer ones.'
      }
    ],
    team: [
      {
        text: 'Working prototypes made business and interaction decisions testable instead of debatable, and gave stakeholders concrete trade-off discussions.'
      },
      {
        text: 'A shared pattern vocabulary — case summary, master list, journey, drawer — now spans products that previously solved the same problem differently.'
      }
    ],
    system: [
      {
        text: 'Two applications I redesigned — iCRM and iShare — consume one design system, with no duplicated components or token definitions between them.',
        evidenceNote: 'Both consume the same shared UI and styles libraries in the monorepo.'
      },
      {
        text: 'Plectrum is built for the wider internal estate: more than ten further applications are awaiting redesign on the same system.',
        evidenceNote: 'Estimated from the organisation\u2019s application landscape; exact inventory not published.'
      },
      {
        text: 'My AI-assisted delivery lands on-system by default — the rules live in the assistant\u2019s context, not in a wiki nobody loads. Adoption by the client developer teams is the next step.'
      },
      {
        text: 'Every token traces to a Figma variable; drift between design and code is detectable by script rather than by eye.'
      }
    ],
    learning: [
      'Interaction copy is part of the product model: a button label must communicate the consequence of the action ("Qualify", "View content"), not merely sound familiar.',
      'In expert tools, the goal is not to remove complexity but to make it legible — and to reveal it progressively.',
      'A design system documented for machines turns AI assistance from a drift vector into an enforcement vector.'
    ]
  },

  metrics: [
    {
      value: '9 + 4 + 4',
      label: 'rules, skills and protocols governing AI-assisted delivery',
      confidence: 'verified',
      evidenceNote:
        'The knowledge base with its defined loading order and anti-drift tripwires, alongside a per-component TypeScript contract and a generated codebase index.'
    },
    {
      value: '170+',
      label: 'Figma variables mapped 1:1 into the token architecture',
      confidence: 'verified',
      evidenceNote: 'Count of variables in the Plectrum settings layer mirroring the Figma collections.'
    },
    {
      value: '7',
      label: 'specialised AI agents in the delivery workflow',
      confidence: 'verified',
      evidenceNote: 'A coordinator plus six worker roles, defined in parallel for two editors and kept in sync.'
    },
    {
      value: '2 → 10+',
      label: 'apps I redesigned, then the estate queued for Plectrum',
      confidence: 'estimated',
      evidenceNote:
        'iCRM and iShare are the two I personally redesigned. More than ten further internal apps are awaiting redesign on Plectrum; exact inventory not published.'
    }
  ],

  reflection: {
    repeat: [
      'Reframe each product around the user\u2019s question before touching layouts — it prevented a component-for-component translation of the legacy UI.',
      'Prototype the high-risk interactions and test with tasks, not preference.',
      'Fold recurring solutions into the design system as named patterns while the products are still being designed.'
    ],
    change: [
      'Establish the object model (ticket vs. signal vs. notification vs. document) with business stakeholders even earlier — several debates dissolved once it existed.',
      'Push sooner for direct access to test participants; scheduling rounds through intermediaries slowed iteration.'
    ],
    next:
      'Continue implementation across the ecosystem, run the second iShare testing round, and add approved outcome metrics after October 2026.'
  },

  connection: {
    title: 'Where the system discipline comes from',
    description:
      'Six years at <strong>Bridgestone</strong> — building a design system and its front-end foundation from nothing — is what made this ecosystem work possible.',
    buttonText: 'Read the Bridgestone case',
    href: '/work/bridgestone'
  }
};
