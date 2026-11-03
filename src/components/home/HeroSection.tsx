
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Navigation, ShieldCheck, Sparkles } from "lucide-react";
import { SITE } from "@/constants/site";
import { HERO_BACKGROUND } from "@/constants/routes";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative isolate flex min-h-[480px] items-center overflow-hidden bg-[#0F172A] sm:min-h-[540px] lg:min-h-[580px]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/85 via-[#0F172A]/60 to-[#0F172A]/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-page mx-auto flex w-full flex-col items-center justify-center py-8 text-center sm:py-10 lg:py-12">

        {/* Support Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur-md sm:text-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]" />
          </span>
          24/7 Customer Support
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-3 max-w-5xl text-balance text-[2.5rem] font-display font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem]"
        >
          Ride in Comfort,
          <br className="hidden sm:block" />
          <span className="text-[#7CA0FF]">Travel with Trust.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-lg md:text-xl"
        >
          Clean cabs, professional drivers, and transparent pricing for
          outstation tours, airport transfers, pilgrimage trips, and
          group travel across Maharashtra.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex w-full max-w-xl flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3"
        >
          <button
            type="button"
            onClick={() => router.push("/book")}
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#EA8C00] hover:shadow-xl sm:w-auto sm:text-base"
          >
            Book Your Ride
            <ArrowRight className="h-5 w-5" />
          </button>

          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 sm:w-auto sm:text-base"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.173-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
            </svg>
            WhatsApp Us
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-8 sm:gap-x-8"
        >
          {[
            { Icon: Navigation, label: "GPS Tracked" },
            { Icon: ShieldCheck, label: "Verified Drivers" },
            { Icon: Sparkles, label: "Sanitised Interiors" },
            { Icon: Clock, label: "On-Time Guarantee" },
          ].map(({ Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 text-xs font-medium text-white/85 sm:text-sm"
            >
              <Icon className="h-4 w-4 text-[#7CA0FF]" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
