"use client";

import { Container } from "@/design-system";
import { FadeIn } from "@/components/animations";
import { YunityLogo } from "@/components/ui";

/**
 * YunitySection — "Powered by Yunity" branding block.
 * Background: brand-900 deep indigo.
 *
 * Tokens used:
 *   py-3xl               → 120px (updated to match Figma)
 *   gap-10               → 40px (--spacing-lg)
 *   text-h2              → responsive 80/56/40px (0.80x line-height ratio)
 *   text-body-lg         → responsive 24/20/18px
 *   Accent colors via CSS vars in SVG gradient
 */
export function YunitySection() {
  return (
    <section className="bg-brand-900 py-3xl">
      <Container size="lg">
        <div className="flex flex-col items-center gap-10">
          <FadeIn scrollTrigger>
            <h2 className="text-center font-heading text-h2 font-bold text-white">
              Powered by
            </h2>
          </FadeIn>

          {/* Yunity logo — official brand asset */}
          <FadeIn scrollTrigger delay={0.15}>
            <YunityLogo width={380} className="h-28 w-auto sm:h-40" />
          </FadeIn>

          {/* Description */}
          <FadeIn scrollTrigger delay={0.3}>
            <div className="max-w-text space-y-4 text-center text-body-lg text-white/80">
              <p>
                Yunity is the intelligence layer underpinning YuLife, turning
                everyday engagement into insight that improves guidance,
                relevance and outcomes over time.
              </p>
              <p>
                It works quietly behind the scenes, making the YuLife experience
                more effective with every interaction without losing any of the
                joy people feel while using it.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
