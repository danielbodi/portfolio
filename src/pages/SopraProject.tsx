import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/components/cards/Card';
import { Tag } from '../ui/components/atoms/Tag/Tag';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
import { CaseSummaryCard } from '../ui/components/case-summary/CaseSummaryCard';
import { Image } from '../ui/components/image/Image';
import { ProjectGallery } from '../ui/components/gallery/ProjectGallery';
import { StackedImageShowcase } from '../ui/components/organisms/StackedImageShowcase/StackedImageShowcase';

export function SopraProject() {
  const galleryImages = [
    {
      src: "/screenshots/sopra/sopra-login-page.png",
      alt: "Login screen for Santander online Banking",
      description: "Login screen for Santander online Banking"
    },
    {
      src: "/screenshots/sopra/sopra-account-hystory.png",
      alt: "Account history page showing transaction details",
      description: "Account history page showing transaction details"
    },
    {
      src: "/screenshots/sopra/sopra-payment-creation.png",
      alt: "Payment creation interface with form fields",
      description: "Payment creation interface with form fields"
    },
    {
      src: "/screenshots/sopra/sopra-eu-standing-order.png",
      alt: "European standing order transaction setup",
      description: "European standing order transaction setup"
    },
    {
      src: "/screenshots/sopra/sopra-end-screen.png",
      alt: "Confirmation screen after completing a transaction",
      description: "Confirmation screen after completing a transaction"
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
    { name: 'Git', icon: '/skill-icons/storybook.svg' } // Using storybook icon as placeholder
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
            <h1 className="text-4xl font-bold text-purple-400">Sopra Banking Software</h1>
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
                    Banking software isn't exactly known for its stellar user experience, is it? Sopra Banking builds the core systems that power financial institutions, 
                    and their software needed a serious design intervention. Think enterprise banking platforms that handle millions of transactions, 
                    but with interfaces that looked like they were built in 2005. My mission: bring their design process into the modern era.
                  </p>
                </div>

                <div>
                  <h2 id="my-role" className="text-3xl font-bold mb-6">
                    My Role
                  </h2>
                  <p className="text-gray-400">
                    I joined as the design reinforcement—they had one designer drowning in work and a team of junior developers who needed guidance on everything from CSS architecture to component thinking. 
                    My job was to be the bridge between design ambitions and development reality, while teaching the team that good code structure isn't just nice to have—it's essential for scaling enterprise software.
                  </p>
                </div>

                <div>
                  <h2 id="team-composition" className="text-3xl font-bold mb-6">
                    Team Composition
                  </h2>
                  <Card variant="nested" showShadow>
                    <div className="flex flex-wrap gap-3">
                      <Tag variant="dark">2 UI/UX Designers</Tag>
                      <Tag variant="dark">3 Front-End Devs</Tag>
                      <Tag variant="dark">2 Back-End Devs</Tag>
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

                <div>
                  <h2 id="project-impact" className="text-3xl font-bold mb-6">
                    Project Impact
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card variant="nested" showShadow>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">40%</div>
                        <div className="text-sm text-gray-400">Faster Prototyping</div>
                      </div>
                    </Card>
                    <Card variant="nested" showShadow>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">30%</div>
                        <div className="text-sm text-gray-400">Cost Reduction</div>
                      </div>
                    </Card>
                    <Card variant="nested" showShadow>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">2x</div>
                        <div className="text-sm text-gray-400">Scalability</div>
                      </div>
                    </Card>
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
                      <h4 id="structure-seniority" className="text-xl font-semibold mb-4">Structure and Seniority in Front-End Development</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          The front-end team was relatively junior and needed guidance for design to code translation and to build the layouts.
                        </p>
                        <p>
                          Their outdated CSS practices, such as a float-based grid system, and the absence of organized CSS structures led to technical debt and inefficiencies while developing.
                        </p>
                      </div>
                    </Card>

                    {/* Challenge 2 */}
                    <Card variant="ghost">
                      <h4 id="scalable-design" className="text-xl font-semibold mb-4">Scalable Design Processes and methodologies</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          When I joined, they had a basic pdf document as style guide for UI and UX principles, but they lacked of a real design system.
                        </p>
                        <p>
                          Another issue was that their components, when they were available, were not built with the Atomic Design methodology, making it difficult to scale and maintain consistency across the product.
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
                      <h4 id="addressing-structure" className="text-xl font-semibold mb-4">Addressing the Structure and Seniority in Front-End Development</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          To address the lack of CSS structure, I introduced the BEM methodology.
                          At first some members of the team were reticent due to its increased verbosity, but by showing them real life examples and solutions to issues they were struggling in their CSS development, they eventually saw how this approach provided a clear way to organise and name their CSS, making it scalable and reusable.
                        </p>
                        <p>
                          Another contribution I did on the front-end was to replace their float-based grid system with a custom Flexbox-based grid, designed from scratch. This new grid adhered to the BEM methodology, offering greater flexibility, reducing technical debt, and making the layouts more future-proof.
                        </p>
                        <p>
                          In order to effectively apply all these changes and that new approach, I made myself available to answer any questions, assist with CSS and HTML-related issues, and provide coaching to those struggling with specific implementation challenges. 
                          All that resulted on a built thrust amongst designer and developers and improved our collaboration.
                        </p>
                      </div>
                    </Card>

                    {/* Solution 2 */}
                    <Card variant="ghost">
                      <h4 id="addressing-design" className="text-xl font-semibold mb-4">Addressing Scalable Design Processes and methodologies</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          As mentioned, our UI components were not optimised for maintenance and were not really scalable, I then started to implement the Atomic Design methodology on newer and strategic components, in order to tackle that issue, but to still be able to deliver.
                          The goal was to progressively catch-up with the rest of our existing components as we would use them in our prototypes.
                        </p>
                        <p>
                          After a while this rework allowed the design team to prototype faster, reduce costs by reusing components, and ensure a systematic and scalable approach to design.
                        </p>
                        <p>
                          Once the components were reworked and our quality of life while designing got improved, I proposed to build a Design System to bridge the gap between design and development. 
                          This system would evolve from their existing pdf style guide into a more usable web platform that would include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Documentation on our design foundations and principles (color palettes, custom icons, typography, grid, ect...).</li>
                          <li>A component library with our custom components, how to's, best practices and code related documentation.</li>
                        </ul>
                        <p>
                          I left the project before delivering the design system, what I could see, though, was how the way I addressed these challenges brought structure, scalability, and efficiency and ended up helping modernize the workflows to both the design and development processes.
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Project connection */}
                <div className="pt-8 border-t border-gray-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-400 mb-2">The evolution continues</h3>
                      <p className="text-gray-400">
                        Teaching methodologies at Sopra prepared me for the ultimate challenge: 
                        building design systems from scratch as a consultant at Trasis and Bridgestone.
                      </p>
                    </div>
                    <button 
                      onClick={() => window.location.href = '/projects/trasis'}
                      className="c-button c-button--secondary flex-shrink-0 ml-6"
                    >
                      Next Project →
                    </button>
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
