import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/components/cards/Card';
import { Tag } from '../ui/components/atoms/Tag/Tag';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
import { CaseSummaryCard } from '../ui/components/case-summary/CaseSummaryCard';
import { Image } from '../ui/components/image/Image';
import { ProjectGallery } from '../ui/components/gallery/ProjectGallery';
import { StackedImageShowcase } from '../ui/components/organisms/StackedImageShowcase/StackedImageShowcase';

interface ProjectImage {
  src: string;
  alt: string;
  description: string;
}

interface Skill {
  name: string;
  icon: string;
}

interface ChallengeData {
  challenge: {
    title: string;
    description: string[];
  };
  solution: {
    title: string;
    description: string[];
  };
}

interface TeamMember {
  role: string;
  count?: number;
}

interface ProjectImpact {
  value: string;
  label: string;
}

interface Challenge {
  id: string;
  title: string;
  content: string[];
}

interface Solution {
  id: string;
  title: string;
  content: string[];
}

interface ProjectConnection {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

interface DetailedImageFeatures {
  [key: number]: string[];
}

interface ProjectTemplateProps {
  // Basic project info
  title: string;
  pathname: string;
  
  // Content sections
  projectDescription: string;
  myRole: string;
  
  // Team and skills
  teamMembers: TeamMember[];
  designSkills: Skill[];
  devSkills: Skill[];
  
  // Images and showcase
  galleryImages: ProjectImage[];
  showcaseImages?: ProjectImage[]; // Optional subset for showcase
  detailedImageFeatures: DetailedImageFeatures;
  
  // Case summary
  caseSummaryData: ChallengeData[];
  
  // Project impact
  projectImpact?: ProjectImpact[];
  
  // Challenges and solutions
  challenges: Challenge[];
  solutions: Solution[];
  
  // Optional project connection
  projectConnection?: ProjectConnection;
  
  // Optional additional sections
  additionalSections?: React.ReactNode;
}

export function ProjectTemplate({
  title,
  pathname,
  projectDescription,
  myRole,
  teamMembers,
  designSkills,
  devSkills,
  galleryImages,
  showcaseImages,
  detailedImageFeatures,
  caseSummaryData,
  projectImpact,
  challenges,
  solutions,
  projectConnection,
  additionalSections
}: ProjectTemplateProps) {
  
  const renderSkills = (skills: Skill[]) => (
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

  const displayImages = showcaseImages || galleryImages;

  return (
    <main className="project-page">
      {/* Mobile Table of Contents */}
      <div className="lg:hidden">
        <TableOfContents variant="mobile" pathname={pathname} />
      </div>

      <div className="project-page__header">
          <div className="project-page__title">
            <h1 className="text-4xl font-bold text-purple-400">{title}</h1>
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
                    {projectDescription}
                  </p>
                </div>

                <div>
                  <h2 id="my-role" className="text-3xl font-bold mb-6">
                    My Role
                  </h2>
                  <p className="text-gray-400">
                    {myRole}
                  </p>
                </div>

                <div>
                  <h2 id="team-composition" className="text-3xl font-bold mb-6">
                    Team Composition
                  </h2>
                  <Card variant="nested" showShadow>
                    <div className="flex flex-wrap gap-3">
                      {teamMembers.map((member, index) => (
                        <Tag key={index} variant="dark">
                          {member.count ? `${member.count} ` : ''}{member.role}
                        </Tag>
                      ))}
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
                    images={displayImages}
                  />
                </div>

                <div>
                  <h2 id="detailed-breakdown" className="text-3xl font-bold mb-6">
                    Detailed Interface Breakdown
                  </h2>
                  <div className="detailed-image-section">
                    {galleryImages.map((image, index) => (
                      <div 
                        key={index}
                        className={`detailed-image-section__item ${
                          index % 2 === 0 
                            ? 'detailed-image-section__item--left' 
                            : 'detailed-image-section__item--right'
                        }`}
                      >
                        <div className="detailed-image-section__image-wrapper">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            aspectRatio="video"
                            frame="none"
                            className="detailed-image-section__image"
                          />
                        </div>
                        <div className="detailed-image-section__content">
                          <h3 className="detailed-image-section__title">
                            {image.alt}
                          </h3>
                          <p className="detailed-image-section__description">
                            {image.description}
                          </p>
                          <div className="detailed-image-section__features">
                            <h4 className="detailed-image-section__features-title">Key Features:</h4>
                            <ul className="detailed-image-section__features-list">
                              {detailedImageFeatures[index]?.map((feature, featureIndex) => (
                                <li key={featureIndex}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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

                {projectImpact && (
                  <div>
                    <h2 id="project-impact" className="text-3xl font-bold mb-6">
                      Project Impact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {projectImpact.map((impact, index) => (
                        <Card key={index} variant="nested" showShadow>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-purple-400 mb-2">{impact.value}</div>
                            <div className="text-sm text-gray-400">{impact.label}</div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional sections like embedded showcases */}
                {additionalSections}
                
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
                    {challenges.map((challenge, index) => (
                      <Card key={index} variant="ghost">
                        <h4 id={challenge.id} className="text-xl font-semibold mb-4">{challenge.title}</h4>
                        <div className="space-y-4 text-gray-400">
                          {challenge.content.map((paragraph, pIndex) => (
                            <p key={pIndex}>{paragraph}</p>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 id="solutions" className="text-3xl font-bold mb-6">
                    How I overcame them
                  </h2>
                  <div className="space-y-8">
                    {solutions.map((solution, index) => (
                      <Card key={index} variant="ghost">
                        <h4 id={solution.id} className="text-xl font-semibold mb-4">{solution.title}</h4>
                        <div className="space-y-4 text-gray-400">
                          {solution.content.map((paragraph, pIndex) => (
                            <p key={pIndex}>{paragraph}</p>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Project connection */}
                {projectConnection && (
                  <div className="pt-8 border-t border-gray-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-purple-400 mb-2">{projectConnection.title}</h3>
                        <p className="text-gray-400">
                          {projectConnection.description}
                        </p>
                      </div>
                      <button 
                        onClick={() => window.location.href = projectConnection.href}
                        className="c-button c-button--secondary flex-shrink-0 ml-6"
                      >
                        {projectConnection.buttonText}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
} 