"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    if (sessionStorage.getItem("kabal-intro")) return;
    setShow(true);
    const t1 = setTimeout(() => setPhase("hold"), 900);
    const t2 = setTimeout(() => setPhase("out"), 1900);
    const t3 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("kabal-intro", "1");
    }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
      style={{
        opacity: phase === "out" ? 0 : 1,
        transition: phase === "out" ? "opacity 0.5s ease" : "none",
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      <style>{`
        @keyframes eye-in {
          0%   { transform: scale(0.3) rotate(-8deg); opacity: 0; filter: blur(12px); }
          65%  { transform: scale(1.06) rotate(1deg); opacity: 1; filter: blur(0); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0); }
        }
        @keyframes holo-pulse {
          0%,100% { filter: hue-rotate(0deg) brightness(1.05) saturate(1.3); }
          30%     { filter: hue-rotate(25deg) brightness(1.2) saturate(1.5); }
          65%     { filter: hue-rotate(-15deg) brightness(1.0) saturate(1.2); }
        }
        @keyframes text-rise {
          0%   { opacity: 0; transform: translateY(18px) scaleX(0.95); letter-spacing: 0.15em; }
          100% { opacity: 1; transform: translateY(0) scaleX(1); letter-spacing: 0.55em; }
        }
        @keyframes sub-fade {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes bar-fill {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        .eye-svg {
          animation: eye-in 0.85s cubic-bezier(.34,1.4,.64,1) 0.1s both,
                     holo-pulse 3s ease-in-out 0.95s infinite;
        }
        .loader-title {
          animation: text-rise 0.7s cubic-bezier(.23,1,.32,1) 0.55s both;
        }
        .loader-sub {
          animation: sub-fade 0.5s ease 0.95s both;
        }
        .loader-bar-fill {
          animation: bar-fill 1.7s cubic-bezier(.4,0,.2,1) 0.2s both;
        }
      `}</style>

      {/* Eye SVG — recreated from Kabal logo */}
      <svg
        className="eye-svg"
        viewBox="0 0 300 210"
        width="160"
        height="112"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: "2rem", overflow: "visible" }}
      >
        <defs>
          {/* Holographic gradient */}
          <radialGradient id="holo-fill" cx="44%" cy="38%" r="68%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#d8c820" />
            <stop offset="18%"  stopColor="#7cd028" />
            <stop offset="36%"  stopColor="#28c898" />
            <stop offset="54%"  stopColor="#209cd8" />
            <stop offset="72%"  stopColor="#3848c8" />
            <stop offset="88%"  stopColor="#c84020" />
            <stop offset="100%" stopColor="#d88020" />
          </radialGradient>
          {/* Clip to eye shape */}
          <clipPath id="eye-mask">
            <path d="M 18 105 C 65 18 235 18 282 105 C 235 192 65 192 18 105 Z" />
          </clipPath>
          {/* Glow filter */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Fill ── */}
        <path d="M 18 105 C 65 18 235 18 282 105 C 235 192 65 192 18 105 Z"
          fill="url(#holo-fill)" />

        {/* ── Iris rings (dark, clipped) ── */}
        <g clipPath="url(#eye-mask)" fill="none" stroke="#1c0e04" strokeLinecap="round">
          {/* Outermost arc (top half only — upper eyelid line) */}
          <path d="M 18 105 C 65 18 235 18 282 105" strokeWidth="7" />
          {/* Concentric ellipse 1 */}
          <path d="M 48 105 C 85 42 215 42 252 105 C 215 168 85 168 48 105 Z" strokeWidth="5.5" />
          {/* Concentric ellipse 2 */}
          <path d="M 82 105 C 108 60 192 60 218 105 C 192 150 108 150 82 105 Z" strokeWidth="4.5" />
          {/* Inner arc (bottom iris crescent) */}
          <path d="M 105 112 C 128 142 172 142 195 112" strokeWidth="4" />
        </g>

        {/* ── Pupil (teardrop pointing up) ── */}
        <path
          d="M 150 84 C 163 84, 172 97, 172 112 C 172 130, 161 140, 150 143 C 139 140, 128 130, 128 112 C 128 97, 137 84, 150 84 Z"
          fill="#1c0e04"
          clipPath="url(#eye-mask)"
        />
        {/* Pupil highlight */}
        <path d="M 138 98 C 143 91, 157 91, 162 98"
          fill="none" stroke="#1c0e04" strokeWidth="3.5" strokeLinecap="round"
          clipPath="url(#eye-mask)"
        />

        {/* ── Eye outline ── */}
        <path d="M 18 105 C 65 18 235 18 282 105 C 235 192 65 192 18 105 Z"
          fill="none" stroke="#241206" strokeWidth="10" strokeLinejoin="round" />

        {/* ── Rays above ── */}
        <g stroke="#1c0e04" strokeWidth="6.5" strokeLinecap="round" filter="url(#glow)">
          {/* Center vertical */}
          <line x1="150" y1="20" x2="150" y2="5" />
          {/* Inner left */}
          <line x1="122" y1="26" x2="114" y2="12" />
          {/* Inner right */}
          <line x1="178" y1="26" x2="186" y2="12" />
          {/* Outer left */}
          <line x1="96"  y1="44" x2="84"  y2="31" />
          {/* Outer right */}
          <line x1="204" y1="44" x2="216" y2="31" />
        </g>
      </svg>

      {/* Brand name */}
      <p className="loader-title text-white font-black text-3xl tracking-[0.55em] uppercase select-none">
        Kabal
      </p>
      <p className="loader-sub text-zinc-600 text-[10px] font-bold tracking-[0.45em] uppercase mt-2 select-none">
        Website Agency
      </p>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900">
        <div className="loader-bar-fill h-full" style={{ background: "linear-gradient(90deg, #d8c820, #28c898, #209cd8)" }} />
      </div>
    </div>
  );
}
