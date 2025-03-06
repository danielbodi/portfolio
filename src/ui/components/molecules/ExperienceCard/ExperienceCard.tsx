import React from 'react';
import { Card } from '../../atoms/Card/Card';
import './ExperienceCard.scss';

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  logo: string;
  projects?: Array<{
    name: string;
    logo: string;
  }>;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  role,
  period,
  logo,
  projects
}) => {
  return (
    <Card className="experience-card">
      <div className="experience-card__header">
        <div className="experience-card__company">
          <div className="experience-card__logo">
            {/* Logo placeholder */}
          </div>
          <div className="experience-card__info">
            <h3 className="experience-card__role">{role}</h3>
            <p className="experience-card__period">
              {company} | <span>{period}</span>
            </p>
          </div>
        </div>
      </div>

      {projects && (
        <div className="experience-card__projects">
          {projects.map((project, index) => (
            <Card key={index} variant="nested" className="experience-card__project">
              <div className="experience-card__project-content">
                <div className="experience-card__project-info">
                  <div className="experience-card__project-logo">
                    {/* Project logo placeholder */}
                  </div>
                  <span>{project.name}</span>
                </div>
                <button className="experience-card__case-study">
                  See this Case Study
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};