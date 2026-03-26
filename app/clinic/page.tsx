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

/* ─── palette & tokens ──────────────────────────────────────────── */
const G = {
  bg: "#fafaf8",
  dark: "#0f1f18",
  green: "#1a3a2a",
  greenMid: "#2a5a40",
  gold: "#b8923a",
  goldLight: "#d4a853",
  sage: "#7a9e8a",
  muted: "#6b7280",
  border: "#e5e7eb",
};

/* ─── data ──────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: "✦", title: "Skin Brightening", desc: "Glutathione IV + topical treatments for visibly radiant, even-toned skin in 3 sessions." },
  { icon: "◈", title: "Anti-Aging", desc: "Botox, fillers and collagen boosters administered by certified doctors. Natural results." },
  { icon: "◉", title: "Laser Treatments", desc: "Nd:YAG, fractional CO₂ and pigmentation removal for flawless, smooth skin." },
  { icon: "⬡", title: "IV Therapy", desc: "Custom vitamin drips: immunity, energy, hangover recovery, beauty and detox blends." },
  { icon: "◇", title: "Health Checkup", desc: "Full blood panel, STI screening, and comprehensive health reports. Results within 24h." },
  { icon: "❋", title: "Body Sculpting", desc: "Non-surgical fat reduction, skin tightening and cellulite treatments. Zero downtime." },
];

const TRUST = [
  { n: "12+", label: "Years of practice" },
  { n: "8 000+", label: "Patients treated" },
  { n: "Licensed", label: "Ministry of Health" },
  { n: "EN · RU · TH", label: "Languages spoken" },
];

const PACKAGES = [
  {
    name: "Glow Starter",
    price: "3 900",
    sub: "฿ / session",
    items: ["Full skin consultation", "Glutathione IV drip", "Vitamin C boost", "Follow-up call"],
    cta: "Book now",
    featured: false,
  },
  {
    name: "Radiance Program",
    price: "18 500",
    sub: "฿ / 6 sessions",
    items: ["6× Skin brightening IVs", "2× Laser sessions", "Anti-aging serum kit", "Priority appointments", "1 free top-up session"],
    cta: "Most popular",
    featured: true,
  },
  {
    name: "Full Health Check",
    price: "7 500",
    sub: "฿ / package",
    items: ["Complete blood panel", "STI & hepatitis screen", "Thyroid & hormones", "Doctor consultation", "Digital results 24h"],
    cta: "Book checkup",
    featured: false,
  },
];

const CONTACT = {
  tel: "tel:+66800000000",
  whatsapp: "https://wa.me/66800000000",
  telegram: "https://t.me/lotusclinic",
  line: "https://line.me/ti/p/~lotusclinic",
};

/* ─── page ──────────────────────────────────────────────────────── */
export default function ClinicPage() {
  return (
    <div className="min-h-screen" style={{ background: G.bg, color: G.dark }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${G.bg}; }
        ::-webkit-scrollbar-thumb { background: ${G.gold}; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%,100%{opacity:.7}50%{opacity:1} }
        .fade-up { animation: fadeUp .7s ease forwards; }
      `}</style>
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <Packages />
      <WhyUs />
      <ClinicGallery />
      <Contact />
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
      style={{ background: scrolled ? "rgba(250,250,248,.97)" : "transparent", borderBottom: scrolled ? `1px solid ${G.border}` : "none", backdropFilter: scrolled ? "blur(10px)" : "none" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {[["Services", "services"], ["Pricing", "pricing"], ["Contact", "contact"]].map(([l, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.2em] transition-colors hover:opacity-100"
              style={{ color: G.muted }}>
              {l}
            </button>
          ))}
        </div>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
          className="text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{ background: G.green, color: "#fff" }}>
          Book consultation
        </a>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex flex-col leading-none">
      <span className="font-russo text-xl tracking-wider uppercase" style={{ color: G.dark }}>Lotus</span>
      <span className="text-[9px] tracking-[0.45em] uppercase" style={{ color: G.gold }}>Clinic · Pattaya</span>
    </div>
  );
}

/* ─── hero ──────────────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{ background: G.dark }}>
      {/* background photo */}
      <img src="https://images.pexels.com/photos/4974567/pexels-photo-4974567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="Clinic interior" className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.18) saturate(0.6)" }} />
      {/* texture overlay */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `radial-gradient(ellipse 70% 60% at 50% 40%, ${G.greenMid}55 0%, transparent 70%)`,
      }} />
      {/* decorative arc */}
      <div className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: `linear-gradient(to top, ${G.bg}, transparent)` }} />

      <div className={`relative z-10 px-6 max-w-4xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12" style={{ background: G.gold }} />
          <p className="text-xs tracking-[0.55em] uppercase" style={{ color: G.goldLight }}>Pattaya · Thailand</p>
          <div className="h-px w-12" style={{ background: G.gold }} />
        </div>

        <h1 className="font-russo text-white leading-tight mb-4" style={{ fontSize: "clamp(3rem,10vw,7.5rem)" }}>
          Feel better.<br />
          <span style={{ color: G.goldLight }}>Look radiant.</span>
        </h1>

        <p className="text-lg mb-3 max-w-xl mx-auto leading-relaxed" style={{ color: "#d1d5db" }}>
          Premium aesthetic & wellness clinic. Licensed doctors, hospital-grade equipment, results you'll see and feel.
        </p>
        <p className="text-xs tracking-[0.3em] uppercase mb-12" style={{ color: G.sage }}>
          Skin · Anti-aging · IV Therapy · Health Checkups
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold px-10 py-4 text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
            style={{ background: G.gold, color: G.dark }}>
            Book a consultation
          </button>
          <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="border font-bold px-10 py-4 text-sm tracking-widest uppercase transition-all hover:border-white/50"
            style={{ borderColor: "rgba(255,255,255,.2)", color: "#d1d5db" }}>
            Our services
          </button>
        </div>
      </div>

      {/* scroll line */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-14 animate-pulse mx-auto" style={{ background: `linear-gradient(to bottom, ${G.gold}60, transparent)` }} />
      </div>
    </section>
  );
}

/* ─── trust bar ─────────────────────────────────────────────────── */
function Trust() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="border-b" style={{ borderColor: G.border }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center">
        {TRUST.map((t, i) => (
          <div key={t.label}
            className={`py-8 border-r last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ borderColor: G.border, transitionDelay: `${i * 80}ms` }}>
            <p className="font-russo text-2xl md:text-3xl" style={{ color: G.green }}>{t.n}</p>
            <p className="text-xs uppercase tracking-widest mt-1" style={{ color: G.muted }}>{t.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── services ──────────────────────────────────────────────────── */
function Services() {
  const { ref, inView } = useInView();
  return (
    <section id="services" className="py-28 md:py-36 px-6" style={{ background: G.bg }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="What we treat" title="Our specialties" />
        <div ref={ref} className={`mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ background: G.border }}>
          {SERVICES.map((s, i) => (
            <div key={s.title}
              className={`p-8 group cursor-default transition-all duration-300 ${inView ? "opacity-100" : "opacity-0"}`}
              style={{ background: G.bg, transitionDelay: `${i * 60}ms` }}
              onMouseEnter={e => (e.currentTarget.style.background = G.green)}
              onMouseLeave={e => (e.currentTarget.style.background = G.bg)}>
              <ServiceInner s={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceInner({ s }: { s: typeof SERVICES[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span className="text-2xl block mb-5 transition-colors" style={{ color: hovered ? G.goldLight : G.gold }}>{s.icon}</span>
      <h3 className="font-russo text-lg mb-3 transition-colors" style={{ color: hovered ? "#fff" : G.dark }}>{s.title}</h3>
      <p className="text-sm leading-relaxed transition-colors" style={{ color: hovered ? "#d1d5db" : G.muted }}>{s.desc}</p>
    </div>
  );
}

/* ─── packages ──────────────────────────────────────────────────── */
function Packages() {
  const { ref, inView } = useInView();
  return (
    <section id="pricing" className="py-28 md:py-36 px-6" style={{ background: "#f3f4f1" }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Transparent pricing" title="Choose your program" />
        <div ref={ref} className={`mt-16 grid md:grid-cols-3 gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {PACKAGES.map((p, i) => (
            <article key={p.name}
              className={`relative flex flex-col p-8 border transition-all duration-300 hover:-translate-y-1 ${p.featured ? "" : ""}`}
              style={{
                background: p.featured ? G.dark : G.bg,
                borderColor: p.featured ? G.gold : G.border,
                boxShadow: p.featured ? `0 0 40px ${G.gold}20` : "none",
                transitionDelay: `${i * 80}ms`,
              }}>
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black px-5 py-1 tracking-widest uppercase whitespace-nowrap"
                  style={{ background: G.gold, color: G.dark }}>Most popular</span>
              )}
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: p.featured ? G.sage : G.muted }}>{p.name}</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="font-russo text-5xl" style={{ color: p.featured ? "#fff" : G.dark }}>{p.price}</span>
                <span className="text-sm mb-1.5" style={{ color: p.featured ? G.sage : G.muted }}>{p.sub}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm"
                    style={{ color: p.featured ? "#d1d5db" : G.muted }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: G.gold }}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                className="text-center py-3.5 text-xs font-black tracking-widest uppercase transition-all"
                style={p.featured
                  ? { background: G.gold, color: G.dark }
                  : { border: `1px solid ${G.border}`, color: G.dark }}>
                {p.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="text-center mt-8 text-sm" style={{ color: G.muted }}>
          All treatments include a medical consultation. Prices are indicative — exact quote after assessment.
        </p>
      </div>
    </section>
  );
}

/* ─── why us ────────────────────────────────────────────────────── */
function WhyUs() {
  const { ref, inView } = useInView();
  const points = [
    { icon: "🏥", title: "Licensed & certified", body: "All doctors are registered with the Thai Medical Council. Clinic certified by the Ministry of Public Health." },
    { icon: "🌍", title: "Multilingual staff", body: "We speak English, Russian and Thai fluently. No translation barriers, no misunderstandings." },
    { icon: "⚡", title: "Same-day appointments", body: "Walk in or book online. We accommodate urgent consultations and work 7 days a week." },
    { icon: "🔒", title: "Strict confidentiality", body: "Your health data is private. We never share records. Full PDPA compliance for expats and tourists." },
  ];
  return (
    <section className="py-28 md:py-36 px-6" style={{ background: G.bg }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Why choose us" title="The Lotus difference" />
        <div ref={ref} className={`mt-16 grid sm:grid-cols-2 gap-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {points.map((p, i) => (
            <div key={p.title}
              className={`flex gap-5 transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="text-2xl mt-1 flex-shrink-0">{p.icon}</span>
              <div>
                <h4 className="font-russo text-lg mb-2" style={{ color: G.dark }}>{p.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: G.muted }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── gallery ───────────────────────────────────────────────────── */
function ClinicGallery() {
  const { ref, inView } = useInView(0.05);
  const imgs = [
    { src: "https://images.pexels.com/photos/7446659/pexels-photo-7446659.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Rejuvenating facial treatment", span: "col-span-2 row-span-2" },
    { src: "https://images.pexels.com/photos/4586726/pexels-photo-4586726.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Laser skin treatment", span: "" },
    { src: "https://images.pexels.com/photos/4586708/pexels-photo-4586708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Cosmetic injection", span: "" },
    { src: "https://images.pexels.com/photos/4586728/pexels-photo-4586728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Laser facial with protection", span: "" },
    { src: "https://images.pexels.com/photos/7446681/pexels-photo-7446681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Lip enhancement", span: "" },
    { src: "https://images.pexels.com/photos/7446666/pexels-photo-7446666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Soothing skincare session", span: "col-span-2" },
  ];
  return (
    <section className="py-28 md:py-36 px-6" style={{ background: "#f3f4f1" }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Our clinic" title="See the results" />
        <div ref={ref}
          className={`mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          {imgs.map((img, i) => (
            <div key={img.src}
              className={`relative overflow-hidden group ${img.span} transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{
                borderRadius: i === 0 ? "2rem" : i % 2 === 0 ? "1.25rem" : "0.75rem 2rem 0.75rem 2rem",
                transitionDelay: `${i * 55}ms`,
              }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to top, ${G.dark}cc, transparent)` }} />
              <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                style={{ color: "#fff", fontFamily: "var(--font-sans)" }}>{img.alt}</p>
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
  const channels = [
    { href: CONTACT.whatsapp, label: "WhatsApp", sub: "+66 80 000 0000", bg: "#25D366", icon: "💬" },
    { href: CONTACT.telegram, label: "Telegram", sub: "@lotusclinic", bg: "#229ED9", icon: "✈" },
    { href: CONTACT.line, label: "Line", sub: "@lotusclinic", bg: "#06C755", icon: "💚" },
    { href: CONTACT.tel, label: "Call us", sub: "+66 80 000 0000", bg: G.green, icon: "📞" },
  ];
  return (
    <section id="contact" className="py-28 md:py-36 px-6" style={{ background: G.dark }}>
      <div ref={ref} className={`max-w-2xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8" style={{ background: G.gold }} />
          <p className="text-xs tracking-[0.45em] uppercase" style={{ color: G.goldLight }}>Book a consultation</p>
          <div className="h-px w-8" style={{ background: G.gold }} />
        </div>
        <h2 className="font-russo text-4xl md:text-5xl text-white mb-4">Ready to start?</h2>
        <p className="mb-12 leading-relaxed" style={{ color: "#9ca3af" }}>
          Message us on any platform. We reply within the hour and can schedule your consultation for the same day.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {channels.map((c) => (
            <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 py-5 px-4 font-bold transition-opacity hover:opacity-90 active:scale-95"
              style={{ background: c.bg, color: "#fff" }}>
              <span className="text-2xl">{c.icon}</span>
              <span className="text-sm tracking-wide">{c.label}</span>
              <span className="text-xs opacity-70">{c.sub}</span>
            </a>
          ))}
        </div>
        <div className="mt-10 p-6 border" style={{ borderColor: `${G.gold}30` }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: G.sage }}>Location & hours</p>
          <p className="font-russo text-lg text-white">Lotus Clinic</p>
          <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>Pattaya, Chonburi · Thailand</p>
          <p className="text-sm mt-1" style={{ color: G.goldLight }}>Mon – Sun · 09:00 – 20:00</p>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 border-t" style={{ background: G.dark, borderColor: "#1f2937" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p className="font-russo text-lg tracking-wider text-white uppercase">Lotus Clinic</p>
          <p className="text-xs tracking-[0.3em] uppercase mt-0.5" style={{ color: G.gold }}>Pattaya · Thailand</p>
        </div>
        <p className="text-xs" style={{ color: "#4b5563" }}>© 2026 Lotus Clinic · All rights reserved</p>
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
    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 font-bold px-6 py-3 text-sm tracking-wide flex items-center gap-2 shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: G.gold, color: G.dark }}>
      💬 Book now
    </a>
  );
}

/* ─── shared ────────────────────────────────────────────────────── */
function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-8" style={{ background: G.gold }} />
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: G.gold }}>{label}</p>
        <div className="h-px w-8" style={{ background: G.gold }} />
      </div>
      <h2 className="font-russo text-4xl md:text-5xl" style={{ color: G.dark }}>{title}</h2>
    </div>
  );
}
