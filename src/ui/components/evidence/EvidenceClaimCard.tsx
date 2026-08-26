import React from 'react';
import { EvidenceClaim } from '../../../content/types';
import { Card } from '../cards/Card';
import { DeliveryStateTag } from './DeliveryStateTag';
import { EvidenceClassTag } from './EvidenceClassTag';

interface EvidenceClaimCardProps {
  claim: EvidenceClaim;
  compact?: boolean;
}

export function EvidenceClaimCard({ claim, compact = false }: EvidenceClaimCardProps) {
  return (
    <Card className="h-full">
      <article className="flex h-full flex-col">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <EvidenceClassTag label={claim.evidenceClass} />
          {claim.deliveryState && <DeliveryStateTag state={claim.deliveryState} />}
          <span className="text-[0.68rem] uppercase tracking-wide text-gray-500">
            {claim.confidence}
          </span>
        </div>
        <p className="text-sm font-medium leading-relaxed text-gray-200">{claim.claim}</p>
        <dl className={`mt-4 space-y-2 text-xs leading-relaxed text-gray-500 ${compact ? 'hidden lg:block' : ''}`}>
          <div>
            <dt className="inline font-semibold uppercase tracking-wide text-gray-400">Scope · </dt>
            <dd className="inline">{claim.scope}</dd>
          </div>
          <div>
            <dt className="inline font-semibold uppercase tracking-wide text-gray-400">Source · </dt>
            <dd className="inline">{claim.source}</dd>
          </div>
          <div>
            <dt className="inline font-semibold uppercase tracking-wide text-gray-400">Attribution · </dt>
            <dd className="inline">{claim.attribution}</dd>
          </div>
          {claim.limitation && (
            <div>
              <dt className="inline font-semibold uppercase tracking-wide text-amber-300/80">Limit · </dt>
              <dd className="inline">{claim.limitation}</dd>
            </div>
          )}
        </dl>
      </article>
    </Card>
  );
}
