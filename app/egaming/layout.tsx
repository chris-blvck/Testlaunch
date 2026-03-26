import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3328 E-Sport Club — Pattaya",
  description: "Premier e-sport gaming club in Pattaya. PC Gaming, PS5 Lounge, Pool & Bar. Open daily 2PM–12AM.",
};

export default function EgamingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
