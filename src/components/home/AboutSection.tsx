"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, CarFront, MapPinned, ShieldCheck } from "lucide-react";
import { SITE } from "@/constants/site";

const highlights = [
  {
    icon: CarFront,
    title: "Comfort-first rides",
    text: "A premium fleet designed for family outings, pilgrimages, airport transfers, and business travel.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & reliable",
    text: "Verified drivers, well-maintained vehicles, and a service culture built on trust and punctuality.",
  },
  {
    icon: MapPinned,
    title: "Across Maharashtra",
    text: "From Pune city routes to spiritual destinations and scenic getaways across the state.",
  },
];

const serviceTags = [
  "Family trip support",
  "Pilgrimage travel",
  "Airport transfers",
  "Corporate bookings",
];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container-page relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-blue">
              About Us
            </div>

            <h2 className="text-3xl font-display font-bold tracking-tight text-[#0F172A] md:text-5xl">
              Trusted travel for journeys that matter.
            </h2>

            <p className="text-base leading-7 text-[#475569] md:text-lg">
              {SITE.name} is a Pune-based mobility partner for families, pilgrims,
              business travellers, and weekend explorers. We bring together
              dependable cabs, experienced drivers, transparent service, and a
              stress-free experience from pickup to drop.
            </p>

            <div className="flex flex-wrap gap-3">
              {serviceTags.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-medium text-[#334155] shadow-sm"
                >
                  <BadgeCheck className="h-4 w-4 text-brand-blue" />
                  {item}
                </span>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue-light"
            >
              Know more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-4"
          >
            {highlights.map(({ icon: Icon, title, text }, index) => (
              <div
                key={title}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                    0{index + 1}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0F172A]">{title}</h3>
                </div>
                <p className="text-sm leading-6 text-[#475569]">{text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
