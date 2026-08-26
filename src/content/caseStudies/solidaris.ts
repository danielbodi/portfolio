import { CaseStudy, EvidenceClaim } from '../types';
import { solidarisCard } from './cards';

const researchOutput: EvidenceClaim = {
  id: 'solidaris-research-output',
  evidenceClass: 'OUTPUT',
  claim:
    'Research activities and product prototypes were produced for the iCRM and iShare workstreams, alongside a first iGED interface draft.',
  source: 'August 2026 project account and the anonymised portfolio artefacts shown on this page.',
  scope: 'Product-local research, interaction design and prototype outputs.',
  confidence: 'reported',
  attribution: 'Daniel\u2019s reported work; inherited PrimeNG/Plectrum foundations are excluded.',
  limitation:
    'Participant counts, direct iGED scope and exact build, merge or deployment states are not public.',
  deliveryState: 'Ongoing'
};

const systemOutput: EvidenceClaim = {
  id: 'solidaris-system-output',
  evidenceClass: 'OUTPUT',
  claim:
    'A product-local Figma fork, a small custom component set, repository and Storybook work, ITCSS/BEMIT structure, token-governance material and AI-oriented workflow files were created.',
  source: 'August 2026 project account and schematic portfolio artefacts.',
  scope: 'Working-layer outputs created around three product workstreams.',
  confidence: 'reported',
  attribution: 'Daniel\u2019s additions around an inherited PrimeNG/Plectrum baseline.',
  limitation:
    'Official source-of-truth status, upstream acceptance, independent use and adoption are not claimed.',
  deliveryState: 'Ongoing'
};

const validationBoundary: EvidenceClaim = {
  id: 'solidaris-validation-boundary',
  evidenceClass: 'VALIDATED',
  claim:
    'The project account records a first round of scenario-based iShare prototype testing and a second round prepared around comprehension, navigation and trust.',
  source: 'Solidaris product-domain reference supplied with this update.',
  scope: 'Prototype-level research activity and direction only.',
  confidence: 'reported',
  attribution: 'Daniel designed the prototype comparisons and test framework.',
  limitation:
    'Participant profiles, sample size, scores, final approval and production effects are not published.',
  deliveryState: 'Tested concept'
};

const handoffState: EvidenceClaim = {
  id: 'solidaris-handoff-state',
  evidenceClass: 'IN PROGRESS',
  claim:
    'The wider programme, final documentation, contribution path, next ownership and post-departure measurement remained open at the evidence snapshot.',
  source: 'August 2026 project account.',
  scope: 'Assignment handoff planned for October 2026.',
  confidence: 'reported',
  attribution: 'Programme state, not an outcome attributed to Daniel.',
  limitation:
    'The final handoff recipient and durable adoption were not yet established.',
  deliveryState: 'Ongoing'
};

