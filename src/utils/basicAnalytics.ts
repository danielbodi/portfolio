/**
 * Basic Analytics - Fallback for when external analytics are blocked
 * Provides essential user behavior tracking using browser APIs
 */

export interface AnalyticsEvent {
  type: string;
  data?: Record<string, any>;
  timestamp: number;
  url: string;
  userAgent: string;
  sessionId: string;
}

export class BasicAnalytics {
  private sessionId: string;
  private events: AnalyticsEvent[] = [];
  private startTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking(): void {
    // Track page load
    this.trackEvent('page_load', {
      referrer: document.referrer,
      screen: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    });

    // Track clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      this.trackEvent('click', {
        element: target.tagName.toLowerCase(),
        className: target.className,
        id: target.id,
        text: target.textContent?.slice(0, 100),
        x: e.clientX,
        y: e.clientY,
      });
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', this.throttle(() => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.trackEvent('scroll_depth', { percent: scrollPercent });
      }
    }, 1000));

    // Track time on page
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - this.startTime;
      this.trackEvent('session_end', { 
        duration: timeOnPage,
        maxScroll: maxScroll 
      });
      this.sendEvents();
    });

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('visibility_change', {
        hidden: document.hidden,
        timestamp: Date.now()
      });
    });
  }

  private throttle(func: Function, delay: number) {
    let timeoutId: number | null = null;
    return (...args: any[]) => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          func(...args);
          timeoutId = null;
        }, delay);
      }
    };
  }

  public trackEvent(type: string, data?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      type,
      data,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      sessionId: this.sessionId,
    };

    this.events.push(event);

    // Auto-send events periodically
    if (this.events.length >= 10) {
      this.sendEvents();
    }
  }

  public trackPortfolioEvent(
    eventType:
      | 'project_view'
      | 'case_study_opened'
      | 'role_path_selected'
      | 'contact_click'
      | 'cv_download'
      | 'external_link'
      | 'skill_interact',
    data?: Record<string, any>
  ): void {
    this.trackEvent(`portfolio_${eventType}`, data);
  }

  private async sendEvents(): Promise<void> {
    if (this.events.length === 0) return;

    // Store in localStorage as backup
    this.storeLocally();

    // Try to send to your own endpoint (you can implement this later)
    try {
      // Example: send to your own analytics endpoint
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(this.events)
      // });
      
      if (import.meta.env.DEV) {
        console.log('Analytics events captured:', this.events);
      }
      this.events = []; // Clear sent events
    } catch (error) {
      console.warn('Failed to send analytics:', error);
    }
  }

  private storeLocally(): void {
    try {
      const existingData = localStorage.getItem('portfolio_analytics') || '[]';
      const allEvents = [...JSON.parse(existingData), ...this.events];
      
      // Keep only last 1000 events to prevent storage overflow
      const recentEvents = allEvents.slice(-1000);
      localStorage.setItem('portfolio_analytics', JSON.stringify(recentEvents));
    } catch (error) {
      console.warn('Failed to store analytics locally:', error);
    }
  }

  public getStoredEvents(): AnalyticsEvent[] {
    try {
      const stored = localStorage.getItem('portfolio_analytics');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public clearStoredEvents(): void {
    localStorage.removeItem('portfolio_analytics');
  }

  // Get basic stats for debugging
  public getStats(): {
    sessionId: string;
    eventsCount: number;
    timeOnSite: number;
    storedEventsCount: number;
  } {
    return {
      sessionId: this.sessionId,
      eventsCount: this.events.length,
      timeOnSite: Date.now() - this.startTime,
      storedEventsCount: this.getStoredEvents().length,
    };
  }
}

// Create global instance
export const analytics = new BasicAnalytics();