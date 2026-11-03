"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { FLEET, FLEET_TYPES } from "@/constants/fleet";

type FleetTabKey = (typeof FLEET_TYPES)[number]["key"];

function rateLabel(v: (typeof FLEET)[number]) {
  if (v.type === "tempo") return `₹${v.packageRate} pkg`;
  return `₹${v.ratePerKm}/km`;
}

function minLabel(v: (typeof FLEET)[number]) {
  if (v.type === "tempo") return v.ac ? "AC" : "Non-AC";
  return `${v.minKm} km`;
}

export default function FleetPage() {
  const [tab, setTab] = useState<FleetTabKey>("all");

  const filtered =
    tab === "all" ? FLEET : FLEET.filter((v) => v.type === tab);

  return (
    <div className="flex flex-col flex-1">
      <section className="pt-20 pb-10">
        <div className="container-page">
          <SectionTitle title="Our Fleet" subtitle="Clean, well-maintained vehicles for every need." />
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {FLEET_TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                aria-pressed={tab === t.key}
                className={`px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all border ${
                  tab === t.key
                    ? "bg-brand-blue text-white border-brand-blue shadow-sm"
                    : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] hover:text-brand-blue"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vehicle) => (
              <GlassCard
                key={vehicle.id}
                padded={false}
                className="group flex flex-col h-full rounded-xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:border-brand-blue hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48 shrink-0 overflow-hidden bg-[#F1F5F9]">
                  <ZoomableImage
                    src={vehicle.image}
                    alt={`${vehicle.name} — ${vehicle.type}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-[#0F172A]/20" />
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur border border-[#E2E8F0] text-xs font-mono text-[#0F172A] shadow-sm">
                    {vehicle.seats + 1} <span className="text-[10px]">seats</span>
                  </span>
                  <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F172A]/90 backdrop-blur text-xs font-mono text-accent-gold shadow-sm">
                    {rateLabel(vehicle)}
                  </span>
                  <div className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F172A]/90 backdrop-blur text-xs font-mono text-white shadow-sm">
                    {minLabel(vehicle)}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold text-white" style={{ backgroundColor: vehicle.badgeColor }}>
                      {vehicle.badge}
                    </span>
                    <span className="text-xs text-[#64748B] capitalize">{vehicle.type}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#0F172A]">{vehicle.name}</h3>
                  <p className="mt-1 text-sm text-[#64748B]">{vehicle.luggage} luggage &nbsp;•&nbsp; {vehicle.ac ? "AC" : "Non-AC"}</p>
                  <div className="mt-4 mb-5 flex flex-wrap gap-2">
                    {vehicle.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] px-2 py-1 rounded bg-[#F1F5F9] font-mono text-[#64748B] border border-[#E2E8F0]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <AnimatedButton variant="gold" size="sm" className="w-full" href="/book">
                      Select Vehicle
                    </AnimatedButton>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
