import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { SERVICES } from "@/constants/routes";
import { Car, Plane, Landmark, Briefcase, MapPin, Users } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  outstation: Car,
  airport: Plane,
  pilgrimage: Landmark,
  corporate: Briefcase,
  local: MapPin,
  group: Users,
};

const DETAILS: Record<string, string[]> = {
  outstation: ["Pune to Shirdi, Mumbai, Goa, Nashik", "One-way & round-trip options", "Experienced outstation drivers", "Transparent per-km pricing"],
  airport: ["Pune Airport (PNQ) pickups & drops", "Flight tracking included", "Meet & greet service", "Luggage assistance"],
  pilgrimage: ["Shirdi Sai Baba Temple", "Nashik Trimbakeshwar", "Custom pilgrimage itineraries", "Senior-citizen friendly"],
  corporate: ["Employee pick-up & drop", "Monthly corporate packages", "GST invoices", "Dedicated account manager"],
  local: ["Hourly city rentals", "Point-to-point city rides", "Event & wedding transport", "Minimum 3 hours booking"],
  group: ["13-seater Tempo (Non-AC)", "17-seater Tempo (AC)", "School & college trips", "Family outings"],
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="py-20">
        <div className="container-page text-center">
          <SectionTitle title="Our Services" subtitle="Everything you need for a smooth journey." />
        </div>
        <div className="container-page mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const Icon = ICONS[service.id];
              return (
                <GlassCard key={service.id} padded={false} className="flex flex-col rounded-xl border border-[#E2E8F0] shadow-sm hover:border-brand-blue transition-all duration-300 group overflow-hidden">
                  <div className="relative h-48 shrink-0 overflow-hidden bg-[#F1F5F9]">
                    <ZoomableImage
                      src={service.image}
                      alt={service.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/75 via-[#0F172A]/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E2E8F0] bg-white/95 text-brand-blue shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 left-4 z-10 text-lg font-display font-bold text-white drop-shadow-sm">
                      {service.title}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <p className="text-sm text-[#64748B] leading-relaxed mb-6">{service.description}</p>
                    <h4 className="text-sm font-body font-semibold text-brand-blue mb-3 uppercase tracking-wider">What&rsquo;s included</h4>
                    <ul className="space-y-3 text-sm text-[#64748B]">
                      {DETAILS[service.id].map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-[6px]" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-[#E2E8F0] bg-[#F8FAFC] text-center">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-[#0F172A] mb-4">Ready to Book?</h2>
            <p className="text-[#64748B] mb-8">Choose your service and get an instant fare estimate.</p>
            <AnimatedButton variant="gold" size="lg" href="/book">
              Book Now
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
