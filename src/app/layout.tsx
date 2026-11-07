import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { SITE } from "@/constants/site";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit-src",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-src",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-src",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Morya Travels | Outstation Cabs, Airport Transfers, Tempo Traveller",
    template: "%s | Morya Travels",
  },
  description: "Book reliable cabs, airport transfers, pilgrimage trips, and group travel in Pune & Maharashtra. 24/7 service, clean vehicles, professional drivers.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "Morya Travels",
    description: "Your trusted travel partner in Pune — outstation cabs, airport transfers, pilgrimage and group travel.",
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    images: [{ url: "/logo.jpeg", width: 1254, height: 1254, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morya Travels",
    description: "Your trusted travel partner in Pune — outstation cabs, airport transfers, pilgrimage and group travel.",
    images: ["/logo.jpeg"],
  },
  robots: { index: true, follow: true },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: SITE.name,
  description: "Cab and tempo traveller service in Pune offering outstation trips, airport transfers, pilgrimage tours and corporate travel across Maharashtra.",
  url: SITE.url,
  telephone: SITE.phoneDisplay,
  email: SITE.email,
  image: `${SITE.url}${SITE.logo}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "S.No 34, Kanifnath Housing Society, 2, Kharadi Rd, Borate Vasti, Chandan Nagar, Kharadi",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411014",
    addressCountry: "IN",
  },
  areaServed: "Maharashtra",
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "₹₹",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased theme-light`}
    >
      <body className="min-h-full flex flex-col bg-white text-text-primary selection:bg-brand-blue/30 transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <ScrollProgress />
        <TopBar />
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
