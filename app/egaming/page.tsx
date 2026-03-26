"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
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

const STATS = [
  { value: "20+", label: "Gaming PCs" },
  { value: "PS5", label: "Console Lounge" },
  { value: "Billiard", label: "Chill Zone" },
  { value: "Pattaya", label: "Thailand" },
];

const GALLERY_IMAGES = [
  { src: "/egaming/venue-1.jpg", alt: "Gaming stations — vue d'ensemble", span: "col-span-2 row-span-2" },
  { src: "/egaming/venue-2.jpg", alt: "Station gaming close-up", span: "" },
  { src: "/egaming/venue-3.jpg", alt: "Station avec casque HyperX", span: "" },
  { src: "/egaming/venue-4.jpg", alt: "Lounge billard & PS5", span: "" },
  { src: "/egaming/venue-5.jpg", alt: "Rangée de stations", span: "" },
  { src: "/egaming/venue-6.jpg", alt: "Vue aérienne RGB", span: "col-span-2" },
  { src: "/egaming/venue-7.jpg", alt: "Espace console PS5", span: "" },
];

const EXPERIENCES = [
  {
    title: "PC Gaming",
    tag: "20+ STATIONS",
    desc: "Des postes custom avec des chaises racing, claviers mécaniques rétroéclairés, souris gaming haute précision et écrans haute fréquence. Chaque station est pensée pour la performance.",
    detail1: "Moniteurs haute fréquence",
    detail2: "Claviers mécaniques",
    detail3: "Chaises racing full cuir",
    icon: "⌨",
    img: "/egaming/venue-2.jpg",
  },
  {
    title: "Console & PS5 Lounge",
    tag: "ESPACE VIP",
    desc: "Plongez dans l'univers PS5 sur grand écran dans notre lounge cosy. Canapés premium, écran géant, son surround. L'expérience console ultime en dehors de chez vous.",
    detail1: "PlayStation 5",
    detail2: "Écran XXL",
    detail3: "Canapé premium",
    icon: "🎮",
    img: "/egaming/venue-7.jpg",
  },
  {
    title: "Billard & Chill Zone",
    tag: "DÉTENTE",
    desc: "Entre deux games, relaxez-vous autour de notre table de billard. Un espace lounge unique qui mixe gaming et divertissement premium.",
    detail1: "Table de billard",
    detail2: "Ambiance lounge",
    detail3: "Espace détente",
    icon: "🎱",
    img: "/egaming/venue-4.jpg",
  },
];

const PACKAGES = [
  {
    name: "CASUAL",
    price: "60",
    unit: "฿/heure",
    color: "from-zinc-900 to-zinc-800",
    border: "border-zinc-700",
    badge: null,
    features: ["Accès PC Gaming", "Casque inclus", "Eau offerte"],
    cta: "Réserver",
  },
  {
    name: "PRO",
    price: "90",
    unit: "฿/heure",
    color: "from-red-950 to-red-900",
    border: "border-red-600",
    badge: "POPULAIRE",
    features: ["Station premium prioritaire", "Casque HyperX", "Boisson offerte", "Headset dédié"],
    cta: "Réserver",
  },
  {
    name: "CONSOLE",
    price: "80",
    unit: "฿/heure",
    color: "from-zinc-900 to-zinc-800",
    border: "border-zinc-700",
    badge: null,
    features: ["PS5 + Grand écran", "2 manettes", "Accès PS Store", "Canapé lounge"],
    cta: "Réserver",
  },
];

