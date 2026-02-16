"use client";

import { Container } from "@/design-system";
import { FadeIn } from "@/components/animations";

/**
 * ExperienceSection — "An experience people want to come back to"
 * Purple background with side-by-side heading/text and a white placeholder
 * for a Rive animation canvas.
 *
 * Tokens used:
 *   py-section           → 200px (keeps larger padding per Figma)
 *   gap-30               → 120px (--spacing-3xl)
 *   gap-8                → 32px (--spacing-md)
 *   text-h2              → responsive 80/56/40px (0.80x line-height ratio)
 *   text-body-lg         → responsive 24/20/18px
 *   rounded-lg           → 16px (Figma)
 *   p-10                 → 40px (placeholder padding per Figma)
 *
 * Alignment:
 *   items-end            → Aligns heading and description to bottom (per Figma)
 *   aspectRatio: 1216/723 → Maintains Figma proportions while following container width
 */
export function ExperienceSection() {
  return (
    <section className="bg-brand-600 py-section">
      <Container size="xl">
        <div className="flex flex-col items-center gap-30">
          {/* Side-by-side heading + description */}
          <div className="grid w-full max-w-content grid-cols-1 items-end gap-8 lg:grid-cols-2">
            <FadeIn scrollTrigger>
              <h2 className="font-heading text-h2 font-bold text-white">
                An experience people want to come back&nbsp;to
              </h2>
            </FadeIn>

            <FadeIn scrollTrigger delay={0.2}>
              <p className="text-body-lg text-white/90">
                YuLife simplifies health and insurance benefits, encouraging
                users to engage through small, positive actions like movement
                and mindfulness. Progress is celebrated, turning benefits into
                trusted tools rather than confusing obstacles.
              </p>
            </FadeIn>
          </div>

          {/* Rive Canvas Placeholder */}
          <FadeIn scrollTrigger delay={0.3}>
            <div className="flex w-full max-w-content items-center justify-center rounded-lg bg-white p-10 shadow-lg" style={{ aspectRatio: '1216 / 723' }}>
              <p className="text-body-lg text-neutral-700">
                Interactive experience — coming soon
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
