import React from 'react';
import { TimelineMarker } from '../../molecules/TimelineMarker/TimelineMarker';
import { ExperienceCard } from '../../molecules/ExperienceCard/ExperienceCard';
import './Timeline.scss';

interface TimelineProps {
  experiences: Array<{
    company: string;
    role: string;
    period: string;
    logo: string;
    projects?: Array<{
      name: string;
      logo: string;
    }>;
  }>;
}

export const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  return (
    <div className="timeline">
      <TimelineMarker label="Today" position="top" />
      
      <div className="timeline__experiences">
        {experiences.map((experience, index) => (
          <div key={index} className="timeline__experience">
            <div className="timeline__marker">
              <div className="timeline__dot"></div>
              <div className="timeline__line"></div>
            </div>
            <ExperienceCard {...experience} />
          </div>
        ))}
      </div>

      <TimelineMarker label="October 2010" position="bottom" />
    </div>
  );
};