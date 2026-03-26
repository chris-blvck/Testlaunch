"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const ACCENT = "#c9956c";
const BG = "#0d0806";

const TREATMENTS = [
  {
    title: "Thai Herbal Compress Massage",
    tag: "SIGNATURE",
    duration: "90 min",
    price: "2,400 THB",
    desc: "Ancient healing herbs wrapped in warm muslin compresses, pressed rhythmically along energy pathways. Deeply relaxing, deeply restorative.",
    details: ["Lemongrass · Kaffir lime · Turmeric", "Hot compress technique", "Full-body treatment", "Aromatherapy oil finish"],
    img: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Royal Facial Ritual",
    tag: "BESTSELLER",
    duration: "60 min",
    price: "1,800 THB",
    desc: "A bespoke facial blending Thai botanicals with French skincare philosophy. Your skin, luminous. Your mind, at rest.",
    details: ["Skin analysis & consultation", "Gold-infused serum", "Jade roller massage", "SPF protection finish"],
    img: "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Hot Stone Journey",
    tag: "PREMIUM",
    duration: "120 min",
    price: "3,200 THB",
    desc: "Smooth volcanic basalt stones, heated to perfection, melt tension from the deepest layers of muscle. A journey, not just a treatment.",
    details: ["Volcanic basalt stones", "Deep tissue release", "Chakra alignment", "Himalayan salt scrub"],
    img: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const GALLERY = [
  "https://images.pexels.com/photos/3757943/pexels-photo-3757943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/3958357/pexels-photo-3958357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/3757956/pexels-photo-3757956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/3757963/pexels-photo-3757963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/3997990/pexels-photo-3997990.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/3998000/pexels-photo-3998000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
];

const PACKAGES = [
  { name: "Day Retreat", sub: "Half-day escape", price: "4,500", features: ["2 treatments of choice", "Herbal welcome tea", "Use of steam room", "Light Thai lunch"] },
  { name: "Weekend Escape", sub: "2-day immersion", price: "12,000", featured: true, features: ["4 treatments", "Private villa access", "Daily breakfast", "Sunset massage session"] },
  { name: "Full Week", sub: "7-day transformation", price: "38,000", features: ["Daily treatments", "Nutrition consultation", "Yoga & meditation", "Airport transfers"] },
];

export default function AuraSpaPage() {
  const [mode, setMode] = useState<"compact" | "full">("compact");
  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", color: "#f5f0e8" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${ACCENT}; }
        @keyframes shimmer-gold {
          0%,100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .gold-pulse { animation: shimmer-gold 3s ease-in-out infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 28s linear infinite; white-space: nowrap; display: inline-flex; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Navbar mode={mode} setMode={setMode} />
      <Hero />
      {mode === "full" && <Marquee />}
      <Stats />
      <Treatments />
      {mode === "full" && <Philosophy />}
      {mode === "full" && <Gallery />}
      <Packages />
      <Location />
      <Footer />
    </div>
  );
}

function Navbar({ mode, setMode }: { mode: "compact" | "full"; setMode: (m: "compact" | "full") => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md border-b" : ""}`}
      style={{ background: scrolled ? "rgba(13,8,6,0.95)" : "transparent", borderColor: `${ACCENT}33` }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col leading-none">
          <span className="cormorant font-bold italic text-2xl" style={{ color: ACCENT, letterSpacing: "0.06em" }}>Aura</span>
          <span className="text-[8px] tracking-[0.4em] uppercase" style={{ color: "#a09080" }}>Spa & Wellness</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Treatments", "Gallery", "Packages", "Location"].map((l) => (
            <button key={l}
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
              style={{ color: "#a09080" }}
              onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={e => (e.currentTarget.style.color = "#a09080")}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center overflow-hidden border" style={{ borderColor: `${ACCENT}44` }}>
            {(["compact", "full"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className="text-[9px] font-bold px-2.5 py-1.5 tracking-widest uppercase transition-all duration-200"
                style={{ background: mode === m ? ACCENT : "transparent", color: mode === m ? "#0d0806" : `${ACCENT}66` }}>
                {m}
              </button>
            ))}
          </div>
          <button
            onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
            className="text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-all duration-300"
            style={{ background: ACCENT, color: "#0d0806" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0">
        <img src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1600"
          alt="" className="w-full h-full object-cover" style={{ opacity: 0.2 }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${BG}60, ${BG}40, ${BG})` }} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: `${ACCENT}12` }} />

      <div className={`relative z-10 px-6 transition-all duration-1200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-xs font-bold tracking-[0.6em] uppercase mb-8" style={{ color: ACCENT }}>KOH SAMUI · THAILAND</p>
        <h1 className="cormorant gold-pulse font-bold italic leading-none mb-4 select-none"
          style={{ fontSize: "clamp(5rem,18vw,14rem)", color: "#f5f0e8", letterSpacing: "0.06em" }}>
          Aura
        </h1>
        <p className="cormorant italic text-xl md:text-2xl mb-3" style={{ color: `${ACCENT}cc`, letterSpacing: "0.08em" }}>
          Spa & Wellness
        </p>
        <p className="text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed mb-14" style={{ color: "#c8b89a" }}>
          Where luxury meets serenity. Rooted in ancient Thai healing traditions, elevated to an art form.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById("treatments")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm font-bold px-10 py-4 tracking-widest uppercase transition-all duration-300"
            style={{ background: ACCENT, color: "#0d0806" }}>
            Explore Treatments
          </button>
          <button
            onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
            className="border text-sm font-bold px-10 py-4 tracking-widest uppercase transition-all duration-300"
            style={{ borderColor: `${ACCENT}55`, color: "#c8b89a" }}>
            View Packages
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 mx-auto animate-pulse" style={{ background: `linear-gradient(to bottom, ${ACCENT}60, transparent)` }} />
      </div>
    </section>
  );
}

function Marquee() {
  const text = "· THAI HERBAL MASSAGE · HOT STONE JOURNEY · ROYAL FACIAL · KOH SAMUI · OPEN DAILY 9AM–9PM · WELLNESS RETREAT · AURA SPA ·";
  return (
    <div className="overflow-hidden py-3 border-y" style={{ borderColor: `${ACCENT}22`, background: "#0a0604" }}>
      <div className="marquee-track">
        {[text, text].map((t, i) => (
          <span key={i} className="text-xs font-bold tracking-[0.3em] uppercase px-8" style={{ color: `${ACCENT}99` }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  const { ref, inView } = useInView();
  const items = [
    { v: "5 Stars", l: "Guest rating" },
    { v: "24", l: "Treatments" },
    { v: "Est. 2021", l: "Founded" },
    { v: "Daily", l: "9AM – 9PM" },
  ];
  return (
    <section ref={ref} className="border-b" style={{ borderColor: `${ACCENT}18` }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <div key={s.l}
            className={`flex flex-col items-center py-8 border-r text-center transition-all duration-700 last:border-r-0 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ borderColor: `${ACCENT}18`, transitionDelay: `${i * 80}ms` }}>
            <span className="cormorant font-bold text-xl md:text-2xl" style={{ color: ACCENT }}>{s.v}</span>
            <span className="text-xs tracking-widest uppercase mt-1" style={{ color: "#7a6858" }}>{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section id="treatments" className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-xs font-bold tracking-[0.45em] uppercase mb-3" style={{ color: `${ACCENT}99` }}>Our Services</p>
          <h2 className="cormorant italic font-bold text-4xl md:text-5xl" style={{ color: "#f5f0e8" }}>Signature Treatments</h2>
        </div>
        <div className="space-y-28">
          {TREATMENTS.map((t, i) => <TreatmentBlock key={t.title} treatment={t} flip={i % 2 !== 0} />)}
        </div>
      </div>
    </section>
  );
}

function TreatmentBlock({ treatment: t, flip }: { treatment: typeof TREATMENTS[0]; flip: boolean }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref}
      className={`grid md:grid-cols-2 gap-10 md:gap-20 items-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <div className={`relative aspect-[4/3] overflow-hidden ${flip ? "md:order-2" : ""}`}>
        <img src={t.img} alt={t.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top right, rgba(13,8,6,.6), transparent)" }} />
        <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 tracking-widest uppercase"
          style={{ background: ACCENT, color: "#0d0806" }}>{t.tag}</span>
      </div>
      <div className={`flex flex-col items-start ${flip ? "md:order-1" : ""}`}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs tracking-widest uppercase" style={{ color: ACCENT }}>{t.duration}</span>
          <span className="w-1 h-1 rounded-full" style={{ background: `${ACCENT}55` }} />
          <span className="text-xs tracking-widest uppercase font-bold" style={{ color: ACCENT }}>{t.price}</span>
        </div>
        <h3 className="cormorant italic font-bold text-3xl md:text-4xl mb-4" style={{ color: "#f5f0e8" }}>{t.title}</h3>
        <p className="leading-relaxed mb-6 max-w-md" style={{ color: "#a89078" }}>{t.desc}</p>
        <div className="flex flex-col space-y-2 mb-8 border-l-2 pl-4" style={{ borderColor: `${ACCENT}55` }}>
          {t.details.map((d) => (
            <span key={d} className="text-sm" style={{ color: "#c8b09a" }}>{d}</span>
          ))}
        </div>
        <button className="text-xs font-bold px-8 py-3 tracking-widest uppercase transition-all duration-300 border"
          style={{ borderColor: ACCENT, color: ACCENT }}
          onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#0d0806"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ACCENT; }}>
          Book This Treatment
        </button>
      </div>
    </div>
  );
}

function Philosophy() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref}
      className={`py-28 text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ background: "#080503", borderTop: `1px solid ${ACCENT}18`, borderBottom: `1px solid ${ACCENT}18` }}>
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-2xl md:text-3xl cormorant italic leading-relaxed" style={{ color: "#f0e8dc" }}>
          "We do not offer treatments.<br />We offer transformations."
        </p>
        <p className="text-xs tracking-widest uppercase mt-6" style={{ color: `${ACCENT}88` }}>— Aura Spa, est. 2021</p>
      </div>
    </section>
  );
}

function Gallery() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="gallery" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.45em] uppercase mb-3" style={{ color: `${ACCENT}99` }}>The Sanctuary</p>
          <h2 className="cormorant italic font-bold text-4xl md:text-5xl" style={{ color: "#f5f0e8" }}>Our Space</h2>
        </div>
        <div ref={ref}
          className={`grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px] gap-2 transition-all duration-1000 ${inView ? "opacity-100" : "opacity-0"}`}>
          {GALLERY.map((src, i) => (
            <div key={src} className={`relative overflow-hidden group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{ transitionDelay: `${i * 60}ms` }}>
              <img src={src} alt="Aura Spa" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${ACCENT}22` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  const { ref, inView } = useInView();
  return (
    <section id="packages" className="py-28" style={{ background: "#080503" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.45em] uppercase mb-3" style={{ color: `${ACCENT}99` }}>Extended Stays</p>
          <h2 className="cormorant italic font-bold text-4xl md:text-5xl" style={{ color: "#f5f0e8" }}>Retreat Packages</h2>
        </div>
        <div ref={ref}
          className={`grid md:grid-cols-3 gap-5 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {PACKAGES.map((p, i) => (
            <div key={p.name}
              className="p-8 flex flex-col transition-all duration-300"
              style={{
                background: p.featured ? `${ACCENT}0a` : "#0d0806",
                border: `1px solid ${p.featured ? ACCENT : `${ACCENT}22`}`,
                transitionDelay: `${i * 100}ms`,
              }}>
              {p.featured && (
                <span className="self-start text-xs font-bold px-3 py-1 tracking-widest uppercase mb-4"
                  style={{ background: ACCENT, color: "#0d0806" }}>MOST POPULAR</span>
              )}
              <h3 className="cormorant italic font-bold text-2xl mb-1" style={{ color: "#f5f0e8" }}>{p.name}</h3>
              <p className="text-xs tracking-widest uppercase mb-6" style={{ color: `${ACCENT}88` }}>{p.sub}</p>
              <p className="cormorant font-bold text-4xl mb-6" style={{ color: ACCENT }}>
                {p.price} <span className="text-base font-normal" style={{ color: `${ACCENT}88` }}>THB</span>
              </p>
              <div className="flex flex-col space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                    <span className="text-sm" style={{ color: "#a89078" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className="w-full text-xs font-bold py-3 tracking-widest uppercase transition-all duration-300"
                style={{ background: p.featured ? ACCENT : "transparent", color: p.featured ? "#0d0806" : ACCENT, border: `1px solid ${ACCENT}` }}
                onMouseEnter={e => { if (!p.featured) { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#0d0806"; } }}
                onMouseLeave={e => { if (!p.featured) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ACCENT; } }}>
                Book This Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  const { ref, inView } = useInView();
  return (
    <section id="location" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.45em] uppercase mb-3" style={{ color: `${ACCENT}99` }}>Find Us</p>
          <h2 className="cormorant italic font-bold text-4xl md:text-5xl" style={{ color: "#f5f0e8" }}>Location</h2>
        </div>
        <div ref={ref}
          className={`grid md:grid-cols-2 gap-10 items-start transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <div className="space-y-6 mb-10">
              <div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: `${ACCENT}88` }}>Address</p>
                <p style={{ color: "#c8b89a" }}>123 Chaweng Beach Road<br />Koh Samui, Surat Thani 84320<br />Thailand</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: `${ACCENT}88` }}>Hours</p>
                <p style={{ color: "#c8b89a" }}>Open daily · 9:00 AM – 9:00 PM</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: `${ACCENT}88` }}>Reservations</p>
                <div className="flex flex-col gap-3">
                  <a href="https://wa.me/66800000000" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors"
                    style={{ color: ACCENT }}>
                    WhatsApp →
                  </a>
                  <a href="tel:+66800000000" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors"
                    style={{ color: ACCENT }}>
                    Call Us →
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-72 md:h-96 overflow-hidden" style={{ border: `1px solid ${ACCENT}22` }}>
            <iframe
              src="https://maps.google.com/maps?q=9.5120,100.0136&z=14&output=embed"
              className="w-full h-full grayscale"
              style={{ filter: "grayscale(100%) invert(95%) sepia(10%)" }}
              allowFullScreen loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t" style={{ borderColor: `${ACCENT}18`, background: "#080503" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start leading-none">
          <span className="cormorant font-bold italic text-xl" style={{ color: ACCENT }}>Aura</span>
          <span className="text-[8px] tracking-[0.35em] uppercase" style={{ color: "#7a6858" }}>Spa & Wellness</span>
        </div>
        <p className="text-xs tracking-widest" style={{ color: "#4a3828" }}>© 2026 Aura Spa · Koh Samui, Thailand</p>
        <a href="mailto:hello@auraspa.th" className="text-xs tracking-widest transition-colors" style={{ color: "#7a6858" }}>
          hello@auraspa.th
        </a>
      </div>
    </footer>
  );
}
