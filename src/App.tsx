import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { Navigation } from './ui/components/navigation/Navigation';
import { Home } from './pages/Home';
import { PageTransition } from './ui/components/page-transition/PageTransition';
import { Background } from './ui/components/background/Background';
import { GradientControls } from './ui/components/GradientControls';
import { TableOfContents } from './ui/components/table-of-contents/TableOfContents';
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
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <span className="text-sm text-gray-500">Loading…</span>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/work"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <WorkIndex />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/work/solidaris"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <SolidarisProject />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/work/bridgestone"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <BridgestoneProject />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/work/trasis"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <TraisProject />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/work/sopra-banking"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <SopraProject />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/work/base"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <BaseProject />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/approach"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <Approach />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <About />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/staff-product-design"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <StaffProductDesign />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/design-engineering"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <DesignEngineering />
              </Suspense>
            </PageTransition>
          }
        />
        {/* Legacy routes */}
        <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
        <Route path="/projects" element={<Navigate to="/work" replace />} />
        {/* 404 */}
        <Route
          path="*"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <NotFound />
              </Suspense>
            </PageTransition>
          }
        />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const isCasePage = /^\/work\/.+/.test(location.pathname);
  const isHome = location.pathname === '/';
  const [tocVisible, setTocVisible] = useState(false);

  // Reset and control TOC visibility when route changes
  useEffect(() => {
    if (isCasePage) {
      setTocVisible(false);
      // Show TOC after page transition starts
      const timer = setTimeout(() => {
        setTocVisible(true);
      }, 100); // Small delay to ensure clean transition

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
      {/* Purple stays an accent: full presence on the home hero, dimmed to
          neutral space on content and case pages (brief section 12). */}
      <div aria-hidden="true" className={isHome ? undefined : 'opacity-30'}>
        <Background />
      </div>

      <div className="relative z-10 flex flex-row justify-center gap-[5rem]">
        <div className="min-w-0 flex-1 lg:flex-initial">
          <Navigation />
          <main id="main-content" tabIndex={-1}>
            <AnimatedRoutes />
          </main>
        </div>

        {/* Desktop Table of Contents - Only show on case-study pages */}
        {isCasePage && (
          <div className="hidden lg:block">
            <TableOfContents variant="desktop" pathname={location.pathname} isVisible={tocVisible} />
          </div>
        )}
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
