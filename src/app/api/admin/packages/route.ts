import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const packageSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  description: z.string().optional().nullable(),
  columns: z.array(z.string()).default([]),
  rows: z.array(z.array(z.string())).default([]),
  note: z.string().optional().nullable(),
  active: z.boolean().default(true),
});

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const packages = await prisma.package.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ packages });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const raw = await request.json();
    const columns = Array.isArray(raw.columns)
      ? raw.columns
      : typeof raw.columns === "string"
        ? JSON.parse(raw.columns)
        : [];
    const rows = Array.isArray(raw.rows)
      ? raw.rows
      : typeof raw.rows === "string"
        ? JSON.parse(raw.rows)
        : [];

    const parsed = packageSchema.safeParse({
      ...raw,
      columns,
      rows,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid package payload" }, { status: 400 });
    }

    const pkg = await prisma.package.create({
      data: {
        ...parsed.data,
        columns: JSON.stringify(parsed.data.columns),
        rows: JSON.stringify(parsed.data.rows),
      },
    });

    return NextResponse.json({ ok: true, package: pkg });
  } catch (error) {
    console.error("Package create error:", error);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}
