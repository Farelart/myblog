import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Served from the site itself. A Google Fonts @import at the top of
// globals.css is dropped by the CSS pipeline, which is how the previous font
// never loaded.
const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Farel Ganlaky",
  description: "Farel Ganlaky, AI engineer working on enterprise search and LLM inference at Tamebi AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
