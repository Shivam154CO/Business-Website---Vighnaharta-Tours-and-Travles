import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { IMG } from "@/constants/routes";
import { MapPin, Clock } from "lucide-react";

interface Package {
  name: string;
  route: string;
  distance: string;
  price: string;
  duration: string;
  highlights: string[];
  image: string;
}

const PACKAGES: Package[] = [
  {
    name: "Shirdi One-Day",
    route: "Pune → Shirdi → Pune",
    distance: "370 km",
    price: "₹2,999",
    duration: "1 day",
    highlights: ["Sai Baba Temple darshan", "Private sedan/SUV", "Driver allowance included"],
    image: IMG("shirdi sai baba temple town in india with devotees, warm daylight"),
  },
  {
    name: "Lonavala Weekend",
    route: "Pune → Lonavala → Pune",
    distance: "130 km",
    price: "₹1,799",
    duration: "1 night / 2 days",
    highlights: ["Tiger's Point & Lion's Point", "Bushi Dam & Lonavala lake", "13-seater Tempo option"],
    image: IMG("lonavala waterfall and green hills during monsoon in western ghats india"),
  },
  {
    name: "Goa Getaway",
    route: "Pune → Goa → Pune",
    distance: "860 km",
    price: "₹8,999",
    duration: "3 days / 2 nights",
    highlights: ["North & South Goa beaches", "17-seater AC Tempo", "Halal/Jain food stops on request"],
    image: IMG("goa beach with palm trees and golden sand at sunset"),
  },
  {
    name: "Nashik Trimbakeshwar",
    route: "Pune → Nashik → Pune",
    distance: "330 km",
    price: "₹3,499",
    duration: "1 day",
    highlights: ["Trimbakeshwar Jyotirlinga", "Sula Vineyards add-on", "Innova Crysta available"],
    image: IMG("nashik vineyard rows with grape farms in maharashtra countryside, sunny"),
  },
  {
    name: "Mahabaleshwar",
    route: "Pune → Mahabaleshwar → Pune",
    distance: "240 km",
    price: "₹2,499",
    duration: "1 night / 2 days",
    highlights: ["Venna Lake & Pratapgad", "Strawberry farms", "Sedan or SUV"],
    image: IMG("mahabaleshwar hill station lush green valley with misty mountains"),
  },
  {
    name: "Mumbai Round Trip",
    route: "Pune → Mumbai → Pune",
    distance: "320 km",
    price: "₹2,699",
    duration: "1 day",
    highlights: ["Gateway of India & Marine Drive", "Airport or hotel drop", "Round-the-clock support"],
    image: IMG("mumbai marine drive skyline with gateway of india and cars, clear daylight"),
  },
];

export default function PackagesPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="py-20">
        <div className="container-page text-center">
          <SectionTitle title="Travel Packages" subtitle="Curated trips with fixed pricing." />
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map((p) => (
              <GlassCard key={p.name} padded={false} className="rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col h-full group hover:border-brand-blue transition-all overflow-hidden">
                <div className="relative h-44 shrink-0 overflow-hidden bg-[#F1F5F9]">
                  <ZoomableImage
                    src={p.image}
                    alt={`${p.name} travel package`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full bg-accent-gold text-white font-mono font-bold text-xs shadow-sm">
                    {p.price}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-display font-bold text-[#0F172A] mb-2">{p.name}</h3>
                  <p className="text-sm text-[#64748B] mb-3">{p.route}</p>
                  <div className="flex gap-3 mb-5">
                    <span className="flex items-center gap-1 text-xs font-mono text-[#64748B]">
                      <MapPin className="w-3 h-3" />
                      {p.distance}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono text-[#64748B]">
                      <Clock className="w-3 h-3" />
                      {p.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-body font-semibold text-brand-blue uppercase tracking-wider mb-2">Highlights</h4>
                  <ul className="space-y-2 text-xs text-[#64748B] mb-6 flex-1">
                    {p.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-brand-blue shrink-0 mt-[8px]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <AnimatedButton variant="blue" size="sm" className="w-full" href="/book">
                      Book Package
                    </AnimatedButton>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-[#E2E8F0] bg-[#F8FAFC] text-center">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-[#0F172A] mb-4">Need something custom?</h2>
            <p className="text-[#64748B] mb-8">Tell us your route and we&rsquo;ll build a package just for you.</p>
            <AnimatedButton variant="gold" size="lg" href="/contact">
              Get a Custom Quote
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
