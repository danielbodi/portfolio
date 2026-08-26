import React from 'react';
import { CaseStudy } from '../../../content/types';
import { Card } from '../cards/Card';
import { EvidenceClaimCard } from './EvidenceClaimCard';

interface RecruiterSummaryProps {
  summary: CaseStudy['recruiterSummary'];
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-300">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 text-sm leading-relaxed text-gray-300">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-500" />
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ul>
  );
}

/**
 * The 30-second version of a case study, directly below the hero:
 * challenge, ownership, what changed, evidence (brief section 7.2).
 */
export function RecruiterSummary({ summary }: RecruiterSummaryProps) {
  if (summary.evidenceClaims?.length) {
    return (
      <section aria-label="Case summary for quick review">
        <Card>
          <h2 id="recruiter-summary" className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-400">
            In 30 seconds
          </h2>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <Column title="The challenge">
              <p className="text-sm leading-relaxed text-gray-300">{summary.challenge}</p>
            </Column>
            <Column title="My ownership">
              <BulletList items={summary.ownership} />
            </Column>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {summary.evidenceClaims.map((claim) => (
              <EvidenceClaimCard key={claim.id} claim={claim} compact />
            ))}
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section aria-label="Case summary for quick review">
      <Card>
      <h2 id="recruiter-summary" className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-400">
        In 30 seconds
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Column title="The challenge">
          <p className="text-sm leading-relaxed text-gray-300">{summary.challenge}</p>
        </Column>
        <Column title="My ownership">
          <BulletList items={summary.ownership} />
        </Column>
        <Column title="What changed">
          <BulletList items={summary.changed ?? []} />
        </Column>
        <Column title="Evidence">
          <BulletList items={summary.evidence ?? []} />
        </Column>
      </div>
      </Card>
    </section>
  );
}
