import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans, Quicksand } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import PageTransition from "./components/PageTransition";
import { ViewTransitions } from "next-view-transitions";
import AnalyticsProvider from "./components/ui/AnalyticsProvider";
import ScrollProgress from "./components/ui/ScrollProgress";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  display: "swap",
});

export const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Ayada Cliff – Luxury Oceanfront Private Pool Villas in Varkala, Kerala",
  description:
    "Escape to Ayada Cliff – premium oceanfront villas with private pools, breathtaking cliffside views, and world-class hospitality in Varkala, Kerala.",
  keywords: [
    "Ayada Cliff",
    "Varkala Villas",
    "Luxury Villas Kerala",
    "Oceanfront Villa Varkala",
    "Private Pool Villa Varkala",
    "Luxury Resort Kerala",
    "Cliffside Villas Kerala",
    "Ayada Cliff Resort",
    "Beachfront Villas Kerala",
    "Luxury Stay Varkala",
    "Varkala",
    "Kaapil",
    "Edava",
    "Beach Resort Varkala",
    "Luxury Beach Resort Varkala",
    "Ayada Cliff Beach Villas",
    "Ayada Cliff Luxury Villas",
  ],
  authors: [{ name: "Deflated Pappadam", url: "https://deflatedpappadam.com" }],
  creator: "Ayada Cliff",
  metadataBase: new URL("https://ayadacliff.com"),
  openGraph: {
    title: "Ayada Cliff – Luxury Oceanfront Villas in Varkala",
    description:
      "Indulge in ultimate luxury at Ayada Cliff – private pool villas with panoramic Arabian Sea views, set atop Varkala &apos;s stunning cliffs.",
    url: "https://ayadacliff.com",
    siteName: "Ayada Cliff",
    images: [
      {
        url: "https://ayadacliff.com/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ayada Cliff Luxury Ocean View Villa",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayada Cliff – Luxury Ocean View Villas in Varkala, Kerala",
    description:
      "Private oceanfront villas with pools, breathtaking sunsets, and luxury amenities – experience Ayada Cliff, Varkala.",
    images: ["https://ayadacliff.com/opengraph-image.jpg"], // Replace with actual
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} quicksand hide-scrollbar antialiased`}
      >
        <ScrollProgress />
        <Analytics />
        <SpeedInsights />
        <AnalyticsProvider>
          <ViewTransitions>
            <PageTransition />
            <LenisProvider>{children}</LenisProvider>
          </ViewTransitions>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
