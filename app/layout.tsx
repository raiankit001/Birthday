import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "A Little Surprise 🎁", description: "A birthday surprise" };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Playfair+Display:wght@500;700&display=swap"
        />
      </head>
      <body className="font-display">{children}</body>
    </html>
  );
}
