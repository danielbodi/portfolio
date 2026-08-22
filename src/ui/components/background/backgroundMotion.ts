/**
 * Imperative motion bus for the animated background.
 *
 * Route transitions and loading states drive a "flow" level that the
 * background render loops read once per frame — nothing here causes React
 * re-renders. Flow speeds the field and slides it horizontally (`shiftX`);
 * an invisible presence also warps wave coordinates as it travels.
 *
 * The store is deliberately outside React: the WebGL/Canvas2D loops call
 * `read()` every animation frame, while UI that only needs a coarse
 * active/idle signal (the background wrapper opacity) subscribes via
 * `useBackgroundActivity()` and re-renders only on transitions.
 */

import { useEffect, useState } from "react";

export interface MotionSample {
  /** Overall activity 0..1 — scales contrast punch and wave speed. */
  flow: number;
  /** Presence centre in shader coordinates (0..1 both axes, y up). */
  presenceX: number;
  presenceY: number;
  /** Accumulated horizontal field offset. Increases move waves right. */
  shiftX: number;
}

const PULSE_RISE_FRACTION = 0.3;
const PULSE_FALL_FRACTION = 0.65;
const LOAD_RISE_MS = 320;
const LOAD_FALL_MS = 780;
const LOADING_FLOW = 0.5;
/** Screen-widths per second at flow 1. Integrated, never snapped. */
const SHIFT_SPEED = 1.45;

/** Reduced motion: the bus reports zero flow and never signals activity. */
let reducedMotion = false;
if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotion = mq.matches;
  const onChange = (event: MediaQueryListEvent) => {
    reducedMotion = event.matches;
  };
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onChange);
  }
}

interface Pulse {
  /** Flow envelope start. Refreshing a live pulse restarts this, not the sweep. */
  start: number;
  duration: number;
  /** Presence travels with the field: rightward pulse = left→right. */
  fromLeft: boolean;
  /** Flow at the moment this envelope was (re)armed; rise eases from here. */
  fromFlow: number;
  /** Presence travel; kept intact when an in-flight pulse is refreshed. */
  sweepStart: number;
  sweepDuration: number;
}

/** At most one pulse. Stacking envelopes was how later covers gained energy. */
let activePulse: Pulse | null = null;

/** +1 slides the field right; −1 slides it left. */
let shiftDir = 1;
let shiftX = 0;
let lastReadAt = 0;

let loadingCount = 0;
/** When flow last started rising from idle (for the ease-in). */
let loadingSince = 0;
/** When the last loader unmounted (for the ease-out tail). */
let loadingReleasedAt = 0;

type ActivityListener = (active: boolean) => void;
const activityListeners = new Set<ActivityListener>();
let lastActive = false;
let deactivationTimer: number | undefined;

function easeOutCubic(t: number): number {
  const c = 1 - t;
  return 1 - c * c * c;
}

function easeInOutSine(t: number): number {
  return 0.5 - 0.5 * Math.cos(Math.PI * t);
}

function pulseAlive(pulse: Pulse, now: number): boolean {
  return now - pulse.start < pulse.duration;
}

function isActiveAt(now: number): boolean {
  if (reducedMotion) return false;
  if (loadingCount > 0) return true;
  if (now - loadingReleasedAt < LOAD_FALL_MS) return true;
  return activePulse !== null && pulseAlive(activePulse, now);
}

function notifyActivity(): void {
  const now = performance.now();
  const active = isActiveAt(now);
  if (active !== lastActive) {
    lastActive = active;
    activityListeners.forEach((listener) => listener(active));
  }
  if (active) {
    // Re-check just after the latest known envelope can end.
    const pulseEnd =
      activePulse && pulseAlive(activePulse, now)
        ? activePulse.start + activePulse.duration
        : 0;
    const loadEnd =
      loadingCount > 0 ? Infinity : loadingReleasedAt + LOAD_FALL_MS;
    const nextCheck = Math.min(loadEnd, Math.max(pulseEnd, now));
    if (Number.isFinite(nextCheck)) {
      window.clearTimeout(deactivationTimer);
      deactivationTimer = window.setTimeout(
        notifyActivity,
        nextCheck - now + 60,
      );
    }
  }
}

/**
 * One pass of the presence through the field (route transitions).
 *
 * At most one pulse occupies the slot — never an array of overlapping
 * envelopes. `replace` (default) starts a new sweep for a new cover, seeding
 * flow from whatever is currently on screen so the slowdown does not dip.
 * `extend` refreshes a live envelope from the current flow and keeps the
 * in-flight sweep; it no-ops if nothing is running (so coalesced clicks
 * cannot stack a second pass after the first has ended).
 */
