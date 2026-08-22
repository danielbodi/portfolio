import React from 'react';
import { Decision } from '../../../content/types';
import { DeliveryStateTag } from './DeliveryStateTag';
import { ExpandableImage } from './ExpandableImage';
import { Card } from '../cards/Card';

interface DecisionBlockProps {
  decision: Decision;
  index: number;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="text-sm leading-relaxed text-gray-300">{children}</dd>
    </div>
  );
}

/** Content is first-party; fields may carry limited inline HTML (<code>, <strong>). */
function HtmlRow({ label, html }: { label: string; html: string }) {
  return (
    <Row label={label}>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </Row>
  );
}

/**
 * A key decision shown as decision quality, not activity: tension, options,
 * evidence, direction, trade-off and result (brief section 7.5), with an
 * optional supporting visual beside the text.
 */
export function DecisionBlock({ decision, index }: DecisionBlockProps) {
  return (
    <article id={decision.id}>
      <Card>
      <h3 className="mb-4 flex items-baseline gap-3 text-lg font-semibold text-gray-100">
        <span className="text-sm font-bold text-purple-300">{String(index + 1).padStart(2, '0')}</span>
        {decision.title}
      </h3>
      <div className={decision.visual ? 'gap-6 xl:grid xl:grid-cols-[1fr_16rem]' : undefined}>
        <dl className="space-y-3">
          <HtmlRow label="Tension" html={decision.tension} />
          <Row label="Options">
            <ul className="list-disc space-y-1 pl-4 marker:text-gray-600">
              {decision.alternatives.map((alt, i) => (
                <li key={i}>{alt}</li>
              ))}
            </ul>
          </Row>
          <HtmlRow label="Evidence" html={decision.evidence} />
          <Row label="Decision">
            <span className="text-gray-200" dangerouslySetInnerHTML={{ __html: decision.decision }} />
          </Row>
          <HtmlRow label="Trade-off" html={decision.tradeOff} />
          <Row label="Result">
            <span className="inline">
              <span dangerouslySetInnerHTML={{ __html: decision.result }} />{' '}
              {decision.resultState && <DeliveryStateTag state={decision.resultState} className="ml-1 align-middle" />}
            </span>
          </Row>
        </dl>
        {decision.visual && (
          <figure className="mt-5 xl:mt-0 xl:self-start">
            <ExpandableImage
              src={decision.visual.src}
              alt={decision.visual.alt}
              className="w-full rounded-lg border border-gray-700/60 bg-gray-950/40"
            />
          </figure>
        )}
      </div>
      </Card>
    </article>
  );
}
