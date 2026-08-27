import React from 'react';
import { EvidenceClaim } from '../../../content/types';
import { Card } from '../cards/Card';
import { DeliveryStateTag } from './DeliveryStateTag';
import { EvidenceClassTag } from './EvidenceClassTag';

interface EvidenceClaimCardProps {
  claim: EvidenceClaim;
}

export function EvidenceClaimCard({ claim }: EvidenceClaimCardProps) {
  return (
    <Card variant="nested" className="c-card--evidence-compact h-full">
      <article className="flex h-full flex-col">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <EvidenceClassTag label={claim.evidenceClass} />
          {claim.deliveryState && <DeliveryStateTag state={claim.deliveryState} />}
          <span className="text-[0.68rem] uppercase tracking-wide text-gray-300">
            {claim.confidence}
          </span>
        </div>
        <p className="text-sm font-medium leading-relaxed text-gray-200">{claim.claim}</p>
      </article>
    </Card>
  );
}
