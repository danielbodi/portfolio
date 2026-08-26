import React from 'react';
import { OwnershipVerb } from '../../../content/types';

interface OwnershipBadgeProps {
  verb: OwnershipVerb;
}

/** Explicit ownership label — prevents both underselling and overclaiming. */
export function OwnershipBadge({ verb }: OwnershipBadgeProps) {
  const isTeam = verb === 'Team outcome';
  const isInherited = verb === 'Inherited';
  const isInProgress = verb === 'In progress';
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
        isTeam || isInherited
          ? 'bg-gray-700/60 text-gray-300'
          : isInProgress
            ? 'bg-amber-500/15 text-amber-300'
            : 'bg-purple-500/15 text-purple-300'
      }`}
    >
      {verb}
    </span>
  );
}
