import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/components/cards/Card';
import { Tag } from '../ui/components/atoms/Tag/Tag';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
import { CaseSummaryCard } from '../ui/components/case-summary/CaseSummaryCard';
import { Image } from '../ui/components/image/Image';
import { ProjectGallery } from '../ui/components/gallery/ProjectGallery';
import { StackedImageShowcase } from '../ui/components/organisms/StackedImageShowcase/StackedImageShowcase';

export function ProjectTemplate() {
  // Replace with project-specific images
  const galleryImages = [
    {
      src: "/screenshots/project/project-screenshot1.png",
      alt: "Project Screenshot 1",
      description: "Description of the first screenshot"
    }
    // Add more images as needed
  ];

  // Customize skills based on the project
  const designSkills = [
    { name: 'Figma', icon: '/skill-icons/figma.svg' },
    // Add more design skills as needed
  ];

  const devSkills = [
    { name: 'HTML', icon: '/skill-icons/html.svg' },
    // Add more development skills as needed
  ];

  // Customize case summary data for the project
  const caseSummaryData = [
    {
      challenge: {
        title: "Challenge Title",
        description: [
          "Challenge description point 1.",
          "Challenge description point 2."
        ]
      },
      solution: {
        title: "Solution Title",
        description: [
          "Solution description point 1.",
          "Solution description point 2."
        ]
      }
    },
    // Add more challenge/solution pairs as needed
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
            <h1 className="text-4xl font-bold text-purple-400">Project Title</h1>
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
                    Project description goes here. Provide a detailed overview of what the project is about, its purpose, and its significance.
                  </p>
                </div>

                <div>
                  <h2 id="my-role" className="text-3xl font-bold mb-6">
                    My Role
                  </h2>
                  <p className="text-gray-400">
                    Describe your role in the project, your responsibilities, and your contributions. Explain how you were involved in the project and what you accomplished.
                  </p>
                </div>

                <div>
                  <h2 id="team-composition" className="text-3xl font-bold mb-6">
                    Team Composition
                  </h2>
                  <Card variant="nested" showShadow>
                    <div className="flex flex-wrap gap-3">
                      <Tag variant="dark">X UI/UX Designers</Tag>
                      <Tag variant="dark">X Front-End Devs</Tag>
                      <Tag variant="dark">X Back-End Devs</Tag>
                      {/* Add more team members as needed */}
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
                      // Replace with project-specific images
                      {
                        src: "/screenshots/project/project-screenshot1.png",
                        alt: "Project Screenshot 1",
                        description: "Description of the first screenshot"
                      }
                      // Add more images as needed
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
                    {/* Challenge 1 */}
                    <Card variant="ghost">
                      <h4 id="challenge-1" className="text-xl font-semibold mb-4">Challenge 1 Title</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Detailed description of the first challenge you faced in this project. Explain the problem, its context, and why it was difficult to solve.
                        </p>
                        <p>
                          Additional details about the challenge, its implications, and its impact on the project.
                        </p>
                      </div>
                    </Card>

                    {/* Challenge 2 */}
                    <Card variant="ghost">
                      <h4 id="challenge-2" className="text-xl font-semibold mb-4">Challenge 2 Title</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Detailed description of the second challenge you faced in this project. Explain the problem, its context, and why it was difficult to solve.
                        </p>
                        <p>
                          Additional details about the challenge, its implications, and its impact on the project.
                        </p>
                      </div>
                    </Card>

                    {/* Challenge 3 */}
                    <Card variant="ghost">
                      <h4 id="challenge-3" className="text-xl font-semibold mb-4">Challenge 3 Title</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Detailed description of the third challenge you faced in this project. Explain the problem, its context, and why it was difficult to solve.
                        </p>
                        <p>
                          Additional details about the challenge, its implications, and its impact on the project.
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
                      <h4 id="solution-1" className="text-xl font-semibold mb-4">Challenge 1 Title: Solution Approach</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Detailed description of how you solved the first challenge. Explain your approach, the steps you took, and the outcome.
                        </p>
                        <p>
                          Additional details about your solution, including any tools, techniques, or methodologies you used.
                        </p>
                        <p>
                          Explanation of the impact of your solution on the project and any lessons learned.
                        </p>
                      </div>
                    </Card>

                    {/* Solution 2 */}
                    <Card variant="ghost">
                      <h4 id="solution-2" className="text-xl font-semibold mb-4">Challenge 2 Title: Solution Approach</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Detailed description of how you solved the second challenge. Explain your approach, the steps you took, and the outcome.
                        </p>
                        <p>
                          Additional details about your solution, including any tools, techniques, or methodologies you used.
                        </p>
                        <p>
                          Explanation of the impact of your solution on the project and any lessons learned.
                        </p>
                      </div>
                    </Card>

                    {/* Solution 3 */}
                    <Card variant="ghost">
                      <h4 id="solution-3" className="text-xl font-semibold mb-4">Challenge 3 Title: Solution Approach</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Detailed description of how you solved the third challenge. Explain your approach, the steps you took, and the outcome.
                        </p>
                        <p>
                          Additional details about your solution, including any tools, techniques, or methodologies you used.
                        </p>
                        <p>
                          Explanation of the impact of your solution on the project and any lessons learned.
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