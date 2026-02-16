"use client";

import { useState, useRef, useEffect, type MouseEvent } from "react";
import { Container, Button } from "@/design-system";
import { FadeIn, YugiAnimation, YuCoinBackground } from "@/components/animations";
import { Logo } from "@/components/ui";

/**
 * HeroSection — full-viewport hero with centred heading, subtext, and 3 CTA buttons.
 *
 * Background: brand-600 purple (inherited from parent or set explicitly).
 * All text is white; buttons are white-solid except the "For insurers" special
 * gradient-border variant.
 *
 * Spacing (from Figma):
 *   py-section           → 200px (top/bottom padding)
 *   gap-16               → 64px (between logo, heading/copy, and buttons)
 *   gap-10               → 40px (between heading/subtext and between buttons)
 *   text-h1              → responsive 120/80/56px (0.80x line-height ratio)
 *   text-body-lg         → responsive 24/20/18px
 *   rounded-lg           → 16px (--radius-lg / Figma cards+buttons)
 */

function GradientButton({ href, children }: { href: string; children: React.ReactNode }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);
  const isHoveringRef = useRef(false);
  const cursorOffsetRef = useRef(0);
  const rotationRef = useRef(0);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    
    isHoveringRef.current = true;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle from center to cursor
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const degrees = (angle * 180 / Math.PI + 90 + 360) % 360;
    
    // Store cursor position as offset from current rotation
    cursorOffsetRef.current = degrees;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };

  // Continuous rotation animation
  useEffect(() => {
    let baseRotation = 0;
    
    const animate = () => {
      // Always increment base rotation (continuous clockwise)
      baseRotation = (baseRotation + 0.8) % 360;
      
      let newRotation: number;
      
      if (isHoveringRef.current) {
        // When hovering, smoothly interpolate towards cursor position
        const target = cursorOffsetRef.current;
        const current = rotationRef.current;
        const diff = target - current;
        const shortestDiff = ((diff + 540) % 360) - 180;
        newRotation = (current + shortestDiff * 0.15) % 360;
      } else {
        // When not hovering, use the continuous base rotation
        newRotation = baseRotation;
      }
      
      rotationRef.current = newRotation;
      setRotation(newRotation);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Empty dependency array - only run once

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-flex h-16 w-full items-center justify-center whitespace-nowrap rounded-lg px-8 text-body-lg font-bold text-white transition-all sm:h-20 sm:px-10"
    >
      {/* Cursor-reactive rotating gradient border */}
      <span 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `conic-gradient(from ${rotation}deg, 
            var(--color-accent-green), 
            var(--color-accent-blue), 
            var(--color-accent-yellow), 
            var(--color-accent-purple),
            var(--color-accent-green)
          )`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2px",
        }}
      />
      <span className="relative">{children}</span>
    </a>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center bg-brand-600" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
      {/* YuCoin floating background - animated right to left */}
      <YuCoinBackground />
      
      {/* Yugi mascot animation - follows exact Figma design specs */}
      <div className="relative" style={{ zIndex: 5 }}>
        <YugiAnimation
          imageSrc="/YuniversalDraft/images/yugi.png"
          alt="Yugi flying in his rocket ship"
          size={456}
        />
      </div>
      
      <Container size="lg" className="relative z-10">
        <div className="flex flex-col items-center gap-16">
          {/* Yu Logo mark */}
          <FadeIn delay={0.1} y={20}>
            <Logo size={80} color="white" />
          </FadeIn>

          {/* Heading + subtext */}
          <div className="flex flex-col items-center gap-10">
            <FadeIn delay={0.25} y={40}>
              <h1 className="max-w-content text-center font-heading text-h1 font-bold text-white">
                Insurance that inspires&nbsp;life
              </h1>
            </FadeIn>

            <FadeIn delay={0.4} y={30}>
              <p className="max-w-text text-center text-body-lg text-white/90">
                Say hello to YuLife – the new way to create real impact for your
                people by keeping them engaged and offering enhanced protection
                and wellbeing tools.
              </p>
            </FadeIn>
          </div>

          {/* CTA buttons */}
          <FadeIn delay={0.55} y={20}>
            <div className="grid w-full max-w-content grid-cols-1 gap-10 sm:grid-cols-3">
              <Button
                href="/products/individuals"
                variant="hero-primary"
                size="xl"
                className="w-full whitespace-nowrap"
              >
                For individuals
              </Button>
              <Button
                href="/products/businesses"
                variant="hero-primary"
                size="xl"
                className="w-full whitespace-nowrap"
              >
                For businesses
              </Button>
              <GradientButton href="/products/insurers">
                For insurers
              </GradientButton>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
