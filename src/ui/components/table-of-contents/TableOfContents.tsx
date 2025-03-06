import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../cards/Card';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  variant?: 'desktop' | 'mobile';
}

export function TableOfContents({ variant = 'desktop' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const activeBorderRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Get all h2 and h3 elements from the content
    const elements = Array.from(document.querySelectorAll('h2, h3'));
    
    // Create TOC items from headings
    const items = elements.map(element => ({
      id: element.id,
      text: element.textContent || '',
      level: parseInt(element.tagName[1])
    }));

    setHeadings(items);

    // Set up intersection observer for headings
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px'
      }
    );

    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  useEffect(() => {
    if (variant === 'mobile') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 300);
        
        // Close TOC when scrolling more than 25px
        if (Math.abs(currentScrollY - lastScrollY.current) > 25) {
          setIsOpen(false);
        }
        lastScrollY.current = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [variant]);

  useEffect(() => {
    if (variant === 'mobile') {
      const handleClickOutside = (event: MouseEvent) => {
        if (tocRef.current && !tocRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [variant]);

  useEffect(() => {
    if (activeBorderRef.current && listRef.current && activeId) {
      const activeElement = listRef.current.querySelector(`[data-id="${activeId}"]`) as HTMLElement;
      if (activeElement) {
        const { offsetTop } = activeElement;
        activeBorderRef.current.style.transform = `translateY(${offsetTop}px)`;
      }
    }
  }, [activeId]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Increased offset to account for sticky header and spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveId(id);
      if (variant === 'mobile') {
        setIsOpen(false);
      }
    }
  };

  if (variant === 'mobile') {
    return (
      <nav 
        ref={tocRef}
        className={`toc toc--mobile ${isScrolled ? 'is-scrolled' : ''}`}
        aria-label="Table of Contents"
      >
        <Card className="toc__card toc__card--mobile">
          <div className="toc__nav toc__nav--mobile">
            <header className="toc__header">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="toc__toggle group"
                aria-expanded={isOpen}
                aria-controls="mobile-toc-content"
              >
                <span className="toc__current">
                  {activeId ? headings.find(h => h.id === activeId)?.text : 'Table of Contents'}
                </span>
                <svg
                  className={`toc__icon group-hover:text-purple-400 ${isOpen ? 'is-open' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </header>
            <div 
              id="mobile-toc-content"
              className="toc__content"
              style={{ 
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                opacity: isOpen ? 1 : 0,
                transform: `translateY(${isOpen ? '0' : '-8px'})`
              }}
            >
              <div className="overflow-hidden">
                <ul className="toc__list toc__list--mobile">
                  {headings.map((heading, index) => (
                    <li 
                      key={`${heading.id}-${index}`}
                      className="toc__item"
                      style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                    >
                      <button
                        onClick={() => handleClick(heading.id)}
                        className={`toc__link toc__link--mobile ${activeId === heading.id ? 'is-active' : ''}`}
                        aria-current={activeId === heading.id ? 'true' : undefined}
                      >
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </nav>
    );
  }

  return (
    <aside className="toc toc--desktop" aria-label="Table of Contents">
      <Card className="toc__card">
        <nav className="toc__nav">
          <div className="relative">
            {/* Active border indicator */}
            <div 
              ref={activeBorderRef}
              className="toc__active-border"
            />
            
            {/* Navigation items */}
            <ul ref={listRef} className="toc__list">
              {headings.map((heading, index) => (
                <li 
                  key={`${heading.id}-${index}`}
                  data-id={heading.id}
                  className="toc__item"
                  style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                >
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`toc__link ${activeId === heading.id ? 'is-active' : ''}`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </Card>
    </aside>
  );
}