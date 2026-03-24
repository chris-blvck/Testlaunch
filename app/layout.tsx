import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurant Builder — Deploy beautiful sites in seconds",
  description: "Create and deploy stunning one-page restaurant websites instantly.",
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
