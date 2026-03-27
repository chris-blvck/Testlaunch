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
const G = {
  bg:       "#fafaf8",
  dark:     "#0f1f18",
  green:    "#1a3a2a",
  greenMid: "#2a5a40",
  gold:     "#b8923a",
  goldLight:"#d4a853",
  sage:     "#7a9e8a",
  muted:    "#6b7280",
  border:   "#e5e7eb",
};

/* ─── photos ────────────────────────────────────────────────────── */
const I = {
  hero:    "https://images.pexels.com/photos/4974567/pexels-photo-4974567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920",
  skin:    "https://images.pexels.com/photos/7446659/pexels-photo-7446659.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  laser:   "https://images.pexels.com/photos/4586726/pexels-photo-4586726.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  inject:  "https://images.pexels.com/photos/4586708/pexels-photo-4586708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  facial:  "https://images.pexels.com/photos/4586728/pexels-photo-4586728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  lips:    "https://images.pexels.com/photos/7446681/pexels-photo-7446681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  serene:  "https://images.pexels.com/photos/7446666/pexels-photo-7446666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

/* ─── data ──────────────────────────────────────────────────────── */
const TREATMENTS = [
  {
    num: "01", title: "Skin Brightening",
    sub: "Glutathione IV + topical",
    desc: "Glutathione IV drips combined with topical brightening serums. Visibly radiant, even-toned skin in as few as 3 sessions. The most popular treatment for expats and tourists.",
    detail: ["Glutathione IV 1 200 mg", "Vitamin C push", "Kojic acid topical", "Results visible session 1"],
    img: I.skin,
    tag: "MOST POPULAR",
  },
  {
    num: "02", title: "Anti-Aging",
    sub: "Botox · Fillers · Collagen",
    desc: "Botox, hyaluronic fillers and collagen boosters administered by licensed doctors. Natural, refreshed results — never frozen. Appointments same day.",
    detail: ["Botox from 3 500 ฿", "Filler from 6 500 ฿", "Collagen IV boost", "Natural results guaranteed"],
    img: I.lips,
    tag: "DOCTOR ONLY",
  },
  {
    num: "03", title: "Laser Treatments",
    sub: "Nd:YAG · Fractional CO₂",
    desc: "Hospital-grade laser technology for skin resurfacing, pigmentation removal, acne scars and rejuvenation. Zero downtime options available.",
    detail: ["Nd:YAG · Fractional CO₂", "Pigmentation removal", "Acne scar treatment", "Zero-downtime options"],
    img: I.laser,
    tag: "MEDICAL GRADE",
  },
  {
    num: "04", title: "IV Therapy",
    sub: "Immunity · Beauty · Energy",
    desc: "Custom vitamin drip blends for immunity, energy, hangover recovery, beauty and detox. Walk in and feel transformed in 45 minutes.",
    detail: ["Custom blend per need", "Hangover recovery IV", "Beauty & glow drip", "45 min session"],
    img: I.inject,
    tag: "WALK-IN",
  },
];

const PACKAGES = [
  {
    name: "Glow Starter",
    price: "3 900",
    sub: "฿ / session",
    items: ["Full skin consultation", "Glutathione IV drip", "Vitamin C boost", "Follow-up call"],
    featured: false,
  },
  {
    name: "Radiance Program",
    price: "18 500",
    sub: "฿ / 6 sessions",
    items: ["6× Skin brightening IVs", "2× Laser sessions", "Anti-aging serum kit", "Priority appointments", "1 free top-up session"],
    featured: true,
  },
  {
    name: "Full Health Check",
    price: "7 500",
    sub: "฿ / package",
    items: ["Complete blood panel", "STI & hepatitis screen", "Thyroid & hormones", "Doctor consultation", "Digital results 24h"],
    featured: false,
  },
];

const TRUST = [
  { n: "12+",       label: "Years of practice" },
  { n: "8 000+",    label: "Patients treated" },
  { n: "Licensed",  label: "Ministry of Health" },
  { n: "EN · RU · TH", label: "Languages spoken" },
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
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .clinic-marquee { animation: marquee 28s linear infinite; }
      `}</style>
      <Navbar />
      <Hero />
      <Ticker />
      <Treatments />
      <Manifesto />
      <Packages />
      <Gallery />
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
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{ background: scrolled ? "rgba(250,250,248,.97)" : "transparent", borderBottom: scrolled ? `1px solid ${G.border}` : "none", backdropFilter: scrolled ? "blur(10px)" : "none" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {[["Treatments", "treatments"], ["Pricing", "pricing"], ["Contact", "contact"]].map(([l, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.2em] transition-colors hover:opacity-100"
              style={{ color: G.muted }}>{l}</button>
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
    <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: G.dark }}>
      {/* full-bleed photo */}
      <img src={I.hero} alt="Clinic interior"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.35) saturate(0.7)" }} />

      {/* gradient: left text area, right transparent */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(15,31,24,.93) 35%, rgba(15,31,24,.35) 75%, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: `linear-gradient(to top, ${G.bg}, transparent)` }} />

      <div className={`relative z-10 px-8 md:px-16 pb-24 md:pb-32 max-w-5xl w-full transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px" style={{ background: G.gold }} />
          <p className="text-xs tracking-[0.5em] uppercase" style={{ color: G.goldLight }}>Pattaya · Thailand</p>
        </div>

        <h1 className="font-russo leading-none mb-2" style={{ fontSize: "clamp(4rem,12vw,10rem)", color: "#fff" }}>
          FEEL
        </h1>
        <h1 className="font-russo leading-none mb-2"
          style={{ fontSize: "clamp(4rem,12vw,10rem)", color: "transparent", WebkitTextStroke: `2px ${G.goldLight}` }}>
          RADIANT.
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-3 max-w-lg mt-10" style={{ color: "#d1d5db" }}>
          Premium aesthetic & wellness clinic. Licensed doctors, hospital-grade equipment, results you'll see and feel.
        </p>
        <p className="text-xs tracking-[0.3em] uppercase mb-12" style={{ color: G.sage }}>
          Skin · Anti-aging · IV Therapy · Health Checkups
        </p>

        <div className="flex flex-wrap gap-4">
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold px-10 py-4 text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
            style={{ background: G.gold, color: G.dark }}>
            Book a consultation
          </button>
          <button onClick={() => document.getElementById("treatments")?.scrollIntoView({ behavior: "smooth" })}
            className="border font-bold px-10 py-4 text-sm tracking-widest uppercase transition-all hover:border-white/40"
            style={{ borderColor: "rgba(255,255,255,.2)", color: "#d1d5db" }}>
            Our treatments
          </button>
        </div>
      </div>

      {/* trust stats — bottom right */}
      <div className={`absolute bottom-8 right-8 hidden md:flex gap-10 transition-all duration-1000 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
        {TRUST.map((t) => (
          <div key={t.label} className="text-right">
            <p className="font-russo text-xl" style={{ color: G.goldLight }}>{t.n}</p>
            <p className="text-[9px] tracking-widest uppercase" style={{ color: G.sage }}>{t.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── ticker ────────────────────────────────────────────────────── */
function Ticker() {
  const items = ["Skin Brightening", "Anti-Aging", "Laser Treatments", "IV Therapy", "Health Checkups", "Body Sculpting", "Licensed Doctors", "Pattaya Clinic", "Same-Day Appointments", "EN · RU · TH"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y py-4" style={{ borderColor: G.border, background: G.dark }}>
      <div className="flex whitespace-nowrap clinic-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span className="font-russo text-sm tracking-widest uppercase" style={{ color: G.sage }}>{item}</span>
            <span style={{ color: G.gold, fontSize: "6px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── treatments ────────────────────────────────────────────────── */
function Treatments() {
  return (
    <section id="treatments" className="py-28 md:py-36" style={{ background: G.bg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16 md:mb-20">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: G.gold }}>Our specialties</p>
          <h2 className="font-russo leading-none" style={{ fontSize: "clamp(3rem,9vw,7rem)", color: G.dark }}>
            TREATMENTS<br />
            <span style={{ color: "transparent", WebkitTextStroke: `2px ${G.greenMid}` }}>THAT WORK</span>
          </h2>
        </div>
        <div className="divide-y" style={{ borderColor: G.border }}>
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
      className={`grid md:grid-cols-[3fr_2fr] transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${flip ? "md:grid-cols-[2fr_3fr]" : ""}`}>
      {/* photo */}
      <div className={`relative overflow-hidden aspect-[16/9] md:aspect-auto md:min-h-[380px] ${flip ? "md:order-2" : ""}`}>
        <img src={t.img} alt={t.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(15,31,24,.6))" }} />
        <span className="absolute top-4 left-4 text-xs font-black px-3 py-1 tracking-widest uppercase"
          style={{ background: G.gold, color: G.dark }}>{t.tag}</span>
        {/* ghost number */}
        <span className="absolute bottom-4 right-4 font-russo leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(5rem,12vw,9rem)", color: "rgba(255,255,255,.06)" }}>
          {t.num}
        </span>
      </div>

      {/* text */}
      <div className={`flex flex-col justify-center px-10 py-14 md:py-16 ${flip ? "md:order-1" : ""}`}
        style={{ background: flip ? "#f3f4f1" : G.bg }}>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-russo text-5xl leading-none select-none" style={{ color: `${G.green}18` }}>{t.num}</span>
          <div className="w-px h-10" style={{ background: G.gold }} />
          <div>
            <p className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: G.gold }}>{t.sub}</p>
          </div>
        </div>
        <h3 className="font-russo text-3xl md:text-4xl mb-4" style={{ color: G.dark }}>{t.title}</h3>
        <p className="leading-relaxed mb-8 max-w-sm" style={{ color: G.muted }}>{t.desc}</p>
        <div className="space-y-2 mb-8">
          {t.detail.map((d) => (
            <div key={d} className="flex items-center gap-3 text-sm" style={{ color: G.muted }}>
              <span style={{ color: G.gold }}>✓</span>{d}
            </div>
          ))}
        </div>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
          className="self-start text-xs font-bold px-8 py-3 tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{ background: G.green, color: "#fff" }}>
          Book this treatment
        </a>
      </div>
    </div>
  );
}

/* ─── manifesto ─────────────────────────────────────────────────── */
function Manifesto() {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
      <img src={I.serene} alt="Clinic atmosphere"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.3) saturate(0.6)" }} />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(15,31,24,.85) 40%, rgba(15,31,24,.3))" }} />

      <div className={`relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6 text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-xs tracking-[0.7em] uppercase mb-6" style={{ color: G.goldLight }}>
          12 years · 8 000+ patients · Pattaya
        </p>
        <h2 className="font-russo leading-none mb-4"
          style={{ fontSize: "clamp(2.5rem,9vw,7.5rem)", color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,.75)" }}>
          WHERE MEDICINE
        </h2>
        <h2 className="font-russo leading-none mb-10"
          style={{ fontSize: "clamp(2rem,7vw,5.5rem)", color: "#fff" }}>
          MEETS BEAUTY
        </h2>
        <div className="w-16 h-px mx-auto" style={{ background: G.gold }} />
        <p className="mt-8 text-lg max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,.6)" }}>
          Licensed doctors. Hospital-grade equipment. The same standards as Bangkok — right here in Pattaya.
        </p>
      </div>
    </section>
  );
}

