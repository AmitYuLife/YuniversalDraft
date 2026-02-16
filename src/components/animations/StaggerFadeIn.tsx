"use client";

import { type ReactNode } from "react";
import { useGSAP } from "@/lib/gsap/useGSAP";
import { gsap } from "@/lib/gsap";

interface StaggerFadeInProps {
  children: ReactNode;
  /** Stagger delay between items (seconds) */
  stagger?: number;
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
 * Wrapper component that staggers fade-in animation across child elements.
 * Children should have a common selector (like a class) for targeting.
 *
 * Usage:
 * ```tsx
 * <StaggerFadeIn scrollTrigger className="card-grid">
 *   <Card className="card-item">...</Card>
 *   <Card className="card-item">...</Card>
 *   <Card className="card-item">...</Card>
 * </StaggerFadeIn>
 * ```
 */
export function StaggerFadeIn({
  children,
  stagger = 0.1,
  duration = 0.8,
  y = 30,
  scrollTrigger = false,
  className,
}: StaggerFadeInProps) {
  const containerRef = useGSAP(() => {
    const element = containerRef.current;
    if (!element) return;

    // Target all direct children
    const items = element.children;

    // Animate TO the final visible state (CSS handles initial hidden state)
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
      scrollTrigger: scrollTrigger
        ? {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        : undefined,
    });
  }, [stagger, duration, y, scrollTrigger]);

  return (
    <div ref={containerRef} className={`gsap-stagger-initial ${className || ""}`}>
      {children}
    </div>
  );
}
