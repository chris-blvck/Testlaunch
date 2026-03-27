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
  yellow:  "#FFD800",
  yellowDk:"#E8C200",
  blue:    "#4DB6E8",
  blueDk:  "#2a8fc0",
  black:   "#0a0a0a",
  darkBg:  "#111008",
  white:   "#FFFFFF",
  offWhite:"#FFF9E0",
  muted:   "#8a7a40",
  border:  "#2a2208",
};

/* ─── info ───────────────────────────────────────────────────────── */
const INFO = {
  name:     "Svens.",
  tagline:  "Snus & Nicotine Pouches",
  phone:    "+66 98 855 1333",
  tel:      "tel:+66988551333",
  whatsapp: "https://wa.me/66988551333",
  line:     "@svensthailand",
  email:    "shop@svenssnus.com",
  website:  "svenssnus.com",
  mapsMain: "https://maps.app.goo.gl/sXaP24QRD1eu5r7K6",
  locations: [
    {
      name:    "Soi Buakhao",
      address: "Svens Snus Soi Buakhao 15",
      hours:   "9AM – 9PM · Daily",
      maps:    "https://maps.app.goo.gl/sXaP24QRD1eu5r7K6",
    },
    {
      name:    "Soi Pornprapanimit",
      address: "Unit 53/16, Soi Pornprapanimit",
      hours:   "Mon–Sat 10AM–8PM · Sun 11AM–7PM",
      maps:    "https://maps.app.goo.gl/sXaP24QRD1eu5r7K6",
    },
  ],
};

const BRANDS = [
  { name: "ZYN",   flavor: "15+ flavors", color: "#0066CC" },
  { name: "LOOP",  flavor: "12+ flavors", color: "#FF6B00" },
  { name: "ACE",   flavor: "8+ flavors",  color: "#2d7a3a" },
  { name: "GRITT", flavor: "6+ flavors",  color: "#a0112a" },
  { name: "ICE",   flavor: "8+ flavors",  color: "#4DB6E8" },
  { name: "LYFT",  flavor: "10+ flavors", color: "#1a9e3f" },
  { name: "VELO",  flavor: "8+ flavors",  color: "#7B2D8B" },
  { name: "SKRUF", flavor: "6+ flavors",  color: "#1A3F6F" },
];

const ICE_CREAMS = [
  { name: "Honey Nut Crush",    desc: "Honey & nuts — a timeless classic turned refreshingly gourmet.", color: "#E8A020" },
  { name: "Mocca Chip",         desc: "Rich, creamy Mocca Chip for the coffee enthusiast.", color: "#6B3A2A" },
  { name: "Yoghurt Blueberry",  desc: "Smooth blueberry yoghurt — low-carb & delicious.", color: "#6B4BC8" },
  { name: "Banana Strawberry",  desc: "Bananas & strawberries — the ultimate summer delight.", color: "#E85A8A" },
];

const STRENGTHS = [
  { level: "MINI",     mg: "2–4 mg",  desc: "Light & smooth. Perfect starter." },
  { level: "NORMAL",   mg: "6–8 mg",  desc: "Balanced everyday choice." },
  { level: "STRONG",   mg: "10–14 mg", desc: "For experienced users." },
  { level: "X-STRONG", mg: "16–22 mg", desc: "Maximum intensity." },
];

