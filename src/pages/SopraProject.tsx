import { VisualCaseStudyTemplate } from './VisualCaseStudyTemplate';
import { sopraBankingStudy } from '../content/caseStudies/sopraBanking';
import { sopraVisualStory } from '../content/caseStudies/visualStories';

export function SopraProject() {
  return <VisualCaseStudyTemplate study={sopraBankingStudy} story={sopraVisualStory} />;
}

export default SopraProject;
