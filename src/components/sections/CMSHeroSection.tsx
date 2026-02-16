"use client";

import type { HeroBlock } from "@/lib/cms";
import { Button, Container, Stack, Text } from "@/design-system";
import { FadeIn } from "@/components/animations";

interface CMSHeroSectionProps {
  block: HeroBlock;
}

/**
 * Generic CMS-driven hero section used by non-home pages (about, pricing, etc.).
 */
export function CMSHeroSection({ block }: CMSHeroSectionProps) {
  return (
    <section className="bg-surface-secondary py-20 sm:py-28">
      <Container size="lg">
        <Stack direction="vertical" align="center" gap={6}>
          <FadeIn delay={0.2} y={40}>
            <Text variant="heading-xl" className="text-center">
              {block.heading}
            </Text>
          </FadeIn>

          {block.subheading && (
            <FadeIn delay={0.4} y={30}>
              <Text
                variant="body-lg"
                color="secondary"
                className="max-w-2xl text-center"
              >
                {block.subheading}
              </Text>
            </FadeIn>
          )}

          <FadeIn delay={0.6} y={20}>
            <Stack
              direction="horizontal"
              gap={4}
              align="center"
              className="mt-4"
            >
              {block.cta && (
                <a href={block.cta.href}>
                  <Button variant="primary" size="lg">
                    {block.cta.label}
                  </Button>
                </a>
              )}
              {block.secondaryCta && (
                <a href={block.secondaryCta.href}>
                  <Button variant="secondary" size="lg">
                    {block.secondaryCta.label}
                  </Button>
                </a>
              )}
            </Stack>
          </FadeIn>
        </Stack>
      </Container>
    </section>
  );
}
