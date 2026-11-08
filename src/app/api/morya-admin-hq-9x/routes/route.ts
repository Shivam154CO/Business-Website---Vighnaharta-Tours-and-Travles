import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminMutation } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

const routeSchema = z.object({
  name: z.string().trim().min(2).max(160),
  distance: z.string().trim().max(60).optional().default(""),
  duration: z.string().trim().max(60).optional().default(""),
  startingFrom: z.string().trim().max(60).optional().default(""),
  image: z.string().trim().max(500).default("/images/services/outstation.jpeg"),
  description: z.string().trim().max(2000).optional().default(""),
  popular: z.boolean().optional().default(false),
});

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET(request: Request) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  const { data, error } = await supabaseAdmin.from("routes").select("*").order("created_at", { ascending: true });
  if (error) return NextResponse.json({ error: "Failed to load routes: "+error.message }, { status: 500 });
  return NextResponse.json({ ok: true, routes: data ?? [] });
}

export async function POST(request: Request) {
  const guard = await requireAdminMutation();
  if (!guard.ok) return guard.response;
  try {
    const payload = await request.json().catch(() => null);
    const parsed = routeSchema.safeParse(payload);
    if (!parsed.success) return NextResponse.json({ error: "Invalid route payload", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    const p = parsed.data;
    const row = {
      slug: slugify(p.name),
      name: p.name,
      distance: p.distance || "",
      duration: p.duration || "",
      starting_from: p.startingFrom || "",
      image: p.image,
      description: p.description || "",
      popular: p.popular ?? false,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabaseAdmin.from("routes").insert(row).select("*").single();
    if (error) return NextResponse.json({ error: "Failed to create route: "+error.message }, { status: 500 });
    return NextResponse.json({ ok: true, route: data });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to create route";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
