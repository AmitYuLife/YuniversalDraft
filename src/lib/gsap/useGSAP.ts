"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./";

/**
 * React hook for GSAP animations with automatic cleanup.
 *
 * Usage:
 * ```tsx
 * const containerRef = useGSAP(() => {
 *   gsap.from(".fade-in", { opacity: 0, y: 20, stagger: 0.1 });
 * });
 *
 * return <div ref={containerRef}>...</div>;
 * ```
 */
export function useGSAP(
  callback: () => void,
  dependencies: unknown[] = []
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(callback, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return ref;
}
