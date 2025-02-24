import React from 'react';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/atoms/Tag/Tag';
import { TableOfContents } from '../components/TableOfContents';
import { CaseSummaryCard } from '../components/CaseSummaryCard';
import { MasonryGallery } from '../components/galleries/MasonryGallery/MasonryGallery';

export function BridgestoneProject() {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1920&h=1080",
      alt: "Bridgestone Dashboard Overview",
      info: "The main dashboard provides a comprehensive overview of fleet management metrics and KPIs."
    },
    {
      src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1920&h=1080",
      alt: "Data Analytics Dashboard",
      info: "Advanced analytics tools help fleet managers make data-driven decisions."
    },
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920&h=1080",
      alt: "User Management Interface",
      info: "Streamlined user management interface for handling permissions and access control."
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1920&h=1080",
      alt: "Vehicle Fleet Management",
      info: "Comprehensive vehicle tracking and maintenance scheduling system."
    },
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920&h=1080",
      alt: "Business Intelligence Reports",
      info: "Detailed reporting tools for analyzing fleet performance and costs."
    },
    {
      src: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1920&h=1080",
      alt: "Maintenance Schedule Interface",
      info: "Interactive calendar for planning and tracking vehicle maintenance."
    },
    {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920&h=1080",
      alt: "Performance Analytics",
      info: "Real-time performance monitoring and trend analysis dashboard."
    },
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920&h=1080",
      alt: "Mobile Fleet Management",
      info: "Mobile-responsive interface for on-the-go fleet management."
    },
    {
      src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1920&h=1080",
      alt: "Service Center Locator",
      info: "Interactive map interface for finding nearby service centers."
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
        title: "Challenge 1",
        description: [
          "No Initial Design System available nor planned in the backlog.",
          "No official time or resources for creating a new one."
        ]
      },
      solution: {
        title: "Solution 1",
        description: [
          "I reused Ant Design's UI in Figma and documented our components in Storybook.",
          "After showing the difference with and without a proper design system, the business decided to invest time and resources in developing one."
        ]
      }
    },
    {
      challenge: {
        title: "Challenge 2",
        description: [
          "Team not familiar developing from custom designs.",
          "Design to Code translation was difficult."
        ]
      },
      solution: {
        title: "Solution 2",
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
        title: "Challenge 3",
        description: [
          "Tight deadlines and working alone left UX processes quite limited.",
          "Requirements driven by the business and feedback gathered post-development, lead to reactive iterations and redesigns after implementation."
        ]
      },
      solution: {
        title: "Solution 3",
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
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-4xl font-bold text-purple-400">Bridgestone's Back-Office UI</h1>
        </div>

        {/* Gallery */}
        <div className="mb-12">
          <Card>
            <MasonryGallery images={galleryImages} />
          </Card>
        </div>

        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1">
            <Card>
              <div className="space-y-12 text-gray-300">
                <div>
                  <h2 id="project-description" className="text-3xl font-bold mb-6">
                    Project description
                  </h2>
                  <p>
                    Bridgestone is a global leader in tires and mobility solutions.<br/> To support their internal operations, Bridgestone requires a robust back-office portal that enables seamless access to critical data, including users, products, contracts, vehicles, worksheets, and inspections. This project focuses on designing an intuitive and efficient interface tailored to meet the needs of diverse internal teams, ensuring streamlined workflows and enhanced usability.
                  </p>
                </div>

                <div>
                  <h2 id="my-role" className="text-3xl font-bold mb-6">
                    My Role
                  </h2>
                  <p>
                    I started as the sole designer on this project, in a full dedicated consultant team.<br/> 
                    I worked first on FleetBridge app, and then currently on their back-office portal project. I worked closely with developers to ensure seamless implementation of our wireframes, prototypes, and high-fidelity designs.
                  </p>
                </div>

                <div>
                  <h2 id="team-composition" className="text-3xl font-bold mb-6">
                    Team Composition
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <Tag variant="dark">3 UI/UX Designers</Tag>
                    <Tag variant="dark">5 Front-End Devs</Tag>
                    <Tag variant="dark">4 Back-End Devs</Tag>
                    <Tag variant="dark">1 Tester</Tag>
                    <Tag variant="dark">1 Architect</Tag>
                    <Tag variant="dark">1 Scrum Master</Tag>
                  </div>
                </div>

                <div>
                  <h2 id="skills" className="text-3xl font-bold mb-6">
                    Skills I've Used 
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card variant="nested">
                      <div className="space-y-4">
                        {renderSkills(designSkills)}
                      </div>
                    </Card>
                    <Card variant="nested">
                      <div className="space-y-4">
                        {renderSkills(devSkills)}
                      </div>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 id="case-summary" className="text-3xl font-bold mb-6">
                    Case Summary
                  </h2>
                  <div className="flex flex-col gap-8">
                    {caseSummaryData.map((data, index) => (
                      <CaseSummaryCard 
                        key={index}
                        challenge={data.challenge}
                        solution={data.solution}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Table of Contents */}
          <div className="hidden lg:block">
            <TableOfContents />
          </div>
        </div>
      </div>
    </div>
  );
}