import React from 'react';
import { VisualCaseStudyTemplate } from './VisualCaseStudyTemplate';
import { trasisStudy } from '../content/caseStudies/trasis';
import { trasisVisualStory } from '../content/caseStudies/visualStories';

export function TraisProject() {
  return <VisualCaseStudyTemplate study={trasisStudy} story={trasisVisualStory} />;
}

export default TraisProject;
