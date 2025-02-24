import React, { useRef, useEffect } from 'react';
import { Card } from './ui/Card';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
}

const projects: Project[] = [
  {
    company: 'Bridgestone',
    title: "Bridgestone's Back-Office UI",
    description: "In this project, I tackled challenges such as the initial absence of a design system, difficulties with custom development, and limited opportunities for user research.",
    images: {
      main: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000&h=600"
    },
    logo: "/company-logos/Bridgestone logo.png",
    imagePosition: 'left'
  },
  {
    company: 'Trasis',
    title: "Senior UI/UX Designer Consultant",
    period: "Jul 2019 - Dec 2020",
    description: "In this project, I tackled challenges such as the absence of a design system, difficulties with custom development, and limited opportunities for user research.",
    images: {
      main: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000&h=600"
    },
    logo: "/company-logos/trasis logo.png",
    imagePosition: 'right'
  },
  {
    company: 'Sopra Banking',
    title: "Senior UI/UX Designer Consultant",
    period: "Jul 2019 - Jul 2020",
    description: "In this project, I tackled challenges such as the absence of a design system, difficulties with custom development, and limited opportunities for user research.",
    images: {
      main: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000&h=600"
    },
    logo: "/company-logos/sopra logo.png",
    imagePosition: 'left'
  },
  {
    company: 'Base',
    title: "Senior UI/UX Designer Consultant",
    period: "Jul 2019 - Jul 2020",
    description: "In this project, I tackled challenges such as the absence of a design system, difficulties with custom development, and limited opportunities for user research.",
    images: {
      main: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000&h=600"
    },
    logo: "/company-logos/base logo.png",
    imagePosition: 'right'
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
    if (company === 'Bridgestone') {
      navigate('/projects/bridgestone');
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
                    <div className="relative">
                      {/* Main image */}
                      <div className="relative aspect-[5/3] overflow-hidden rounded-lg shadow-lg">
                        <div className="absolute inset-0 bg-gray-900/10"></div>
                        <img 
                          src={project.images.main} 
                          alt={`${project.title} main screenshot`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
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
                            {project.description}
                          </p>
                        </div>

                        <button 
                          className="btn btn-secondary"
                          onClick={() => handleCaseStudyClick(project.company)}
                        >
                          See this Case Study
                          <ExternalLink size={16} />
                        </button>
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