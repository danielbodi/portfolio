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
      const activeElement = listRef.current.querySelector(`[data-id="${activeId}"]`);
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
      <div 
        ref={tocRef}
        className={`toc toc--mobile fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isScrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Card className="toc__card rounded-none border-b border-gray-800">
          <nav className="toc__nav px-4">
            <header className="toc__header">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="toc__toggle w-full flex items-center justify-between text-gray-400 group"
                aria-expanded={isOpen}
                aria-controls="mobile-toc-content"
              >
                <span className="toc__current text-sm font-medium">
                  {activeId ? headings.find(h => h.id === activeId)?.text : 'Table of Contents'}
                </span>
                <svg
                  className={`toc__icon w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] text-gray-400 group-hover:text-purple-400 ${isOpen ? 'rotate-180' : ''}`}
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
              className="toc__content grid transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
              style={{ 
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                opacity: isOpen ? 1 : 0,
                transform: `translateY(${isOpen ? '0' : '-8px'})`
              }}
            >
              <div className="overflow-hidden">
                <ul className="toc__list pt-4 pb-2 mt-6 space-y-2 max-h-[50vh] overflow-y-auto border-t border-gray-800">
                {headings.map((heading, index) => (
                  <li 
                    key={`${heading.id}-${index}`}
                    className="toc__item"
                    style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                  >
                    <button
                      onClick={() => handleClick(heading.id)}
                      className={`toc__link text-left w-full py-2 text-sm transition-colors duration-200
                        ${activeId === heading.id 
                          ? 'text-purple-400' 
                          : 'text-gray-400'
                        }`}
                      aria-current={activeId === heading.id ? 'true' : undefined}
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </nav>
        </Card>
      </div>
    );
  }

  return (
    <div className="sticky top-32">
      <Card className="py-4 px-0">
        <nav className="w-64">
          <div className="relative">
            {/* Active border indicator */}
            <div 
              ref={activeBorderRef}
              className="absolute left-0 w-0.5 h-7 bg-purple-400 transition-transform duration-200 ease-[cubic-bezier(0.33,1,0.68,1)]"
            />
            
            {/* Navigation items */}
            <ul ref={listRef} className="relative space-y-2">
              {headings.map((heading, index) => (
                <li 
                  key={`${heading.id}-${index}`}
                  data-id={heading.id}
                  style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                >
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`text-left w-full py-1 px-4 transition-colors duration-200 hover:text-purple-400
                      ${activeId === heading.id 
                        ? 'text-purple-400' 
                        : 'text-gray-400'
                      }`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </Card>
    </div>
  );
}