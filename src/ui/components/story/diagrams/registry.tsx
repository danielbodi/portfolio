import type { ComponentType } from 'react';
import type { VisualDiagramId } from '../../../../content/caseStudies/visualStories';
import { AgentDelegationWorkflow } from '../AgentDelegationWorkflow';
import { ContractsIndexDiagram } from './ContractsIndexDiagram';
import { TokenArchitectureDiagram } from './TokenArchitectureDiagram';

const diagramRegistry: Record<VisualDiagramId, ComponentType> = {
  'solidaris-agent-delegation': AgentDelegationWorkflow,
  'solidaris-token-architecture': TokenArchitectureDiagram,
  'solidaris-contracts-index': ContractsIndexDiagram
};

export function StoryDiagram({ diagramId }: { diagramId: VisualDiagramId }) {
  const Diagram = diagramRegistry[diagramId];
  return <Diagram />;
}
