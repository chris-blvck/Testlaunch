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
  bg:       "#fdfaf7",
  bgAlt:    "#f8f2ec",
  dark:     "#1a1510",
  darkMid:  "#2d2520",
  blush:    "#e8c5bc",
  rose:     "#c9887a",
  roseDark: "#9a5a50",
  gold:     "#c8a07a",
  goldLt:   "#e0bfa0",
  muted:    "#9a8880",
  border:   "#e8ddd8",
  borderDk: "#2d2520",
  white:    "#ffffff",
};

/* ─── real data ─────────────────────────────────────────────────── */
const SALON = {
  name:    "Luxury Collection",
  tagline: "Nails · Brows · Lashes",
  rating:  "4.9★",
  reviews: "26 reviews",
  phone:   "080 646 3905",
  address: "15, 219 M.5 Boonsampan, Pattaya City",
  hours:   "09:00 – 20:00 · Daily",
  whatsapp:"https://wa.me/66806463905",
  line:    "https://line.me/ti/p/~luxurycollectionpattaya",
  tel:     "tel:0806463905",
  maps:    "https://maps.google.com/?q=15+219+M.5+Boonsampan+Pattaya",
};

/* ─── services ──────────────────────────────────────────────────── */
const SERVICES = [
  {
    name: "Nails",
    icon: "💅",
    items: [
      { label: "Gel Manicure", price: "350 ฿" },
      { label: "Chrome & Mirror", price: "450 ฿" },
      { label: "Nail Extensions", price: "600 ฿" },
      { label: "Nail Art (per nail)", price: "50 ฿+" },
      { label: "Gel Pedicure", price: "300 ฿" },
      { label: "French & Ombre", price: "500 ฿" },
    ],
  },
  {
    name: "Lashes",
    icon: "👁",
    items: [
      { label: "Classic Full Set", price: "800 ฿" },
      { label: "Volume Full Set", price: "1 200 ฿" },
      { label: "Mega Volume", price: "1 500 ฿" },
      { label: "Lash Lift & Tint", price: "700 ฿" },
      { label: "Refill (2–3 weeks)", price: "600 ฿" },
      { label: "Removal", price: "200 ฿" },
    ],
  },
  {
    name: "Brows",
    icon: "✦",
    items: [
      { label: "Brow Shaping & Tint", price: "350 ฿" },
      { label: "Brow Lamination", price: "700 ฿" },
      { label: "Microblading", price: "3 500 ฿" },
      { label: "Powder Brows", price: "4 500 ฿" },
      { label: "Combo Brows", price: "5 000 ฿" },
      { label: "Touch-up", price: "1 500 ฿" },
    ],
  },
];

const GALLERY_LABELS = [
  { label: "Chrome mirror nails", tag: "Trending" },
  { label: "French ombre", tag: "Classic" },
  { label: "Nail art detail", tag: "Art" },
  { label: "Volume lashes", tag: "Lashes" },
  { label: "Brow lamination", tag: "Brows" },
  { label: "Gel extensions", tag: "Extensions" },
  { label: "Natural gel set", tag: "Minimal" },
  { label: "Salon interior", tag: "Studio" },
];

