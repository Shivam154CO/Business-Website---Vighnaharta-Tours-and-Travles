import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Users,
  Briefcase,
  Snowflake,
  Route as RouteIcon,
  Check,
  Sparkles,
} from "lucide-react";
import { FLEET } from "@/constants/fleet";
import { SITE } from "@/constants/site";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { getVehicles, getRoutes } from "@/lib/data";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { AboutSection } from "@/components/home/AboutSection";
import { TravelShowcase } from "@/components/home/TravelShowcase";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FleetPreview } from "@/components/home/FleetPreview";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { StatsCounter } from "@/components/home/StatsCounter";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
import { CTABanner } from "@/components/home/CTABanner";

export default async function Home() {
  const [vehicles, routes] = await Promise.all([getVehicles(), getRoutes()]);

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 relative">
        <HeroSection />
        <TrustStrip />
        <AboutSection />
        <TravelShowcase />
        <ServicesGrid />
        <FleetPreview vehicles={vehicles} />
        <PopularRoutes routes={routes} />
        <WhyChooseUs />
        <StatsCounter />
        <Testimonials />
        <FAQSection />
        <CTABanner />
      </main>
    </div>
  );
}
