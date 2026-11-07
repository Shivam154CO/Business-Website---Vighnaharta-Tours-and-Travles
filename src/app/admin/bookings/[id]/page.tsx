"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type BookingDetail = {
  id: string;
  name: string;
  phone: string;
  pickup: string;
  dropoff: string;
  travel_date?: string | Date | null;
  passengers?: string | null;
  notes?: string | null;
  status?: string;
};

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    fetch(`/api/bookings/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.booking) {
          const nextBooking = data.booking as BookingDetail;
          setBooking(nextBooking);
          setStatus(nextBooking.status ?? "pending");
        }
      });
  }, [params.id]);

  async function handleStatusChange() {
    setSaving(true);
    const response = await fetch(`/api/admin/bookings/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSaving(false);

    if (response.ok) {
      router.push("/admin/bookings");
      router.refresh();
    }
  }

  if (!booking) {
    return <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-600">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Booking details</h1>
        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
          <p><strong>Route:</strong> {booking.pickup} → {booking.dropoff}</p>
          <p>
            <strong>Date:</strong> {booking.travel_date ? new Date(booking.travel_date).toLocaleDateString("en-IN") : "—"}
          </p>
          {booking.passengers && <p><strong>Passengers:</strong> {booking.passengers}</p>}
          {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
        </div>

        <div className="mt-8 flex items-end gap-4">
          <label className="flex-1 space-y-2 text-sm text-slate-600">
            <span>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <button onClick={handleStatusChange} disabled={saving} className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70">
            {saving ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </main>
  );
}
