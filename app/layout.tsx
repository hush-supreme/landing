import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hush — NFC-Powered Focus Mode",
  description:
    "No willpower required — just physics. Hush uses NFC tokens to create real, physical friction that stops mindless scrolling.",
  metadataBase: new URL("https://www.hushscreentime.com"),
  openGraph: {
    title: "Hush — NFC-Powered Focus Mode",
    description:
      "Tap to lock your apps. Tap again to unlock. The rest of your time is yours.",
    siteName: "Hush",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hush — NFC-Powered Focus Mode",
    description:
      "A boundary your phone can't bypass. Physical friction that stops mindless scrolling.",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>{children}</body>
    </html>
  );
}
