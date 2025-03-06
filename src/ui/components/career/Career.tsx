import React, { useEffect, useRef } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../cards/Card';
import { useMouseGradient } from '../../../hooks/useMouseGradient';
import { Tag } from '../atoms/Tag/Tag';

interface CareerItem {
  company: string;
  role: string;
  period: string;
  logo: string;
  projects?: {
    name: string;
    logo: string;
    caseStudyPath?: string;
  }[];
}

const careerData: CareerItem[] = [
  {
    company: 'CTG/Cegeka',
    role: 'Senior UI/UX Designer Consultant',
    period: 'Jan 2019 - till now',
    logo: '/company-logos/cegeka logo.png',
    projects: [
      {
        name: 'Bridgestone',
        logo: '/company-logos/Bridgestone logo.png',
        caseStudyPath: '/projects/bridgestone'
      },
      {
        name: 'Trasis',
        logo: '/company-logos/trasis logo.png'
      }
    ]
  },
  {
    company: 'Sopra Banking',
    role: 'Senior UI/UX',
    period: 'April 2018 - Dec 2018',
    logo: '/company-logos/sopra logo.png',
    projects: [
      {
        name: 'SBS',
        logo: '/company-logos/sopra mini logo.png'
      }
    ]
  },
  {
    company: 'Design is Dead/Emakina',
    role: 'UI Developer',
    period: 'Jan 2016 - March 2018',
    logo: '/company-logos/emakina logo.png',
    projects: [
      {
        name: 'Base',
        logo: '/company-logos/base logo.png'
      }
    ]
  },
  {
    company: 'Stepstone',
    role: 'Front-End Developer',
    period: 'Jun 2015 - Dec 2015',
    logo: '/company-logos/stepstone logo.png'
  },
  {
    company: 'BTI Belgium',
    role: 'Web Designer',
    period: 'Nov 2011 - May 2015',
    logo: '/company-logos/bti logo.png'
  },
  {
    company: 'JL Gestion',
    role: 'Web Design Trainer',
    period: 'Oct 2010 - Oct 2011',
    logo: '/company-logos/jl gestion logo.png'
  }
];

