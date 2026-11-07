import crypto from "node:crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { supabase } from "@/lib/supabase";

export const ADMIN_SESSION_COOKIE = "vgh_admin_session";

const ADMIN_SECRET = process.env.ADMIN_SESSION_SECRET || "dev-admin-secret";

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

async function ensureDefaultAdmin() {
  if (!isSupabaseConfigured()) return null;

  const email = "info@moryatravel.in";
  const passwordHash = await bcrypt.hash("admin123", 10);

  const { data: existing, error: lookupError } = await supabase
    .from("admins")
    .select("id, name, email, role, password_hash, passwordhash")
    .eq("email", email)
    .maybeSingle();

  if (lookupError && lookupError.code !== "PGRST116") {
    return null;
  }

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("admins")
    .upsert(
      {
        email,
        name: "Morya Admin",
        role: "admin",
        password_hash: passwordHash,
        passwordhash: passwordHash,
      },
      { onConflict: "email" },
    )
    .select("id, name, email, role, password_hash, passwordhash")
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export function createSessionToken(adminId: string) {
  const payload = JSON.stringify({ sub: adminId, iat: Date.now() });
  const signature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(payload)
    .digest("hex");

  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

export function verifySessionToken(token: string) {
  if (!token) return null;

  const [payloadSegment, signature] = token.split(".");
  if (!payloadSegment || !signature) return null;

  const expected = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(Buffer.from(payloadSegment, "base64url").toString("utf8"))
    .digest("hex");

  if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    try {
      const payload = JSON.parse(
        Buffer.from(payloadSegment, "base64url").toString("utf8"),
      ) as { sub?: string };
      return payload.sub ?? null;
    } catch {
      return null;
    }
  }

  return null;
}

export async function verifyAdminCredentials(email: string, password: string) {
  try {
    if (!isSupabaseConfigured()) return null;

    const adminRecord = (await ensureDefaultAdmin()) ??
      (await supabase
        .from("admins")
        .select("id, name, email, role, password_hash, passwordhash")
        .eq("email", email)
        .maybeSingle());

    const data = adminRecord && "id" in adminRecord ? adminRecord : null;
    if (!data) return null;

    const storedPassword =
      typeof data.password_hash === "string" && data.password_hash
        ? data.password_hash
        : typeof data.passwordhash === "string" && data.passwordhash
          ? data.passwordhash
          : "";

    if (!storedPassword) return null;

    const isValid = await bcrypt.compare(password, storedPassword);
    if (!isValid) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
  } catch {
    return null;
  }
}

export async function signInAdmin(email: string, password: string) {
  const admin = await verifyAdminCredentials(email, password);
  if (!admin) return null;

  try {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, createSessionToken(admin.id), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
  } catch {
    return null;
  }

  return admin;
}

export async function getCurrentAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (!token) return null;

    const adminId = verifySessionToken(token);
    if (!adminId) return null;

    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from("admins")
      .select("id, name, email, role")
      .eq("id", adminId)
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
  } catch {
    return null;
  }
}

export async function clearAdminSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_COOKIE);
  } catch {
    // no-op
  }
}

export function isValidAdminSession(token: string | undefined) {
  if (!token) return false;
  return Boolean(verifySessionToken(token));
}
