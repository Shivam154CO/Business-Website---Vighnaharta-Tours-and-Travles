import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SITE } from "@/constants/site";
import type { Metadata } from "next";
import { getPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Travel Packages",
  description:
    "Curated travel packages from Pune with fixed, transparent pricing — Shirdi, Mahabaleshwar, Lonavala, Goa and more.",
  alternates: { canonical: "/packages" },
};

type PackageItem = {
  id: string;
  title: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

export default async function PackagesPage() {
  const packages: PackageItem[] = await getPackages();

  return (
    <div className="flex flex-col flex-1">
      <section className="py-20">
        <div className="container-page text-center">
          <SectionTitle title="Travel Packages" subtitle="Curated trips with fixed pricing. Toll and parking charges extra." />
        </div>
      </section>

      <section className="py-10">
        <div className="container-page space-y-6">
          {[...packages].sort((a: PackageItem, b: PackageItem) => (a.id === "pune-mumbai-pune" ? -1 : b.id === "pune-mumbai-pune" ? 1 : 0)).map((pkg: PackageItem) => (
            <details key={pkg.id} open={pkg.id === "pune-mumbai-pune"} className="group rounded-xl border border-[#E2E8F0] bg-white overflow-hidden">
              <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors">
                <h3 className="text-lg font-display font-bold text-[#0F172A]">{pkg.title}</h3>
                <span className="text-brand-blue text-sm font-semibold group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-brand-blue text-white">
                      {pkg.columns.map((c: string) => (
                        <th key={c} className="px-3 py-2 text-left font-semibold whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pkg.rows.map((row: string[], i: number) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}>
                        {row.map((cell: string, j: number) => (
                          <td key={j} className="px-3 py-2 border-b border-[#E2E8F0] whitespace-nowrap text-[#0F172A]">
                            {j === row.length - 1 ? (
                              <a
                                href={`https://wa.me/${SITE.phone}?text=${encodeURIComponent("I want to book: " + pkg.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-3 py-1 rounded-md bg-accent-gold text-white text-xs font-bold hover:opacity-90"
                              >
                                {cell}
                              </a>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="py-20 border-t border-[#E2E8F0] bg-[#F8FAFC] text-center">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-[#0F172A] mb-4">Need something custom?</h2>
            <p className="text-[#64748B] mb-8">Tell us your route and we&rsquo;ll build a package just for you.</p>
            <AnimatedButton variant="gold" size="lg" href="/contact">
              Get a Custom Quote
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
