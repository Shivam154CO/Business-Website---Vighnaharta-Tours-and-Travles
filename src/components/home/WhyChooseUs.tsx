"use client";

import { motion } from "framer-motion";
import { Shield, Star, Headset, Truck, Clock, Tag } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const FEATURES = [
  { icon: Shield, label: "Verified Drivers", text: "Background-checked, experienced professionals." },
  { icon: Star, label: "4.9 Rating", text: "Trusted by thousands of happy customers." },
  { icon: Headset, label: "24/7 Support", text: "Round-the-clock assistance for every ride." },
  { icon: Truck, label: "On-Time Pickup", text: "Punctual arrivals, every single time." },
  { icon: Clock, label: "Instant Booking", text: "Confirm your ride in under 2 minutes." },
  { icon: Tag, label: "Transparent Pricing", text: "No hidden charges, pay what you see." },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <GlassCard className="p-5 rounded-xl text-center border border-[#E2E8F0] hover:border-brand-blue transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-[#0F172A] text-sm mb-1">{feature.label}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{feature.text}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
