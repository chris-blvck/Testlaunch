"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch

    let mx = -200, my = -200, rx = -200, ry = -200;
    let big = false;
    let frame: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e: MouseEvent) => {
      big = !!(e.target as HTMLElement).closest("a, button, [role=button], label");
    };

    const tick = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      const size = big ? 52 : 34;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - size / 2}px, ${ry - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.opacity = big ? "1" : "0.5";
      }
      frame = requestAnimationFrame(tick);
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[99999]"
        style={{ mixBlendMode: "difference" }} />
      <div ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-white pointer-events-none z-[99999]"
        style={{ width: 34, height: 34, mixBlendMode: "difference", transition: "width .25s ease, height .25s ease, opacity .25s ease" }} />
    </>
  );
}
