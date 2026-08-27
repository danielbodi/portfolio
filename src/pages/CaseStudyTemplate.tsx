import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CaseStudy, OutcomeItem } from '../content/types';
import {
  RecruiterSummary,
  OwnershipBadge,
  DecisionBlock,
  ArtefactFigure,
  OutcomeMetric,
  DeliveryStateTag,
  EvidenceClassTag,
  SystemEvidenceVisual
} from '../ui/components/evidence';
import { TableOfContents } from '../ui/components/table-of-contents/TableOfContents';
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
        </li>
      ))}
    </ul>
  );
}

function EvidenceAndLimitations({ study }: { study: CaseStudy }) {
  const evidenceBasis = study.evidenceStatus
    ? [study.evidenceStatus.intro]
    : (study.recruiterSummary.evidence ?? []).slice(0, 3);
  const outcomeNotes = [
    ...study.outcomes.user,
    ...study.outcomes.team,
    ...study.outcomes.system
  ].flatMap((item) => (item.evidenceNote ? [item.evidenceNote] : []));
  const boundaryCandidates = study.evidenceStatus
    ? [study.evidenceStatus.measurementNote, study.hero.confidentialityNote]
    : [study.validation?.limitations, study.constraints.limitedBy, ...outcomeNotes];
  const limitations = [...new Set(
    boundaryCandidates.filter((item): item is string => Boolean(item))
  )].slice(0, 3);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Surface>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">
          Evidence basis
        </h3>
        <ul className="space-y-2">
          {evidenceBasis.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-gray-300">
              <span
                aria-hidden="true"
                className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-500"
              />
              {item}
            </li>
          ))}
        </ul>
      </Surface>
      {limitations.length > 0 && (
        <Surface>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-300">
            Boundaries
          </h3>
          <ul className="space-y-2">
            {limitations.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-amber-400/70"
                />
                {item}
              </li>
            ))}
          </ul>
        </Surface>
      )}
    </div>
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
              <dl className="grid gap-x-8 gap-y-4 md:grid-cols-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Role</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-gray-300">{hero.role}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Period</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-gray-300">{hero.period}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Context</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-gray-300">{hero.context}</dd>
                </div>
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

        {/* ── Key decisions ─────────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="key-decisions">
          <SectionHeading id="key-decisions">Key decisions</SectionHeading>
          <div className="space-y-6">
            {study.decisions.map((decision, index) => (
              <DecisionBlock key={decision.id} decision={decision} index={index} />
            ))}
          </div>
        </section>

        {/* ── Product craft ─────────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="product-craft">
          <SectionHeading id="product-craft">Product craft</SectionHeading>
          <p
            className="mb-8 max-w-3xl leading-relaxed text-gray-400"
            dangerouslySetInnerHTML={{ __html: study.craft.intro }}
          />
          <div className="space-y-6">
            {study.craft.artefacts[0] && (
              <ArtefactFigure artefact={study.craft.artefacts[0]} fit="natural" />
            )}
            {study.craft.artefacts.length > 1 && (
              <div className="grid gap-6 md:grid-cols-2">
                {study.craft.artefacts.slice(1).map((artefact) => (
                  <ArtefactFigure
                    key={artefact.src}
                    artefact={artefact}
                    compact
                    fit="natural"
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Chronology ───────────────────────────────────────────── */}
        {study.chronology && (
          <section className="mb-14" aria-labelledby="chronology">
            <SectionHeading id="chronology">{study.chronology.heading}</SectionHeading>
            <p className="mb-8 max-w-3xl leading-relaxed text-gray-400">
              {study.chronology.intro}
            </p>
            <ol className="relative max-w-4xl border-l border-gray-700/70 pl-6">
              {study.chronology.items.map((item) => (
                <li key={`${item.period}-${item.title}`} className="relative pb-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.72rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-gray-950 bg-purple-400"
                  />
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <EvidenceClassTag label={item.label} />
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-200">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

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
        </section>

        {/* ── Influence ─────────────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="influence">
          <SectionHeading id="influence">Influence</SectionHeading>
          <div className="grid gap-4 md:grid-cols-3">
            <Surface>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">
                Where alignment mattered
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
                What I advocated
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
                How the collaboration changed
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

        {/* ── System and engineering evidence ───────────────────────── */}
        {study.systemEvidence && study.systemEvidence.length > 0 && (
          <section className="mb-14" aria-labelledby="system-evidence">
            <SectionHeading id="system-evidence">System and engineering evidence</SectionHeading>
            <div className="space-y-8">
              {study.systemEvidence.map((section, i) => (
                <div key={i}>
                  <h3 className="mb-3 text-lg font-semibold text-gray-200">{section.heading}</h3>
                  {section.visual && (
                    <div className="mb-5">
                      <SystemEvidenceVisual visual={section.visual} />
                    </div>
                  )}
                  <div className="max-w-3xl space-y-3">
                    {section.paragraphs.slice(0, 2).map((paragraph, j) => (
                      <p
                        key={j}
                        className={j === 0 ? 'leading-relaxed text-gray-400' : 'text-sm leading-relaxed text-gray-400'}
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
            <div className="grid gap-4 lg:grid-cols-3">
              <Surface>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">
                  Method
                </h3>
                <ul className="space-y-1.5">
                  {study.validation.method.slice(0, 2).map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-gray-500"
                      />
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
            </div>
          </section>
        )}

        {/* ── Outcomes / evidence boundaries ──────────────────────── */}
        <section className="mb-14" aria-labelledby="outcomes">
          <SectionHeading id="outcomes">
            {study.evidenceStatus ? 'Evidence and limitations' : 'Outcomes'}
          </SectionHeading>
          {study.evidenceStatus ? (
            <EvidenceAndLimitations study={study} />
          ) : (
            <>
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
              </div>
            </>
          )}
        </section>

        {!study.evidenceStatus && (
          <section className="mb-14" aria-labelledby="evidence-limitations">
            <SectionHeading id="evidence-limitations">Evidence and limitations</SectionHeading>
            <EvidenceAndLimitations study={study} />
          </section>
        )}

        {/* ── Reflection ────────────────────────────────────────────── */}
        <section className="mb-14" aria-labelledby="reflection">
          <SectionHeading id="reflection">Reflection</SectionHeading>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {study.reflection.repeat[0] && (
              <Surface>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  I would repeat
                </h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  {study.reflection.repeat[0]}
                </p>
              </Surface>
            )}
            {study.reflection.change[0] && (
              <Surface>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-300">
                  I would change
                </h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  {study.reflection.change[0]}
                </p>
              </Surface>
            )}
            {study.reflection.next && (
              <Surface>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-purple-300">
                  Next
                </h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  {study.reflection.next}
                </p>
              </Surface>
            )}
          </div>
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
