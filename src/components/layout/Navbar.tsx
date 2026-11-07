"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/constants/site";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyles = cn(
    "fixed top-0 z-50 w-full transition-all duration-300",
    isHome && !scrolled
      ? "bg-transparent border-transparent py-4"
      : "bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] py-0"
  );

  const textStyles = cn(
    "transition-colors",
    isHome && !scrolled ? "text-white" : "text-[#64748B]"
  );

  const brandStyles = cn(
    "font-display font-bold tracking-tight transition-colors",
    isHome && !scrolled ? "text-white" : "text-[#0F172A]"
  );

  return (
    <>
      <nav className={navStyles}>
        <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-20">
          <Link href="/" className="flex min-w-0 items-center gap-3 shrink-0">
            <Image
              src={SITE.logo}
              alt={`${SITE.name} logo`}
              width={96}
              height={96}
              priority
              className="h-10 w-10 shrink-0 rounded-xl object-contain sm:h-11 sm:w-11 ring-1 ring-white/20"
            />
            <span className={cn("truncate text-base sm:text-lg xl:text-xl", brandStyles)}>
              {SITE.name}
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-5 lg:flex xl:gap-7">
            <div className={cn("flex items-center gap-5 xl:gap-7 text-sm font-medium", textStyles)}>
              {NAV_LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "whitespace-nowrap transition-colors hover:text-brand-blue",
                      active && (isHome && !scrolled ? "text-white font-bold" : "text-brand-blue font-semibold")
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/book"
                className={cn(
                  "inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold transition-all",
                  isHome && !scrolled
                    ? "bg-white text-[#0F172A] hover:bg-white/90"
                    : "bg-brand-blue text-white hover:bg-brand-blue-light"
                )}
              >
                Book Now
              </Link>
            </div>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors lg:hidden",
              isHome && !scrolled
                ? "border-white/20 text-white hover:bg-white/10"
                : "border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9]"
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
