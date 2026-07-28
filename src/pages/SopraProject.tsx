import React from 'react';
import { CaseStudyTemplate } from './CaseStudyTemplate';
import { sopraBankingStudy } from '../content/caseStudies/sopraBanking';

export function SopraProject() {
  return <CaseStudyTemplate study={sopraBankingStudy} />;
}

export default SopraProject;
