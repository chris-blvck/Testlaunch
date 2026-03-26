"use client";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Skip on touch / reduced-motion devices
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let rafId: number;
    const ease = 0.09; // lerp factor — lower = silkier

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target += e.deltaY * 1.0;
      target = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight));
    };

    const loop = () => {
      const dist = target - current;
      if (Math.abs(dist) > 0.1) {
        current += dist * ease;
        window.scrollTo(0, current);
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
