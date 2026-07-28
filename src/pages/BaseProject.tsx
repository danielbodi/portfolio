import React from 'react';
import { CaseStudyTemplate } from './CaseStudyTemplate';
import { baseStudy } from '../content/caseStudies/base';

export function BaseProject() {
  return <CaseStudyTemplate study={baseStudy} />;
}

export default BaseProject;
