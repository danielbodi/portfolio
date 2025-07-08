import React from 'react';
import { ProjectTemplate } from './ProjectTemplate';
import { Image } from '../ui/components/image/Image';


export function SopraProject() {
  const galleryImages = [
    {
      src: "/screenshots/sopra/sopra-account-hystory.png",
      alt: "Account history page showing transaction details",
      description: "Account history interface demonstrating systematic design approach and component reusability"
    },
    {
      src: "/screenshots/sopra/sopra-eu-standing-order.png",
      alt: "European standing order transaction setup",
      description: "European standing order transaction setup with improved design system foundations"
    },
    {
      src: "/screenshots/sopra/sopra-end-screen.png",
      alt: "Confirmation screen after completing a transaction",
      description: "Transaction confirmation screen showing design system foundations and component consistency"
    }
  ];

  const designSkills = [
    { name: 'Sketch', icon: '/skill-icons/sketch.svg' },
    { name: 'Invision', icon: '/skill-icons/invision.svg' },
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
    { role: 'UI/UX Designers', count: 2 },
    { role: 'Front-End Devs', count: 3 },
    { role: 'Back-End Devs', count: 2 },
    { role: 'Tester', count: 1 },
    { role: 'Architect', count: 1 },
    { role: 'Scrum Master', count: 1 }
  ];

  const platforms = [
    { name: 'Desktop', icon: '/skill-icons/desktop.svg' }
  ];

  const caseSummaryData = [
    {
      challenge: {
        title: "Structure and Seniority in Front-End Development",
        description: [
          "Junior front-end team needed guidance for design to code translation.",
          "Outdated CSS practices led to technical debt and inefficiencies."
        ]
      },
      solution: {
        title: "Modern Development Practices",
        description: [
          "Introduced BEM methodology for organized CSS structure.",
          "Replaced float-based grid with custom Flexbox-based grid.",
          "Provided coaching and support to improve collaboration."
        ]
      }
    },
    {
      challenge: {
        title: "Scalable Design Processes and methodologies",
        description: [
          "Basic PDF style guide without a real design system.",
          "Components not built with Atomic Design methodology."
        ]
      },
      solution: {
        title: "Systematic Design Approach",
        description: [
          "Implemented Atomic Design methodology for strategic components.",
          "Proposed comprehensive web-based Design System.",
          "Improved prototyping speed and component reusability."
        ]
      }
    }
  ];

  const projectImpact = [
    { value: '40%', label: 'Faster Prototyping' },
    { value: '30%', label: 'Cost Reduction' },
    { value: '2x', label: 'Scalability' }
  ];

  const challenges = [
    {
      id: 'structure-seniority',
      title: 'Structure and Seniority in Front-End Development',
      content: [
        'The front-end team was relatively junior and needed guidance for design to code translation and to build the layouts.',
        'Their outdated CSS practices, such as a float-based grid system, and the absence of organized CSS structures led to technical debt and inefficiencies while developing.'
      ]
    },
    {
      id: 'scalable-design',
      title: 'Scalable Design Processes and methodologies',
      content: [
        'When I joined, they had a basic pdf document as style guide for UI and UX principles, but they lacked of a real design system.',
        'Another issue was that their components, when they were available, were not built with the Atomic Design methodology, making it difficult to scale and maintain consistency across the product.'
      ]
    }
  ];

  const solutions = [
    {
      id: 'addressing-structure',
      title: 'Addressing the Structure and Seniority in Front-End Development',
      content: [
        'To address the lack of CSS structure, I introduced the <strong>BEM methodology</strong>. At first some members of the team were reticent due to its increased verbosity, but by showing them real life examples and solutions to issues they were struggling in their CSS development, they eventually saw how this approach provided a clear way to organise and name their CSS, making it <strong>scalable and reusable</strong>.',
        'Another contribution I did on the front-end was to replace their float-based grid system with a <strong>custom Flexbox-based grid</strong>, designed from scratch. This new grid adhered to the <strong>BEM methodology</strong>, offering greater flexibility, reducing <strong>technical debt</strong>, and making the layouts more <strong>future-proof</strong>.',
        'In order to effectively apply all these changes and that new approach, I made myself available to answer any questions, assist with <strong>CSS and HTML-related issues</strong>, and provide coaching to those struggling with specific implementation challenges. All that resulted on a built thrust amongst designer and developers and <strong>improved our collaboration</strong>.'
      ]
    },
    {
      id: 'addressing-design',
      title: 'Addressing Scalable Design Processes and methodologies',
      content: [
                'As mentioned, our UI components were not optimised for maintenance and were not really scalable, I then started to implement the <strong>Atomic Design methodology</strong> on newer and strategic components, in order to tackle that issue, but to still be able to deliver. The goal was to progressively catch-up with the rest of our existing components as we would use them in our prototypes.',
        'After a while this rework allowed the design team to <strong>prototype faster</strong>, <strong>reduce costs</strong> by reusing components, and ensure a <strong>systematic and scalable approach</strong> to design.',
        'Once the components were reworked and our quality of life while designing got improved, I proposed to build a <strong>Design System</strong> to bridge the gap between design and development. This system would evolve from their existing pdf style guide into a more usable <strong>web platform</strong> that would include:',
        '• Documentation on our <strong>design foundations and principles</strong> (color palettes, custom icons, typography, grid, ect...).',
        '• A <strong>component library</strong> with our custom components, how to\'s, best practices and code related documentation.',
        'I left the project before delivering the design system, what I could see, though, was how the way I addressed these challenges brought <strong>structure, scalability, and efficiency</strong> and ended up helping <strong>modernize the workflows</strong> to both the design and development processes.'
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
    ]
  };

  const projectConnection = {
    title: 'The evolution continues',
    description: 'Teaching methodologies at <strong>Sopra</strong> prepared me for the ultimate challenge: <strong>building design systems from scratch</strong> as a consultant at <strong>Trasis</strong> and <strong>Bridgestone</strong>.',
    buttonText: 'Next Project →',
    href: '/projects/trasis'
  };

  const heroImage = {
    src: "/screenshots/sopra/sopra-login-page.png",
    alt: "Login screen for Santander online Banking",
    description: "Modern login interface showcasing the improved design system"
  };

  return (
    <ProjectTemplate
      title="Sopra Banking Software"
      pathname="/projects/sopra"
      projectDescription="Banking software isn't exactly known for its stellar user experience, is it? <strong>Sopra Banking</strong> builds the core systems that power <strong>financial institutions</strong>, and their software needed a serious design intervention. Think <strong>enterprise banking platforms</strong> that handle <strong>millions of transactions</strong>, but with interfaces that looked like they were built in 2005. My mission: bring their <strong>design process into the modern era</strong>."
      myRole="I joined as the <strong>design reinforcement</strong>—they had one designer managing a heavy workload and a team of <strong>junior developers</strong> who needed guidance on everything from <strong>CSS architecture</strong> to <strong>component thinking</strong>. My job was to be the bridge between design ambitions and development reality, while teaching the team that <strong>good code structure</strong> isn't just nice to have—it's essential for scaling <strong>enterprise software</strong>."
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
