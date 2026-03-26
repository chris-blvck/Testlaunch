"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDE_ON = ["/", "/services"];

export default function BackButton() {
  const path = usePathname();
  if (HIDE_ON.includes(path)) return null;
  return (
    <Link href="/"
      className="group fixed top-[72px] left-5 z-40 flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300"
      style={{ color: "rgba(255,255,255,0.35)" }}
      onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
      <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
      <span>Portfolio</span>
    </Link>
  );
}
