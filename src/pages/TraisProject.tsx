import React from 'react';
import { CaseStudyTemplate } from './CaseStudyTemplate';
import { trasisStudy } from '../content/caseStudies/trasis';

export function TraisProject() {
  return <CaseStudyTemplate study={trasisStudy} />;
}

export default TraisProject;
