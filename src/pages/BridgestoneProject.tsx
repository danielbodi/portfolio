import React from 'react';
import { VisualCaseStudyTemplate } from './VisualCaseStudyTemplate';
import { bridgestoneStudy } from '../content/caseStudies/bridgestone';
import { bridgestoneVisualStory } from '../content/caseStudies/visualStories';

export function BridgestoneProject() {
  return <VisualCaseStudyTemplate study={bridgestoneStudy} story={bridgestoneVisualStory} />;
}

export default BridgestoneProject;
