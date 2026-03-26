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
  navy:    "#0a1628",
  navyMid: "#0f2240",
  ocean:   "#1a4a7a",
  teal:    "#0094b8",
  aqua:    "#00c9e4",
  sand:    "#faf6ef",
  cream:   "#f2ede4",
  gold:    "#e8a020",
  white:   "#ffffff",
  muted:   "#8fa8c4",
  border:  "#1e3a5f",
};

/* ─── data ──────────────────────────────────────────────────────── */
const FLEET = [
  {
    name: "Speedboat",
    cap: "Up to 10 guests",
    tag: "MOST BOOKED",
    price: "3 500",
    unit: "฿ / half day",
    desc: "Fast and fun. Perfect for island hopping, snorkeling or a quick coastal escape. Includes captain & fuel.",
    features: ["Captain included", "Fuel included", "Snorkeling gear", "Cooler & ice"],
    highlight: true,
    icon: "⚡",
  },
  {
    name: "Catamaran",
    cap: "Up to 20 guests",
    tag: "GROUPS & PARTIES",
    price: "9 500",
    unit: "฿ / half day",
    desc: "Spacious twin-hull for groups, corporate events and birthday parties. Stable, shaded, with sun deck.",
    features: ["Captain + crew", "Sound system", "Shaded lounge deck", "Swim platform"],
    highlight: false,
    icon: "⛵",
  },
  {
    name: "Luxury Yacht",
    cap: "Up to 12 guests",
    tag: "PRIVATE CHARTER",
    price: "18 000",
    unit: "฿ / day",
    desc: "Full-day private yacht charter. Air-conditioned cabin, gourmet catering option, champagne on arrival.",
    features: ["Captain + hostess", "AC cabin & salon", "Catering available", "Champagne welcome"],
    highlight: false,
    icon: "⚓",
  },
  {
    name: "Longtail Boat",
    cap: "Up to 6 guests",
    tag: "LOCAL EXPERIENCE",
    price: "1 200",
    unit: "฿ / 2 hours",
    desc: "The authentic Thai way to explore hidden coves, mangroves and local fishing villages.",
    features: ["Local driver-guide", "Hidden spots access", "Flexible routing", "Photo stops"],
    highlight: false,
    icon: "🚤",
  },
];

const TOURS = [
  {
    title: "Island Hopping",
    duration: "Full day · 8h",
    price: "From 2 500 ฿",
    desc: "Koh Larn, Koh Sak, Koh Krok — three islands, crystal waters, lunch on the beach.",
    badge: "Most popular",
    color: C.teal,
  },
  {
    title: "Sunset Cruise",
    duration: "3 hours · 17:00–20:00",
    price: "From 1 800 ฿",
    desc: "Watch the sun sink into the Gulf of Thailand with drinks in hand. Magical every time.",
    badge: "Romantic",
    color: C.gold,
  },
  {
    title: "Snorkeling Adventure",
    duration: "Half day · 5h",
    price: "From 2 000 ฿",
    desc: "Guided snorkeling at the best reef spots around Pattaya. Equipment included for all levels.",
    badge: "Family-friendly",
    color: C.aqua,
  },
  {
    title: "Private Transfer",
    duration: "Flexible timing",
    price: "From 4 500 ฿",
    desc: "Koh Chang, Koh Samet or any Gulf destination. Private speedboat, no shared tours, no waiting.",
    badge: "Exclusive",
    color: C.ocean,
  },
];

const CONTACT = {
  whatsapp: "https://wa.me/66800000000",
  telegram: "https://t.me/bluehorizonpattaya",
  line: "https://line.me/ti/p/~bluehorizon",
  tel: "tel:+66800000000",
};

const STATS = [
  { v: "12+", l: "Years on the water" },
  { v: "4 800+", l: "Trips completed" },
  { v: "15", l: "Boats in fleet" },
  { v: "4.9★", l: "Average rating" },
];

