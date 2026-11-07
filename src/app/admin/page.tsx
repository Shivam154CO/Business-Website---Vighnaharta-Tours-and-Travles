import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

type BookingSummary = {
  id: string;
  name: string;
  pickup: string;
  dropoff: string;
  status: string;
};

type NotificationSummary = {
  id: string;
  title: string;
  type: string;
  message: string;
};

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  let bookings: BookingSummary[] = [];
  let notifications: NotificationSummary[] = [];

  try {
    const [bRes, nRes] = await Promise.all([
      supabase
        .from("bookings")
        .select("id, name, pickup, dropoff, status")
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("notifications")
        .select("id, title, type, message")
        .order("created_at", { ascending: false })
        .limit(8),
    ]);

    bookings = (bRes.data ?? []) as BookingSummary[];
    notifications = (nRes.data ?? []) as NotificationSummary[];
  } catch {
    bookings = [];
    notifications = [];
  }

  let totalCount = 0;
  let pendingCount = 0;
  let confirmedCount = 0;
  let cancelledCount = 0;

  try {
    const { count, error } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true });

    if (!error && count !== null) {
      totalCount = count;
    }

    const { count: pc } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");
    if (!error && pc !== null) pendingCount = pc;

    const { count: cc } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "confirmed");
    if (!error && cc !== null) confirmedCount = cc;

    const { count: canc } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "cancelled");
    if (!error && canc !== null) cancelledCount = canc;
  } catch {
    totalCount = 0;
    pendingCount = 0;
    confirmedCount = 0;
    cancelledCount = 0;
  }

  const stats = {
    total: totalCount,
    pending: pendingCount,
    confirmed: confirmedCount,
    cancelled: cancelledCount,
    leads: 0,
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Admin panel</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Welcome back, {admin.name}</h1>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Logout
            </button>
          </form>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { label: "Total bookings", value: stats.total },
            { label: "Pending", value: stats.pending },
            { label: "Confirmed", value: stats.confirmed },
            { label: "Cancelled", value: stats.cancelled },
            { label: "Leads", value: stats.leads },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Recent bookings</h2>
            <div className="space-y-3">
              {bookings.length === 0 ? (
                <p className="text-sm text-slate-500">No bookings yet.</p>
              ) : bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-none last:pb-0"
                >
                  <div>
                    <p className="font-medium text-slate-800">{booking.name}</p>
                    <p className="text-sm text-slate-500">{booking.pickup} → {booking.dropoff}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    booking.status === "confirmed"
                      ? "bg-emerald-100 text-emerald-700"
                      : booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-sky-100 text-sky-700"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Notification feed</h2>
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <p className="text-sm text-slate-500">No notifications yet.</p>
              ) : notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border-b border-slate-100 pb-3 last:border-none last:pb-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-slate-800">{notification.title}</p>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      {notification.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
