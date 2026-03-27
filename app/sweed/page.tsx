"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── palette ───────────────────────────────────────────────────── */
const S = {
  void:    "#030505",
  dark:    "#070d07",
  green:   "#39ff14",
  greenDim:"#1faa0a",
  teal:    "#00e5c8",
  pink:    "#ff2d78",
  white:   "#f0fff0",
  smoke:   "#2a3a2a",
  muted:   "#4a6a4a",
  border:  "#0f1f0f",
};

/* ─── real data ─────────────────────────────────────────────────── */
const INFO = {
  address: "355/12 m 12 Phra Tam Nak 6 Alley, Pattaya City",
  district: "Bang Lamung District, Chon Buri 20150",
  phone:   "063 836 3311",
  hours:   "Closes 3AM",
  rating:  "5.0",
  reviews: "22 reviews",
  price:   "฿200–300",
  whatsapp:"https://wa.me/66638363311",
  line:    "https://line.me/ti/p/~sweed.pattaya",
  tel:     "tel:+66638363311",
};

const REVIEWS = [
  { text: "Perfect place to relax, unwind, and just enjoy the moment.", sub: "They've got a PlayStation too, so you can hang out, play, and meet some really cool new people." },
  { text: "Highly recommend checking out this place if you're in Pattaya.", sub: "★★★★★" },
  { text: "All the latest video games and huge selection, everything you need.", sub: "★★★★★" },
];

const STRAINS = [
  { name: "Cereal Milk",  thc: "25%", type: "INDICA",  color: "#ff4444" },
  { name: "Perzimmon",    thc: "24%", type: "INDICA",  color: "#ff6b00" },
  { name: "Super Boof",   thc: "26%", type: "HYBRID",  color: "#9b59ff" },
  { name: "Blue Zoski",   thc: "25%", type: "HYBRID",  color: "#00b5e8" },
  { name: "Tropicana",    thc: "23%", type: "SATIVA",  color: "#ffcc00" },
  { name: "Cherry OG",    thc: "22%", type: "SATIVA",  color: S.pink },
];

const CRYPTO = ["Solana", "USDT", "Bitcoin", "ETH", "Thai QR", "Cash"];

