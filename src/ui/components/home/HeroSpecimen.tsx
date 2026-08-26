import React from 'react';
import { Link } from 'react-router-dom';
import { heroSpecimen } from '../../../content/site';
import { Card } from '../cards/Card';
import { DeliveryStateTag } from '../evidence';

/**
 * Optional technical specimen: production UI with experimental contract and
 * orchestration outputs in front, with maturity stated in the caption.
 */
export function HeroSpecimen() {
  const { image, chrome, contract, supervisor, caption, state, href } = heroSpecimen;

  return (
    <figure className="hero-specimen">
      <div className="hero-specimen__frame">
        <div className="hero-specimen__stage">
          <div className="hero-specimen__chrome" aria-hidden="true">
            <span className="hero-specimen__dot" />
            <span className="hero-specimen__dot" />
            <span className="hero-specimen__dot" />
            <span className="ml-1.5 text-[0.7rem] tracking-wide text-gray-400">{chrome}</span>
          </div>
          <div className="hero-specimen__image-wrap">
            <img
              src={image.src}
              alt={image.alt}
              className="hero-specimen__image"
              width={1600}
              height={900}
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="hero-specimen__system">
          <div className="hero-specimen__panel">
            <Card>
              <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-purple-300">
                {contract.kicker}
              </p>
              <p className="mb-3 font-mono text-[0.75rem] text-gray-200">
                {contract.file}
                <span className="text-gray-500"> · {contract.schema}</span>
              </p>
              <dl className="space-y-2.5">
                {contract.fields.map((field) => (
                  <div key={field.key}>
                    <dt className="font-mono text-[0.65rem] text-purple-200/90">{field.key}</dt>
                    <dd className="mt-0.5 font-mono text-[0.7rem] leading-snug text-gray-300">
                      {field.key === 'tokens' && (
                        <span className="hero-specimen__token-row" aria-hidden="true">
                          <span className="hero-specimen__swatch hero-specimen__swatch--primitive" />
                          <span className="hero-specimen__swatch hero-specimen__swatch--semantic" />
                          <span className="hero-specimen__swatch hero-specimen__swatch--component" />
                        </span>
                      )}
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>

          <div className="hero-specimen__panel">
            <Card>
              <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-purple-300">
                {supervisor.kicker}
              </p>
              <p className="mb-3 text-[0.75rem] leading-snug text-gray-400">{supervisor.rule}</p>

              <ol className="hero-pipeline">
                <li>
                  <div className="hero-pipeline__role hero-pipeline__role--lead">
                    <span className="block text-[0.8rem] font-semibold tracking-display text-gray-100">
                      {supervisor.name}
                    </span>
                    <span className="block text-[0.62rem] text-purple-200">{supervisor.role}</span>
                  </div>
                </li>
                {supervisor.steps.map((step) => (
                  <li
                    key={step.id}
                    className={step.parallel ? 'hero-pipeline__pair' : undefined}
                  >
                    {step.roles.map((role) => (
                      <div key={role.name} className="hero-pipeline__role">
                        <span className="block text-[0.7rem] font-medium text-gray-100">{role.name}</span>
                        <span className="block text-[0.62rem] text-gray-500">{role.hint}</span>
                      </div>
                    ))}
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-[0.68rem] text-gray-500">{supervisor.grounding}</p>
            </Card>
          </div>
        </div>
      </div>

      <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs leading-relaxed text-gray-500 md:mt-6">
        <DeliveryStateTag state={state} />
        <span>
          {caption}{' '}
          <Link
            to={href}
            className="text-gray-300 underline-offset-4 hover:text-purple-300 hover:underline"
          >
            Read the case
          </Link>
        </span>
      </figcaption>
    </figure>
  );
}
