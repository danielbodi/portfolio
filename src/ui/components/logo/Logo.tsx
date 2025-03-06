import React from 'react';
import { useMouseGradient } from '../hooks/useMouseGradient';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  const { degree } = useMouseGradient();

  return (
    <svg 
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hexagon background */}
      <path 
        d="M24 2L42.5 12V36L24 46L5.5 36V12L24 2Z" 
        fill="#32323A"
        stroke={`url(#logo-gradient-${degree})`}
        strokeWidth="1"
      />

      {/* Letters */}
      <path 
        d="M14 14H20C22.2091 14 24 15.7909 24 18V22C24 24.2091 22.2091 26 20 26H14V14ZM18 18H20V22H18V18Z" 
        fill={`url(#logo-gradient-${degree})`}
      />
      <path 
        d="M26 14H32C34.2091 14 36 15.7909 36 18V22C36 24.2091 34.2091 26 32 26H26V14ZM30 18H32V22H30V18Z" 
        fill={`url(#logo-gradient-${degree})`}
      />
      <path 
        d="M20 30H28C30.2091 30 32 31.7909 32 34V34C32 36.2091 30.2091 38 28 38H20C17.7909 38 16 36.2091 16 34V34C16 31.7909 17.7909 30 20 30Z" 
        fill={`url(#logo-gradient-${degree})`}
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient
          id={`logo-gradient-${degree}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`rotate(${degree}, 0.5, 0.5)`}
        >
          <stop offset="0%" stopColor="#B490FF" />
          <stop offset="100%" stopColor="#6964F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}