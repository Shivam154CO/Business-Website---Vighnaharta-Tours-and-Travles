import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type RouteRow = {
  id: string;
  name: string;
  distance: string;
  duration: string;
  startingFrom: string;
  popular: boolean;
};

export default async function RoutesAdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  let routes: RouteRow[] = [];

  try {
    const result = await prisma.route.findMany({ orderBy: { createdAt: "asc" } });
    routes = (result ?? []).map((route) => ({
      id: String(route.id ?? ""),
      name: String(route.name ?? ""),
      distance: String(route.distance ?? ""),
      duration: String(route.duration ?? ""),
      startingFrom: String(route.startingFrom ?? ""),
      popular: Boolean(route.popular),
    }));
  } catch {
    routes = [];
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Route management</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Popular routes</h1>
          </div>
          <a href="/admin/routes/new" className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-light">
            Add route
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Route</th>
                <th className="px-4 py-3 font-medium">Distance</th>
                <th className="px-4 py-3 font-medium">Duration</th>
                <th className="px-4 py-3 font-medium">Starts from</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {routes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-slate-500">No routes available.</td>
                </tr>
              ) : (
                routes.map((route) => (
                  <tr key={route.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{route.name}</td>
                    <td className="px-4 py-3 text-slate-600">{route.distance}</td>
                    <td className="px-4 py-3 text-slate-600">{route.duration}</td>
                    <td className="px-4 py-3 text-slate-600">{route.startingFrom}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${route.popular ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                        {route.popular ? "Featured" : "Standard"}
                      </span>
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
