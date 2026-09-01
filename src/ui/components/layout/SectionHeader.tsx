import React from 'react';

interface SectionHeaderProps {
  number: string;
  eyebrow: string;
  title: string;
  titleId: string;
}

/**
 * Numbered header for the open page layouts (About, Approach), mirroring the
 * chapter headers of the case-study template so the whole site shares one
 * section-labelling pattern.
 */
export function SectionHeader({ number, eyebrow, title, titleId }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
        <span className="text-purple-300">{number}</span>
        <span className="h-px w-8 bg-gray-700" aria-hidden="true" />
        <span className="text-gray-500">{eyebrow}</span>
      </div>
      <h2 id={titleId} className="text-3xl font-bold leading-tight tracking-display text-gray-100 md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
