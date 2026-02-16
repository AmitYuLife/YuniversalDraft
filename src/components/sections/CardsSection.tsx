"use client";

import type { CardBlock, Section } from "@/lib/cms";
import { Card, Container, Grid, GridItem, Stack, Text } from "@/design-system";
import { FadeIn, StaggerFadeIn } from "@/components/animations";

interface CardsSectionProps {
  section: Section;
}

export function CardsSection({ section }: CardsSectionProps) {
  const cards = section.blocks.filter(
    (b): b is CardBlock => b.type === "card"
  );

  return (
    <section id={section.id} className="py-16 sm:py-24">
      <Container size="lg">
        <Stack direction="vertical" align="center" gap={12}>
          {(section.heading || section.subheading) && (
            <Stack direction="vertical" align="center" gap={4}>
              {section.heading && (
                <FadeIn scrollTrigger>
                  <Text variant="heading-lg" className="text-center">
                    {section.heading}
                  </Text>
                </FadeIn>
              )}
              {section.subheading && (
                <FadeIn scrollTrigger delay={0.1}>
                  <Text
                    variant="body-lg"
                    color="secondary"
                    className="max-w-2xl text-center"
                  >
                    {section.subheading}
                  </Text>
                </FadeIn>
              )}
            </Stack>
          )}

          <StaggerFadeIn scrollTrigger stagger={0.15}>
            <Grid>
              {cards.map((card, index) => (
                <GridItem
                  key={index}
                  span={12}
                  spanSm={6}
                  spanLg={4}
                  // Full width mobile, half on tablet, third on desktop
                >
                  <Card variant="outlined" padding="md">
                    <Stack direction="vertical" gap={3}>
                      <Text variant="heading-sm">{card.title}</Text>
                      <Text variant="body-md" color="secondary">
                        {card.description}
                      </Text>
                      {card.link && (
                        <a
                          href={card.link.href}
                          className="mt-2 text-sm font-medium text-text-link hover:underline"
                        >
                          {card.link.label} &rarr;
                        </a>
                      )}
                    </Stack>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </StaggerFadeIn>
        </Stack>
      </Container>
    </section>
  );
}
