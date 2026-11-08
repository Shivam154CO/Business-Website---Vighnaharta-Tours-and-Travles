import { NextResponse } from "next/server";
import { TEMP_OPEN_ADMIN } from "@/lib/auth";

export async function POST() {
  return NextResponse.json({ ok: true, admin: TEMP_OPEN_ADMIN });
}
