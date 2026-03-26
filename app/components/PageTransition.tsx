"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    setVisible(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(t);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s cubic-bezier(.23,1,.32,1), transform 0.4s cubic-bezier(.23,1,.32,1)",
      }}
    >
      {children}
    </div>
  );
}
