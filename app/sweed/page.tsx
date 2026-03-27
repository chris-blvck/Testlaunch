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
  dark:   "#060c06",
  darkMid:"#0d1a0d",
  teal:   "#00e5c8",
  tealDim:"#00b89e",
  lime:   "#a8ff3e",
  limeDim:"#6faa28",
  white:  "#f4fff4",
  muted:  "#6b8f6b",
  border: "#1a2e1a",
};

/* ─── data ──────────────────────────────────────────────────────── */
const STRAINS = [
  { name: "Cereal Milk",  thc: "25%", type: "INDICA",  flavor: "Y Life × Cookies Cherry Pie",   color: "#ff4444" },
  { name: "Perzimmon",    thc: "24%", type: "INDICA",  flavor: "Rainbow Cheddar × Gastropop",    color: "#ff6b00" },
  { name: "Super Boof",   thc: "26%", type: "HYBRID",  flavor: "Black Cherry Punch × Tropicana", color: "#9b59ff" },
  { name: "Blue Zoski",   thc: "25%", type: "HYBRID",  flavor: "Zkittlez × Runtz",               color: "#00b5e8" },
  { name: "Tropicana",    thc: "23%", type: "SATIVA",  flavor: "Citrus · Tropical · Energetic",  color: "#ffcc00" },
  { name: "Cherry OG",    thc: "22%", type: "SATIVA",  flavor: "Cherry Pie × OG Kush",           color: "#ff3399" },
];

const MENU = [
  { cat: "WEED", items: ["Sativa", "Hybrid", "Indica", "Pre-rolls · Joints"] },
  { cat: "DRINKS", items: ["CBD Drink", "Coke · Fanta", "Coffee · Tea", "Cold brew"] },
  { cat: "ACCEPTS", items: ["Solana · USDT", "Bitcoin · ETH", "Cash · Card", "Thai QR"] },
];

const CONTACT = {
  whatsapp: "https://wa.me/66000000000",
  line: "https://line.me/ti/p/~sweed.pattaya",
  tel: "tel:+66000000000",
};

