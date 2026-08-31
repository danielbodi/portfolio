import { Component, ErrorInfo, ReactNode, Suspense } from 'react';
import { VisualStoryLiveDemo } from '../../../content/caseStudies/visualStories';
import { EvidenceStatusBadge } from '../story/EvidenceStatusBadge';
import { DemoFrame } from './DemoFrame';
import { demoRegistry } from './registry';

export interface LiveDemoProps {
  media: VisualStoryLiveDemo;
}

interface DemoBoundaryState {
  failed: boolean;
}

/** A failed demo chunk must not take the whole case study down with it. */
class DemoBoundary extends Component<{ children: ReactNode }, DemoBoundaryState> {
  state: DemoBoundaryState = { failed: false };

  static getDerivedStateFromError(): DemoBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Demo failed to render', error, info.componentStack);
    }
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="text-sm leading-relaxed text-amber-300">
          This demo could not load. Reloading the page will try again.
        </p>
      );
    }

    return this.props.children;
  }
}

function DemoLoading() {
  return (
    <p role="status" className="text-sm leading-relaxed text-gray-400">
      Loading the demo…
    </p>
  );
}

/**
 * Renders a `{ kind: 'live-demo' }` media item: resolves the id against the
 * registry, wraps the lazy component in the shared frame, and falls back
 * gracefully while the chunk loads or if it fails.
 */
export function LiveDemo({ media }: LiveDemoProps) {
  const entry = demoRegistry[media.demoId];
  if (!entry) return null;

  const Demo = entry.component;

  return (
    <DemoFrame
      anchorId={`demo-${media.demoId}`}
      label={media.label ?? entry.label}
      title={media.title ?? entry.title}
      description={media.description ?? entry.description}
      provenance={media.provenance ?? entry.provenance}
      badges={media.evidenceStatus && <EvidenceStatusBadge status={media.evidenceStatus} />}
    >
      <DemoBoundary>
        <Suspense fallback={<DemoLoading />}>
          <Demo />
        </Suspense>
      </DemoBoundary>
    </DemoFrame>
  );
}
