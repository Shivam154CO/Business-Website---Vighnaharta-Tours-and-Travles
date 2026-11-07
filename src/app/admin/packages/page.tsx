import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function PackagesAdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  let packages: Awaited<ReturnType<typeof prisma.package.findMany>> = [];

  try {
    packages = await prisma.package.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    packages = [];
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Package management</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Travel packages</h1>
          </div>
          <a href="/admin/packages/new" className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-light">
            Add package
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Columns</th>
                <th className="px-4 py-3 font-medium">Rows</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-slate-500">No packages available.</td>
                </tr>
              ) : (
                packages.map((pkg: (typeof packages)[number]) => (
                  <tr key={pkg.id} className="hover:bg-slate-50 align-top">
                    <td className="px-4 py-3 font-medium text-slate-800">{pkg.title}</td>
                    <td className="px-4 py-3 text-slate-600">{pkg.columns ? JSON.parse(pkg.columns).length : 0} columns</td>
                    <td className="px-4 py-3 text-slate-600">{pkg.rows ? JSON.parse(pkg.rows).length : 0} rows</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${pkg.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                        {pkg.active ? "Active" : "Inactive"}
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
