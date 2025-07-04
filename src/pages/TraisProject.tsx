import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/components/cards/Card';
import { Tag } from '../ui/components/atoms/Tag/Tag';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
import { CaseSummaryCard } from '../ui/components/case-summary/CaseSummaryCard';
import { Image } from '../ui/components/image/Image';
import { ProjectGallery } from '../ui/components/gallery/ProjectGallery';
import { StackedImageShowcase } from '../ui/components/organisms/StackedImageShowcase/StackedImageShowcase';

export function TraisProject() {
  const galleryImages = [
    {
      src: "/screenshots/trasis/trasis-qc1-real-parts-ui.png",
      alt: "Example of real parts designed for the QC1 device",
      description: "Custom components designed to represent real device parts"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-homepage.png",
      alt: "Home page of the QC1 app",
      description: "Home page with navigation menu inspired by the Trasis logo"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-hplc--cfg.png",
      alt: "QC Test UI reflecting the QC1's mechanism",
      description: "Interactive test interface mirroring the device's physical processes"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-µgc--cfg.png",
      alt: "QC Test diagram reflecting the QC1's mechanism",
      description: "Detailed diagram showing fluid channels and component states"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-spots--results.png",
      alt: "QC Test result page",
      description: "Results visualization with clear data presentation"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-appearance--results.png",
      alt: "Another view of QC Test result page",
      description: "Color and clarity test results with visual references"
    },
    {
      src: "/screenshots/trasis/trasis-qc1-dashboard.png",
      alt: "Dashboard with schedule list and device monitoring",
      description: "Comprehensive dashboard showing test schedule and component status"
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
            <h1 className="text-4xl font-bold text-purple-400">Trasis QC1 Device Interface</h1>
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
                    Trasis is specializing in the development and manufacturing of cutting-edge equipment and solutions for the production, and dispensing of radiopharmaceuticals used in nuclear medicine. Their technology supports healthcare professionals in diagnosing and treating diseases like cancer.
                  </p>
                </div>

                <div>
                  <h2 id="my-role" className="text-3xl font-bold mb-6">
                    My Role
                  </h2>
                  <p className="text-gray-400">
                    At Trasis, I created a user interface for the QC1 device that mirrored its steps and mechanisms, providing users with a clear and intuitive way to interact with its processes. This approach ensured a close alignment between the interface and the device's functionality, enhancing usability and operational efficiency.<br/>
                    I took charge of both the UI design and front-end development, delivering wireframes, high fidelity and clickable prototypes and I initiated their design system with Storybook.
                  </p>
                </div>

                <div>
                  <h2 id="team-composition" className="text-3xl font-bold mb-6">
                    Team Composition
                  </h2>
                  <Card variant="nested" showShadow>
                    <div className="flex flex-wrap gap-3">
                      <Tag variant="dark">1 UI/UX Designer</Tag>
                      <Tag variant="dark">1 Back-End</Tag>
                      <Tag variant="dark">1 Product Owner</Tag>
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
                    images={galleryImages}
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
                    {/* Challenge 1 */}
                    <Card variant="ghost">
                      <h4 id="unfamiliarity-with-designers" className="text-xl font-semibold mb-4">Unfamiliarity from Business with Designers</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          When I joined Trasis, the team was not used to work with a designer. 
                          This unfamiliarity came from the business, and even the back-end developer in my team.
                        </p>
                        <p>
                          They simply didn't have clear design workflows in place.
                          So how could a UI/UX designer fit into their process and bring value?
                          These doubts made it challenging to gain their trust at the start.
                        </p>
                      </div>
                    </Card>

                    {/* Challenge 2 */}
                    <Card variant="ghost">
                      <h4 id="team-composition-roles" className="text-xl font-semibold mb-4">Challenges with the team composition and roles</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Another challenge I faced at Trasis was balancing the roles of both designer and front-end developer within a limited budget.
                          This required me to make swift, impactful decisions about the design system in Figma and my development approach.
                        </p>
                      </div>
                    </Card>

                    {/* Challenge 3 */}
                    <Card variant="ghost">
                      <h4 id="custom-design-complexity" className="text-xl font-semibold mb-4">Custom design complexity</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          I had to face the complexity of designing the user interface for the QC1 device. This involved creating advanced custom designs that mirrored the device's real-life functionalities and parts, ensuring an intuitive and realistic user experience.
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
                    {/* Solution 1 */}
                    <Card variant="ghost">
                      <h4 id="addressing-unfamiliarity" className="text-xl font-semibold mb-4">Addressing the Unfamiliarity from Business with Designers</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          To address this challenge, I made sure to be proactive and transparent from the beginning. 
                          I set up follow-up sessions twice a week with my team and the key stakeholders.
                        </p>
                        <p>
                          In these sessions, I shared updates on what I was working on:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>My plan to create their Design System.</li>
                          <li>The initial direction I wanted to take for their user interface.</li>
                          <li>The reasons behind my design decisions and how they solved user and technical problems.</li>
                          <li>Wireframes and interactive prototypes to show real progress.</li>
                        </ul>
                        <p>
                          These sessions had a significant impact: by seeing real and consistent progress, the business gained confidence in my ability to deliver. 
                          They recognized the quality of my work, my speed of execution enabled by the design system approach, and my problem-solving skills.
                        </p>
                        <p>
                          Being open and transparent, while delivering results quickly, earned their trust and demonstrated my value to the project. 
                          This not only shifted their perspective on working with a designer but also strengthened collaboration across the team. Even during the challenges of COVID-19, when many other projects were cancelled, I remained a key part of the team.
                        </p>
                      </div>
                    </Card>

                    {/* Solution 2 */}
                    <Card variant="ghost">
                      <h4 id="addressing-team-composition" className="text-xl font-semibold mb-4">Addressing Challenges with the team composition and roles</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Trasis had multiple applications and devices, which made it clear that a reusable and scalable design system was needed for their ecosystem. 
                          As the only designer, I decided to reuse Ant Design's UI kit in Figma as the foundation for the design system. I then built upon this foundation by adding custom components using the Atomic Design methodology to suit the specific needs of their products.
                        </p>
                        <p>
                          This approach, as mentioned in the first challenge, allowed me to deliver high-fidelity prototypes rapidly.
                        </p>
                        <p>
                          Frequent user testing sessions helped me validate the designs and iterate based on feedback. Since the field of radiopharmaceuticals was new to me, these iterations, combined with business input, were very valuable in aligning the UI with user needs.
                        </p>
                        <p>
                          On the development side, I chose to use an NX monorepo with Angular for its ability to manage multiple projects within a shared workspace efficiently. 
                          For CSS, I implemented the ITCSS structure with the BEM methodology, which ensured a scalable and maintainable structure for styling.
                        </p>
                        <p>
                          To centralize the design system, I used Storybook as the platform, ensuring that the components were documented and reusable.
                        </p>
                        <p>
                          However, my contribution to Storybook was limited to a basic stage, as the project budget came to an end.
                          Before leaving, I ensured a smooth transition by handing over and conducting multiple coaching sessions with an internal developer who took over the front-end tasks. These sessions helped with knowledge transfer about the prototypes in Figma, the design system, Storybook setup, and other development practices, ensuring the continuity of the work I started.
                        </p>
                      </div>
                    </Card>

                    {/* Solution 3 */}
                    <Card variant="ghost">
                      <h4 id="addressing-design-complexity" className="text-xl font-semibold mb-4">Addressing Custom design complexity</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          This project required realistic illustrations of the device's components (like valves, columns, injectors, tubes…), as shown in the example below. These elements were designed to visually represent real parts of the device, allowing users to easily understand and interact with its functions in diagrams and schemas that I also designed to replicate the internal processes of the device, such as fluid channels, reagent movements, and test flows.
                        </p>
                        
                        <div className="my-8">
                          <StackedImageShowcase
                            aspectRatio="video"
                            images={[
                              {
                                src: "/screenshots/trasis/trasis-qc1-real-parts-ui.png",
                                alt: "Example of real parts designed for the QC1 device",
                                description: "Example of real parts that I designed and reused in the diagrams"
                              },
                              {
                                src: "/screenshots/trasis/trasis-qc1-homepage.png",
                                alt: "Home page of the QC1 app",
                                description: "Home page of the app, they requested to find a way to reuse their logo as navigation menu"
                              },
                              {
                                src: "/screenshots/trasis/trasis-qc1-hplc--cfg.png",
                                alt: "QC Test UI reflecting the QC1's mechanism",
                                description: "Type of QC Test UI that reflects the QC1's mechanism"
                              },
                              {
                                src: "/screenshots/trasis/trasis-qc1-µgc--cfg.png",
                                alt: "QC Test diagram reflecting the QC1's mechanism",
                                description: "Type of QC Test diagram reflecting the QC1's mechanism"
                              }
                            ]}
                          />
                        </div>
                        
                        <p>
                          The QC1 device performs tasks like injecting reagents, flushing channels, rotating components, and scheduling quality control tests. My designs ensured that users could intuitively manage these processes and view their state in the user interface in real-time.
                        </p>
                        <p>
                          The user interface also included features for scheduling QC tests and displaying results in a clear, data-driven format using graphs and tables. This helped users monitor outcomes effectively and make decisions based on precise data.
                        </p>
                        
                        <div className="my-8">
                          <StackedImageShowcase
                            aspectRatio="video"
                            images={[
                              {
                                src: "/screenshots/trasis/trasis-qc1-spots--results.png",
                                alt: "QC Test result page",
                                description: "Type of QC Test result page"
                              },
                              {
                                src: "/screenshots/trasis/trasis-qc1-appearance--results.png",
                                alt: "Another view of QC Test result page",
                                description: "Another view of a type of QC Test result page"
                              },
                              {
                                src: "/screenshots/trasis/trasis-qc1-dashboard.png",
                                alt: "Dashboard with schedule list and device monitoring",
                                description: "The Dashboard, with schedule list, tests on going, and view on real parts of the device"
                              }
                            ]}
                          />
                        </div>
                        
                        <p>
                          Accessibility was a key focus in the design process. Since users with visual impairments could interact with the interface, I applied UX best practices to make it inclusive. Some of these practices included:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Ensuring clear contrasts between text and background to enhance readability.</li>
                          <li>Creating a strong visual hierarchy to guide users' attention effectively.</li>
                          <li>Designing for color blindness by using patterns, textures, or other visual indicators alongside colors.</li>
                        </ul>
                        <p>
                          This approach made the UI both visually clear and easy to use, while maintaining the precision and reliability required for a device as complex as the QC1.
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