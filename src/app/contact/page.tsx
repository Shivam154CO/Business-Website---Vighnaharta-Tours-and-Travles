"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";
import { SITE } from "@/constants/site";
import { IMG } from "@/constants/routes";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

const CONTACT_HERO = IMG(
  "pune city road with cars and green trees, modern buildings, bright daylight, travel photography",
  "landscape_16_9",
);

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setError("Name, phone and message are required.");
      return;
    }
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          source: "website-contact",
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message.");
      }

      const text = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`;
      window.open(`${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to send message.");
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", message: "" });
    setError("");
    setSent(false);
  };

  return (
    <div className="flex flex-col flex-1">
      <section className="py-20">
        <div className="container-page text-center">
          <SectionTitle title="Contact Us" subtitle="We&rsquo;d love to hear from you." />
          <div className="relative mt-10 h-48 md:h-64 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-[#F1F5F9]">
            <SafeImage
              src={CONTACT_HERO}
              alt="Morya Travels service area in Pune"
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
              {sent ? (
                <div className="text-center py-4">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="text-sm text-[#64748B] mb-6">
                    Thanks, {form.name || "there"}! We have opened WhatsApp with your
                    message. Send it across and we&rsquo;ll reply shortly.
                  </p>
                  <AnimatedButton variant="ghost" size="md" className="w-full" onClick={resetForm}>
                    Send another message
                  </AnimatedButton>
                </div>
              ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] mb-1 uppercase">Full Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:border-brand-blue focus:outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] mb-1 uppercase">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:border-brand-blue focus:outline-none transition-colors" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] mb-1 uppercase">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:border-brand-blue focus:outline-none transition-colors" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] mb-1 uppercase">Message</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:border-brand-blue focus:outline-none transition-colors" placeholder="Tell us about your trip..." />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <AnimatedButton variant="gold" size="md" className="w-full" type="submit">
                  Send Message
                </AnimatedButton>
              </form>
              )}
            </GlassCard>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard className="p-8 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col gap-6">
                <h3 className="font-display font-bold text-[#0F172A] text-xl mb-2">Visit / Reach Us</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-[6px]" />
                  <div className="text-sm text-[#64748B]">
                    <p className="text-[#0F172A] font-body">{SITE.address}</p>
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
