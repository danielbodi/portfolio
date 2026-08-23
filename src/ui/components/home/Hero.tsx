import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { hero } from '../../../content/site';
import { InteractiveHeadline } from './InteractiveHeadline';

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
            <Link to={hero.ctaSecondary.href} className="c-button c-button--secondary">
              {hero.ctaSecondary.label}
            </Link>
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
