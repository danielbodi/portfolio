import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '../ui/components/cards/Card';
import { Tag } from '../ui/components/atoms/Tag/Tag';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
import { CaseSummaryCard } from '../ui/components/case-summary/CaseSummaryCard';
import { Image } from '../ui/components/image/Image';
import { StackedImageShowcase } from '../ui/components/organisms/StackedImageShowcase/StackedImageShowcase';

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
      description: "This \"wavy\" animation in the header is made with canvas, and below it, some custom sliders to choose the subscription plan"
    },
    {
      src: "/screenshots/base/base-icustom-slider-component-example.png",
      alt: "Jim Mobile custom slider component",
      description: "Jim Mobile custom slider component"
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
    { name: 'Git', icon: '/skill-icons/storybook.svg' } // Using storybook icon as placeholder for Git
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
            <h1 className="text-4xl font-bold text-purple-400">Base</h1>
            <div className="flex items-center text-sm text-gray-400 mt-2">
              <span className="cursor-pointer hover:text-purple-400" onClick={() => window.location.href = '/'}>Home</span>
              <span className="mx-2">/</span>
              <span className="cursor-pointer hover:text-purple-400" onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection && window.location.pathname === '/') {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#projects';
                }
              }}>Projects</span>
              <span className="mx-2">/</span>
              <span className="text-purple-400">Base</span>
            </div>
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
                    Design is Dead has been the technical partner of Base for almost 15 years, they were located on Base's headquarters.
                    They were part of The Emakina group and they had as clients such as the Telenet group : BASE, Telenet or JIM Mobile in the telecommunications sector.
                    They developed for them their public and corporate websites, based on the CMS Adobe Experience Manager.
                  </p>
                </div>

                <div>
                  <h2 id="my-role" className="text-3xl font-bold mb-6">
                    My Role
                  </h2>
                  <p className="text-gray-400">
                    My job was to take care the UI integration, the responsiveness and cross browser optimisation of their websites and web apps, the creation of new flows and components in angular.
                    The goal being to make our content available for authors to create their own content by simply drag & drop components in AEM.
                  </p>
                </div>

                <div>
                  <h2 id="team-composition" className="text-3xl font-bold mb-6">
                    Team Composition
                  </h2>
                  <Card variant="nested" showShadow>
                    <div className="flex flex-wrap gap-3">
                      <Tag variant="dark">2 UI Developers</Tag>
                      <Tag variant="dark">4 Full-stack</Tag>
                      <Tag variant="dark">2 Back-End</Tag>
                      <Tag variant="dark">2 Testers</Tag>
                      <Tag variant="dark">1 Architect</Tag>
                      <Tag variant="dark">1 Scrum Master</Tag>
                      <Tag variant="dark">1 Business Analyst</Tag>
                      <Tag variant="dark">1 UX Designer</Tag>
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
                     const element = document.getElementById('experience');
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
                  <h2 id="experience" className="text-3xl font-bold mb-6">
                    The start of a new journey
                  </h2>
                  <div className="space-y-8">
                    <Card variant="ghost">
                      <div className="space-y-4 text-gray-400">
                        <p>
                          The Design is Dead roaster is one of the most senior, balanced and skilled teams I've ever met.
                          They introduced me to the real teamplay scene.
                          That's where I discovered methodologies like BEM, and where I started to investing myself in Scrum.
                        </p>
                        <p>
                          The contrast with my previous experiences was clear, and I learned a lot on how to work efficiently in a team and it was for me the realisation and confirmation of my hybrid design / front-end skills, the start of a more senior journey.
                        </p>
                        <p>
                          It wasn't only about taking; I knew that I had also had a lot to give.
                          There the balance was leaning more towards UI and pure front-end than UX design but I was already prepared, with 5 years of experience, to tackle more serious challenges.
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 id="contributions" className="text-3xl font-bold mb-6">
                    My Contributions
                  </h2>
                  <div className="space-y-8">
                    {/* Contribution 1 */}
                    <Card variant="ghost">
                      <h4 id="grid-system" className="text-xl font-semibold mb-4">New Grid System</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          I contributed by to introducing a new grid system, replacing their float-based grid system with a custom Flexbox-based grid, designed from scratch, that would be the base for improved versions in my future experiences.
                        </p>
                        <p>
                          This grid followed the BEM methodology, offering greater flexibility, and making the layouts more future-proof.
                          The challenge with that new grid was that support was not yet at 100%, especially in old IE browsers, but I found solutions to apply alternatives when support was bad, and I put a lot effort on making the experience working as well as possible and consistent on these old and limited browsers.
                        </p>
                      </div>
                    </Card>

                    {/* Contribution 2 */}
                    <Card variant="ghost">
                      <h4 id="dev-process" className="text-xl font-semibold mb-4">Improved Development Process</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Another contribution I made was also linked to the front-end: 
                          Our tech stack was Java backend, angular JS, and LESS for the CSS, all that produced content for the CMS AEM.
                          The dev process was really heavy (having to compile even on front-end at every code change).
                        </p>
                        <p>
                          To ease this heavy process, I started to do some research, and I ended by adding NPM scripts to enable auto-reloads on our browser at every modification, avoiding compilation on front end code changes, improving efficiency and quality of life while developing.
                        </p>
                      </div>
                    </Card>

                    {/* Solutions */}
                    <div>
                      <h2 id="addressing-grid-system" className="text-3xl font-bold mb-6">
                        Modern Flexible Layout System
                      </h2>
                      <Card variant="ghost">
                        <div className="space-y-4 text-gray-400">
                          <p>
                            The introduction of a Flexbox-based grid system was a significant improvement over the previous float-based approach. This new system provided:
                          </p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Better alignment control and vertical centering capabilities</li>
                            <li>Responsive behavior without relying on media queries for every scenario</li>
                            <li>Consistent spacing and layout across different screen sizes</li>
                            <li>Fallback solutions for older browsers ensuring cross-browser compatibility</li>
                          </ul>
                        </div>
                      </Card>
                    </div>

                    <div>
                      <h2 id="addressing-dev-process" className="text-3xl font-bold mb-6">
                        Streamlined Development Workflow
                      </h2>
                      <Card variant="ghost">
                        <div className="space-y-4 text-gray-400">
                          <p>
                            The development process improvements I implemented had several key benefits:
                          </p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Eliminated the need for constant recompilation during front-end development</li>
                            <li>Reduced the feedback loop time from minutes to seconds</li>
                            <li>Enabled real-time browser updates with auto-reload functionality</li>
                            <li>Improved team productivity and morale by removing frustrating delays</li>
                          </ul>
                        </div>
                      </Card>
                    </div>
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