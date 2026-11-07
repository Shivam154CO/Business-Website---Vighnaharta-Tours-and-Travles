"use client";

import { useState } from "react";
import { FLEET } from "@/constants/fleet";
import { SITE } from "@/constants/site";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, MapPin, Users, Car, Bus, MessageCircle } from "lucide-react";

const STEPS = ["Trip Details", "Vehicle Selection", "Passenger Info", "Confirm"];

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    passengers: "1-4",
    vehicleId: "" as string,
  });

  const vehicle = FLEET.find((v) => v.id === form.vehicleId);
  const progress = ((step + 1) / STEPS.length) * 100;

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="flex flex-col flex-1">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[#0F172A] mb-3">Book Your Ride</h1>
            <p className="text-[#64748B]">Simple, transparent, instant confirmation.</p>
          </div>

          <ol className="flex items-start mb-8">
            {STEPS.map((s, i) => (
              <li key={s} className={`flex items-start ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                <div className="flex flex-col items-center gap-2 shrink-0 w-16 sm:w-24">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors
                    ${i < step ? "bg-brand-blue text-white" : i === step ? "bg-accent-gold text-white" : "bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B]"}
                  `}>
                    {i + 1}
                  </div>
                  <span className={`text-[11px] sm:text-sm font-body text-center leading-tight ${i <= step ? "text-[#0F172A]" : "text-[#64748B]"}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-[2px] mt-4 ${i < step ? "bg-brand-blue" : "bg-[#E2E8F0]"}`} />
                )}
              </li>
            ))}
          </ol>

          <div className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl h-2 overflow-hidden">
            <div className="h-full bg-brand-blue transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className={step === 0 ? "block" : "hidden"}>
            <GlassCard className="p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
              <h2 className="font-display font-bold text-[#0F172A] text-xl mb-6">Trip Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-[#64748B] uppercase">Pickup Location</label>
                  <div className="flex items-center gap-2 rounded bg-white border border-[#E2E8F0] px-3 py-2 focus-within:border-brand-blue focus-within:outline-none transition-colors">
                    <MapPin className="w-4 h-4 text-[#64748B]" />
                    <input
                      type="text"
                      className="bg-transparent flex-1 text-sm font-body text-[#0F172A] outline-none placeholder:text-[#64748B]"
                      placeholder="Pune, Maharashtra"
                      value={form.pickup}
                      onChange={(e) => setForm({ ...form, pickup: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-[#64748B] uppercase">Drop Location</label>
                  <div className="flex items-center gap-2 rounded bg-white border border-[#E2E8F0] px-3 py-2 focus-within:border-brand-blue focus-within:outline-none transition-colors">
                    <MapPin className="w-4 h-4 text-[#64748B]" />
                    <input
                      type="text"
                      className="bg-transparent flex-1 text-sm font-body text-[#0F172A] outline-none placeholder:text-[#64748B]"
                      placeholder="Shirdi, Maharashtra"
                      value={form.dropoff}
                      onChange={(e) => setForm({ ...form, dropoff: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-[#64748B] uppercase">Travel Date</label>
                  <div className="flex items-center gap-2 rounded bg-white border border-[#E2E8F0] px-3 py-2 focus-within:border-brand-blue focus-within:outline-none transition-colors">
                    <Calendar className="w-4 h-4 text-[#64748B]" />
                    <input
                      type="date"
                      className="bg-transparent flex-1 text-sm font-body text-[#0F172A] outline-none"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-[#64748B] uppercase">Passengers</label>
                  <div className="flex items-center gap-2 rounded bg-white border border-[#E2E8F0] px-3 py-2 focus-within:border-brand-blue focus-within:outline-none transition-colors">
                    <Users className="w-4 h-4 text-[#64748B]" />
                    <select
                      value={form.passengers}
                      onChange={(e) => setForm({ ...form, passengers: e.target.value })}
                      className="bg-transparent flex-1 text-sm font-body text-[#0F172A] outline-none"
                    >
                      {[
                        "1-4",
                        "5-6",
                        "7-8",
                        "9-13",
                        "14-17",
                      ].map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <AnimatedButton variant="gold" size="md" onClick={next} className="w-auto">
                  Next →
                </AnimatedButton>
              </div>
            </GlassCard>
          </div>

          <div className={step === 1 ? "block" : "hidden"}>
            <GlassCard className="p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
              <h2 className="font-display font-bold text-[#0F172A] text-xl mb-6">Select Vehicle</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {FLEET.map((v) => {
                  const selected = form.vehicleId === v.id;
                  const Icon = v.type === "tempo" ? Bus : Car;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setForm({ ...form, vehicleId: v.id })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all text-left ${
                        selected
                          ? "border-brand-blue bg-brand-blue/10 shadow-[0_0_20px_rgba(30,79,216,0.20)]"
                          : "border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1]"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-8 h-8 text-brand-blue" />
                        <div>
                          <div className="font-bold text-[#0F172A]">{v.name}</div>
                          <div className="text-xs font-mono text-[#64748B]">{v.seats + 1} seats</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-mono font-bold text-brand-blue">
                          {v.type === "tempo" ? `₹${v.packageRate} pkg` : `₹${v.ratePerKm}/km`}
                        </span>
                        <span className="text-xs text-[#64748B] font-mono">
                          {v.type === "tempo" ? (v.ac ? "AC" : "Non-AC") : `${v.minKm} km`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between">
                <AnimatedButton variant="ghost" size="md" onClick={back} className="w-auto">
                  ← Back
                </AnimatedButton>
                <AnimatedButton
                  variant="blue"
                  size="md"
                  disabled={!form.vehicleId}
                  onClick={next}
                  className="w-auto"
                >
                  Next →
                </AnimatedButton>
              </div>
            </GlassCard>
          </div>

          <div className={step === 2 ? "block" : "hidden"}>
            <GlassCard className="p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
              <h2 className="font-display font-bold text-[#0F172A] text-xl mb-6">Passenger Information</h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-[#64748B] uppercase">Full Name</label>
                  <input type="text" className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:border-brand-blue focus:outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-[#64748B] uppercase">Phone Number</label>
                  <input type="tel" className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:border-brand-blue focus:outline-none transition-colors" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <AnimatedButton variant="ghost" size="md" onClick={back} className="w-auto">
                  ← Back
                </AnimatedButton>
                <AnimatedButton variant="blue" size="md" onClick={next} className="w-auto">
                  Next →
                </AnimatedButton>
              </div>
            </GlassCard>
          </div>

          <div className={step === 3 ? "block" : "hidden"}>
            <GlassCard className="p-8 rounded-xl border border-[#E2E8F0] shadow-sm text-center">
              <h2 className="font-display font-bold text-[#0F172A] text-xl mb-6">Confirm Booking</h2>
              <div className="space-y-4 text-sm text-[#64748B] mb-8">
                <div className="flex justify-between text-[#0F172A]">
                  <span>Route</span>
                  <span>{form.pickup} → {form.dropoff}</span>
                </div>
                <div className="flex justify-between text-[#0F172A]">
                  <span>Date</span>
                  <span>{form.date || "Not selected"}</span>
                </div>
                <div className="flex justify-between text-[#0F172A]">
                  <span>Passengers</span>
                  <span>{form.passengers}</span>
                </div>
                {vehicle && (
                  <>
                    <div className="flex justify-between text-[#0F172A]">
                      <span>Vehicle</span>
                      <span>{vehicle.name}</span>
                    </div>
                    <div className="flex justify-between text-[#0F172A]">
                      <span>Estimated Rate</span>
                      <span className="font-mono font-bold">
                        {vehicle.type === "tempo" ? `₹${vehicle.packageRate} pkg` : `₹${vehicle.ratePerKm}/km`}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="space-y-3">
                <AnimatedButton variant="gold" size="lg" className="w-full">
                  Book Now — Pay on Ride
                </AnimatedButton>
                <a
                  href={`${SITE.whatsapp}?text=Booking%20request:%20${form.pickup}%20to%20${form.dropoff}%20on%20${form.date}%20for%20${form.passengers}%20passengers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#E2E8F0] text-sm font-body font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors w-full"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" /> Or message us on WhatsApp
                </a>
              </div>
              <div className="mt-6">
                <AnimatedButton variant="ghost" size="md" onClick={back} className="w-auto mx-auto">
                  ← Back
                </AnimatedButton>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}