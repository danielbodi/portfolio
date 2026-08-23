import {
  type CSSProperties,
  useEffect,
  useRef
} from 'react';

const FIRST_CLAUSE = 'I set direction for complex product ecosystems—';
const SECOND_CLAUSE = 'and build the systems teams use to ship them.';
const HEADLINE_TEXT = FIRST_CLAUSE + '\n' + SECOND_CLAUSE;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

type CustomProperties = CSSProperties & Record<string, string | number>;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function renderClause(text: string, clause: 0 | 1) {
  let characterOffset = 0;

  return text.split(/(\s+)/).map((token, tokenIndex) => {
    const tokenStart = characterOffset;
    characterOffset += token.length;

    if (/^\s+$/.test(token)) return token;

    return (
      <span
        key={clause + '-' + tokenIndex + '-' + token}
        className="interactive-headline__word"
      >
        {Array.from(token).map((character, characterIndex) => {
          const letterIndex = tokenStart + characterIndex;
          const style = {
            '--letter-x': '0px',
            '--letter-y': '0px',
            '--letter-z': '0px',
            '--letter-glow': 0
          } as CustomProperties;

          return (
            <span
              key={clause + '-' + letterIndex + '-' + character}
              className="interactive-headline__letter"
              data-clause={clause}
              style={style}
            >
              {character}
            </span>
          );
        })}
      </span>
    );
  });
}

