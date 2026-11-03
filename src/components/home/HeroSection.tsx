"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Clock, ArrowRight } from "lucide-react";
import { SITE } from "@/constants/site";
import { HERO_BACKGROUND } from "@/constants/routes";

const DESTINATIONS = [
  "Shirdi",
  "Mahabaleshwar",
  "Lonavala",
  "Goa",
  "Nashik",
  "Pune Airport",
];

const PASSENGER_OPTIONS = ["1-4", "5-6", "7-8", "9-13", "14-17"];

export function HeroSection() {
  const router = useRouter();
  const [form, setForm] = useState({
    from: "Pune",
    to: DESTINATIONS[0],
    date: "",
    passengers: "1-4",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(form);
    router.push(`/book?${params.toString()}`);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#0F172A]">
      {/* Background: image fallback + looping video */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
          aria-hidden="true"
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={HERO_BACKGROUND}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/75 to-[#0F172A]/95" />
      </div>

      <div className="relative z-10 container-page py-16 md:py-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur mb-6 text-sm font-body font-medium text-white"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
          </span>
          24/7 Customer Support
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight max-w-3xl"
        >
          Ride in Comfort,{" "}
          <span className="text-[#7CA0FF]">Travel with Trust.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed"
        >
          Clean cabs, professional drivers, and transparent pricing for outstation
          tours, airport transfers, pilgrimage trips, and group travel across
          Maharashtra.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full">
          <button
            type="button"
            onClick={() => router.push("/book")}
            className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent-gold text-white text-base font-body font-semibold hover:bg-orange-500 transition-colors"
          >
            Book Your Ride <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/30 bg-white/5 backdrop-blur text-sm font-body font-semibold text-white hover:bg-white/15 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Booking Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-[#E2E8F0] p-5 sm:p-6 text-left"
        >
          <h3 className="mb-5 text-lg font-display font-bold text-[#0F172A]">Book Your Ride</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2 min-w-0">
                <label htmlFor="hero-from" className="text-xs font-mono text-[#64748B] uppercase">From</label>
                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#E2E8F0] px-3 py-2.5 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/15 transition-colors">
                  <MapPin className="w-4 h-4 shrink-0 text-[#64748B]" />
                  <input
                    id="hero-from"
                    type="text"
                    value={form.from}
                    onChange={(e) => setForm({ ...form, from: e.target.value })}
                    placeholder="Pune"
                    className="w-full min-w-0 bg-transparent text-sm font-body text-[#0F172A] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-0">
                <label htmlFor="hero-to" className="text-xs font-mono text-[#64748B] uppercase">To</label>
                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#E2E8F0] px-3 py-2.5 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/15 transition-colors">
                  <MapPin className="w-4 h-4 shrink-0 text-[#64748B]" />
                  <select
                    id="hero-to"
                    value={form.to}
                    onChange={(e) => setForm({ ...form, to: e.target.value })}
                    className="w-full min-w-0 bg-transparent text-sm font-body text-[#0F172A] outline-none"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-0">
                <label htmlFor="hero-date" className="text-xs font-mono text-[#64748B] uppercase">Date</label>
                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#E2E8F0] px-3 py-2.5 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/15 transition-colors">
                  <Calendar className="w-4 h-4 shrink-0 text-[#64748B]" />
                  <input
                    id="hero-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full min-w-0 bg-transparent text-sm font-body text-[#0F172A] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-0">
                <label htmlFor="hero-passengers" className="text-xs font-mono text-[#64748B] uppercase">Passengers</label>
                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#E2E8F0] px-3 py-2.5 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/15 transition-colors">
                  <Users className="w-4 h-4 shrink-0 text-[#64748B]" />
                  <select
                    id="hero-passengers"
                    value={form.passengers}
                    onChange={(e) => setForm({ ...form, passengers: e.target.value })}
                    className="w-full min-w-0 bg-transparent text-sm font-body text-[#0F172A] outline-none"
                  >
                    {PASSENGER_OPTIONS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 w-full min-h-[52px] inline-flex items-center justify-center gap-2 rounded-full bg-accent-gold text-white text-base font-body font-semibold hover:bg-orange-500 transition-colors"
            >
              Get Fare Estimate <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-2 text-white/70 text-xs font-mono">
          <Clock className="w-4 h-4 text-[#7CA0FF]" />
          <span>24/7 Service &nbsp;•&nbsp; Instant Confirmation</span>
        </div>
      </div>
    </section>
  );
}
