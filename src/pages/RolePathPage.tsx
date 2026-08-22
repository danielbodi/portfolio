import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RolePath } from '../content/rolePaths';
import { WorkCard } from '../ui/components/work/WorkCard';
import { useSeo } from '../hooks/useSeo';
import { contact } from '../content/site';
import { analytics } from '../utils/basicAnalytics';
import { Card } from '../ui/components/cards/Card';

interface RolePathPageProps {
  path: RolePath;
  otherPath: RolePath;
}

/**
 * Role-specific entry point (brief section 3.3): the same verified evidence
 * as the rest of the site, re-ordered and re-emphasised for one audience.
 */
export function RolePathPage({ path, otherPath }: RolePathPageProps) {
  useSeo({
    title: path.seoTitle,
    description: path.seoDescription,
    path: `/${path.slug}`
  });

  useEffect(() => {
    analytics.trackPortfolioEvent('role_path_selected', { path: path.slug });
  }, [path.slug]);

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Curated path
          </p>
          <h1 className="mb-4 text-3xl font-bold text-purple-300 md:text-4xl">{path.title}</h1>
          <p className="text-lg leading-relaxed text-gray-400">{path.intro}</p>
        </header>

        <section aria-labelledby="focus-heading" className="mb-12">
          <h2 id="focus-heading" className="mb-4 text-xl font-semibold text-gray-200">
            What to look for
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {path.focusPoints.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="evidence-heading" className="mb-14">
          <h2 id="evidence-heading" className="mb-6 text-xl font-semibold text-gray-200">
            Evidence, in the order that matters for this role
          </h2>
          <div className="space-y-6">
            {path.entries.map((entry, index) => (
              <WorkCard
                key={entry.card.slug}
                card={entry.card}
                emphasis={entry.emphasis}
                links={entry.links}
                imagePosition={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </section>

        <footer>
          <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-1 text-lg font-semibold text-gray-200">{path.cvNote}</h2>
              <p className="text-sm text-gray-500">
                One CV covers both tracks today; a role-specific version is in preparation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={contact.cv.file}
                download={contact.cv.fileName}
                className="c-button c-button--primary"
                onClick={() => analytics.trackPortfolioEvent('cv_download', { variant: path.slug })}
              >
                Download CV
              </a>
              <Link to={`/${otherPath.slug}`} className="c-button c-button--secondary">
                {otherPath.title} path
              </Link>
            </div>
          </div>
          </Card>
        </footer>
      </div>
    </div>
  );
}
