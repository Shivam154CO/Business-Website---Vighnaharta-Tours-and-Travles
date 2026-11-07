import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Users,
  Briefcase,
  Snowflake,
  Route as RouteIcon,
  Check,
  Sparkles,
} from "lucide-react";
import { FLEET } from "@/constants/fleet";
import { SITE } from "@/constants/site";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SafeImage } from "@/components/ui/SafeImage";

export function generateStaticParams() {
  return FLEET.map((vehicle) => ({ id: vehicle.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const vehicle = FLEET.find((v) => v.id === id);

  if (!vehicle) {
    return { title: "Vehicle not found" };
  }

  return {
    title: `${vehicle.name} on Rent in Pune`,
    description: `Book a ${vehicle.name} in Pune — ${vehicle.seats}+1 seater, ${
      vehicle.ac ? "AC" : "Non-AC"
    }, ${vehicle.luggage} luggage. Transparent pricing with professional drivers.`,
    alternates: { canonical: `/fleet/${vehicle.id}` },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = FLEET.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  const isTempo = vehicle.type === "tempo";
  const priceLabel = isTempo
    ? `₹${vehicle.packageRate?.toLocaleString("en-IN")}`
    : `₹${vehicle.ratePerKm}`;
  const priceUnit = isTempo ? "flat package" : "per km";
  const priceValue = isTempo ? vehicle.packageRate ?? 0 : vehicle.ratePerKm;
  const exampleKm = vehicle.minKm > 0 ? vehicle.minKm : 300;
  const exampleFare = isTempo
    ? vehicle.packageRate ?? 0
    : exampleKm * vehicle.ratePerKm;

  const specs = [
    {
      icon: Users,
      label: "Seating",
      value: `${vehicle.seats} + 1 passengers`,
    },
    { icon: Briefcase, label: "Luggage", value: `${vehicle.luggage} bags` },
    {
      icon: Snowflake,
      label: "Comfort",
      value: vehicle.ac ? "Air conditioned" : "Non-AC",
    },
    {
      icon: RouteIcon,
      label: isTempo ? "Billing" : "Minimum",
      value: isTempo ? "Flat package" : `${vehicle.minKm} km`,
    },
  ];

  const others = FLEET.filter((v) => v.id !== vehicle.id).slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${vehicle.name} — Car Rental`,
    description: `${vehicle.name} on rent in Pune with a professional driver. ${vehicle.seats}+1 seater, ${
      vehicle.ac ? "AC" : "Non-AC"
    }, ${vehicle.luggage} luggage.`,
    image: `${SITE.url}${vehicle.image}`,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: priceValue,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/fleet/${vehicle.id}`,
    },
  };

  return (
    <div className="flex flex-col flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-[#E2E8F0]">
        <div className="container-page flex items-center gap-1.5 py-4 text-xs text-[#64748B]">
          <Link href="/" className="transition-colors hover:text-brand-blue">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/fleet" className="transition-colors hover:text-brand-blue">
            Fleet
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-[#0F172A]">{vehicle.name}</span>
        </div>
      </nav>

      <section className="py-10 md:py-14">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            {/* Left: image + details */}
            <div>
              <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] sm:h-80">
                <SafeImage
                  src={vehicle.image}
                  alt={`${vehicle.name} ${vehicle.type} for rent in Pune`}
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-6"
                />
                <span
                  className="absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  style={{ backgroundColor: vehicle.badgeColor }}
                >
                  {vehicle.badge}
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs font-mono uppercase tracking-widest text-brand-blue">
                  {vehicle.type} class
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                  {vehicle.name}
                </h1>
                <p className="mt-4 max-w-2xl leading-relaxed text-[#64748B]">
                  Travel comfortably in the {vehicle.name}. A well-maintained{" "}
                  {vehicle.seats}+1 seater with {vehicle.luggage} luggage space,
                  ideal for{" "}
                  {vehicle.type === "tempo"
                    ? "group trips, events and pilgrimage tours"
                    : "outstation trips, airport transfers and city travel"}{" "}
                  across Maharashtra.
                </p>
              </div>

              {/* Specs */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#E2E8F0] bg-white p-4"
                  >
                    <Icon className="mb-3 h-5 w-5 text-brand-blue" />
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#0F172A]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-10">
                <h2 className="font-display text-xl font-bold text-[#0F172A]">
                  Features &amp; amenities
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {vehicle.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-[#475569]"
                    >
                      <Check className="h-4 w-4 shrink-0 text-brand-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal for */}
              <div className="mt-10">
                <h2 className="font-display text-xl font-bold text-[#0F172A]">
                  Ideal for
                </h2>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {vehicle.extraFeatures.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-medium text-[#475569]"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-accent-gold" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: booking card */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-7">
                <p className="text-xs font-mono uppercase tracking-widest text-[#64748B]">
                  Starting from
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="font-display text-4xl font-bold text-[#0F172A]">
                    {priceLabel}
                  </span>
                  <span className="pb-1 text-sm text-[#64748B]">{priceUnit}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#64748B]">
                  {isTempo
                    ? "Flat package rate. Toll, parking and state permits extra."
                    : `Minimum ${vehicle.minKm} km. Toll, parking and state permits extra.`}
                </p>

                {!isTempo && (
                  <p className="mt-3 rounded-lg bg-[#F8FAFC] px-3 py-2 text-xs text-[#475569]">
                    Example: {exampleKm} km ≈{" "}
                    <span className="font-semibold text-[#0F172A]">
                      ₹{exampleFare.toLocaleString("en-IN")}
                    </span>
                  </p>
                )}

                <div className="mt-6 flex flex-col gap-3">
                  <AnimatedButton
                    variant="gold"
                    size="md"
                    href={`/book?vehicle=${vehicle.id}`}
                    className="w-full"
                  >
                    Book this vehicle
                  </AnimatedButton>
                  <AnimatedButton
                    variant="ghost"
                    size="md"
                    href={SITE.whatsapp}
                    className="w-full"
                  >
                    Enquire on WhatsApp
                  </AnimatedButton>
                </div>

                <div className="mt-5 border-t border-[#E2E8F0] pt-5 text-xs text-[#64748B]">
                  <p>
                    Prefer to talk? Call{" "}
                    <a
                      href={`tel:${SITE.phone}`}
                      className="font-medium text-brand-blue hover:underline"
                    >
                      {SITE.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>

              <Link
                href="/fleet"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] transition-colors hover:text-brand-blue"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back to all vehicles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other vehicles */}
      <section className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-14">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-[#0F172A]">
            Other vehicles in our fleet
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((v) => (
              <Link
                key={v.id}
                href={`/fleet/${v.id}`}
                className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all duration-300 hover:border-brand-blue hover:shadow-md"
              >
                <div className="relative h-32 bg-[#F1F5F9]">
                  <SafeImage
                    src={v.image}
                    alt={v.name}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-base font-bold text-[#0F172A] group-hover:text-brand-blue">
                    {v.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#64748B]">
                    {v.seats} + 1 seats · {v.ac ? "AC" : "Non-AC"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
