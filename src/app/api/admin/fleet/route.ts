import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const vehicleSchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  type: z.enum(["sedan", "suv", "luxury", "tempo"]),
  seats: z.number().min(1),
  luggage: z.number().min(0),
  ac: z.boolean().default(true),
  ratePerKm: z.number().min(0),
  minKm: z.number().min(0),
  badge: z.string().optional().default("New"),
  badgeColor: z.string().optional().default("#3B82F6"),
  image: z.string().min(1),
  features: z.string().min(1),
  extraFeatures: z.string().min(1),
  packageRate: z.number().nullable().optional(),
  available: z.boolean().default(true),
});

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ vehicles });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = await request.json();
    const parsed = vehicleSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid vehicle payload" }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        ...parsed.data,
      },
    });

    return NextResponse.json({ ok: true, vehicle });
  } catch (error) {
    console.error("Fleet create error:", error);
    return NextResponse.json({ error: "Failed to create vehicle" }, { status: 500 });
  }
}
