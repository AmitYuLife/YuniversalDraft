"use client";

import { type ReactNode } from "react";
import { useGSAP } from "@/lib/gsap/useGSAP";
import { gsap } from "@/lib/gsap";

interface FadeInProps {
  children: ReactNode;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation duration (seconds) */
  duration?: number;
  /** Distance to translate from (pixels) */
  y?: number;
  /** Enable scroll-triggered animation */
  scrollTrigger?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Wrapper component that fades in its children on mount or scroll.
 *
 * Usage:
 * ```tsx
 * <FadeIn scrollTrigger>
 *   <Text variant="heading-lg">This fades in on scroll</Text>
 * </FadeIn>
 * ```
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  y = 30,
  scrollTrigger = false,
  className,
}: FadeInProps) {
  const containerRef = useGSAP(() => {
    const element = containerRef.current;
    if (!element) return;

    // Animate TO the final visible state (CSS handles initial hidden state)
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: scrollTrigger
        ? {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        : undefined,
    });
  }, [delay, duration, y, scrollTrigger]);

  return (
    <div
      ref={containerRef}
      className={`gsap-fade-in-initial ${className || ""}`}
      data-y={y}
    >
      {children}
    </div>
  );
}
