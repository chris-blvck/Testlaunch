import type { Metadata } from "next";
import { Inter, Orbitron, Russo_One, Exo_2, Playfair_Display, Bebas_Neue, Righteous, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollProgress from "./components/ScrollProgress";

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

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Kabal — Website Agency · Bangkok & Pattaya",
  description: "We build websites that convert — for restaurants, clubs, barbershops and local businesses across Thailand. 48-hour delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${orbitron.variable} ${russoOne.variable} ${exo2.variable} ${playfair.variable} ${bebasNeue.variable} ${righteous.variable} ${cormorant.variable} min-h-full antialiased`}>
        <ScrollProgress />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
