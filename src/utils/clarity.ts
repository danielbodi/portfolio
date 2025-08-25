/**
 * Microsoft Clarity Analytics Utilities
 * Helper functions for managing Clarity tracking and configuration
 */

// Define Clarity global interface
declare global {
  interface Window {
    clarity: (action: string, ...args: any[]) => void;
  }
}

/**
 * Check if Microsoft Clarity is loaded and available
 */
export const isClarityLoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.clarity === 'function';
};

/**
 * Set a custom user ID for tracking across sessions
 * Useful for identifying returning users
 */
export const setClarityUserId = (userId: string): void => {
  if (isClarityLoaded()) {
    window.clarity('identify', userId);
  }
};

/**
 * Set custom tags for session categorization
 * Example: tag sessions by page type, user type, etc.
 */
export const setClarityTag = (key: string, value: string): void => {
  if (isClarityLoaded()) {
    window.clarity('set', key, value);
  }
};

/**
 * Track custom events for specific interactions
 * Example: track when users interact with specific components
 */
export const trackClarityEvent = (eventName: string, data?: Record<string, any>): void => {
  if (isClarityLoaded()) {
    window.clarity('event', eventName, data);
  }
};

/**
 * Mask sensitive elements from Clarity recordings
 * This should be called after DOM elements are rendered
 */
export const maskSensitiveElements = (): void => {
  if (typeof document !== 'undefined') {
    // Add clarity-mask class to elements you want to hide from recordings
    const sensitiveSelectors = [
      '[data-sensitive]',
      '.contact-info',
      '.email-address',
      '.phone-number'
    ];

    sensitiveSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.classList.add('clarity-mask');
      });
    });
  }
};

/**
 * Initialize Clarity configuration for your portfolio
 * Call this after your app has loaded
 */
export const initializeClarity = (): void => {
  if (isClarityLoaded()) {
    // Set up basic tags for your portfolio
    setClarityTag('site_type', 'portfolio');
    setClarityTag('site_owner', 'daniel_bodi_gil');
    
    // Mask any sensitive elements
    maskSensitiveElements();
    
    console.log('Microsoft Clarity initialized successfully');
  } else {
    console.warn('Microsoft Clarity not loaded yet');
  }
};

/**
 * Track portfolio-specific events
 */
export const trackPortfolioEvent = (eventType: 'project_view' | 'contact_click' | 'cv_download' | 'skill_interact', data?: Record<string, any>): void => {
  trackClarityEvent(`portfolio_${eventType}`, data);
};