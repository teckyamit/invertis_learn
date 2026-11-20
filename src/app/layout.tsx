import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#111827] font-sans antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:p-3">Skip to content</a>
        <Navbar />
        <main id="main-content" className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
