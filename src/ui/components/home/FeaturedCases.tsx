import { allCards, flagshipCards } from '../../../content/caseStudies/cards';
import { SelectedWorkSection } from '../work/SelectedWorkSection';
import { TextLink } from '../links/TextLink';

/** Copy elsewhere spells counts out, so a bare digit here would read as a typo. */
const countWords = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const totalCases = countWords[allCards.length] ?? String(allCards.length);

/** The three flagship cases, teasing the full index at /work. */
export function FeaturedCases() {
  return (
    <SelectedWorkSection
      id="selected-work"
      headingId="featured-heading"
      headingLevel={2}
      title="Selected work"
      description="Three cases where product direction became shared capability."
      cards={flagshipCards}
      footer={
        <TextLink to="/work" className="mt-8">
          See all {totalCases} cases, including earlier foundations
        </TextLink>
      }
    />
  );
}
