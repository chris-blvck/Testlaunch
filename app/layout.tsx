import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Restaurant Builder — Deploy beautiful sites in seconds",
  description: "Create and deploy stunning one-page restaurant websites instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${orbitron.variable} min-h-full bg-gray-50 antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
