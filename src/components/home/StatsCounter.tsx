"use client";

import { useEffect, useRef, useState } from "react";
import { Car, Users, Award, Star } from "lucide-react";
import { motion } from "framer-motion";

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
    const duration = 2000;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay((target * eased).toFixed(decimals) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, stat.value]);

  const Icon = stat.Icon;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm group hover:shadow-md transition-shadow"
    >
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 w-12 h-12 rounded-2xl bg-brand-blue/5 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-display text-5xl font-black text-[#0F172A] mb-2">
          {display}
        </span>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">{stat.label}</p>
      </div>
    </motion.div>
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
    <section className="relative bg-[#F8FAFC] py-32 overflow-hidden border-y border-gray-100">
      <div className="container-page relative z-10">
        <div ref={ref} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} start={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
