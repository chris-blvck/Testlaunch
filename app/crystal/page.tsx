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

/* ─── tokens ────────────────────────────────────────────────────── */
const C = {
  ink:     "#0b0906",
  inkMid:  "#18140f",
  cream:   "#f8f3ea",
  ivory:   "#f0e8d8",
  gold:    "#c8a84b",
  goldLt:  "#e8c870",
  goldDim: "#8a6f30",
  warm:    "#8a7a65",
  border:  "#2a2218",
  borderLt:"#e8ddd0",
};

/* ─── data ──────────────────────────────────────────────────────── */
const CATEGORIES = [
  { icon: "✦", name: "Crystal Chandeliers", count: "200+ models", desc: "Grand statement pieces from 60cm to 3m diameter. Gold, chrome and antique brass finishes." },
  { icon: "◈", name: "Wall Sconces", count: "120+ models", desc: "Elegant crystal wall lights for corridors, bedrooms and feature walls." },
  { icon: "◉", name: "Table Lamps", count: "80+ models", desc: "Crystal and porcelain base lamps with bespoke shades. Perfect for bedside or living rooms." },
  { icon: "⬡", name: "Floor Lamps", count: "50+ models", desc: "Sculptural floor lamps in crystal, gold and brushed nickel for statement corners." },
  { icon: "◇", name: "Ceiling Lights", count: "100+ models", desc: "Flush and semi-flush mounts. Minimalist to ornate — suited for any ceiling height." },
  { icon: "❋", name: "Custom & Project", count: "Made to order", desc: "Bespoke lighting for hotels, villas and commercial spaces. Any size, any finish, any quantity." },
];

const SERVICES = [
  { title: "Free Consultation", body: "Our lighting designers visit your space, review plans and recommend the perfect pieces — completely free of charge.", icon: "🎨" },
  { title: "Custom Sizing", body: "Every chandelier can be made to your exact specifications. Ceiling height, room width, finish — all customised.", icon: "📐" },
  { title: "Professional Installation", body: "Our certified electricians handle full installation, wiring and testing. No sub-contractors, no surprises.", icon: "⚡" },
  { title: "Direct Import", body: "We source directly from premium European and Asian manufacturers, cutting out middlemen and reducing costs.", icon: "🚢" },
];

const TRUST = [
  { v: "500+", l: "Models in showroom" },
  { v: "15+", l: "Years experience" },
  { v: "3 000+", l: "Projects completed" },
  { v: "Free", l: "Delivery in Pattaya" },
];

const CONTACT = {
  whatsapp: "https://wa.me/66800000000",
  line: "https://line.me/ti/p/~crystaldesign",
  tel: "tel:+66800000000",
};

/* ─── sparkle config ────────────────────────────────────────────── */
const SPARKLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 2,
}));

