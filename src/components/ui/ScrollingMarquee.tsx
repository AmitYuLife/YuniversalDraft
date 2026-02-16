"use client";

import { ReactNode } from "react";

interface ScrollingMarqueeProps {
  direction?: "left" | "right";
  duration?: number;
  gap?: number;
  children: ReactNode;
  className?: string;
}

export function ScrollingMarquee({
  direction = "left",
  duration = 30,
  gap = 64,
  children,
  className = "",
}: ScrollingMarqueeProps) {
  const animationDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      {/* Purple gradient overlays */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40"
        style={{
          background: "linear-gradient(to right, rgb(41, 1, 99), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40"
        style={{
          background: "linear-gradient(to left, rgb(41, 1, 99), transparent)",
        }}
      />

      {/* Animated content */}
      <div
        className="flex min-w-full shrink-0 animate-marquee items-center"
        style={{
          gap: `${gap}px`,
          animationDuration: `${duration}s`,
          animationDirection,
          paddingRight: `${gap}px`,
        }}
      >
        {children}
      </div>

      {/* Duplicate set for seamless loop */}
      <div
        className="flex min-w-full shrink-0 animate-marquee items-center"
        style={{
          gap: `${gap}px`,
          animationDuration: `${duration}s`,
          animationDirection,
          paddingRight: `${gap}px`,
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
