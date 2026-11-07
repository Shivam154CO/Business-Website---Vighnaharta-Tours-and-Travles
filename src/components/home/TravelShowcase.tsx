"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, Compass, MapPinned, ShieldCheck, Sparkles } from "lucide-react";

const cards = [
  {
    icon: Compass,
    title: "Smart route planning",
    text: "We map the best route based on time, traffic, and comfort so every journey feels effortless.",
    href: "/services",
    span: "lg:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Safety first",
    text: "Every ride is backed by vetted drivers, monitored standards, and transparent support.",
    href: "/about",
    span: "",
  },
  {
    icon: Clock3,
    title: "On-time reliability",
    text: "No last-minute surprises — we plan, confirm, and keep your schedule on track.",
    href: "/about",
    span: "",
  },
  {
    icon: MapPinned,
    title: "Made for Maharashtra",
    text: "Pilgrimage tours, airport rides, family trips, and weekend escapes are all covered.",
    href: "/packages",
    span: "lg:col-span-2",
  },
];

export function TravelShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-20 md:py-28">
      <div className="container-page relative z-10">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-blue">
            Premium experience
          </div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-[#0F172A] md:text-5xl">
            Designed for smoother, calmer travel.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, text, href, span }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={span}
            >
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-[#0F172A]">{title}</h3>
                <p className="text-sm leading-6 text-[#475569]">{text}</p>
                <div className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[#0F172A] p-6 text-white shadow-lg md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">
                <Sparkles className="h-3.5 w-3.5" />
                Travel better
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                From city rides to pilgrimage journeys.
              </h3>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Enquire now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
