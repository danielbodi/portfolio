import React from 'react';
import './Badge.scss';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary',
  className = '' 
}) => {
  return (
    <div className={`badge badge--${variant} ${className}`}>
      {children}
    </div>
  );
};