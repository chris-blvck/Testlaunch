import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Lotus Clinic Pattaya — Aesthetic & Wellness",
  description: "Premium aesthetic and wellness clinic in Pattaya. Skin treatments, anti-aging, IV therapy, health checkups. Book a consultation today.",
};
export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
