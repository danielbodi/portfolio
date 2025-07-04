import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './ui/components/navigation/Navigation';
import { Home } from './pages/Home';
import { BridgestoneProject } from './pages/BridgestoneProject';
import { TraisProject } from './pages/TraisProject';
import { PageTransition } from './ui/components/page-transition/PageTransition';
import { Background } from './ui/components/background/Background';
import { GradientControls } from './ui/components/GradientControls';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/projects/bridgestone" element={
          <PageTransition>
            <BridgestoneProject />
          </PageTransition>
        } />
        <Route path="/projects/trasis" element={
          <PageTransition>
            <TraisProject />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
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
        <div className="relative min-h-screen">
          <Background />
          <div className="relative z-10">
            <Navigation />
            <AnimatedRoutes />
          </div>
        </div>
      </GradientControls>
    </Router>
  );
}

export default App;