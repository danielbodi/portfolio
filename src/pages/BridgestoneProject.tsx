import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/components/cards/Card';
import { Tag } from '../ui/components/atoms/Tag/Tag';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
import { CaseSummaryCard } from '../ui/components/case-summary/CaseSummaryCard';
import { Image } from '../ui/components/image/Image';
import { ProjectGallery } from '../ui/components/gallery/ProjectGallery';
import { StackedImageShowcase } from '../ui/components/organisms/StackedImageShowcase/StackedImageShowcase';

export function BridgestoneProject() {
  const galleryImages = [
    {
      src: "/screenshots/bs/bs_design-approach.png",
      alt: "Design Approach Diagram",
      description: "Visual representation of our design methodology and workflow at Bridgestone"
    },
    {
      src: "/screenshots/bs/bs_desktop_settings-light.png",
      alt: "Settings Panel - Light Theme",
      description: "User settings interface showcasing the light theme implementation with custom form controls"
    },
    {
      src: "/screenshots/bs/bs_desktop_storybook-home.png",
      alt: "Storybook Documentation Home",
      description: "Home page of our component library built with Storybook"
    },
    {
      src: "/screenshots/bs/bs_desktop_storybook-tag.png",
      alt: "Tag Component Documentation",
      description: "Overview of our Tag component documentation in Storybook"
    },
    {
      src: "/screenshots/bs/bs_storybook_tag_anatomy.png",
      alt: "Tag Component Anatomy",
      description: "Detailed anatomy documentation of our Tag component in Storybook"
    },
    {
      src: "/screenshots/bs/bs_storybook_tag_best_practices.png",
      alt: "Tag Component Best Practices",
      description: "Best practices and usage guidelines for our Tag component in Storybook"
    },
    {
      src: "/screenshots/bs/bs_figma_tag_anatomy.png",
      alt: "Tag Anatomy in Figma",
      description: "Detailed component anatomy documentation in our Figma design system"
    },
    {
      src: "/screenshots/bs/bs_figma_tag_best_practices.png",
      alt: "Tag Best Practices in Figma",
      description: "Best practices and usage guidelines in our Figma design system"
    },
    {
      src: "/screenshots/bs/bs_desktop_vehicle-list-light.png",
      alt: "Vehicle List View - Light Theme",
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

  const renderSkills = (skills: typeof designSkills) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <div className="rounded flex items-center justify-center">
            <img 
              src={skill.icon} 
              alt={skill.name}
              className="w-6 h-6"
            />
          </div>
          <span className="text-sm text-gray-400">{skill.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <main className="project-page">
      {/* Mobile Table of Contents */}
      <div className="lg:hidden">
        <TableOfContents variant="mobile" />
      </div>

      <div className="project-page__header">
          <div className="project-page__title">
            <h1 className="text-4xl font-bold text-purple-400">Bridgestone's Back-Office UI</h1>
          </div>
      </div>



      <div className="max-w-5xl mx-auto">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1">
            <Card variant="ghost">
              <div className="space-y-12 text-gray-300">
                <div>
                  <h2 id="project-description" className="text-3xl font-bold mb-6">
                    Project description
                  </h2>
                  <p className="text-gray-400">
                    Bridgestone is a global leader in tires and mobility solutions.<br/> To support their internal operations, Bridgestone requires a robust back-office portal that enables seamless access to critical data, including users, products, contracts, vehicles, worksheets, and inspections. This project focuses on designing an intuitive and efficient interface tailored to meet the needs of diverse internal teams, ensuring streamlined workflows and enhanced usability.
                  </p>
                </div>

                <div>
                  <h2 id="my-role" className="text-3xl font-bold mb-6">
                    My Role
                  </h2>
                  <p className="text-gray-400">
                    I started as the sole designer on this project, in a full dedicated consultant team.<br/> 
                    I worked first on FleetBridge app, and then currently on their back-office portal project. I worked closely with developers to ensure seamless implementation of our wireframes, prototypes, and high-fidelity designs.
                  </p>
                </div>

                <div>
                  <h2 id="team-composition" className="text-3xl font-bold mb-6">
                    Team Composition
                  </h2>
                  <Card variant="nested" showShadow>
                    <div className="flex flex-wrap gap-3">
                      <Tag variant="dark">3 UI/UX Designers</Tag>
                      <Tag variant="dark">5 Front-End Devs</Tag>
                      <Tag variant="dark">4 Back-End Devs</Tag>
                      <Tag variant="dark">1 Tester</Tag>
                      <Tag variant="dark">1 Architect</Tag>
                      <Tag variant="dark">1 Scrum Master</Tag>
                    </div>
                  </Card>
                </div>

                <div>
                  <h2 id="skills" className="text-3xl font-bold mb-6">
                    Skills I've Used 
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card variant="nested" showShadow>
                      <div className="space-y-4">
                        {renderSkills(designSkills)}
                      </div>
                    </Card>
                    <Card variant="nested" showShadow>
                      <div className="space-y-4">
                        {renderSkills(devSkills)}
                      </div>
                    </Card>
                  </div>
                </div>



                <div>
                  <h2 id="interactive-showcase" className="text-3xl font-bold mb-6">
                    UI Highlights
                  </h2>
                  
                  <StackedImageShowcase
                    aspectRatio="video"
                    images={[
                      {
                        src: "/screenshots/bs/bs_desktop_storybook-home.png",
                        alt: "Storybook Documentation Home",
                        description: "Home page of our component library built with Storybook"
                      },
                      {
                        src: "/screenshots/bs/bs_desktop_vehicle-list-light.png",
                        alt: "Vehicle List View - Light Theme",
                        description: "Vehicle management interface with filtering and sorting capabilities"
                      },
                      {
                        src: "/screenshots/bs/bs_desktop_ws-light.png",
                        alt: "Worksheet Interface - Light Theme",
                        description: "Vehicle worksheet management interface in light mode"
                      },
                      {
                        src: "/screenshots/bs/bs_desktop_ws-dark.png",
                        alt: "Worksheet Interface - Dark Theme",
                        description: "Vehicle worksheet management interface in dark mode"
                      },
                      {
                        src: "/screenshots/bs/bs_desktop_settings-light.png",
                        alt: "Settings Panel - Light Theme",
                        description: "User settings interface showcasing theme implementation"
                      },
                      {
                        src: "/screenshots/bs/bs_tablet_ws-dark.png",
                        alt: "Tablet View - Dark Theme",
                        description: "Responsive tablet interface showing dark theme adaptation"
                      },
                      {
                        src: "/screenshots/bs/bs_tablet_ws-light.png",
                        alt: "Tablet View - Light Theme",
                        description: "Responsive tablet interface in light mode"
                      },
                      {
                        src: "/screenshots/bs/bs_desktop_storybook-tag.png",
                        alt: "Tag Component Documentation",
                        description: "Component documentation in our design system"
                      },
                      {
                        src: "/screenshots/bs/bs_storybook tag anatomy.png",
                        alt: "Tag Anatomy Documentation",
                        description: "Detailed component anatomy in our design system"
                      },
                      {
                        src: "/screenshots/bs/bs_storybook tag best practices.png",
                        alt: "Tag Best Practices",
                        description: "Usage guidelines and best practices documentation"
                      }
                    ]}
                  />
                </div>

                <div>
                  <h2 id="case-summary" className="text-3xl font-bold mb-6">
                    Case Summary
                  </h2>
                  <div className="flex flex-col gap-8">
                    {caseSummaryData.map((data, index) => (
                      <CaseSummaryCard 
                        key={index}
                        challenge={data.challenge}
                        solution={data.solution}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
                
                 {/* Full case link */}
                <div className="mt-24 md:mt-32 flex flex-col items-center text-center">
                  <button 
                   onClick={() => {
                     const element = document.getElementById('challenges');
                     if (element) {
                       const offset = 140;
                       const elementPosition = element.getBoundingClientRect().top;
                       const offsetPosition = elementPosition + window.scrollY - offset;
                       window.scrollTo({
                         top: offsetPosition,
                         behavior: 'smooth'
                       });
                     }
                   }}
                    className="c-button c-button--ghost flex flex-col items-center group"
                  >
                    <span className="mb-2">Want to read the full case?</span>
                    <ChevronDown className="animate-bounce" size={24} />
                  </button>
                </div>
                
                <div>
                  <h2 id="challenges" className="text-3xl font-bold mb-6">
                    The Challenges I've faced
                  </h2>
                  <div className="space-y-8">
                    {/* Lack of Design System */}
                    <Card variant="ghost">
                      <h4 id="lack-of-design-system" className="text-xl font-semibold mb-4">Missing Design Structure</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          I joined the project as sole designer in the team, after it had already started and with the backlog already defined. That meant that I immediately had to deliver prototypes based on these requirements.
                        </p>
                        <p>
                          Had I been involved from the beginning, I would have prioritized establishing a design system to ensure consistency and scalability. However, due to time and resource constraints, creating a reusable design system in Figma was not feasible.
                        </p>
                        <p>
                          This was extended even further on the development side, where the lack of a design system made it significantly harder for developers to implement consistent and reusable components, amplifying the risk to the project's overall scalability.
                        </p>
                      </div>
                    </Card>

                    {/* Custom Development Challenges */}
                    <Card variant="ghost">
                      <h4 id="custom-development-challenges" className="text-xl font-semibold mb-4">Technical Uncertainty</h4>
                      <p className="text-gray-400">
                        The project required custom designs and components, which the developers were not exactly familiar with building. This led to difficulties in implementing layouts and accurately translating designs into code. The lack of experience with custom components and layouts resulted in additional effort to ensure that designs were integrated correctly.
                      </p>
                    </Card>

                    {/* Limited Research Time */}
                    <Card variant="ghost">
                      <h4 id="limited-research-time" className="text-xl font-semibold mb-4">Limited Resources</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Working as only designer left minimal time for user research, to identify pain points or for user testing to validate solutions. The standard double diamond approach wasn't feasible, as the analysis and user story requirements were defined by the business rather than through UX research. While the business had some processes in place to gather feedback, this feedback was mostly received post-development.
                        </p>
                        <p>
                          This reactive approach often led to iterations and redesigns after features were already designed or even implemented.
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 id="solutions" className="text-3xl font-bold mb-6">
                    How I overcame them
                  </h2>
                  <div className="space-y-8">
                    {/* Design System Solution */}
                    <Card variant="ghost">
                      <h4 id="addressing-design-system" className="text-xl font-semibold mb-4">Missing Design Structure: Building a Systematic Foundation</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          To overcome the lack of a design system, I decided to reuse an existing UI kit in Figma and chose Ant Design's UI kit. I went to that direction because Ant Design's kit had already well-structured components, was easy to customize, and had frequent updates.
                        </p>
                        <p>
                          Additionally, Ant Design's visual style was distinct from Material Design, which was already widely used.
                          By reusing Ant Design's components and foundations, I was able to scale and work more efficiently within my design process.
                        </p>
                        <p>
                          Gradually, I customized and expanded the kit by adding custom components - always applying the Atomic methodology - documentation, and design tokens to suit the project's specific needs.
                        </p>
                        <p>
                          On the development side, the front-end team opted for a fully custom approach and did not reuse Ant Design's code. This divergence required additional collaboration to ensure alignment between design and development despite the differing foundations.
                          That's where I proposed and implemented Storybook, as our source of truth for our foundations, components and documentation for developers, and designers.
                        </p>
                      </div>
                    </Card>

                    {/* Custom Development Solution */}
                    <Card variant="ghost">
                      <h4 id="addressing-development" className="text-xl font-semibold mb-4">Technical Uncertainty: Establishing Knowledge Transfer</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          To tackle the challenges with custom designs and components, I focused on fostering a positive and supportive relationship with developers. I made myself available to answer any questions, assist with CSS and HTML-related issues, and provide coaching to those struggling with specific implementation challenges. This open line of communication helped build trust and improved our collaboration.
                        </p>
                        <p>
                          I contributed by structuring the CSS repository, by implementing the ITCSS methodology and encouraged adopting the BEM convention for consistent and maintainable naming.
                          Additionally, I mirrored reusable tokens from Figma into our codebase, covering typography, spacing, borders, elevations, shadows, and palette systems.
                          Over time, I extended these tokens into utility classes, further enhancing efficiency, consistency, and alignment between design and development.
                        </p>
                        <p>
                          Another important point I started to do to ensure quality, was to actively participate in the development workflow by reviewing pull requests. This allowed me to catch inconsistencies early and provide feedback to maintain alignment with design standards.
                        </p>
                        <p>
                          Additionally, I managed a parallel backlog specifically for Storybook development. This backlog addressed technical debts, inconsistencies left in the system and new components or foundations development, ensuring long-term scalability and alignment with design principles.
                        </p>
                        <p>
                          In Figma, I enhanced the handoff process by improving component and layout documentation. This included adding anatomies, usage guidelines, and best practices for components, which developers found valuable.
                        </p>
                        <div className="my-8">
                          <StackedImageShowcase
                            aspectRatio="video"
                            images={[
                              {
                                src: "/screenshots/bs/bs_desktop_settings-light.png",
                                alt: "Settings Panel - Light Theme",
                                description: "User settings interface showcasing the light theme implementation with custom form controls"
                              },
                              {
                                src: "/screenshots/bs/bs_desktop_settings-dark.png",
                                alt: "Settings Panel - Dark Theme",
                                description: "Dark theme variant of the settings panel, maintaining consistent visual hierarchy"
                              },
                              {
                                src: "/screenshots/bs/bs_desktop_ws-light.png",
                                alt: "Worksheet Interface - Light Theme",
                                description: "Vehicle worksheet management interface in light mode showing maintenance details"
                              },
                              {
                                src: "/screenshots/bs/bs_desktop_ws-dark.png",
                                alt: "Worksheet Interface - Dark Theme",
                                description: "Vehicle worksheet management interface in dark mode with detailed vehicle information"
                              }
                            ]}
                          />
                        </div>
                        <p>
                          Initially, the design system development was secondary to other priorities, but its impact on efficiency led to its formal adoption. With the arrival of another designer with a similar skillset, we collaborated building more foundations in both design and development parts of the project, putting some special effort on improving our Storybook. Then recently, a third UI/UX designer joined the team, and we implemented branching and reviewing processes within our design workflows in Figma. This confirmed even more my role as a leader in the design aspect of the project.
                        </p>
                        <p>
                          Today, the development of our design system in Storybook is still in progress, but it already provides a solid foundation and documentation source, enabling developers and designers to work efficiently in isolation, run tests, and maintain consistency.
                        </p>
                      </div>
                    </Card>

                    {/* Research and Testing Solution */}
                    <Card variant="ghost">
                      <h4 id="addressing-research" className="text-xl font-semibold mb-4">Limited Resources: Adapting Our Process</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          To address the limitations in user research and testing, I requested if at least a designer could be included during business workshops and user testing sessions. This request objective was to get a better insight into user pain points and needs, enabling us to work with more accurate data. The business responded positively, and designers were incorporated into their processes.
                        </p>
                        <p>
                          Given the constraints, we customized our design approach and implemented a reverse "double diamond" methodology, as it was better aligned with businesses reality. Most of the analyses and requirements were coming from the business. From there, we would conduct additional research when needed, employing personas and user journeys to create wireframes and prototypes.
                          Once prototypes were developed, we would update the UI kit, Storybook, and add documentation as necessary.
                        </p>
                       <div className="my-8">
                         <StackedImageShowcase
                           aspectRatio="video"
                           images={[
                             {
                               src: "/screenshots/bs/bs_design-approach.png",
                               alt: "Our adapted double diamond approach",
                               description: "Our adapted double diamond approach, showing how we integrated business requirements with UX processes"
                             }
                           ]}
                         />
                       </div>
                        <p>
                          After getting business approval, we would hand over the prototypes to the development team. During this phase, I collaborated closely with developers, as outlined earlier, to ensure alignment and consistency.
                        </p>
                        <p>
                          Additionally, we would iterate on designs based on feedback received from users post-development.
                          This iterative process allowed us to adapt dynamically while maintaining a focus on user needs and product quality.
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Table of Contents */}
          <div className="hidden lg:block">
            <TableOfContents variant="desktop" />
          </div>
        </div>
      </div>
    </main>
  );
}