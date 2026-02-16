"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, ScrollToPlugin } from "@/lib/gsap";

/**
 * Initializes GSAP plugins for scroll-based animations.
 * Place this component in your root layout.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      markers: false, // Set to true for debugging
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
