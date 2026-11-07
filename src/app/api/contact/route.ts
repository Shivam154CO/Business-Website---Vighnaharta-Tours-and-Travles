import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { createNotification } from "@/lib/notifications";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(10),
  message: z.string().min(10),
  source: z.string().optional().default("website"),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid contact payload" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email || null,
        phone: parsed.data.phone,
        message: parsed.data.message,
        source: parsed.data.source,
      },
    });

    await createNotification({
      type: "lead",
      title: "New enquiry received",
      message: `${lead.name} sent a new enquiry from ${lead.phone}.`,
    });

    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}
