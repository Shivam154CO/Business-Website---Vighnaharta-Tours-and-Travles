import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { supabaseAdmin } from "@/lib/supabase";

export const ADMIN_SESSION_COOKIE = "vgh_admin_session";
export const ADMIN_CSRF_COOKIE = "vgh_admin_csrf";

const SESSION_TTL_SECONDS = 60 * 60 * 8;
const SESSION_TTL_MS = SESSION_TTL_SECONDS * 1000;

function getAdminSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === "production") return null;
    return "dev-only-admin-secret-change-before-production-32chars";
  }
  return secret;
}

function isSupabaseConfigured() {
  return Boolean(
    (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_ANON_KEY),
  );
}

export type AdminSessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

export function createSessionToken(adminId: string, csrfToken?: string) {
  const secret = getAdminSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET must be set to a strong value in production.");

  const payload = JSON.stringify({
    sub: adminId,
    iat: Date.now(),
    exp: Date.now() + SESSION_TTL_MS,
    csrf: csrfToken || crypto.randomBytes(16).toString("hex"),
  });
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${base64url(payload)}.${signature}`;
}

export function verifySessionToken(token: string) {
  const secret = getAdminSecret();
  if (!secret || !token) return null;

  const [payloadSegment, signature] = token.split(".");
  if (!payloadSegment || !signature) return null;

  let payloadText = "";
  try {
    payloadText = Buffer.from(payloadSegment, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expected = crypto.createHmac("sha256", secret).update(payloadText).digest("hex");
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;

  try {
    const payload = JSON.parse(payloadText) as { sub?: string; exp?: number; csrf?: string };
    if (!payload.sub || typeof payload.exp !== "number") return null;
    if (Date.now() > payload.exp) return null;
    return { sub: payload.sub, exp: payload.exp, csrf: payload.csrf ?? "" };
  } catch {
    return null;
  }
}

function getPasswordHash(data: Record<string, unknown>) {
  const candidates = [data.password_hash, data.passwordhash, data.passwordHash];
  for (const value of candidates) {
    if (typeof value === "string" && value) return value;
  }
  return "";
}

export const TEMP_OPEN_ADMIN: AdminSessionUser = {
  id: "open-admin",
  name: "Admin",
  email: "admin@local",
  role: "admin",
};

export async function verifyAdminCredentials(_email: string, _password: string): Promise<AdminSessionUser | null> {
  return TEMP_OPEN_ADMIN;
}

export async function signInAdmin(_email: string, _password: string) {
  return TEMP_OPEN_ADMIN;
}

export async function getCurrentAdmin(): Promise<AdminSessionUser | null> {
  // TEMP: admin auth disabled by request. Restore before production.
  return TEMP_OPEN_ADMIN;
}

export async function clearAdminSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_COOKIE);
    cookieStore.delete(ADMIN_CSRF_COOKIE);
  } catch {
    // no-op
  }
}

export function isValidAdminSession(token: string | undefined) {
  if (!token) return false;
  return Boolean(verifySessionToken(token));
}

export type AdminMutationResult =
  | { ok: true; admin: AdminSessionUser }
  | { ok: false; response: NextResponse };

export async function requireAdminMutation(_request: Request): Promise<AdminMutationResult> {
  // TEMP: admin auth/CSRF checks disabled by request. Restore before production.
  return { ok: true, admin: TEMP_OPEN_ADMIN };
}
