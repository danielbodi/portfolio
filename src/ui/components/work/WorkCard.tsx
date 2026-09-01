import React from 'react';
import { Link } from 'react-router-dom';
import { CaseCard } from '../../../content/types';
import { DeliveryStateTag } from '../evidence';
import { Card } from '../cards/Card';
import { TextLink } from '../links/TextLink';
import { analytics } from '../../../utils/basicAnalytics';

interface WorkCardProps {
  card: CaseCard;
  /**
   * editorial: concise homepage preview.
   * role: adds role-specific emphasis and deep links.
   * index: scannable flagship row for /work — no prose beyond one problem line.
   */
  variant?: 'editorial' | 'role' | 'index';
  imagePosition?: 'left' | 'right';
  /** Optional role-path emphasis paragraph rendered instead of the outcome. */
  emphasis?: string;
  /** Optional deep links into case sections. */
  links?: { label: string; href: string }[];
}

const titleHoverClass =
  'transition-colors duration-200 group-hover:text-purple-300 group-focus-within:text-purple-300';

const roleTagClass =
  'rounded-full border border-gray-400 px-2.5 py-0.5 text-xs text-gray-200';

function roleTagsFrom(roleShort: string) {
  return roleShort.split(/\s*·\s*/).filter(Boolean);
}

function RoleTags({ roleShort, className = '' }: { roleShort: string; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {roleTagsFrom(roleShort).map((tag) => (
        <li key={tag} className={roleTagClass}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

/**
 * Case-study card exposing problem, role, tags and one evidence point.
 * The card itself is the link; hover colours the title and scales the card.
 */
export function WorkCard({
  card,
  variant = 'editorial',
  imagePosition = 'left',
  emphasis,
  links
}: WorkCardProps) {
  const href = `/work/${card.slug}`;
  const trackOpen = () => analytics.trackPortfolioEvent('case_study_opened', { slug: card.slug });
  /** Index rows read the short forms; the long title and problem stay authoritative. */
  const indexProblem = card.indexProblem ?? card.problem;

  const hitTarget = (
    <Link
      to={href}
      className="absolute inset-0 z-10 rounded-[inherit]"
      aria-label={card.ctaLabel}
      onClick={trackOpen}
    />
  );

  if (variant === 'index') {
    return (
      <Card className="group c-card--clickable">
        {hitTarget}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
          <div className="flex-shrink-0 overflow-hidden rounded-lg bg-gray-950/40 md:w-44 lg:w-56">
            <img src={card.thumbnail} alt="" loading="lazy" className="aspect-video w-full object-cover object-top" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-700">
                <img
                  src={card.logo}
                  alt=""
                  className={`h-4 w-4 object-contain${card.logoInvert ? ' brightness-0 invert' : ''}`}
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {card.company}
              </span>
              <span className="text-xs text-gray-500">{card.period}</span>
            </div>

            <h3 className={`text-lg font-semibold leading-snug text-gray-100 md:text-xl ${titleHoverClass}`}>
              {card.indexTitle ?? card.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{indexProblem}</p>
            <p className="mt-2.5 border-l-2 border-purple-400/50 pl-3 text-sm leading-relaxed text-gray-100">
              <span className="font-semibold uppercase tracking-wide text-purple-300">
                What changed ·{' '}
              </span>
              {card.evidence}
            </p>
            <RoleTags roleShort={card.roleShort} className="mt-3" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group c-card--clickable">
      {hitTarget}
      <div
        className={`flex flex-col gap-6 lg:flex-row ${
          imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
        }`}
      >
        <div className="overflow-hidden rounded-xl bg-gray-950/40 lg:w-1/2">
          <img src={card.thumbnail} alt="" loading="lazy" className="aspect-video w-full object-cover object-top" />
        </div>

        <div className="flex flex-col lg:w-1/2">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded bg-gray-700">
              <img
                src={card.logo}
                alt=""
                className={`h-6 w-6 object-contain${card.logoInvert ? ' brightness-0 invert' : ''}`}
              />
            </div>
            <span className="text-lg font-semibold text-white">{card.company}</span>
            <span className="text-sm text-gray-500">{card.period}</span>
            <DeliveryStateTag state={card.deliveryState} />
          </div>

          <h3 className={`mb-2 text-xl font-bold leading-snug text-gray-100 md:text-2xl ${titleHoverClass}`}>
            {card.title}
          </h3>

          <p className="mb-4 text-sm leading-relaxed text-gray-300 md:text-base">{card.problem}</p>

          <p className="border-l-2 border-purple-400/50 pl-3 text-sm leading-relaxed text-gray-100">
            <span className="font-semibold uppercase tracking-wide text-purple-300">
              {variant === 'role' ? 'Role focus · ' : 'What changed · '}
            </span>
            {variant === 'role' && emphasis ? emphasis : card.evidence}
          </p>

          {variant === 'role' && links && links.length > 0 && (
            <ul className="relative z-20 mt-4 flex flex-wrap gap-x-5 gap-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <TextLink to={link.href}>{link.label}</TextLink>
                </li>
              ))}
            </ul>
          )}

          <RoleTags roleShort={card.roleShort} className="mt-auto pt-5" />
        </div>
      </div>
    </Card>
  );
}
