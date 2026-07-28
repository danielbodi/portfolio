import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CaseCard } from '../../../content/types';
import { DeliveryStateTag } from '../evidence';
import { Card } from '../cards/Card';
import { Tag } from '../atoms/Tag/Tag';
import { analytics } from '../../../utils/basicAnalytics';

interface WorkCardProps {
  card: CaseCard;
  /**
   * featured: full card with preview, problem, role, tags, outcome.
   * compact: dense row for "Earlier foundations".
   */
  variant?: 'featured' | 'compact';
  imagePosition?: 'left' | 'right';
  /** Optional role-path emphasis paragraph rendered instead of the outcome. */
  emphasis?: string;
  /** Optional deep links into case sections. */
  links?: { label: string; href: string }[];
}

/**
 * Case-study card exposing problem, role, tags and one outcome, with a
 * project-specific accessible CTA (brief section 6.3).
 */
export function WorkCard({
  card,
  variant = 'featured',
  imagePosition = 'left',
  emphasis,
  links
}: WorkCardProps) {
  const href = `/work/${card.slug}`;
  const trackOpen = () => analytics.trackPortfolioEvent('case_study_opened', { slug: card.slug });

  if (variant === 'compact') {
    return (
      <Card variant="nested">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-700">
              <img
                src={card.logo}
                alt=""
                className={`h-6 w-6 object-contain${card.logoInvert ? ' brightness-0 invert' : ''}`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-100">
                {card.shortTitle}
                <span className="ml-2 text-sm font-normal text-gray-500">{card.period}</span>
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-400">{card.problem}</p>
            </div>
          </div>
          <Link
            to={href}
            className="c-button c-button--secondary flex-shrink-0 self-start sm:self-center"
            aria-label={card.ctaLabel}
            onClick={trackOpen}
          >
            {card.ctaLabel}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div
        className={`flex flex-col gap-6 lg:flex-row ${
          imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Preview */}
        <div className="lg:w-1/2">
          <Link to={href} tabIndex={-1} aria-hidden="true">
            <div className="overflow-hidden rounded-xl border border-gray-700/60">
              <img
                src={card.thumbnail}
                alt={`${card.shortTitle} interface preview`}
                loading="lazy"
                className="aspect-video w-full object-cover object-top"
              />
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:w-1/2">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded bg-gray-700">
              <img
                src={card.logo}
                alt=""
                className={`h-6 w-6 object-contain${card.logoInvert ? ' brightness-0 invert' : ''}`}
              />
            </div>
            <span className="text-lg font-semibold text-white">{card.company}</span>
            <DeliveryStateTag state={card.deliveryState} />
          </div>

          <h3 className="mb-2 text-xl font-bold leading-snug text-gray-100 md:text-2xl">
            <Link to={href} className="hover:text-purple-300 focus-visible:text-purple-300">
              {card.title}
            </Link>
          </h3>
          <p className="mb-3 text-sm text-gray-500">{card.period}</p>

          <p className="mb-4 text-sm leading-relaxed text-gray-300 md:text-base">{card.problem}</p>

          <p className="mb-3 text-sm text-gray-400">
            <span className="font-semibold uppercase tracking-wide text-gray-500">Role · </span>
            {card.roleShort}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <Tag key={tag} variant="dark">
                {tag}
              </Tag>
            ))}
          </div>

          {emphasis ? (
            <p className="mb-4 text-sm leading-relaxed text-gray-400">{emphasis}</p>
          ) : (
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              <span className="font-semibold uppercase tracking-wide text-gray-500">Outcome · </span>
              {card.outcome}
            </p>
          )}

          {links && links.length > 0 && (
            <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-purple-300 underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto">
            <Link to={href} className="c-button c-button--secondary" aria-label={card.ctaLabel} onClick={trackOpen}>
              {card.ctaLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