/* ─── page ──────────────────────────────────────────────────────── */
export default function NailsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.bg, color: C.dark }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.rose}; }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%,100%{opacity:.6}50%{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)} }
        @keyframes breathe {
          0%,100% { transform: scale(1); opacity:.08; }
          50%     { transform: scale(1.08); opacity:.14; }
        }
        .float   { animation: float 4s ease-in-out infinite; }
        .shimmer { animation: shimmer 2.5s ease-in-out infinite; }
        .breathe { animation: breathe 6s ease-in-out infinite; }
      `}</style>
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <Gallery />
      <Booking />
      <Footer />
      <StickyBook />
    </div>
  );
}

/* ─── navbar ────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? `${C.bg}f5` : "transparent",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {[["Services", "services"], ["Gallery", "gallery"], ["Book", "booking"]].map(([l, id]) => (
            <button key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.22em] transition-colors hover:opacity-100"
              style={{ color: C.muted }}>
              {l}
            </button>
          ))}
        </div>
        <a href={SALON.whatsapp} target="_blank" rel="noopener noreferrer"
          className="text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{ background: C.rose, color: C.white }}>
          Book now
        </a>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex flex-col leading-none">
      <span className="font-russo text-base tracking-[0.25em] uppercase" style={{ color: C.dark }}>
        Luxury Collection
      </span>
      <span className="text-[9px] tracking-[0.4em] uppercase mt-0.5 shimmer" style={{ color: C.rose }}>
        {SALON.tagline}
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
      style={{ background: `linear-gradient(150deg, #fdf6f0 0%, ${C.bgAlt} 50%, #f5ece8 100%)` }}>

      {/* soft blush orbs */}
      <div className="breathe absolute rounded-full pointer-events-none"
        style={{ width: 600, height: 600, top: "10%", left: "60%", background: `radial-gradient(circle, ${C.blush}30 0%, transparent 70%)` }} />
      <div className="breathe absolute rounded-full pointer-events-none"
        style={{ width: 400, height: 400, bottom: "10%", left: "5%", background: `radial-gradient(circle, ${C.goldLt}25 0%, transparent 70%)`, animationDelay: "3s" }} />

      {/* thin decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 700, height: 700, border: `1px solid ${C.blush}50` }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 500, height: 500, border: `1px solid ${C.blush}30` }} />

      <div className={`relative z-10 px-6 max-w-3xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* rating badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
          style={{ background: C.white, border: `1px solid ${C.border}` }}>
          <span className="text-sm">⭐</span>
          <span className="text-xs font-bold" style={{ color: C.dark }}>{SALON.rating}</span>
          <span className="text-xs" style={{ color: C.muted }}>{SALON.reviews}</span>
          <span className="w-px h-3 mx-1" style={{ background: C.border }} />
          <span className="text-xs" style={{ color: C.muted }}>Pattaya</span>
        </div>

        <h1 className="font-russo leading-none mb-2" style={{ fontSize: "clamp(3rem,11vw,8rem)", color: C.dark, letterSpacing: "0.04em" }}>
          LUXURY
        </h1>
        <h1 className="font-russo leading-none mb-8" style={{ fontSize: "clamp(3rem,11vw,8rem)", color: C.rose, letterSpacing: "0.04em" }}>
          COLLECTION
        </h1>

        <p className="text-base mb-2 max-w-md mx-auto leading-relaxed" style={{ color: C.muted }}>
          Premium nail studio in Pattaya. Gel nails, chrome, extensions, eyelash & brow treatments — all in one place.
        </p>
        <p className="text-xs tracking-[0.35em] uppercase mb-14" style={{ color: C.rose }}>
          {SALON.tagline} · Pattaya
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold px-10 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-90"
            style={{ background: C.dark, color: C.white }}>
            Book appointment
          </button>
          <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold px-10 py-4 text-sm tracking-widest uppercase transition-all"
            style={{ border: `1px solid ${C.border}`, color: C.muted }}>
            View services
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 animate-pulse mx-auto"
          style={{ background: `linear-gradient(to bottom, ${C.rose}80, transparent)` }} />
      </div>
    </section>
  );
}

/* ─── trust bar ─────────────────────────────────────────────────── */
function Trust() {
  const { ref, inView } = useInView();
  const items = [
    { v: "4.9★", l: "Google rating" },
    { v: "09–20h", l: "Open every day" },
    { v: "3 services", l: "Nails · Lashes · Brows" },
    { v: "EN · TH · RU", l: "Languages" },
  ];
  return (
    <section ref={ref} style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.white }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center">
        {items.map((t, i) => (
          <div key={t.l}
            className={`py-7 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ borderRight: `1px solid ${C.border}`, transitionDelay: `${i * 80}ms` }}>
            <p className="font-russo text-2xl" style={{ color: C.rose }}>{t.v}</p>
            <p className="text-xs uppercase tracking-widest mt-1.5" style={{ color: C.muted }}>{t.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── services & pricing ─────────────────────────────────────────── */
function Services() {
  const { ref, inView } = useInView();
  return (
    <section id="services" className="py-28 md:py-36 px-6" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Services & pricing" title="What we do" />
        <div ref={ref}
          className={`mt-16 grid md:grid-cols-3 gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {SERVICES.map((svc, i) => (
            <article key={svc.name}
              className={`p-8 border transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`}
              style={{ borderColor: C.border, background: C.white, transitionDelay: `${i * 80}ms` }}>
              {/* header */}
              <div className="flex items-center gap-3 mb-7 pb-5"
                style={{ borderBottom: `1px solid ${C.border}` }}>
                <span className="text-2xl float">{svc.icon}</span>
                <h3 className="font-russo text-2xl" style={{ color: C.dark }}>{svc.name}</h3>
              </div>
              {/* items */}
              <div className="space-y-3">
                {svc.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: C.muted }}>{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: C.rose }}>{item.price}</span>
                  </div>
                ))}
              </div>
              <a href={SALON.whatsapp} target="_blank" rel="noopener noreferrer"
                className="mt-8 block text-center py-3 text-xs font-bold tracking-widest uppercase transition-all"
                style={{ background: C.bgAlt, color: C.dark, border: `1px solid ${C.border}` }}>
                Book {svc.name}
              </a>
            </article>
          ))}
        </div>
        <p className="text-center text-xs mt-8" style={{ color: C.muted }}>
          Prices are indicative. Final price confirmed at appointment. Consultations are free.
        </p>
      </div>
    </section>
  );
}

