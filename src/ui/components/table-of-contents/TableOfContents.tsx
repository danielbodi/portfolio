import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../cards/Card';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  variant?: 'desktop' | 'mobile';
  pathname?: string; // Add pathname prop to trigger re-scanning
  isVisible?: boolean; // Add visibility prop for animation control
}

export function TableOfContents({ variant = 'desktop', pathname, isVisible = true }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const activeBorderRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Reset state when route changes
    setHeadings([]);
    setActiveId('');
    
    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    
    const processHeadings = () => {
      // Get all h2 and h3 elements from the content
      // Try multiple selectors to be more specific
      const selectors = [
        'h2, h3', // General
        'main h2, main h3', // Within main element
        '.project-page h2, .project-page h3', // Within project page
        '[id*="project"] h2, [id*="project"] h3', // Within project containers
      ];
      
      let elements: Element[] = [];
      
      // Try each selector until we find headings
      for (const selector of selectors) {
        elements = Array.from(document.querySelectorAll(selector));
        if (elements.length > 0) break;
      }
      
      // Filter out headings without IDs and text content
      const validElements = elements.filter(element => 
        element.id && element.textContent?.trim()
      );
      
      if (validElements.length > 0) {
        // Found headings, process them
        const items = validElements.map(element => ({
          id: element.id,
          text: element.textContent?.trim() || '',
          level: parseInt(element.tagName[1])
        }));

        setHeadings(items);

        // Set default active item to the first heading
        if (items.length > 0) {
          setActiveId(items[0].id);
        }

        // Set up intersection observer for headings
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            // Find the first visible heading
            const visibleEntry = entries.find(entry => entry.isIntersecting);
            
            if (visibleEntry) {
              setActiveId(visibleEntry.target.id);
            } else if (entries.length > 0) {
              // If no heading is visible, use the first one
              setActiveId(entries[0].target.id);
            }
          },
          {
            rootMargin: '-20% 0px -80% 0px'
          }
        );

        validElements.forEach(element => intersectionObserver?.observe(element));
        
        // Stop observing DOM changes once we found headings
        if (mutationObserver) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }
        
        return true; // Found headings
      }
      return false; // No headings found
    };
    
    // Multiple strategies to find headings
    let attempt = 0;
    const maxAttempts = 5;
    
    const tryFindHeadings = () => {
      attempt++;
      
      // Try immediate scan
      if (processHeadings()) {
        return; // Success
      }
      
      // If failed and we have more attempts, try again
      if (attempt < maxAttempts) {
        timeoutId = setTimeout(tryFindHeadings, 200 * attempt);
        return;
      }
      
      // Last resort: Set up MutationObserver
      mutationObserver = new MutationObserver((mutations) => {
        let shouldCheck = false;
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                // Check if added node is a heading or contains headings
                if (element.tagName === 'H2' || element.tagName === 'H3' || 
                    element.querySelector('h2, h3')) {
                  shouldCheck = true;
                }
              }
            });
          }
        });
        
        if (shouldCheck) {
          // Delay processing to ensure content is fully rendered
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            processHeadings();
          }, 200);
        }
      });
      
      // Start observing DOM changes
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    };
    
    // Start with immediate attempt
    requestAnimationFrame(() => {
      tryFindHeadings();
    });

    return () => {
      // Cleanup
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [pathname]); // Add pathname as dependency

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
  }, [activeId, headings]);

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
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.aside 
          className="toc toc--desktop" 
          aria-label="Table of Contents"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 0.6, 1] } }}
        >
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
                        aria-current={activeId === heading.id ? 'true' : undefined}
                      >
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </Card>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
