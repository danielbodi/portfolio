import { VisualCaseStudyTemplate } from './VisualCaseStudyTemplate';
import { baseStudy } from '../content/caseStudies/base';
import { baseVisualStory } from '../content/caseStudies/visualStories';

export function BaseProject() {
  return <VisualCaseStudyTemplate study={baseStudy} story={baseVisualStory} />;
}

export default BaseProject;
