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
    setHeadings([]);
    setActiveId('');
    if (!pathname) return;

    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let timeoutId: number | undefined;
    let cancelled = false;

    const routeRoot = () =>
      document.querySelector<HTMLElement>(`[data-route="${pathname}"]`);

    const collect = (): { items: TOCItem[]; elements: HTMLElement[] } => {
      const root = routeRoot();
      if (!root) return { items: [], elements: [] };
      const elements = Array.from(root.querySelectorAll<HTMLElement>('h2[id], h3[id]')).filter(
        (element) => element.id && element.textContent?.trim()
      );
      return {
        elements,
        items: elements.map((element) => ({
          id: element.id,
          text: element.textContent?.trim() || '',
          level: parseInt(element.tagName[1], 10)
        }))
      };
    };

    const commit = () => {
      if (cancelled) return false;
      const { items, elements } = collect();
      if (items.length === 0) return false;

      setHeadings(items);
      setActiveId(items[0].id);

      intersectionObserver?.disconnect();
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (visible) setActiveId(visible.target.id);
        },
        { rootMargin: '-20% 0px -80% 0px' }
      );
      elements.forEach((element) => intersectionObserver?.observe(element));

      mutationObserver?.disconnect();
      mutationObserver = null;
      return true;
    };

    const retry = (attempt: number) => {
      if (commit()) return;
      if (attempt >= 8) {
        mutationObserver = new MutationObserver(() => {
          if (timeoutId) window.clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => {
            if (commit() && mutationObserver) {
              mutationObserver.disconnect();
              mutationObserver = null;
            }
          }, 80);
        });
        mutationObserver.observe(document.getElementById('main-content') ?? document.body, {
          childList: true,
          subtree: true
        });
        return;
      }
      timeoutId = window.setTimeout(() => retry(attempt + 1), 80 * (attempt + 1));
    };

    const frame = requestAnimationFrame(() => retry(0));

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      intersectionObserver?.disconnect();
      mutationObserver?.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [pathname]);

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
    const root = pathname
      ? document.querySelector(`[data-route="${pathname}"]`)
      : null;
    const element = root?.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
      ?? document.getElementById(id);
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

  if (headings.length === 0) {
    return null;
  }

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
