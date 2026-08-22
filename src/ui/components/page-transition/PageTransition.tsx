import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { beginLoading, endLoading, pulse } from '../background/backgroundMotion';
import { isRouteLoading } from './routeLoading';

interface PageTransitionProps {
  children: React.ReactNode;
}

/** Floor on the cover: outgoing fade, then content may enter while the field is still settling. */
const TRANSIT_MIN_MS = 420;
/** Ceiling, so a chunk that never resolves cannot leave the cover up forever. */
const TRANSIT_MAX_MS = 6000;
/**
 * Presence sweep through the background. Longer than the cover so the
 * field keeps settling after the content has already landed.
 */
const PULSE_MS = 2000;
const EXIT_MS = 0.4;
const ENTER_MS = 0.4;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Phase = 'idle' | 'transit' | 'reveal';

/**
 * Menu order: logo / Home → Work → (a case, under Work) → Approach → About.
 * Earlier is back (left); later, or any off-menu link, is forward (right).
 */
function menuRank(path: string): number | null {
  if (path === '/') return 0;
  if (path === '/work') return 1;
  if (/^\/work\/[^/]+/.test(path)) return 2;
  if (path === '/approach') return 3;
  if (path === '/about') return 4;
  return null;
}

function shiftDirection(from: string, to: string): 1 | -1 {
  const fromRank = menuRank(from);
  const toRank = menuRank(to);
  if (fromRank !== null && toRank !== null && toRank !== fromRank) {
    return toRank < fromRank ? -1 : 1;
  }
  return 1;
}

/**
 * Sequenced route transition: outgoing page dissolves into the field,
 * then the incoming page eases in while the field is still settling.
 *
 * The incoming route still mounts (hidden) during the cover so its lazy
 * chunk starts fetching immediately. Initial load is exempt.
 *
 * Never AnimatePresence `mode="wait"` around the route tree — that left the
 * old page mounted under a changed URL in Chromium.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');
  // Held in state rather than a ref. A ref mutated during render is not
  // idempotent under StrictMode's double invoke.
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [outgoing, setOutgoing] = useState<React.ReactNode>(null);
  const displayedRef = useRef(children);
  const shiftDirRef = useRef<1 | -1>(1);

  if (prevPath !== location.pathname) {
    shiftDirRef.current = shiftDirection(prevPath, location.pathname);
    setPrevPath(location.pathname);
    if (!prefersReducedMotion) {
      setOutgoing(displayedRef.current);
      setPhase('transit');
    }
  }

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (phase !== 'transit') {
      displayedRef.current = children;
      setOutgoing(null);
    }
  }, [phase, children]);

  useEffect(() => {
    if (phase !== 'transit') return;
    beginLoading();
    pulse(PULSE_MS, 'replace', shiftDirRef.current);
    return () => {
      endLoading();
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'transit') return;

    const startedAt = performance.now();
    let timer: number | undefined;
    let settled = false;

    pulse(PULSE_MS, 'extend');

    const release = () => {
      if (settled) return;
      settled = true;
      setPhase('reveal');
    };

    const tick = () => {
      const waited = performance.now() - startedAt;
      if (waited >= TRANSIT_MAX_MS) {
        release();
        return;
      }
      if (isRouteLoading() || waited < TRANSIT_MIN_MS) {
        timer = window.setTimeout(tick, Math.max(60, TRANSIT_MIN_MS - waited));
        return;
      }
      release();
    };

    tick();

    return () => {
      settled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [phase, location.pathname]);

  if (prefersReducedMotion) {
    return <div className="relative">{children}</div>;
  }

  const covered = phase === 'transit';

  return (
    <div className="relative min-h-[50vh]">
      {covered && (
        <span role="status" aria-live="polite" className="sr-only">
          Loading page
        </span>
      )}

      {covered && outgoing && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: EXIT_MS, ease: EASE }}
        >
          {outgoing}
        </motion.div>
      )}

      <motion.div
        key={location.pathname}
        aria-hidden={covered || undefined}
        className={covered ? 'pointer-events-none absolute inset-x-0 top-0' : undefined}
        initial={{ opacity: 0, y: 16 }}
        animate={covered ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
        transition={covered ? { duration: 0 } : { duration: ENTER_MS, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}
