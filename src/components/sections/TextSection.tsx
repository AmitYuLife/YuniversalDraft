"use client";

import type { TextBlock } from "@/lib/cms";
import { Button, Container, Stack, Text } from "@/design-system";
import { FadeIn } from "@/components/animations";

interface TextSectionProps {
  block: TextBlock;
}

export function TextSection({ block }: TextSectionProps) {
  return (
    <section className="bg-surface-brand py-16 sm:py-24">
      <Container size="md">
        <Stack direction="vertical" align="center" gap={6}>
          {block.heading && (
            <FadeIn scrollTrigger>
              <Text
                variant="heading-lg"
                color="onBrand"
                className="text-center"
              >
                {block.heading}
              </Text>
            </FadeIn>
          )}
          <FadeIn scrollTrigger delay={0.2}>
            <Text
              variant="body-lg"
              color="onBrand"
              className="text-center opacity-90"
            >
              {block.body}
            </Text>
          </FadeIn>
          <FadeIn scrollTrigger delay={0.4}>
            <Button variant="secondary" size="lg" className="mt-2">
              Get started
            </Button>
          </FadeIn>
        </Stack>
      </Container>
    </section>
  );
}
