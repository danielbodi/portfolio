/**
 * Refcounted "an incoming route is still pending" signal.
 *
 * Suspense fallbacks report here on mount and unmount, which lets the page
 * transition hold its cover until the new route can actually paint instead of
 * revealing an empty frame. The background motion bus is driven from the same
 * calls, so the field keeps moving for exactly as long as something is loading.
 */

import { beginLoading, endLoading } from "../background/backgroundMotion";

let pending = 0;

export function beginRouteLoad(): void {
  pending += 1;
  beginLoading();
}

export function endRouteLoad(): void {
  if (pending === 0) return;
  pending -= 1;
  endLoading();
}

export function isRouteLoading(): boolean {
  return pending > 0;
}
