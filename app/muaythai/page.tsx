"use client";
import { useEffect, useRef, useState } from "react";

/* ─── helpers ─────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

/* ─── data ─────────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    title: "Beginner",
    tag: "ALL LEVELS WELCOME",
    price: "4 500",
    unit: "฿ / month",
    desc: "Start your Muay Thai journey. Morning & evening sessions, technique drills, pad work and conditioning.",
    features: ["10 sessions / month", "Group classes", "Gloves & wraps included", "Nutrition guidance"],
    cta: "Start training",
    highlight: false,
  },
  {
    title: "Fighter",
    tag: "MOST POPULAR",
    price: "9 900",
    unit: "฿ / month",
    desc: "Train like a pro. Unlimited sessions, private pad work, sparring and fight preparation with our Kru.",
    features: ["Unlimited sessions", "Private pad work 2×/week", "Sparring included", "Fight prep & strategy"],
    cta: "Train like a fighter",
    highlight: true,
  },
  {
    title: "Retreat",
    tag: "1 OR 2 WEEKS",
    price: "15 000",
    unit: "฿ / 2 weeks",
    desc: "Full immersion. Training twice a day, accommodation, meals, Thai massage and cultural experiences.",
    features: ["2× daily training", "Accommodation included", "Meals & smoothies", "Thai massage 3×/week"],
    cta: "Book a retreat",
    highlight: false,
  },
];

const DTV_POINTS = [
  { icon: "🇹🇭", title: "5-Year Visa", body: "The Thailand DTV grants up to 5 years of validity — the longest long-stay option in Southeast Asia." },
  { icon: "📅", title: "180 Days / Entry", body: "Each entry allows a 180-day stay with multiple re-entries, giving full flexibility to travel the region." },
  { icon: "💼", title: "Work Remotely — Legally", body: "Work for any employer or clients outside Thailand with zero legal restrictions." },
  { icon: "📋", title: "We Handle the Paperwork", body: "Our visa team prepares, verifies and submits your full DTV application. We've done 200+ successful cases." },
  { icon: "🏠", title: "Camp Address", body: "Use our official address as your Thailand base for your application — accepted by Thai Immigration." },
  { icon: "⚡", title: "Fast Processing", body: "Most applications approved within 30 business days. We monitor your case and keep you updated." },
];

const SCHEDULE = [
  { time: "06:30", label: "Morning run" },
  { time: "07:00", label: "Pad work & technique" },
  { time: "08:30", label: "Conditioning" },
  { time: "09:30", label: "Breakfast break" },
  { time: "16:00", label: "Evening session" },
  { time: "17:30", label: "Clinch & sparring" },
  { time: "19:00", label: "Cool down & stretch" },
];

const CONTACT = {
  telegram: "https://t.me/tigermuaythai",
  whatsapp: "https://wa.me/66800000000",
  line: "https://line.me/ti/p/~tigermuaythai",
  phone: "tel:+66800000000",
};

/* ─── page ─────────────────────────────────────────────────────── */
export default function MuayThaiPage() {
  return (
    <div className="bg-[#080808] min-h-screen text-white overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #c9a84c; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity:.6; } 50% { opacity:1; } }
        @keyframes spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        .gold { color: #c9a84c; }
        .gold-border { border-color: #c9a84c; }
        .gold-bg { background: #c9a84c; }
        .gold-glow { box-shadow: 0 0 30px rgba(201,168,76,.25); }
        .fade-up { animation: fadeUp .8s ease forwards; }
        .shimmer { animation: shimmer 2.5s ease-in-out infinite; }
      `}</style>

      <Navbar />
      <Hero />
      <Stats />
      <Programs />
      <DTV />
      <Schedule />
      <Gallery />
      <Contact />
      <Footer />
      <StickyContact />
    </div>
  );
}

/* ─── navbar ───────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Training", id: "programs" },
    { label: "DTV Visa", id: "dtv" },
    { label: "Schedule", id: "schedule" },
    { label: "Contact", id: "contact" },
  ];
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-md border-b border-zinc-900" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* logo */}
        <div className="flex flex-col leading-none">
          <span className="font-russo text-xl tracking-widest text-white uppercase">Tiger</span>
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#c9a84c" }}>Muay Thai · Pattaya</span>
        </div>
        {/* links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l.id} onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
              {l.label}
            </button>
          ))}
        </div>
        {/* cta */}
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
          className="gold-bg text-black text-xs font-black px-5 py-2.5 tracking-widest uppercase hover:opacity-90 transition-opacity">
          Book trial class
        </a>
      </div>
    </nav>
  );
}

/* ─── hero ─────────────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* BG gradient */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,.07) 0%, transparent 70%), #080808",
      }} />
      {/* decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-zinc-900 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-zinc-900/50 pointer-events-none" />
      {/* horizontal rule accent */}
      <div className="absolute left-0 right-0" style={{ top: "50%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,.15), transparent)" }} />

      <div className={`relative z-10 px-6 max-w-4xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-xs tracking-[0.6em] uppercase mb-6 shimmer" style={{ color: "#c9a84c" }}>Pattaya · Thailand · Est. 2016</p>

        {/* big headline */}
        <h1 className="font-russo text-white leading-none mb-2" style={{ fontSize: "clamp(3.5rem,12vw,10rem)" }}>
          MUAY THAI
        </h1>
        <h2 className="font-russo leading-none mb-8" style={{ fontSize: "clamp(1.8rem,6vw,4.5rem)", color: "#c9a84c" }}>
          TRAINING CAMP
        </h2>

        <p className="text-zinc-400 text-lg mb-4 max-w-xl mx-auto leading-relaxed">
          Train with world-class <em className="not-italic gold">Kru</em> in Thailand's most vibrant city.<br />
          Beginners welcome. Fighters made here.
        </p>
        <p className="text-xs tracking-widest uppercase text-zinc-600 mb-12">
          Muay Thai · Kickboxing · Fitness · <span style={{ color: "#c9a84c" }}>DTV Visa Services</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
            className="gold-bg text-black font-black px-10 py-4 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity">
            View programs
          </button>
          <button onClick={() => document.getElementById("dtv")?.scrollIntoView({ behavior: "smooth" })}
            className="border text-sm font-bold px-10 py-4 tracking-widest uppercase text-zinc-300 hover:text-white transition-all"
            style={{ borderColor: "rgba(201,168,76,.4)" }}>
            DTV Visa info
          </button>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-14 animate-pulse" style={{ background: "linear-gradient(to bottom, #c9a84c60, transparent)" }} />
      </div>
    </section>
  );
}

/* ─── stats ────────────────────────────────────────────────────── */
function Stats() {
  const { ref, inView } = useInView();
  const items = [
    { v: "8+", l: "Years in Pattaya" },
    { v: "200+", l: "DTV visas processed" },
    { v: "3×", l: "Daily sessions" },
    { v: "All", l: "Levels welcome" },
  ];
  return (
    <section ref={ref} className="border-y border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center">
        {items.map((s, i) => (
          <div key={s.l} className={`py-8 border-r border-zinc-900 last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 80}ms` }}>
            <p className="font-russo text-3xl gold">{s.v}</p>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── programs ─────────────────────────────────────────────────── */
function Programs() {
  const { ref, inView } = useInView();
  return (
    <section id="programs" className="py-28 md:py-36 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Training programs" title="Find your level" />
        <div ref={ref} className={`mt-16 grid md:grid-cols-3 gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {PROGRAMS.map((p, i) => (
            <article key={p.title}
              className={`relative flex flex-col p-8 border transition-all duration-300 hover:translate-y-[-4px] ${p.highlight ? "border-[#c9a84c] gold-glow bg-gradient-to-b from-[#c9a84c08] to-transparent" : "border-zinc-800 hover:border-zinc-600"}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 gold-bg text-black text-xs font-black px-5 py-1 tracking-widest uppercase whitespace-nowrap">
                  {p.tag}
                </span>
              )}
              {!p.highlight && (
                <span className="text-xs uppercase tracking-widest text-zinc-600 mb-2">{p.tag}</span>
              )}
              <h3 className={`font-russo text-3xl mb-1 ${p.highlight ? "gold" : "text-white"}`}>{p.title}</h3>
              <div className="flex items-end gap-1 mb-6 mt-3">
                <span className="font-russo text-4xl text-white">{p.price}</span>
                <span className="text-zinc-500 text-sm mb-1">{p.unit}</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">{p.desc}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <span style={{ color: "#c9a84c" }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                className={`text-center py-3.5 text-xs font-black tracking-widest uppercase transition-all ${p.highlight ? "gold-bg text-black hover:opacity-90" : "border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white"}`}>
                {p.cta}
              </a>
            </article>
          ))}
        </div>
        {/* free trial cta */}
        <div className="mt-10 text-center">
          <p className="text-zinc-600 text-sm">Not sure where to start?</p>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
            className="inline-block mt-2 text-sm underline underline-offset-4 transition-colors hover:text-white" style={{ color: "#c9a84c" }}>
            Book a free trial class →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── DTV visa ─────────────────────────────────────────────────── */
function DTV() {
  const { ref, inView } = useInView();
  return (
    <section id="dtv" className="py-28 md:py-36 px-6 bg-zinc-950 border-t border-b border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Digital Nomad Visa" title={<>Stay in Thailand<br /><span style={{ color: "#c9a84c" }}>legally & long-term</span></>} />

        <div className="mt-8 max-w-2xl mx-auto text-center">
          <p className="text-zinc-400 leading-relaxed">
            The Thai <strong className="text-white">DTV — Digital Nomad Visa</strong> lets you live and work remotely in Thailand for up to 5 years.
            Our team has processed over 200 successful applications. Train in the morning. Work remotely. Live your best life.
          </p>
        </div>

        <div ref={ref} className={`mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {DTV_POINTS.map((d, i) => (
            <div key={d.title}
              className="border border-zinc-800 hover:border-zinc-700 p-6 transition-all duration-300 hover:bg-zinc-900/50 group"
              style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="text-2xl block mb-3">{d.icon}</span>
              <h4 className="font-russo text-lg text-white mb-2 group-hover:text-[#c9a84c] transition-colors">{d.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>

        {/* DTV pricing */}
        <div className="mt-12 border border-zinc-800 p-8 max-w-2xl mx-auto text-center" style={{ borderColor: "rgba(201,168,76,.25)" }}>
          <p className="text-xs uppercase tracking-widest mb-3 text-zinc-500">DTV Visa Package</p>
          <p className="font-russo text-5xl text-white mb-1">25 000 <span className="text-2xl text-zinc-500">฿</span></p>
          <p className="text-zinc-500 text-sm mb-6">Full-service — document prep, submission & follow-up</p>
          <ul className="space-y-2 mb-8 text-left max-w-xs mx-auto">
            {["Document checklist & preparation", "Application review & submission", "Thai immigration liaison", "Status updates throughout", "1 free revision if required"].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                <span style={{ color: "#c9a84c" }}>✓</span>{f}
              </li>
            ))}
          </ul>
          <a href={CONTACT.telegram} target="_blank" rel="noopener noreferrer"
            className="inline-block gold-bg text-black font-black px-10 py-4 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity">
            Ask about DTV →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── schedule ─────────────────────────────────────────────────── */
function Schedule() {
  const { ref, inView } = useInView();
  return (
    <section id="schedule" className="py-28 md:py-36 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Daily schedule" title="A day at the camp" />
        <div ref={ref} className={`mt-16 max-w-xl mx-auto space-y-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {SCHEDULE.map((s, i) => (
            <div key={s.time} className={`flex items-center gap-6 py-4 border-b border-zinc-900 transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="font-russo text-sm w-14 text-right flex-shrink-0" style={{ color: "#c9a84c" }}>{s.time}</span>
              <div className="w-px h-6 flex-shrink-0" style={{ background: "#c9a84c40" }} />
              <span className="text-zinc-300 text-sm">{s.label}</span>
            </div>
          ))}
          <p className="text-zinc-600 text-xs text-center pt-4 tracking-widest uppercase">Mon – Sat · Sunday rest & recovery</p>
        </div>
      </div>
    </section>
  );
}

/* ─── gallery ──────────────────────────────────────────────────── */
function Gallery() {
  const { ref, inView } = useInView(0.05);
  const panels = [
    { label: "Morning training", bg: "from-amber-950/50 to-black", icon: "🥊" },
    { label: "Pad work", bg: "from-red-950/50 to-black", icon: "💥" },
    { label: "Pool & chill", bg: "from-cyan-950/50 to-black", icon: "🏊" },
    { label: "Lounge & co-work", bg: "from-zinc-800/50 to-black", icon: "💻" },
    { label: "Team sparring", bg: "from-orange-950/50 to-black", icon: "🥋" },
    { label: "Fight night", bg: "from-purple-950/50 to-black", icon: "🏆" },
  ];
  return (
    <section className="py-28 md:py-36 px-6 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="The camp" title="Your new home" />
        <div ref={ref} className={`mt-16 grid grid-cols-2 md:grid-cols-3 gap-2 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          {panels.map((p, i) => (
            <div key={p.label}
              className={`relative aspect-square flex items-end p-6 overflow-hidden group bg-gradient-to-br ${p.bg} border border-zinc-900 transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 select-none">
                {p.icon}
              </div>
              <div>
                <span className="text-2xl">{p.icon}</span>
                <p className="text-white font-russo text-sm mt-1">{p.label}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-zinc-600 text-xs mt-6 tracking-widest uppercase">
          Add your photos here — replace placeholder panels
        </p>
      </div>
    </section>
  );
}

/* ─── contact ──────────────────────────────────────────────────── */
function Contact() {
  const { ref, inView } = useInView();
  const buttons = [
    { href: CONTACT.telegram, label: "Telegram", sub: "@tigermuaythai", bg: "bg-[#229ED9] hover:bg-[#1a8bc4]", icon: "✈" },
    { href: CONTACT.whatsapp, label: "WhatsApp", sub: "+66 80 000 0000", bg: "bg-[#25D366] hover:bg-[#1db954]", icon: "💬" },
    { href: CONTACT.line, label: "Line", sub: "@tigermuaythai", bg: "bg-[#06C755] hover:bg-[#05a847]", icon: "💚" },
    { href: CONTACT.phone, label: "Call us", sub: "+66 80 000 0000", bg: "bg-zinc-800 hover:bg-zinc-700", icon: "📞" },
  ];
  return (
    <section id="contact" className="py-28 md:py-36 px-6 bg-[#080808]">
      <div ref={ref} className={`max-w-2xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <SectionLabel label="Get in touch" title="Come train with us" />
        <p className="text-zinc-400 mt-6 mb-12 leading-relaxed">
          Book a trial class, ask about DTV visa services, or just come by the camp.<br />
          We reply within the hour.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {buttons.map((b) => (
            <a key={b.href} href={b.href} target="_blank" rel="noopener noreferrer"
              className={`${b.bg} text-white font-bold py-5 px-4 flex flex-col items-center gap-1 transition-all duration-200 active:scale-95`}>
              <span className="text-xl">{b.icon}</span>
              <span className="text-sm tracking-wide">{b.label}</span>
              <span className="text-xs opacity-70">{b.sub}</span>
            </a>
          ))}
        </div>
        <div className="mt-10 border border-zinc-900 p-6">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Location</p>
          <p className="text-white font-russo text-lg">Tiger Muay Thai Camp</p>
          <p className="text-zinc-400 text-sm mt-1">Pattaya, Chonburi · Thailand</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-3 text-sm transition-colors hover:text-white" style={{ color: "#c9a84c" }}>
            View on Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ───────────────────────────────────────────────────── */
function Footer() {
  const links = ["Training", "DTV Visa", "Schedule", "Contact"];
  const ids = ["programs", "dtv", "schedule", "contact"];
  return (
    <footer className="border-t border-zinc-900 py-10 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-russo text-lg tracking-widest text-white uppercase">Tiger Muay Thai</p>
          <p className="text-xs tracking-[0.3em] uppercase mt-0.5" style={{ color: "#c9a84c" }}>Pattaya · Thailand</p>
        </div>
        <div className="flex gap-6">
          {links.map((l, i) => (
            <button key={l} onClick={() => document.getElementById(ids[i])?.scrollIntoView({ behavior: "smooth" })}
              className="text-zinc-600 hover:text-zinc-400 text-xs tracking-widest uppercase transition-colors">
              {l}
            </button>
          ))}
        </div>
        <p className="text-zinc-700 text-xs">© 2026 Tiger Muay Thai Camp · Pattaya</p>
      </div>
    </footer>
  );
}

/* ─── sticky cta ───────────────────────────────────────────────── */
function StickyContact() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1db954] text-white font-bold px-6 py-3 text-sm tracking-wide flex items-center gap-2 shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      💬 Book a class
    </a>
  );
}

/* ─── shared ────────────────────────────────────────────────────── */
function SectionLabel({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#c9a84c" }}>{label}</p>
      <h2 className="font-russo text-4xl md:text-5xl text-white leading-tight">{title}</h2>
    </div>
  );
}
