"use client";

import { useState } from "react";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const FLEET_TYPES = [
  { key: "all", label: "All Vehicles" },
  { key: "sedan", label: "Sedan" },
  { key: "suv", label: "SUV" },
  { key: "luxury", label: "Luxury" },
  { key: "tempo", label: "Tempo" },
] as const;

type FleetTabKey = (typeof FLEET_TYPES)[number]["key"];

type FleetPreviewProps = {
  vehicles: Array<{
    id: string;
    name: string;
    type: "sedan" | "suv" | "luxury" | "tempo";
    seats: number;
    luggage: number;
    ac: boolean;
    ratePerKm: number;
    minKm: number;
    features: string[];
    extraFeatures: string[];
    badge: string;
    badgeColor: string;
    image: string;
    packageRate?: number;
  }>;
};

export function FleetPreview({ vehicles }: FleetPreviewProps) {
  const [tab, setTab] = useState<FleetTabKey>("all");

  const filtered = tab === "all" ? vehicles : vehicles.filter((v) => v.type === tab);

  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden">
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
