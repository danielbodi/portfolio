import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

interface CustomLinkProps extends LinkProps {
  variant?: 'default' | 'nav';
}

export function Link({ variant = 'default', className = '', ...props }: CustomLinkProps) {
  const baseClasses = variant === 'nav' ? 'nav-link' : 'text-purple-400 hover:text-purple-300';

  return (
    <RouterLink
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}