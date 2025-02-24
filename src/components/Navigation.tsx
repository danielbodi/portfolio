import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from './ui/Card';
import './Navigation.scss';

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

  const handleDownloadCV = () => {
    // Add CV download logic here
    console.log('Downloading CV...');
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
        <span className="navigation__breadcrumb">
          <span className="navigation__breadcrumb-separator">/</span>
          <span className="navigation__breadcrumb-current">Bridgestone</span>
        </span>
      );
    }
    return null;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header className="navigation navigation--desktop">
        <div className="navigation__wrapper">
          <div className="navigation__container">
            <div className={`navigation__inner ${isScrolled ? 'navigation__inner--scrolled' : ''}`}>
              <Card 
                variant="nav" 
                isSticky={isScrolled}
                className="navigation__card"
              >
                <nav className="navigation__content">
                  <ul className="navigation__menu">
                    <li className="navigation__item">
                      <button 
                        onClick={() => scrollToSection('about')} 
                        className={`navigation__link ${!isProjectPage && activeSection === 'about' ? 'navigation__link--active' : ''}`}
                      >
                        About me
                      </button>
                    </li>
                    <li className="navigation__item">
                      <button 
                        onClick={() => scrollToSection('career')} 
                        className={`navigation__link ${!isProjectPage && activeSection === 'career' ? 'navigation__link--active' : ''}`}
                      >
                        Career
                      </button>
                    </li>
                    <li className="navigation__item">
                      <button 
                        onClick={() => scrollToSection('projects')} 
                        className={`navigation__link ${(isProjectPage || (!isProjectPage && activeSection === 'projects')) ? 'navigation__link--active' : ''}`}
                      >
                        Projects
                        {getProjectsBreadcrumb()}
                      </button>
                    </li>
                  </ul>
                  <div className="navigation__actions">
                    <button onClick={handleContact} className="btn btn-secondary">Contact me</button>
                    <button onClick={handleDownloadCV} className="btn btn-primary">Download my CV</button>
                  </div>
                </nav>
              </Card>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="navigation navigation--mobile">
        <Card variant="nav" isSticky={true} className="navigation__card">
          <ul className="navigation__menu navigation__menu--mobile">
            <li className="navigation__item">
              <button 
                onClick={() => scrollToSection('about')} 
                className={`navigation__link ${!isProjectPage && activeSection === 'about' ? 'navigation__link--active' : ''}`}
              >
                About
              </button>
            </li>
            <li className="navigation__item">
              <button 
                onClick={() => scrollToSection('career')} 
                className={`navigation__link ${!isProjectPage && activeSection === 'career' ? 'navigation__link--active' : ''}`}
              >
                Career
              </button>
            </li>
            <li className="navigation__item">
              <button 
                onClick={() => scrollToSection('projects')} 
                className={`navigation__link ${(isProjectPage || (!isProjectPage && activeSection === 'projects')) ? 'navigation__link--active' : ''}`}
              >
                Projects
              </button>
            </li>
            <li className="navigation__item">
              <button 
                onClick={handleContact}
                className="navigation__link"
              >
                Contact
              </button>
            </li>
            <li className="navigation__item">
              <button 
                onClick={handleDownloadCV}
                className="navigation__link"
              >
                CV
              </button>
            </li>
          </ul>
        </Card>
      </nav>
    </>
  );
}