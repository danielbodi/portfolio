import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Lightweight route transition: scroll restoration plus a fast fade-in.
 *
 * The previous full-screen SVG "curtain" (AnimatePresence mode="wait" with an
 * infinite pulse animation inside the exiting tree) prevented route exits from
 * ever completing in Chromium — the URL changed while the old page stayed
 * mounted (reproduced on the production site). It also blocked every
 * navigation for ~1.4s, which the transformation brief explicitly forbids
 * ("no decorative animation that slows access to the work", brief section 12).
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Keep anchored deep links intact; App handles hash scrolling.
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  if (prefersReducedMotion) {
    return <div className="relative">{children}</div>;
  }

  return (
    <motion.div
      key={location.pathname}
      className="relative"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
}
