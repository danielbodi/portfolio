import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../cards/Card';
import { Button } from '../buttons/Button';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (location.pathname === '/') {
          const sections = ['about', 'career', 'projects'];
          const currentSection = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });

          if (currentSection) {
            setActiveSection(currentSection);
          }
        }

        setIsScrolled(window.scrollY > 0);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleContact = () => {
    window.location.href = 'mailto:daniel.bodi.gil@gmail.com';
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollTarget', sectionId);
      navigate('/');
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
  };

  const isProjectPage = location.pathname.startsWith('/projects/');
  const currentProject = isProjectPage ? location.pathname.split('/').pop() : null;

  const getProjectsBreadcrumb = () => {
    if (currentProject === 'bridgestone') {
      return (
        <span className="c-navigation__breadcrumb">
          <span className="c-navigation__breadcrumb-separator">/</span>
          <span className="c-navigation__breadcrumb-current">Bridgestone</span>
        </span>
      );
    }
    return null;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header className="c-navigation__desktop">
        <div className="c-navigation__wrapper">
          <div className="c-navigation__container">
            <div className={`c-navigation__inner ${isScrolled ? 'c-navigation__inner--scrolled' : ''}`}>
              <Card 
                variant="nav" 
                isSticky={isScrolled}
                className="c-navigation__card"
              >
                <nav className="c-navigation__content">
                  <ul className="c-navigation__menu">
                    <li className="c-navigation__item">
                      <button 
                        onClick={() => scrollToSection('about')} 
                        className={`c-navigation__link ${!isProjectPage && activeSection === 'about' ? 'c-navigation__link--active' : ''}`}
                      >
                        About me
                      </button>
                    </li>
                    <li className="c-navigation__item">
                      <button 
                        onClick={() => scrollToSection('career')} 
                        className={`c-navigation__link ${!isProjectPage && activeSection === 'career' ? 'c-navigation__link--active' : ''}`}
                      >
                        Career
                      </button>
                    </li>
                    <li className="c-navigation__item">
                      <button 
                        onClick={() => scrollToSection('projects')} 
                        className={`c-navigation__link ${(isProjectPage || (!isProjectPage && activeSection === 'projects')) ? 'c-navigation__link--active' : ''}`}
                      >
                        Projects
                        {getProjectsBreadcrumb()}
                      </button>
                    </li>
                  </ul>
                  <div className="c-navigation__actions">
                    <Button 
                      variant="secondary" 
                      onClick={handleContact}
                    >
                      Contact me
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => window.open('cv/DBG_CV_2025.pdf', '_blank')}
                    >
                      Download my CV
                    </Button>
                  </div>
                </nav>
              </Card>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="c-navigation__mobile">
        <Card variant="nav" isSticky={true} className="c-navigation__card">
          <ul className="c-navigation__menu c-navigation__menu--mobile">
            <li className="c-navigation__item">
              <button 
                onClick={() => scrollToSection('about')} 
                className={`c-navigation__link ${!isProjectPage && activeSection === 'about' ? 'c-navigation__link--active' : ''}`}
              >
                About
              </button>
            </li>
            <li className="c-navigation__item">
              <button 
                onClick={() => scrollToSection('career')} 
                className={`c-navigation__link ${!isProjectPage && activeSection === 'career' ? 'c-navigation__link--active' : ''}`}
              >
                Career
              </button>
            </li>
            <li className="c-navigation__item">
              <button 
                onClick={() => scrollToSection('projects')} 
                className={`c-navigation__link ${(isProjectPage || (!isProjectPage && activeSection === 'projects')) ? 'c-navigation__link--active' : ''}`}
              >
                Projects
              </button>
            </li>
            <li className="c-navigation__item">
              <button 
                onClick={handleContact}
                className="c-navigation__link"
              >
                Contact
              </button>
            </li>
            <li className="c-navigation__item">
              <a 
                href="cv/DBG_CV_2025.pdf"
                target="_blank"
                className="c-navigation__link"
              >
                CV
              </a>
            </li>
          </ul>
        </Card>
      </nav>
    </>
  );
} 