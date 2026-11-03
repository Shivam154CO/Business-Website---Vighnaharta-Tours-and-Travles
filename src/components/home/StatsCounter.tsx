"use client";

import { useEffect, useRef, useState } from "react";
import { Car, Users, Award, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface StatItem {
  label: string;
  value: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const STATS: StatItem[] = [
  { label: "Years of Experience", value: "15+", Icon: Award },
  { label: "Happy Customers", value: "1L+", Icon: Users },
  { label: "Vehicles in Fleet", value: "50+", Icon: Car },
  { label: "Customer Rating", value: "4.9", Icon: Star },
];

function getInitialDisplay(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return value;
  const suffix = match[2] || "";
  return `0${suffix}`;
}

function StatCard({ stat, start }: { stat: StatItem; start: boolean }) {
  const [display, setDisplay] = useState(() => getInitialDisplay(stat.value));

  useEffect(() => {
    if (!start) return;

    const match = stat.value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const target = parseFloat(match[1]);
    const decimals = (match[1].split(".")[1] || "").length;
    const suffix = match[2] || "";
    const duration = 1200;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay((target * eased).toFixed(decimals) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, stat.value]);

  const Icon = stat.Icon;
  return (
    <GlassCard className="rounded-xl border border-[#E2E8F0] p-6 text-center shadow-sm group md:p-8">
      <div className="mb-4 flex items-center justify-center gap-2">
        <Icon className="h-5 w-5 text-brand-blue" />
        <span className="font-mono text-4xl font-bold text-[#0F172A] md:text-5xl">{display}</span>
      </div>
      <p className="text-sm text-[#64748B]">{stat.label}</p>
    </GlassCard>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-[#E2E8F0] bg-[#F8FAFC] py-20 md:py-24">
      <div className="container-page relative z-10">
        <div ref={ref} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} start={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