/* ─── page ──────────────────────────────────────────────────────── */
export default function SvensPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: S.darkBg, color: S.white }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${S.darkBg}; }
        ::-webkit-scrollbar-thumb { background: ${S.yellow}; }

        @keyframes marquee { from{transform:translateX(0)}to{transform:translateX(-50%)} }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
        @keyframes glow {
          0%,100%{box-shadow:0 0 20px ${S.yellow}50,0 0 60px ${S.yellow}25;}
          50%{box-shadow:0 0 40px ${S.yellow}80,0 0 120px ${S.yellow}40;}
        }
        @keyframes shimmer {
          0%{background-position:-200% center}
          100%{background-position:200% center}
        }
        .marquee-track { animation: marquee 20s linear infinite; }
        .marquee-rev   { animation: marquee 28s linear infinite; animation-direction:reverse; }
        .float-anim    { animation: float 3s ease-in-out infinite; }
        .glow-btn      { animation: glow 2.5s ease-in-out infinite; }
        .shimmer-text  {
          background: linear-gradient(90deg, ${S.yellow} 0%, #fff8c0 40%, ${S.yellow} 60%, ${S.yellowDk} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
      <Navbar />
      <Hero />
      <Ticker />
      <Collection />
      <Brands />
      <Strengths />
      <IceCream />
      <MascotBreak />
      <Visit />
      <Footer />
      <StickyBtn />
    </div>
  );
}

/* ─── NAVBAR ────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(10,10,0,.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${S.border}` : "none" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="righteous text-2xl tracking-tight shimmer-text">Svens.</span>
        <div className="hidden md:flex items-center gap-8">
          {[["Collection", "collection"], ["Brands", "brands"], ["Visit", "visit"]].map(([l, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.25em] transition-colors hover:text-white"
              style={{ color: S.muted }}>{l}</button>
          ))}
        </div>
        <a href={INFO.whatsapp} target="_blank" rel="noopener noreferrer"
          className="righteous text-xs whitespace-nowrap px-5 py-2.5 tracking-widest uppercase transition-all glow-btn"
          style={{ background: S.yellow, color: S.black, borderRadius: "9999px" }}>
          Order now
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
    <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: S.darkBg }}>
      {/* storefront photo */}
      <img src="/svens/storefront.jpg" alt="Svens storefront"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.55) saturate(1.5) contrast(1.1)", objectPosition: "center 30%" }} />

      {/* right panel - shelf photo */}
      <div className="absolute inset-y-0 right-0 w-[40%] overflow-hidden hidden md:block">
        <img src="/svens/shelf.jpg" alt="Svens collection"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.65) saturate(1.3)", objectPosition: "center" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${S.darkBg} 0%, transparent 40%)` }} />
      </div>

      {/* yellow glow from bottom */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 40% at 50% 100%, ${S.yellow}35 0%, transparent 70%)` }} />
      {/* left dark fade */}
      <div className="absolute inset-0"
        style={{ background: `linear-gradient(to right, rgba(10,10,0,.9) 30%, rgba(10,10,0,.2) 65%, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: `linear-gradient(to top, ${S.darkBg}, transparent)` }} />

      <div className={`relative z-10 px-8 md:px-16 pb-20 max-w-2xl transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex items-center gap-3 mb-8">
          <span className="font-black text-xs px-3 py-1.5 tracking-widest uppercase whitespace-nowrap"
            style={{ background: S.yellow, color: S.black, borderRadius: "9999px" }}>
            2 Locations · Pattaya
          </span>
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: S.muted }}>Thailand</span>
        </div>

        <h1 className="righteous leading-none mb-2 shimmer-text"
          style={{ fontSize: "clamp(5rem,18vw,14rem)", letterSpacing: "-0.02em" }}>
          Svens.
        </h1>

        <h2 className="righteous leading-none mb-8"
          style={{ fontSize: "clamp(1rem,3vw,2.5rem)", color: "rgba(255,216,0,.5)", letterSpacing: "0.12em" }}>
          SNUS & NICOTINE POUCHES
        </h2>

        <p className="font-exo text-sm md:text-base mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,.55)", maxWidth: "26rem" }}>
          Pattaya's widest selection of snus & nicotine pouches. 200+ flavors from ZYN, LOOP, ACE, GRITT, ICE and more. Two locations — Soi Buakhao & Soi Pornprapanimit.
        </p>

        <div className="flex flex-wrap gap-4">
          <button onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
            className="righteous whitespace-nowrap px-8 py-3.5 text-sm tracking-widest uppercase transition-all glow-btn"
            style={{ background: S.yellow, color: S.black, borderRadius: "9999px" }}>
            See collection
          </button>
          <a href={INFO.maps} target="_blank" rel="noopener noreferrer"
            className="righteous whitespace-nowrap px-8 py-3.5 text-sm tracking-wider border transition-all"
            style={{ borderColor: `${S.yellow}50`, color: `${S.yellow}90`, borderRadius: "9999px" }}>
            Get directions
          </a>
        </div>
      </div>

      {/* floating locations badge */}
      <div className={`absolute top-24 right-8 hidden md:block transition-all duration-1000 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <div className="float-anim text-right">
          <p className="righteous leading-none" style={{ fontSize: "clamp(1.2rem,2.5vw,2rem)", color: `${S.yellow}30` }}>SOI BUAKHAO</p>
          <p className="righteous leading-none" style={{ fontSize: "clamp(1rem,2vw,1.6rem)", color: `${S.yellow}20` }}>9AM–9PM DAILY</p>
          <div className="my-2" style={{ height: "1px", background: `${S.yellow}15` }} />
          <p className="righteous leading-none" style={{ fontSize: "clamp(1.2rem,2.5vw,2rem)", color: `${S.yellow}30` }}>SOI PORNPRAPANIMIT</p>
          <p className="righteous leading-none" style={{ fontSize: "clamp(1rem,2vw,1.6rem)", color: `${S.yellow}20` }}>MON–SUN · 10AM–8PM</p>
        </div>
      </div>
    </section>
  );
}

