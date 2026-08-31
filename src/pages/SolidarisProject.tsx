import React from 'react';
import { VisualCaseStudyTemplate } from './VisualCaseStudyTemplate';
import { solidarisStudy } from '../content/caseStudies/solidaris';
import { solidarisVisualStory } from '../content/caseStudies/visualStories';

export function SolidarisProject() {
  return <VisualCaseStudyTemplate study={solidarisStudy} story={solidarisVisualStory} />;
}

export default SolidarisProject;
