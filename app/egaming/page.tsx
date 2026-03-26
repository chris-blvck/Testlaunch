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

const NAV_LINKS = ["Experience", "Gallery", "Pricing", "Location"];

const GALLERY = [
  { src: "/egaming/exterior-neon.png", alt: "Entrée 3328 — néons nuit", span: "col-span-2 row-span-2" },
  { src: "/egaming/gaming-floor.png", alt: "Salle de jeu principale", span: "" },
  { src: "/egaming/players-gaming.png", alt: "Joueurs en action", span: "" },
  { src: "/egaming/stations-row.png", alt: "Rangée de stations gaming", span: "" },
  { src: "/egaming/billiard-lounge.png", alt: "Lounge billard & PS5", span: "" },
  { src: "/egaming/cs2-screen.png", alt: "Counter-Strike 2", span: "col-span-2" },
  { src: "/egaming/lounge-bar.png", alt: "Espace bar & lounge", span: "" },
  { src: "/egaming/station-headset.png", alt: "Station gaming équipée", span: "" },
  { src: "/egaming/billiard-table.png", alt: "Table de billard", span: "" },
];

const EXPERIENCES = [
  {
    title: "PC Gaming",
    tag: "20+ STATIONS",
    desc: "Des postes custom signés ASUS ROG, Logitech G et HyperX. Chaises racing TTRacing, claviers mécaniques RGB, moniteurs haute fréquence. Tout pour jouer au niveau pro.",
    details: ["Claviers mécaniques RGB", "Chaises racing TTRacing", "Moniteurs haute fréquence", "ASUS ROG · Logitech G · HyperX"],
    icon: "⌨",
    img: "/egaming/station-closeup.png",
  },
  {
    title: "Console & PS5 Lounge",
    tag: "ESPACE LOUNGE",
    desc: "PlayStation 5 sur grand écran dans un espace lounge premium. Canapés cuir, mur diamant, son surround. L'expérience console ultime.",
    details: ["PlayStation 5", "Grand écran TV", "Canapés cuir premium", "1h = 60 THB · 2h = 100 THB"],
    icon: "🎮",
    img: "/egaming/ps5-store.png",
  },
  {
    title: "Billard & Bar",
    tag: "CHILL ZONE",
    desc: "Entre deux games, détendez-vous autour du billard ou au bar. Un espace lounge unique avec clocks mondiales, palmiers et ambiance tamisée.",
    details: ["Table de billard", "Bar Food & Drinks", "Ambiance lounge", "Clocks London · Tokyo · NY"],
    icon: "🎱",
    img: "/egaming/billiard-table.png",
  },
];

const BRANDS = ["ASUS ROG", "Logitech G", "HyperX", "TTRacing", "NVIDIA", "BenQ Zowie"];

export default function EgamingPage() {
  return (
    <div className="bg-black min-h-screen">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #cc1111; }
        @keyframes glow { 0%,100% { text-shadow: 0 0 20px rgba(220,38,38,.4); } 50% { text-shadow: 0 0 50px rgba(220,38,38,.9), 0 0 100px rgba(220,38,38,.3); } }
        .glow-text { animation: glow 3s ease-in-out infinite; }
      `}</style>
      <Navbar />
      <Hero />
      <Stats />
      <Experience />
      <Gallery />
      <Pricing />
      <Brands />
      <Location />
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="text-red-500 font-black leading-none" style={{ fontSize: "1.5rem", letterSpacing: "-0.04em", lineHeight: 0.85 }}>
        <div>33</div>
        <div>28</div>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-white text-xs font-bold tracking-[0.15em] uppercase">E-Sport</span>
        <span className="text-zinc-500 text-xs tracking-[0.12em] uppercase">Club</span>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-md border-b border-zinc-900" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors">
              {l}
            </button>
          ))}
        </div>
        <a href="https://maps.app.goo.gl/DQ7cxdCdAEXwXhgW8" target="_blank" rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-colors">
          Nous trouver
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img src="/egaming/exterior-neon.png" alt="" className="w-full h-full object-cover opacity-25"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.15) 3px,rgba(0,0,0,.15) 4px)"
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-700/15 rounded-full blur-[100px] pointer-events-none" />

      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-red-500 text-xs font-bold tracking-[0.6em] uppercase mb-10">Pattaya · Thailand</p>

        <div className="glow-text mb-6 select-none" style={{ lineHeight: 0.85 }}>
          <div className="text-white font-black" style={{ fontSize: "clamp(6rem,20vw,17rem)", letterSpacing: "-0.05em" }}>33</div>
          <div className="text-red-500 font-black" style={{ fontSize: "clamp(6rem,20vw,17rem)", letterSpacing: "-0.05em" }}>28</div>
        </div>

        <p className="text-zinc-400 font-light tracking-[0.4em] uppercase text-sm mb-2">E-Sport Gaming Club</p>
        <p className="text-zinc-600 text-xs tracking-widest mb-14">Food · Drinks · Billard · PS5 · PC Gaming</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden bg-red-600 hover:bg-red-500 text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300">
            <span className="relative z-10">Découvrir</span>
            <span className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>
          <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300">
            Voir les tarifs
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-red-600/60 to-transparent animate-pulse mx-auto" />
      </div>
    </section>
  );
}

function Stats() {
  const { ref, inView } = useInView();
  const items = [
    { v: "14h–00h", l: "Ouvert tous les jours" },
    { v: "50 ฿", l: "PC / heure" },
    { v: "20+", l: "Stations gaming" },
    { v: "PS5", l: "+ Billard + Bar" },
  ];
  return (
    <section ref={ref} className="bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <div key={s.l} className={`flex flex-col items-center py-8 border-r border-zinc-900 last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="text-white font-black text-2xl md:text-3xl tracking-tight">{s.v}</span>
            <span className="text-zinc-600 text-xs tracking-widest uppercase mt-1 text-center">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-black py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel label="L'expérience" title="Joue au niveau supérieur" />
        <div className="mt-24 space-y-28">
          {EXPERIENCES.map((exp, i) => <ExpBlock key={exp.title} exp={exp} flip={i % 2 !== 0} />)}
        </div>
      </div>
    </section>
  );
}