/* ─── page ──────────────────────────────────────────────────────── */
export default function SweedPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: S.void, color: S.white }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${S.void}; }
        ::-webkit-scrollbar-thumb { background: ${S.green}; }

        @keyframes neonFlicker {
          0%,19%,21%,23%,25%,54%,56%,100% {
            text-shadow: 0 0 8px ${S.green}, 0 0 20px ${S.green}, 0 0 50px ${S.green}, 0 0 100px ${S.green};
            opacity: 1;
          }
          20%,24%,55% { opacity: .7; text-shadow: none; }
        }
        @keyframes greenPulse {
          0%,100% { box-shadow: 0 0 20px ${S.green}40, 0 0 60px ${S.green}20; }
          50%      { box-shadow: 0 0 40px ${S.green}70, 0 0 120px ${S.green}30; }
        }
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .neon-text { animation: neonFlicker 6s ease-in-out infinite; }
        .green-glow { animation: greenPulse 3s ease-in-out infinite; }
        .marquee-track { animation: marquee 18s linear infinite; }
        .marquee-slow  { animation: marquee 30s linear infinite; }
      `}</style>
      <Navbar />
      <Hero />
      <Ticker />
      <Vibe />
      <Strains />
      <Reviews />
      <NightBreak />
      <Contact />
      <Footer />
      <StickyBtn />
    </div>
  );
}

/* ─── navbar ────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? `rgba(3,5,5,.95)` : "transparent", borderBottom: scrolled ? `1px solid ${S.border}` : "none", backdropFilter: scrolled ? "blur(20px)" : "none" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-russo text-xl tracking-widest uppercase neon-text" style={{ color: S.green }}>
          SWEED
        </span>
        <div className="hidden md:flex items-center gap-8">
          {[["Menu", "strains"], ["Vibe", "vibe"], ["Find us", "contact"]].map(([l, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.25em] transition-colors hover:text-white"
              style={{ color: S.muted }}>{l}</button>
          ))}
        </div>
        <a href={INFO.whatsapp} target="_blank" rel="noopener noreferrer"
          className="text-xs font-black px-5 py-2.5 tracking-widest uppercase transition-all green-glow"
          style={{ background: S.green, color: S.void }}>
          {INFO.hours}
        </a>
      </div>
    </nav>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: S.void }}>
      {/* night exterior — the money shot */}
      <img src="/sweed/exterior_night.jpg" alt="Sweed at night"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.6) saturate(1.6) contrast(1.1)", objectPosition: "center 30%" }} />

      {/* green neon glow rising from bottom — matches the actual floor lights */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 50% at 50% 100%, rgba(57,255,20,.25) 0%, transparent 65%)" }} />

      {/* left dark fade for text */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(3,5,5,.95) 25%, rgba(3,5,5,.4) 60%, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: `linear-gradient(to top, ${S.void}, transparent)` }} />

      <div className={`relative z-10 px-8 md:px-16 pb-20 max-w-5xl w-full transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* rating badge */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-black text-xs px-3 py-1.5 tracking-widest uppercase"
            style={{ background: S.green, color: S.void }}>
            {INFO.rating} ★ · {INFO.reviews}
          </span>
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: S.muted }}>Pattaya, Thailand</span>
        </div>

        {/* giant title */}
        <h1 className="font-russo leading-none neon-text"
          style={{ fontSize: "clamp(5.5rem,20vw,18rem)", color: S.green, letterSpacing: "-0.01em" }}>
          SWEED
        </h1>

        {/* outline subtitle */}
        <h2 className="font-russo leading-none mb-8"
          style={{ fontSize: "clamp(1.2rem,4vw,3.5rem)", color: "transparent", WebkitTextStroke: `1px rgba(240,255,240,.4)`, letterSpacing: "0.08em" }}>
          CANNABIS DISPENSARY
        </h2>

        <p className="text-base md:text-lg mb-12 max-w-md leading-relaxed" style={{ color: "rgba(240,255,240,.6)" }}>
          Premium strains. PS5 inside. Football on the big screen. Accepts crypto. Opens every night — closes 3AM.
        </p>

        <div className="flex flex-wrap gap-4">
          <button onClick={() => document.getElementById("strains")?.scrollIntoView({ behavior: "smooth" })}
            className="font-black px-10 py-4 text-sm tracking-widest uppercase transition-all green-glow"
            style={{ background: S.green, color: S.void }}>
            See the menu
          </button>
          <a href={`tel:${INFO.phone}`}
            className="font-bold px-10 py-4 text-sm tracking-widest uppercase border transition-all hover:border-green-400"
            style={{ borderColor: "rgba(57,255,20,.3)", color: "rgba(240,255,240,.6)" }}>
            {INFO.phone}
          </a>
        </div>
      </div>

      {/* big "3AM" floating top right */}
      <div className={`absolute top-20 right-8 text-right hidden md:block transition-all duration-1000 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <p className="font-russo leading-none" style={{ fontSize: "clamp(4rem,8vw,7rem)", color: "rgba(57,255,20,.15)" }}>CLOSES</p>
        <p className="font-russo leading-none" style={{ fontSize: "clamp(5rem,10vw,9rem)", color: "rgba(57,255,20,.25)" }}>3AM</p>
      </div>
    </section>
  );
}

/* ─── TICKER ────────────────────────────────────────────────────── */
function Ticker() {
  const a = ["SATIVA", "HYBRID", "INDICA", "CBD DRINKS", "CLOSES 3AM", "PS5 INSIDE", "FOOTBALL ON TV", "CRYPTO OK", "5.0 ★★★★★", "PATTAYA", "PREMIUM STRAINS", "WALK-INS"];
  const b = [...a, ...a];
  return (
    <>
      <div className="overflow-hidden py-3.5 border-y" style={{ borderColor: S.border, background: "#060c06" }}>
        <div className="flex whitespace-nowrap marquee-track">
          {b.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-5">
              <span className="font-russo text-xs tracking-[0.3em] uppercase" style={{ color: S.green }}>{item}</span>
              <span style={{ color: S.muted, fontSize: "5px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden py-3.5 border-b" style={{ borderColor: S.border, background: S.void }}>
        <div className="flex whitespace-nowrap marquee-slow" style={{ animationDirection: "reverse" }}>
          {b.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-5">
              <span className="font-russo text-xs tracking-[0.3em] uppercase" style={{ color: S.smoke }}>{item}</span>
              <span style={{ color: S.border, fontSize: "5px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── VIBE (PS5 + Football split) ───────────────────────────────── */
function Vibe() {
  const { ref, inView } = useInView();
  return (
    <section id="vibe">
      {/* PS5 row */}
      <div className="grid md:grid-cols-[3fr_2fr]" style={{ minHeight: "70vh" }}>
        <div className="relative overflow-hidden min-h-[55vw] md:min-h-full">
          <img src="/sweed/ps5_screen.jpg" alt="PS5 at Sweed"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, transparent 50%, rgba(3,5,5,.98))" }} />
          {/* neon open sign glow */}
          <div className="absolute top-0 left-0 right-0 h-24"
            style={{ background: "linear-gradient(to bottom, rgba(255,45,120,.08), transparent)" }} />
        </div>
        <div ref={ref}
          className={`flex flex-col justify-center px-10 md:px-14 py-20 transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          style={{ background: S.void }}>
          <p className="font-russo text-xs tracking-[0.5em] uppercase mb-5" style={{ color: S.green }}>The vibe</p>
          <h2 className="font-russo leading-[0.88] mb-8"
            style={{ fontSize: "clamp(3rem,6vw,5rem)", color: S.white }}>
            ROLL UP.<br />
            <span className="neon-text" style={{ color: S.green }}>PLUG IN.</span><br />
            CHILL.
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: S.muted }}>
            Not just a dispensary. A place to stay. PS5, football on the big screen, cold drinks, and the best strains in Pattaya.
          </p>
          <ul className="space-y-3 mb-10">
            {["PlayStation 5 in-store", "Big screen football", "CBD drinks & refreshments", "Solana · USDT · BTC · ETH", "Air-conditioned · Walk-ins welcome"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm" style={{ color: "rgba(240,255,240,.75)" }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: S.green }} />
                {t}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 max-w-[2.5rem]" style={{ background: S.green }} />
            <p className="text-xs tracking-widest uppercase font-black" style={{ color: S.green }}>Open · Closes 3AM</p>
          </div>
        </div>
      </div>

      {/* Football row — flipped */}
      <div className="grid md:grid-cols-[2fr_3fr]" style={{ minHeight: "50vh" }}>
        <div className="flex flex-col justify-center px-10 md:px-14 py-16"
          style={{ background: "#060d06" }}>
          <h3 className="font-russo leading-none mb-4"
            style={{ fontSize: "clamp(2rem,5vw,4rem)", color: "transparent", WebkitTextStroke: `1.5px ${S.green}` }}>
            WATCH THE<br />GAME.
          </h3>
          <p className="text-sm" style={{ color: S.muted }}>
            Big screen, cold vibes, premium selection. Who needs a sports bar?
          </p>
        </div>
        <div className="relative overflow-hidden min-h-[40vw] md:min-h-full">
          <img src="/sweed/football_tv.jpg" alt="Football at Sweed"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to left, transparent 60%, rgba(6,13,6,.98))" }} />
          {/* pink neon glow from OPEN sign */}
          <div className="absolute top-0 left-0 right-0 h-20"
            style={{ background: "linear-gradient(to bottom, rgba(255,45,120,.12), transparent)" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── STRAINS ───────────────────────────────────────────────────── */
function Strains() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="strains" style={{ background: S.void }}>
      {/* counter full-width strip */}
      <div className="relative overflow-hidden" style={{ height: "min(50vh, 400px)" }}>
        <img src="/sweed/counter2.jpg" alt="Sweed strain display"
          className="w-full h-full object-cover" style={{ objectPosition: "center 35%" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 20%, rgba(3,5,5,.9))" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(57,255,20,.06), transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-8">
          <h2 className="font-russo leading-none"
            style={{ fontSize: "clamp(3rem,10vw,9rem)", color: "transparent", WebkitTextStroke: `2px ${S.green}` }}>
            THE MENU
          </h2>
        </div>
      </div>

      {/* strain grid */}
      <div className="px-6 md:px-8 pb-0 pt-2">
        <div ref={ref}
          className={`grid grid-cols-2 md:grid-cols-3 gap-px transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ background: S.border }}>
          {STRAINS.map((s, i) => (
            <div key={s.name}
              className={`px-7 py-7 group hover:brightness-110 transition-all duration-300 cursor-default ${inView ? "opacity-100" : "opacity-0"}`}
              style={{ background: i % 2 === 0 ? S.dark : "#060d06", transitionDelay: `${i * 60}ms` }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-[9px] font-black px-2 py-0.5 tracking-[0.3em] uppercase"
                  style={{ background: s.color + "22", color: s.color }}>{s.type}</span>
                <span className="font-russo text-2xl" style={{ color: s.color }}>{s.thc}</span>
              </div>
              <h3 className="font-russo text-lg text-white mb-2">{s.name}</h3>
              <div className="w-6 h-0.5 mt-3 transition-all duration-300 group-hover:w-12" style={{ background: s.color }} />
            </div>
          ))}
        </div>

        {/* shelves photo + accessories */}
        <div className="grid md:grid-cols-2 gap-px" style={{ background: S.border }}>
          <div className="relative overflow-hidden" style={{ minHeight: "280px" }}>
            <img src="/sweed/shelves.png" alt="Accessories"
              className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(3,5,5,.8), transparent)" }} />
            <p className="absolute bottom-5 left-6 font-russo text-xl" style={{ color: S.green }}>Accessories & gear</p>
          </div>
          <div className="flex flex-col justify-between p-10" style={{ background: S.dark }}>
            <div>
              <p className="font-russo text-xs tracking-[0.4em] uppercase mb-4" style={{ color: S.green }}>Also available</p>
              <ul className="space-y-3">
                {["Sativa · Hybrid · Indica", "Pre-rolled joints", "CBD drinks", "Coke · Fanta", "Coffee · Tea", "Accessories"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm" style={{ color: S.muted }}>
                    <span style={{ color: S.green }}>—</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8 border-t" style={{ borderColor: S.border }}>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: S.muted }}>Price per person</p>
              <p className="font-russo text-4xl" style={{ color: S.white }}>{INFO.price}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS (white contrast shock) ────────────────────────────── */
function Reviews() {
  const { ref, inView } = useInView(0.2);
  return (
    <section style={{ background: "#f4fff4" }}>
      <div ref={ref} className={`max-w-7xl mx-auto px-6 md:px-16 py-28 md:py-40 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid md:grid-cols-[auto_1fr] gap-16 items-start">

          {/* giant rating */}
          <div>
            <p className="font-russo leading-none" style={{ fontSize: "clamp(7rem,18vw,15rem)", color: "#070d07" }}>
              {INFO.rating}
            </p>
            <div className="flex gap-1 -mt-4 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: "#39ff14", fontSize: "2rem" }}>★</span>
              ))}
            </div>
            <p className="font-russo text-sm tracking-widest uppercase" style={{ color: "#4a6a4a" }}>{INFO.reviews} · Google Maps</p>
          </div>

          {/* review quotes */}
          <div className="space-y-10 pt-4">
            {REVIEWS.map((r, i) => (
              <div key={i}
                className={`border-l-4 pl-8 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                style={{ borderColor: "#39ff14", transitionDelay: `${i * 120 + 200}ms` }}>
                <p className="font-russo text-xl md:text-2xl leading-tight mb-2" style={{ color: "#070d07" }}>
                  "{r.text}"
                </p>
                <p className="text-sm" style={{ color: "#4a6a4a" }}>{r.sub}</p>
              </div>
            ))}
            <a href="https://g.co/kgs/sweed" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-4 text-xs font-black px-8 py-3 tracking-widest uppercase transition-all hover:opacity-80"
              style={{ background: "#070d07", color: "#39ff14" }}>
              Leave a review →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── NIGHT BREAK ───────────────────────────────────────────────── */
function NightBreak() {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
      <img src="/sweed/exterior_night.jpg" alt="Sweed at night"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.5) saturate(1.8) contrast(1.15)", objectPosition: "center 30%" }} />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(57,255,20,.2) 0%, transparent 70%)" }} />
      <div className="absolute inset-0"
        style={{ background: "rgba(3,5,5,.45)" }} />

      <div className={`relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center transition-all duration-1200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <p className="font-russo text-xs tracking-[0.8em] uppercase mb-8" style={{ color: S.green }}>
          Every night · Pattaya City
        </p>
        <h2 className="font-russo leading-none mb-6 neon-text"
          style={{ fontSize: "clamp(4rem,14vw,12rem)", color: S.green }}>
          CLOSES
        </h2>
        <h2 className="font-russo leading-none mb-10"
          style={{ fontSize: "clamp(4rem,14vw,12rem)", color: "transparent", WebkitTextStroke: "2px rgba(240,255,240,.8)" }}>
          3AM
        </h2>
        <div className="w-14 h-px" style={{ background: S.green }} />
        <p className="mt-8 text-base max-w-sm leading-relaxed" style={{ color: "rgba(240,255,240,.5)" }}>
          The last good place still open. Roll in anytime.
        </p>
      </div>
    </section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────────── */
function Contact() {
  const { ref, inView } = useInView();
  return (
    <section id="contact" className="py-28 md:py-40" style={{ background: S.void }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div ref={ref}
          className={`grid md:grid-cols-[1fr_auto] gap-16 items-start transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          <div>
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: S.green }}>Find us</p>
            <h2 className="font-russo leading-none mb-12"
              style={{ fontSize: "clamp(4rem,12vw,10rem)", color: S.white }}>
              COME<br />
              <span className="neon-text" style={{ color: S.green }}>IN.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: S.green }}>Address</p>
                <p className="font-russo text-lg text-white mb-1">Sweed Cannabis Dispensary</p>
                <p className="text-sm leading-relaxed" style={{ color: S.muted }}>{INFO.address}</p>
                <p className="text-sm" style={{ color: S.muted }}>{INFO.district}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: S.green }}>Hours & Phone</p>
                <p className="font-russo text-3xl" style={{ color: S.green }}>Closes 3AM</p>
                <p className="text-sm mt-1 mb-3" style={{ color: S.muted }}>Open every day · Walk-ins welcome</p>
                <a href={INFO.tel} className="font-russo text-xl text-white hover:opacity-80 transition-opacity">{INFO.phone}</a>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: S.green }}>Payments</p>
                <div className="flex flex-wrap gap-2">
                  {CRYPTO.map((p) => (
                    <span key={p} className="text-xs px-3 py-1.5 font-mono tracking-wider border"
                      style={{ borderColor: S.border, color: S.muted }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[220px]">
            <a href={INFO.whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center py-5 px-8 font-black tracking-widest uppercase text-sm transition-all green-glow hover:opacity-80"
              style={{ background: S.green, color: S.void }}>
              WhatsApp
            </a>
            <a href={INFO.line} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center py-5 px-8 font-black tracking-widest uppercase text-sm transition-opacity hover:opacity-80"
              style={{ background: "#06C755", color: "#fff" }}>
              Line
            </a>
            <a href={INFO.tel} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center py-5 px-8 font-black tracking-widest uppercase text-sm border transition-all hover:border-green-400"
              style={{ border: `1px solid ${S.green}`, color: S.green }}>
              {INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-8 border-t" style={{ background: "#020404", borderColor: S.border }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-russo text-2xl tracking-widest uppercase neon-text" style={{ color: S.green }}>SWEED</span>
          <span className="text-[9px] tracking-[0.4em] uppercase ml-4" style={{ color: S.muted }}>Cannabis Dispensary · Pattaya</span>
        </div>
        <p className="text-xs" style={{ color: "#1a2e1a" }}>© 2026 Sweed · Pattaya · Thailand</p>
      </div>
    </footer>
  );
}

/* ─── STICKY ────────────────────────────────────────────────────── */
function StickyBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href={INFO.whatsapp} target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 font-black px-6 py-3 text-sm tracking-widest uppercase shadow-2xl transition-all duration-300 green-glow ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: S.green, color: S.void }}>
      Order now
    </a>
  );
}

declare module "react" {
  interface CSSProperties { WebkitTextStroke?: string; }
}