export const solidarisStudy: CaseStudy = {
  card: solidarisCard,

  seo: {
    title: 'Solidaris \u2014 Extending an Inherited PrimeNG/Plectrum Foundation | Daniel Bodi Gil',
    description:
      'An ongoing product-design and UX-engineering assignment across iCRM, iShare and iGED, separating inherited foundations, product outputs, prototype evidence and unfinished handoff.'
  },

  impactStatement:
    'I connected three product workstreams to an inherited PrimeNG/Plectrum foundation while keeping authorship, maturity and handoff limits explicit.',

  hero: {
    summary:
      'An ongoing UX modernisation across fragmented healthcare tools, combining product research, interaction design, reusable patterns and a design-to-code working layer.',
    role:
      'Consulting scope \u2014 product design, UX architecture, UX engineering and design-system contribution. Official assignment title not published.',
    period: 'October 2025 \u2013 October 2026 \u00b7 wider programme ongoing',
    team:
      'Cegeka consultant embedded client-side, collaborating with product managers, business analysts, engineers and a separately evolving core design team.',
    context:
      'Internal healthcare operations across regional and product boundaries. PrimeNG, Plectrum and the wider consolidation direction predated the assignment.',
    stack: [
      'Figma',
      'Angular',
      'PrimeNG',
      'Plectrum',
      'Storybook',
      'SCSS \u00b7 ITCSS/BEMIT',
      'AI-assisted workflow experiment'
    ],
    confidentialityNote:
      'The visuals are anonymised or recreated with fictional affiliate data. This case does not claim production deployment, organisation-wide adoption or measurable impact where those states are not evidenced.',
    image: {
      src: '/screenshots/solidaris/ishare-affiliate-dossier.png',
      alt: 'Anonymised iShare affiliate dossier prototype with affiliate context, document tracking and a workflow journey',
      what: 'The iShare affiliate dossier prototype.',
      why:
        'It explores one reading surface for affiliate context, documents, status and workflow without duplicating specialist processing tools.',
      contribution: 'Designed the dossier model, information hierarchy and journey treatment.',
      evidenceClass: 'OUTPUT',
      evidenceNote:
        'The portfolio does not present this artefact as a shipped product or as evidence of a user outcome.',
      state: 'Ongoing'
    }
  },

  recruiterSummary: {
    challenge:
      'The work started inside fragmented products and governance, with PrimeNG and Plectrum already selected and the programme still evolving. Employees also had to reconstruct a case from tickets, documents, workflows and specialist systems.',
    ownership: [
      'Research, UX direction and prototypes across the iCRM and iShare workstreams',
      'Product-local design-system additions and reusable enterprise patterns',
      'Repository, Storybook and documentation outputs intended to improve design-to-code continuity'
    ],
    evidenceClaims: [researchOutput, systemOutput, validationBoundary, handoffState]
  },

  framing: {
    heading: 'Working inside an inherited system',
    paragraphs: [
      'PrimeNG had already been selected and <strong>Plectrum already existed</strong> as a Solidaris-branded layer. I did not choose the vendor foundation or create the original system. My assignment was to work within those constraints across iCRM, iShare and a reported iGED scope.',
      'The product problem was wider than any one screen. Employees had to understand one affiliate\u2019s situation across tickets, documents, statuses, workflows and source systems. The design direction therefore focused on a stable reading hierarchy: <strong>context \u2192 summary \u2192 attention \u2192 recent activity \u2192 detail \u2192 action \u2192 source</strong>.',
      'While the contribution path to the core design team was initially limited, I created a product-local bridge: research and prototypes, a Figma fork with a small custom component set, and reported repository/Storybook work. The fork is presented here as a trade-off with divergence risk, not as uncomplicated governance success.',
      'The programme was not complete at the August 2026 evidence snapshot. The case therefore separates concrete outputs, prototype-level validation, unfinished handoff and outcomes that were not yet measurable.'
    ]
  },

  chronology: {
    heading: 'How the work evolved',
    intro:
      'This chronology separates inherited context from my outputs and from work that was still open. Organisational events are not presented as outcomes caused by me.',
    items: [
      {
        period: 'Starting point',
        title: 'Fixed foundations and fragmented workstreams',
        description:
          'PrimeNG, the initial Plectrum layer, product roadmaps and the wider consolidation direction already existed. The products and regions still had different needs and ways of working.',
        label: 'CONTEXT'
      },
      {
        period: 'Early assignment',
        title: 'Research and a recommendation to use Plectrum locally',
        description:
          'I ran reported shadowing, workshops and prototype testing, then recommended building the three product workstreams on the inherited Plectrum direction.',
        label: 'OUTPUT'
      },
      {
        period: 'Limited contribution path',
        title: 'A product-local Figma bridge',
        description:
          'I forked the available Figma system and added a small set of product-specific components. The exact authorisation, upstream path and divergence controls remain part of the private verification backlog.',
        label: 'OUTPUT'
      },
      {
        period: 'During restructuring',
        title: 'Repository, Storybook and design-to-code outputs',
        description:
          'While the core team changed independently, I continued the product work and created reported code, documentation and workflow artefacts. The restructuring is not attributed to my intervention.',
        label: 'OUTPUT'
      },
      {
        period: 'Later collaboration',
        title: 'A more open contribution environment',
        description:
          'The supplied account describes later participation in a more open collaboration model. Formal decision rights, causal attribution and durable governance ownership are not claimed.',
        label: 'CONTEXT'
      },
      {
        period: 'Planned October 2026 handoff',
        title: 'A useful foundation, with ownership still to resolve',
        description:
          'Documentation, contribution rules, next ownership, exact delivery states and post-departure measures still needed to be confirmed before the assignment ended.',
        label: 'IN PROGRESS'
      }
    ]
  },

  ownership: [
    {
      verb: 'Inherited',
      items: [
        'PrimeNG as the component foundation and the original Plectrum layer',
        'The wider Shell/consolidation direction and existing product roadmaps',
        'Organisational restructuring of the core design team'
      ]
    },
    {
      verb: 'Led',
      items: [
        'Product research and UX direction across the iCRM and iShare workstreams',
        'Reframing the interfaces around case comprehension rather than legacy screen structures',
        'Prototype-led conversations about high-risk interaction decisions'
      ]
    },
    {
      verb: 'Designed',
      items: [
        'iCRM ticket inbox, complementary history view and related-object patterns',
        'iShare dossier summary and horizontal/vertical workflow explorations',
        'Readable status semantics and contextual actions for dense expert workflows'
      ]
    },
    {
      verb: 'Implemented',
      items: [
        'Reported product-local repository and Storybook work',
        'ITCSS/BEMIT structure and a small custom component set',
        'Token-governance, contract and AI-oriented workflow artefacts'
      ]
    },
    {
      verb: 'Tested',
      items: [
        'Scenario-based prototype testing described in the project account',
        'Comparison of overview-first and detail-first iShare journey models'
      ]
    },
    {
      verb: 'Influenced',
      items: [
        'Recommended Plectrum for the local product workstreams',
        'Reached out directly to the core design team and offered system-level contribution',
        'Made product and implementation trade-offs concrete through working artefacts'
      ]
    },
    {
      verb: 'In progress',
      items: [
        'Exact upstream status of the Figma fork and custom components',
        'Final Storybook documentation, contribution path and handoff owner',
        'Independent use, adoption and outcome measurement'
      ]
    }
  ],

  constraints: {
    items: [
      {
        constraint:
          'The foundational technology and design-system choices predated the assignment.',
        soWhat:
          'I focused on the remaining leverage: product information architecture, reusable patterns, local implementation evidence and a clearer contribution path.'
      },
      {
        constraint:
          'The initial path into the core design team and its decisions was limited.',
        soWhat:
          'I created a product-local bridge and contacted the core team directly, while accepting the divergence risk of a fork.'
      },
      {
        constraint:
          'Expert users needed density, codes and operational speed rather than a visually dramatic simplification.',
        soWhat:
          'The designs preserved expert information while adding hierarchy, readable interpretations and progressive disclosure.'
      },
      {
        constraint:
          'The assignment was expected to end before the wider programme.',
        soWhat:
          'The case treats documentation, ownership and measurable follow-through as part of the design problem, not as an assumed success.'
      }
    ],
    limitedBy:
      'Exact build/deployment states, upstream acceptance, independent use, final handoff ownership and user or business outcomes were not yet established in the supplied evidence.'
  },

  decisions: [
    {
      id: 'decision-inbox',
      title: 'Keep expert density, change the ticket representation',
      tension:
        'Large ticket cards exposed many fields but hid the latest activity and consumed too much vertical space. A narrow timeline lost the business subject that users recognised.',
      alternatives: [
        'Keep the existing card structure and tune typography',
        'Use a chronological timeline as the primary view',
        'Use a dense master list with the business subject first and latest activity second'
      ],
      evidence:
        'The supplied interaction analysis and iCRM prototypes show repeated generic activities, truncated subjects and the need to keep master-detail speed.',
      decision:
        'Explore a <strong>work-oriented inbox</strong>: subject as the primary identifier, recent activity as secondary evidence, with status, alerts and related requests visible before opening the detail.',
      tradeOff:
        'Less visual richness per row, while the timeline becomes a complementary history view rather than the default.',
      result:
        'A high-fidelity product direction and reusable list pattern; implementation and user outcome are not claimed.',
      resultState: 'Concept',
      visual: {
        src: '/screenshots/solidaris/icrm-inbox.png',
        alt: 'iCRM ticket inbox concept with a dense master list and selected request detail'
      }
    },
    {
      id: 'decision-signals',
      title: 'Give each business object the action it actually needs',
      tension:
        'Tickets, proactive signals and system notifications appeared close together even though one is worked, one is qualified and one is consulted.',
      alternatives: [
        'Keep every object inline in the ticket area',
        'Create separate destinations for every object type',
        'Use contextual drawers with object-specific language and actions'
      ],
      evidence:
        'The product-domain reference distinguishes their business consequences: a notification records delivery, while a proactive signal needs a meaningful result.',
      decision:
        'Explore dedicated contextual drawers and precise action language: qualify a signal, view a notification, work a ticket.',
      tradeOff:
        'Adds a contextual navigation layer and leaves the final business taxonomy dependent on stakeholder confirmation.',
      result:
        'A clearer interaction model represented in concept artefacts, not a shipped behaviour.',
      resultState: 'Concept'
    },
    {
      id: 'decision-journey',
      title: 'Combine workflow overview with expandable detail',
      tension:
        'A horizontal journey made the overall state easy to scan; a vertical journey gave each step room for dates, alerts, documents and actions.',
      alternatives: [
        'Horizontal, overview-first journey',
        'Vertical, detail-first journey',
        'A compact summary paired with expandable detail'
      ],
      evidence:
        'The project account records a first scenario-based test round and a second round prepared around active-step visibility, alert recognition, navigation and trust.',
      decision:
        'Develop the hybrid direction: a compact journey summary for orientation and a vertical structure for detailed work.',
      tradeOff:
        'Two representations of the same process must remain synchronised and accessible.',
      result:
        'A tested concept and prototype direction. Participant counts, scores and final approval are not published.',
      resultState: 'Tested concept',
      visual: {
        src: '/screenshots/solidaris/ishare-journey.png',
        alt: 'iShare workflow concept with a horizontal summary above expandable step detail'
      }
    }
  ],

  influence: {
    aligned: [
      'Product work around a shared vocabulary: case summary, master list, journey, status and contextual drawer',
      'Overview screens with links back to authoritative specialist tools rather than duplicated processing logic'
    ],
    convinced: [
      'Recommended using the inherited Plectrum direction for the local product work',
      'Advocated for a contribution path between product-specific needs and the core design-system work'
    ],
    changed: [
      'The supplied account describes a later move from limited access to more open collaboration; formal governance ownership is not claimed',
      'Concrete prototypes and system artefacts made product and implementation questions inspectable',
      'Durable reuse by other teams and post-departure ownership remained to be measured'
    ]
  },

  craft: {
    intro:
      'These anonymised or recreated artefacts show the product reasoning and working layer. Each one separates evidence class from delivery state; none is used as shorthand for adoption or impact.',
    artefacts: [
      {
        src: '/screenshots/solidaris/icrm-inbox.png',
        alt: 'iCRM affiliate view concept with a ticket inbox and selected request detail',
        what: 'iCRM work-oriented ticket inbox.',
        why: 'Keeps the recognised business subject primary and makes recent activity, status and alerts scannable.',
        contribution: 'Designed the representation model and high-fidelity prototype.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'Implementation and production use are not claimed.',
        state: 'Concept'
      },
      {
        src: '/screenshots/solidaris/icrm-timeline.png',
        alt: 'iCRM chronological history concept beside a selected request detail',
        what: 'A complementary dossier history.',
        why: 'Uses chronology where it adds context without asking generic activities to identify a ticket.',
        contribution: 'Designed the inbox/history relationship.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'Concept artefact; final business validation is not published.',
        state: 'Concept'
      },
      {
        src: '/screenshots/solidaris/ishare-journey.png',
        alt: 'iShare hybrid journey with a horizontal status summary and expandable step detail',
        what: 'The hybrid iShare journey direction.',
        why: 'Balances rapid orientation with room for detailed document and workflow information.',
        contribution: 'Designed the alternatives and the scenario-based comparison framework.',
        evidenceClass: 'VALIDATED',
        evidenceNote: 'Prototype-level testing only; sample, scores and final approval are not public.',
        state: 'Tested concept'
      },
      {
        src: '/screenshots/solidaris/ishare-affiliate-dossier.png',
        alt: 'iShare affiliate dossier prototype with member context, document tracking and workflow',
        what: 'The iShare dossier reading surface.',
        why: 'Brings context, document status and journey information into one legible hierarchy.',
        contribution: 'Designed the information architecture and prototype.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'Exact build and delivery state remain bounded to the artefact shown.',
        state: 'Ongoing'
      },
      {
        src: '/screenshots/solidaris/iged-draft.png',
        alt: 'First iGED interface draft with filters and a dense document list',
        what: 'A first iGED interface draft.',
        why: 'Explores dense document processing on the same visual foundation.',
        contribution: 'Produced the draft shown; broader iGED ownership is not claimed.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'Direct iGED scope, merge and deployment state still require confirmation.',
        state: 'Concept'
      },
      {
        src: '/screenshots/solidaris/token-architecture.svg',
        alt: 'Proposed primitive, semantic and component token tiers with a PrimeNG bridge',
        what: 'A token-governance and PrimeNG bridge model.',
        why: 'Makes the intended relationship between design variables, semantic decisions and vendor tokens inspectable.',
        contribution: 'Defined and documented the proposed mapping approach.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'No automated synchronisation or complete implemented inventory is claimed.',
        state: 'Ongoing'
      },
      {
        src: '/screenshots/solidaris/contracts-index.svg',
        alt: 'AI-oriented component contracts, rules and knowledge-base structure',
        what: 'AI-oriented contracts and working rules.',
        why: 'Documents intended component usage, accessibility constraints and design-to-code boundaries.',
        contribution: 'Designed the schemas and working documentation.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'Independent execution, repeatability and team adoption are not established.',
        state: 'Strategic proposal'
      },
      {
        src: '/screenshots/solidaris/ai-agent-workflow.svg',
        alt: 'Proposed multi-role workflow for research, architecture, implementation and review',
        what: 'A proposed multi-role design-to-code workflow.',
        why: 'Makes responsibilities and review points explicit for AI-assisted work.',
        contribution: 'Defined the role model and orchestration concept.',
        evidenceClass: 'OUTPUT',
        evidenceNote: 'This diagram proves the workflow definition, not reliable operation or adoption.',
        state: 'Strategic proposal'
      }
    ]
  },

  systemEvidence: [
    {
      heading: 'Inherited foundation versus local additions',
      paragraphs: [
        '<strong>PrimeNG and the original Plectrum layer were inherited.</strong> The supplied account attributes the product-local Figma fork, a small custom component set, repository/Storybook work and ITCSS/BEMIT structure to my assignment.',
        'The exact upstream status matters: a fork can unblock delivery, but it can also create a shadow system. The portfolio therefore does not claim that the fork or custom components became the official shared source.'
      ]
    },
    {
      heading: 'Reusable enterprise patterns',
      paragraphs: [
        'The product work identified recurring solutions such as affiliate context, case summaries, rich master lists, status semantics, workflow journeys, related-object navigation and contextual drawers.',
        'The design principle was selective: use PrimeNG primitives directly when the inherited system is sufficient; add a thin facade or composed product pattern only when a recurring business or accessibility need justifies it.'
      ]
    },
    {
      heading: 'AI-assisted workflow as an output, not an outcome',
      paragraphs: [
        'Contract schemas, rules, skills and a multi-role workflow are presented as <strong>working artefacts</strong>. They describe intended component use, token boundaries, accessibility expectations and review responsibilities.',
        'Without a traceable execution, failure correction, repeatability and independent use, this case does not call the system AI-ready, deterministic, adopted or production-grade.'
      ]
    }
  ],

  validation: {
    method: [
      'Reported shadowing and workshops to understand product purpose and operational context',
      'Scenario-based prototype tasks rather than preference-only questions',
      'Observation paired with five-point ratings tied to concrete comprehension and navigation tasks'
    ],
    observed: [
      'The first iShare round reportedly found that workflow steps needed more prominence',
      'Related information and alerts needed stronger visibility',
      'Previous/next navigation was not always noticed'
    ],
    changed: [
      'The journey direction gave the active step and alerts stronger emphasis',
      'Navigation remained visible between steps',
      'A second round was prepared around comprehension, navigation and trust'
    ],
    limitations:
      'Participant count, participant profiles, per-round scores, approver, final delivery state and production outcomes are not published. The findings remain prototype-level evidence from the supplied project account.'
  },

  outcomes: {
    user: [],
    team: [],
    system: [],
    learning: [
      'In inherited systems, authorship has to be explicit: extending a foundation is different from creating it.',
      'A product-local fork can create momentum and risk at the same time; upstream ownership is part of the design.',
      'In expert tools, the goal is not to remove complexity but to make it legible and progressively available.',
      'AI-oriented documentation is an output until real execution, maintenance and independent use show an outcome.'
    ]
  },

  evidenceStatus: {
    intro:
      'The strongest available evidence is the work itself and the supplied project account. The classes below prevent an artefact, a positive reaction or an unfinished handoff from being presented as an outcome.',
    claims: [researchOutput, systemOutput, validationBoundary, handoffState],
    measurementNote:
      'No user, delivery, adoption or business outcome is claimed at the August 2026 evidence snapshot. Before stronger publication, the next owners should confirm exact build states, independent users, contribution ownership, handoff acceptance and post-departure measures.'
  },

  reflection: {
    repeat: [
      'Start from each product\u2019s real user question before translating legacy screens.',
      'Prototype high-risk representations and workflows early.',
      'Turn recurring product needs into named patterns while keeping inherited and local ownership visible.'
    ],
    change: [
      'Secure a documented contribution path to the core system before creating a product-local fork.',
      'Record participant profiles, decision approvals and artefact delivery states as the work happens.',
      'Define the handoff owner and adoption measures earlier so durable value can be evaluated before departure.'
    ],
    next:
      'Before the planned October 2026 handoff: confirm the exact state of every artefact, document divergence and contribution rules, name future owners and agree which outcomes will be measured after departure.'
  },

  connection: {
    title: 'The production system evidence behind this approach',
    description:
      'The <strong>Bridgestone</strong> case shows the longer-running design-system and front-end work where production state and team use are better established.',
    buttonText: 'Read the Bridgestone case',
    href: '/work/bridgestone'
  }
};
