import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Luxury Collection Pattaya — Nails · Brows · Lashes",
  description: "Premium nail salon in Pattaya. Gel nails, chrome, extensions, eyelashes & brows. 4.9★ rated. Open daily 09:00–20:00. Call 080 646 3905.",
};
export default function NailsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
