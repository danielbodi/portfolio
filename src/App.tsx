import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { Navigation } from './ui/components/navigation/Navigation';
import { Home } from './pages/Home';
import { PageTransition } from './ui/components/page-transition/PageTransition';
import { Background } from './ui/components/background/Background';
import { GradientControls } from './ui/components/GradientControls';
import { TableOfContents } from './ui/components/table-of-contents/TableOfContents';
import { beginRouteLoad, endRouteLoad } from './ui/components/page-transition/routeLoading';
import './utils/basicAnalytics';

const WorkIndex = lazy(() => import('./pages/WorkIndex'));
const SolidarisProject = lazy(() =>
  import('./pages/SolidarisProject').then((m) => ({ default: m.SolidarisProject }))
);
const BridgestoneProject = lazy(() =>
  import('./pages/BridgestoneProject').then((m) => ({ default: m.BridgestoneProject }))
);
const TraisProject = lazy(() =>
  import('./pages/TraisProject').then((m) => ({ default: m.TraisProject }))
);
const SopraProject = lazy(() =>
  import('./pages/SopraProject').then((m) => ({ default: m.SopraProject }))
);
const BaseProject = lazy(() =>
  import('./pages/BaseProject').then((m) => ({ default: m.BaseProject }))
);
const Approach = lazy(() => import('./pages/Approach'));
const About = lazy(() => import('./pages/About'));
const StaffProductDesign = lazy(() => import('./pages/StaffProductDesign'));
const DesignEngineering = lazy(() => import('./pages/DesignEngineering'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Legacy /projects/* URLs are indexed and linked externally — keep them working. */
function LegacyProjectRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const target = slug === 'sopra' ? 'sopra-banking' : slug;
  return <Navigate to={`/work/${target ?? ''}`} replace />;
}

function RouteFallback() {
  // Reporting here does two things: the background field carries the loading
  // signal, and PageTransition holds its cover until this unmounts. Visible
  // only outside a transition cover — notably under prefers-reduced-motion,
  // where no cover is drawn.
  useEffect(() => {
    beginRouteLoad();
    return () => endRouteLoad();
  }, []);

  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <span className="text-sm text-gray-500">Loading…</span>
    </div>
  );
}

/**
 * PageTransition wraps the whole route table rather than each element: it has
 * to survive navigations to sequence them. Mounted per route, every navigation
 * would hand a freshly mounted instance its own initial render, which is
 * exempt from the transition.
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <PageTransition>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/work"
          element={
            <Suspense fallback={<RouteFallback />}>
              <WorkIndex />
            </Suspense>
          }
        />
        <Route
          path="/work/solidaris"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SolidarisProject />
            </Suspense>
          }
        />
        <Route
          path="/work/bridgestone"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BridgestoneProject />
            </Suspense>
          }
        />
        <Route
          path="/work/trasis"
          element={
            <Suspense fallback={<RouteFallback />}>
              <TraisProject />
            </Suspense>
          }
        />
        <Route
          path="/work/sopra-banking"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SopraProject />
            </Suspense>
          }
        />
        <Route
          path="/work/base"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BaseProject />
            </Suspense>
          }
        />
        <Route
          path="/approach"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Approach />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<RouteFallback />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/staff-product-design"
          element={
            <Suspense fallback={<RouteFallback />}>
              <StaffProductDesign />
            </Suspense>
          }
        />
        <Route
          path="/design-engineering"
          element={
            <Suspense fallback={<RouteFallback />}>
              <DesignEngineering />
            </Suspense>
          }
        />
        {/* Legacy routes */}
        <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
        <Route path="/projects" element={<Navigate to="/work" replace />} />
        {/* 404 */}
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </PageTransition>
  );
}

/** Matches the page reveal: the shell eases while content is still covered. */
const LAYOUT_MS = 500;
const LAYOUT_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * Outer column width. Pages use different inner max-widths (About 3xl, work
 * 5xl, home 6xl plus padding), and case studies add a TOC column — both
 * used to snap the nav sideways. The shell carries the horizontal gutter
 * (px-4 / md:px-6) so the nav card and the page column are the same width.
 * The TOC slot still grows, but through a transition rather than a jump.
 */
const SHELL_MAX_WIDTH = '75rem';

function AppContent() {
  const location = useLocation();
  const isCasePage = /^\/work\/.+/.test(location.pathname);
  const isHome = location.pathname === '/';
  const [tocVisible, setTocVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const layoutTransition = prefersReducedMotion ? 'none' : `width ${LAYOUT_MS}ms ${LAYOUT_EASE}, margin-left ${LAYOUT_MS}ms ${LAYOUT_EASE}`;

  // Reset and control TOC visibility when route changes
  useEffect(() => {
    if (isCasePage) {
      setTocVisible(false);
      // Wait until the cover has lifted so the TOC fades in with the content,
      // not into an empty column. Cover floor is 550ms.
      const timer = setTimeout(() => {
        setTocVisible(true);
      }, 480);

      return () => clearTimeout(timer);
    } else {
      setTocVisible(false);
    }
  }, [location.pathname, isCasePage]);

  // Deep links into case sections (e.g. /work/bridgestone#system-evidence):
  // wait for the lazy route to mount, then scroll to the anchored heading.
  // Timer-based polling (rAF can pause in background/unfocused tabs).
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    let attempts = 0;
    let timer: number;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        // Instant + manual offset: html has scroll-behavior smooth, which can
        // stall in background tabs, and manual scrolling must clear the
        // sticky navigation (scroll-margin only applies to scrollIntoView).
        const top = el.getBoundingClientRect().top + window.scrollY - 112;
        window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
      } else if (attempts++ < 25) {
        timer = window.setTimeout(tryScroll, 120);
      }
    };
    timer = window.setTimeout(tryScroll, 100);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <div className="relative min-h-screen">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {/* Purple stays an accent: full on the home hero, dimmed on inner pages. */}
      <div
        aria-hidden="true"
        style={{
          opacity: isHome ? 1 : 0.3,
          transition: 'opacity 400ms ease'
        }}
      >
        <Background />
      </div>

      <div className="relative z-10 flex flex-row justify-center">
        <div className="min-w-0 w-full flex-1 px-4 md:px-6 lg:flex-initial" style={{ maxWidth: SHELL_MAX_WIDTH }}>
          <Navigation />
          <main id="main-content" tabIndex={-1}>
            <AnimatedRoutes />
          </main>
        </div>

        {/* Always mounted on desktop so width can ease. Empty while shrinking
            or expanding, so overflow-hidden is not needed (it would break
            position: sticky on the TOC). */}
        <div
          className="hidden flex-none lg:block"
          style={{
            width: isCasePage ? '16rem' : 0,
            marginLeft: isCasePage ? '5rem' : 0,
            transition: layoutTransition
          }}
          aria-hidden={!isCasePage}
        >
          {isCasePage && (
            <TableOfContents variant="desktop" pathname={location.pathname} isVisible={tocVisible} />
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const defaultSettings = {
    baseAngle: 45,
    intensityMultiplier: 1.2,
    throttleMs: 20,
    performanceMode: false,
    disableAnimation: false
  };

  return (
    <Router>
      <GradientControls initialSettings={defaultSettings}>
        <AppContent />
      </GradientControls>
    </Router>
  );
}

export default App;
