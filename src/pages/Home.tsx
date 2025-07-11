import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Career } from '../ui/components/career/Career';
import { Projects } from '../ui/components/projects/Projects';
import { ChevronDown } from 'lucide-react';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'instant' });
        });
      }
      sessionStorage.removeItem('scrollTarget');
    }
  }, [location]);

  const scrollToCareer = () => {
    const careerSection = document.getElementById('career');
    if (careerSection) {
      careerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="about" className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">            
          {/* Content wrapper with even distribution */}
          <div className="flex-1 flex flex-col justify-between p-6 md:p-8 w-full">
            {/* Hero content */}
            <div className="flex-1 flex md:items-center w-full pt-8 md:pt-0">
              <div className="w-full max-w-5xl mx-auto">
                <h1 className="text-[2.85rem] md:text-6xl lg:text-[5.3rem] leading-tight md:leading-none font-bold mb-4">
                  Hey, I am Daniel Bodi Gil, <br/>
                  a <span className="text-purple-400">UI Designer / Developer </span>
                  from Belgium
                </h1>
                
                <div className="mt-6 md:mt-8 text-gray-400">
                  <p className="text-base md:text-lg text-justify">
                    I'm fascinated by the moment when developers stop asking "How do I build this?" and start asking "Which component should I use?" 
                    That's when you know your design system is working. I bridge the gap between design ambition and development reality, 
                    turning chaotic requirements into systematic solutions that teams actually want to use.
                  </p>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="pb-20 md:pb-12 flex flex-initial justify-center">
              <button 
                onClick={scrollToCareer}
                className="c-button c-button--ghost flex flex-col items-center"
              >
                <span className="mb-2">See my Career</span>
                <ChevronDown className="animate-bounce" size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Career Section */}
      <Career />

      {/* Projects Section */}
      <Projects />

      {/* Bottom spacing for mobile navigation */}
      <div className="h-16 md:h-0"></div>
    </>
  );
}