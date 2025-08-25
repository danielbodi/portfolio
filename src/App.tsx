import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './ui/components/navigation/Navigation';
import { Home } from './pages/Home';
import { BridgestoneProject } from './pages/BridgestoneProject';
import { TraisProject } from './pages/TraisProject';
import { SopraProject } from './pages/SopraProject';
import { BaseProject } from './pages/BaseProject';
import { PageTransition } from './ui/components/page-transition/PageTransition';
import { Background } from './ui/components/background/Background';
import { GradientControls } from './ui/components/GradientControls';
import { TableOfContents } from './ui/components/table-of-contents/TableOfContents';
import { initializeClarity } from './utils/clarity';

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
        <Route path="/projects/sopra" element={
          <PageTransition>
            <SopraProject />
          </PageTransition>
        } />
        <Route path="/projects/base" element={
          <PageTransition>
            <BaseProject />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith('/projects/');
  const [tocVisible, setTocVisible] = useState(false);

  // Initialize Microsoft Clarity on app load
  useEffect(() => {
    // Delay initialization to ensure Clarity script has loaded
    const timer = setTimeout(() => {
      initializeClarity();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Reset and control TOC visibility when route changes
  useEffect(() => {
    if (isProjectPage) {
      setTocVisible(false);
      // Show TOC after page transition starts
      const timer = setTimeout(() => {
        setTocVisible(true);
      }, 100); // Small delay to ensure clean transition
      
      return () => clearTimeout(timer);
    } else {
      setTocVisible(false);
    }
  }, [location.pathname, isProjectPage]);

  return (
    <div className="relative min-h-screen">
      <Background />
      
      
      <div className="relative z-10 flex flex-row justify-center gap-[5rem]">
        <div>
          <Navigation />
          <AnimatedRoutes />
        </div>
          
          {/* Desktop Table of Contents - Only show on project pages */}
          {isProjectPage && (
            <div className="hidden lg:block">
              <TableOfContents 
                variant="desktop" 
                pathname={location.pathname} 
                isVisible={tocVisible}
              />
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