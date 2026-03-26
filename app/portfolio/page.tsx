"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

const PROJECTS = [
  {
    slug: "3328-esport",
    name: "3328 E-Sport Club",
    category: "Gaming & Entertainment",
    location: "Pattaya, Thailand",
    year: "2025",
    desc: "Landing page premium pour un e-sport gaming club — PC gaming, PS5 lounge, billard & bar. Design dark avec effets néon et animations scroll.",
    tags: ["Gaming", "Dark UI", "Animations"],
    gradient: "from-red-950 via-zinc-950 to-black",
    accent: "#dc2626",
    accentText: "text-red-500",
    liveUrl: "/egaming",
    status: "Live",
  },
  {
    slug: "le-palais",
    name: "Le Palais",
    category: "Fine Dining",
    location: "Bangkok, Thailand",
    year: "2025",
    desc: "Site vitrine élégant pour un restaurant français haut de gamme. Template classique avec palette dorée, menu gastronomique et réservation en ligne.",
    tags: ["Restaurant", "Luxury", "French"],
    gradient: "from-amber-950 via-stone-950 to-black",
    accent: "#d97706",
    accentText: "text-amber-500",
    liveUrl: "/portfolio/le-palais",
    status: "Preview",
  },
  {
    slug: "barber-royale",
    name: "Barber Royale",
    category: "Luxury Barbershop",
    location: "Phuket, Thailand",
    year: "2025",
    desc: "Identité web prestige pour un barbershop de luxe. Template sombre avec accents or, galerie photos, tarifs et prise de RDV WhatsApp.",
    tags: ["Barbershop", "Gold", "Premium"],
    gradient: "from-yellow-950 via-zinc-900 to-black",
    accent: "#ca8a04",
    accentText: "text-yellow-500",
    liveUrl: "/portfolio/barber-royale",
    status: "Preview",
  },
  {
    slug: "blue-lagoon",
    name: "Blue Lagoon Beach Bar",
    category: "Beach Bar & Restaurant",
    location: "Koh Samui, Thailand",
    year: "2026",
    desc: "Site one-page pour un beach bar tropical. Design frais avec dégradés bleu-turquoise, menu cocktails, galerie coucher de soleil et carte Google Maps.",
    tags: ["Beach Bar", "Tropical", "Cocktails"],
    gradient: "from-cyan-950 via-blue-950 to-black",
    accent: "#0891b2",
    accentText: "text-cyan-500",
    liveUrl: "/portfolio/blue-lagoon",
    status: "Preview",
  },
  {
    slug: "zen-garden",
    name: "Zen Garden",
    category: "Japanese Restaurant",
    location: "Chiang Mai, Thailand",
    year: "2026",
    desc: "Expérience web minimaliste pour un restaurant japonais authentique. Design épuré, menu omakase, ambiance sereine avec typographie premium.",
    tags: ["Japanese", "Minimal", "Omakase"],
    gradient: "from-stone-900 via-zinc-900 to-black",
    accent: "#84cc16",
    accentText: "text-lime-500",
    liveUrl: "/portfolio/zen-garden",
    status: "Preview",
  },
];

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  return (
    <div className="bg-black min-h-screen">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #aaa 40%, #fff 60%, #aaa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .card-hover { transition: transform 0.4s cubic-bezier(.23,1,.32,1), box-shadow 0.4s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 30px 60px rgba(0,0,0,.6); }
      `}</style>

      <Navbar />
      <Hero mounted={mounted} />
      <Stats />
      <Projects />
      <CTA />
      <Footer />
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
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <KabalLogo />
        <div className="hidden md:flex items-center gap-8">
          {["Projets", "Services", "Contact"].map((l) => (
            <button key={l}
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.25em] uppercase transition-colors">
              {l}
            </button>
          ))}
        </div>
        <a href="mailto:hello@kabal.website"
          className="border border-zinc-700 hover:border-white text-zinc-300 hover:text-white text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-all duration-300">
          Nous contacter
        </a>
      </div>
    </nav>
  );
}

function KabalLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 bg-white flex items-center justify-center">
        <span className="text-black font-black text-xs tracking-tighter">K</span>
      </div>
      <span className="text-white font-black tracking-[0.2em] uppercase text-sm">Kabal</span>
    </div>
  );
}

function Hero({ mounted }: { mounted: boolean }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-zinc-500 text-xs font-bold tracking-[0.6em] uppercase mb-10">Studio Digital · Bangkok & Pattaya</p>

        <h1 className="font-black leading-none mb-8 select-none" style={{ fontSize: "clamp(4rem,14vw,12rem)", letterSpacing: "-0.05em" }}>
          <span className="shimmer-text">Notre</span>
          <br />
          <span className="text-white">Travail.</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-14">
          On construit des sites web qui convertissent — pour les restaurants, clubs, barbershops et commerces locaux en Thaïlande.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden bg-white text-black font-black px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300 hover:bg-zinc-200">
            Voir les projets
          </button>
          <a href="mailto:hello@kabal.website"
            className="border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300">
            Travailler ensemble
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse mx-auto" />
      </div>
    </section>
  );
}

function Stats() {
  const { ref, inView } = useInView();
  const items = [
    { v: "5+", l: "Sites livrés" },
    { v: "100%", l: "Clients satisfaits" },
    { v: "48h", l: "Délai moyen" },
    { v: "TH", l: "Basé en Thaïlande" },
  ];
  return (
    <section ref={ref} className="border-y border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <div key={s.l}
            className={`flex flex-col items-center py-8 border-r border-zinc-900 last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="text-white font-black text-2xl md:text-3xl tracking-tight">{s.v}</span>
            <span className="text-zinc-600 text-xs tracking-widest uppercase mt-1 text-center">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="projets" className="py-28 md:py-36 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-zinc-500 text-xs font-bold tracking-[0.45em] uppercase mb-3">Portfolio</p>
          <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight leading-none">Nos réalisations</h2>
        </div>

        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <Link href={p.liveUrl}
      className={`group card-hover block relative overflow-hidden bg-zinc-950 border border-zinc-900 hover:border-zinc-700`}
      style={{ transitionDelay: `${index * 60}ms` }}>

      {/* Visual header */}
      <div className={`relative h-52 bg-gradient-to-br ${p.gradient} flex items-end p-6 overflow-hidden`}>
        {/* Abstract shape */}
        <div className="absolute top-6 right-6 w-24 h-24 rounded-full opacity-20"
          style={{ background: p.accent, filter: "blur(20px)" }} />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full opacity-10"
          style={{ background: p.accent, filter: "blur(30px)" }} />

        <div className="relative z-10">
          <span className={`text-xs font-bold tracking-widest uppercase ${p.accentText}`}>{p.category}</span>
          <h3 className="text-white font-black text-2xl tracking-tight mt-1 leading-none">{p.name}</h3>
        </div>

        {/* Status badge */}
        <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 tracking-widest uppercase ${p.status === "Live" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}>
          {p.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-zinc-600 text-xs tracking-widest">{p.location}</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full" />
          <span className="text-zinc-600 text-xs">{p.year}</span>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed mb-5">{p.desc}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {p.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 border border-zinc-800 text-zinc-500 tracking-wide">{t}</span>
          ))}
        </div>
        <div className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase ${p.accentText} group-hover:gap-3 transition-all duration-300`}>
          <span>Voir le projet</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}

function CTA() {
  const { ref, inView } = useInView();
  return (
    <section id="contact" className="py-28 md:py-36 bg-zinc-950 border-t border-zinc-900">
      <div ref={ref} className={`max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-zinc-500 text-xs font-bold tracking-[0.45em] uppercase mb-4">Prêt à lancer ?</p>
        <h2 className="text-white font-black text-4xl md:text-6xl tracking-tight leading-none mb-6">
          Votre site en <br /><span className="text-zinc-400">48 heures.</span>
        </h2>
        <p className="text-zinc-500 text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed">
          Restaurant, bar, barbershop, club — on livre des sites performants, rapides et clé en main.
        </p>
        <a href="mailto:hello@kabal.website"
          className="inline-block bg-white text-black font-black px-12 py-5 tracking-widest uppercase text-sm hover:bg-zinc-200 transition-colors duration-300">
          Démarrer un projet
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <KabalLogo />
        <p className="text-zinc-700 text-xs tracking-widest">© 2026 Kabal Studio · Bangkok & Pattaya</p>
        <a href="mailto:hello@kabal.website" className="text-zinc-600 hover:text-zinc-400 text-xs tracking-widest transition-colors">
          hello@kabal.website
        </a>
      </div>
    </footer>
  );
}
