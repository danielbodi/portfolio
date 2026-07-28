import React from 'react';
import { CaseStudyTemplate } from './CaseStudyTemplate';
import { bridgestoneStudy } from '../content/caseStudies/bridgestone';

export function BridgestoneProject() {
  return <CaseStudyTemplate study={bridgestoneStudy} />;
}

export default BridgestoneProject;
