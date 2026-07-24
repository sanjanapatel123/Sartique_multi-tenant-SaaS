import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Sartique - The AI-native Brand",
    template: "%s | Sartique",
  },
  description:
    "Sartique is an AI-native platform designed to simplify operations for bespoke fashion and lifestyle brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
