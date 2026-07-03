import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useHorizontalDragScroll
 * Adds horizontal drag-to-scroll behavior with an optional idle hint animation
 * that plays once when the container is ≥ threshold visible and scrollable.
 */
export function useHorizontalDragScroll({
  idleHintDelayMs = 1500,
  viewportThreshold = 0.8,
} = {}) {
  const scrollerRef = useRef(null);
  const innerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hintedRef = useRef(false);
  const idleTimerRef = useRef(null);
  const inViewRef = useRef(false);

  const cancelIdle = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const onMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return; // left-click only
      const el = scrollerRef.current;
      if (!el) return;
      setIsDragging(true);
      startXRef.current = e.pageX - el.offsetLeft;
      scrollLeftRef.current = el.scrollLeft;
      hintedRef.current = true; // once user interacts, never show hint again
      setShowHint(false);
      cancelIdle();
    },
    [cancelIdle],
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      if (e.buttons !== 1) {
        setIsDragging(false);
        return;
      }
      e.preventDefault();
      const el = scrollerRef.current;
      if (!el) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startXRef.current) * 2;
      el.scrollLeft = scrollLeftRef.current - walk;
    },
    [isDragging],
  );

  const onMouseUp = useCallback(() => setIsDragging(false), []);
  const onMouseLeave = useCallback(() => setIsDragging(false), []);

  const onScroll = useCallback(() => {
    // any scroll cancels hint and future idle timer
    if (showHint) setShowHint(false);
    cancelIdle();
    hintedRef.current = true;
  }, [cancelIdle, showHint]);

  // Prevent native drag (images/links) from hijacking horizontal scroll
  const onDragStart = useCallback((e) => {
    // If dragging inside the scroller, prevent default image/link drag
    if (scrollerRef.current && scrollerRef.current.contains(e.target)) {
      e.preventDefault();
    }
  }, []);

  // global mouseup safety
  useEffect(() => {
    const handler = () => setIsDragging(false);
    window.addEventListener("mouseup", handler);
    return () => window.removeEventListener("mouseup", handler);
  }, []);

  // viewport observer for idle hint
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current =
          entry.isIntersecting && entry.intersectionRatio >= viewportThreshold;
        if (inViewRef.current && !hintedRef.current && !idleTimerRef.current) {
          const isScrollable = el.scrollWidth > el.clientWidth + 8;
          if (isScrollable) {
            idleTimerRef.current = setTimeout(() => {
              if (inViewRef.current && !hintedRef.current) setShowHint(true);
              idleTimerRef.current = null;
            }, idleHintDelayMs);
          }
        } else if (!inViewRef.current) {
          cancelIdle();
          setShowHint(false);
        }
      },
      { threshold: [viewportThreshold, 1] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelIdle();
    };
  }, [cancelIdle, idleHintDelayMs, viewportThreshold]);

  // stop hint after animation completes
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const onEnd = () => {
      hintedRef.current = true;
      setShowHint(false);
    };
    inner.addEventListener("animationend", onEnd);
    return () => inner.removeEventListener("animationend", onEnd);
  }, []);

  return {
    scrollerRef,
    innerRef,
    isDragging,
    showHint,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onScroll,
    onDragStart,
  };
}
