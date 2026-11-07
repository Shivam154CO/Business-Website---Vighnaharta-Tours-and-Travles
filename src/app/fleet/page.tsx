import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { FareEstimator } from "@/components/ui/FareEstimator";
import { getVehicles } from "@/lib/data";

type FleetVehicle = {
	id: string;
	name: string;
	type: "sedan" | "suv" | "luxury" | "tempo";
	seats: number;
	luggage: number;
	ac: boolean;
	ratePerKm: number;
	minKm: number;
	features: string[];
	extraFeatures: string[];
	badge: string;
	badgeColor: string;
	image: string;
	packageRate?: number;
};

function rateLabel(v: FleetVehicle) {
	if (v.type === "tempo") return `₹${v.packageRate} pkg`;
	return `₹${v.ratePerKm}/km`;
}

function minLabel(v: FleetVehicle) {
	if (v.type === "tempo") return v.ac ? "AC" : "Non-AC";
	return `${v.minKm} km`;
}

export default async function FleetPage() {
	const vehicles: FleetVehicle[] = await getVehicles();

	return (
		<div className="flex flex-col flex-1">
			<section className="pt-20 pb-10">
				<div className="container-page">
					<SectionTitle title="Our Fleet" subtitle="Clean, well-maintained vehicles for every need." />
				</div>
			</section>

			<section className="pb-12">
				<div className="container-page max-w-4xl">
					<FareEstimator vehicles={vehicles} />
				</div>
			</section>

			<section className="pb-16">
				<div className="container-page">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{vehicles.map((vehicle: FleetVehicle) => (
							<GlassCard
								key={vehicle.id}
								padded={false}
								className="group flex flex-col h-full rounded-xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:border-brand-blue hover:shadow-md transition-all duration-300"
							>
								<div className="relative h-48 shrink-0 overflow-hidden bg-[#F1F5F9]">
									<ZoomableImage
										src={vehicle.image}
										alt={`${vehicle.name} — ${vehicle.type}`}
										sizes="(max-width: 768px) 100vw, 33vw"
										className="group-hover:scale-105 transition-transform duration-500"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-[#0F172A]/20" />
									<span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur border border-[#E2E8F0] text-xs font-mono text-[#0F172A] shadow-sm">
										{vehicle.seats + 1} <span className="text-[10px]">seats</span>
									</span>
									<span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F172A]/90 backdrop-blur text-xs font-mono text-accent-gold shadow-sm">
										{rateLabel(vehicle)}
									</span>
									<div className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F172A]/90 backdrop-blur text-xs font-mono text-white shadow-sm">
										{minLabel(vehicle)}
									</div>
								</div>
								<div className="p-5 flex flex-col flex-1">
									<div className="flex items-center gap-2 mb-2">
										<span
											className="px-2 py-0.5 rounded text-xs font-mono font-bold text-white"
											style={{ backgroundColor: vehicle.badgeColor }}
										>
											{vehicle.badge}
										</span>
										<span className="text-xs text-[#64748B] capitalize">{vehicle.type}</span>
									</div>
									<Link
										href={`/fleet/${vehicle.id}`}
										className="text-xl font-display font-bold text-[#0F172A] transition-colors hover:text-brand-blue"
									>
										{vehicle.name}
									</Link>
									<p className="mt-1 text-sm text-[#64748B]">
										{vehicle.luggage} luggage &nbsp;•&nbsp; {vehicle.ac ? "AC" : "Non-AC"}
									</p>
									<div className="mt-4 mb-5 flex flex-wrap gap-2">
										{vehicle.features.slice(0, 3).map((feature: string) => (
											<span
												key={feature}
												className="text-[10px] px-2 py-1 rounded bg-[#F1F5F9] font-mono text-[#64748B] border border-[#E2E8F0]"
											>
												{feature}
											</span>
										))}
									</div>
									<div className="mt-auto flex gap-2">
										<AnimatedButton variant="ghost" size="sm" className="flex-1" href={`/fleet/${vehicle.id}`}>
											Details
										</AnimatedButton>
										<AnimatedButton variant="gold" size="sm" className="flex-1" href={`/book?vehicle=${vehicle.id}`}>
											Book
										</AnimatedButton>
									</div>
								</div>
							</GlassCard>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
