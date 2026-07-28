import React from 'react';
import { RolePathPage } from './RolePathPage';
import { designEngineeringPath, staffProductDesignPath } from '../content/rolePaths';

export function DesignEngineering() {
  return <RolePathPage path={designEngineeringPath} otherPath={staffProductDesignPath} />;
}

export default DesignEngineering;
