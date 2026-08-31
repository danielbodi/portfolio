import { VisualEvidenceStatus } from '../../../content/caseStudies/visualStories';

const statusStyles: Record<VisualEvidenceStatus, string> = {
  Verified: 'border-emerald-500/40 text-emerald-300',
  Reported: 'border-sky-500/40 text-sky-300',
  Prototype: 'border-purple-500/40 text-purple-300',
  Ongoing: 'border-amber-500/40 text-amber-300',
  Planned: 'border-gray-500/40 text-gray-300'
};

interface EvidenceStatusBadgeProps {
  status: VisualEvidenceStatus;
  className?: string;
}

/** How strong the evidence behind a claim is. Shares its palette with DeliveryStateTag. */
export function EvidenceStatusBadge({ status, className = '' }: EvidenceStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[0.68rem] font-medium ${statusStyles[status]} ${className}`}
    >
      {status}
    </span>
  );
}
