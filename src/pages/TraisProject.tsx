import React from 'react';
import { ProjectTemplate } from './ProjectTemplate';
import { Image } from '../ui/components/image/Image';

export function TraisProject() {
  const galleryImages = [
    {
      src: "/screenshots/trasis/trasis-qc1-dashboard.png",
      alt: "Dashboard with schedule list and device monitoring",
      description: "Comprehensive dashboard interface showing test schedules and real-time component monitoring"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-real-parts-ui.png",
      alt: "Example of real parts designed for the QC1 device",
      description: "Realistic illustrations of device components designed to replicate real parts"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-spots--results.png",
      alt: "QC Test result page",
      description: "QC test results interface with clear data visualization and precise measurement displays for quality control validation"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-appearance--results.png",
      alt: "Another view of QC Test result page",
      description: "Color and clarity test results with visual references"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-new-tap-creation-page.png",
      alt: "TAP creation interface",
      description: "Interface for creating and managing test protocols"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-tracer-creation.png",
      alt: "Isotope selection screen",
      description: "Specialized interface for selecting radiopharmaceutical isotopes"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-tap-import.png",
      alt: "TAP import interface",
      description: "File management system for importing test protocols"
    }
  ];

  const designSkills = [
    { name: 'Figma', icon: '/skill-icons/figma.svg' },
    { name: 'Illustrator', icon: '/skill-icons/illustrator.svg' }
  ];

  const devSkills = [
    { name: 'Storybook', icon: '/skill-icons/storybook.svg' },
    { name: 'HTML', icon: '/skill-icons/html.svg' },
    { name: 'CSS/SCSS', icon: '/skill-icons/css.svg' },
    { name: 'TS', icon: '/skill-icons/ts.svg' }
  ];

  const teamMembers = [
    { role: 'UI/UX Designer', count: 1 },
    { role: 'Back-End', count: 1 },
    { role: 'Product Owner', count: 1 }
  ];

  const platforms = [
    { name: 'Tablet', icon: '/skill-icons/tablet.svg' }
  ];

  const caseSummaryData = [
    {
      challenge: {
        title: "Unfamiliarity from Business with Designers",
        description: [
          "Team not accustomed to working with designers.",
          "No clear design workflows in place."
        ]
      },
      solution: {
        title: "Proactive Transparency",
        description: [
          "Set up bi-weekly follow-up sessions with stakeholders.",
          "Demonstrated value through consistent progress and high-quality deliverables.",
          "Built trust through open communication and rapid results."
        ]
      }
    },
    {
      challenge: {
        title: "Team Composition and Roles",
        description: [
          "Balancing designer and developer roles within budget constraints.",
          "Need for swift, impactful design and development decisions."
        ]
      },
      solution: {
        title: "Strategic System Implementation",
        description: [
          "Built on Ant Design's UI kit for rapid prototyping.",
          "Implemented NX monorepo with Angular for efficient development.",
          "Used ITCSS and BEM methodologies for maintainable CSS structure.",
          "Established Storybook as the design system platform."
        ]
      }
    },
    {
      challenge: {
        title: "Custom Design Complexity",
        description: [
          "Creating advanced UI that mirrors complex device functionality.",
          "Designing intuitive representations of technical processes."
        ]
      },
      solution: {
        title: "Realistic Visual System",
        description: [
          "Designed realistic illustrations of device components.",
          "Created interactive visualizations of internal processes.",
          "Implemented accessibility best practices for inclusive design.",
          "Balanced technical accuracy with intuitive user experience."
        ]
      }
    }
  ];

  const projectImpact = [
    { value: '85%', label: 'User Task Success' },
    { value: '3x', label: 'Faster Prototyping' },
    { value: '100%', label: 'Stakeholder Buy-in' }
  ];

  const challenges = [
    {
      id: 'unfamiliarity-with-designers',
      title: 'Unfamiliarity from Business with Designers',
      content: [
        'When I joined Trasis, the team was not used to work with a designer. This unfamiliarity came from the business, and even the back-end developer in my team.',
        'They simply didn\'t have clear design workflows in place. So how could a UI/UX designer fit into their process and bring value? These doubts made it challenging to gain their trust at the start.'
      ]
    },
    {
      id: 'team-composition-roles',
      title: 'Challenges with the team composition and roles',
      content: [
        'Another challenge I faced at Trasis was balancing the roles of both designer and front-end developer within a limited budget. This required me to make swift, impactful decisions about the design system in Figma and my development approach.'
      ]
    },
    {
      id: 'custom-design-complexity',
      title: 'Custom design complexity',
      content: [
        'I had to face the complexity of designing the user interface for the QC1 device. This involved creating advanced custom designs that mirrored the device\'s real-life functionalities and parts, ensuring an intuitive and realistic user experience.'
      ]
    }
  ];

  const solutions = [
    {
      id: 'addressing-unfamiliarity',
      title: 'Addressing the Unfamiliarity from Business with Designers',
      content: [
        'To address this challenge, I made sure to be proactive and transparent from the beginning. I set up follow-up sessions twice a week with my team and the key stakeholders.',
        'In these sessions, I shared updates on what I was working on: My plan to create their Design System, the initial direction I wanted to take for their user interface, the reasons behind my design decisions and how they solved user and technical problems, and wireframes and interactive prototypes to show real progress.',
        'These sessions had a significant impact: by seeing real and consistent progress, the business gained confidence in my ability to deliver. They recognized the quality of my work, my speed of execution enabled by the design system approach, and my problem-solving skills.',
        'Being open and transparent, while delivering results quickly, earned their trust and demonstrated my value to the project. This not only shifted their perspective on working with a designer but also strengthened collaboration across the team. Even during the challenges of COVID-19, when many other projects were cancelled, I remained a key part of the team.'
      ]
    },
    {
      id: 'addressing-team-composition',
      title: 'Addressing Challenges with the team composition and roles',
      content: [
        'Trasis had multiple applications and devices, which made it clear that a <strong>reusable and scalable design system</strong> was needed for their ecosystem. As the only designer, I decided to reuse <strong>Ant Design\'s UI kit</strong> in Figma as the foundation for the design system. I then built upon this foundation by adding custom components using the <strong>Atomic Design methodology</strong> to suit the specific needs of their products.',
        'This approach, as mentioned in the first challenge, allowed me to deliver <strong>high-fidelity prototypes rapidly</strong>. Frequent <strong>user testing sessions</strong> helped me validate the designs and iterate based on feedback. Since the field of <strong>radiopharmaceuticals</strong> was new to me, these iterations, combined with business input, were very valuable in aligning the UI with user needs.',
        'On the development side, I chose to use an <strong>NX monorepo with Angular</strong> for its ability to manage multiple projects within a shared workspace efficiently. For CSS, I implemented the <strong>ITCSS structure</strong> with the <strong>BEM methodology</strong>, which ensured a scalable and maintainable structure for styling.',
        'To centralize the design system, I used <strong>Storybook</strong> as the platform, ensuring that the components were documented and reusable. However, my contribution to Storybook was limited to a basic stage, as the project budget came to an end.',
        'Before leaving, I ensured a smooth transition by handing over and conducting multiple coaching sessions with an internal developer who took over the front-end tasks. These sessions helped with knowledge transfer about the prototypes in Figma, the design system, Storybook setup, and other development practices, ensuring the continuity of the work I started.'
      ]
    },
    {
      id: 'addressing-design-complexity',
      title: 'Addressing Custom design complexity',
      content: [
        'This project required realistic illustrations of the device\'s components (like valves, columns, injectors, tubes…), as shown in the example below. These elements were designed to visually represent real parts of the device, allowing users to easily understand and interact with its functions in diagrams and schemas that I also designed to replicate the internal processes of the device, such as fluid channels, reagent movements, and test flows.',
        'The QC1 device performs tasks like injecting reagents, flushing channels, rotating components, and scheduling quality control tests. My designs ensured that users could intuitively manage these processes and view their state in the user interface in real-time.',
        'The user interface also included features for scheduling QC tests and displaying results in a clear, data-driven format using graphs and tables. This helped users monitor outcomes effectively and make decisions based on precise data.',
        'Accessibility was a key focus in the design process. Since users with visual impairments could interact with the interface, I applied UX best practices to make it inclusive. Some of these practices included: Ensuring clear contrasts between text and background to enhance readability, creating a strong visual hierarchy to guide users\' attention effectively, and designing for color blindness by using patterns, textures, or other visual indicators alongside colors.',
        'This approach made the UI both visually clear and easy to use, while maintaining the precision and reliability required for a device as complex as the QC1.'
      ]
    }
  ];

  const detailedImageFeatures = {
    0: [
      'Comprehensive dashboard interface',
      'Real-time component monitoring',
      'Test schedule management'
    ],
    1: [
      'Realistic device component illustrations',
      'Visual representation of real parts',
      'Interactive component mapping'
    ],
    2: [
      'Clear data visualization',
      'Precise measurement displays',
      'Quality control validation'
    ],
    3: [
      'Color and clarity test results',
      'Visual reference comparisons',
      'Detailed result documentation'
    ],
    4: [
      'Test protocol creation interface',
      'Streamlined workflow management',
      'Intuitive configuration options'
    ],
    5: [
      'Radiopharmaceutical isotope selection',
      'Specialized interface design',
      'Technical accuracy with usability'
    ],
    6: [
      'File management system',
      'Protocol import functionality',
      'Organized data handling'
    ]
  };

  const projectConnection = {
    title: 'From healthcare to enterprise',
    description: 'Proving design\'s value in a technical environment at Trasis set the stage for my biggest challenge yet: transforming <strong>Bridgestone\'s</strong> entire design approach.',
    buttonText: 'Next Project →',
    href: '/projects/bridgestone'
  };

  const heroImage = {
    src: "/screenshots/trasis/trasis-qc1-homepage.png",
    alt: "Home page of the QC1 app",
    description: "Home page of the QC1 application showcasing the main interface"
  };

  const additionalSections = (
    <div className="space-y-12">
      <div className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]">
        <h2 className="text-3xl font-bold mb-6">Visual Design Examples</h2>
        <div className="space-y-8">
          <div className="my-8">
            <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
              <Image
                src="/screenshots/trasis/trasis-qc1-real-parts-ui.png"
                alt="Example of real parts designed for the QC1 device"
                aspectRatio="auto"
                frame="none"
                className="w-full rounded-lg"
              />
            </div>
            <p className="text-sm text-purple-400 mt-2">Realistic illustrations of device components designed to replicate real parts of the QC1 device</p>
          </div>
          
          <div className="my-8">
            <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
              <Image
                src="/screenshots/trasis/trasis-qc1-hplc--cfg.png"
                alt="QC Test UI reflecting the QC1's mechanism"
                aspectRatio="auto"
                frame="none"
                className="w-full rounded-lg"
              />
            </div>
            <p className="text-sm text-purple-400 mt-2">Interactive test interface mirroring the device's physical processes</p>
          </div>
          
          <div className="my-8">
            <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
              <Image
                src="/screenshots/trasis/trasis-qc1-µgc--cfg.png"
                alt="QC Test diagram reflecting the QC1's mechanism"
                aspectRatio="auto"
                frame="none"
                className="w-full rounded-lg"
              />
            </div>
            <p className="text-sm text-purple-400 mt-2">Complex test configuration interface showing fluid channels and component states, mirroring the device's internal processes</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ProjectTemplate
      title="Trasis QC1 Device Interface"
      pathname="/projects/trasis"
      projectDescription="Imagine designing an interface for a device that handles <strong>radioactive materials</strong>—no pressure, right? <strong>Trasis</strong> builds equipment for creating <strong>radiopharmaceuticals</strong>, and their <strong>QC1 device</strong> needed an interface that could guide technicians through complex <strong>quality control processes</strong> without any room for error. This wasn't just about making things look pretty; one wrong click could affect <strong>patient safety</strong>."
      myRole="As the only designer on a team of engineers, I had to earn my place at the table. The challenge wasn't just designing the interface—it was convincing a team that had never worked with a designer that they actually needed one. I spent equal time creating wireframes and explaining why user research matters when you're dealing with life-critical equipment. Plus, I got to play both designer and developer, which meant I could ensure my designs actually worked in the real world."
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
