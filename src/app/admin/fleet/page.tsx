import { prisma } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function FleetAdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  let vehicles: Awaited<ReturnType<typeof prisma.vehicle.findMany>> = [];

  try {
    vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    vehicles = [];
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Fleet management</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Vehicles</h1>
          </div>
          <a
            href="/admin/fleet/new"
            className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-light"
          >
            Add vehicle
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Seats</th>
                <th className="px-4 py-3 font-medium">Rate</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-slate-500">No vehicles available.</td>
                </tr>
              ) : (
                vehicles.map((vehicle: (typeof vehicles)[number]) => (
                  <tr key={vehicle.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{vehicle.name}</td>
                    <td className="px-4 py-3 text-slate-600">{vehicle.type}</td>
                    <td className="px-4 py-3 text-slate-600">{vehicle.seats}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {vehicle.packageRate ? `₹${vehicle.packageRate}` : `₹${vehicle.ratePerKm}/km`}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${vehicle.available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                        {vehicle.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`/admin/fleet/${vehicle.id}`} className="text-brand-blue hover:underline">
                        Edit
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
