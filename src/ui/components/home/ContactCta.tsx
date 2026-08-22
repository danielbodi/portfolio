import React from 'react';
import { contact } from '../../../content/site';
import { analytics } from '../../../utils/basicAnalytics';
import { Card } from '../cards/Card';

/** Contact and CV close (brief section 5, homepage order items 9–10). */
export function ContactCta() {
  return (
    <section aria-labelledby="contact-heading" className="py-16 md:py-24">
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
              onClick={() => analytics.trackPortfolioEvent('contact_click', { from: '/' })}
            >
              Email me
            </a>
            <a
              href={contact.cv.file}
              download={contact.cv.fileName}
              className="c-button c-button--secondary"
              onClick={() => analytics.trackPortfolioEvent('cv_download', { variant: 'default', from: '/' })}
            >
              {contact.cv.label}
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}
