import { getCMSClient } from "@/lib/cms";
import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  TrustSection,
  IntroSection,
  ExperienceSection,
  YunitySection,
  ProofSection,
} from "@/components/sections";

export default async function HomePage() {
  const cms = await getCMSClient();
  const navigation = await cms.getNavigation();

  return (
    <>
      <Header navigation={navigation} scrollBehavior={true} />

      <main>
        <HeroSection />
        <TrustSection />
        <IntroSection />
        <ExperienceSection />
        <YunitySection />
        <ProofSection />
      </main>

      <Footer />
    </>
  );
}
