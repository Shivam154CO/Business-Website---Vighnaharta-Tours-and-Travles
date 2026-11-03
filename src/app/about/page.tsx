import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { IMG } from "@/constants/routes";
import { Star, Clock, Car, Phone, Mail } from "lucide-react";

const ABOUT_HERO = IMG(
  "clean white SUV taxi driving on a scenic green highway in maharashtra india, bright daylight, travel photography",
  "landscape_16_9",
);

const STORY_IMAGE = IMG(
  "happy indian family with luggage beside a clean white car ready for a road trip, bright daylight",
);

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] to-white pointer-events-none" />
        <div className="container-page relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-[#0F172A] mb-6">
            About Shree Vighnaharta Travels
          </h1>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Your trusted travel partner in Pune and across Maharashtra — offering
            clean cabs, professional drivers, and transparent pricing since day one.
          </p>
          <div className="relative mt-12 h-56 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-[#F1F5F9]">
            <SafeImage
              src={ABOUT_HERO}
              alt="Shree Vighnaharta Travels cab on a scenic Maharashtra highway"
              priority
              sizes="(max-width: 1024px) 100vw, 80rem"
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <SectionTitle
            title="Our Story"
            subtitle="Driven by trust, powered by comfort."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <GlassCard className="p-12">
              <p className="text-[#64748B] leading-relaxed mb-6">
                Shree Vighnaharta Travels was founded with a simple mission: to make
                intercity travel safe, comfortable, and affordable for everyone.
                Whether it&rsquo;s a spiritual trip to Shirdi, a weekend getaway to
                Lonavala, or a corporate transfer to Pune Airport — we&rsquo;ve got you
                covered.
              </p>
              <p className="text-[#64748B] leading-relaxed">
                With over 15 years on the road, more than 1 lakh trips completed,
                and a fleet of 50+ well-maintained vehicles, we&rsquo;re the name Pune
                trusts for outstation tours, airport transfers, pilgrimage cabs, and
                group travel.
              </p>
            </GlassCard>
            <div className="relative h-72 lg:h-[420px] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-[#F1F5F9]">
              <SafeImage
                src={STORY_IMAGE}
                alt="Passengers travelling with Shree Vighnaharta Travels"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <GlassCard className="p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-[#0F172A] mb-1">4.9★ Rated</h3>
              <p className="text-[#64748B] text-sm">Trusted by thousands of happy customers across Maharashtra.</p>
            </GlassCard>
            <GlassCard className="p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-[#0F172A] mb-1">24/7 Service</h3>
              <p className="text-[#64748B] text-sm">Book anytime, travel anytime. We never sleep so you can rest easy.</p>
            </GlassCard>
            <GlassCard className="p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-[#0F172A] mb-1">50+ Vehicles</h3>
              <p className="text-[#64748B] text-sm">From sedans and SUVs to 17-seater Tempo Travellers.</p>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="container-page text-center">
          <SectionTitle title="Meet the Owner" subtitle="Jay Sevalal" />
          <GlassCard className="max-w-md mx-auto p-8 rounded-2xl flex flex-col items-center gap-4 border border-[#E2E8F0] shadow-sm">
            <div className="w-20 h-20 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue-light text-3xl mb-2">
              JS
            </div>
            <h3 className="font-display font-bold text-[#0F172A]">Jay Sevalal</h3>
            <p className="text-[#64748B] text-sm">Founder & Owner</p>
            <div className="flex gap-3 mt-4">
              <a href="tel:9049710195" className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors">
                <Phone className="w-4 h-4 text-brand-blue" />
                9049710195
              </a>
              <a href="mailto:shivampawar44330j@gmail.com" className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors">
                <Mail className="w-4 h-4 text-brand-blue" />
                Email
              </a>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="py-16 text-center">
        <AnimatedButton variant="gold" size="lg" href="/book">
          Book Your Ride
        </AnimatedButton>
      </section>
    </div>
  );
}
