import React from 'react';
import './Tag.scss';

interface TagProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  className?: string;
  width?: number;
}

export const Tag: React.FC<TagProps> = ({ 
  children, 
  variant = 'primary',
  className = '',
}) => {
  return (
    <div 
      className={`tag tag--${variant} ${className}`}
    >
      {children}
    </div>
  );
};