/* ─── gallery ───────────────────────────────────────────────────── */
function Gallery() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="gallery" className="py-28 md:py-36 px-6" style={{ background: C.bgAlt }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Our work" title="The portfolio" />
        <div ref={ref}
          className={`mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-2 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          {GALLERY_LABELS.map((g, i) => {
            const big = i === 0 || i === 5;
            return (
              <div key={g.label}
                className={`relative flex items-end p-4 overflow-hidden group border transition-all duration-500 ${big ? "col-span-2" : ""} ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                style={{
                  background: i % 3 === 0
                    ? `linear-gradient(135deg, #f5ddd8, #ecddd8)`
                    : i % 3 === 1
                    ? `linear-gradient(135deg, #f8f0ea, #f0e4dc)`
                    : `linear-gradient(135deg, #efe5e0, #f5ede8)`,
                  borderColor: C.border,
                  transitionDelay: `${i * 50}ms`,
                }}>
                {/* decorative pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 text-6xl select-none pointer-events-none"
                  style={{ color: C.rose }}>
                  {i % 3 === 0 ? "💅" : i % 3 === 1 ? "👁" : "✦"}
                </div>
                {/* tag */}
                <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-bold tracking-wider"
                  style={{ background: C.white, color: C.rose }}>
                  {g.tag}
                </span>
                {/* label */}
                <p className="relative z-10 text-xs font-medium translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ color: C.darkMid }}>
                  {g.label}
                </p>
                {/* bottom line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: C.rose }} />
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs mt-6 tracking-widest uppercase" style={{ color: C.muted }}>
          Replace placeholders with your real nail photos
        </p>
      </div>
    </section>
  );
}

/* ─── booking / contact ─────────────────────────────────────────── */
function Booking() {
  const { ref, inView } = useInView();
  const channels = [
    { href: SALON.whatsapp, label: "WhatsApp", sub: `+66 ${SALON.phone}`, bg: "#25D366", icon: "💬" },
    { href: SALON.line, label: "Line", sub: "@luxurycollectionpattaya", bg: "#06C755", icon: "💚" },
    { href: SALON.tel, label: "Call us", sub: SALON.phone, bg: C.rose, icon: "📞" },
  ];
  return (
    <section id="booking" className="py-28 md:py-36 px-6" style={{ background: C.dark }}>
      <div ref={ref}
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* ornament */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10" style={{ background: C.rose }} />
          <span className="shimmer" style={{ color: C.blush }}>✦</span>
          <div className="h-px w-10" style={{ background: C.rose }} />
        </div>

        <p className="text-xs tracking-[0.45em] uppercase mb-4" style={{ color: C.rose }}>Book an appointment</p>
        <h2 className="font-russo text-4xl md:text-5xl text-white mb-4">
          Ready to glow?
        </h2>
        <p className="mb-12 leading-relaxed text-sm" style={{ color: "#9a8880" }}>
          Message us to book your appointment. Same-day slots available. Walk-ins welcome when space permits.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {channels.map((c) => (
            <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 py-5 px-3 font-bold transition-opacity hover:opacity-85 active:scale-95"
              style={{ background: c.bg, color: C.white }}>
              <span className="text-2xl">{c.icon}</span>
              <span className="text-sm tracking-wide">{c.label}</span>
              <span className="text-xs opacity-75">{c.sub}</span>
            </a>
          ))}
        </div>

        {/* location card */}
        <div className="p-7 border text-left" style={{ borderColor: `${C.rose}30` }}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.muted }}>Address</p>
              <p className="text-sm text-white font-medium">Luxury Collection Pattaya</p>
              <p className="text-xs mt-1" style={{ color: C.muted }}>{SALON.address}</p>
              <a href={SALON.maps} target="_blank" rel="noopener noreferrer"
                className="inline-block mt-2 text-xs transition-colors hover:opacity-80" style={{ color: C.rose }}>
                Google Maps →
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.muted }}>Hours</p>
              <p className="text-sm text-white font-medium">{SALON.hours}</p>
              <p className="text-xs mt-1" style={{ color: C.muted }}>No appointment needed</p>
              <p className="text-xs mt-1" style={{ color: C.rose }}>{SALON.rating} · {SALON.reviews}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10" style={{ background: C.darkMid, borderTop: `1px solid #2d2520` }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <p className="text-xs" style={{ color: "#5a4540" }}>
          © 2026 Luxury Collection Pattaya · All rights reserved
        </p>
      </div>
    </footer>
  );
}

/* ─── sticky ────────────────────────────────────────────────────── */
function StickyBook() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href={SALON.whatsapp} target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 font-bold px-6 py-3 text-sm tracking-wide flex items-center gap-2 shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: C.rose, color: C.white }}>
      💅 Book now
    </a>
  );
}

/* ─── shared ────────────────────────────────────────────────────── */
function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-10" style={{ background: `linear-gradient(to right, transparent, ${C.rose})` }} />
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: C.rose }}>{label}</p>
        <div className="h-px w-10" style={{ background: `linear-gradient(to left, transparent, ${C.rose})` }} />
      </div>
      <h2 className="font-russo text-4xl md:text-5xl" style={{ color: C.dark }}>{title}</h2>
    </div>
  );
}
