import { positioningPillars } from '../../../content/site';
import { DefinitionStrip } from '../story';

/** Three concise signals describing Daniel's distinctive operating range. */
export function PositioningPillars() {
  return (
    <section className="positioning-pillars" aria-labelledby="positioning-pillars-heading">
      <h2 id="positioning-pillars-heading" className="sr-only">
        Positioning pillars
      </h2>
      <DefinitionStrip
        items={positioningPillars.map((pillar) => ({
          label: pillar.heading,
          text: pillar.supportingLine
        }))}
      />
    </section>
  );
}
