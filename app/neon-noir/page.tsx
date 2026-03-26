"use client";
import { useEffect, useRef, useState } from "react";

// ─── i18n scaffold ────────────────────────────────────────────────────────────
// const [locale, setLocale] = useState<"en" /* | "th" */>("en");
const COPY = {
  en: {
    nav: {
      logo: "NEON NOIR",
      location: "BANGKOK · THAILAND",
      links: ["Events", "Tables", "Gallery", "Location"] as string[],
      cta: "Reserve VIP",
    },
    hero: {
      heading: "NEON NOIR",
      tagline: "Bangkok's Finest Night Experience",
      cta1: "Book VIP Table",
      cta2: "View Events",
    },
    stats: [
      { v: "500", l: "Capacity" },
      { v: "12", l: "DJ Residents" },
      { v: "24", l: "VIP Tables" },
      { v: "10PM", l: "Opens" },
    ],
    events: {
      label: "On The Decks",
      title: "UPCOMING EVENTS",
      cta: "Get Tickets",
    },
    tables: {
      label: "Reserve Your Night",
      title: "VIP TABLES",
    },
    gallery: {
      label: "Inside Neon Noir",
      title: "THE EXPERIENCE",
    },
    location: {
      label: "Find Us",
      title: "BANGKOK, THAILAND",
      address1: "Neon Noir Bangkok",
      address2: "Silom District, Bang Rak",
      address3: "Bangkok 10500",
      address4: "Thailand",
      hours1Label: "Fri – Sat",
      hours1: "10PM – 5AM",
      hours2Label: "Thu – Sun",
      hours2: "9PM – 4AM",
      whatsapp: "+66 89 123 4567",
      whatsappCta: "Message us →",
      line: "@neonnoir.bkk",
      lineCta: "Add on LINE →",
      ctaHeading: "READY FOR THE ULTIMATE NIGHT?",
      ctaSub: "Reserve your VIP table before it sells out",
      ctaBtn: "Book via WhatsApp",
    },
    footer: {
      copy: "© 2026 Neon Noir · Bangkok, Thailand",
    },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const ACCENT = "#7c3aed";
const BG = "#04020a";

const NAV_LINKS = COPY.en.nav.links;

const EVENTS = [
  {
    id: 1105666,
    date: "FRI 4 APR 2026",
    dj: "DJ SORA",
    genre: "DEEP HOUSE",
    desc: "An intimate deep house journey through sound and light.",
  },
  {
    id: 2240763,
    date: "SAT 5 APR 2026",
    dj: "MAXX VOLTA",
    genre: "TECHNO",
    desc: "Raw industrial techno from Berlin's underground.",
  },
  {
    id: 3045247,
    date: "SAT 12 APR 2026",
    dj: "LUNA WAVE",
    genre: "MELODIC BASS",
    desc: "Euphoric melodic bass sets that move body and soul.",
  },
];

const TABLES = [
  {
    name: "Standard Table",
    price: "3,000",
    unit: "THB",
    badge: null as string | null,
    featured: false,
    perks: [
      "Table for up to 6 guests",
      "1 bottle included",
      "Priority entry",
      "Dedicated server",
    ],
  },
  {
    name: "VIP Booth",
    price: "8,000",
    unit: "THB",
    badge: "MOST POPULAR" as string | null,
    featured: true,
    perks: [
      "Private booth for up to 10",
      "2 premium bottles",
      "Express entry + wristbands",
      "Personal host for the night",
    ],
  },
  {
    name: "Royal Suite",
    price: "20,000",
    unit: "THB",
    badge: "ULTRA VIP" as string | null,
    featured: false,
    perks: [
      "Exclusive suite for up to 16",
      "Unlimited bottle service",
      "Red-carpet arrival",
      "Meet & greet with DJ",
    ],
  },
];

const GALLERY_IDS = [1587927, 2111015, 1190297, 3244513, 1540404, 2034851];

function pexels(id: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
}

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NeonNoirPage() {
  const [mode, setMode] = useState<"compact" | "full">("compact");
  return (
    <div className="bg-black min-h-screen" style={{ background: BG }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${ACCENT}; }
        @keyframes purpleglow {
          0%, 100% { text-shadow: 0 0 20px rgba(124,58,237,.35); }
          50% { text-shadow: 0 0 80px rgba(124,58,237,.9), 0 0 140px rgba(124,58,237,.3); }
        }
        .purple-glow { animation: purpleglow 3.5s ease-in-out infinite; }
        @keyframes floatOrb {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.12); }
        }
        .float-orb { animation: floatOrb 6s ease-in-out infinite; }
      `}</style>
      <Navbar mode={mode} setMode={setMode} />
      <Hero />
      <StatsBar />
      <Events />
      <VipTables />
      {mode === "full" && <Gallery />}
      <Location />
      <Footer />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ mode, setMode }: { mode: "compact" | "full"; setMode: (m: "compact" | "full") => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md border-b border-purple-900/30" : ""
      }`}
      style={scrolled ? { background: "rgba(4,2,10,0.95)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span
            className="bebas text-2xl tracking-[0.15em] text-white"
          >
            {COPY.en.nav.logo}
          </span>
          <span
            className="text-[9px] tracking-[0.4em] uppercase font-semibold"
            style={{ color: ACCENT }}
          >
            {COPY.en.nav.location}
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() =>
                document
                  .getElementById(l.toLowerCase())
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.22em] uppercase transition-colors"
            >
              {l}
            </button>
          ))}
        </div>

        {/* Mode toggle + CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center overflow-hidden border border-purple-900/40">
            {(["compact", "full"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className="text-[9px] font-bold px-2.5 py-1.5 tracking-widest uppercase transition-all duration-200"
                style={{ background: mode === m ? ACCENT : "transparent", color: mode === m ? "#000" : "#6b21a8" }}>
                {m}
              </button>
            ))}
          </div>
          <a
            href="https://wa.me/66891234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bebas text-white text-sm px-5 py-2 tracking-widest uppercase transition-all hover:opacity-80"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              boxShadow: `0 0 20px rgba(124,58,237,0.4)`,
            }}
          >
            {COPY.en.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src={pexels(1190298)}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.15 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${BG}/70 0%, transparent 40%, ${BG} 100%)`,
          }}
        />
      </div>

      {/* Purple glow orb */}
      <div
        className="absolute top-1/2 left-1/2 float-orb w-[700px] h-[380px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "rgba(124,58,237,0.13)" }}
      />

      {/* Content */}
      <div
        className={`relative z-10 px-6 text-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p
          className="text-xs font-bold tracking-[0.55em] uppercase mb-8"
          style={{ color: ACCENT }}
        >
          {COPY.en.nav.location}
        </p>

        <h1
          className="bebas purple-glow leading-none mb-5 text-white select-none"
          style={{
            fontSize: "clamp(5rem, 19vw, 15rem)",
            letterSpacing: "0.06em",
            color: "#e9d5ff",
          }}
        >
          {COPY.en.hero.heading}
        </h1>

        <p className="text-zinc-300 text-sm md:text-base tracking-[0.38em] uppercase mb-12">
          {COPY.en.hero.tagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/66891234567"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bebas text-white px-10 py-4 tracking-widest uppercase text-base transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              boxShadow: "0 0 30px rgba(124,58,237,0.45)",
            }}
          >
            <span className="relative z-10">{COPY.en.hero.cta1}</span>
            <span className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          <button
            onClick={() =>
              document
                .getElementById("events")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bebas text-zinc-300 hover:text-white px-10 py-4 tracking-widest uppercase text-base transition-all duration-300 border hover:border-purple-500"
            style={{ borderColor: ACCENT }}
          >
            {COPY.en.hero.cta2}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div
          className="w-px h-12 animate-pulse mx-auto"
          style={{
            background: `linear-gradient(to bottom, ${ACCENT}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      className="border-y"
      style={{ borderColor: "rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.04)" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {COPY.en.stats.map((s, i) => (
          <div
            key={s.l}
            className={`flex flex-col items-center text-center py-8 border-r last:border-r-0 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              borderColor: "rgba(124,58,237,0.15)",
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <span
              className="bebas text-3xl md:text-4xl tracking-widest"
              style={{ color: ACCENT }}
            >
              {s.v}
            </span>
            <span className="text-zinc-500 text-xs tracking-widest uppercase mt-1">
              {s.l}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Events ───────────────────────────────────────────────────────────────────
function Events() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="events" className="py-28 md:py-36" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel label={COPY.en.events.label} title={COPY.en.events.title} />
        <div
          ref={ref}
          className={`mt-16 grid md:grid-cols-3 gap-6 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {EVENTS.map((ev, i) => (
            <div
              key={ev.id}
              className="relative overflow-hidden group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Photo bg */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={pexels(ev.id)}
                  alt={ev.dj}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Genre tag */}
                <span
                  className="absolute top-4 left-4 bebas text-white text-xs px-3 py-1 tracking-widest uppercase"
                  style={{ background: ACCENT }}
                >
                  {ev.genre}
                </span>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p
                    className="text-xs tracking-widest uppercase mb-2 font-semibold"
                    style={{ color: ACCENT }}
                  >
                    {ev.date}
                  </p>
                  <h3 className="bebas text-3xl text-white tracking-widest mb-2">
                    {ev.dj}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-5">{ev.desc}</p>
                  <a
                    href="https://wa.me/66891234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bebas text-white text-sm px-6 py-2 tracking-widest uppercase transition-all hover:opacity-80"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                    }}
                  >
                    {COPY.en.events.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── VIP Tables ───────────────────────────────────────────────────────────────
function VipTables() {
  const { ref, inView } = useInView();
  return (
    <section
      id="tables"
      className="py-28 md:py-36"
      style={{ background: "rgba(124,58,237,0.03)" }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionLabel label={COPY.en.tables.label} title={COPY.en.tables.title} />
        <div
          ref={ref}
          className={`mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {TABLES.map((t, i) => (
            <div
              key={t.name}
              className={`relative flex flex-col p-8 transition-all duration-300 ${
                t.featured
                  ? "border-2"
                  : "border border-purple-900/30 hover:border-purple-700/50"
              }`}
              style={
                t.featured
                  ? {
                      borderColor: ACCENT,
                      background:
                        "linear-gradient(to bottom, rgba(124,58,237,0.12), transparent)",
                      transitionDelay: `${i * 80}ms`,
                    }
                  : { transitionDelay: `${i * 80}ms` }
              }
            >
              {t.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bebas text-white text-xs px-5 py-1 tracking-widest uppercase whitespace-nowrap"
                  style={{ background: ACCENT }}
                >
                  {t.badge}
                </span>
              )}
              <p
                className="text-xs tracking-widest uppercase mb-1"
                style={{ color: t.featured ? ACCENT : "#71717a" }}
              >
                {t.name}
              </p>
              <div className="flex items-end justify-center gap-2 mt-4 mb-8">
                <span className="bebas text-white text-5xl md:text-6xl">
                  {t.price}
                </span>
                <span className="text-zinc-500 text-sm mb-2">{t.unit}</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {t.perks.map((p) => (
                  <li
                    key={p}
                    className="flex items-center justify-center gap-3 text-zinc-300 text-sm"
                  >
                    <span style={{ color: ACCENT }}>✦</span>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/66891234567"
                target="_blank"
                rel="noopener noreferrer"
                className={`bebas text-center py-3 text-sm tracking-widest uppercase transition-all ${
                  t.featured
                    ? "text-white hover:opacity-80"
                    : "border text-zinc-400 hover:text-white"
                }`}
                style={
                  t.featured
                    ? {
                        background:
                          "linear-gradient(135deg, #7c3aed, #5b21b6)",
                      }
                    : { borderColor: "rgba(124,58,237,0.4)" }
                }
              >
                Reserve Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function Gallery() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="gallery" className="py-28 md:py-36" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionLabel label={COPY.en.gallery.label} title={COPY.en.gallery.title} />
        <div
          ref={ref}
          className={`mt-16 grid grid-cols-2 md:grid-cols-3 gap-2 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {GALLERY_IDS.map((id, i) => (
            <div
              key={id}
              className="relative aspect-square overflow-hidden group bg-zinc-900"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={pexels(id)}
                alt={`Neon Noir gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Dark hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-400" />
              {/* Purple border on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 2px ${ACCENT}` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────
function Location() {
  const c = COPY.en.location;
  return (
    <section
      id="location"
      className="border-t py-28 md:py-36"
      style={{ borderColor: "rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.03)" }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionLabel label={c.label} title={c.title} />
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Info */}
          <div className="space-y-8 text-left">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-2 font-semibold"
                  style={{ color: ACCENT }}
                >
                  Address
                </p>
                <p className="text-white font-semibold text-sm">{c.address1}</p>
                <p className="text-zinc-400 text-sm mt-1">{c.address2}</p>
                <p className="text-zinc-400 text-sm">{c.address3}</p>
                <p className="text-zinc-500 text-sm">{c.address4}</p>
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-2 font-semibold"
                  style={{ color: ACCENT }}
                >
                  Hours
                </p>
                <p className="text-zinc-300 text-sm font-semibold">{c.hours1Label}</p>
                <p
                  className="bebas text-2xl mt-0.5"
                  style={{ color: ACCENT }}
                >
                  {c.hours1}
                </p>
                <p className="text-zinc-300 text-sm font-semibold mt-2">{c.hours2Label}</p>
                <p
                  className="bebas text-2xl mt-0.5"
                  style={{ color: ACCENT }}
                >
                  {c.hours2}
                </p>
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-2 font-semibold"
                  style={{ color: ACCENT }}
                >
                  WhatsApp
                </p>
                <p className="text-zinc-300 text-sm">{c.whatsapp}</p>
                <a
                  href="https://wa.me/66891234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors mt-1 inline-block hover:opacity-80"
                  style={{ color: ACCENT }}
                >
                  {c.whatsappCta}
                </a>
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-2 font-semibold"
                  style={{ color: ACCENT }}
                >
                  LINE
                </p>
                <p className="text-zinc-300 text-sm">{c.line}</p>
                <a
                  href="https://line.me/R/ti/p/@neonnoir.bkk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors mt-1 inline-block hover:opacity-80"
                  style={{ color: ACCENT }}
                >
                  {c.lineCta}
                </a>
              </div>
            </div>

            {/* Big CTA */}
            <div
              className="p-8 text-center"
              style={{ border: `1px solid ${ACCENT}` }}
            >
              <p className="bebas text-3xl md:text-4xl text-white tracking-widest mb-2">
                {c.ctaHeading}
              </p>
              <p className="text-zinc-500 text-xs tracking-wider mb-6">{c.ctaSub}</p>
              <a
                href="https://wa.me/66891234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bebas text-white px-10 py-3 tracking-widest uppercase text-base transition-all hover:opacity-80"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                }}
              >
                {c.ctaBtn}
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            className="aspect-video overflow-hidden border"
            style={{ borderColor: "rgba(124,58,237,0.3)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6!2d100.5018!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2sBangkok%2C%20Thailand!5e0!3m2!1sen!2sth!4v1"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(100%) invert(92%) contrast(80%) hue-rotate(200deg)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Neon Noir — Bangkok"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center">
      <p
        className="text-xs font-bold tracking-[0.45em] uppercase mb-3"
        style={{ color: ACCENT }}
      >
        {label}
      </p>
      <h2 className="bebas text-5xl md:text-6xl text-white tracking-widest leading-none">
        {title}
      </h2>
      <div
        className="w-16 h-px mx-auto mt-4"
        style={{ background: ACCENT }}
      />
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="border-t py-10"
      style={{ borderColor: "rgba(124,58,237,0.2)", background: BG }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span className="bebas text-xl tracking-[0.15em] text-white">
            {COPY.en.nav.logo}
          </span>
          <span
            className="text-[8px] tracking-[0.4em] uppercase font-semibold"
            style={{ color: ACCENT }}
          >
            {COPY.en.nav.location}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() =>
                document
                  .getElementById(l.toLowerCase())
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-zinc-600 hover:text-zinc-400 text-xs tracking-widest uppercase transition-colors"
            >
              {l}
            </button>
          ))}
        </div>

        <p className="text-zinc-700 text-xs">{COPY.en.footer.copy}</p>
      </div>
    </footer>
  );
}
