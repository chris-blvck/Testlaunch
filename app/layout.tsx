import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kabal — Website Agency · Bangkok & Pattaya",
  description: "On construit des sites web qui convertissent — restaurants, clubs, barbershops et commerces locaux en Thaïlande.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
