import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NavigationProgress } from "@/components/common/NavigationProgress";
import { GoatCounter } from "@/components/common/GoatCounter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  fallback: ["Inter", "-apple-system", "sans-serif"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_ORIGIN || "https://invertislearn.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Invertis Learn | Academic Companion",
    template: "%s | Invertis Learn",
  },
  description: "Independent academic resource and syllabus library for Invertis University students.",
  openGraph: {
    title: "Invertis Learn | Academic Companion",
    description: "Independent academic resource and syllabus library for Invertis University students.",
    url: appUrl,
    siteName: "Invertis Learn",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/invertis-learn-logo-512.png",
        width: 512,
        height: 512,
        alt: "Invertis Learn Academic Companion",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Invertis Learn | Academic Companion",
    description: "Independent academic resource and syllabus library for Invertis University students.",
    images: ["/images/invertis-learn-logo-512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/invertis-learn-logo-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/invertis-learn-logo-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Invertis Learn",
    "alternateName": "Invertis Academic Resource Companion",
    "url": appUrl,
    "description": "Public academic companion providing official syllabi, previous-year question papers, faculty notes, and lab manuals for Invertis University students.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${appUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#111827] font-sans antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-brand-navy focus:font-bold focus:shadow-md focus:ring-2 focus:ring-blue-600 focus:rounded-lg">
          Skip to content
        </a>
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <Navbar />
        <main id="main-content" className="flex-1 w-full">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <GoatCounter />
        </Suspense>
      </body>
    </html>
  );
}
