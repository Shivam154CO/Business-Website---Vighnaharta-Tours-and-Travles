import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

type BookingRow = {
  id: string;
  name: string;
  phone: string;
  pickup: string;
  dropoff: string;
  travel_date: string | Date | null;
  status: string;
};

export default async function BookingManagementPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  let bookings: BookingRow[] = [];

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("id, name, phone, pickup, dropoff, travel_date, status")
      .order("created_at", { ascending: false });

    if (!error) {
      bookings = (data ?? []) as BookingRow[];
    }
  } catch {
    bookings = [];
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Booking queue</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Manage bookings</h1>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Route</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-slate-500">No bookings yet.</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800">{booking.name}</p>
                      <p className="text-slate-500">{booking.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {booking.pickup} → {booking.dropoff}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {booking.travel_date ? new Date(booking.travel_date).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : booking.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-sky-100 text-sky-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`/admin/bookings/${booking.id}`} className="text-brand-blue hover:underline">
                        View
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
