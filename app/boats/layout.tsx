import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blue Horizon — Boat Rentals & Island Tours · Pattaya",
  description: "Private speedboats, catamarans and yacht charters from Pattaya. Island hopping, sunset cruises, snorkeling tours. Book your trip today.",
};
export default function BoatsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
