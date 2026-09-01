import { flagshipCards, supportingCards } from '../content/caseStudies/cards';
import { SelectedWorkSection } from '../ui/components/work/SelectedWorkSection';
import { useSeo } from '../hooks/useSeo';

export function WorkIndex() {
  useSeo({
    title: 'Selected Work — Daniel Bodi Gil',
    description:
      'Case studies in enterprise product design, design systems and UX engineering: Bridgestone, Solidaris, Trasis, Sopra Banking and Base.',
    path: '/work'
  });

  return (
    <>
      <SelectedWorkSection
        id="selected-work"
        headingId="featured-heading"
        headingLevel={1}
        title="Selected work"
        description="Three flagship cases in enterprise product design, design systems and UX engineering."
        cards={flagshipCards}
      />

      {/* The earlier roles carry the front-end practice the flagships build on,
          so they belong in the index rather than only in the About timeline —
          as compact rows, to keep the page scannable after three full cards. */}
      <SelectedWorkSection
        id="earlier-foundations"
        headingId="earlier-foundations-heading"
        headingLevel={2}
        title="Earlier foundations"
        description="Front-end architecture and UI engineering roles the later system work was built on."
        cards={supportingCards}
        variant="index"
        className="pb-16 pt-6 md:pb-24 md:pt-10"
      />

      {/* Bottom spacing for mobile navigation */}
      <div className="h-16 md:h-0"></div>
    </>
  );
}

export default WorkIndex;
