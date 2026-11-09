import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Computer Modern, the LaTeX font (CMU Serif, OFL, see fonts/OFL.txt).
// Served from the site itself. A Google Fonts @import at the top of
// globals.css is dropped by the CSS pipeline, which is how an earlier font
// never loaded.
const cmuSerif = localFont({
  src: [
    { path: "./fonts/cmu-serif-500-roman.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cmu-serif-500-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cmu-serif-700-roman.woff2", weight: "700", style: "normal" },
    { path: "./fonts/cmu-serif-700-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-cmu-serif",
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
    <html lang="en" className={`${cmuSerif.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
