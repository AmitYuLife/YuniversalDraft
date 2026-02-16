"use client";

import { Container } from "@/design-system";
import { FadeIn, HorizontalScrollSlider } from "@/components/animations";

const CARDS = [
  {
    title: "Individuals",
    description:
      "feel more supported and confident using their benefits",
  },
  {
    title: "Employers",
    description:
      "gain clearer insight and better return on benefits spend",
  },
  {
    title: "Insurers",
    description:
      "see earlier signals and stronger population outcomes",
  },
] as const;

/**
 * IntroSection — "Built for daily life, not just moments of need"
 * White background with left-aligned content and horizontal scroll slider.
 *
 * Tokens used:
 *   py-section           → 200px
 *   gap-20               → 80px (--spacing-2xl)
 *   text-h2              → responsive 80/56/40px (0.80x line-height ratio)
 *   text-body-lg         → responsive 24/20/18px
 *   max-w-text           → 904px (left-aligned reading width)
 */
export function IntroSection() {
  return (
    <section className="bg-white py-section">
      {/* Left-aligned content */}
      <Container size="xl">
        <div className="flex flex-col gap-20">
          {/* Heading — dual-color, left-aligned */}
          <FadeIn scrollTrigger>
            <h2 className="max-w-text font-heading text-h2 font-bold">
              <span className="text-brand-600">Built for daily life,</span>
              <br />
              <span className="text-brand-900">
                not just moments of need
              </span>
            </h2>
          </FadeIn>

          {/* Body copy — left-aligned */}
          <FadeIn scrollTrigger delay={0.15}>
            <div className="max-w-text space-y-4 text-body-lg text-neutral-700">
              <p>
                YuLife is an AI-based employee benefit redefining how health and
                insurance work in everyday life.
              </p>
              <p>
                By bringing health and insurance together in one experience,
                YuLife helps people understand their benefits, find the right
                support around key life events, and get value from what
                they&apos;re already entitled to, not just when they need to make
                a claim.
              </p>
              <p>
                That everyday engagement creates better outcomes for individuals,
                employers and insurers.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Full-width horizontal scroll slider - aligned with container */}
      <HorizontalScrollSlider cards={CARDS} gap={80} className="mt-20" />
    </section>
  );
}
