import React, { useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/components/cards/Card';
import { Tag } from '../ui/components/atoms/Tag/Tag';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
import { CaseSummaryCard } from '../ui/components/case-summary/CaseSummaryCard';
import { Image } from '../ui/components/image/Image';
import { ProjectGallery } from '../ui/components/gallery/ProjectGallery';


export function BridgestoneProject() {
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
      src: "/screenshots/bs/bs_desktop_settings-light.png",
      alt: "Settings Panel - Light Theme",
      description: "User settings interface showcasing the light theme implementation with custom form controls"
    },
    {
      src: "/screenshots/bs/bs_desktop_vehicle-list-dark.png",
      alt: "Vehicle List View - Dark Theme",
      description: "Vehicle management interface showing the list view with filtering and sorting capabilities"
    },
    {
      src: "/screenshots/bs/bs_desktop_ws-dark.png",
      alt: "Worksheet Interface - Dark Theme",
      description: "Vehicle worksheet management interface in dark mode with detailed vehicle information"
    },
    {
      src: "/screenshots/bs/bs_desktop_ws-light.png",
      alt: "Worksheet Interface - Light Theme",
      description: "Vehicle worksheet management interface in light mode showing maintenance details"
    },
    {
      src: "/screenshots/bs/bs_tablet_ws-dark.png",
      alt: "Tablet Worksheet View - Dark Theme",
      description: "Responsive tablet layout of the worksheet interface optimized for dark mode"
    },
    {
      src: "/screenshots/bs/bs_tablet_ws-light.png",
      alt: "Tablet Worksheet View - Light Theme",
      description: "Responsive tablet layout of the worksheet interface in light mode"
    },
    {
      src: "/screenshots/bs/bs_tablet_ws2-dark.png",
      alt: "Alternative Tablet Worksheet - Dark Theme",
      description: "Another view of the tablet worksheet interface in dark mode"
    }
  ];

  const designSkills = [
    { name: 'Figma', icon: '/skill-icons/figma.svg' },
    { name: 'Illustrator', icon: '/skill-icons/illustrator.svg' },
    { name: 'Photoshop', icon: '/skill-icons/photoshop.svg' },
    { name: 'Animate', icon: '/skill-icons/animate.svg' }
  ];

  const devSkills = [
    { name: 'Storybook', icon: '/skill-icons/storybook.svg' },
    { name: 'HTML', icon: '/skill-icons/html.svg' },
    { name: 'CSS/SCSS', icon: '/skill-icons/css.svg' },
    { name: 'JS/TS', icon: '/skill-icons/ts.svg' }
  ];

  const caseSummaryData = [
    {
      challenge: {
        title: "Missing Design Structure",
        description: [
          "No Initial Design System available nor planned in the backlog.",
          "No official time or resources for creating a new one."
        ]
      },
      solution: {
        title: "Systematic Foundation",
        description: [
          "I reused Ant Design's UI in Figma and documented our components in Storybook.",
          "After showing the difference with and without a proper design system, the business decided to invest time and resources in developing one."
        ]
      }
    },
    {
      challenge: {
        title: "Technical Uncertainty",
        description: [
          "Team not familiar developing from custom designs.",
          "Design to Code translation was difficult."
        ]
      },
      solution: {
        title: "Knowledge Transfer",
        description: [
          "I provided support and coaching to our developers,",
          "structured and implemented methodologies in CSS,",
          "mirrored design foundations into reusable code.",
          "I reviewed pull requests for consistency,",
          "managed a Storybook backlog,",
          "and enhanced Figma handoffs with detailed component documentation."
        ]
      }
    },
    {
      challenge: {
        title: "Limited Resources",
        description: [
          "Tight deadlines and working alone left UX processes quite limited.",
          "Requirements driven by the business and feedback gathered post-development, lead to reactive iterations and redesigns after implementation."
        ]
      },
      solution: {
        title: "Process Adaption",
        description: [
          "To improve user research and testing, I requested designer involvement in business workshops and user testing.",
          "We adapted a reverse \"double diamond\" approach to fit business constraints."
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
        <TableOfContents variant="mobile" pathname="/projects/bridgestone" />
      </div>

      <div className="project-page__header">
          <div className="project-page__title flex justify-between items-baseline">
            <h1 className="text-4xl font-bold text-purple-400">Bridgestone's Back-Office UI</h1>
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
            </div>
          </div>
      </div>

      {/* Hero Section */}
      <div className="w-full mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
            <Image
              src="/screenshots/bs/bs_desktop_storybook-home.png"
              alt= "Storybook Documentation Home"
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
                    Picture this: a <strong>global tire company</strong> with thousands of vehicles, contracts, and inspections scattered across different systems. 
                    <strong>Bridgestone</strong> needed a <strong>back-office portal</strong> that could fit all this complexity into something their internal teams could actually use without wanting to throw their laptops out the window. 
                    The challenge? Making <strong>enterprise software</strong> that doesn't feel like punishment.
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
                    I joined as the sole designer working with a team of developers—a familiar situation that I've learned to navigate. 
                    Starting with FleetBridge and moving to their main back-office portal, my job was to be the bridge between "what the business wants" and "what developers can realistically build." 
                    Spoiler alert: those two things are rarely the same at the beginning.
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
                      <Tag variant="dark">3 UI/UX Designers</Tag>
                      <Tag variant="dark">5 Front-End Devs</Tag>
                      <Tag variant="dark">4 Back-End Devs</Tag>
                      <Tag variant="dark">1 Tester</Tag>
                      <Tag variant="dark">1 Architect</Tag>
                      <Tag variant="dark">1 Scrum Master</Tag>
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
                        <div className="text-4xl font-bold text-purple-400 mb-2">40+</div>
                        <div className="text-sm text-gray-400">Components & Guidelines</div>
                      </div>
                    </Card>
                    <Card variant="nested" showShadow>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">60%</div>
                        <div className="text-sm text-gray-400">Faster Development</div>
                      </div>
                    </Card>
                    <Card variant="nested" showShadow>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">Unified</div>
                        <div className="text-sm text-gray-400">Design Language</div>
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
                     const element = document.getElementById('challenges');
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
                  <h2 id="challenges" className="text-3xl font-bold mb-6">
                    The Challenges I've faced
                  </h2>
                  <div className="space-y-8">
                    {/* Lack of Design System */}
                    <div
                      ref={el => challengeItemRefs.current[0] = el}
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                      style={{ transitionDelay: '0ms' }}
                    >
                      <Card variant="ghost">
                        <h4 id="lack-of-design-system" className="text-xl font-semibold mb-4">Missing Design Structure</h4>
                        <div className="space-y-4 text-gray-400">
                          <p>
                            I joined the project as sole designer in the team, after it had already started and with the backlog already defined. That meant that I immediately had to deliver prototypes based on these requirements.
                          </p>
                          <p>
                            Had I been involved from the beginning, I would have prioritized establishing a design system to ensure consistency and scalability. However, due to time and resource constraints, creating a reusable design system in Figma was not feasible.
                          </p>
                          <p>
                            This was extended even further on the development side, where the lack of a design system made it significantly harder for developers to implement consistent and reusable components, amplifying the risk to the project's overall scalability.
                          </p>
                        </div>
                      </Card>
                    </div>

                    {/* Custom Development Challenges */}
                    <div
                      ref={el => challengeItemRefs.current[1] = el}
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                      style={{ transitionDelay: '150ms' }}
                    >
                      <Card variant="ghost">
                        <h4 id="custom-development-challenges" className="text-xl font-semibold mb-4">Technical Uncertainty</h4>
                        <p className="text-gray-400">
                          The project required custom designs and components, which the developers were not exactly familiar with building. This led to difficulties in implementing layouts and accurately translating designs into code. The lack of experience with custom components and layouts resulted in additional effort to ensure that designs were integrated correctly.
                        </p>
                      </Card>
                    </div>

                    {/* Limited Research Time */}
                    <div
                      ref={el => challengeItemRefs.current[2] = el}
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                      style={{ transitionDelay: '300ms' }}
                    >
                      <Card variant="ghost">
                        <h4 id="limited-research-time" className="text-xl font-semibold mb-4">Limited Resources</h4>
                        <div className="space-y-4 text-gray-400">
                          <p>
                            Working as only designer left minimal time for user research, to identify pain points or for user testing to validate solutions. The standard double diamond approach wasn't feasible, as the analysis and user story requirements were defined by the business rather than through UX research. While the business had some processes in place to gather feedback, this feedback was mostly received post-development.
                          </p>
                          <p>
                            This reactive approach often led to iterations and redesigns after features were already designed or even implemented.
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>

                <div
                  ref={el => sectionRefs.current[9] = el}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                >
                  <h2 id="solutions" className="text-3xl font-bold mb-6">
                    How I overcame them
                  </h2>
                  <div className="space-y-8">
                    {/* Design System Solution */}
                    <div
                      ref={el => solutionItemRefs.current[0] = el}
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                      style={{ transitionDelay: '0ms' }}
                    >
                      <Card variant="ghost">
                        <h4 id="addressing-design-system" className="text-xl font-semibold mb-4">Missing Design Structure: Building a Systematic Foundation</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          To overcome the lack of a design system, I decided to reuse an existing UI kit in Figma and chose <strong>Ant Design's UI kit</strong>. I went to that direction because Ant Design's kit had already <strong>well-structured components</strong>, was easy to customize, and had frequent updates.
                        </p>
                        <p>
                          Additionally, Ant Design's visual style was distinct from <strong>Material Design</strong>, which was already widely used.
                          By reusing Ant Design's components and foundations, I was able to <strong>scale and work more efficiently</strong> within my design process.
                        </p>
                        <p>
                          Gradually, I customized and expanded the kit by adding custom components - always applying the <strong>Atomic methodology</strong> - documentation, and <strong>design tokens</strong> to suit the project's specific needs.
                        </p>
                        <p>
                          On the development side, the front-end team opted for a <strong>fully custom approach</strong> and did not reuse Ant Design's code. This divergence required additional collaboration to ensure alignment between design and development despite the differing foundations.
                          That's where I proposed and implemented <strong>Storybook</strong>, as our <strong>source of truth</strong> for our foundations, components and documentation for developers, and designers.
                        </p>
                        
                        <div className="my-8">
                          <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
                            <Image
                              src="/screenshots/bs/bs_desktop_storybook-tag.png"
                              alt="Tag Component Documentation"
                              aspectRatio="auto"
                              frame="none"
                              className="w-full rounded-lg"
                            />
                          </div>
                          <p className="text-sm text-purple-400 mt-2">Overview of our Tag component documentation in Storybook</p>
                        </div>

                        <div className="my-8">
                          <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
                            <Image
                              src="/screenshots/bs/bs_storybook tag anatomy.png"
                              alt="Tag Component Anatomy"
                              aspectRatio="auto"
                              frame="none"
                              className="w-full rounded-lg"
                            />
                          </div>
                          <p className="text-sm text-purple-400 mt-2">Detailed anatomy documentation of our Tag component in Storybook</p>
                        </div>

                        <div className="my-8">
                          <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
                            <Image
                              src="/screenshots/bs/bs_storybook tag best practices.png"
                              alt="Tag Component Best Practices"
                              aspectRatio="auto"
                              frame="none"
                              className="w-full rounded-lg"
                            />
                          </div>
                          <p className="text-sm text-purple-400 mt-2">Best practices and usage guidelines for our Tag component in Storybook</p>
                        </div>
                      </div>
                    </Card>
                    </div>

                    {/* Custom Development Solution */}
                    <div
                      ref={el => solutionItemRefs.current[1] = el}
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                      style={{ transitionDelay: '150ms' }}
                    >
                      <Card variant="ghost">
                      <h4 id="addressing-development" className="text-xl font-semibold mb-4">Technical Uncertainty: Establishing Knowledge Transfer</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          To tackle the challenges with custom designs and components, I focused on fostering a positive and supportive relationship with developers. I made myself available to answer any questions, assist with CSS and HTML-related issues, and provide coaching to those struggling with specific implementation challenges. This open line of communication helped build trust and improved our collaboration.
                        </p>
                        <p>
                          I contributed by structuring the CSS repository, by implementing the <strong>ITCSS methodology</strong> and encouraged adopting the <strong>BEM convention</strong> for consistent and maintainable naming.
                          Additionally, I mirrored <strong>reusable tokens</strong> from Figma into our codebase, covering <strong>typography, spacing, borders, elevations, shadows, and palette systems</strong>.
                          Over time, I extended these tokens into <strong>utility classes</strong>, further enhancing <strong>efficiency, consistency, and alignment</strong> between design and development.
                        </p>
                        <p>
                          Another important point I started to do to ensure quality, was to actively participate in the development workflow by reviewing pull requests. This allowed me to catch inconsistencies early and provide feedback to maintain alignment with design standards.
                        </p>
                        <p>
                          Additionally, I managed a parallel backlog specifically for Storybook development. This backlog addressed technical debts, inconsistencies left in the system and new components or foundations development, ensuring long-term scalability and alignment with design principles.
                        </p>
                        <p>
                          In Figma, I enhanced the handoff process by improving component and layout documentation. This included adding anatomies, usage guidelines, and best practices for components, which developers found valuable.
                        </p>
                        
                        <div className="my-8">
                          <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
                            <Image
                              src="/screenshots/bs/bs_example of the anatomy section for Tags in Figma.png"
                              alt="Tag Anatomy in Figma"
                              aspectRatio="auto"
                              frame="none"
                              className="w-full rounded-lg"
                            />
                          </div>
                          <p className="text-sm text-purple-400 mt-2">Detailed component anatomy documentation in our Figma design system</p>
                        </div>

                        <div className="my-8">
                          <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
                            <Image
                              src="/screenshots/bs/bs_example of the best practices section for Tags in Figma.png"
                              alt="Tag Best Practices in Figma"
                              aspectRatio="auto"
                              frame="none"
                              className="w-full rounded-lg"
                            />
                          </div>
                          <p className="text-sm text-purple-400 mt-2">Best practices and usage guidelines in our Figma design system</p>
                        </div>

                        <p>
                          Initially, the design system development was secondary to other priorities, but its impact on efficiency led to its formal adoption. With the arrival of another designer with a similar skillset, we collaborated building more foundations in both design and development parts of the project, putting some special effort on improving our Storybook. Then recently, a third UI/UX designer joined the team, and we implemented branching and reviewing processes within our design workflows in Figma. This confirmed even more my role as a leader in the design aspect of the project.
                        </p>
                        <p>
                          Today, the development of our design system in Storybook is still in progress, but it already provides a solid foundation and documentation source, enabling developers and designers to work efficiently in isolation, run tests, and maintain consistency.
                        </p>
                      </div>
                    </Card>
                    </div>

                    {/* Research and Testing Solution */}
                    <div
                      ref={el => solutionItemRefs.current[2] = el}
                      className="opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                      style={{ transitionDelay: '300ms' }}
                    >
                      <Card variant="ghost">
                      <h4 id="addressing-research" className="text-xl font-semibold mb-4">Limited Resources: Adapting Our Process</h4>
                      <div className="space-y-4 text-gray-400">
                        <p>
                          To address the limitations in user research and testing, I requested if at least a designer could be included during business workshops and user testing sessions. This request objective was to get a better insight into user pain points and needs, enabling us to work with more accurate data. The business responded positively, and designers were incorporated into their processes.
                        </p>
                        <p>
                          Given the constraints, we customized our design approach and implemented a reverse "double diamond" methodology, as it was better aligned with businesses reality. Most of the analyses and requirements were coming from the business. From there, we would conduct additional research when needed, employing personas and user journeys to create wireframes and prototypes.
                          Once prototypes were developed, we would update the UI kit, Storybook, and add documentation as necessary.
                        </p>
                        
                        <div className="my-8">
                          <div className="w-full p-4 rounded-xl" style={{ border: '2px solid rgb(124, 58, 237)' }}>
                            <Image
                              src="/screenshots/bs/bs_design-approach.png"
                              alt="Design Approach Diagram"
                              aspectRatio="auto"
                              frame="none"
                              className="w-full rounded-lg"
                            />
                          </div>
                          <p className="text-sm text-purple-400 mt-2">Visual representation of our adapted design methodology and workflow at Bridgestone</p>
                        </div>

                        <p>
                          After getting business approval, we would hand over the prototypes to the development team. During this phase, I collaborated closely with developers, as outlined earlier, to ensure alignment and consistency.
                        </p>
                        <p>
                          Additionally, we would iterate on designs based on feedback received from users post-development.
                          This iterative process allowed us to adapt dynamically while maintaining a focus on user needs and product quality.
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
                      <h3 className="text-xl font-semibold text-purple-400 mb-2">The journey continues</h3>
                      <p className="text-gray-400">
                        This ongoing project represents the culmination of everything I've learned—from Base's systematic thinking 
                        to Sopra's mentoring experience to Trasis's design validation. Each challenge built on the last.
                      </p>
                    </div>
                    <button 
                      onClick={() => window.location.href = '/projects/base'}
                      className="c-button c-button--secondary flex-shrink-0 ml-6"
                    >
                      Where it all began →
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
