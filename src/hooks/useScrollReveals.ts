import { useEffect, type RefObject } from 'react';

const TARGETS = '[data-scroll-reveal], [data-scroll-reveal-children] > *';

/** Progressive enhancement: content is visible even before observers run.
 * Re-arm only after a full exit plus a 64px buffer, never while reading.
 * One observer pair serves the page, including subsequently loaded routes.
 */
export function useScrollReveals(rootRef: RefObject<HTMLElement>, pathname: string) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (preference.matches) return;

      const states = new Map<HTMLElement, { armed: boolean; direction: number; animation?: Animation }>();
      const distance = pathname === '/' ? 44 : 32;
      const duration = pathname === '/' ? 800 : 700;

      const entryObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          const state = states.get(element);
          if (!entry.isIntersecting || !state?.armed) continue;
          state.armed = false;
          if (element.contains(document.activeElement) || element.closest('[aria-hidden="true"]')) continue;
          state.animation?.cancel();
          const animation = element.animate(
            [
              { opacity: 0.12, translate: `0 ${state.direction * distance}px` },
              { opacity: 1, translate: '0 0' }
            ],
            { duration, easing: 'cubic-bezier(0.2, 0.65, 0.3, 1)' }
          );
          state.animation = animation;
          animation.onfinish = () => {
            animation.cancel();
            if (state.animation === animation) state.animation = undefined;
          };
        }
      // Let the content cross the edge before its entrance, so the movement
      // happens in view rather than finishing behind the viewport boundary.
      }, { rootMargin: '-56px 0px', threshold: 0 });

      const exitObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const state = states.get(entry.target as HTMLElement);
          if (!state || entry.isIntersecting) continue;
          state.animation?.cancel();
          state.animation = undefined;
          state.armed = true;
          state.direction = entry.boundingClientRect.bottom < 0 ? -1 : 1;
        }
      }, { rootMargin: '64px 0px', threshold: 0 });

      const discover = () => {
        for (const [element, state] of states) {
          if (root.contains(element)) continue;
          state.animation?.cancel();
          entryObserver.unobserve(element);
          exitObserver.unobserve(element);
          states.delete(element);
        }
        root.querySelectorAll<HTMLElement>(TARGETS).forEach((element) => {
          // Avoid combining a parent entrance with another on its children.
          if (states.has(element) || element.parentElement?.closest(TARGETS)) return;
          const rect = element.getBoundingClientRect();
          states.set(element, {
            armed: rect.top >= window.innerHeight || rect.bottom <= 0,
            direction: rect.bottom <= 0 ? -1 : 1
          });
          exitObserver.observe(element);
          entryObserver.observe(element);
        });
      };

      const onFocus = (event: FocusEvent) => {
        for (const [element, state] of states) {
          if (event.target instanceof Node && element.contains(event.target)) {
            state.animation?.cancel();
            state.animation = undefined;
            state.armed = false;
          }
        }
      };

      discover();
      const mutations = new MutationObserver(discover);
      mutations.observe(root, { childList: true, subtree: true });
      root.addEventListener('focusin', onFocus);
      dispose = () => {
        mutations.disconnect();
        entryObserver.disconnect();
        exitObserver.disconnect();
        root.removeEventListener('focusin', onFocus);
        states.forEach((state) => state.animation?.cancel());
        states.clear();
      };
    };

    setup();
    preference.addEventListener('change', setup);
    return () => {
      dispose();
      preference.removeEventListener('change', setup);
    };
  }, [rootRef, pathname]);
}