/* ─── page ──────────────────────────────────────────────────────── */
export default function SweedPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: S.dark, color: S.white }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${S.dark}; }
        ::-webkit-scrollbar-thumb { background: ${S.teal}; }
        @keyframes glow {
          0%,100% { text-shadow: 0 0 20px ${S.teal}60, 0 0 60px ${S.teal}20; }
          50%      { text-shadow: 0 0 40px ${S.teal}90, 0 0 100px ${S.teal}40; }
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .glow-text { animation: glow 3s ease-in-out infinite; }
        .marquee-track { animation: marquee 22s linear infinite; }
      `}</style>
      <Navbar />
      <Hero />
      <Ticker />
      <Vibe />
      <Strains />
      <Lounge />
      <Gallery />
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
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{ background: scrolled ? `${S.dark}f0` : "transparent", borderBottom: scrolled ? `1px solid ${S.border}` : "none", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col leading-none">
          <span className="font-russo text-xl tracking-widest uppercase glow-text" style={{ color: S.teal }}>SWEED</span>
          <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: S.muted }}>Cannabis Dispensary · Pattaya</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[["Strains", "strains"], ["Vibe", "vibe"], ["Find us", "contact"]].map(([l, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.25em] transition-colors hover:text-white"
              style={{ color: S.muted }}>{l}</button>
          ))}
        </div>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
          className="text-xs font-black px-5 py-2.5 tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{ background: S.teal, color: S.dark }}>
          Order now
        </a>
      </div>
    </nav>
  );
}

/* ─── hero ──────────────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: S.dark }}>
      {/* full-bleed exterior photo */}
      <img src="/sweed/exterior.jpg" alt="Sweed Cannabis Pattaya"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.45) saturate(1.1)" }} />

      {/* teal neon glow from ceiling */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,229,200,.07) 0%, transparent 50%, rgba(6,12,6,.9) 100%)" }} />

      {/* left fade for text */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(6,12,6,.92) 30%, rgba(6,12,6,.25) 70%, transparent)" }} />

      <div className={`relative z-10 px-8 md:px-16 pb-24 md:pb-32 max-w-5xl w-full transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px" style={{ background: S.teal }} />
          <p className="text-xs tracking-[0.5em] uppercase" style={{ color: S.teal }}>Pattaya · Thailand</p>
        </div>

        <h1 className="font-russo leading-none mb-2 glow-text"
          style={{ fontSize: "clamp(5rem,15vw,13rem)", color: S.teal }}>
          SWEED
        </h1>
        <h1 className="font-russo leading-none mb-10"
          style={{ fontSize: "clamp(2rem,6vw,5rem)", color: "transparent", WebkitTextStroke: `1.5px ${S.white}` }}>
          CANNABIS DISPENSARY
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-3 max-w-lg" style={{ color: "rgba(244,255,244,.75)" }}>
          Pattaya's finest selection of premium strains. Sativa, Hybrid, Indica — tested, curated, vibed.
        </p>
        <p className="text-xs tracking-[0.35em] uppercase mb-12" style={{ color: S.tealDim }}>
          CBD Drinks · Pre-rolls · Accepts Crypto
        </p>

        <div className="flex flex-wrap gap-4">
          <button onClick={() => document.getElementById("strains")?.scrollIntoView({ behavior: "smooth" })}
            className="font-black px-10 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-90"
            style={{ background: S.teal, color: S.dark }}>
            See the menu
          </button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold px-10 py-4 text-sm tracking-widest uppercase border transition-all hover:border-white/40"
            style={{ borderColor: "rgba(255,255,255,.2)", color: "rgba(255,255,255,.65)" }}>
            Find us
          </button>
        </div>
      </div>

      {/* neon sign image — bottom right */}
      <div className={`absolute bottom-0 right-0 w-[38%] md:w-[28%] max-w-xs opacity-0 md:opacity-100 pointer-events-none transition-all duration-1000 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <img src="/sweed/sign.jpg" alt="Sweed menu board"
          className="w-full h-full object-cover"
          style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,.8) 50%, transparent)", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,.8) 50%, transparent)" }} />
      </div>
    </section>
  );
}

/* ─── ticker ────────────────────────────────────────────────────── */
function Ticker() {
  const items = ["Sativa", "Hybrid", "Indica", "CBD Drinks", "Pre-rolls", "Accepts Crypto", "Solana · USDT", "Bitcoin · ETH", "Pattaya", "Open Daily", "Premium Strains", "Walk-ins Welcome"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y py-4" style={{ borderColor: S.border, background: S.darkMid }}>
      <div className="flex whitespace-nowrap marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5">
            <span className="font-russo text-sm tracking-widest uppercase" style={{ color: S.muted }}>{item}</span>
            <span style={{ color: S.teal, fontSize: "6px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── vibe / interior ───────────────────────────────────────────── */
function Vibe() {
  const { ref, inView } = useInView();
  return (
    <section id="vibe" className="grid md:grid-cols-[3fr_2fr] min-h-[80vh]">
      {/* full photo */}
      <div className="relative overflow-hidden min-h-[60vh] md:min-h-full">
        <img src="/sweed/lounge.jpg" alt="Sweed lounge"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, transparent 60%, rgba(6,12,6,.95))" }} />
        {/* teal LED ambient */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,229,200,.12), transparent)" }} />
      </div>

      {/* text */}
      <div ref={ref}
        className={`flex flex-col justify-center px-10 md:px-14 py-20 transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
        style={{ background: S.darkMid }}>
        <p className="text-xs tracking-[0.5em] uppercase mb-5" style={{ color: S.teal }}>The vibe</p>
        <h2 className="font-russo leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", color: S.white }}>
          CHILL.<br />
          <span style={{ color: S.teal }}>CURATED.</span><br />
          CRYPTO.
        </h2>
        <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: S.muted }}>
          A proper dispensary setup — not a random shop. Knowledgeable staff, ambient lighting, full strain display. Come in, sit down, find your vibe.
        </p>
        <ul className="space-y-3 mb-10">
          {[
            "Premium strains, lab-tested",
            "Full display counter with strain cards",
            "CBD drinks + refreshments",
            "Accepts Solana, USDT, BTC, ETH",
            "Air-conditioned · Walk-ins welcome",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm" style={{ color: S.white }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: S.teal }} />
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <div className="w-8 h-px" style={{ background: S.teal }} />
          <p className="text-xs tracking-widest uppercase" style={{ color: S.teal }}>10:00 – 00:00 · Every day</p>
        </div>
      </div>
    </section>
  );
}

