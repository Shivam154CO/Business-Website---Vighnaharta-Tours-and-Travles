"use client";

import { Star, Award, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="container-page relative z-20 -mt-10 md:-mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="border border-gray-100 bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)]"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
          {TRUST.map((item, i) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.label} 
                className="flex flex-col items-center gap-2 px-4 first:divide-none border-none lg:border-solid"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-1">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-display font-black text-[#0F172A]">{item.value}</div>
                  <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
