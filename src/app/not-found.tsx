import Link from "next/link";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { CarFront } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
        <CarFront className="h-8 w-8" />
      </div>
      <p className="font-mono text-sm font-semibold uppercase tracking-widest text-brand-blue">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-[#0F172A] sm:text-4xl">
        This road leads nowhere
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[#64748B]">
        The page you are looking for could not be found. Let us get you back on
        route.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <AnimatedButton variant="gold" size="md" href="/">
          Back to home
        </AnimatedButton>
        <AnimatedButton variant="ghost" size="md" href="/book">
          Book a cab
        </AnimatedButton>
      </div>
      <Link
        href="/contact"
        className="mt-6 text-sm font-medium text-[#64748B] transition-colors hover:text-brand-blue"
      >
        Need help? Contact us
      </Link>
    </div>
  );
}