/* ─── strains ───────────────────────────────────────────────────── */
function Strains() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="strains" className="py-28 md:py-36" style={{ background: S.dark }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16 md:mb-20">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: S.teal }}>Current menu</p>
          <h2 className="font-russo leading-none" style={{ fontSize: "clamp(3rem,9vw,7rem)", color: S.white }}>
            THE<br />
            <span style={{ color: "transparent", WebkitTextStroke: `2px ${S.teal}` }}>STRAINS</span>
          </h2>
        </div>

        {/* counter photo strip */}
        <div className="relative overflow-hidden mb-16" style={{ height: "280px", borderRadius: "0.75rem" }}>
          <img src="/sweed/counter.jpg" alt="Sweed strain counter"
            className="w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(6,12,6,.85))" }} />
          <p className="absolute bottom-5 left-8 font-russo text-3xl" style={{ color: S.teal }}>
            In-store display — ask us anything
          </p>
        </div>

        {/* strain cards */}
        <div ref={ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-px transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ background: S.border }}>
          {STRAINS.map((s, i) => (
            <div key={s.name}
              className={`p-7 flex flex-col gap-3 transition-all duration-300 hover:brightness-110 cursor-default ${inView ? "opacity-100" : "opacity-0"}`}
              style={{ background: S.darkMid, transitionDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black px-2.5 py-0.5 tracking-widest uppercase"
                  style={{ background: s.color + "22", color: s.color }}>{s.type}</span>
                <span className="font-russo text-2xl" style={{ color: s.color }}>{s.thc}</span>
              </div>
              <h3 className="font-russo text-xl text-white">{s.name}</h3>
              <p className="text-xs leading-relaxed" style={{ color: S.muted }}>{s.flavor}</p>
              <div className="w-8 h-px mt-auto" style={{ background: s.color }} />
            </div>
          ))}
        </div>

        {/* menu strip */}
        <div className="mt-16 grid md:grid-cols-3 gap-px" style={{ background: S.border }}>
          {MENU.map((m) => (
            <div key={m.cat} className="p-8" style={{ background: S.darkMid }}>
              <p className="font-russo text-xs tracking-[0.4em] uppercase mb-5" style={{ color: S.teal }}>{m.cat}</p>
              <ul className="space-y-2">
                {m.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: S.muted }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: S.teal }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── lounge break ──────────────────────────────────────────────── */
function Lounge() {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
      <img src="/sweed/interior_blue.jpg" alt="Sweed interior"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.5) saturate(1.2)" }} />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(6,12,6,.75) 40%, rgba(0,229,200,.06))" }} />

      <div className={`relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6 text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <p className="text-xs tracking-[0.7em] uppercase mb-6" style={{ color: S.teal }}>
          Pattaya · Cannabis · Community
        </p>
        <h2 className="font-russo leading-none mb-4"
          style={{ fontSize: "clamp(3rem,10vw,8rem)", color: "transparent", WebkitTextStroke: "2px rgba(0,229,200,.8)" }}>
          GOOD VIBES
        </h2>
        <h2 className="font-russo leading-none mb-10"
          style={{ fontSize: "clamp(2rem,6vw,5rem)", color: S.white }}>
          EVERY DAY
        </h2>
        <div className="w-14 h-px" style={{ background: S.teal }} />
        <p className="mt-8 text-lg max-w-md leading-relaxed" style={{ color: "rgba(244,255,244,.55)" }}>
          Walk in, relax on the sofa, browse the display. No rush, no pressure. Just Sweed.
        </p>
      </div>
    </section>
  );
}

/* ─── gallery ───────────────────────────────────────────────────── */
function Gallery() {
  const { ref, inView } = useInView(0.05);
  const imgs = [
    { src: "/sweed/exterior.jpg",      alt: "Sweed storefront",       span: "col-span-2 row-span-2" },
    { src: "/sweed/sign.jpg",          alt: "Menu board",             span: "" },
    { src: "/sweed/interior_blue.jpg", alt: "Blue LED interior",      span: "" },
    { src: "/sweed/counter.jpg",       alt: "Strain display counter", span: "col-span-2" },
    { src: "/sweed/lounge.jpg",        alt: "Lounge area",            span: "" },
    { src: "/sweed/sign.jpg",          alt: "Crypto payments",        span: "" },
  ];
  return (
    <section className="py-28 md:py-36" style={{ background: S.darkMid }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-14">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: S.teal }}>The shop</p>
          <h2 className="font-russo leading-none" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", color: S.white }}>
            SWEED<br />
            <span style={{ color: "transparent", WebkitTextStroke: `2px ${S.teal}` }}>PATTAYA</span>
          </h2>
        </div>
        <div ref={ref}
          className={`grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] gap-2 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          {imgs.map((img, i) => (
            <div key={`${img.src}-${i}`}
              className={`relative overflow-hidden group ${img.span} transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{
                borderRadius: i === 0 ? "1.25rem" : i % 3 === 0 ? "1.25rem 0.4rem 1.25rem 0.4rem" : "0.5rem",
                transitionDelay: `${i * 60}ms`,
              }}>
              <img src={img.src} alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-20 group-hover:opacity-80 transition-opacity duration-500" />
              {/* teal accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: S.teal }} />
              <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">{img.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── contact ───────────────────────────────────────────────────── */
function Contact() {
  const { ref, inView } = useInView();
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-44">
      <img src="/sweed/exterior.jpg" alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.2) saturate(0.8)" }} />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(6,12,6,.95) 50%, rgba(0,229,200,.06))" }} />

      <div ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-6 md:px-8 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="grid md:grid-cols-[1fr_auto] gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: S.teal }}>Find us</p>
            <h2 className="font-russo leading-none mb-8"
              style={{ fontSize: "clamp(3rem,9vw,7rem)", color: S.white }}>
              COME<br />
              <span style={{ color: "transparent", WebkitTextStroke: `2px ${S.teal}` }}>IN.</span>
            </h2>

            <div className="space-y-5 mb-10">
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: S.teal }}>Address</p>
                <p className="text-white font-russo text-lg">Sweed Cannabis Dispensary</p>
                <p className="text-sm mt-0.5" style={{ color: S.muted }}>Pattaya City · Chonburi · Thailand</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: S.teal }}>Hours</p>
                <p className="font-russo text-2xl" style={{ color: S.teal }}>10:00 – 00:00</p>
                <p className="text-sm mt-0.5" style={{ color: S.muted }}>Open every day · Walk-ins welcome</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: S.teal }}>Payments accepted</p>
                <div className="flex flex-wrap gap-2">
                  {["Cash", "Card", "Solana", "USDT", "Bitcoin", "ETH", "Thai QR"].map((p) => (
                    <span key={p} className="text-xs px-3 py-1 font-mono tracking-wider"
                      style={{ border: `1px solid ${S.border}`, color: S.muted }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 min-w-[240px]">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center py-5 px-8 font-black tracking-widest uppercase text-sm transition-opacity hover:opacity-80"
              style={{ background: "#25D366", color: "#fff" }}>
              WhatsApp
            </a>
            <a href={CONTACT.line} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center py-5 px-8 font-black tracking-widest uppercase text-sm transition-opacity hover:opacity-80"
              style={{ background: "#06C755", color: "#fff" }}>
              Line
            </a>
            <a href={CONTACT.tel} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center py-5 px-8 font-black tracking-widest uppercase text-sm transition-opacity hover:opacity-80"
              style={{ background: S.teal, color: S.dark }}>
              Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 border-t" style={{ background: "#040804", borderColor: S.border }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col leading-none">
          <span className="font-russo text-xl tracking-widest uppercase" style={{ color: S.teal }}>SWEED</span>
          <span className="text-[9px] tracking-[0.4em] uppercase mt-0.5" style={{ color: S.muted }}>Cannabis Dispensary · Pattaya</span>
        </div>
        <p className="text-xs" style={{ color: "#2d4a2d" }}>© 2026 Sweed · Pattaya · Thailand</p>
      </div>
    </footer>
  );
}

/* ─── sticky ────────────────────────────────────────────────────── */
function StickyBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 font-black px-6 py-3 text-sm tracking-widest uppercase flex items-center gap-2 shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: S.teal, color: S.dark }}>
      Order now
    </a>
  );
}

/* ─── type extension ────────────────────────────────────────────── */
declare module "react" {
  interface CSSProperties {
    WebkitTextStroke?: string;
    WebkitMaskImage?: string;
  }
}
