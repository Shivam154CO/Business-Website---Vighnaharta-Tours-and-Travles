import { FLEET as FALLBACK_FLEET } from "@/constants/fleet";
import { PACKAGES as FALLBACK_PACKAGES } from "@/constants/packages";
import { POPULAR_ROUTES as FALLBACK_ROUTES } from "@/constants/routes";
import { prisma } from "@/lib/db";

type FleetVehicle = (typeof FALLBACK_FLEET)[number];
type RouteItem = (typeof FALLBACK_ROUTES)[number];
type PackageTable = (typeof FALLBACK_PACKAGES)[number];

export async function getVehicles() {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "asc" } });

  if (vehicles.length === 0) {
    return FALLBACK_FLEET;
  }

  return vehicles.map((vehicle: (typeof vehicles)[number]) => ({
    id: vehicle.id,
    name: vehicle.name,
    type: vehicle.type as FleetVehicle["type"],
    seats: vehicle.seats,
    luggage: vehicle.luggage,
    ac: vehicle.ac,
    ratePerKm: vehicle.ratePerKm,
    minKm: vehicle.minKm,
    features: vehicle.features ? vehicle.features.split(",") : [],
    extraFeatures: vehicle.extraFeatures ? vehicle.extraFeatures.split(",") : [],
    badge: vehicle.badge ?? "",
    badgeColor: vehicle.badgeColor ?? "#3B82F6",
    image: vehicle.image,
    packageRate: vehicle.packageRate ?? undefined,
  }));
}

export async function getRoutes() {
  const routes = await prisma.route.findMany({ orderBy: { createdAt: "asc" } });

  if (routes.length === 0) {
    return FALLBACK_ROUTES;
  }

  return routes.map((route: (typeof routes)[number]) => ({
    id: route.id,
    name: route.name,
    distance: route.distance,
    duration: route.duration,
    startingFrom: route.startingFrom,
    image: route.image,
  }));
}

export async function getPackages() {
  const packages = await prisma.package.findMany({ orderBy: { createdAt: "asc" } });

  if (packages.length === 0) {
    return FALLBACK_PACKAGES;
  }

  return packages.map((pkg: (typeof packages)[number]) => ({
    id: pkg.id,
    title: pkg.title,
    columns: pkg.columns ? (JSON.parse(pkg.columns) as string[]) : [],
    rows: pkg.rows ? (JSON.parse(pkg.rows) as string[][]) : [],
    note: pkg.note ?? undefined,
  }));
}
