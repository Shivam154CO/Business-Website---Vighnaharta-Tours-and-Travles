import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const routeSchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  distance: z.string().min(1),
  duration: z.string().min(1),
  startingFrom: z.string().min(1),
  image: z.string().min(1),
  description: z.string().optional().nullable(),
  popular: z.boolean().default(false),
});

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const routes = await prisma.route.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ routes });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = await request.json();
    const parsed = routeSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid route payload" }, { status: 400 });
    }

    const route = await prisma.route.create({ data: parsed.data });
    return NextResponse.json({ ok: true, route });
  } catch (error) {
    console.error("Route create error:", error);
    return NextResponse.json({ error: "Failed to create route" }, { status: 500 });
  }
}