/* ─── page ──────────────────────────────────────────────────────── */
export default function CrystalPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.ink, color: C.cream }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.ink}; }
        ::-webkit-scrollbar-thumb { background: ${C.gold}; }
        @keyframes sparkle {
          0%,100% { opacity:0; transform:scale(.5); }
          50% { opacity:1; transform:scale(1.2); }
        }
        @keyframes shimmer { 0%,100%{opacity:.5}50%{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .shimmer { animation: shimmer 2.5s ease-in-out infinite; }
        .rotate-glow { animation: rotateGlow 20s linear infinite; }
      `}</style>
      <Navbar />
      <Hero />
      <Trust />
      <Categories />
      <Showroom />
      <Services />
      <Quote />
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
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? `${C.ink}f5` : "transparent",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {[["Collection", "categories"], ["Showroom", "showroom"], ["Services", "services"], ["Contact", "quote"]].map(([l, id]) => (
            <button key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.22em] transition-colors hover:opacity-100"
              style={{ color: C.warm }}>
              {l}
            </button>
          ))}
        </div>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
          className="text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{ background: C.gold, color: C.ink }}>
          Get a quote
        </a>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex flex-col leading-none">
      <div className="flex items-center gap-2">
        <span className="shimmer" style={{ color: C.gold, fontSize: "1.1rem" }}>✦</span>
        <span className="font-russo text-lg tracking-[0.2em] uppercase" style={{ color: C.cream }}>Crystal Design</span>
        <span className="shimmer" style={{ color: C.gold, fontSize: "1.1rem" }}>✦</span>
      </div>
      <span className="text-[9px] tracking-[0.45em] uppercase text-center mt-0.5" style={{ color: C.goldDim }}>
        Luxury Lighting · Pattaya
      </span>
    </div>
  );
}

/* ─── hero ──────────────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{ background: C.ink }}>
      {/* background photo */}
      <img src="https://images.pexels.com/photos/695193/pexels-photo-695193.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="Luxury chandelier hall" className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.15) saturate(0.4)" }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 70% at 50% 30%, #2a1f0a80 0%, transparent 65%)` }} />

      {/* spinning faint ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-glow"
        style={{ width: "700px", height: "700px", border: `1px solid ${C.gold}12`, borderRadius: "50%" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: "500px", height: "500px", border: `1px solid ${C.gold}08`, borderRadius: "50%" }} />

      {/* sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {SPARKLES.map((s) => (
          <div key={s.id} className="absolute rounded-full"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              background: s.id % 3 === 0 ? C.goldLt : C.gold,
              animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }} />
        ))}
      </div>

      {/* gold gradient glow behind text */}
      <div className="absolute pointer-events-none"
        style={{
          top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: "600px", height: "400px",
          background: `radial-gradient(ellipse, ${C.gold}18 0%, transparent 70%)`,
        }} />

      <div className={`relative z-10 px-6 max-w-4xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* ornament */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${C.gold})` }} />
          <span className="shimmer text-sm" style={{ color: C.goldLt }}>✦</span>
          <p className="text-xs tracking-[0.6em] uppercase" style={{ color: C.gold }}>Pattaya · Thailand</p>
          <span className="shimmer text-sm" style={{ color: C.goldLt }}>✦</span>
          <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${C.gold})` }} />
        </div>

        <h1 className="font-russo leading-none mb-3" style={{ fontSize: "clamp(3.5rem,12vw,10rem)", color: C.cream, letterSpacing: "0.05em" }}>
          CRYSTAL
        </h1>
        <h1 className="font-russo leading-none mb-8" style={{ fontSize: "clamp(3.5rem,12vw,10rem)", color: C.gold, letterSpacing: "0.05em" }}>
          DESIGN
        </h1>

        <p className="text-lg mb-3 max-w-xl mx-auto leading-relaxed" style={{ color: C.warm }}>
          Thailand's finest luxury lighting showroom. Hundreds of crystal chandeliers, wall lights and bespoke pieces — in stock, ready to view.
        </p>
        <p className="text-xs tracking-[0.35em] uppercase mb-14" style={{ color: C.goldDim }}>
          Chandeliers · Wall Lights · Table Lamps · Custom Projects
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold px-10 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-90"
            style={{ background: C.gold, color: C.ink }}>
            Explore collection
          </button>
          <button onClick={() => document.getElementById("showroom")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold px-10 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-60"
            style={{ border: `1px solid ${C.gold}40`, color: C.warm }}>
            Visit showroom
          </button>
        </div>
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${C.ink}, transparent)` }} />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 animate-pulse" style={{ background: `linear-gradient(to bottom, ${C.gold}70, transparent)` }} />
      </div>
    </section>
  );
}

/* ─── trust ─────────────────────────────────────────────────────── */
function Trust() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.inkMid }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center">
        {TRUST.map((t, i) => (
          <div key={t.l}
            className={`py-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ borderRight: `1px solid ${C.border}`, transitionDelay: `${i * 80}ms` }}>
            <p className="font-russo text-3xl" style={{ color: C.gold }}>{t.v}</p>
            <p className="text-xs uppercase tracking-widest mt-1.5" style={{ color: C.warm }}>{t.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── categories ────────────────────────────────────────────────── */
function Categories() {
  const { ref, inView } = useInView();
  return (
    <section id="categories" className="py-28 md:py-36 px-6" style={{ background: C.ink }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Our collection" title="Lighting for every space" />
        <div ref={ref}
          className={`mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ background: C.border }}>
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} delay={i * 60} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, delay, inView }: { cat: typeof CATEGORIES[0]; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`p-8 cursor-default transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`}
      style={{
        background: hovered ? C.inkMid : C.ink,
        transitionDelay: `${delay}ms`,
        borderTop: hovered ? `2px solid ${C.gold}` : `2px solid transparent`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <span className="block text-2xl mb-5 transition-colors" style={{ color: hovered ? C.goldLt : C.gold }}>
        {cat.icon}
      </span>
      <h3 className="font-russo text-lg mb-1 transition-colors" style={{ color: hovered ? C.cream : C.ivory }}>
        {cat.name}
      </h3>
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: C.goldDim }}>
        {cat.count}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: C.warm }}>
        {cat.desc}
      </p>
    </div>
  );
}

