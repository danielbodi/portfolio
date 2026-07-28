import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { hero, contact } from '../../../content/site';
import { analytics } from '../../../utils/basicAnalytics';

/**
 * First viewport: positioning plus real evidence (brief section 6.1).
 * The visual is an assembled proof composition of real work, not an
 * abstract decoration.
 */
export function Hero() {
  return (
    <section className="px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-16" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Copy */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-purple-300">
            {hero.eyebrow}
          </p>
          <h1 id="hero-heading" className="mb-5 text-4xl font-bold leading-[1.08] tracking-display md:text-5xl lg:text-[3.4rem]">
            {hero.title}
          </h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
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
            className="group inline-flex items-center gap-1.5 text-sm text-gray-400 underline-offset-4 hover:text-purple-300 hover:underline"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {hero.contextLink.label}
            <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Proof composition: real product UI + system artefact */}
        <div aria-hidden="false">
          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-gray-700/60 shadow-2xl shadow-black/40">
              <img
                src="/screenshots/bs/bs_desktop_ws-light.png"
                alt="Bridgestone fleet worksheet interface built on the shared component library"
                className="w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 w-[52%] overflow-hidden rounded-lg border border-purple-500/40 bg-gray-950 shadow-xl shadow-black/50 sm:-right-4">
              <img
                src="/screenshots/solidaris/token-architecture.svg"
                alt="Three-tier design token architecture bridging Figma variables to PrimeNG"
                className="w-full"
              />
            </div>
          </div>
          <p className="mt-12 text-xs leading-relaxed text-gray-500">
            Bridgestone fleet worksheet <span className="text-gray-400">(in production)</span> ·
            Solidaris token architecture <span className="text-gray-400">(ongoing)</span>
          </p>
        </div>
      </div>
    </section>
  );
}
