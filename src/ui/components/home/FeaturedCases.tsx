import { flagshipCards } from '../../../content/caseStudies/cards';
import { WorkCard } from '../work/WorkCard';

/** The three flagship cases. */
export function FeaturedCases() {
  return (
    <section id="selected-work" aria-labelledby="featured-heading" className="pb-10 pt-16 md:pb-14 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h2 id="featured-heading" className="mb-3 text-3xl font-bold text-purple-300 md:text-4xl">
            Selected work
          </h2>
          <p className="max-w-2xl text-gray-400">
            Three cases where product direction became shared capability.
          </p>
        </header>

        <div className="space-y-6">
          {flagshipCards.map((card, index) => (
            <WorkCard key={card.slug} card={card} imagePosition={index % 2 === 0 ? 'left' : 'right'} />
          ))}
        </div>
      </div>
    </section>
  );
}