/* ─── showroom ──────────────────────────────────────────────────── */
function Showroom() {
  const { ref, inView } = useInView(0.05);
  const imgs = [
    { src: "https://images.pexels.com/photos/5768163/pexels-photo-5768163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Grand crystal chandelier", span: "col-span-2 row-span-2" },
    { src: "https://images.pexels.com/photos/7594230/pexels-photo-7594230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Teardrop crystal detail", span: "" },
    { src: "https://images.pexels.com/photos/5378420/pexels-photo-5378420.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Crystal close-up", span: "" },
    { src: "https://images.pexels.com/photos/36242961/pexels-photo-36242961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Luxurious chandelier interior", span: "" },
    { src: "https://images.pexels.com/photos/2549057/pexels-photo-2549057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Ornate lighting hall", span: "" },
    { src: "https://images.pexels.com/photos/137572/pexels-photo-137572.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Gold crystal lamp", span: "col-span-2" },
  ];
  return (
    <section id="showroom" className="py-28 md:py-36 px-6" style={{ background: C.inkMid }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Visit us" title="The showroom" />
        <p className="text-center mt-4 text-sm max-w-lg mx-auto" style={{ color: C.warm }}>
          Over 500 lighting pieces on display across two floors. See, touch and test every piece before you decide.
        </p>
        <div ref={ref}
          className={`mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-2 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          {imgs.map((img, i) => (
            <div key={img.src}
              className={`relative overflow-hidden group ${img.span} transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{
                borderRadius: i === 0 ? "1.5rem" : i % 2 === 0 ? "1rem" : "0.5rem",
                transitionDelay: `${i * 55}ms`,
              }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: C.gold }} />
              <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-xs uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                style={{ color: C.goldLt }}>{img.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── services ──────────────────────────────────────────────────── */
function Services() {
  const { ref, inView } = useInView();
  return (
    <section id="services" className="py-28 md:py-36 px-6" style={{ background: C.ink }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="What we offer" title="The full service" />
        <div ref={ref}
          className={`mt-16 grid sm:grid-cols-2 gap-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {SERVICES.map((s, i) => (
            <div key={s.title}
              className={`flex gap-5 p-8 border transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              style={{ borderColor: C.border, transitionDelay: `${i * 80}ms` }}>
              <span className="text-3xl flex-shrink-0 mt-1">{s.icon}</span>
              <div>
                <h4 className="font-russo text-lg mb-2" style={{ color: C.ivory }}>{s.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: C.warm }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── quote / contact ───────────────────────────────────────────── */
function Quote() {
  const { ref, inView } = useInView();
  const channels = [
    { href: CONTACT.whatsapp, label: "WhatsApp", sub: "+66 80 000 0000", bg: "#25D366", icon: "💬" },
    { href: CONTACT.line, label: "Line", sub: "@crystaldesign", bg: "#06C755", icon: "💚" },
    { href: CONTACT.tel, label: "Call us", sub: "+66 80 000 0000", bg: C.inkMid, border: C.gold, icon: "📞" },
  ];
  return (
    <section id="quote" className="py-28 md:py-36 px-6" style={{ background: C.inkMid }}>
      <div ref={ref}
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: C.gold }} />
          <span className="shimmer" style={{ color: C.goldLt }}>✦</span>
          <div className="h-px w-10" style={{ background: C.gold }} />
        </div>
        <p className="text-xs tracking-[0.45em] uppercase mb-4" style={{ color: C.gold }}>Request a quote</p>
        <h2 className="font-russo text-4xl md:text-5xl mb-4" style={{ color: C.cream }}>
          Ready to illuminate<br />your space?
        </h2>
        <p className="mb-12 leading-relaxed text-sm" style={{ color: C.warm }}>
          Send us photos of your space, ceiling height and style references. We'll recommend the perfect piece and send a detailed quote within 24h.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {channels.map((c) => (
            <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 py-5 px-3 font-bold transition-opacity hover:opacity-85 active:scale-95"
              style={{
                background: c.bg, color: "#fff",
                border: c.border ? `1px solid ${c.border}` : "none",
              }}>
              <span className="text-2xl">{c.icon}</span>
              <span className="text-sm tracking-wide">{c.label}</span>
              <span className="text-xs opacity-70">{c.sub}</span>
            </a>
          ))}
        </div>

        <div className="p-7 border" style={{ borderColor: `${C.gold}30` }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: C.goldDim }}>Showroom & hours</p>
          <p className="font-russo text-xl" style={{ color: C.cream }}>Crystal Design Showroom</p>
          <p className="text-sm mt-1" style={{ color: C.warm }}>Pattaya, Chonburi · Thailand</p>
          <p className="text-sm mt-1" style={{ color: C.goldLt }}>Mon – Sun · 09:00 – 19:00</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-3 text-sm transition-colors hover:opacity-100" style={{ color: C.gold }}>
            Get directions →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10" style={{ background: C.ink, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <p className="text-xs" style={{ color: C.goldDim }}>© 2026 Crystal Design · Pattaya · All rights reserved</p>
      </div>
    </footer>
  );
}

/* ─── sticky ────────────────────────────────────────────────────── */
function StickyBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 font-bold px-6 py-3 text-sm tracking-wide flex items-center gap-2 shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: C.gold, color: C.ink }}>
      ✦ Get a quote
    </a>
  );
}

/* ─── shared ────────────────────────────────────────────────────── */
function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-10" style={{ background: `linear-gradient(to right, transparent, ${C.gold})` }} />
        <span className="shimmer" style={{ color: C.goldLt, fontSize: "0.7rem" }}>✦</span>
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: C.gold }}>{label}</p>
        <span className="shimmer" style={{ color: C.goldLt, fontSize: "0.7rem" }}>✦</span>
        <div className="h-px w-10" style={{ background: `linear-gradient(to left, transparent, ${C.gold})` }} />
      </div>
      <h2 className="font-russo text-4xl md:text-5xl" style={{ color: C.cream }}>{title}</h2>
    </div>
  );
}
