import React from 'react';
import { CaseStudyTemplate } from './CaseStudyTemplate';
import { solidarisStudy } from '../content/caseStudies/solidaris';

export function SolidarisProject() {
  return <CaseStudyTemplate study={solidarisStudy} />;
}

export default SolidarisProject;
