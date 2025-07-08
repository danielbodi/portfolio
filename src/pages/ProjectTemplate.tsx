import React, { useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/components/cards/Card';
import { Tag } from '../ui/components/atoms/Tag/Tag';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
import { CaseSummaryCard } from '../ui/components/case-summary/CaseSummaryCard';
import { Image } from '../ui/components/image/Image';
import { ProjectGallery } from '../ui/components/gallery/ProjectGallery';


interface ProjectImage {
  src: string;
  alt: string;
  description: string;
}

interface Skill {
  name: string;
  icon: string;
}

interface Platform {
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
  content: (string | React.ReactNode)[];
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
  
  // Hero section
  heroImage: ProjectImage;
  
  // Team and skills
  teamMembers: TeamMember[];
  platforms: Platform[];
  designSkills: Skill[];
  devSkills: Skill[];
  
  // Images and showcase
  galleryImages: ProjectImage[];
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
  heroImage,
  teamMembers,
  platforms,
  designSkills,
  devSkills,
  galleryImages,
  detailedImageFeatures,
  caseSummaryData,
  projectImpact,
  challenges,
  solutions,
  projectConnection,
  additionalSections
}: ProjectTemplateProps) {
  
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const challengeItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const solutionItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('animate-out');
            entry.target.classList.add('animate-in');
          } else {
            const currentScrollY = window.scrollY;
            const isScrollingUp = currentScrollY < lastScrollY.current;
            lastScrollY.current = currentScrollY;
            
            if (isScrollingUp) {
              entry.target.classList.remove('animate-in');
              entry.target.classList.add('animate-out');
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    const allElements = [
      ...sectionRefs.current,
      ...galleryItemRefs.current,
      ...challengeItemRefs.current,
      ...solutionItemRefs.current
    ];

    allElements.forEach((element) => {
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        allElements.forEach((element) => {
          if (element) {
            observerRef.current?.unobserve(element);
          }
        });
      }
    };
  }, []);
  
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



  return (
    <main className="project-page">
      {/* Mobile Table of Contents */}
      <div className="lg:hidden">
        <TableOfContents variant="mobile" pathname={pathname} />
      </div>

      <div className="project-page__header">
          <div className="project-page__title flex flex-col items-start gap-4">
            <h1 className="text-4xl font-bold text-purple-400 text-left">{title}</h1>
            <div className="flex flex-wrap gap-3 justify-start">
              {platforms.map((platform, index) => (
                <Tag key={index} variant="ghost">
                  <div className="flex items-center gap-2">
                    <img 
                      src={platform.icon} 
                      alt={platform.name}
                      className="w-4 h-4 brightness-0 invert"
                    />
                    <span>{platform.name}</span>
                  </div>
                </Tag>
              ))}
            </div>
          </div>
      </div>

      {/* Hero Section */}
      <div className="w-full mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              aspectRatio="video"
              frame="none"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1">
            <Card variant="ghost">
              <div className="space-y-12 text-gray-300">
                <div
                  ref={el => sectionRefs.current[0] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="project-description" className="text-3xl font-bold mb-6">
                    Project description
                  </h2>
                  <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: projectDescription }} />
                </div>

                <div
                  ref={el => sectionRefs.current[1] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="my-role" className="text-3xl font-bold mb-6">
                    My Role
                  </h2>
                  <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: myRole }} />
                </div>

                <div
                  ref={el => sectionRefs.current[2] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
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

                <div
                  ref={el => sectionRefs.current[3] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
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



                <div
                  ref={el => sectionRefs.current[4] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="interface-showcase" className="text-3xl font-bold mb-6">
                    Interface Showcase
                  </h2>
                  <div className="detailed-image-section">
                    {galleryImages.map((image, index) => (
                      <div 
                        key={index}
                        ref={el => galleryItemRefs.current[index] = el}
                        className="detailed-image-section__item opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                        style={{ transitionDelay: `${index * 100}ms` }}
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
                          <p className="detailed-image-section__description" dangerouslySetInnerHTML={{ __html: image.description }} />

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  ref={el => sectionRefs.current[5] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
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
                  <div
                    ref={el => sectionRefs.current[6] = el}
                    className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                  >
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
                {additionalSections && (
                  <div
                    ref={el => sectionRefs.current[7] = el}
                    className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                  >
                    {additionalSections}
                  </div>
                )}
                
                {/* Full case link */}
                <div
                  ref={el => sectionRefs.current[8] = el}
                  className="mt-24 md:mt-32 flex flex-col items-center text-center opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
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
                
                <div
                  ref={el => sectionRefs.current[9] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="challenges" className="text-3xl font-bold mb-6">
                    The Challenges I've faced
                  </h2>
                  <div className="space-y-8">
                    {challenges.map((challenge, index) => (
                      <div
                        key={index}
                        ref={el => challengeItemRefs.current[index] = el}
                        className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                        style={{ transitionDelay: `${index * 150}ms` }}
                      >
                        <Card variant="ghost">
                          <h4 id={challenge.id} className="text-xl font-semibold mb-4">{challenge.title}</h4>
                          <div className="space-y-4 text-gray-400">
                            {challenge.content.map((paragraph, pIndex) => (
                              <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                            ))}
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  ref={el => sectionRefs.current[10] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="solutions" className="text-3xl font-bold mb-6">
                    How I overcame them
                  </h2>
                  <div className="space-y-8">
                    {solutions.map((solution, index) => (
                      <div
                        key={index}
                        ref={el => solutionItemRefs.current[index] = el}
                        className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                        style={{ transitionDelay: `${index * 150}ms` }}
                      >
                        <Card variant="ghost">
                          <h4 id={solution.id} className="text-xl font-semibold mb-4">{solution.title}</h4>
                          <div className="space-y-4 text-gray-400">
                            {solution.content.map((paragraph, pIndex) => (
                              typeof paragraph === 'string' ? (
                                <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                              ) : (
                                <div key={pIndex}>{paragraph}</div>
                              )
                            ))}
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project connection */}
                {projectConnection && (
                  <div
                    ref={el => sectionRefs.current[11] = el}
                    className="pt-8 border-t border-gray-500 opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-purple-400 mb-2">{projectConnection.title}</h3>
                        <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: projectConnection.description }} />
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