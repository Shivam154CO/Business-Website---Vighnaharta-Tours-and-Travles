"use client";

import { useState } from "react";
import { FLEET, FLEET_TYPES } from "@/constants/fleet";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

type FleetTabKey = (typeof FLEET_TYPES)[number]["key"];

export function FleetPreview() {
  const [tab, setTab] = useState<FleetTabKey>("all");

  const filtered =
    tab === "all" ? FLEET : FLEET.filter((v) => v.type === tab);

  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-[100px] pointer-events-none" />
      <div className="container-page relative z-10">
        <SectionTitle
          title="Our Fleet"
          subtitle="Well-maintained vehicles for every group size and budget."
        />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FLEET_TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-pressed={tab === t.key}
              className={`px-5 py-2.5 min-h-11 rounded-full text-sm font-body font-medium transition-all ${
                tab === t.key
                  ? "bg-brand-blue text-white shadow-[0_0_20px_rgba(30,79,216,0.35)]"
                  : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#64748B]">
            No vehicles available in this category.
          </div>
        )}
      </div>
    </section>
  );
}