const ADD_ONS = [
  { name: "Billard", price: "100 ฿/h", icon: "🎱" },
  { name: "Pack tournoi privé", price: "Sur devis", icon: "🏆" },
  { name: "Anniversaire / Event", price: "Sur devis", icon: "🎉" },
  { name: "Boissons & Snacks", price: "À la carte", icon: "🥤" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-red-900/40" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-white font-black text-xl tracking-tighter">33X28</span>
          <span className="text-red-500 font-black text-xl">.</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-zinc-400 hover:text-white text-sm font-medium tracking-widest uppercase transition-colors duration-200"
            >
              {l}
            </button>
          ))}
        </div>
        <a
          href="https://wa.me/66000000000"
          className="bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-5 py-2 rounded-sm tracking-widest uppercase transition-all duration-200"
        >
          Book Now
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/egaming/venue-6.jpg"
          alt="33X28 Gaming Club"
          className="w-full h-full object-cover opacity-30"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />

      {/* Red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-700/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-red-500 text-xs font-bold tracking-[0.5em] uppercase mb-6">Pattaya · Thailand</p>
        <h1 className="text-white font-black leading-none mb-2" style={{ fontSize: "clamp(5rem, 18vw, 14rem)", letterSpacing: "-0.04em" }}>
          33X28
        </h1>
        <p className="text-zinc-300 font-light tracking-[0.35em] uppercase text-sm md:text-base mb-12">
          E-Sport Gaming Club
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative bg-red-600 hover:bg-red-500 text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Découvrir</span>
            <span className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>
          <button
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-zinc-600 hover:border-white text-zinc-400 hover:text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300"
          >
            Tarifs
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-zinc-600 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent" />
      </div>
    </section>
  );
}

function Stats() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-0">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center py-6 border-r border-zinc-900 last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className="text-white font-black text-3xl md:text-4xl tracking-tight">{s.value}</span>
            <span className="text-zinc-500 text-xs tracking-widest uppercase mt-1">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-black py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="L'Expérience" title="Joue au niveau supérieur" />
        <div className="space-y-32 mt-24">
          {EXPERIENCES.map((exp, i) => {
            const { ref, inView } = useInView();
            const isEven = i % 2 === 0;
            return (
              <div
                key={exp.title}
                ref={ref}
                className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              >
                {/* Image */}
                <div className={`relative aspect-video overflow-hidden ${isEven ? "" : "md:order-2"}`}>
                  <img
                    src={exp.img}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      (t.parentElement as HTMLElement).style.background = "#1a1a1a";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 tracking-widest uppercase">
                    {exp.tag}
                  </div>
                </div>

                {/* Text */}
                <div className={isEven ? "" : "md:order-1"}>
                  <span className="text-red-500 text-5xl mb-4 block">{exp.icon}</span>
                  <h3 className="text-white font-black text-3xl md:text-4xl tracking-tight mb-4">{exp.title}</h3>
                  <p className="text-zinc-400 text-base leading-relaxed mb-8">{exp.desc}</p>
                  <div className="space-y-3">
                    {[exp.detail1, exp.detail2, exp.detail3].map((d) => (
                      <div key={d} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-red-500 rounded-full flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="gallery" className="bg-zinc-950 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="La Salle" title="Regarde où tu vas jouer" />
        <div
          ref={ref}
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-3 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {GALLERY_IMAGES.map((img, i) => (
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
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  (t.parentElement as HTMLElement).style.background = "#1c1c1c";
                  (t.parentElement as HTMLElement).innerHTML += `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px"><div style="font-size:2rem">📸</div><p style="color:#555;font-size:11px;text-align:center;padding:0 12px;font-family:sans-serif">${img.alt}</p><p style="color:#333;font-size:10px;font-family:monospace">${img.src}</p></div>`;
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-medium">{img.alt}</p>
              </div>
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
    <section id="pricing" className="bg-black py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Tarifs" title="Choisis ton expérience" />

        {/* Main packages */}
        <div
          ref={ref}
          className={`mt-16 grid md:grid-cols-3 gap-6 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`relative bg-gradient-to-b ${pkg.color} border ${pkg.border} p-8 flex flex-col transition-all duration-700`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1 tracking-widest uppercase">
                  {pkg.badge}
                </span>
              )}
              <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">{pkg.name}</p>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-white font-black text-5xl">{pkg.price}</span>
                <span className="text-zinc-500 text-sm mb-2">{pkg.unit}</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-zinc-300 text-sm">
                    <span className="text-red-500 text-xs">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/66000000000"
                className={`text-center py-3 font-bold text-sm tracking-widest uppercase transition-all duration-200 ${pkg.badge ? "bg-red-600 hover:bg-red-500 text-white" : "border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white"}`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-20">
          <h3 className="text-zinc-500 text-xs tracking-widest uppercase mb-8">Add-ons disponibles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ADD_ONS.map((a) => (
              <div key={a.name} className="border border-zinc-800 hover:border-zinc-600 p-5 flex flex-col gap-2 transition-colors duration-200">
                <span className="text-2xl">{a.icon}</span>
                <p className="text-white font-semibold text-sm">{a.name}</p>
                <p className="text-red-500 text-xs font-bold">{a.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Location() {
  const { ref, inView } = useInView();
  return (
    <section id="location" className="bg-zinc-950 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Localisation" title="Trouve-nous à Pattaya" />
        <div
          ref={ref}
          className={`mt-16 grid md:grid-cols-2 gap-12 items-start transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Info */}
          <div className="space-y-8">
            <div>
              <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">Adresse</p>
              <p className="text-white font-semibold">33X28 E-Sport Gaming Club</p>
              <p className="text-zinc-400 text-sm mt-1">Pattaya, Chonburi, Thailand</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">Horaires</p>
              <div className="space-y-1">
                <p className="text-zinc-300 text-sm">Lundi – Vendredi : <span className="text-white font-medium">10h00 – 24h00</span></p>
                <p className="text-zinc-300 text-sm">Samedi – Dimanche : <span className="text-white font-medium">10h00 – 02h00</span></p>
              </div>
            </div>
            <div>
              <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">Contact</p>
              <a
                href="https://wa.me/66000000000"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 text-sm tracking-widest uppercase transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp
              </a>
            </div>
            <div className="border-t border-zinc-800 pt-8">
              <a
                href="https://maps.app.goo.gl/DQ7cxdCdAEXwXhgW8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
              >
                Ouvrir dans Google Maps →
              </a>
            </div>
          </div>

          {/* Map embed */}
          <div className="relative aspect-video overflow-hidden border border-zinc-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d968.8!2d100.8706445!3d12.9132849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310297004f5c34f9%3A0xfc2db1962da92567!2s33X28+e-sport+gaming+club!5e0!3m2!1sfr!2sth!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(90%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="33X28 E-Sport Gaming Club — Pattaya"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="max-w-xl">
      <p className="text-red-500 text-xs font-bold tracking-[0.4em] uppercase mb-3">{label}</p>
      <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight leading-none">{title}</h2>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-white font-black text-lg tracking-tighter">33X28</span>
            <span className="text-red-500 font-black text-lg">.</span>
          </div>
          <p className="text-zinc-600 text-xs">E-Sport Gaming Club · Pattaya, Thailand</p>
        </div>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="text-zinc-600 hover:text-zinc-300 text-xs tracking-widest uppercase transition-colors"
            >
              {l}
            </button>
          ))}
        </div>
        <p className="text-zinc-700 text-xs">© 2026 33X28 E-Sport Gaming Club</p>
      </div>
    </footer>
  );
}

export default function EgamingPage() {
  return (
    <div className="bg-black min-h-screen">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #cc1111; border-radius: 2px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Stats />
      <Experience />
      <Gallery />
      <Pricing />
      <Location />
      <Footer />
    </div>
  );
}
