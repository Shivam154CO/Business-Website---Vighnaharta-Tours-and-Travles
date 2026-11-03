"use client";

import { Star, Award, Users, Clock } from "lucide-react";

interface TrustItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  label: string;
}

const TRUST: TrustItem[] = [
  { icon: Star, value: "4.9", label: "Customer Rating" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Users, value: "1L+", label: "Trips Completed" },
  { icon: Clock, value: "24/7", label: "Support" },
];

export function TrustStrip() {
  return (
    <div className="container-page relative z-20 -mt-8 md:-mt-12">
      <div className="border border-[#E2E8F0] bg-white rounded-2xl p-4 md:p-6 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {TRUST.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-blue" />
                </div>
                <div className="text-xl font-mono font-bold text-[#0F172A]">{item.value}</div>
                <div className="text-xs text-[#64748B] uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
