import React from 'react';
import { ProjectTemplate } from './ProjectTemplate';
import { Image } from '../ui/components/image/Image';

export function BaseProject() {
  const galleryImages = [
    {
      src: "/screenshots/base/base-custom-layout.png",
      alt: "Example of custom components built for Base website",
      description: "Example of custom components we built: lists, and containers with pictures for Base website"
    },
    {
      src: "/screenshots/base/base-interactive-dynamic-settings.png",
      alt: "Custom slider component for Base website",
      description: "Advanced interactive components: canvas-based wavy animation header with custom subscription plan sliders"
    },
    {
      src: "/screenshots/base/base-icustom-slider-component-example.png",
      alt: "Jim Mobile custom slider component",
      description: "Jim Mobile custom slider component showcasing our modular approach to component development"
    }
  ];

  const designSkills = [
    { name: 'Photoshop', icon: '/skill-icons/photoshop.svg' },
    { name: 'Illustrator', icon: '/skill-icons/illustrator.svg' }
  ];

  const devSkills = [
    { name: 'HTML', icon: '/skill-icons/html.svg' },
    { name: 'SCSS', icon: '/skill-icons/css.svg' },
    { name: 'TS', icon: '/skill-icons/ts.svg' },
    { name: 'Git', icon: '/skill-icons/git.svg' }
  ];

  const teamMembers = [
    { role: 'UI Developers', count: 2 },
    { role: 'Full-stack', count: 4 },
    { role: 'Back-End', count: 2 },
    { role: 'Testers', count: 2 },
    { role: 'Architect', count: 1 },
    { role: 'Scrum Master', count: 1 },
    { role: 'Business Analyst', count: 1 },
    { role: 'UX Designer', count: 1 }
  ];

  const platforms = [
    { name: 'Desktop', icon: '/skill-icons/desktop.svg' },
    { name: 'Tablet', icon: '/skill-icons/tablet.svg' },
    { name: 'Mobile', icon: '/skill-icons/mobile.svg' }
  ];

  const caseSummaryData = [
    {
      challenge: {
        title: "Heavy Development Process",
        description: [
          "Java backend with Angular JS and LESS required compilation for every code change.",
          "Inefficient workflow slowed down front-end development."
        ]
      },
      solution: {
        title: "Streamlined Development Workflow",
        description: [
          "Added NPM scripts to enable auto-reloads on browser changes.",
          "Eliminated need for compilation on front-end code changes.",
          "Improved efficiency and quality of life while developing."
        ]
      }
    },
    {
      challenge: {
        title: "Outdated Grid System",
        description: [
          "Float-based grid system lacked flexibility.",
          "Limited browser support for modern layout techniques."
        ]
      },
      solution: {
        title: "Modern Flexible Layout System",
        description: [
          "Introduced custom Flexbox-based grid designed from scratch.",
          "Implemented BEM methodology for better organization.",
          "Created fallbacks for older browsers like IE."
        ]
      }
    }
  ];

  const projectImpact = [
    { value: '75%', label: 'Layout Speed & Quality' },
    { value: '95%', label: 'Cross-Browser (Yes, even IE8!)' },
    { value: '3', label: 'Base Brand Websites' }
  ];

  const challenges = [
    {
      id: 'experience',
      title: 'The start of a new journey',
      content: [
        'This was my first taste of what a truly senior team looks like. The Design is Dead crew didn\'t just write code—they had systems, methodologies, and a level of teamwork I\'d never experienced. They introduced me to BEM (which became my prefered CSS methodology) and showed me what Scrum actually looks like when done right.',
        'The contrast with my previous work experiences was clear. Suddenly, I wasn\'t just a designer who could code—I was part of a machine that delivered consistent, high-quality work at scale. This was where I realized my hybrid skills weren\'t just useful; they were essential.',
        'But it wasn\'t just about learning. I brought valuable experience from 5 years of making things work across challenging browser combinations, and I was ready to share that hard-won knowledge. The team leaned heavily on UI and front-end work, which played right into my strengths.'
      ]
    }
  ];

  const solutions = [
    {
      id: 'contributions',
      title: 'My Contributions',
      content: [
        '<h4 id="grid-system" class="text-xl font-semibold mb-4">New Grid System</h4><div class="space-y-4 text-gray-400"><p>I contributed by introducing a <strong>new grid system</strong>, replacing their float-based grid system with a <strong>custom Flexbox-based grid</strong>, designed from scratch, that would be the base for improved versions in my future experiences.</p><p>This grid followed the <strong>BEM methodology</strong>, offering greater flexibility, and making the layouts more <strong>future-proof</strong>. The challenge with that new grid was that support was not yet at <strong>100%</strong>, especially in old IE browsers, but I found solutions to apply alternatives when support was bad, and I put a lot effort on making the experience working as well as possible and consistent on these old and limited browsers.</p></div>',
        '<h4 id="dev-process" class="text-xl font-semibold mb-4">Improved Development Process</h4><div class="space-y-4 text-gray-400"><p>Another contribution I made was also linked to the front-end: Our tech stack was <strong>Java backend</strong>, <strong>Angular JS</strong>, and <strong>LESS</strong> for the CSS, all that produced content for the CMS <strong>AEM</strong>. The dev process was really heavy (having to compile even on front-end at every code change).</p><p>To ease this heavy process, I started to do some research, and I ended by adding <strong>NPM scripts</strong> to enable <strong>auto-reloads</strong> on our browser at every modification, avoiding compilation on front end code changes, improving <strong>efficiency and quality of life</strong> while developing.</p></div>'
      ]
    }
  ];

  const detailedImageFeatures = {
    0: [
      'Consistent design language implementation',
      'Secure authentication flow',
      'Responsive layout for various screen sizes'
    ],
    1: [
      'Clear transaction history visualization',
      'Intuitive date filtering and search',
      'Accessible data presentation'
    ],
    2: [
      'Streamlined payment creation workflow',
      'Form validation and error handling',
      'Progressive disclosure of complex options'
    ]
  };

  const projectConnection = {
    title: 'What came next?',
    description: 'The systematic thinking I learned here became crucial when I moved to <strong>Sopra Banking</strong>, where I had to teach these methodologies to junior developers.',
    buttonText: 'Next Project →',
    href: '/projects/sopra'
  };

  const heroImage = {
    src: "/screenshots/base/base-custom-layout.png",
    alt: "Example of custom components built for Base website",
    description: "Modern login interface showcasing the improved design system"
  };

  const additionalSections = undefined;

  return (
    <ProjectTemplate
      title="Base"
      pathname="/projects/base"
      projectDescription="Ever wondered what it's like to work inside a Belgian telecom giant's headquarters? I joined <strong>Design is Dead</strong>, <strong>Base's 15-year technical partner</strong>, right in the heart of their operations. We were the team responsible for keeping <strong>Base</strong> and <strong>JIM Mobile's websites</strong> running smoothly—<strong>high-traffic sites</strong> that couldn't afford to break, especially not in <strong>IE8</strong> (yes, that was still a thing)."
      myRole="I specialized in <strong>pixel-perfect implementation</strong>—ensuring every component looked exactly like the design, worked across every browser (even the ancient ones), and could be drag-and-dropped by content authors in <strong>Adobe Experience Manager</strong>. Think of me as the bridge between beautiful designs and the harsh reality of <strong>cross-browser compatibility</strong>."
      heroImage={heroImage}
      teamMembers={teamMembers}
      platforms={platforms}
      designSkills={designSkills}
      devSkills={devSkills}
      galleryImages={galleryImages}
      detailedImageFeatures={detailedImageFeatures}
      caseSummaryData={caseSummaryData}
      projectImpact={projectImpact}
      challenges={challenges}
      solutions={solutions}
      projectConnection={projectConnection}
      additionalSections={additionalSections}
    />
  );
} 
