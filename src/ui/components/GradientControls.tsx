import React, { useEffect, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { GradientControlPanel, GradientSettings } from './GradientControlPanel';
import { GradientSettingsProvider, useGradientSettings } from '../../context/GradientSettingsContext';
import './GradientControlPanel.css';

interface GradientControlsProps {
  children: React.ReactNode;
  initialSettings?: Partial<GradientSettings>;
  onSettingsChange?: (settings: GradientSettings) => void;
}

// Error boundary component to catch any errors
class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error in gradient controls:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main component
export function GradientControls({ 
  children, 
  initialSettings = {}, 
  onSettingsChange 
}: GradientControlsProps) {
  // Create a div for the portal if it doesn't exist
  useEffect(() => {
    let portalContainer = document.getElementById('gradient-controls-portal');
    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = 'gradient-controls-portal';
      document.body.appendChild(portalContainer);
    }
    
    return () => {
      // Clean up only if we created it
      const container = document.getElementById('gradient-controls-portal');
      if (container && container.childNodes.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // Return the component with portal for controls
  return (
    <ErrorBoundary fallback={children}>
      <GradientSettingsProvider initialSettings={initialSettings}>
        {children}
        <GradientControlsInner onSettingsChange={onSettingsChange} />
      </GradientSettingsProvider>
    </ErrorBoundary>
  );
}

// Separate out the inner component that uses the context
const GradientControlsInner: React.FC<{onSettingsChange?: (settings: GradientSettings) => void}> = ({ onSettingsChange }) => {
  const { settings, updateSettings } = useGradientSettings();
  
  // Handle settings change and forward to parent if needed
  const handleSettingsChange = useMemo(() => {
    return (newSettings: GradientSettings) => {
      if (onSettingsChange) {
        onSettingsChange(newSettings);
      }
    };
  }, [onSettingsChange]);
  
  // Force the control panel to be visible
  useEffect(() => {
    const ensureVisibility = () => {
      const controlPanel = document.querySelector('.c-gradient-control-panel');
      if (controlPanel) {
        (controlPanel as HTMLElement).style.visibility = 'visible';
        (controlPanel as HTMLElement).style.opacity = '1';
        (controlPanel as HTMLElement).style.zIndex = '9999';
      }
    };
    
    ensureVisibility();
    const timeoutId = setTimeout(ensureVisibility, 500);
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Render the control panel in a portal
  return ReactDOM.createPortal(
    <GradientControlPanel 
      onSettingsChange={handleSettingsChange} 
      initialSettings={settings}
    />,
    document.getElementById('gradient-controls-portal') || document.body
  );
} 