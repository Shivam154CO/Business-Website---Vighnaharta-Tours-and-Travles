"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICES } from "@/constants/routes";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
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
    <section className="relative overflow-hidden py-32 bg-white">
      <div className="container-page relative z-10">
        <SectionTitle
          title="Our Premium Services"
          subtitle="Tailored travel solutions designed for your comfort and safety."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.id] || MapPin;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <SpotlightCard className="h-full p-0 overflow-hidden bg-white border-gray-100 flex flex-col hover:border-brand-blue/20 transition-colors">
                  <div className="relative h-60 overflow-hidden bg-gray-50">
                    <ZoomableImage
                      src={service.image}
                      alt={service.title}
                      priority={service.id === "outstation"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-lg text-brand-blue backdrop-blur-md">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="text-xl font-display font-bold text-[#0F172A] mb-3 group-hover:text-brand-blue transition-colors">
                      {service.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-[#64748B]">
                      {service.description}
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue transition-all hover:gap-3"
                    >
                      View Details 
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
