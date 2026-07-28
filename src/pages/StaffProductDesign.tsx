import React from 'react';
import { RolePathPage } from './RolePathPage';
import { staffProductDesignPath, designEngineeringPath } from '../content/rolePaths';

export function StaffProductDesign() {
  return <RolePathPage path={staffProductDesignPath} otherPath={designEngineeringPath} />;
}

export default StaffProductDesign;
