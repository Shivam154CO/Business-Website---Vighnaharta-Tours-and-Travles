"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE } from "@/constants/site";
import { useRouter } from "next/navigation";

export function FloatingCTA() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          className="fixed bottom-8 left-1/2 z-[100] w-auto"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-gray-950/5">
            <button
              onClick={() => router.push("/book")}
              className="group flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-xs font-bold text-white transition-all hover:bg-brand-blue-light hover:scale-105 active:scale-95"
            >
              Book Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-6 py-3 text-xs font-bold text-[#0F172A] transition-all hover:bg-gray-50 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
