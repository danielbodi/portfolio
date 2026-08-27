import { Link } from 'react-router-dom';
import { flagshipCards } from '../../../content/caseStudies/cards';
import { WorkCard } from '../work/WorkCard';

/** The three flagship cases, each with a project-specific CTA (brief section 6.3). */
export function FeaturedCases() {
  return (
    <section id="selected-work" aria-labelledby="featured-heading" className="pb-10 pt-16 md:pb-14 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="featured-heading" className="mb-3 text-3xl font-bold text-purple-300 md:text-4xl">
              Selected work
            </h2>
            <p className="max-w-2xl text-gray-400">
              A production UI foundation for fleet operations, ongoing healthcare product-and-systems
              work, and a shipped interface for radiopharmaceutical quality control.
            </p>
          </div>
          <Link to="/work" className="c-button c-button--secondary flex-shrink-0">
            All work, including earlier foundations
          </Link>
        </div>

        <div className="space-y-6">
          {flagshipCards.map((card, index) => (
            <WorkCard key={card.slug} card={card} imagePosition={index % 2 === 0 ? 'left' : 'right'} />
          ))}
        </div>
      </div>
    </section>
  );
}
