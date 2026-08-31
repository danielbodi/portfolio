import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from '../cards/Card';
import { Button } from '../buttons/Button';
import { Logo } from './Logo';
import { cardBySlug } from '../../../content/caseStudies/cards';
import { contact } from '../../../content/site';
import { analytics } from '../../../utils/basicAnalytics';

interface NavItem {
  label: string;
  to: string;
  /** Marks active when the current path starts with this prefix. */
  activePrefix: string;
}

const navItems: NavItem[] = [
  { label: 'Work', to: '/work', activePrefix: '/work' },
  { label: 'Approach', to: '/approach', activePrefix: '/approach' },
  { label: 'About', to: '/about', activePrefix: '/about' }
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 2);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const isNowScrolled = window.scrollY > 2;
        setIsScrolled((prev) => (prev !== isNowScrolled ? isNowScrolled : prev));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContact = () => {
    analytics.trackPortfolioEvent('contact_click', { from: location.pathname });
    window.location.href = `mailto:${contact.email}`;
  };

  const handleCvDownload = () => {
    analytics.trackPortfolioEvent('cv_download', { variant: 'default', from: location.pathname });
    const link = document.createElement('a');
    link.href = contact.cv.file;
    link.download = contact.cv.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const caseSlugMatch = location.pathname.match(/^\/work\/(.+)$/);
  const currentCase = caseSlugMatch ? cardBySlug(caseSlugMatch[1]) : undefined;

  const isActive = (item: NavItem) => location.pathname.startsWith(item.activePrefix);

  const renderLinks = (idSuffix: string) =>
    navItems.map((item) => (
      <li key={`${item.to}-${idSuffix}`} className="c-navigation__item">
        <Link
          to={item.to}
          className={`c-navigation__link ${isActive(item) ? 'c-navigation__link--active' : ''}`}
          aria-current={location.pathname === item.to ? 'page' : undefined}
        >
          {item.label}
          {item.to === '/work' && currentCase && (
            <span className="c-navigation__breadcrumb">
              <span className="c-navigation__breadcrumb-separator">/</span>
              <span className="c-navigation__breadcrumb-current">{currentCase.shortTitle}</span>
            </span>
          )}
        </Link>
      </li>
    ));

  return (
    <>
      {/* Desktop Navigation */}
      <header className="c-navigation__desktop">
        <div className="c-navigation__wrapper">
          <div className="c-navigation__container">
            <div className={`c-navigation__inner ${isScrolled ? 'c-navigation__inner--scrolled' : ''}`}>
              <Card variant="nav" isSticky={isScrolled} className="c-navigation__card">
                <nav className="c-navigation__content" aria-label="Main">
                  <div className="flex min-w-0 items-center gap-4 lg:gap-6">
                    <Link to="/" className="c-navigation__brand" aria-label="Daniel Bodi Gil — home">
                      <Logo className="c-navigation__logo" />
                    </Link>
                    <ul className="c-navigation__menu">{renderLinks('desktop')}</ul>
                  </div>
                  {isScrolled && (
                    <div className="c-navigation__actions">
                      <Button variant="primary" onClick={handleContact}>
                        Let's talk
                      </Button>
                      <Button variant="secondary" onClick={handleCvDownload} aria-label="Download CV">
                        <span className="hidden xl:inline">Download CV</span>
                        <span className="xl:hidden">CV</span>
                      </Button>
                    </div>
                  )}
                </nav>
              </Card>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="c-navigation__mobile" aria-label="Main">
        <Card variant="nav" isSticky={true} className="c-navigation__card">
          <ul className="c-navigation__menu c-navigation__menu--mobile">
            <li className="c-navigation__item">
              <Link
                to="/"
                className={`c-navigation__link ${location.pathname === '/' ? 'c-navigation__link--active' : ''}`}
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            {renderLinks('mobile')}
            <li className="c-navigation__item">
              <button onClick={handleContact} className="c-navigation__link">
                Let's talk
              </button>
            </li>
            <li className="c-navigation__item">
              <a
                href={contact.cv.file}
                download={contact.cv.fileName}
                className="c-navigation__link"
                onClick={() => analytics.trackPortfolioEvent('cv_download', { variant: 'default', from: location.pathname })}
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
