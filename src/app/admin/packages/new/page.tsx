"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const emptyForm = {
  slug: "",
  title: "",
  description: "",
  columns: '["Type of Car","Capacity","One Way","Book"]',
  rows: '[["Sedan","4+1","₹3,499","Book Now"]]',
  note: "",
  active: true,
};

export default function NewPackagePage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        columns: JSON.parse(form.columns),
        rows: JSON.parse(form.rows),
      };

      const response = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSaving(false);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Failed to save package");
        return;
      }

      router.push("/admin/packages");
      router.refresh();
    } catch {
      setSaving(false);
      setError("Columns and rows must be valid JSON arrays.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Add Package</h1>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span>Slug</span>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
              <span>Title</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
              <span>Description</span>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
              <span>Columns JSON array</span>
              <textarea value={form.columns} onChange={(e) => setForm({ ...form, columns: e.target.value })} rows={3} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 font-mono text-xs outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
              <span>Rows JSON array</span>
              <textarea value={form.rows} onChange={(e) => setForm({ ...form, rows: e.target.value })} rows={5} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 font-mono text-xs outline-none focus:border-brand-blue" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
              <span>Note</span>
              <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-blue" />
            </label>
          </div>

          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            Active package
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex items-center justify-end gap-3">
            <a href="/admin/packages" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Cancel</a>
            <button type="submit" disabled={saving} className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70">
              {saving ? "Saving..." : "Save package"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