function ExpBlock({ exp, flip }: { exp: typeof EXPERIENCES[0]; flip: boolean }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <div className={`relative aspect-[4/3] overflow-hidden bg-zinc-900 ${flip ? "md:order-2" : ""}`}>
        <img src={exp.img} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
        <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 tracking-widest uppercase">{exp.tag}</span>
      </div>
      <div className={flip ? "md:order-1" : ""}>
        <span className="text-4xl block mb-4">{exp.icon}</span>
        <h3 className="text-white font-black text-3xl md:text-4xl tracking-tight mb-5">{exp.title}</h3>
        <p className="text-zinc-400 leading-relaxed mb-8">{exp.desc}</p>
        <div className="space-y-3">
          {exp.details.map((d) => (
            <div key={d} className="flex items-center gap-3">
              <div className="w-1 h-1 bg-red-500 rounded-full flex-shrink-0" />
              <span className="text-zinc-300 text-sm">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="gallery" className="bg-zinc-950 py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel label="La salle" title="Regarde où tu vas jouer" />
        <div ref={ref} className={`mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-2 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {GALLERY.map((img, i) => (
            <div key={img.src} className={`relative overflow-hidden group bg-zinc-900 ${img.span}`}
              style={{ transitionDelay: `${i * 50}ms` }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-white text-xs translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">{img.alt}</p>
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
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel label="Tarifs" title="Choisis ton expérience" />

        <div ref={ref} className={`mt-16 grid md:grid-cols-3 gap-6 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* PC Standard */}
          <div className="border border-zinc-800 hover:border-zinc-600 p-8 flex flex-col transition-all duration-300">
            <p className="text-zinc-500 text-xs tracking-widest uppercase mb-1">PC Gaming</p>
            <p className="text-zinc-400 text-xs mb-6">Standard</p>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-white font-black text-6xl">50</span>
              <span className="text-zinc-500 text-sm mb-2">฿ / heure</span>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {["Accès PC gaming", "Casque HyperX", "Clavier mécanique RGB", "Chaise racing TTRacing"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-zinc-300 text-sm">
                  <span className="text-red-500">✓</span>{f}
                </li>
              ))}
            </ul>
            <a href="https://maps.app.goo.gl/DQ7cxdCdAEXwXhgW8" target="_blank" rel="noopener noreferrer"
              className="border border-zinc-700 hover:border-white text-zinc-400 hover:text-white text-center py-3 font-bold text-xs tracking-widest uppercase transition-all">
              Venir jouer
            </a>
          </div>

          {/* PC Members */}
          <div className="relative border border-red-700 bg-gradient-to-b from-red-950/40 to-black p-8 flex flex-col transition-all duration-300">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-5 py-1 tracking-widest uppercase whitespace-nowrap">Meilleure offre</span>
            <p className="text-red-400 text-xs tracking-widest uppercase mb-1">PC Gaming</p>
            <p className="text-zinc-400 text-xs mb-6">Membres — Top Up</p>
            <div className="space-y-3 mb-6">
              {[
                { amount: "200 ฿", hours: "1 heure" },
                { amount: "500 ฿", hours: "3 heures" },
                { amount: "1 000 ฿", hours: "10 heures" },
              ].map((pkg) => (
                <div key={pkg.amount} className="flex items-center justify-between border border-zinc-800 px-4 py-3">
                  <span className="text-white font-black text-lg">{pkg.amount}</span>
                  <span className="text-red-400 text-sm font-semibold">{pkg.hours}</span>
                </div>
              ))}
            </div>
            <div className="border border-yellow-600/40 bg-yellow-600/10 px-4 py-3 mb-8">
              <p className="text-yellow-400 text-xs font-bold tracking-wider uppercase mb-1">Special Promo</p>
              <p className="text-white text-sm font-bold">200 ฿ = 5 heures</p>
            </div>
            <a href="https://maps.app.goo.gl/DQ7cxdCdAEXwXhgW8" target="_blank" rel="noopener noreferrer"
              className="mt-auto bg-red-600 hover:bg-red-500 text-white text-center py-3 font-bold text-xs tracking-widest uppercase transition-colors">
              Devenir membre
            </a>
          </div>

          {/* PS5 */}
          <div className="border border-zinc-800 hover:border-zinc-600 p-8 flex flex-col transition-all duration-300">
            <p className="text-zinc-500 text-xs tracking-widest uppercase mb-1">Console</p>
            <p className="text-zinc-400 text-xs mb-6">PS5 Lounge</p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between border border-zinc-800 px-4 py-3">
                <span className="text-white font-black text-lg">60 ฿</span>
                <span className="text-zinc-400 text-sm">1 heure</span>
              </div>
              <div className="flex items-center justify-between border border-zinc-800 px-4 py-3">
                <span className="text-white font-black text-lg">100 ฿</span>
                <span className="text-zinc-400 text-sm">2 heures</span>
              </div>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {["PlayStation 5", "Grand écran TV", "2 manettes DualSense", "Canapé cuir premium"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-zinc-300 text-sm">
                  <span className="text-red-500">✓</span>{f}
                </li>
              ))}
            </ul>
            <a href="https://maps.app.goo.gl/DQ7cxdCdAEXwXhgW8" target="_blank" rel="noopener noreferrer"
              className="border border-zinc-700 hover:border-white text-zinc-400 hover:text-white text-center py-3 font-bold text-xs tracking-widest uppercase transition-all">
              Réserver
            </a>
          </div>
        </div>

        {/* Hours banner */}
        <div className="mt-10 border border-zinc-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm">Ouvert tous les jours</span>
          </div>
          <span className="text-white font-bold text-lg tracking-wide">14:00 – 00:00</span>
          <div className="flex items-center gap-2 text-zinc-500 text-xs">
            <span>Food</span><span>·</span><span>Drinks</span><span>·</span><span>Billard</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Brands() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className={`bg-zinc-950 border-y border-zinc-900 py-10 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-zinc-700 text-xs tracking-widest uppercase text-center mb-6">Équipements certifiés</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {BRANDS.map((b) => (
            <span key={b} className="text-zinc-500 font-bold text-sm tracking-widest uppercase hover:text-zinc-300 transition-colors cursor-default">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="bg-black py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel label="Localisation" title="Viens nous voir à Pattaya" />
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="relative aspect-video overflow-hidden">
              <img src="/egaming/exterior-facade.png" alt="Façade 3328 E-Sport Club" className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Adresse</p>
                <p className="text-white font-semibold text-sm">3328 E-Sport Club</p>
                <p className="text-zinc-400 text-sm mt-1">Pattaya, Chonburi</p>
                <p className="text-zinc-500 text-sm">Thailand</p>
              </div>
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Horaires</p>
                <p className="text-white font-bold text-sm">14:00 – 00:00</p>
                <p className="text-zinc-500 text-xs mt-1">Tous les jours</p>
              </div>
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Sur place</p>
                <p className="text-zinc-300 text-sm">Food & Drinks</p>
                <p className="text-zinc-300 text-sm">Billard</p>
                <p className="text-zinc-300 text-sm">PC Gaming · PS5</p>
              </div>
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Trouver</p>
                <a href="https://maps.app.goo.gl/DQ7cxdCdAEXwXhgW8" target="_blank" rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors">
                  Google Maps →
                </a>
              </div>
            </div>
          </div>
          <div className="aspect-video overflow-hidden border border-zinc-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d100.8706445!3d12.9132849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310297004f5c34f9%3A0xfc2db1962da92567!2s3328+e-sport+gaming+club!5e0!3m2!1sfr!2sth!4v1"
              width="100%" height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(88%) contrast(85%)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="3328 E-Sport Club — Pattaya"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <p className="text-red-500 text-xs font-bold tracking-[0.45em] uppercase mb-3">{label}</p>
      <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight leading-none">{title}</h2>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="text-zinc-600 hover:text-zinc-400 text-xs tracking-widest uppercase transition-colors">
              {l}
            </button>
          ))}
        </div>
        <p className="text-zinc-700 text-xs">© 2026 3328 E-Sport Club · Pattaya</p>
      </div>
    </footer>
  );
}
