"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const NAV_LINKS = ["Services", "Gallery", "Pricing", "Location"];

const SERVICES = [
  {
    title: "Premium Haircut",
    price: "600 THB",
    desc: "A precise, tailored cut crafted to your face shape and personal style. Our master barbers bring old-school technique and modern finesse to every session.",
    details: [
      "Consultation & styling advice",
      "Hot towel neck finish",
      "Premium grooming products",
      "Blow-dry & styling included",
    ],
    tag: "SIGNATURE SERVICE",
    img: "https://images.pexels.com/photos/7697445/pexels-photo-7697445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Classic Hot Shave",
    price: "800 THB",
    desc: "The full ritual. Warm lather, straight razor, hot towels and a cold finish. Pure barbershop tradition elevated to a luxury experience.",
    details: [
      "Pre-shave hot towel prep",
      "Straight razor technique",
      "Soothing post-shave balm",
      "Cold towel close",
    ],
    tag: "MOST INDULGENT",
    img: "https://images.pexels.com/photos/36150766/pexels-photo-36150766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Beard Sculpt",
    price: "500 THB",
    desc: "Sharp lines, defined edges, a beard that commands respect. We shape and condition your beard to complement your features perfectly.",
    details: [
      "Line-up & edge definition",
      "Beard wash & condition",
      "Sculpting & shaping",
      "Beard oil finish",
    ],
    tag: "SHARP & DEFINED",
    img: "https://images.pexels.com/photos/3998405/pexels-photo-3998405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const GALLERY_IMGS = [
  {
    src: "https://images.pexels.com/photos/7697278/pexels-photo-7697278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Barber Royale — The Chair",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/7518729/pexels-photo-7518729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Master barber at work",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/7697642/pexels-photo-7697642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "The perfect finish",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/7697677/pexels-photo-7697677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Grooming detail",
    span: "col-span-2",
  },
];

const PRICING_PLANS = [
  {
    name: "Standard",
    sub: "Haircut",
    price: "600",
    unit: "THB",
    featured: false,
    badge: null as string | null,
    features: [
      "Precision haircut",
      "Styling consultation",
      "Hot towel neck finish",
      "Premium product finish",
    ],
  },
  {
    name: "Premium",
    sub: "Haircut + Beard",
    price: "900",
    unit: "THB",
    featured: true,
    badge: "BEST VALUE" as string | null,
    features: [
      "Everything in Standard",
      "Beard sculpt & line-up",
      "Beard conditioning oil",
      "Edge definition",
    ],
  },
  {
    name: "VIP Package",
    sub: "Full Package",
    price: "1 500",
    unit: "THB",
    featured: false,
    badge: "ROYAL TREATMENT" as string | null,
    features: [
      "Premium Haircut",
      "Classic Hot Shave",
      "Full Beard Sculpt",
      "Complimentary drink",
    ],
  },
];

export default function BarberRoyalePage() {
  const [mode, setMode] = useState<"compact" | "full">("compact");
  return (
    <div className="bg-black min-h-screen">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #ca8a04; }
        .bebas { font-family: var(--font-bebas), 'Bebas Neue', Impact, sans-serif; letter-spacing: 0.04em; }
        @keyframes goldglow {
          0%, 100% { text-shadow: 0 0 20px rgba(202,138,4,.3); }
          50% { text-shadow: 0 0 70px rgba(202,138,4,.85), 0 0 120px rgba(202,138,4,.25); }
        }
        .gold-glow { animation: goldglow 3.5s ease-in-out infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .svc-img { transition: transform .7s cubic-bezier(.16,1,.3,1); }
        .svc-img:hover { transform: scale(1.04); }
      `}</style>
      <Navbar mode={mode} setMode={setMode} />
      <Hero />
      <Marquee />
      <Stats />
      <Services />
      {mode === "full" && <Gallery />}
      <Pricing />
      <Location />
      <Footer />
    </div>
  );
}

function Marquee() {
  const items = ["Premium Haircut", "Hot Shave", "Beard Sculpt", "Walk-ins Welcome", "Phuket Thailand", "Master Barbers", "Since 2023", "The Royal Treatment"];
  const all = [...items, ...items];
  return (
    <div className="overflow-hidden border-y py-3" style={{ borderColor: "#ca8a0422", background: "#050400" }}>
      <div style={{ display: "flex", gap: "3rem", width: "max-content", animation: "marquee 22s linear infinite" }}>
        {all.map((item, i) => (
          <span key={i} className="bebas text-xs tracking-[0.35em] uppercase whitespace-nowrap"
            style={{ color: i % 2 === 0 ? "#ca8a04" : "#5a3e00" }}>
            {item}{i % 2 !== 0 && <span style={{ color: "#ca8a04", opacity: 0.5, marginLeft: "1.5rem" }}>✦</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function Navbar({ mode, setMode }: { mode: "compact" | "full"; setMode: (m: "compact" | "full") => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/95 backdrop-blur-md border-b border-zinc-900" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{ border: "1px solid #ca8a04" }}
          >
            <span className="bebas text-xs tracking-wider" style={{ color: "#ca8a04" }}>
              BR
            </span>
          </div>
          <span className="bebas text-xl tracking-[0.18em] text-white">
            BARBER ROYALE
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
              className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              {l}
            </button>
          ))}
        </div>
        {/* Mode toggle + CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center overflow-hidden" style={{ border: "1px solid #ca8a0444" }}>
            {(["compact", "full"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className="text-[9px] font-bold px-2.5 py-1.5 tracking-widest uppercase transition-all duration-200"
                style={{ background: mode === m ? "#ca8a04" : "transparent", color: mode === m ? "#000" : "#52400a" }}>
                {m}
              </button>
            ))}
          </div>
          <a href="https://wa.me/66812345678" target="_blank" rel="noopener noreferrer"
            className="hidden md:block bebas text-black text-sm px-5 py-2 tracking-widest uppercase transition-all hover:opacity-80"
            style={{ background: "#ca8a04" }}>
            Book Now
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>
    </nav>
    <div className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      {NAV_LINKS.map((l) => (
        <button key={l} onClick={() => go(l.toLowerCase())}
          className="bebas text-white text-4xl tracking-widest">{l}</button>
      ))}
    </div>
    </>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-center">
      {/* Background image at 25% opacity */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7697329/pexels-photo-7697329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.25 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
      </div>
      {/* Scanlines effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.18,
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.2) 3px,rgba(0,0,0,.2) 4px)",
        }}
      />
      {/* Gold glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[320px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: "rgba(202,138,4,0.1)" }}
      />

      <div
        className={`relative z-10 px-6 text-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p
          className="text-xs font-bold tracking-[0.6em] uppercase mb-8"
          style={{ color: "#ca8a04" }}
        >
          PHUKET · THAILAND
        </p>

        <h1
          className="bebas gold-glow leading-none mb-5 text-white select-none"
          style={{
            fontSize: "clamp(5rem,18vw,14rem)",
            letterSpacing: "0.06em",
          }}
        >
          BARBER
          <br />
          <span style={{ color: "#ca8a04" }}>ROYALE</span>
        </h1>

        <p className="text-zinc-300 text-sm md:text-base tracking-[0.38em] uppercase mb-3">
          The Art of the Perfect Cut
        </p>
        <p className="text-zinc-600 text-xs tracking-widest mb-14">
          Haircut · Hot Shave · Beard Sculpt · Walk-ins Welcome
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/66812345678"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bebas text-black font-bold px-10 py-4 tracking-widest uppercase text-base transition-all duration-300"
            style={{ background: "#ca8a04" }}
          >
            <span className="relative z-10">Book via WhatsApp</span>
            <span className="absolute inset-0 bg-white/15 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          <button
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border text-zinc-400 hover:text-white bebas font-bold px-10 py-4 tracking-widest uppercase text-base transition-all duration-300"
            style={{ borderColor: "#ca8a04" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "#ca8a04")
            }
          >
            View Pricing
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div
          className="w-px h-12 animate-pulse mx-auto"
          style={{
            background: "linear-gradient(to bottom, #ca8a04, transparent)",
          }}
        />
      </div>
    </section>
  );
}

function Stats() {
  const { ref, inView } = useInView();
  const items = [
    { v: "Est. 2023", l: "Founded in Phuket" },
    { v: "Master Barbers", l: "On every shift" },
    { v: "5-Star Reviews", l: "Rated by clients" },
    { v: "Walk-ins Welcome", l: "No wait, just walk in" },
  ];
  return (
    <section ref={ref} className="bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <div
            key={s.l}
            className={`flex flex-col items-center text-center py-8 border-r border-zinc-900 last:border-r-0 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span
              className="bebas text-xl md:text-2xl tracking-widest"
              style={{ color: "#ca8a04" }}
            >
              {s.v}
            </span>
            <span className="text-zinc-600 text-xs tracking-widest uppercase mt-1">
              {s.l}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-black py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel label="Our Craft" title="SIGNATURE SERVICES" />
        <div className="mt-24 space-y-28">
          {SERVICES.map((svc, i) => (
            <ServiceBlock key={svc.title} svc={svc} flip={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceBlock({
  svc,
  flip,
}: {
  svc: (typeof SERVICES)[0];
  flip: boolean;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center transition-all duration-1000 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Image */}
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-zinc-900 ${
          flip ? "md:order-2" : ""
        }`}
      >
        <img
          src={svc.img}
          alt={svc.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
        <span
          className="absolute top-4 left-4 bebas text-black text-xs px-3 py-1 tracking-widest uppercase"
          style={{ background: "#ca8a04" }}
        >
          {svc.tag}
        </span>
      </div>

      {/* Text */}
      <div className={`text-center ${flip ? "md:order-1" : ""}`}>
        <p
          className="text-xs font-bold tracking-[0.4em] uppercase mb-2"
          style={{ color: "#ca8a04" }}
        >
          Starting from
        </p>
        <p
          className="bebas text-4xl md:text-5xl mb-1"
          style={{ color: "#ca8a04" }}
        >
          {svc.price}
        </p>
        <h3 className="bebas text-3xl md:text-4xl tracking-widest text-white mb-5">
          {svc.title}
        </h3>
        <p className="text-zinc-400 leading-relaxed mb-8 max-w-md mx-auto">
          {svc.desc}
        </p>
        <div className="flex justify-center mb-8">
          <div className="inline-block text-left space-y-3">
            {svc.details.map((d) => (
              <div key={d} className="flex items-center gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#ca8a04" }}
                />
                <span className="text-zinc-300 text-sm">{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <a
            href="https://wa.me/66812345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bebas text-black px-8 py-3 tracking-widest uppercase text-sm transition-all hover:opacity-80"
            style={{ background: "#ca8a04" }}
          >
            Book This Service
          </a>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="gallery" className="bg-zinc-950 py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionLabel label="Inside the Shop" title="THE ROYALE EXPERIENCE" />
        <div
          ref={ref}
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-2 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {GALLERY_IMGS.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden group bg-zinc-900 ${img.span}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              {/* Gold border on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 2px #ca8a04" }}
              />
              <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-white text-xs translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-center bg-gradient-to-t from-black/80 to-transparent">
                {img.alt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { ref, inView } = useInView();
  return (
    <section id="pricing" className="bg-black py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionLabel label="Transparent Pricing" title="CHOOSE YOUR EXPERIENCE" />
        <div
          ref={ref}
          className={`mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {PRICING_PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 transition-all duration-300 ${
                plan.featured
                  ? "border-2"
                  : "border border-zinc-800 hover:border-zinc-600"
              }`}
              style={
                plan.featured
                  ? {
                      borderColor: "#ca8a04",
                      background:
                        "linear-gradient(to bottom, rgba(202,138,4,0.08), transparent)",
                      transitionDelay: `${i * 80}ms`,
                    }
                  : { transitionDelay: `${i * 80}ms` }
              }
            >
              {plan.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bebas text-black text-xs px-5 py-1 tracking-widest uppercase whitespace-nowrap"
                  style={{ background: "#ca8a04" }}
                >
                  {plan.badge}
                </span>
              )}
              <p
                className="text-xs tracking-widest uppercase mb-1"
                style={{ color: plan.featured ? "#ca8a04" : "#71717a" }}
              >
                {plan.name}
              </p>
              <p className="text-zinc-500 text-xs mb-6">{plan.sub}</p>
              <div className="flex items-end justify-center gap-2 mb-8">
                <span className="bebas text-white text-6xl">{plan.price}</span>
                <span className="text-zinc-500 text-sm mb-2">{plan.unit}</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center justify-center gap-3 text-zinc-300 text-sm"
                  >
                    <span style={{ color: "#ca8a04" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/66812345678"
                target="_blank"
                rel="noopener noreferrer"
                className={`bebas text-center py-3 text-sm tracking-widest uppercase transition-all ${
                  plan.featured
                    ? "text-black hover:opacity-80"
                    : "border border-zinc-700 hover:border-yellow-600 text-zinc-400 hover:text-white"
                }`}
                style={plan.featured ? { background: "#ca8a04" } : {}}
              >
                Book Now
              </a>
            </div>
          ))}
        </div>

        {/* Walk-ins banner */}
        <div className="mt-10 border border-zinc-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#ca8a04" }}
            />
            <span className="text-zinc-300 text-sm">Walk-ins Welcome</span>
          </div>
          <span className="hidden sm:block text-zinc-700">·</span>
          <span className="text-white font-bold text-lg tracking-wide">
            Open Daily · 10:00 – 20:00
          </span>
          <span className="hidden sm:block text-zinc-700">·</span>
          <div className="flex items-center gap-2 text-zinc-500 text-xs">
            <span>Haircut</span>
            <span>·</span>
            <span>Hot Shave</span>
            <span>·</span>
            <span>Beard</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="bg-zinc-950 border-t border-zinc-900 py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionLabel label="Find Us" title="PHUKET, THAILAND" />
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6 text-left">
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-2"
                  style={{ color: "#ca8a04" }}
                >
                  Address
                </p>
                <p className="text-white font-semibold text-sm">Barber Royale</p>
                <p className="text-zinc-400 text-sm mt-1">Patong Beach Area</p>
                <p className="text-zinc-400 text-sm">Phuket 83150</p>
                <p className="text-zinc-500 text-sm">Thailand</p>
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-2"
                  style={{ color: "#ca8a04" }}
                >
                  Hours
                </p>
                <p className="text-white font-bold text-sm">Monday – Sunday</p>
                <p
                  className="bebas text-2xl mt-1"
                  style={{ color: "#ca8a04" }}
                >
                  10:00 – 20:00
                </p>
                <p className="text-zinc-600 text-xs mt-1">
                  Last booking at 19:00
                </p>
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-2"
                  style={{ color: "#ca8a04" }}
                >
                  WhatsApp
                </p>
                <p className="text-zinc-300 text-sm">+66 81 234 5678</p>
                <a
                  href="https://wa.me/66812345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors mt-1 inline-block"
                  style={{ color: "#ca8a04" }}
                >
                  Message us →
                </a>
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-2"
                  style={{ color: "#ca8a04" }}
                >
                  Walk-ins
                </p>
                <p className="text-zinc-300 text-sm">Always welcome</p>
                <p className="text-zinc-500 text-xs mt-1">
                  No appointment needed
                </p>
              </div>
            </div>
            {/* Big WhatsApp CTA */}
            <div
              className="p-8 text-center"
              style={{ border: "1px solid #ca8a04" }}
            >
              <p className="bebas text-3xl md:text-4xl text-white tracking-widest mb-2">
                READY FOR THE ROYAL TREATMENT?
              </p>
              <p className="text-zinc-500 text-xs tracking-wider mb-6">
                Walk-ins welcome · Appointments preferred
              </p>
              <a
                href="https://wa.me/66812345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bebas text-black px-10 py-3 tracking-widest uppercase text-base transition-all hover:opacity-80"
                style={{ background: "#ca8a04" }}
              >
                Book via WhatsApp
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="aspect-video overflow-hidden border border-zinc-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.3!2d98.2976!3d7.8951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df3b6f0d8a1%3A0x0!2zUGh1a2V0!5e0!3m2!1sen!2sth!4v1"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(100%) invert(88%) contrast(85%)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Barber Royale — Phuket"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, #ca8a04aa)" }} />
        <p className="text-[10px] font-bold tracking-[0.55em] uppercase" style={{ color: "#ca8a04" }}>{label}</p>
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, #ca8a04aa)" }} />
      </div>
      <h2 className="bebas text-6xl md:text-7xl text-white tracking-widest leading-none">{title}</h2>
      <div className="flex items-center justify-center gap-3 mt-4">
        <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #ca8a04)" }} />
        <span style={{ color: "#ca8a04", fontSize: "7px" }}>✦</span>
        <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #ca8a04)" }} />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 flex items-center justify-center"
            style={{ border: "1px solid #ca8a04" }}
          >
            <span
              className="bebas text-xs tracking-wider"
              style={{ color: "#ca8a04" }}
            >
              BR
            </span>
          </div>
          <span className="bebas text-lg tracking-[0.18em] text-white">
            BARBER ROYALE
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
        <p className="text-zinc-700 text-xs">
          © 2026 Barber Royale · Phuket, Thailand
        </p>
      </div>
    </footer>
  );
}
