"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { SafeImage } from "./SafeImage";
import { Lightbox } from "./Lightbox";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders an image that can be clicked to open a full-screen zoom overlay.
 * The click layer sits above card gradients/badges (z-20) and stops
 * propagation so parent card click handlers are not triggered.
 */
export function ZoomableImage({ src, alt, className, sizes, priority }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SafeImage src={src} alt={alt} sizes={sizes} priority={priority} className={className} />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        aria-label={`View larger image: ${alt}`}
        className="group/zoom absolute inset-0 z-20 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
      >
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/zoom:opacity-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#0F172A] shadow-md backdrop-blur-sm">
            <Maximize2 className="h-4 w-4" />
          </span>
        </span>
      </button>
      <Lightbox src={src} alt={alt} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
