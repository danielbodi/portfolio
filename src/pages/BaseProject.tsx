import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '../ui/components/cards/Card';
import { Tag } from '../ui/components/atoms/Tag/Tag';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
import { CaseSummaryCard } from '../ui/components/case-summary/CaseSummaryCard';
import { Image } from '../ui/components/image/Image';


export function BaseProject() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const challengeItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const solutionItemRefs = useRef<(HTMLDivElement | null)[]>([]);
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
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    const allElements = [
      ...sectionRefs.current,
      ...galleryItemRefs.current,
      ...challengeItemRefs.current,
      ...solutionItemRefs.current
    ];

    allElements.forEach((element) => {
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        allElements.forEach((element) => {
          if (element) {
            observerRef.current?.unobserve(element);
          }
        });
      }
    };
  }, []);

  const galleryImages = [
    {
      src: "/screenshots/base/base-custom-layout.png",
      alt: "Example of custom components built for Base website",
      description: "Example of custom components we built: lists, and containers with pictures for Base website"
    },
    {
      src: "/screenshots/base/base-interactive-dynamic-settings.png",
      alt: "Custom slider component for Base website",
      description: "Advanced interactive components: canvas-based wavy animation header with custom subscription plan sliders"
    },
    {
      src: "/screenshots/base/base-icustom-slider-component-example.png",
      alt: "Jim Mobile custom slider component",
      description: "Jim Mobile custom slider component showcasing our modular approach to component development"
    }
  ];

  const designSkills = [
    { name: 'Photoshop', icon: '/skill-icons/photoshop.svg' },
    { name: 'Illustrator', icon: '/skill-icons/illustrator.svg' }
  ];

  const devSkills = [
    { name: 'HTML', icon: '/skill-icons/html.svg' },
    { name: 'SCSS', icon: '/skill-icons/css.svg' },
    { name: 'TS', icon: '/skill-icons/ts.svg' },
    { name: 'Git', icon: '/skill-icons/git.svg' }
  ];

  const caseSummaryData = [
    {
      challenge: {
        title: "Heavy Development Process",
        description: [
          "Java backend with Angular JS and LESS required compilation for every code change.",
          "Inefficient workflow slowed down front-end development."
        ]
      },
      solution: {
        title: "Streamlined Development Workflow",
        description: [
          "Added NPM scripts to enable auto-reloads on browser changes.",
          "Eliminated need for compilation on front-end code changes.",
          "Improved efficiency and quality of life while developing."
        ]
      }
    },
    {
      challenge: {
        title: "Outdated Grid System",
        description: [
          "Float-based grid system lacked flexibility.",
          "Limited browser support for modern layout techniques."
        ]
      },
      solution: {
        title: "Modern Flexible Layout System",
        description: [
          "Introduced custom Flexbox-based grid designed from scratch.",
          "Implemented BEM methodology for better organization.",
          "Created fallbacks for older browsers like IE."
        ]
      }
    }
  ];

  const renderSkills = (skills: typeof designSkills) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <div className="rounded flex items-center justify-center">
            <img 
              src={skill.icon} 
              alt={skill.name}
              className="w-6 h-6"
            />
          </div>
          <span className="text-sm text-gray-400">{skill.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <main className="project-page">
      {/* Mobile Table of Contents */}
      <div className="lg:hidden">
        <TableOfContents variant="mobile" pathname="/projects/base" />
      </div>

      <div className="project-page__header">
          <div className="project-page__title flex justify-between items-baseline">
            <h1 className="text-4xl font-bold text-purple-400">Base</h1>
            <div className="flex flex-wrap gap-3">
              <Tag variant="ghost">
                <div className="flex items-center gap-2">
                  <img 
                    src="/skill-icons/desktop.svg" 
                    alt="Desktop"
                    className="w-4 h-4 brightness-0 invert"
                  />
                  <span>Desktop</span>
                </div>
              </Tag>
              <Tag variant="ghost">
                <div className="flex items-center gap-2">
                  <img 
                    src="/skill-icons/tablet.svg" 
                    alt="Tablet"
                    className="w-4 h-4 brightness-0 invert"
                  />
                  <span>Tablet</span>
                </div>
              </Tag>
              <Tag variant="ghost">
                <div className="flex items-center gap-2">
                  <img 
                    src="/skill-icons/mobile.svg" 
                    alt="Mobile"
                    className="w-4 h-4 brightness-0 invert"
                  />
                  <span>Mobile</span>
                </div>
              </Tag>
            </div>
          </div>
      </div>

      {/* Hero Section */}
      <div className="w-full mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
            <Image
              src="/screenshots/base/base-custom-layout.png"
              alt="Example of custom components built for Base website"
              aspectRatio="auto"
              frame="none"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1">
            <Card variant="ghost">
              <div className="space-y-12 text-gray-300">
                <div
                  ref={el => sectionRefs.current[0] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="project-description" className="text-3xl font-bold mb-6">
                    Project description
                  </h2>
                  <p className="text-gray-400">
                    Ever wondered what it's like to work inside a Belgian telecom giant's headquarters? I joined <strong>Design is Dead</strong>, <strong>Base's 15-year technical partner</strong>, 
                    right in the heart of their operations. We were the team responsible for keeping <strong>Base</strong> and <strong>JIM Mobile's websites</strong> running smoothly—
                    <strong>high-traffic sites</strong> that couldn't afford to break, especially not in <strong>IE8</strong> (yes, that was still a thing).
                  </p>
                </div>

                <div
                  ref={el => sectionRefs.current[1] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="my-role" className="text-3xl font-bold mb-6">
                    My Role
                  </h2>
                  <p className="text-gray-400">
                    I specialized in <strong>pixel-perfect implementation</strong>—ensuring every component looked exactly like the design, 
                    worked across every browser (even the ancient ones), and could be drag-and-dropped by content authors in <strong>Adobe Experience Manager</strong>. 
                    Think of me as the bridge between beautiful designs and the harsh reality of <strong>cross-browser compatibility</strong>.
                  </p>
                </div>

                <div
                  ref={el => sectionRefs.current[2] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="team-composition" className="text-3xl font-bold mb-6">
                    Team Composition
                  </h2>
                  <Card variant="nested" showShadow>
                    <div className="flex flex-wrap gap-3">
                      <Tag variant="dark">2 UI Developers</Tag>
                      <Tag variant="dark">4 Full-stack</Tag>
                      <Tag variant="dark">2 Back-End</Tag>
                      <Tag variant="dark">2 Testers</Tag>
                      <Tag variant="dark">1 Architect</Tag>
                      <Tag variant="dark">1 Scrum Master</Tag>
                      <Tag variant="dark">1 Business Analyst</Tag>
                      <Tag variant="dark">1 UX Designer</Tag>
                    </div>
                  </Card>
                </div>

                <div
                  ref={el => sectionRefs.current[3] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="skills" className="text-3xl font-bold mb-6">
                    Skills I've Used 
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card variant="nested" showShadow>
                      <div className="space-y-4">
                        {renderSkills(designSkills)}
                      </div>
                    </Card>
                    <Card variant="nested" showShadow>
                      <div className="space-y-4">
                        {renderSkills(devSkills)}
                      </div>
                    </Card>
                  </div>
                </div>



                <div
                  ref={el => sectionRefs.current[4] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="detailed-breakdown" className="text-3xl font-bold mb-6">
                    Detailed Interface Breakdown
                  </h2>
                  <div className="detailed-image-section">
                    {galleryImages.map((image, index) => (
                      <div 
                        key={index}
                        ref={el => galleryItemRefs.current[index] = el}
                        className="detailed-image-section__item opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="detailed-image-section__image-wrapper">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            aspectRatio="video"
                            frame="none"
                            className="detailed-image-section__image"
                          />
                        </div>
                        <div className="detailed-image-section__content">
                          <h3 className="detailed-image-section__title">
                            {image.alt}
                          </h3>
                          <p className="detailed-image-section__description">
                            {image.description}
                          </p>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  ref={el => sectionRefs.current[5] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="case-summary" className="text-3xl font-bold mb-6">
                    Case Summary
                  </h2>
                  <div className="flex flex-col gap-8">
                    {caseSummaryData.map((data, index) => (
                      <CaseSummaryCard 
                        key={index}
                        challenge={data.challenge}
                        solution={data.solution}
                        index={index}
                      />
                    ))}
                  </div>
                </div>

                <div
                  ref={el => sectionRefs.current[6] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="project-impact" className="text-3xl font-bold mb-6">
                    Project Impact
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card variant="nested" showShadow>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">75%</div>
                        <div className="text-sm text-gray-400">Layout Speed & Quality</div>
                      </div>
                    </Card>
                    <Card variant="nested" showShadow>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">95%</div>
                        <div className="text-sm text-gray-400">Cross-Browser (Yes, even IE8!)</div>
                      </div>
                    </Card>
                    <Card variant="nested" showShadow>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">3</div>
                        <div className="text-sm text-gray-400">Base Brand Websites</div>
                      </div>
                    </Card>
                  </div>
                </div>
                
                {/* Full case link */}
                <div
                  ref={el => sectionRefs.current[7] = el}
                  className="mt-24 md:mt-32 flex flex-col items-center text-center opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <button 
                   onClick={() => {
                     const element = document.getElementById('experience');
                     if (element) {
                       const offset = 140;
                       const elementPosition = element.getBoundingClientRect().top;
                       const offsetPosition = elementPosition + window.scrollY - offset;
                       window.scrollTo({
                         top: offsetPosition,
                         behavior: 'smooth'
                       });
                     }
                   }}
                    className="c-button c-button--ghost flex flex-col items-center group"
                  >
                    <span className="mb-2">Want to read the full case?</span>
                    <ChevronDown className="animate-bounce" size={24} />
                  </button>
                </div>
                
                <div
                  ref={el => sectionRefs.current[8] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="experience" className="text-3xl font-bold mb-6">
                    The start of a new journey
                  </h2>
                  <div className="space-y-8">
                    <Card variant="ghost">
                      <div className="space-y-4 text-gray-400">
                        <p>
                          This was my first taste of what a truly senior team looks like. The Design is Dead crew didn't just write code—they had systems, methodologies, and a level of teamwork I'd never experienced. 
                          They introduced me to BEM (which became my prefered CSS methodology) and showed me what Scrum actually looks like when done right.
                        </p>
                        <p>
                          The contrast with my previous work experiences was clear. Suddenly, I wasn't just a designer who could code—I was part of a machine that delivered consistent, high-quality work at scale. 
                          This was where I realized my hybrid skills weren't just useful; they were essential.
                        </p>
                        <p>
                          But it wasn't just about learning. I brought valuable experience from 5 years of making things work across challenging browser combinations, 
                          and I was ready to share that hard-won knowledge. The team leaned heavily on UI and front-end work, which played right into my strengths.
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                <div
                  ref={el => sectionRefs.current[9] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="contributions" className="text-3xl font-bold mb-6">
                    My Contributions
                  </h2>
                  <div className="space-y-8">
                    {/* Contribution 1 */}
                    <div
                      ref={el => solutionItemRefs.current[0] = el}
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                      style={{ transitionDelay: '0ms' }}
                    >
                      <Card variant="ghost">
                        <h4 id="grid-system" className="text-xl font-semibold mb-4">New Grid System</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          I contributed by introducing a <strong>new grid system</strong>, replacing their float-based grid system with a <strong>custom Flexbox-based grid</strong>, designed from scratch, that would be the base for improved versions in my future experiences.
                        </p>
                        <p>
                          This grid followed the <strong>BEM methodology</strong>, offering greater flexibility, and making the layouts more <strong>future-proof</strong>.
                          The challenge with that new grid was that support was not yet at <strong>100%</strong>, especially in old IE browsers, but I found solutions to apply alternatives when support was bad, and I put a lot effort on making the experience working as well as possible and consistent on these old and limited browsers.
                        </p>

                        
                      </div>
                    </Card>
                    </div>

                    {/* Contribution 2 */}
                    <div
                      ref={el => solutionItemRefs.current[1] = el}
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                      style={{ transitionDelay: '150ms' }}
                    >
                      <Card variant="ghost">
                      <h4 id="dev-process" className="text-xl font-semibold mb-4">Improved Development Process</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          Another contribution I made was also linked to the front-end: 
                          Our tech stack was <strong>Java backend</strong>, <strong>Angular JS</strong>, and <strong>LESS</strong> for the CSS, all that produced content for the CMS <strong>AEM</strong>.
                          The dev process was really heavy (having to compile even on front-end at every code change).
                        </p>
                        <p>
                          To ease this heavy process, I started to do some research, and I ended by adding <strong>NPM scripts</strong> to enable <strong>auto-reloads</strong> on our browser at every modification, avoiding compilation on front end code changes, improving <strong>efficiency and quality of life</strong> while developing.
                        </p>

                      </div>
                    </Card>
                    </div>


                  </div>
                </div>

                {/* Project connection */}
                <div
                  ref={el => sectionRefs.current[10] = el}
                  className="pt-8 border-t border-gray-500 opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-400 mb-2">What came next?</h3>
                      <p className="text-gray-400">
                        The systematic thinking I learned here became crucial when I moved to Sopra Banking, 
                        where I had to teach these methodologies to junior developers.
                      </p>
                    </div>
                    <button 
                      onClick={() => window.location.href = '/projects/sopra'}
                      className="c-button c-button--secondary flex-shrink-0 ml-6"
                    >
                      Next Project →
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>


        </div>
      </div>
    </main>
  );
} 
