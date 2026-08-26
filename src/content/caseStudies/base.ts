import { CaseStudy } from '../types';
import { baseCard } from './cards';

export const baseStudy: CaseStudy = {
  card: baseCard,

  seo: {
    title: 'Base — Front-End Foundations for High-Traffic Telecom Sites | Daniel Bodi Gil',
    description:
      'UI engineering origins: cross-browser component work in AEM for Base and JIM Mobile, a custom Flexbox/BEM grid with legacy fallbacks, and tooling that removed compile cycles.'
  },

  impactStatement:
    'Front-end iteration was decoupled from Java compile cycles, and layouts moved to a Flexbox/BEM grid that outlived the engagement.',

  hero: {
    summary:
      'Two years inside Base\u2019s operations with Design is Dead, building pixel-accurate, cross-browser components for high-traffic telecom sites.',
    role: 'UI developer — pixel-accurate implementation, cross-browser compatibility, AEM component authoring.',
    period: '2016 – 2018 · at Design is Dead/Emakina',
    team: '2 UI developers, 4 full-stack and 2 back-end developers, 2 testers, an architect, a scrum master, a business analyst and a UX designer.',
    context:
      'Belgian telecom operator. High-traffic public websites for Base and JIM Mobile, authored in Adobe Experience Manager.',
    stack: ['HTML/LESS · BEM', 'AngularJS', 'AEM', 'Java build chain', 'Git'],
    image: {
      src: '/screenshots/base/base-custom-layout.png',
      alt: 'Custom list and container components built for the Base website',
      what: 'Custom components: lists and picture containers, authorable in AEM.',
      why: 'Content editors assembled pages from these blocks — they had to be robust in any combination.',
      contribution: 'Built the components and their cross-browser behaviour.',
      state: 'Shipped'
    }
  },

  recruiterSummary: {
    challenge:
      'High-traffic telecom sites that could not afford to break — including on legacy Internet Explorer — built on a heavy Java/AEM chain where every front-end change required a full compile.',
    ownership: [
      'Pixel-accurate, cross-browser component implementation in AEM',
      'A custom Flexbox grid with legacy-browser fallbacks',
      'npm tooling that removed compile cycles from front-end work'
    ],
    changed: [
      'Layouts moved from float hacks to a Flexbox/BEM grid',
      'Front-end changes auto-reloaded in the browser instead of triggering full builds',
      'Components survived any editor-assembled combination, on any supported browser'
    ],
    evidence: [
      'Shipped across the Base and JIM Mobile properties',
      'The grid pattern was refined and reused in my later engagements'
    ]
  },

  framing: {
    heading: 'Why this mattered',
    paragraphs: [
      'This was my first senior, systematic team — the crew introduced me to <strong>BEM</strong> and to Scrum practised properly, and it is where "designer who codes" hardened into an engineering discipline. The sites served serious traffic, content authors assembled pages freely in <strong>AEM</strong>, and the browser support matrix still included old Internet Explorer.',
      'I arrived with five years of making things work in hostile browser combinations, and left with the systematic habits that every later engagement builds on.'
    ]
  },

  ownership: [
    {
      verb: 'Implemented',
      items: [
        'Custom components for Base and JIM Mobile: lists, containers, sliders, a canvas-based animated header',
        'The custom Flexbox grid, BEM-compliant, with fallbacks for legacy IE',
        'npm scripts enabling browser auto-reload on front-end changes'
      ]
    },
    {
      verb: 'Documented',
      items: ['Component behaviour and grid usage for the team and content authors']
    },
    {
      verb: 'Team outcome',
      items: ['Site delivery by the full embedded team; designs by the UX designer']
    }
  ],

  constraints: {
    items: [
      {
        constraint: 'The browser support matrix still included legacy Internet Explorer.',
        soWhat:
          'Engineered Flexbox fallbacks so layouts stayed consistent down to old IE instead of retreating to float grids.'
      },
      {
        constraint: 'Every front-end change triggered a full Java/AEM compile — even pure CSS tweaks.',
        soWhat: 'Researched and wired npm auto-reload scripts the whole team adopted.'
      },
      {
        constraint: 'Content editors assembled pages freely in AEM.',
        soWhat: 'Built components robust in any editor-assembled combination.'
      }
    ],
    limitedBy:
      'I was a UI developer in an embedded team: designs were owned by the UX designer and delivery by the full team.'
  },

  decisions: [
    {
      id: 'decision-flex-grid',
      title: 'A Flexbox grid when Flexbox support was still uneven',
      tension:
        'Float grids were the safe default, but they generated hacks; Flexbox was the future but had gaps in the required browser matrix — including old IE.',
      alternatives: [
        'Stay on the float grid',
        'A Flexbox grid with engineered fallbacks for weak browsers'
      ],
      evidence: 'Support tables per browser, plus the recurring cost of float hacks in real components.',
      decision: 'Build the Flexbox/BEM grid from scratch and invest in fallbacks where support failed.',
      tradeOff: 'Fallback engineering effort for a shrinking browser population.',
      result:
        'Future-proof layouts that stayed consistent down to legacy IE — and a grid pattern I carried into later projects.',
      resultState: 'Shipped'
    },
    {
      id: 'decision-tooling',
      title: 'Remove the compile cycle from front-end work',
      tension:
        'The Java/AEM chain required a full compile for every change — even pure CSS tweaks — throttling all front-end iteration.',
      alternatives: [
        'Accept the workflow as the cost of the stack',
        'Research and wire npm scripts for browser auto-reload on front-end changes'
      ],
      evidence: 'Minutes lost per change, dozens of changes per day, multiplied across the front-end team.',
      decision: 'The npm auto-reload workflow, adopted by the team.',
      tradeOff: 'A parallel tool layer to maintain alongside the official build.',
      result: 'Front-end iteration decoupled from compilation — a daily quality-of-life and speed win.',
      resultState: 'Shipped'
    }
  ],

  influence: {
    aligned: [
      'The front-end work on one Flexbox/BEM grid and component convention across the Base and JIM Mobile brands'
    ],
    convinced: [
      'The team adopted the npm auto-reload workflow alongside the official Java build'
    ],
    changed: [
      'Front-end iteration ran without compile cycles, across the embedded team',
      'The grid and component patterns outlived the engagement and seeded my later grid work at Sopra'
    ]
  },

  craft: {
    intro: 'Shipped component work from the Base and JIM Mobile sites.',
    artefacts: [
      {
        src: '/screenshots/base/base-interactive-dynamic-settings.png',
        alt: 'Canvas-based animated header with custom subscription plan sliders',
        what: 'Interactive components: canvas wave header and subscription sliders.',
        contribution: 'Built the interactions and their responsive behaviour.',
        state: 'Shipped'
      },
      {
        src: '/screenshots/base/base-icustom-slider-component-example.png',
        alt: 'JIM Mobile custom slider component',
        what: 'JIM Mobile slider: the modular component approach applied to a second brand.',
        contribution: 'Built as a reusable, brand-themable component.',
        state: 'Shipped'
      }
    ]
  },

  outcomes: {
    user: [
      { text: 'Consistent, working experiences across the supported browser matrix — including legacy IE.' }
    ],
    team: [
      { text: 'Front-end iteration without compile cycles, adopted across the embedded team.' }
    ],
    system: [
      { text: 'A reusable Flexbox/BEM grid and component patterns that outlived the engagement — and seeded my later grid work at Sopra and beyond.' }
    ],
    learning: [
      'Systematic conventions (BEM, componentisation) are what let quality survive scale and staff changes.',
      'Developer experience is leverage: the auto-reload workflow made everyone faster, every day.'
    ]
  },

  reflection: {
    repeat: ['Investing in team tooling, not just team output.'],
    change: ['Push component documentation further — conventions lived partly in people\u2019s heads.']
  },

  connection: {
    title: 'From foundations to ecosystems',
    description:
      'Ten years later, the same systematic instinct supports product and design-system work across an inherited healthcare ecosystem at <strong>Solidaris</strong>.',
    buttonText: 'Read the Solidaris case',
    href: '/work/solidaris'
  }
};
