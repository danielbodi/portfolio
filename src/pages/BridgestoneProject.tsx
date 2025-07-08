import React from 'react';
import { ProjectTemplate } from './ProjectTemplate';
import { Image } from '../ui/components/image/Image';

export function BridgestoneProject() {
  const galleryImages = [
    {
      src: "/screenshots/bs/bs_desktop_settings-light.png",
      alt: "Settings Panel - Light Theme",
      description: "User settings interface showcasing the light theme implementation with custom form controls"
    },
    {
      src: "/screenshots/bs/bs_desktop_vehicle-list-dark.png",
      alt: "Vehicle List View - Dark Theme",
      description: "Vehicle management interface showing the list view with filtering and sorting capabilities"
    },
    {
      src: "/screenshots/bs/bs_desktop_ws-dark.png",
      alt: "Worksheet Interface - Dark Theme",
      description: "Vehicle worksheet management interface in dark mode with detailed vehicle information"
    },
    {
      src: "/screenshots/bs/bs_desktop_ws-light.png",
      alt: "Worksheet Interface - Light Theme",
      description: "Vehicle worksheet management interface in light mode showing maintenance details"
    },
    {
      src: "/screenshots/bs/bs_tablet_ws-dark.png",
      alt: "Tablet Worksheet View - Dark Theme",
      description: "Responsive tablet layout of the worksheet interface optimized for dark mode"
    },
    {
      src: "/screenshots/bs/bs_tablet_ws-light.png",
      alt: "Tablet Worksheet View - Light Theme",
      description: "Responsive tablet layout of the worksheet interface in light mode"
    },
    {
      src: "/screenshots/bs/bs_tablet_ws2-dark.png",
      alt: "Alternative Tablet Worksheet - Dark Theme",
      description: "Another view of the tablet worksheet interface in dark mode"
    }
  ];

  const designSkills = [
    { name: 'Figma', icon: '/skill-icons/figma.svg' },
    { name: 'Illustrator', icon: '/skill-icons/illustrator.svg' },
    { name: 'Photoshop', icon: '/skill-icons/photoshop.svg' },
    { name: 'Animate', icon: '/skill-icons/animate.svg' }
  ];

  const devSkills = [
    { name: 'Storybook', icon: '/skill-icons/storybook.svg' },
    { name: 'HTML', icon: '/skill-icons/html.svg' },
    { name: 'CSS/SCSS', icon: '/skill-icons/css.svg' },
    { name: 'JS/TS', icon: '/skill-icons/ts.svg' }
  ];

  const teamMembers = [
    { role: 'UI/UX Designers', count: 3 },
    { role: 'Front-End Devs', count: 5 },
    { role: 'Back-End Devs', count: 4 },
    { role: 'Tester', count: 1 },
    { role: 'Architect', count: 1 },
    { role: 'Scrum Master', count: 1 }
  ];

  const platforms = [
    { name: 'Desktop', icon: '/skill-icons/desktop.svg' },
    { name: 'Tablet', icon: '/skill-icons/tablet.svg' }
  ];

  const caseSummaryData = [
    {
      challenge: {
        title: "Missing Design Structure",
        description: [
          "No Initial Design System available nor planned in the backlog.",
          "No official time or resources for creating a new one."
        ]
      },
      solution: {
        title: "Systematic Foundation",
        description: [
          "I reused Ant Design's UI in Figma and documented our components in Storybook.",
          "After showing the difference with and without a proper design system, the business decided to invest time and resources in developing one."
        ]
      }
    },
    {
      challenge: {
        title: "Technical Uncertainty",
        description: [
          "Team not familiar developing from custom designs.",
          "Design to Code translation was difficult."
        ]
      },
      solution: {
        title: "Knowledge Transfer",
        description: [
          "I provided support and coaching to our developers,",
          "structured and implemented methodologies in CSS,",
          "mirrored design foundations into reusable code.",
          "I reviewed pull requests for consistency,",
          "managed a Storybook backlog,",
          "and enhanced Figma handoffs with detailed component documentation."
        ]
      }
    },
    {
      challenge: {
        title: "Limited Resources",
        description: [
          "Tight deadlines and working alone left UX processes quite limited.",
          "Requirements driven by the business and feedback gathered post-development, lead to reactive iterations and redesigns after implementation."
        ]
      },
      solution: {
        title: "Process Adaption",
        description: [
          "To improve user research and testing, I requested designer involvement in business workshops and user testing.",
          "We adapted a reverse \"double diamond\" approach to fit business constraints."
        ]
      }
    }
  ];

  const projectImpact = [
    { value: '40+', label: 'Components & Guidelines' },
    { value: '60%', label: 'Faster Development' },
    { value: 'Unified', label: 'Design Language' }
  ];

  const challenges = [
    {
      id: 'lack-of-design-system',
      title: 'Missing Design Structure',
      content: [
        'I joined the project as sole designer in the team, after it had already started and with the backlog already defined. That meant that I immediately had to deliver prototypes based on these requirements.',
        'Had I been involved from the beginning, I would have prioritized establishing a design system to ensure consistency and scalability. However, due to time and resource constraints, creating a reusable design system in Figma was not feasible.',
        'This was extended even further on the development side, where the lack of a design system made it significantly harder for developers to implement consistent and reusable components, amplifying the risk to the project\'s overall scalability.'
      ]
    },
    {
      id: 'custom-development-challenges',
      title: 'Technical Uncertainty',
      content: [
        'The project required custom designs and components, which the developers were not exactly familiar with building. This led to difficulties in implementing layouts and accurately translating designs into code. The lack of experience with custom components and layouts resulted in additional effort to ensure that designs were integrated correctly.'
      ]
    },
    {
      id: 'limited-research-time',
      title: 'Limited Resources',
      content: [
        'Working as only designer left minimal time for user research, to identify pain points or for user testing to validate solutions. The standard double diamond approach wasn\'t feasible, as the analysis and user story requirements were defined by the business rather than through UX research. While the business had some processes in place to gather feedback, this feedback was mostly received post-development.',
        'This reactive approach often led to iterations and redesigns after features were already designed or even implemented.'
      ]
    }
  ];

  const solutions = [
    {
      id: 'addressing-design-system',
      title: 'Missing Design Structure: Building a Systematic Foundation',
      content: [
        'To overcome the lack of a design system, I decided to reuse an existing UI kit in Figma and chose <strong>Ant Design\'s UI kit</strong>. I went to that direction because Ant Design\'s kit had already <strong>well-structured components</strong>, was easy to customize, and had frequent updates.',
        'Additionally, Ant Design\'s visual style was distinct from <strong>Material Design</strong>, which was already widely used. By reusing Ant Design\'s components and foundations, I was able to <strong>scale and work more efficiently</strong> within my design process.',
        'Gradually, I customized and expanded the kit by adding custom components - always applying the <strong>Atomic methodology</strong> - documentation, and <strong>design tokens</strong> to suit the project\'s specific needs.',
        'On the development side, the front-end team opted for a <strong>fully custom approach</strong> and did not reuse Ant Design\'s code. This divergence required additional collaboration to ensure alignment between design and development despite the differing foundations. That\'s where I proposed and implemented <strong>Storybook</strong>, as our <strong>source of truth</strong> for our foundations, components and documentation for developers, and designers.'
      ]
    },
    {
      id: 'addressing-development',
      title: 'Technical Uncertainty: Establishing Knowledge Transfer',
      content: [
        'To tackle the challenges with custom designs and components, I focused on fostering a positive and supportive relationship with developers. I made myself available to answer any questions, assist with CSS and HTML-related issues, and provide coaching to those struggling with specific implementation challenges. This open line of communication helped build trust and improved our collaboration.',
        'I contributed by structuring the CSS repository, by implementing the <strong>ITCSS methodology</strong> and encouraged adopting the <strong>BEM convention</strong> for consistent and maintainable naming. Additionally, I mirrored <strong>reusable tokens</strong> from Figma into our codebase, covering <strong>typography, spacing, borders, elevations, shadows, and palette systems</strong>. Over time, I extended these tokens into <strong>utility classes</strong>, further enhancing <strong>efficiency, consistency, and alignment</strong> between design and development.',
        'Another important point I started to do to ensure quality, was to actively participate in the development workflow by reviewing pull requests. This allowed me to catch inconsistencies early and provide feedback to maintain alignment with design standards.',
        'Additionally, I managed a parallel backlog specifically for Storybook development. This backlog addressed technical debts, inconsistencies left in the system and new components or foundations development, ensuring long-term scalability and alignment with design principles.',
        'In Figma, I enhanced the handoff process by improving component and layout documentation. This included adding anatomies, usage guidelines, and best practices for components, which developers found valuable.',
        'Initially, the design system development was secondary to other priorities, but its impact on efficiency led to its formal adoption. With the arrival of another designer with a similar skillset, we collaborated building more foundations in both design and development parts of the project, putting some special effort on improving our Storybook. Then recently, a third UI/UX designer joined the team, and we implemented branching and reviewing processes within our design workflows in Figma. This confirmed even more my role as a leader in the design aspect of the project.',
        'Today, the development of our design system in Storybook is still in progress, but it already provides a solid foundation and documentation source, enabling developers and designers to work efficiently in isolation, run tests, and maintain consistency.'
      ]
    },
    {
      id: 'addressing-research',
      title: 'Limited Resources: Adapting Our Process',
      content: [
        'To address the limitations in user research and testing, I requested if at least a designer could be included during business workshops and user testing sessions. This request objective was to get a better insight into user pain points and needs, enabling us to work with more accurate data. The business responded positively, and designers were incorporated into their processes.',
        'Given the constraints, we customized our design approach and implemented a reverse "double diamond" methodology, as it was better aligned with businesses reality. Most of the analyses and requirements were coming from the business. From there, we would conduct additional research when needed, employing personas and user journeys to create wireframes and prototypes. Once prototypes were developed, we would update the UI kit, Storybook, and add documentation as necessary.',
        'After getting business approval, we would hand over the prototypes to the development team. During this phase, I collaborated closely with developers, as outlined earlier, to ensure alignment and consistency.',
        'Additionally, we would iterate on designs based on feedback received from users post-development. This iterative process allowed us to adapt dynamically while maintaining a focus on user needs and product quality.'
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
    ],
    3: [
      'European banking standards compliance',
      'Recurring payment configuration',
      'Clear scheduling interface'
    ],
    4: [
      'Confirmation feedback for user actions',
      'Success state visualization',
      'Next steps guidance'
    ],
    5: [
      'Responsive tablet layout',
      'Touch-optimized interactions',
      'Adaptive component sizing'
    ],
    6: [
      'Alternative view structures',
      'Consistent dark theme application',
      'Optimized information hierarchy'
    ]
  };

  const projectConnection = {
    title: 'The journey continues',
    description: 'This ongoing project represents the culmination of everything I\'ve learned—from <strong>Base\'s systematic thinking</strong> to <strong>Sopra\'s mentoring experience</strong> to <strong>Trasis\'s design validation</strong>. Each challenge built on the last.',
    buttonText: 'Where it all began →',
    href: '/projects/base'
  };

  const heroImage = {
    src: "/screenshots/bs/bs_desktop_storybook-home.png",
    alt: "Storybook Documentation Home",
    description: "Storybook documentation home showcasing our design system"
  };

  return (
    <ProjectTemplate
      title="Bridgestone's Back-Office UI"
      pathname="/projects/bridgestone"
      projectDescription="Picture this: a <strong>global tire company</strong> with thousands of vehicles, contracts, and inspections scattered across different systems. <strong>Bridgestone</strong> needed a <strong>back-office portal</strong> that could fit all this complexity into something their internal teams could actually use without wanting to throw their laptops out the window. The challenge? Making <strong>enterprise software</strong> that doesn't feel like punishment."
      myRole="I joined as the sole designer working with a team of developers—a familiar situation that I've learned to navigate. Starting with FleetBridge and moving to their main back-office portal, my job was to be the bridge between 'what the business wants' and 'what developers can realistically build.' Spoiler alert: those two things are rarely the same at the beginning."
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
    />
  );
}