/* ─── packages ──────────────────────────────────────────────────── */
function Packages() {
  const { ref, inView } = useInView();
  return (
    <section id="pricing" className="py-28 md:py-36" style={{ background: "#f3f4f1" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: G.gold }}>Transparent pricing</p>
          <h2 className="font-russo leading-none" style={{ fontSize: "clamp(3rem,8vw,6rem)", color: G.dark }}>
            CHOOSE YOUR<br />
            <span style={{ color: "transparent", WebkitTextStroke: `2px ${G.green}` }}>PROGRAM</span>
          </h2>
        </div>
        <div ref={ref}
          className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {PACKAGES.map((p, i) => (
            <article key={p.name}
              className="relative flex flex-col p-8 border transition-all duration-300 hover:-translate-y-1"
              style={{
                background: p.featured ? G.dark : G.bg,
                borderColor: p.featured ? G.gold : G.border,
                boxShadow: p.featured ? `0 0 50px ${G.gold}18` : "none",
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
                Book now
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm" style={{ color: G.muted }}>
          All treatments include a medical consultation. Prices are indicative — exact quote after assessment.
        </p>
      </div>
    </section>
  );
}

/* ─── gallery ───────────────────────────────────────────────────── */
function Gallery() {
  const { ref, inView } = useInView(0.05);
  const imgs = [
    { src: I.skin,   alt: "Rejuvenating facial treatment", span: "col-span-2 row-span-2" },
    { src: I.laser,  alt: "Laser skin treatment",          span: "" },
    { src: I.inject, alt: "Cosmetic injection",            span: "" },
    { src: I.facial, alt: "Laser facial with protection",  span: "" },
    { src: I.lips,   alt: "Lip enhancement",               span: "" },
    { src: I.serene, alt: "Soothing skincare session",     span: "col-span-2" },
  ];
  return (
    <section className="py-28 md:py-36" style={{ background: G.bg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-14">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: G.gold }}>Our clinic</p>
          <h2 className="font-russo leading-none" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", color: G.dark }}>
            SEE THE<br />
            <span style={{ color: "transparent", WebkitTextStroke: `2px ${G.green}` }}>RESULTS</span>
          </h2>
        </div>
        <div ref={ref}
          className={`grid grid-cols-2 md:grid-cols-4 auto-rows-[170px] md:auto-rows-[210px] gap-3 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          {imgs.map((img, i) => (
            <div key={img.src}
              className={`relative overflow-hidden group ${img.span} transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{
                borderRadius: i === 0 ? "2rem" : i % 2 === 0 ? "1.25rem" : "0.75rem 2rem 0.75rem 2rem",
                transitionDelay: `${i * 55}ms`,
              }}>
              <img src={img.src} alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to top, ${G.dark}cc, transparent)` }} />
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
  const channels = [
    { href: CONTACT.whatsapp, label: "WhatsApp", sub: "+66 80 000 0000", bg: "#25D366" },
    { href: CONTACT.telegram, label: "Telegram", sub: "@lotusclinic",    bg: "#229ED9" },
    { href: CONTACT.line,     label: "Line",     sub: "@lotusclinic",    bg: "#06C755" },
    { href: CONTACT.tel,      label: "Call us",  sub: "+66 80 000 0000", bg: G.green },
  ];
  return (
    <section id="contact" className="py-28 md:py-36" style={{ background: G.dark }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div ref={ref}
          className={`grid md:grid-cols-[1fr_auto] gap-16 items-start transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: G.goldLight }}>Book a consultation</p>
            <h2 className="font-russo leading-none mb-6"
              style={{ fontSize: "clamp(3rem,9vw,7rem)", color: "#fff" }}>
              READY<br />
              <span style={{ color: "transparent", WebkitTextStroke: `2px ${G.gold}` }}>TO START?</span>
            </h2>
            <p className="text-lg leading-relaxed max-w-md" style={{ color: "#9ca3af" }}>
              Message us on any platform. We reply within the hour and can schedule your consultation for the same day.
            </p>
            <div className="mt-8 pt-8 border-t" style={{ borderColor: `${G.gold}25` }}>
              <p className="font-russo text-lg text-white">Lotus Clinic · Pattaya</p>
              <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>Chonburi · Thailand</p>
              <p className="text-sm mt-1" style={{ color: G.goldLight }}>Mon – Sun · 09:00 – 20:00</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 min-w-[280px]">
            {channels.map((c) => (
              <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 py-5 px-4 font-bold transition-opacity hover:opacity-90 active:scale-95"
                style={{ background: c.bg, color: "#fff" }}>
                <span className="text-sm tracking-wide">{c.label}</span>
                <span className="text-xs opacity-70">{c.sub}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 border-t" style={{ background: G.dark, borderColor: "#1f2937" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
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
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 font-bold px-6 py-3 text-sm tracking-wide flex items-center gap-2 shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: G.gold, color: G.dark }}>
      💬 Book now
    </a>
  );
}

/* ─── type extension for WebkitTextStroke ───────────────────────── */
declare module "react" {
  interface CSSProperties {
    WebkitTextStroke?: string;
  }
}
