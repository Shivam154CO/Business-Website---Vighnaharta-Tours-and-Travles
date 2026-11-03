import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FleetPreview } from "@/components/home/FleetPreview";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { StatsCounter } from "@/components/home/StatsCounter";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 relative">
        <HeroSection />
        <TrustStrip />
        <ServicesGrid />
        <FleetPreview />
        <PopularRoutes />
        <WhyChooseUs />
        <StatsCounter />
        <Testimonials />
        <CTABanner />
      </main>
    </div>
  );
}
