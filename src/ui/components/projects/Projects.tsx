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
    description: "Led the design transformation of Bridgestone's vehicle management platform, building their first comprehensive design system from scratch while delivering 40+ production-ready components and establishing user research workflows.",
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
    description: "Designed an intuitive interface for complex radiopharmaceutical testing equipment, creating realistic device visualizations and establishing design credibility within a traditionally engineering-focused team.",
    images: {
      main: "/screenshots/trasis-thumbnail.png"
    },
    logo: "/company-logos/trasis logo.png",
    imagePosition: 'right',
    frame: 'tablet',
    caseStudyPath: '/projects/trasis'
  },
  {
    company: 'Sopra Banking',
    title: "Sopra Banking Software",
    period: "Apr 2018 - Nov 2018",
    description: "Modernized the design approach for enterprise banking software, mentoring junior developers while implementing scalable CSS methodologies that reduced development time by 40% and improved code maintainability.",
    images: {
      main: "/screenshots/sbs-thumbnail.png"
    },
    logo: "/company-logos/sopra logo.png",
    imagePosition: 'left',
    frame: 'tablet',
    caseStudyPath: '/projects/sopra'
  },
  {
    company: 'Base',
    title: "Base ecosystem",
    period: "Jan 2016 - Apr 2018",
    description: "Specialized in pixel-perfect UI integration and cross-browser optimization for high-traffic websites, developing responsive Angular components that improved loading performance by 50% across multiple client projects.",
    images: {
      main: "/screenshots/base-thumbnail.png"
    },
    logo: "/company-logos/base logo.png",
    imagePosition: 'right',
    frame: 'tablet',
    caseStudyPath: '/projects/base'
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
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-4">
            My latest projects
          </h2>
          <p className="text-gray-400 text-lg">
            Four companies, four different challenges, one consistent theme: turning design chaos into systems that actually work.
          </p>
        </div>

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