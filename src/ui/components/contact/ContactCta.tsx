import { Link } from 'react-router-dom';
import { contact } from '../../../content/site';
import { analytics } from '../../../utils/basicAnalytics';
import { Card } from '../cards/Card';

interface ContactCtaProps {
  /** Analytics origin for the contact and CV events. */
  from: string;
  /** Adds a route into the case index; omit where the page already links there. */
  includeWorkLink?: boolean;
  /** Vertical rhythm only — the block itself stays identical across pages. */
  className?: string;
}

/**
 * The closing ask. Home and About both end on this card, so the pitch, the
 * contact facts and the analytics wiring exist once, and the highest-intent
 * moment on either page carries the same weight.
 */
export function ContactCta({
  from,
  includeWorkLink = false,
  className = 'py-16 md:py-24'
}: ContactCtaProps) {
  return (
    <section aria-labelledby="contact-heading" className={className}>
      <div className="mx-auto max-w-6xl">
        <Card>
          <h2 id="contact-heading" className="mb-3 text-3xl font-bold text-gray-100 md:text-4xl">
            Working on something complex?
          </h2>
          <p className="mb-2 max-w-2xl text-gray-400">
            I&apos;m most useful where product direction, design systems and implementation have to
            meet — enterprise workflows, connected ecosystems, and teams that want their design
            system to actually ship.
          </p>
          <p className="mb-8 text-sm text-gray-500">{contact.location}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="c-button c-button--primary"
              onClick={() => analytics.trackPortfolioEvent('contact_click', { from })}
            >
              Email me
            </a>
            <a
              href={contact.cv.file}
              download={contact.cv.fileName}
              className="c-button c-button--secondary"
              onClick={() => analytics.trackPortfolioEvent('cv_download', { variant: 'default', from })}
            >
              {contact.cv.label}
            </a>
            {includeWorkLink && (
              <Link to="/work" className="c-button c-button--secondary">
                View selected work
              </Link>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
