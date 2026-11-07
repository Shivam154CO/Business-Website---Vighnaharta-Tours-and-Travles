import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="container-page py-12 md:py-16">
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src={SITE.logo}
                alt={`${SITE.name} logo`}
                width={80}
                height={80}
                className="h-11 w-11 shrink-0 rounded-xl object-contain"
              />
              <span className="text-lg font-display font-bold tracking-tight text-[#0F172A]">
                Morya Travels
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#64748B]">
              Your trusted travel partner for outstation tours, airport transfers,
              and group travel across Maharashtra with clean cabs and professional
              drivers.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Services</h4>
            <ul className="space-y-3 text-sm text-[#64748B]">
              <li><Link href="/services" className="transition-colors hover:text-brand-blue">Outstation Tours</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-brand-blue">Airport Transfers</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-brand-blue">Pilgrimage Cabs</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-brand-blue">Corporate Travel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Fleet</h4>
            <ul className="space-y-3 text-sm text-[#64748B]">
              <li><Link href="/fleet" className="transition-colors hover:text-brand-blue">Sedans</Link></li>
              <li><Link href="/fleet" className="transition-colors hover:text-brand-blue">SUVs</Link></li>
              <li><Link href="/fleet" className="transition-colors hover:text-brand-blue">Tempo Travellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Company</h4>
            <ul className="space-y-3 text-sm text-[#64748B]">
              <li><Link href="/about" className="transition-colors hover:text-brand-blue">About Us</Link></li>
              <li><Link href="/packages" className="transition-colors hover:text-brand-blue">Packages</Link></li>
              <li><Link href="/corporate" className="transition-colors hover:text-brand-blue">Corporate</Link></li>
              <li><Link href="/faqs" className="transition-colors hover:text-brand-blue">FAQs</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-brand-blue">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-[#E2E8F0] pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 text-sm text-[#64748B] md:flex-row">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-blue" />
              <span className="text-[#0F172A]">{SITE.phoneDisplay}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-blue" />
              <span className="text-[#0F172A]">{SITE.email}</span>
            </div>
          </div>

          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F5F9] text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E2E8F0] pt-8 md:flex-row">
          <p className="text-xs text-[#64748B]">
            © 2026 Morya Travels. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <p>Est. 2011</p>
            <span className="mx-1 h-3 w-px bg-[#CBD5E1]" />
            <p>Pune, Maharashtra</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
