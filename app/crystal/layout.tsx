import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Crystal Design — Luxury Lighting Showroom · Pattaya",
  description: "Thailand's finest crystal chandelier showroom. 500+ models of crystal chandeliers, wall lights and luxury lighting. Custom sizes, installation included. Pattaya.",
};
export default function CrystalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
