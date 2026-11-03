"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { SITE } from "@/constants/site";
import { IMG } from "@/constants/routes";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const CONTACT_HERO = IMG(
  "pune city road with cars and green trees, modern buildings, bright daylight, travel photography",
  "landscape_16_9",
);

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="py-20">
        <div className="container-page text-center">
          <SectionTitle title="Contact Us" subtitle="We&rsquo;d love to hear from you." />
          <div className="relative mt-10 h-48 md:h-64 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-[#F1F5F9]">
            <SafeImage
              src={CONTACT_HERO}
              alt="Shree Vighnaharta Travels service area in Pune"
              priority
              sizes="(max-width: 1024px) 100vw, 80rem"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <GlassCard className="p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
              <h3 className="font-display font-bold text-[#0F172A] text-xl mb-6">Get in Touch</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] mb-1 uppercase">Full Name</label>
                  <input type="text" className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:border-brand-blue focus:outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] mb-1 uppercase">Email</label>
                  <input type="email" className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:border-brand-blue focus:outline-none transition-colors" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] mb-1 uppercase">Phone</label>
                  <input type="tel" className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:border-brand-blue focus:outline-none transition-colors" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] mb-1 uppercase">Message</label>
                  <textarea rows={4} className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:border-brand-blue focus:outline-none transition-colors" placeholder="Tell us about your trip..." />
                </div>
                <AnimatedButton variant="gold" size="md" className="w-full" type="submit">
                  Send Message
                </AnimatedButton>
              </form>
            </GlassCard>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard className="p-8 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col gap-6">
                <h3 className="font-display font-bold text-[#0F172A] text-xl mb-2">Visit / Reach Us</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-[6px]" />
                  <div className="text-sm text-[#64748B]">
                    <p className="text-[#0F172A] font-body">Pune, Maharashtra, India</p>
                    <p className="text-[#64748B]">Shree Vighnaharta Travels Office</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-8 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col gap-6">
                <h3 className="font-display font-bold text-[#0F172A] text-xl mb-2">Call Us</h3>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-blue shrink-0 mt-[6px]" />
                  <div className="text-sm text-[#64748B]">
                    <a href={`tel:${SITE.phone}`} className="text-[#0F172A] font-body hover:text-brand-blue transition-colors">{SITE.phone}</a>
                    <p className="text-[#64748B] mt-[2px]">24/7 availability</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-8 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col gap-6">
                <h3 className="font-display font-bold text-[#0F172A] text-xl mb-2">Email Us</h3>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-blue shrink-0 mt-[6px]" />
                  <div className="text-sm text-[#64748B]">
                    <a href={`mailto:${SITE.email}`} className="text-[#0F172A] font-body hover:text-brand-blue transition-colors">{SITE.email}</a>
                    <p className="text-[#64748B] mt-[2px]">We respond within 2 hours</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-8 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col gap-6">
                <h3 className="font-display font-bold text-[#0F172A] text-xl mb-2">Service Hours</h3>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-blue shrink-0 mt-[6px]" />
                  <div className="text-sm text-[#64748B]">
                    <p className="text-[#0F172A] font-body">24 Hours</p>
                    <p className="text-[#64748B] mt-[2px]">7 days a week</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-[#E2E8F0] bg-[#F8FAFC] text-center">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-[#0F172A] mb-4">Prefer WhatsApp?</h2>
            <p className="text-[#64748B] mb-8">Send us a quick message and we&rsquo;ll reply instantly.</p>
            <AnimatedButton variant="gold" size="lg" href={SITE.whatsapp}>
              Chat on WhatsApp
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
