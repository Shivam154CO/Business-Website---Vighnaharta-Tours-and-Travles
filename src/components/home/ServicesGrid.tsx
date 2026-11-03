"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICES } from "@/constants/routes";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { Car, Plane, Landmark, Briefcase, MapPin, Users, ArrowRight } from "lucide-react";

const ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  outstation: Car,
  airport: Plane,
  pilgrimage: Landmark,
  corporate: Briefcase,
  local: MapPin,
  group: Users,
};

export function ServicesGrid() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="container-page relative z-10">
        <SectionTitle
          title="Our Services"
          subtitle="Reliable cabs for every journey across Maharashtra."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.id] || MapPin;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="group h-full min-w-0"
              >
                <GlassCard
                  padded={false}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] transition-all duration-300 hover:border-brand-blue"
                >
                  <div className="relative h-52 shrink-0 overflow-hidden bg-[#F1F5F9]">
                    <ZoomableImage
                      src={service.image}
                      alt={service.title}
                      priority={service.id === "outstation"}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/75 via-[#0F172A]/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E2E8F0] bg-white/95 text-brand-blue shadow-lg backdrop-blur-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 left-4 text-lg font-display font-bold text-white drop-shadow-sm">
                      {service.title}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-[#64748B]">
                      {service.description}
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-light"
                    >
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
