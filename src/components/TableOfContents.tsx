import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/Card';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const activeBorderRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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
      const offset = 100; // Offset to account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

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