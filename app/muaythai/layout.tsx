import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tiger Muay Thai Camp Pattaya — Training & DTV Visa",
  description: "World-class Muay Thai training in Pattaya, Thailand. Beginner to pro programs. Official DTV Digital Nomad Visa support. Train. Stay. Live Thailand.",
};

export default function MuayThaiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
