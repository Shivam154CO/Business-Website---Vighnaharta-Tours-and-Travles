"use client";

import { useEffect } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-gold/10 text-accent-gold">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="font-display text-3xl font-bold text-[#0F172A] sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[#64748B]">
        We hit an unexpected error while loading this page. Please try again, or
        call us directly if the problem continues.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <AnimatedButton variant="gold" size="md" onClick={reset}>
          Try again
        </AnimatedButton>
        <AnimatedButton variant="ghost" size="md" href="/contact">
          Contact support
        </AnimatedButton>
      </div>
    </div>
  );
}
