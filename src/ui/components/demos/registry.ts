import React from "react";
import { VisualDemoId } from "../../../content/caseStudies/visualStories";

/**
 * Demos take no props. One that animates reads `useReducedMotion` itself, the
 * way ExpandableImage does; DemoFrame only handles its own chrome.
 */
export type DemoComponent = React.ComponentType;

export interface DemoRegistryEntry {
  /** Eyebrow above the frame heading. */
  label: string;
  title: string;
  /** One line on what the visitor can do. */
  description: string;
  /** What the demo is and is not. */
  provenance: string;
  component: React.LazyExoticComponent<DemoComponent>;
}

/**
 * Every demo the story content can mount, keyed by the id used in
 * `{ kind: 'live-demo', demoId }`. Components are code-split, so a case page
 * that mounts no demo pays nothing for them.
 */
export const demoRegistry: Record<VisualDemoId, DemoRegistryEntry> = {
  "bridgestone-token-pipeline": {
    label: "Live demo",
    title: "The token pipeline, running in this page",
    description:
      "Rename a token to watch the validator accept or skip it, then move a hue and watch the generated documentation regenerate from the CSSOM — documentation consuming the tokens, not cloning them.",
    provenance:
      "A re-implementation of the technique in this page\u2019s own code \u2014 the case\u2019s naming grammar, its getColors() regex and its color-mix composition, run against this site\u2019s palette. Not a capture of FleetBridge and not a feed from it: no client colour values appear here.",
    component: React.lazy(() => import("./TokenPipelineDemo")),
  },
};