export function InteractiveHeadline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const heading = headingRef.current;
    if (!root || !heading) return;

    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    if (!finePointer.matches || navigator.maxTouchPoints > 0) return;

    const letters = Array.from(
      heading.querySelectorAll<HTMLElement>('.interactive-headline__letter')
    );
    if (letters.length === 0) return;

    let animationFrame: number | null = null;
    let isPointerInside = false;
    let isIntersecting = true;
    let pageIsVisible = document.visibilityState === 'visible';
    let bounds: DOMRect | null = null;
    let letterBounds: DOMRect[] = [];
    const pointer = { x: 0, y: 0 };
    const headlineCurrent = { x: 0, y: 0 };
    const headlineTarget = { x: 0, y: 0 };
    const letterMotion = letters.map(() => ({
      x: 0,
      y: 0,
      z: 0,
      glow: 0,
      targetX: 0,
      targetY: 0,
      targetZ: 0,
      targetGlow: 0
    }));

    const measure = () => {
      bounds = heading.getBoundingClientRect();
      letterBounds = letters.map((letter) => letter.getBoundingClientRect());
    };

    const setTargets = () => {
      if (!bounds || !isPointerInside) {
        headlineTarget.x = 0;
        headlineTarget.y = 0;
        letterMotion.forEach((motion) => {
          motion.targetX = 0;
          motion.targetY = 0;
          motion.targetZ = 0;
          motion.targetGlow = 0;
        });
        return;
      }

      const normalizedX = clamp(
        (pointer.x - bounds.left) / bounds.width - 0.5,
        -0.5,
        0.5
      );
      const normalizedY = clamp(
        (pointer.y - bounds.top) / bounds.height - 0.5,
        -0.5,
        0.5
      );
      headlineTarget.x = normalizedX * 9;
      headlineTarget.y = normalizedY * 6;

      letterBounds.forEach((rect, index) => {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = centerX - pointer.x;
        const deltaY = centerY - pointer.y;
        const distance = Math.hypot(deltaX, deltaY);
        const influence = Math.pow(clamp(1 - distance / 170, 0, 1), 2);
        const directionX = distance > 0 ? deltaX / distance : 0;
        const directionY = distance > 0 ? deltaY / distance : 0;
        const accentStrength = letters[index].dataset.clause === '1' ? 1.2 : 1;
        const motion = letterMotion[index];

        motion.targetX = directionX * influence * 2.6 * accentStrength;
        motion.targetY = directionY * influence * 2 * accentStrength;
        motion.targetZ = influence * 8 * accentStrength;
        motion.targetGlow = influence * accentStrength;
      });
    };

    const isActive = () => pageIsVisible && isIntersecting;

    const animate = () => {
      animationFrame = null;
      if (!isActive()) return;
      if (isPointerInside && !bounds) measure();

      setTargets();
      headlineCurrent.x += (headlineTarget.x - headlineCurrent.x) * 0.1;
      headlineCurrent.y += (headlineTarget.y - headlineCurrent.y) * 0.1;
      root.style.setProperty(
        '--headline-x',
        headlineCurrent.x.toFixed(3) + 'px'
      );
      root.style.setProperty(
        '--headline-y',
        headlineCurrent.y.toFixed(3) + 'px'
      );

      let stillMoving = false;
      letterMotion.forEach((motion, index) => {
        motion.x += (motion.targetX - motion.x) * 0.16;
        motion.y += (motion.targetY - motion.y) * 0.16;
        motion.z += (motion.targetZ - motion.z) * 0.14;
        motion.glow += (motion.targetGlow - motion.glow) * 0.13;

        letters[index].style.setProperty(
          '--letter-x',
          motion.x.toFixed(3) + 'px'
        );
        letters[index].style.setProperty(
          '--letter-y',
          motion.y.toFixed(3) + 'px'
        );
        letters[index].style.setProperty(
          '--letter-z',
          motion.z.toFixed(3) + 'px'
        );
        letters[index].style.setProperty(
          '--letter-glow',
          motion.glow.toFixed(3)
        );

        stillMoving = stillMoving ||
          Math.abs(motion.x) > 0.02 ||
          Math.abs(motion.y) > 0.02 ||
          Math.abs(motion.z) > 0.02 ||
          motion.glow > 0.01;
      });

      stillMoving = stillMoving ||
        Math.abs(headlineCurrent.x) > 0.02 ||
        Math.abs(headlineCurrent.y) > 0.02;

      if (stillMoving) animationFrame = requestAnimationFrame(animate);
    };

    const scheduleAnimation = () => {
      if (animationFrame === null && isActive()) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const handlePointerEnter = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType !== 'mouse') return;
      isPointerInside = true;
      root.dataset.pointer = 'active';
      measure();
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      scheduleAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (
        reducedMotion.matches ||
        event.pointerType !== 'mouse' ||
        !isPointerInside
      ) return;

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      scheduleAnimation();
    };

    const handlePointerLeave = () => {
      isPointerInside = false;
      root.dataset.pointer = 'idle';
      setTargets();
      scheduleAnimation();
    };

    const invalidateMeasurements = () => {
      bounds = null;
      letterBounds = [];
      if (isPointerInside) scheduleAnimation();
    };

    const handleVisibilityChange = () => {
      pageIsVisible = document.visibilityState === 'visible';
      if (pageIsVisible) scheduleAnimation();
    };

    const handleReducedMotionChange = () => {
      if (reducedMotion.matches) handlePointerLeave();
    };

    const intersectionObserver = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        isIntersecting = entry?.isIntersecting ?? true;
        if (isIntersecting) scheduleAnimation();
      }, { threshold: 0.01 });
    intersectionObserver?.observe(root);

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(invalidateMeasurements);
    resizeObserver?.observe(heading);

    root.addEventListener('pointerenter', handlePointerEnter);
    root.addEventListener('pointermove', handlePointerMove);
    root.addEventListener('pointerleave', handlePointerLeave);
    root.addEventListener('pointercancel', handlePointerLeave);
    window.addEventListener('scroll', invalidateMeasurements, {
      capture: true,
      passive: true
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    reducedMotion.addEventListener('change', handleReducedMotionChange);

    return () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      root.removeEventListener('pointerenter', handlePointerEnter);
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerleave', handlePointerLeave);
      root.removeEventListener('pointercancel', handlePointerLeave);
      window.removeEventListener('scroll', invalidateMeasurements, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotion.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="interactive-headline"
      data-pointer="idle"
    >
      <h1
        ref={headingRef}
        id="hero-heading"
        className="home-hero__title interactive-headline__title"
        aria-label={HEADLINE_TEXT}
      >
        <span
          className="interactive-headline__clause interactive-headline__clause--neutral"
          aria-hidden="true"
        >
          {renderClause(FIRST_CLAUSE, 0)}
        </span>
        <br className="interactive-headline__break" aria-hidden="true" />
        {' '}
        <span
          className="interactive-headline__clause interactive-headline__clause--accent"
          aria-hidden="true"
        >
          {renderClause(SECOND_CLAUSE, 1)}
        </span>
      </h1>
    </div>
  );
}
