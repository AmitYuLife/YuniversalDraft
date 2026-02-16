"use client";

import Image from "next/image";
import { Container } from "@/design-system";
import { FadeIn } from "@/components/animations";
import { ScrollingMarquee } from "@/components/ui/ScrollingMarquee";

const LOGO_ROW_1 = [
  { name: "Santander", src: "/images/trust-logos-new/santander.png", width: 254, height: 44 },
  { name: "Fujitsu", src: "/images/trust-logos-new/fujitsu.png", width: 131, height: 64 },
  { name: "Sodexo", src: "/images/trust-logos-new/sodexo.png", width: 149, height: 50 },
  { name: "Capital One", src: "/images/trust-logos-new/capital-one.png", width: 157, height: 56 },
  { name: "Havas", src: "/images/trust-logos-new/havas.png", width: 113, height: 64 },
  { name: "Fyxer", src: "/images/trust-logos-new/fyxer.png", width: 199, height: 64 },
];

const LOGO_ROW_2 = [
  { name: "Sotheby's", src: "/images/trust-logos-new/sotheby-s.png", width: 186, height: 48 },
  { name: "Abel & Cole", src: "/images/trust-logos-new/abel-cole.png", width: 222, height: 64 },
  { name: "Curve", src: "/images/trust-logos-new/curve.png", width: 179, height: 40 },
  { name: "Fyxer", src: "/images/trust-logos-new/fyxer.png", width: 199, height: 64 },
  { name: "Rightmove", src: "/images/trust-logos-new/vector.png", width: 237, height: 48 },
];

/**
 * TrustSection — "Trusted by world leading brands" with infinite scrolling marquee.
 * Two rows scroll in opposite directions with purple gradient overlays.
 * Background: brand-900 (deep indigo).
 *
 * Tokens used:
 *   py-3xl               → 120px
 *   gap-20               → 80px
 *   text-h4              → responsive 40/32/28px
 */
export function TrustSection() {
  return (
    <section className="bg-brand-900 py-3xl">
      <Container size="xl">
        <div className="flex flex-col items-center gap-20">
          <FadeIn scrollTrigger>
            <h2 className="text-center font-heading text-h4 font-bold text-white">
              Trusted by world leading brands
            </h2>
          </FadeIn>

          <div className="flex w-full flex-col gap-20">
            {/* Row 1 - Scrolling Left */}
            <ScrollingMarquee direction="left" duration={40} gap={80} className="h-20">
              {LOGO_ROW_1.map((logo, index) => (
                <div key={`row1-${logo.name}-${index}`} className="flex shrink-0 items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="h-auto w-auto max-h-16 object-contain opacity-90"
                    priority
                    unoptimized
                  />
                </div>
              ))}
            </ScrollingMarquee>

            {/* Row 2 - Scrolling Right */}
            <ScrollingMarquee direction="right" duration={40} gap={80} className="h-20">
              {LOGO_ROW_2.map((logo, index) => (
                <div key={`row2-${logo.name}-${index}`} className="flex shrink-0 items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="h-auto w-auto max-h-16 object-contain opacity-90"
                    priority
                    unoptimized
                  />
                </div>
              ))}
            </ScrollingMarquee>
          </div>
        </div>
      </Container>
    </section>
  );
}
