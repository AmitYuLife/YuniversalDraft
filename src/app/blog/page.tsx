import { getCMSClient } from "@/lib/cms";
import type { HeroBlock, TextBlock } from "@/lib/cms";
import { Header, Footer } from "@/components/layout";
import { CMSHeroSection, CardsSection, TextSection } from "@/components/sections";

export default async function BlogPage() {
  const cms = await getCMSClient();
  const [page, navigation] = await Promise.all([
    cms.getPage("/blog"),
    cms.getNavigation(),
  ]);

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <>
      <Header navigation={navigation} />

      <main>
        {page.sections.map((section) => {
          switch (section.type) {
            case "hero": {
              const heroBlock = section.blocks.find(
                (b): b is HeroBlock => b.type === "hero"
              );
              return heroBlock ? (
                <CMSHeroSection key={section.id} block={heroBlock} />
              ) : null;
            }

            case "cards":
              return <CardsSection key={section.id} section={section} />;

            case "text": {
              const textBlock = section.blocks.find(
                (b): b is TextBlock => b.type === "text"
              );
              return textBlock ? (
                <TextSection key={section.id} block={textBlock} />
              ) : null;
            }

            default:
              return null;
          }
        })}
      </main>

      <Footer />
    </>
  );
}