/* ─── page ──────────────────────────────────────────────────────── */
export default function BoatsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.navy, color: C.white }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.navy}; }
        ::-webkit-scrollbar-thumb { background: ${C.teal}; }
        @keyframes wave {
          0%,100% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
        }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%,100%{opacity:.5}50%{opacity:1} }
        .wave-line { animation: wave 6s ease-in-out infinite; }
        .float { animation: float 4s ease-in-out infinite; }
        .shimmer { animation: shimmer 2.5s ease-in-out infinite; }
      `}</style>
      <Navbar />
      <Hero />
      <Stats />
      <Tours />
      <Fleet />
      <BoatsGallery />
      <Booking />
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
      style={{ background: scrolled ? `${C.navy}f5` : "transparent", borderBottom: scrolled ? `1px solid ${C.border}` : "none", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {[["Tours", "tours"], ["Fleet", "fleet"], ["Book", "book"]].map(([l, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.2em] transition-colors hover:text-white"
              style={{ color: C.muted }}>
              {l}
            </button>
          ))}
        </div>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
          className="text-xs font-black px-5 py-2.5 tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{ background: C.teal, color: C.white }}>
          Book a trip
        </a>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="float text-2xl select-none">⚓</span>
      <div className="flex flex-col leading-none">
        <span className="font-russo text-lg tracking-widest uppercase" style={{ color: C.white }}>Blue Horizon</span>
        <span className="text-[9px] tracking-[0.4em] uppercase shimmer" style={{ color: C.aqua }}>Boats & Tours · Pattaya</span>
      </div>
    </div>
  );
}

/* ─── hero ──────────────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{ background: `linear-gradient(165deg, ${C.navyMid} 0%, ${C.navy} 50%, #050d1a 100%)` }}>

      {/* animated ocean glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute wave-line" style={{
          bottom: "20%", left: "-10%", right: "-10%", height: "300px",
          background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${C.teal}18 0%, transparent 70%)`,
        }} />
        <div className="absolute wave-line" style={{
          bottom: "10%", left: "-20%", right: "-20%", height: "200px",
          background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${C.aqua}10 0%, transparent 70%)`,
          animationDelay: "2s",
        }} />
        {/* stars / particles */}
        {[...Array(24)].map((_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1 + "px", height: Math.random() * 2 + 1 + "px",
              left: Math.random() * 100 + "%", top: Math.random() * 60 + "%",
              background: C.aqua, opacity: Math.random() * 0.5 + 0.1,
              animation: `shimmer ${Math.random() * 2 + 2}s ease-in-out ${Math.random() * 3}s infinite`,
            }} />
        ))}
      </div>

      {/* horizon line */}
      <div className="absolute pointer-events-none" style={{ bottom: "35%", left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${C.teal}40, transparent)` }} />

      <div className={`relative z-10 px-6 max-w-4xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-xs tracking-[0.6em] uppercase mb-8 shimmer" style={{ color: C.aqua }}>
          Pattaya · Gulf of Thailand
        </p>

        <h1 className="font-russo leading-none mb-4" style={{ fontSize: "clamp(3.5rem,11vw,9rem)", color: C.white }}>
          YOUR BOAT.
        </h1>
        <h1 className="font-russo leading-none mb-8" style={{ fontSize: "clamp(3.5rem,11vw,9rem)", color: C.aqua }}>
          YOUR OCEAN.
        </h1>

        <p className="text-lg mb-3 max-w-2xl mx-auto leading-relaxed" style={{ color: C.muted }}>
          Private speedboats, catamarans and yacht charters from Pattaya. Island hopping, sunset cruises and custom routes — all with captain included.
        </p>
        <p className="text-xs tracking-[0.3em] uppercase mb-14" style={{ color: `${C.teal}aa` }}>
          Speedboat · Catamaran · Yacht · Longtail · Tours
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" })}
            className="font-black px-10 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-90 active:scale-95"
            style={{ background: C.teal, color: C.white }}>
            Explore tours
          </button>
          <button onClick={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold px-10 py-4 text-sm tracking-widest uppercase transition-all hover:border-white/40"
            style={{ border: `1px solid ${C.border}`, color: C.muted }}>
            View fleet
          </button>
        </div>
      </div>

      {/* wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${C.navy}, transparent)` }} />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 animate-pulse" style={{ background: `linear-gradient(to bottom, ${C.teal}80, transparent)` }} />
      </div>
    </section>
  );
}

/* ─── stats ─────────────────────────────────────────────────────── */
function Stats() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="border-y" style={{ borderColor: C.border, background: C.navyMid }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center">
        {STATS.map((s, i) => (
          <div key={s.l}
            className={`py-8 border-r last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ borderColor: C.border, transitionDelay: `${i * 80}ms` }}>
            <p className="font-russo text-3xl" style={{ color: C.aqua }}>{s.v}</p>
            <p className="text-xs uppercase tracking-widest mt-1" style={{ color: C.muted }}>{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── tours ─────────────────────────────────────────────────────── */
function Tours() {
  const { ref, inView } = useInView();
  return (
    <section id="tours" className="py-28 md:py-36 px-6" style={{ background: C.navy }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Experiences" title="Choose your adventure" light />
        <div ref={ref} className={`mt-16 grid sm:grid-cols-2 gap-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {TOURS.map((t, i) => (
            <a key={t.title} href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
              className={`relative group block border p-8 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${inView ? "opacity-100" : "opacity-0"}`}
              style={{ borderColor: C.border, background: C.navyMid, transitionDelay: `${i * 70}ms` }}>
              {/* color accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 group-hover:h-1"
                style={{ background: t.color }} />
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 tracking-widest uppercase"
                  style={{ background: `${t.color}20`, color: t.color }}>
                  {t.badge}
                </span>
                <span className="text-xs" style={{ color: C.muted }}>{t.duration}</span>
              </div>
              <h3 className="font-russo text-2xl text-white mb-2 group-hover:text-[#00c9e4] transition-colors">{t.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>{t.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-russo text-lg" style={{ color: t.color }}>{t.price}</span>
                <span className="text-xs tracking-widest uppercase transition-colors group-hover:text-white" style={{ color: C.muted }}>
                  Book now →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── fleet ─────────────────────────────────────────────────────── */
function Fleet() {
  const { ref, inView } = useInView();
  return (
    <section id="fleet" className="py-28 md:py-36 px-6" style={{ background: C.navyMid }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Our fleet" title="Pick your vessel" light />
        <div ref={ref} className={`mt-16 grid md:grid-cols-2 xl:grid-cols-4 gap-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {FLEET.map((f, i) => (
            <article key={f.name}
              className={`relative flex flex-col p-7 border transition-all duration-300 hover:-translate-y-1 ${inView ? "opacity-100" : "opacity-0"}`}
              style={{
                borderColor: f.highlight ? C.teal : C.border,
                background: f.highlight ? `linear-gradient(160deg, ${C.ocean}60, ${C.navy})` : C.navy,
                boxShadow: f.highlight ? `0 0 30px ${C.teal}20` : "none",
                transitionDelay: `${i * 70}ms`,
              }}>
              {f.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1 tracking-widest uppercase whitespace-nowrap"
                  style={{ background: C.teal, color: C.white }}>
                  {f.tag}
                </span>
              )}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{f.icon}</span>
                {!f.highlight && <span className="text-xs tracking-widest uppercase" style={{ color: C.muted }}>{f.tag}</span>}
              </div>
              <h3 className="font-russo text-xl text-white mb-1">{f.name}</h3>
              <p className="text-xs mb-4" style={{ color: C.muted }}>{f.cap}</p>
              <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: C.muted }}>{f.desc}</p>
              <ul className="space-y-2 mb-6">
                {f.features.map((ft) => (
                  <li key={ft} className="flex items-center gap-2 text-xs" style={{ color: C.muted }}>
                    <span style={{ color: C.aqua }}>✓</span>{ft}
                  </li>
                ))}
              </ul>
              <div className="mb-5">
                <span className="font-russo text-2xl text-white">{f.price}</span>
                <span className="text-xs ml-1.5" style={{ color: C.muted }}>{f.unit}</span>
              </div>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                className="text-center py-3 text-xs font-black tracking-widest uppercase transition-all"
                style={f.highlight
                  ? { background: C.teal, color: C.white }
                  : { border: `1px solid ${C.border}`, color: C.muted }}>
                Request quote
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── gallery ───────────────────────────────────────────────────── */
function BoatsGallery() {
  const { ref, inView } = useInView(0.05);
  const imgs = [
    { src: "https://images.pexels.com/photos/36661715/pexels-photo-36661715.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Speedboat at overwater villas", span: "col-span-2 row-span-2" },
    { src: "https://images.pexels.com/photos/5940391/pexels-photo-5940391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Clear blue ocean run", span: "" },
    { src: "https://images.pexels.com/photos/1198835/pexels-photo-1198835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Aerial turquoise waters", span: "" },
    { src: "https://images.pexels.com/photos/36472763/pexels-photo-36472763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Wake trail on the ocean", span: "" },
    { src: "https://images.pexels.com/photos/1085756/pexels-photo-1085756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Coastline aerial view", span: "" },
    { src: "https://images.pexels.com/photos/7753824/pexels-photo-7753824.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Sunset cruise", span: "col-span-2" },
  ];
  return (
    <section className="py-28 md:py-36 px-6" style={{ background: C.navy }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="On the water" title="Every trip, a memory" light />
        <div ref={ref}
          className={`mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-2 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          {imgs.map((img, i) => (
            <div key={img.src}
              className={`relative overflow-hidden group ${img.span} transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{
                borderRadius: i === 0 ? "2rem" : i % 3 === 0 ? "2rem 0.5rem 2rem 0.5rem" : "1rem",
                transitionDelay: `${i * 60}ms`,
              }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 w-6 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: C.aqua }} />
              <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">{img.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── booking ───────────────────────────────────────────────────── */
function Booking() {
  const { ref, inView } = useInView();
  const channels = [
    { href: CONTACT.whatsapp, label: "WhatsApp", sub: "+66 80 000 0000", bg: "#25D366", icon: "💬" },
    { href: CONTACT.telegram, label: "Telegram", sub: "@bluehorizonpattaya", bg: "#229ED9", icon: "✈" },
    { href: CONTACT.line, label: "Line", sub: "@bluehorizon", bg: "#06C755", icon: "💚" },
    { href: CONTACT.tel, label: "Call us", sub: "+66 80 000 0000", bg: C.ocean, icon: "📞" },
  ];
  return (
    <section id="book" className="py-28 md:py-36 px-6"
      style={{ background: `linear-gradient(160deg, ${C.navy} 0%, #050d1a 100%)` }}>
      <div ref={ref} className={`max-w-2xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-xs tracking-[0.45em] uppercase mb-3 shimmer" style={{ color: C.aqua }}>Book your trip</p>
        <h2 className="font-russo text-4xl md:text-5xl text-white mb-4">Ready to set sail?</h2>
        <p className="mb-12 leading-relaxed text-sm" style={{ color: C.muted }}>
          Tell us your date, group size and preferred experience. We'll send you a quote within the hour and handle everything else.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-10">
          {channels.map((c) => (
            <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 py-5 px-4 font-bold transition-opacity hover:opacity-90 active:scale-95"
              style={{ background: c.bg, color: C.white }}>
              <span className="text-2xl">{c.icon}</span>
              <span className="text-sm tracking-wide">{c.label}</span>
              <span className="text-xs opacity-70">{c.sub}</span>
            </a>
          ))}
        </div>
        <div className="p-6 border text-sm" style={{ borderColor: C.border, color: C.muted }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: C.aqua }}>Departure</p>
          <p className="text-white font-russo text-lg">Pattaya Bay · Bali Hai Pier</p>
          <p className="mt-1" style={{ color: C.muted }}>Daily departures · 06:00 – 18:00</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-3 text-sm transition-colors hover:text-white" style={{ color: C.aqua }}>
            View on Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 border-t" style={{ background: "#050d1a", borderColor: C.border }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <p className="text-xs" style={{ color: "#4b5563" }}>© 2026 Blue Horizon · Pattaya · All rights reserved</p>
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
      className={`fixed bottom-6 right-6 z-50 font-black px-6 py-3 text-sm tracking-wide flex items-center gap-2 shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: C.teal, color: C.white }}>
      ⚓ Book a trip
    </a>
  );
}

/* ─── shared ────────────────────────────────────────────────────── */
function SectionLabel({ label, title, light }: { label: string; title: string; light?: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-8" style={{ background: C.teal }} />
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: C.aqua }}>{label}</p>
        <div className="h-px w-8" style={{ background: C.teal }} />
      </div>
      <h2 className="font-russo text-4xl md:text-5xl" style={{ color: light ? C.white : C.navy }}>{title}</h2>
    </div>
  );
}
