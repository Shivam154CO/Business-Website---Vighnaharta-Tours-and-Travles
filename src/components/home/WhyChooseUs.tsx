"use client";

import { motion } from "framer-motion";
import { Shield, Star, Headset, Truck, Clock, Tag } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const FEATURES = [
  { 
    icon: Shield, 
    label: "Verified Drivers", 
    text: "Every driver undergoes rigorous background checks and training to ensure your safety.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
  { 
    icon: Star, 
    label: "4.9/5 Rating", 
    text: "Our commitment to excellence is reflected in thousands of 5-star reviews from happy travelers.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
  { 
    icon: Headset, 
    label: "24/7 Concierge", 
    text: "Round-the-clock support for all your booking queries and on-road assistance.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
  { 
    icon: Truck, 
    label: "Punctual Arrival", 
    text: "We value your time. Our drivers arrive at least 15 minutes before your scheduled pickup.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
  { 
    icon: Clock, 
    label: "Instant Booking", 
    text: "Book your premium ride in under 60 seconds with our streamlined digital platform.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
  { 
    icon: Tag, 
    label: "Fixed Pricing", 
    text: "No hidden charges or surge pricing. What you see is exactly what you pay.",
    color: "bg-brand-blue/5 text-brand-blue"
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="container-page relative z-10">
        <SectionTitle
          title="The Morya Advantage"
          subtitle="Setting the gold standard in premium travel services across Maharashtra."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SpotlightCard className="h-full border-gray-100 bg-white hover:border-brand-blue/20 transition-colors group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-[#0F172A] text-lg mb-3">{feature.label}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{feature.text}</p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
