"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

interface YugiAnimationProps {
  /** Path to Yugi image */
  imageSrc: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Size of the mascot in pixels */
  size?: number;
}

/**
 * YugiAnimation - Looping animation contained within hero section
 * 
 * Animation sequence (infinite loop):
 * 1. Fly in from left following curved path to center
 * 2. Idle for 3 seconds with gentle floating
 * 3. Fly out to the right following curved path
 * 4. Reset and repeat
 */
export function YugiAnimation({
  imageSrc,
  alt = "Yugi in his rocket ship",
  size = 456,
}: YugiAnimationProps) {
  const yugiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!yugiRef.current) return;

    const yugi = yugiRef.current;
    
    // Hero section dimensions from Figma
    const heroWidth = 1920;
    const heroHeight = 984;
    
    // Get actual hero section width (responsive)
    const actualHeroWidth = yugi.parentElement?.offsetWidth || window.innerWidth;
    const viewportWidth = window.innerWidth;
    
    // Calculate responsive scale for Y-axis (height proportional)
    const scaleY = actualHeroWidth / heroWidth;
    
    // Animation path vertices - responsive for different viewport widths
    // Start off-screen left (proportional to viewport)
    const pathStart = {
      x: -(viewportWidth * 0.1),  // 10% off-screen left
      y: 799 * scaleY,              // Y position scales with design
    };
    
    // Middle at viewport center (always centered)
    const pathMiddle = {
      x: viewportWidth / 2,         // Always center of viewport
      y: 504.5 * scaleY,            // Y position scales with design
    };
    
    // End off-screen right (proportional to viewport)
    const pathEnd = {
      x: viewportWidth + (viewportWidth * 0.2), // 20% beyond viewport right
      y: 15 * scaleY,                            // Y position scales with design
    };

    // Create SVG paths for fly-in and fly-out
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.pointerEvents = "none";
    svg.style.visibility = "hidden";
    
    // FLY-IN PATH: From start to middle
    const pathIn = document.createElementNS(svgNS, "path");
    
    // Calculate responsive curve control points
    const widthIn = pathMiddle.x - pathStart.x;
    const heightIn = pathStart.y - pathMiddle.y;
    
    // Control points maintain curve shape proportionally
    const cp1xIn = pathStart.x + (widthIn * 0.304); // 322.44/1060 ≈ 0.304
    const cp1yIn = pathStart.y - (heightIn * 0.123); // 36.17/294.5 ≈ 0.123
    const cp2xIn = pathStart.x + (widthIn * 0.768); // 814.03/1060 ≈ 0.768
    const cp2yIn = pathStart.y + (heightIn * 0.0046); // 1.36/294.5 ≈ 0.0046
    
    pathIn.setAttribute("d", `
      M ${pathStart.x} ${pathStart.y}
      C ${cp1xIn} ${cp1yIn}
        ${cp2xIn} ${cp2yIn}
        ${pathMiddle.x} ${pathMiddle.y}
    `);
    
    // FLY-OUT PATH: From middle to end
    const pathOut = document.createElementNS(svgNS, "path");
    
    // Calculate responsive curve control points
    const widthOut = pathEnd.x - pathMiddle.x;
    const heightOut = pathMiddle.y - pathEnd.y;
    
    // Control points maintain curve shape proportionally
    const cp1xOut = pathMiddle.x + (widthOut * 0.585); // 784.5/1342 ≈ 0.585
    const cp1yOut = pathMiddle.y + (heightOut * 0.247); // 121/489.5 ≈ 0.247
    
    pathOut.setAttribute("d", `
      M ${pathMiddle.x} ${pathMiddle.y}
      C ${cp1xOut} ${cp1yOut}
        ${pathEnd.x} ${pathEnd.y}
        ${pathEnd.x} ${pathEnd.y}
    `);
    
    document.body.appendChild(svg);
    svg.appendChild(pathIn);
    svg.appendChild(pathOut);

    // Set initial position (at path start, completely hidden)
    gsap.set(yugi, {
      x: pathStart.x - size / 2,
      y: pathStart.y - size / 2,
      scale: 0.5, // Start at 50% scale
      rotation: 0,
      autoAlpha: 0, // Hidden initially to prevent flash
    });

    // Create infinite looping timeline
    const loopTimeline = gsap.timeline({ 
      repeat: -1,
      delay: 2, // Wait 2 seconds before first appearance
    });

    // Show Yugi at start position
    loopTimeline.set(yugi, {
      autoAlpha: 1,
    });

    // 1. FLY-IN ANIMATION (6 seconds - 100% slower)
    // Add subtle rotation that follows the curve, and scale up from 50% to 100%
    loopTimeline.to(yugi, {
      motionPath: {
        path: pathIn,
        align: pathIn,
        alignOrigin: [0.5, 0.5],
        start: 0,
        end: 1,
      },
      rotation: -8, // Tilt slightly as he curves upward
      scale: 1, // Grow from 50% to 100%
      duration: 6,
      ease: "power3.out",
    });
    
    // Straighten out as he reaches center
    loopTimeline.to(yugi, {
      rotation: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.4");

    // 2. IDLE ANIMATION (1 second - brief hover)
    loopTimeline.to(yugi, {
      y: "+=10",
      rotation: 1,
      duration: 0.5,
      ease: "sine.inOut",
    });
    loopTimeline.to(yugi, {
      y: "-=10",
      rotation: 0,
      duration: 0.5,
      ease: "sine.inOut",
    });

    // 3. FLY-OUT ANIMATION (2 seconds)
    // Add subtle rotation for the exit curve, and scale down from 100% to 50%
    loopTimeline.to(yugi, {
      motionPath: {
        path: pathOut,
        align: pathOut,
        alignOrigin: [0.5, 0.5],
        start: 0,
        end: 1,
      },
      rotation: 5, // Slight tilt as he curves toward exit
      scale: 0.5, // Shrink from 100% to 50%
      duration: 2,
      ease: "power2.in",
    });

    // 4. HIDE and wait for 3 seconds before restarting
    loopTimeline.to(yugi, {
      autoAlpha: 0,
      duration: 0.1,
    });
    
    // 5. RESET to start position while hidden
    loopTimeline.set(yugi, {
      x: pathStart.x - size / 2,
      y: pathStart.y - size / 2,
      rotation: 0,
      scale: 0.5, // Reset to 50% scale for next loop
    });

    // 6. WAIT for 3 seconds before showing again
    loopTimeline.to({}, { duration: 3 });

    // 7. SHOW at start position to begin next loop
    loopTimeline.set(yugi, {
      autoAlpha: 1,
    });

    // Cleanup
    return () => {
      loopTimeline.kill();
      svg.remove();
    };
  }, [imageSrc, alt, size]);

  return (
    <div
      ref={yugiRef}
      className="pointer-events-none absolute left-0 top-0 z-0"
      style={{
        width: size,
        height: size,
        opacity: 0, // Start hidden to prevent initial flash
        visibility: "hidden", // Double protection against flash
      }}
    >
      <img
        src={imageSrc}
        alt={alt}
        className="h-full w-full object-contain"
        draggable="false"
        style={{
          imageRendering: "-webkit-optimize-contrast",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
