import React from 'react';
import { EvidenceClass, EvidenceMarker } from '../../../content/types';

type EvidenceLabel = EvidenceClass | EvidenceMarker;

const labelStyles: Record<EvidenceLabel, string> = {
  OUTPUT: 'border-purple-500/40 bg-purple-500/10 text-purple-200',
  VALIDATED: 'border-sky-500/40 bg-sky-500/10 text-sky-200',
  'IN PROGRESS': 'border-amber-500/40 bg-amber-500/10 text-amber-200',
  OUTCOME: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
  CONTEXT: 'border-gray-500/40 bg-gray-500/10 text-gray-300',
  'NEEDS VERIFICATION': 'border-amber-500/40 bg-amber-500/10 text-amber-200',
  UNKNOWN: 'border-gray-500/40 bg-gray-500/10 text-gray-300'
};

interface EvidenceClassTagProps {
  label: EvidenceLabel;
  className?: string;
}

/** Labels the kind of proof without implying a delivery state or an outcome. */
export function EvidenceClassTag({ label, className = '' }: EvidenceClassTagProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[0.68rem] font-semibold tracking-wide ${labelStyles[label]} ${className}`}
    >
      {label}
    </span>
  );
}