export function Career() {
  const { degree } = useMouseGradient();
  const navigate = useNavigate();
  const careerItemsRef = useRef<(HTMLDivElement | null)[]>([]);
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

    careerItemsRef.current.forEach((item) => {
      if (item) {
        observerRef.current?.observe(item);
      }
    });

    return () => {
      if (observerRef.current) {
        careerItemsRef.current.forEach((item) => {
          if (item) {
            observerRef.current?.unobserve(item);
          }
        });
      }
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCaseStudyClick = (projectName: string) => {
    const project = careerData
      .flatMap(item => item.projects || [])
      .find(p => p.name === projectName);

    if (project?.caseStudyPath) {
      navigate(project.caseStudyPath);
    }
  };

  return (
    <section id="career" className="min-h-screen py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-400">My career</h2>
          {/* Hexagon badge */}
          <div 
            className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0"
            style={{
              filter: 'drop-shadow(-8px 8px 40px rgba(0, 0, 0, 0.17))'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="144" viewBox="0 0 81 91" fill="none" className="absolute inset-0 w-full h-full">
              <path d="M36.06 2.07371C38.7356 0.528957 42.032 0.528958 44.7076 2.07371L75.8301 20.0423C78.5057 21.5871 80.154 24.4419 80.154 27.5314V63.4686C80.154 66.5581 78.5057 69.4129 75.8301 70.9577L44.7076 88.9263C42.032 90.471 38.7356 90.471 36.06 88.9263L4.93743 70.9577C2.26184 69.4129 0.613609 66.5581 0.613609 63.4686V27.5314C0.613609 24.4419 2.26184 21.5871 4.93744 20.0423L36.06 2.07371Z" fill="#32323A"/>
              <path d="M36.06 2.07371C38.7356 0.528957 42.032 0.528958 44.7076 2.07371L75.8301 20.0423C78.5057 21.5871 80.154 24.4419 80.154 27.5314V63.4686C80.154 66.5581 78.5057 69.4129 75.8301 70.9577L44.7076 88.9263C42.032 90.471 38.7356 90.471 36.06 88.9263L4.93743 70.9577C2.26184 69.4129 0.613609 66.5581 0.613609 63.4686V27.5314C0.613609 24.4419 2.26184 21.5871 4.93744 20.0423L36.06 2.07371Z" fill="url(#paint0_radial_86_1024)" fillOpacity="0.15"/>
              <path d="M36.06 2.07371C38.7356 0.528957 42.032 0.528958 44.7076 2.07371L75.8301 20.0423C78.5057 21.5871 80.154 24.4419 80.154 27.5314V63.4686C80.154 66.5581 78.5057 69.4129 75.8301 70.9577L44.7076 88.9263C42.032 90.471 38.7356 90.471 36.06 88.9263L4.93743 70.9577C2.26184 69.4129 0.613609 66.5581 0.613609 63.4686V27.5314C0.613609 24.4419 2.26184 21.5871 4.93744 20.0423L36.06 2.07371Z" stroke="url(#paint1_linear_86_1024)"/>
              <defs>
                <radialGradient id="paint0_radial_86_1024" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(103.839 8.13696) rotate(155.323) scale(53.4964 75.1954)">
                  <stop stopColor="#B490FF"/>
                  <stop offset="1" stopColor="#32323A"/>
                </radialGradient>
                <linearGradient 
                  id="paint1_linear_86_1024" 
                  gradientUnits="userSpaceOnUse"
                  gradientTransform={`rotate(${degree}, 40.3839, 45.5)`}
                >
                  <stop stopColor="rgba(55, 55, 62, 1)"/>
                  <stop offset="1" stopColor="rgba(180, 144, 255, 1)"/>
                </linearGradient>
              </defs>
            </svg>
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl md:text-5xl font-bold text-purple-400">14</span>
              <span className="text-[0.625rem] md:text-base text-gray-400 mt-1 md:mt-2">Years of exp.</span>
            </div>
          </div>
        </div>
        
        {/* Timeline container */}
        <div className="flex">
          <div className="md:w-[160px]">
            <div className="w-full mb-4">
              <div className="bg-purple-400 text-white px-4 md:px-6 py-2 rounded-full text-sm font-medium text-center w-full">
                Today
              </div>
            </div>
          </div>
        </div>

        {/* Experiences wrapper */}
        <div className="flex flex-col gap-4">
          {careerData.map((item, index) => (
            <div 
              key={index} 
              className="timeline-wrapper flex gap-2 md:gap-4 opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
              ref={el => careerItemsRef.current[index] = el}
            >
              {/* Timeline */}
              <div className="relative w-[50px] md:w-[160px] flex flex-col items-center gap-4">
                <div className="w-3 h-3 bg-purple-400 rounded-full border-[#2A2A32] relative z-10"></div>
                <div className="relative w-[2px] bg-purple-400 flex-1"></div>
              </div>

              {/* Experience card */}
              <div className="flex-1">
                <Card>
                  <div className="flex flex-col gap-6">
                    {/* Logo and title section */}
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img 
                          src={item.logo} 
                          alt={`${item.company} logo`}
                          className="w-8 h-8 object-contain p-1"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.role}</h3>
                        <p className="text-gray-400">
                          <span className="text-white border-b border-white/20">{item.company}</span>
                          <span className="mx-2 text-gray-500">|</span>
                          <span className="text-gray-500 text-sm">{item.period}</span>
                        </p>
                      </div>
                    </div>

                    {/* Projects */}
                    {item.projects && (
                      <div className="space-y-4">
                        {item.projects.map((project, pIndex) => (
                          <Card key={pIndex} variant="nested">
                            <div className="space-y-4">
                              {/* Only show labels for CTG/Cegeka */}
                              {item.company === 'CTG/Cegeka' && (
                                <h4 className="text-gray-400 text-sm">
                                  {pIndex === 0 ? 'Current Project' : 'Previous Project'}
                                </h4>
                              )}
                              <div className="flex flex-col sm:flex-wrap md:flex-row md:items-center gap-4 md:justify-between">
                                <div className="flex flex-wrap items-center gap-3">
                                  <div className="w-7 h-7 bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                                    <img 
                                      src={project.logo} 
                                      alt={`${project.name} logo`}
                                      className="w-6 h-6 object-contain p-0.5"
                                    />
                                  </div>
                                  <span className="text-gray-300">{project.name}</span>
                                </div>
                                {project.caseStudyPath && (
                                  <button 
                                    className="c-button c-button--secondary md:w-auto"
                                    onClick={() => handleCaseStudyClick(project.name)}
                                  >
                                    See this Case Study
                                    <ExternalLink size={16} />
                                  </button>
                                )}
                                {!project.caseStudyPath && (
                                  <Tag variant="dark">Case Study in Progress</Tag>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline end marker */}
        <div className="flex">
          <div className="md:w-[160px]">
            <div className="w-full mt-4">
              <div className="bg-purple-400 text-white px-4 md:px-6 py-2 rounded-full text-sm font-medium text-center w-full">
                October 2010
              </div>
            </div>
          </div>
        </div>

        {/* See my Projects link */}
        <div className="mt-24 md:mt-32 flex flex-col items-center">
          <button 
            onClick={scrollToProjects}
            className="c-button c-button--ghost flex flex-col items-center"
          >
            <span className="mb-2">See my Projects</span>
            <ChevronDown className="animate-bounce" size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}