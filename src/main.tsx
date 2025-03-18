import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './ui/styles/main.scss';

// Ensure the DOM is ready before mounting
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    // Create a portal container for controls
    const portalContainer = document.createElement('div');
    portalContainer.id = 'gradient-controls-portal';
    document.body.appendChild(portalContainer);
    
    // Render the app
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
});
