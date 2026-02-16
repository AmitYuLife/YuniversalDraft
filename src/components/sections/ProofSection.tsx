"use client";

import Image from "next/image";
import { Container } from "@/design-system";
import { FadeIn, StaggerFadeIn } from "@/components/animations";

const AWARDS = [
  {
    title: "Best Financial Wellbeing Provider",
    source: "Corporate Advisor Awards",
    image: "/images/awards/best-financial-wellbeing-provider.png",
  },
  {
    title: "5-star Insurance Technology Provider",
    source: "Insurance Business Magazine",
    image: "/images/awards/5-star-insurance-technology.png",
  },
  {
    title: "Best Places to Work",
    source: "Sunday Times",
    image: "/images/awards/best-places-to-work.png",
  },
  {
    title: "Best Places to Work",
    source: "Sunday Times · Sifted",
    image: "/images/awards/best-places-to-work-sifted.png",
  },
  {
    title: "Certified B Corporation",
    source: "B Corp",
    image: "/images/awards/certified-b-corporation.png",
  },
] as const;

/**
 * ProofSection — "Trusted, proven, scalable" with award badges.
 * White background.
 *
 * Tokens used:
 *   py-section           → 200px
 *   gap-10               → 40px (--spacing-lg)
 *   gap-16               → 64px (--spacing-xl)
 *   text-h2              → responsive 80/56/40px (0.80x line-height ratio)
 *   text-body-lg         → responsive 24/20/18px
 *   text-body-sm         → responsive 16/16/14px
 */
export function ProofSection() {
  return (
    <section className="bg-white py-section">
      <Container size="xl">
        <div className="flex flex-col items-center gap-10">
          {/* Heading — dual-color */}
          <FadeIn scrollTrigger>
            <h2 className="max-w-content text-center font-heading text-h2 font-bold">
              <span className="text-brand-600">Trusted,</span>{" "}
              <span className="text-brand-900">proven, scalable</span>
            </h2>
          </FadeIn>

          {/* Description */}
          <FadeIn scrollTrigger delay={0.15}>
            <p className="max-w-text text-center text-body-lg text-neutral-700">
              Trusted by millions of people worldwide, YuLife partners with
              leading insurers including Bupa and MetLife and operates globally.
            </p>
          </FadeIn>

          {/* Awards grid */}
          <StaggerFadeIn
            scrollTrigger
            stagger={0.1}
            className="mt-8 flex w-full max-w-content flex-wrap items-start justify-center gap-8 lg:gap-16"
          >
            {AWARDS.map((award, i) => (
              <div
                key={i}
                className="flex w-36 flex-col items-center gap-2 text-center sm:w-44"
              >
                <Image
                  src={award.image}
                  alt={`${award.title} - ${award.source}`}
                  width={362}
                  height={160}
                  className="h-auto w-full"
                />
                <p className="text-body-sm font-bold text-brand-900">
                  {award.title}
                </p>
                <p className="text-body-sm text-neutral-700">
                  {award.source}
                </p>
              </div>
            ))}
          </StaggerFadeIn>
        </div>
      </Container>
    </section>
  );
}
