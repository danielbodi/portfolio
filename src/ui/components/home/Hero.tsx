import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { hero, contact } from '../../../content/site';
import { analytics } from '../../../utils/basicAnalytics';
import { HeroSpecimen } from './HeroSpecimen';

/**
 * First viewport: positioning, then a specimen of the actual craft —
 * product UI plus a live token/contract fragment.
 */
export function Hero() {
  return (
    <section className="pb-10 pt-12 md:pb-12 md:pt-20" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-purple-300">
          {hero.eyebrow}
        </p>
        <h1
          id="hero-heading"
          className="mb-6 text-[2.15rem] font-bold leading-[1.08] tracking-display md:text-5xl lg:text-[3.35rem] lg:leading-[1.06]"
        >
          {hero.title}
        </h1>
        <p className="mb-8 text-base leading-relaxed text-gray-400 md:text-lg">
          {hero.support}
        </p>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Link to={hero.ctaPrimary.href} className="c-button c-button--primary">
            {hero.ctaPrimary.label}
          </Link>
          <a
            href={hero.ctaSecondary.href}
            download={contact.cv.fileName}
            className="c-button c-button--secondary"
            onClick={() => analytics.trackPortfolioEvent('cv_download', { variant: 'default', from: '/' })}
          >
            {hero.ctaSecondary.label}
          </a>
        </div>
        <Link
          to={hero.contextLink.href}
          className="group mb-12 inline-flex items-center gap-1.5 text-sm text-gray-400 underline-offset-4 hover:text-purple-300 hover:underline md:mb-16"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {hero.contextLink.label}
          <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>

        <HeroSpecimen />
      </div>
    </section>
  );
}
