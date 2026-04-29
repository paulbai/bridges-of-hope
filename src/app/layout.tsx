import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bridges of Hope | Verified Humanitarian Impact",
  description:
    "Connecting your compassion with world-class transparency. Every dollar reaches the hands that need it most.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Script
          src="https://flot-dashboard.vercel.app/api/public/tracker.js?id=fdb1f101-4c63-4e5e-8bb1-e5f4ad2bac65"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
