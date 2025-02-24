import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { BridgestoneProject } from './pages/BridgestoneProject';
import { PageTransition } from './components/PageTransition';
import { Background } from './components/Background';

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
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Background />
        <div className="relative z-10">
          <Navigation />
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;