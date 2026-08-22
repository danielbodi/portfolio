import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CaseStudy, OutcomeItem } from '../content/types';
import {
  RecruiterSummary,
  OwnershipBadge,
  DecisionBlock,
  ArtefactFigure,
  OutcomeMetric,
  DeliveryStateTag
} from '../ui/components/evidence';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
import { Tag } from '../ui/components/atoms/Tag/Tag';
import { useSeo } from '../hooks/useSeo';
import { analytics } from '../utils/basicAnalytics';
import { Card } from '../ui/components/cards/Card';

interface CaseStudyTemplateProps {
  study: CaseStudy;
}

function Surface({ children }: { children: React.ReactNode }) {
  return <Card className="h-full">{children}</Card>;
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-6 text-2xl font-bold text-gray-100 md:text-3xl">
      {children}
    </h2>
  );
}

function OutcomeList({ items }: { items: OutcomeItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="text-sm leading-relaxed text-gray-300">
          <span dangerouslySetInnerHTML={{ __html: item.text }} />
          {item.evidenceNote && (
            <span className="mt-1 block text-xs leading-relaxed text-gray-500">
              {item.evidenceNote}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Evidence-first case-study template (brief section 7): hero, recruiter
 * summary, strategic framing, ownership map, key decisions, product craft,
 * system evidence, validation, outcomes with evidence notes, reflection.
 */
export function CaseStudyTemplate({ study }: CaseStudyTemplateProps) {
  const { card, hero } = study;
  const pathname = `/work/${card.slug}`;

  useSeo({
    title: study.seo.title,
    description: study.seo.description,
    path: pathname,
    image: card.thumbnail
  });

  useEffect(() => {
    analytics.trackPortfolioEvent('project_view', { slug: card.slug });
  }, [card.slug]);

  return (
    <div className="case-page min-h-screen pb-24 pt-4 md:py-16">
      {/* Mobile Table of Contents */}
      <div className="lg:hidden">
        <TableOfContents variant="mobile" pathname={pathname} />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* ── Case hero ─────────────────────────────────────────────── */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded bg-gray-700">
              <img
                src={card.logo}
                alt=""
                className={`h-7 w-7 object-contain${card.logoInvert ? ' brightness-0 invert' : ''}`}
              />
            </div>
            <span className="text-lg font-semibold text-white">{card.company}</span>
            <DeliveryStateTag state={card.deliveryState} />
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-display text-purple-300 md:text-[2.6rem] md:leading-[1.15]">
            {card.title}
          </h1>
          <p className="mb-3 max-w-3xl text-xl font-medium leading-snug text-gray-100">
            {study.impactStatement}
          </p>
          <p className="mb-8 max-w-3xl leading-relaxed text-gray-400">{hero.summary}</p>

          <div className="mb-8">
          <Card>
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Role</dt>
              <dd className="mt-1 text-sm leading-relaxed text-gray-300">{hero.role}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Period</dt>
              <dd className="mt-1 text-sm leading-relaxed text-gray-300">{hero.period}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Team</dt>
              <dd className="mt-1 text-sm leading-relaxed text-gray-300">{hero.team}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Context</dt>
              <dd className="mt-1 text-sm leading-relaxed text-gray-300">{hero.context}</dd>
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {hero.stack.map((item) => (
                  <Tag key={item} variant="dark">
                    {item}
                  </Tag>
                ))}
              </dd>
            </div>
            {hero.confidentialityNote && (
              <div className="sm:col-span-2 lg:col-span-4">
                <dt className="sr-only">Confidentiality note</dt>
                <dd className="text-xs leading-relaxed text-gray-500">{hero.confidentialityNote}</dd>
              </div>
            )}
          </dl>
          </Card>
          </div>

          <ArtefactFigure artefact={hero.image} fit="natural" />
        </header>

        {/* ── Recruiter summary ─────────────────────────────────────── */}
        <div className="mb-14">
          <RecruiterSummary summary={study.recruiterSummary} />
        </div>

        {/* ── Strategic framing ─────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="strategic-framing">
          <SectionHeading id="strategic-framing">{study.framing.heading}</SectionHeading>
          <div className="max-w-measure space-y-4">
            {study.framing.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="leading-relaxed text-gray-400"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </section>

        {/* ── Scope and ownership ───────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="scope-ownership">
          <SectionHeading id="scope-ownership">Scope and ownership</SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            {study.ownership.map((group) => (
              <Surface key={group.verb}>
                <div className="mb-3">
                  <OwnershipBadge verb={group.verb} />
                </div>
                <ul className="space-y-1.5">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                      <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Surface>
            ))}
          </div>
        </section>

        {/* ── Constraints ───────────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="constraints">
          <SectionHeading id="constraints">Constraints</SectionHeading>
          <div className="max-w-3xl space-y-4">
            {study.constraints.items.map((item, i) => (
              <Surface key={i}>
                <p className="text-sm leading-relaxed text-gray-300">{item.constraint}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  <span className="text-xs font-semibold uppercase tracking-wide text-purple-300">
                    Still changed ·{' '}
                  </span>
                  {item.soWhat}
                </p>
              </Surface>
            ))}
          </div>
          {study.constraints.limitedBy && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-500">
              <span className="font-semibold uppercase tracking-wide">Where it stopped · </span>
              {study.constraints.limitedBy}
            </p>
          )}
        </section>

        {/* ── Key decisions ─────────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="key-decisions">
          <SectionHeading id="key-decisions">Key decisions</SectionHeading>
          <div className="space-y-6">
            {study.decisions.map((decision, index) => (
              <DecisionBlock key={decision.id} decision={decision} index={index} />
            ))}
          </div>
        </section>

        {/* ── Influence ─────────────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="influence">
          <SectionHeading id="influence">Influence</SectionHeading>
          <div className="grid gap-4 md:grid-cols-3">
            <Surface>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">
                Who I aligned
              </h3>
              <ul className="space-y-1.5">
                {study.influence.aligned.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </Surface>
            <Surface>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">
                Who I convinced
              </h3>
              <ul className="space-y-1.5">
                {study.influence.convinced.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </Surface>
            <Surface>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">
                What changed in how people worked
              </h3>
              <ul className="space-y-1.5">
                {study.influence.changed.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </Surface>
          </div>
        </section>

        {/* ── Product craft ─────────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="product-craft">
          <SectionHeading id="product-craft">Product craft</SectionHeading>
          <p
            className="mb-8 max-w-3xl leading-relaxed text-gray-400"
            dangerouslySetInnerHTML={{ __html: study.craft.intro }}
          />
          <div className="space-y-8">
            {study.craft.artefacts.map((artefact) => (
              <ArtefactFigure key={artefact.src} artefact={artefact} fit="natural" />
            ))}
          </div>
        </section>

        {/* ── System and engineering evidence ───────────────────────── */}
        {study.systemEvidence && study.systemEvidence.length > 0 && (
          <section className="mb-14" aria-labelledby="system-evidence">
            <SectionHeading id="system-evidence">System and engineering evidence</SectionHeading>
            <div className="space-y-8">
              {study.systemEvidence.map((section, i) => (
                <div key={i}>
                  <h3 className="mb-3 text-lg font-semibold text-gray-200">{section.heading}</h3>
                  <div className="max-w-3xl space-y-4">
                    {section.paragraphs.map((paragraph, j) => (
                      <p
                        key={j}
                        className="leading-relaxed text-gray-400"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Validation and iteration ──────────────────────────────── */}
        {study.validation && (
          <section className="mb-14" aria-labelledby="validation">
            <SectionHeading id="validation">Validation and iteration</SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              <Surface>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">Method</h3>
                <ul className="space-y-1.5">
                  {study.validation.method.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                      <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Surface>
              <Surface>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">What we observed</h3>
                <ul className="space-y-1.5">
                  {study.validation.observed.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                      <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Surface>
              <Surface>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">What changed</h3>
                <ul className="space-y-1.5">
                  {study.validation.changed.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                      <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Surface>
              <Surface>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">Limitations</h3>
                <p className="text-sm leading-relaxed text-gray-400">{study.validation.limitations}</p>
              </Surface>
            </div>
          </section>
        )}

        {/* ── Outcomes ──────────────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="outcomes">
          <SectionHeading id="outcomes">Outcomes</SectionHeading>
          {study.metrics && study.metrics.length > 0 && (
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {study.metrics.map((metric, i) => (
                <OutcomeMetric key={i} metric={metric} />
              ))}
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <Surface>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">For users</h3>
              <OutcomeList items={study.outcomes.user} />
            </Surface>
            <Surface>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">For the team and business</h3>
              <OutcomeList items={study.outcomes.team} />
            </Surface>
            <Surface>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">For the system</h3>
              <OutcomeList items={study.outcomes.system} />
            </Surface>
            <Surface>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">What I learned</h3>
              <ul className="space-y-3">
                {study.outcomes.learning.map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </Surface>
          </div>
        </section>

        {/* ── Reflection ────────────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="reflection">
          <SectionHeading id="reflection">Reflection</SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            <Surface>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-300">I would repeat</h3>
              <ul className="space-y-2">
                {study.reflection.repeat.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </Surface>
            <Surface>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-300">I would change</h3>
              <ul className="space-y-2">
                {study.reflection.change.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </Surface>
          </div>
          {study.reflection.next && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-400">
              <span className="font-semibold uppercase tracking-wide text-gray-500">Next · </span>
              {study.reflection.next}
            </p>
          )}
        </section>

        {/* ── Connection to another case ─────────────────────────────── */}
        {study.connection && (
          <footer className="border-t border-gray-700/60 pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="mb-2 text-xl font-semibold text-purple-300">{study.connection.title}</h2>
                <p
                  className="max-w-2xl text-gray-400"
                  dangerouslySetInnerHTML={{ __html: study.connection.description }}
                />
              </div>
              <Link to={study.connection.href} className="c-button c-button--secondary flex-shrink-0">
                {study.connection.buttonText}
              </Link>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
