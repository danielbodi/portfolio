import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { contact, hero } from '../../../content/site';
import { InteractiveHeadline } from './InteractiveHeadline';
import { analytics } from '../../../utils/basicAnalytics';

/**
 * First viewport: Daniel's positioning statement is both the message and the
 * visual experience. The semantic headline remains the accessible baseline.
 */
export function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="home-hero__stage">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow">
            {hero.eyebrow}
          </p>
          <InteractiveHeadline />
          <p className="home-hero__support">{hero.support}</p>
          <div className="home-hero__actions">
            <a href={hero.ctaPrimary.href} className="c-button c-button--primary">
              {hero.ctaPrimary.label}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="c-button c-button--secondary"
              onClick={() => analytics.trackPortfolioEvent('contact_click', { from: '/' })}
            >
              Contact me
            </a>
            <a
              href={hero.ctaSecondary.href}
              download={hero.ctaSecondary.download}
              className="c-button c-button--secondary"
              onClick={() => analytics.trackPortfolioEvent('cv_download', { variant: 'default', from: '/' })}
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
          <Link
            to={hero.contextLink.href}
            className="home-hero__status group"
          >
            <span aria-hidden="true" className="home-hero__status-dot" />
            <span>{hero.contextLink.label}</span>
            <ArrowRight size={14} aria-hidden="true" className="home-hero__status-arrow" />
          </Link>
        </div>
      </div>

    </section>
  );
}
