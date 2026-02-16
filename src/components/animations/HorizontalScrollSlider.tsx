"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SliderCard } from "@/components/ui";

interface Card {
  title: string;
  description: string;
}

export interface HorizontalScrollSliderProps {
  /** Array of cards to display */
  cards: readonly Card[];
  /** Gap between cards in pixels (default: 80px from Figma) */
  gap?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * HorizontalScrollSlider — Horizontal scroll animation triggered by vertical scroll
 * 
 * Features:
 * - Pins the container during scroll
 * - Translates cards horizontally based on vertical scroll progress
 * - Smooth scrubbing tied to scroll position
 * - Cards extend beyond viewport to create horizontal scroll effect
 * - Responsive: disabled on mobile, enabled on desktop
 * 
 * Figma specifications:
 * - Slider width: 2872px (3 × 904px cards + 2 × 80px gaps)
 * - Card width: 904px
 * - Gap: 80px
 * - Container padding: 352px (on desktop)
 * 
 * Usage:
 * ```tsx
 * <HorizontalScrollSlider cards={CARDS} gap={80} />
 * ```
 */
export function HorizontalScrollSlider({
  cards,
  gap = 80,
  className,
}: HorizontalScrollSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Enable GSAP scroll only on large screens (≥1024px)
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  useEffect(() => {
    // Skip animation on mobile/tablet
    if (!isDesktop || !containerRef.current || !sliderRef.current) return;

    const container = containerRef.current;
    const slider = sliderRef.current;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Calculate the left padding dynamically (matches Container logic)
    const getLeftPadding = () => {
      const viewportWidth = window.innerWidth;
      const maxWidth = 1280; // max-w-7xl = 80rem = 1280px
      const basePadding = 40; // lg:px-10 = 2.5rem = 40px
      
      if (viewportWidth > maxWidth) {
        // Viewport larger than container: center + padding
        return (viewportWidth - maxWidth) / 2 + basePadding;
      }
      return basePadding;
    };

    // Calculate the total distance to scroll
    // Scroll until there's equal margin on the right as there is on the left
    const getScrollAmount = () => {
      const sliderWidth = slider.scrollWidth;
      const viewportWidth = window.innerWidth;
      const leftPadding = getLeftPadding();
      const rightPadding = leftPadding; // Equal margin on both sides
      
      // Amount to scroll = slider width - viewport width + right padding
      return -(sliderWidth - viewportWidth + rightPadding);
    };

    // Create the horizontal scroll animation
    const tween = gsap.to(slider, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top+=200", // Start scrolling 200px after it comes into view
        end: () => {
          const sliderWidth = slider.scrollWidth;
          const viewportWidth = window.innerWidth;
          const rightPadding = getLeftPadding();
          const scrollDistance = sliderWidth - viewportWidth + rightPadding;
          return `+=${scrollDistance}`;
        },
        scrub: 1,
        pin: true,
        pinSpacing: true, // Maintain spacing after pin
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Cleanup
    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container) {
          st.kill();
        }
      });
    };
  }, [isDesktop]);

  // Mobile/Tablet: Native horizontal scroll
  if (!isDesktop) {
    return (
      <div className={`overflow-x-auto pb-8 ${className || ""}`}>
        <div
          className="flex px-4 sm:px-6 md:px-8"
          style={{ 
            gap: `${gap / 2}px`, // Smaller gap on mobile/tablet
          }}
        >
          {cards.map((card, index) => (
            <SliderCard
              key={card.title}
              title={card.title}
              description={card.description}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }

  // Desktop (≥1024px): GSAP horizontal scroll
  // Align with the Container content above by calculating the same left offset
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className || ""}`}
    >
      <div
        ref={sliderRef}
        className="flex"
        style={{
          gap: `${gap}px`,
          willChange: "transform",
          // Match Container's responsive padding and centering
          // Container: max-w-7xl (1280px) centered + px-4/6/8/10
          // Calculate left offset: (viewport - 1280px) / 2 + padding
          paddingLeft: "max(2.5rem, calc((100vw - 80rem) / 2 + 2.5rem))",
        }}
      >
        {cards.map((card, index) => (
          <SliderCard
            key={card.title}
            title={card.title}
            description={card.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
