import React from 'react';
import { Metric } from '../../../content/types';
import { Card } from '../cards/Card';

interface OutcomeMetricProps {
  metric: Metric;
}

/**
 * A metric with its evidence note and confidence level, so numbers never
 * appear without context (brief section 13).
 */
export function OutcomeMetric({ metric }: OutcomeMetricProps) {
  return (
    <Card className="h-full">
      <div className="flex h-full flex-col">
      <div className="text-3xl font-bold text-purple-300">{metric.value}</div>
      <div className="mt-1 text-sm text-gray-300">{metric.label}</div>
      <div className="mt-auto pt-3">
        {metric.confidence !== 'verified' && (
          <span className="mr-2 inline-flex items-center rounded-full border border-amber-500/40 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-amber-300">
            {metric.confidence}
          </span>
        )}
        {metric.evidenceNote && (
          <p className="mt-2 text-xs leading-relaxed text-gray-500">{metric.evidenceNote}</p>
        )}
      </div>
      </div>
    </Card>
  );
}
