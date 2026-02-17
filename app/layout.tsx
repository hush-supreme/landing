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
