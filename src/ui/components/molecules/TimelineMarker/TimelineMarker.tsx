import React from 'react';
import { Tag } from '../../atoms/Tag/Tag';
import './TimelineMarker.scss';

interface TimelineMarkerProps {
  label: string;
  position?: 'top' | 'bottom';
}

export const TimelineMarker: React.FC<TimelineMarkerProps> = ({ 
  label,
  position = 'top'
}) => {
  return (
    <div className={`timeline-marker timeline-marker--${position}`}>
      <Tag>{label}</Tag>
    </div>
  );
};