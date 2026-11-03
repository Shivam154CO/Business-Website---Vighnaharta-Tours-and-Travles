import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
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
  title: "Shree Vighnaharta Travels | Outstation Cabs, Airport Transfers, Tempo Traveller",
  description: "Book reliable cabs, airport transfers, pilgrimage trips, and group travel in Pune & Maharashtra. 24/7 service, clean vehicles, professional drivers.",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "Shree Vighnaharta Travels",
    description: "Your trusted travel partner in Pune.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-text-primary selection:bg-brand-blue/30">
        <ScrollProgress />
        <TopBar />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
