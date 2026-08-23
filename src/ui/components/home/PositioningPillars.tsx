import { positioningPillars } from '../../../content/site';

/** Four concise signals describing Daniel's distinctive operating range. */
export function PositioningPillars() {
  return (
    <section className="positioning-pillars" aria-labelledby="positioning-pillars-heading">
      <div className="positioning-pillars__rail">
        <h2 id="positioning-pillars-heading" className="sr-only">
          Positioning pillars
        </h2>
        <dl className="positioning-pillars__grid">
          {positioningPillars.map((pillar) => (
            <div key={pillar.id} className="positioning-pillars__item">
              <dt>{pillar.heading}</dt>
              <dd>{pillar.supportingLine}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
