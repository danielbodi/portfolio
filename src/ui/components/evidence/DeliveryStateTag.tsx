import React from 'react';
import { DeliveryState } from '../../../content/types';

const stateStyles: Record<DeliveryState, string> = {
  'Shipped': 'border-emerald-500/40 text-emerald-300',
  'In production': 'border-emerald-500/40 text-emerald-300',
  'Validated prototype': 'border-sky-500/40 text-sky-300',
  'Tested concept': 'border-sky-500/40 text-sky-300',
  'Concept': 'border-gray-500/40 text-gray-300',
  'Strategic proposal': 'border-gray-500/40 text-gray-300',
  'Ongoing': 'border-purple-500/40 text-purple-300'
};

interface DeliveryStateTagProps {
  state: DeliveryState;
  className?: string;
}

/** Labels the delivery state of a visual or claim. Meaning is carried by text, not colour alone. */
export function DeliveryStateTag({ state, className = '' }: DeliveryStateTagProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${stateStyles[state]} ${className}`}
    >
      {state}
    </span>
  );
}
