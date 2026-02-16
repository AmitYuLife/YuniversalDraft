# GSAP Animations

This project uses GSAP (GreenSock Animation Platform) for smooth, performant animations.

## Setup

GSAP is already configured and initialized in the root layout via the `<SmoothScroll />` component.

## Animation Components

### FadeIn

Fades in content on mount or scroll:

```tsx
import { FadeIn } from "@/components/animations";

<FadeIn scrollTrigger delay={0.2} y={40}>
  <Text variant="heading-lg">This fades in on scroll</Text>
</FadeIn>
```

**Props:**
- `delay` (number): Delay before animation starts (seconds)
- `duration` (number): Animation duration (seconds, default: 0.8)
- `y` (number): Distance to translate from (pixels, default: 30)
- `scrollTrigger` (boolean): Enable scroll-triggered animation
- `className` (string): Additional CSS classes

### StaggerFadeIn

Staggers fade-in animation across child elements:

```tsx
import { StaggerFadeIn } from "@/components/animations";

<StaggerFadeIn scrollTrigger stagger={0.15}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</StaggerFadeIn>
```

**Props:**
- `stagger` (number): Delay between items (seconds, default: 0.1)
- `duration` (number): Animation duration (seconds, default: 0.8)
- `y` (number): Distance to translate from (pixels, default: 30)
- `scrollTrigger` (boolean): Enable scroll-triggered animation
- `className` (string): Additional CSS classes

## Custom Animations

Use the `useGSAP` hook for custom animations:

```tsx
"use client";

import { useGSAP } from "@/lib/gsap/useGSAP";
import { gsap } from "@/lib/gsap";

function MyComponent() {
  const containerRef = useGSAP(() => {
    gsap.from(".my-element", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power2.out",
    });
  });

  return (
    <div ref={containerRef}>
      <div className="my-element">Animated content</div>
    </div>
  );
}
```

## ScrollTrigger

For scroll-based animations:

```tsx
"use client";

import { useGSAP } from "@/lib/gsap/useGSAP";
import { gsap } from "@/lib/gsap";

function ScrollAnimation() {
  const containerRef = useGSAP(() => {
    gsap.from(".scroll-fade", {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: ".scroll-fade",
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
        markers: true, // Remove in production
      },
    });
  });

  return (
    <div ref={containerRef}>
      <div className="scroll-fade">Scroll to see animation</div>
    </div>
  );
}
```

## Timeline Animations

For sequenced animations:

```tsx
"use client";

import { useGSAP } from "@/lib/gsap/useGSAP";
import { gsap } from "@/lib/gsap";

function TimelineAnimation() {
  const containerRef = useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".step-1", { opacity: 0, x: -50 })
      .from(".step-2", { opacity: 0, x: 50 }, "-=0.3")
      .from(".step-3", { opacity: 0, scale: 0.8 }, "-=0.3");
  });

  return (
    <div ref={containerRef}>
      <div className="step-1">Step 1</div>
      <div className="step-2">Step 2</div>
      <div className="step-3">Step 3</div>
    </div>
  );
}
```

## Preventing Content Flash (FOUC)

The `FadeIn` and `StaggerFadeIn` components automatically prevent content flash on page load by applying CSS classes that hide elements before GSAP runs. This ensures smooth animations without visible "jumps" or content appearing before fading in.

**How it works:**

1. CSS classes (`gsap-fade-in-initial`, `gsap-stagger-initial`) set elements to `opacity: 0` and `transform: translateY(30px)` initially
2. GSAP then animates TO the visible state (`opacity: 1`, `y: 0`) when ready
3. This eliminates the flash where content appears before animating

**For custom animations**, apply the same pattern:

```tsx
"use client";

import { useGSAP } from "@/lib/gsap/useGSAP";
import { gsap } from "@/lib/gsap";

function MyComponent() {
  const containerRef = useGSAP(() => {
    // Animate TO visible state instead of FROM hidden state
    gsap.to(".my-element", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });
  });

  return (
    <div ref={containerRef}>
      {/* Apply CSS class to hide initially */}
      <div className="my-element gsap-fade-in-initial">
        Animated content
      </div>
    </div>
  );
}
```

## Tips

1. **Use "use client"**: GSAP animations require client-side rendering
2. **Cleanup is automatic**: The `useGSAP` hook handles cleanup automatically
3. **Performance**: Use `will-change` CSS for animated elements
4. **Debugging**: Set `markers: true` in ScrollTrigger for development
5. **Easing**: Explore GSAP's easing functions: `power1-4`, `back`, `elastic`, `bounce`
6. **Prevent flash**: Use CSS to set initial hidden state, then animate TO visible state

## Resources

- [GSAP Docs](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer/)