export function pulse(
  durationMs: number,
  mode: "replace" | "extend" = "replace",
  direction: 1 | -1 = 1,
): void {
  if (reducedMotion) return;
  const now = performance.now();
  const live = activePulse && pulseAlive(activePulse, now) ? activePulse : null;
  const currentFlow = live ? pulseFlow(live, now) : 0;

  // StrictMode remounts the cover effect; a replace 1 frame after another
  // would flip direction twice and look like a stacked sweep. Treat it as
  // extend. Real navigations are never this close.
  const replace = mode === "replace" && !(live && now - live.start < 32);
  if (!replace) {
    if (!live) return;
    activePulse = {
      start: now,
      duration: durationMs,
      fromLeft: live.fromLeft,
      fromFlow: currentFlow,
      sweepStart: live.sweepStart,
      sweepDuration: live.sweepDuration,
    };
    notifyActivity();
    return;
  }

  shiftDir = direction;
  const fromLeft = direction === 1;
  activePulse = {
    start: now,
    duration: durationMs,
    fromLeft,
    fromFlow: currentFlow,
    sweepStart: now,
    sweepDuration: durationMs,
  };
  notifyActivity();
}

/**
 * Refcounted loading state (Suspense fallbacks, transition covers).
 *
 * The count is kept even under reduced motion so callers can rely on it as a
 * truthful "still loading" signal; `read()` and `isActiveAt()` are what zero
 * the resulting motion.
 */
export function beginLoading(): void {
  const now = performance.now();
  if (loadingCount === 0) {
    // If we begin during the previous fall tail, resume from the tail's
    // current level instead of restarting the ease-in from zero.
    const tail = 1 - Math.min(1, (now - loadingReleasedAt) / LOAD_FALL_MS);
    loadingSince = now - tail * LOAD_RISE_MS;
  }
  loadingCount += 1;
  notifyActivity();
}

export function endLoading(): void {
  if (loadingCount <= 0) {
    loadingCount = 0;
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    loadingReleasedAt = performance.now();
  }
  notifyActivity();
}

function pulseFlow(pulse: Pulse, now: number): number {
  const t = now - pulse.start;
  if (t < 0 || t >= pulse.duration) return 0;
  const rise = pulse.duration * PULSE_RISE_FRACTION;
  const fall = pulse.duration * PULSE_FALL_FRACTION;
  if (t < rise) {
    return pulse.fromFlow + (1 - pulse.fromFlow) * easeOutCubic(t / rise);
  }
  if (t > pulse.duration - fall)
    return 1 - easeInOutSine((t - (pulse.duration - fall)) / fall);
  return 1;
}

function loadingFlow(now: number): number {
  if (loadingCount > 0) {
    const rise = Math.min(1, (now - loadingSince) / LOAD_RISE_MS);
    // Slow breathe so a long load does not read as frozen. Phase is derived
    // from time-since-rise so a long-lived tab does not start mid-breath.
    const breathe = 0.95 + 0.05 * Math.sin(((now - loadingSince) / 1000) * 0.8);
    return easeOutCubic(rise) * LOADING_FLOW * breathe;
  }
  const sinceRelease = now - loadingReleasedAt;
  if (sinceRelease < LOAD_FALL_MS) {
    return (1 - easeInOutSine(sinceRelease / LOAD_FALL_MS)) * LOADING_FLOW;
  }
  return 0;
}

/**
 * Per-frame sample for the render loops. Cheap: a handful of trig calls,
 * no allocation beyond the returned object.
 */
export function read(now: number): MotionSample {
  if (reducedMotion) {
    return { flow: 0, presenceX: 0.5, presenceY: 0.5, shiftX };
  }

  const dt =
    lastReadAt === 0 ? 0 : Math.min(0.1, Math.max(0, (now - lastReadAt) / 1000));
  lastReadAt = now;

  if (activePulse && !pulseAlive(activePulse, now)) {
    activePulse = null;
  }

  // Loading: the presence wanders on a slow Lissajous path.
  const t = now / 1000;
  let flow = loadingFlow(now);
  let presenceX = 0.5 + 0.26 * Math.sin(t * 0.26);
  let presenceY = 0.5 + 0.2 * Math.sin(t * 0.34 + 1.7);

  // Pulses: the presence sweeps once across the field. Flow is the max of
  // loading and the single live pulse — never a sum, never stacked envelopes.
  if (activePulse) {
    const f = pulseFlow(activePulse, now);
    if (f > flow) {
      const progress = Math.min(
        1,
        Math.max(0, (now - activePulse.sweepStart) / activePulse.sweepDuration),
      );
      const x = -0.15 + 1.3 * progress;
      presenceX = activePulse.fromLeft ? x : 1 - x;
      presenceY = 0.42 + 0.18 * Math.sin(progress * Math.PI);
      flow = f;
    }
  }

  if (activePulse && flow > 0) {
    shiftX += dt * flow * SHIFT_SPEED * shiftDir;
  }

  return { flow, presenceX, presenceY, shiftX };
}

/**
 * Coarse active/idle signal for UI (background wrapper opacity).
 * Fires only on transitions, never per frame.
 */
export function useBackgroundActivity(): boolean {
  const [active, setActive] = useState(lastActive);

  useEffect(() => {
    activityListeners.add(setActive);
    setActive(lastActive);
    return () => {
      activityListeners.delete(setActive);
    };
  }, []);

  return active;
}
