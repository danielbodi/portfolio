import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { hero } from '../../../content/site';
import { InteractiveHeadline } from './InteractiveHeadline';
import { DeliveryStateTag, EvidenceClassTag } from '../evidence';
import { analytics } from '../../../utils/basicAnalytics';

/**
 * First viewport: Daniel's positioning statement is both the message and the
 * visual experience. The semantic headline remains the accessible baseline.
 */
export function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="home-hero__stage">
        <div className="home-hero__layout">
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

          <Link
            to={hero.proof.href}
            className="home-hero__proof"
            aria-label="Read the Solidaris product and systems case study"
          >
            <figure>
              <div className="home-hero__proof-image-wrap">
                <img
                  src={hero.proof.image.src}
                  alt={hero.proof.image.alt}
                  className="home-hero__proof-image"
                  width={1280}
                  height={800}
                  fetchPriority="high"
                />
              </div>
              <figcaption className="home-hero__proof-caption">
                <div className="flex flex-wrap items-center gap-2">
                  <EvidenceClassTag label={hero.proof.evidenceClass} />
                  <DeliveryStateTag state={hero.proof.state} />
                </div>
                <p className="home-hero__proof-eyebrow">{hero.proof.eyebrow}</p>
                <p>{hero.proof.caption}</p>
              </figcaption>
            </figure>
          </Link>
        </div>
      </div>

    </section>
  );
}
