import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { IMG } from "@/constants/routes";
import { Check } from "lucide-react";

const CORPORATE_WHY = IMG(
  "business professionals in formal wear standing beside a clean white sedan outside a modern glass office building, daylight",
);

const CORPORATE_PLANS = IMG(
  "corporate employee shuttle cabs lined up outside a modern office tower, daytime",
);

export default function CorporatePage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="py-20">
        <div className="container-page text-center">
          <SectionTitle title="Corporate Travel" subtitle="Reliable transport for your team." />
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <GlassCard padded={false} className="rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div className="relative h-44 overflow-hidden bg-[#F1F5F9]">
                <SafeImage
                  src={CORPORATE_WHY}
                  alt="Business professionals with a corporate cab"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
              </div>
              <div className="p-10">
              <h3 className="font-display font-bold text-[#0F172A] text-xl mb-6">Why Companies Choose Us</h3>
              <ul className="space-y-4 text-sm text-[#64748B]">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-[3px]">
                    <Check className="w-4 h-4" />
                  </span>
                  GST-compliant invoices for every trip
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-[3px]">
                    <Check className="w-4 h-4" />
                  </span>
                  Dedicated account manager
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-[3px]">
                    <Check className="w-4 h-4" />
                  </span>
                  Monthly employee pick-up & drop plans
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-[3px]">
                    <Check className="w-4 h-4" />
                  </span>
                  Client pickup & airport transfers
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-[3px]">
                    <Check className="w-4 h-4" />
                  </span>
                  Event & conference transport
                </li>
              </ul>
              </div>
            </GlassCard>

            <GlassCard padded={false} className="rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div className="relative h-44 overflow-hidden bg-[#F1F5F9]">
                <SafeImage
                  src={CORPORATE_PLANS}
                  alt="Corporate employee shuttle cabs outside an office"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
              </div>
              <div className="p-10">
              <h3 className="font-display font-bold text-[#0F172A] text-xl mb-6">Corporate Plans</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-[#E2E8F0]">
                  <h4 className="font-bold text-[#0F172A]">Silver</h4>
                  <p className="text-sm text-[#64748B] mt-1">Up to 50 rides/month</p>
                  <p className="text-xl font-mono font-bold text-brand-blue mt-3">₹11/km</p>
                </div>
                <div className="p-4 rounded-xl border border-brand-blue/30 bg-brand-blue/5">
                  <h4 className="font-bold text-[#0F172A]">Gold</h4>
                  <p className="text-sm text-[#64748B] mt-1">Up to 150 rides/month</p>
                  <p className="text-xl font-mono font-bold text-brand-blue mt-3">₹10/km</p>
                </div>
                <div className="p-4 rounded-xl border border-[#E2E8F0]">
                  <h4 className="font-bold text-[#0F172A]">Platinum</h4>
                  <p className="text-sm text-[#64748B] mt-1">250+ rides/month</p>
                  <p className="text-xl font-mono font-bold text-brand-blue mt-3">Custom pricing</p>
                </div>
              </div>
              <div className="mt-8">
                <AnimatedButton variant="gold" size="md" className="w-full" href="/contact">
                  Enquire Now
                </AnimatedButton>
              </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}
