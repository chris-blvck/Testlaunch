import type { Metadata } from "next";
import { Inter, Orbitron, Russo_One, Exo_2 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const russoOne = Russo_One({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-russo",
});

const exo2 = Exo_2({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "Kabal — Website Agency · Bangkok & Pattaya",
  description: "On construit des sites web qui convertissent — restaurants, clubs, barbershops et commerces locaux en Thaïlande.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${orbitron.variable} ${russoOne.variable} ${exo2.variable} min-h-full bg-gray-50 antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
