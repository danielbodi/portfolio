import React, { useRef, useEffect } from 'react';
import { Card } from '../cards/Card';
import { Image } from '../image/Image';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TextWithBreaks } from '../text/Text';
import { Tag } from '../atoms/Tag/Tag';

interface Project {
  company: string;
  title: string;
  description: string;
  period?: string;
  images: {
    main: string;
  };
  logo: string;
  imagePosition?: 'left' | 'right';
  frame?: 'desktop' | 'tablet' | 'none';
  caseStudyPath?: string;
}

const projects: Project[] = [
  {
    company: 'Bridgestone',
    title: "Bridgestone's Back-Office UI",
    period: "Jul 2019 - Now",
    description: "In this project, I tackled challenges such as the initial absence of a design system, difficulties with custom development, and limited opportunities for user research.",
    images: {
      main: "/screenshots/bs-thumbnail.png"
    },
    logo: "/company-logos/Bridgestone logo.png",
    imagePosition: 'left',
    frame: 'tablet',
    caseStudyPath: '/projects/bridgestone'
  },
  {
    company: 'Trasis',
    title: "Trasis QC1",
    period: "Jul 2019 - Dec 2020",
    description: "The QC1 required a UI that mirrored the device's real-life mechanisms. I tackled challenges such as unfamiliarity with designers, scalable design system needs, and complexity of custom UI elements.",
    images: {
      main: "/screenshots/trasis-thumbnail.png"
    },
    logo: "/company-logos/trasis logo.png",
    imagePosition: 'right',
    frame: 'tablet'
  },
  {
    company: 'Sopra Banking',
    title: "Sopra Banking Software",
    period: "Apr 2018 - Nov 2018",
    description: "At Sopra Banking, I joined the UI team to help scale design and front-end development for their banking software. <br/> I tackled challenges such as unclear design approach, a lack of structured methodologies, and a junior front-end team.",
    images: {
      main: "/screenshots/sbs-thumbnail.png"
    },
    logo: "/company-logos/sopra logo.png",
    imagePosition: 'left',
    frame: 'desktop'
  },
  {
    company: 'Base',
    title: "Base ecosystem",
    period: "Jan 2016 - Apr 2018",
    description: "At base I took care of the UI integration, the responsiveness and cross browser optimisation of their websites and web apps, and the creation of new components in angular.",
    images: {
      main: "/screenshots/base-thumbnail.png"
    },
    logo: "/company-logos/base logo.png",
    imagePosition: 'right',
    frame: 'desktop'
  }
];

export function Projects() {
  const navigate = useNavigate();
  const projectItemsRef = useRef<(HTMLDivElement | null)[]>([]);
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
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    projectItemsRef.current.forEach((item) => {
      if (item) {
        observerRef.current?.observe(item);
      }
    });

    return () => {
      if (observerRef.current) {
        projectItemsRef.current.forEach((item) => {
          if (item) {
            observerRef.current?.unobserve(item);
          }
        });
      }
    };
  }, []);

  const handleCaseStudyClick = (company: string) => {
    const project = projects.find(p => p.company === company);
    if (project?.caseStudyPath) {
      navigate(project.caseStudyPath);
    }
  };

  return (
    <section id="projects" className="min-h-screen py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-8 md:mb-12">
          My latest projects
        </h2>

        <div className="space-y-4 md:space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => projectItemsRef.current[index] = el}
              className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
            >
              <Card>
                <div className={`flex flex-col lg:flex-row ${project.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''} gap-4`}>
                  {/* Images */}
                  <div className="lg:w-1/2">
                    <Image 
                      src={project.images.main}
                      alt={`${project.title} main screenshot`}
                      aspectRatio="video"
                      frame={project.frame}
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 flex">
                    <Card variant="nested" className="flex-1">
                      <div className="flex flex-col h-full">
                        {/* Company info */}
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                            <img 
                              src={project.logo} 
                              alt={`${project.company} logo`}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                          <span className="text-lg md:text-xl font-semibold text-white">
                            {project.company}
                          </span>
                        </div>

                        {/* Project details */}
                        <div className="flex-1 mb-4 md:mb-6">
                          <div className="mb-4">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                              {project.title}
                            </h3>
                            {project.period && (
                              <p className="text-sm text-gray-400">
                                {project.period}
                              </p>
                            )}
                          </div>
                          
                          <p className="text-gray-400 text-sm md:text-base">
                            <TextWithBreaks text={project.description} />
                          </p>
                        </div>

                        {project.caseStudyPath && (
                          <button 
                            className="c-button c-button--secondary"
                            onClick={() => handleCaseStudyClick(project.company)}
                          >
                            See this Case Study
                            <ExternalLink size={16} />
                          </button>
                        )}
                       {!project.caseStudyPath && (
                         <Tag variant="dark">Case Study in Progress</Tag>
                       )}
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}