/* ─── TICKER ────────────────────────────────────────────────────── */
function Ticker() {
  const items = ["ZYN", "LOOP", "ACE", "GRITT", "ICE", "LYFT", "VELO", "200+ FLAVORS", "PATTAYA", "SOI BUAKHAO", "SOI PORNPRAPANIMIT", "SNUS & NICOTINE POUCHES", "SVENS ICE CREAM", "SCANDINAVIAN QUALITY"];
  const doubled = [...items, ...items];
  return (
    <>
      <div className="overflow-hidden py-3.5 border-y" style={{ borderColor: S.border, background: "#0d0c00" }}>
        <div className="flex whitespace-nowrap marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-6">
              <span className="righteous text-xs tracking-[0.3em] uppercase" style={{ color: S.yellow }}>{item}</span>
              <span style={{ color: S.muted, fontSize: "5px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden py-3 border-b" style={{ borderColor: S.border, background: S.darkBg }}>
        <div className="flex whitespace-nowrap marquee-rev">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-6">
              <span className="righteous text-xs tracking-[0.3em] uppercase" style={{ color: "#2a2208" }}>{item}</span>
              <span style={{ color: S.border, fontSize: "5px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── COLLECTION ────────────────────────────────────────────────── */
function Collection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="collection" style={{ background: S.darkBg }}>
      {/* full-width shelf strip */}
      <div className="relative overflow-hidden" style={{ height: "min(55vh, 450px)" }}>
        <img src="/svens/shelf.jpg" alt="Svens full shelf"
          className="w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, transparent 20%, ${S.darkBg} 100%)` }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${S.yellow}08, transparent 60%)` }} />
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-8">
          <h2 className="righteous leading-none"
            style={{ fontSize: "clamp(3rem,10vw,9rem)", color: "transparent", WebkitTextStroke: `2px ${S.yellow}` }}>
            200+ FLAVORS
          </h2>
        </div>
      </div>

      {/* 3-photo grid + text */}
      <div ref={ref} className={`max-w-7xl mx-auto px-6 md:px-8 pb-20 pt-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            { img: "/svens/storefront.jpg",   label: "The shop",      sub: "2 locations in Pattaya" },
            { img: "/svens/storefront2.jpg",  label: "Wide selection", sub: "200+ products" },
            { img: "/svens/shelf.jpg",        label: "Every flavor",   sub: "Always in stock" },
          ].map((p) => (
            <div key={p.img} className="relative overflow-hidden group" style={{ height: "260px", borderRadius: "1.5rem" }}>
              <img src={p.img} alt={p.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(10,10,0,.85), transparent)`, borderRadius: "1.5rem" }} />
              <div className="absolute bottom-4 left-5">
                <p className="righteous text-sm" style={{ color: S.yellow }}>{p.label}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,.5)" }}>{p.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[["200+", "Flavors in stock"], ["8+", "Top brands"], ["60฿", "Ice cream scoops"], ["2", "Locations in Pattaya"]].map(([v, l]) => (
            <div key={l} className="text-center py-8 px-4" style={{ background: "#14120a", borderRadius: "1.5rem", border: `1px solid ${S.border}` }}>
              <p className="righteous text-3xl md:text-4xl mb-2" style={{ color: S.yellow }}>{v}</p>
              <p className="text-xs tracking-widest uppercase" style={{ color: S.muted }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BRANDS ─────────────────────────────────────────────────────── */
function Brands() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="brands" className="py-24 md:py-36" style={{ background: "#0d0c00" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="righteous text-xs tracking-[0.5em] uppercase mb-3" style={{ color: S.yellow }}>Brands available</p>
            <h2 className="righteous leading-[0.9]" style={{ fontSize: "clamp(3rem,8vw,7rem)", color: S.white }}>
              The best.<br />
              <span style={{ color: S.yellow }}>All here.</span>
            </h2>
          </div>
          <p className="font-exo text-sm max-w-xs leading-relaxed" style={{ color: S.muted }}>
            We stock every major Scandinavian brand — always fresh, always complete.
          </p>
        </div>

        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-3 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {BRANDS.map((b, i) => (
            <div key={b.name}
              className={`group py-8 px-6 cursor-default transition-all duration-500 hover:scale-[1.03] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ background: "#14120a", borderRadius: "1.5rem", border: `1px solid ${S.border}`, transitionDelay: `${i * 50}ms` }}>
              <div className="w-3 h-3 rounded-full mb-4" style={{ background: b.color }} />
              <p className="righteous text-2xl text-white mb-1 group-hover:text-yellow-300 transition-colors">{b.name}</p>
              <p className="text-xs tracking-wider" style={{ color: S.muted }}>{b.flavor}</p>
              <div className="w-6 h-0.5 mt-4 transition-all duration-300 group-hover:w-12" style={{ background: b.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STRENGTHS ──────────────────────────────────────────────────── */
function Strengths() {
  const { ref, inView } = useInView(0.1);
  return (
    <section className="py-20 md:py-32" style={{ background: S.darkBg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <p className="righteous text-xs tracking-[0.5em] uppercase mb-3" style={{ color: S.yellow }}>Find your level</p>
        <h2 className="righteous leading-[0.9] mb-16" style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)", color: S.white }}>
          From mild to<br /><span style={{ color: S.yellow }}>maximum.</span>
        </h2>
        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-3 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          {STRENGTHS.map((s, i) => (
            <div key={s.level}
              className={`relative overflow-hidden py-10 px-6 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ background: `linear-gradient(135deg, #14120a, #1a160a)`, borderRadius: "2rem", border: `1px solid ${S.border}`, transitionDelay: `${i * 80}ms` }}>
              <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20"
                style={{ background: S.yellow, transform: "translate(30%, -30%)" }} />
              <p className="righteous text-xs tracking-[0.4em] uppercase mb-3" style={{ color: S.yellow }}>{s.level}</p>
              <p className="righteous text-3xl text-white mb-3">{s.mg}</p>
              <p className="font-exo text-xs leading-relaxed" style={{ color: S.muted }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ICE CREAM ──────────────────────────────────────────────────── */
function IceCream() {
  const { ref, inView } = useInView(0.1);
  return (
    <section className="py-24 md:py-36" style={{ background: S.darkBg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="righteous text-xs tracking-[0.5em] uppercase mb-3" style={{ color: S.yellow }}>Also available</p>
            <h2 className="righteous leading-[0.9]" style={{ fontSize: "clamp(3rem,8vw,7rem)", color: S.white }}>
              Svens<br />
              <span style={{ color: S.yellow }}>Ice Cream.</span>
            </h2>
          </div>
          <p className="font-exo text-sm max-w-xs leading-relaxed" style={{ color: S.muted }}>
            Homemade ice cream scoops — rich, creamy, and irresistible. Only 60฿ a cup.
          </p>
        </div>
        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-3 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {ICE_CREAMS.map((ic, i) => (
            <div key={ic.name}
              className={`group relative overflow-hidden py-8 px-6 cursor-default transition-all duration-500 hover:scale-[1.03] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ background: "#14120a", borderRadius: "2rem", border: `1px solid ${S.border}`, transitionDelay: `${i * 60}ms` }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-opacity group-hover:opacity-20"
                style={{ background: ic.color, transform: "translate(30%, -30%)" }} />
              <div className="w-3 h-3 rounded-full mb-4" style={{ background: ic.color }} />
              <p className="righteous text-base md:text-lg text-white mb-2 leading-tight">{ic.name}</p>
              <p className="font-exo text-xs leading-relaxed mb-4" style={{ color: S.muted }}>{ic.desc}</p>
              <p className="righteous text-2xl" style={{ color: S.yellow }}>60฿</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MASCOT BREAK ───────────────────────────────────────────────── */
function MascotBreak() {
  const { ref, inView } = useInView(0.2);
  return (
    <section className="py-0" style={{ background: "#0d0c00" }}>
      <div className="grid md:grid-cols-2 min-h-[60vh]">
        {/* dog photo */}
        <div className="relative overflow-hidden min-h-[50vw] md:min-h-full">
          <img src="/svens/dog.jpg" alt="Svens mascot"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            style={{ objectPosition: "center 20%" }} />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to right, transparent 50%, #0d0c00 100%)` }} />
        </div>
        {/* text */}
        <div ref={ref}
          className={`flex flex-col justify-center px-10 md:px-16 py-20 transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <p className="righteous text-xs tracking-[0.5em] uppercase mb-5" style={{ color: S.yellow }}>Meet the team</p>
          <h2 className="righteous leading-[0.9] mb-6"
            style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", color: S.white }}>
            Even our dog<br />
            <span style={{ color: S.yellow }}>loves snus.</span>
          </h2>
          <p className="font-exo text-sm leading-relaxed mb-8 max-w-xs" style={{ color: S.muted }}>
            Come visit us — our fluffy mascot might be at the counter too. Best vibes in Pratamnak, guaranteed.
          </p>
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: S.yellow }} />
            <p className="righteous text-xs tracking-widest uppercase" style={{ color: S.yellow }}>
              2 locations · Pattaya
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── VISIT ──────────────────────────────────────────────────────── */
function Visit() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="visit" className="py-28 md:py-40" style={{ background: S.darkBg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="righteous text-xs tracking-[0.5em] uppercase mb-4" style={{ color: S.yellow }}>Find us</p>
          <h2 className="righteous leading-none mb-14"
            style={{ fontSize: "clamp(4rem,12vw,10rem)", color: S.white }}>
            COME<br />
            <span style={{ color: S.yellow }}>IN.</span>
          </h2>

          {/* two locations */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {INFO.locations.map((loc) => (
              <div key={loc.name} className="p-8" style={{ background: "#14120a", borderRadius: "2rem", border: `1px solid ${S.border}` }}>
                <p className="righteous text-xs tracking-widest uppercase mb-3" style={{ color: S.yellow }}>{loc.name}</p>
                <p className="righteous text-xl text-white mb-1">{loc.address}</p>
                <p className="font-exo text-sm mb-4" style={{ color: S.muted }}>{loc.hours}</p>
                <a href={loc.maps} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 righteous text-xs tracking-widest uppercase py-2.5 px-5 transition-opacity hover:opacity-80"
                  style={{ background: S.blue, color: S.white, borderRadius: "9999px" }}>
                  Get directions
                </a>
              </div>
            ))}
          </div>

          {/* contact row */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="p-6" style={{ background: "#14120a", borderRadius: "1.5rem", border: `1px solid ${S.border}` }}>
              <p className="righteous text-xs uppercase tracking-widest mb-3" style={{ color: S.yellow }}>Phone & WhatsApp</p>
              <a href={INFO.tel} className="righteous text-2xl text-white hover:opacity-80 transition-opacity block">{INFO.phone}</a>
            </div>
            <div className="p-6" style={{ background: "#14120a", borderRadius: "1.5rem", border: `1px solid ${S.border}` }}>
              <p className="righteous text-xs uppercase tracking-widest mb-3" style={{ color: S.yellow }}>Line & Email</p>
              <p className="righteous text-xl text-white">{INFO.line}</p>
              <a href={`mailto:${INFO.email}`} className="font-exo text-sm hover:opacity-80 transition-opacity mt-1 block" style={{ color: S.muted }}>{INFO.email}</a>
            </div>
            <div className="p-6" style={{ background: "#14120a", borderRadius: "1.5rem", border: `1px solid ${S.border}` }}>
              <p className="righteous text-xs uppercase tracking-widest mb-3" style={{ color: S.yellow }}>Website</p>
              <a href={`https://${INFO.website}`} target="_blank" rel="noopener noreferrer"
                className="righteous text-xl hover:opacity-80 transition-opacity" style={{ color: S.blue }}>
                {INFO.website}
              </a>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <a href={INFO.whatsapp} target="_blank" rel="noopener noreferrer"
              className="righteous whitespace-nowrap px-8 py-4 text-sm tracking-widest uppercase transition-all glow-btn"
              style={{ background: S.yellow, color: S.black, borderRadius: "9999px" }}>
              WhatsApp order
            </a>
            <a href={INFO.mapsMain} target="_blank" rel="noopener noreferrer"
              className="righteous whitespace-nowrap px-8 py-4 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ background: S.blue, color: S.white, borderRadius: "9999px" }}>
              Google Maps
            </a>
            <a href={INFO.tel}
              className="righteous whitespace-nowrap px-8 py-4 text-sm tracking-widest uppercase border transition-all hover:border-yellow-400"
              style={{ border: `1px solid ${S.yellow}50`, color: S.yellow, borderRadius: "9999px" }}>
              {INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-8 border-t" style={{ background: "#060600", borderColor: S.border }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="righteous text-2xl tracking-tight shimmer-text">Svens.</span>
          <span className="font-exo text-[9px] tracking-[0.4em] uppercase ml-4" style={{ color: S.muted }}>
            Snus & Nicotine Pouches · 2 Locations · Pattaya
          </span>
        </div>
        <p className="font-exo text-xs" style={{ color: "#2a2208" }}>© 2026 Svens · Pratamnak · Thailand</p>
      </div>
    </footer>
  );
}

/* ─── STICKY ─────────────────────────────────────────────────────── */
function StickyBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href={INFO.whatsapp} target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 righteous px-6 py-3 text-sm tracking-widest uppercase shadow-2xl transition-all duration-300 glow-btn ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: S.yellow, color: S.black, borderRadius: "9999px" }}>
      Order now
    </a>
  );
}

declare module "react" {
  interface CSSProperties { WebkitTextStroke?: string; WebkitBackgroundClip?: string; WebkitTextFillColor?: string; }
}
