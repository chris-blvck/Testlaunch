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

const CATEGORIES = ["All", "Restaurant & Dining", "Gaming & Entertainment", "NFT & Web3"];

const PROJECTS = [
  {
    slug: "3328-esport",
    name: "3328 E-Sport Club",
    category: "Gaming & Entertainment",
    location: "Pattaya, Thailand",
    year: "2025",
    desc: "Premium landing page for an e-sport gaming club — PC gaming, PS5 lounge, billiards & bar. Dark design with neon effects and scroll animations.",
    tags: ["Gaming", "Dark UI", "Animations"],
    gradient: "from-red-950 via-zinc-950 to-black",
    accent: "#dc2626",
    accentText: "text-red-500",
    photo: "https://images.pexels.com/photos/7897479/pexels-photo-7897479.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/egaming",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "le-palais",
    name: "Le Palais",
    category: "Restaurant & Dining",
    location: "Bangkok, Thailand",
    year: "2025",
    desc: "Elegant showcase website for a high-end French restaurant. Gold palette, gastronomic menu, Playfair Display typography and online reservation.",
    tags: ["Restaurant", "Luxury", "French"],
    gradient: "from-amber-950 via-stone-950 to-black",
    accent: "#d97706",
    accentText: "text-amber-500",
    photo: "https://images.pexels.com/photos/3859234/pexels-photo-3859234.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/le-palais",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "barber-royale",
    name: "Barber Royale",
    category: "Restaurant & Dining",
    location: "Phuket, Thailand",
    year: "2025",
    desc: "Prestige web identity for a luxury barbershop. Dark design with gold accents, photo gallery, pricing grid and WhatsApp booking.",
    tags: ["Barbershop", "Gold", "Premium"],
    gradient: "from-yellow-950 via-zinc-900 to-black",
    accent: "#ca8a04",
    accentText: "text-yellow-500",
    photo: "https://images.pexels.com/photos/7697329/pexels-photo-7697329.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/barber-royale",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "blue-lagoon",
    name: "Blue Lagoon Beach Bar",
    category: "Restaurant & Dining",
    location: "Koh Samui, Thailand",
    year: "2026",
    desc: "Vibrant one-page site for a tropical beach bar. Cyan gradients, cocktail menu, live events section and beachfront location.",
    tags: ["Beach Bar", "Tropical", "Cocktails"],
    gradient: "from-cyan-950 via-blue-950 to-black",
    accent: "#0891b2",
    accentText: "text-cyan-500",
    photo: "https://images.pexels.com/photos/6181098/pexels-photo-6181098.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/blue-lagoon",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "zen-garden",
    name: "Zen Garden",
    category: "Restaurant & Dining",
    location: "Chiang Mai, Thailand",
    year: "2026",
    desc: "Ultra-minimal omakase restaurant website. Cormorant Garamond serif, 12-course tasting menu, exclusive reservation system.",
    tags: ["Japanese", "Minimal", "Omakase"],
    gradient: "from-stone-900 via-zinc-900 to-black",
    accent: "#84cc16",
    accentText: "text-lime-500",
    photo: "https://images.pexels.com/photos/6025655/pexels-photo-6025655.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/zen-garden",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "jungle-kabal",
    name: "Jungle Kabal",
    category: "NFT & Web3",
    location: "Online",
    year: "2026",
    desc: "Immersive NFT & meme community hub with lush jungle aesthetics, token integration and viral social features.",
    tags: ["NFT", "Web3", "Meme"],
    gradient: "from-green-950 via-emerald-950 to-black",
    accent: "#10b981",
    accentText: "text-emerald-500",
    photo: "https://images.pexels.com/photos/7708407/pexels-photo-7708407.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "https://www.junglekabal.meme/",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "pokestoned",
    name: "PokeStoned",
    category: "NFT & Web3",
    location: "Online",
    year: "2026",
    desc: "Browser mini-game with Pokémon card collecting mechanics. Trade, battle and collect in a vibrant community. Built for speed and viral engagement.",
    tags: ["Cards", "Mini Game", "Community"],
    gradient: "from-yellow-950 via-orange-950 to-black",
    accent: "#f59e0b",
    accentText: "text-yellow-400",
    photo: null,
    liveUrl: "https://www.pokestoned.fun/",
    status: "Live",
    cardType: "cards",
  },
  {
    slug: "die-jungle",
    name: "Die Jungle",
    category: "Gaming & Entertainment",
    location: "Online",
    year: "2026",
    desc: "Addictive browser mini game with jungle theme, global leaderboards and daily challenges. Built for speed and engagement.",
    tags: ["Mini Game", "Browser", "Leaderboard"],
    gradient: "from-teal-950 via-green-950 to-black",
    accent: "#14b8a6",
    accentText: "text-teal-400",
    photo: "https://images.pexels.com/photos/7708409/pexels-photo-7708409.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "https://www.diejungle.fun/",
    status: "Live",
    cardType: "photo",
  },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const filtered = activeCategory === "All" ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);

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
        .card-hover { transition: transform 0.4s cubic-bezier(.23,1,.32,1), box-shadow 0.4s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 30px 60px rgba(0,0,0,.6); }
        @keyframes float-card {
          0%, 100% { transform: translateY(0px) rotate(var(--r)); }
          50% { transform: translateY(-6px) rotate(var(--r)); }
        }
        .float-card { animation: float-card 3s ease-in-out infinite; }
      `}</style>

      <Navbar />
      <Hero mounted={mounted} />
      <Stats />
      <Projects filtered={filtered} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
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
          {[{ label: "Projects", id: "projets" }, { label: "Services", id: "services" }, { label: "Contact", id: "contact" }].map((l) => (
            <button key={l.label}
              onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.25em] uppercase transition-colors">
              {l.label}
            </button>
          ))}
        </div>
        <a href="mailto:hello@kabal.website"
          className="border border-zinc-700 hover:border-white text-zinc-300 hover:text-white text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-all duration-300">
          Get in touch
        </a>
      </div>
    </nav>
  );
}

function KabalLogo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="w-7 h-7 bg-white flex items-center justify-center">
        <span className="text-black font-black text-xs tracking-tighter">K</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-white font-black tracking-[0.2em] uppercase text-sm">Kabal</span>
        <span className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase">Website Agency</span>
      </div>
    </Link>
  );
}

function Hero({ mounted }: { mounted: boolean }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-zinc-500 text-xs font-bold tracking-[0.6em] uppercase mb-10">Website Agency · Bangkok & Pattaya</p>

        <h1 className="font-black leading-none mb-8 select-none" style={{ fontSize: "clamp(4rem,14vw,12rem)", letterSpacing: "-0.05em" }}>
          <span className="shimmer-text">Our</span>
          <br />
          <span className="text-white">Work.</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-14">
          We build websites that convert — for restaurants, clubs, barbershops and local businesses across Thailand.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden bg-white text-black font-black px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300 hover:bg-zinc-200">
            View projects
          </button>
          <a href="mailto:hello@kabal.website"
            className="border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300">
            Work with us
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
    { v: "8+", l: "Sites delivered" },
    { v: "100%", l: "Happy clients" },
    { v: "48h", l: "Average turnaround" },
    { v: "TH", l: "Based in Thailand" },
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

function Projects({ filtered, activeCategory, setActiveCategory }: {
  filtered: typeof PROJECTS;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}) {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="projets" className="py-28 md:py-36 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-zinc-500 text-xs font-bold tracking-[0.45em] uppercase mb-3">Portfolio</p>
          <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight leading-none">Our work</h2>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-14">
          {CATEGORIES.map((cat) => (
            <button key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-bold px-4 py-2 tracking-widest uppercase transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardsHeader({ accent }: { accent: string }) {
  const cards = [
    { r: "-8deg", delay: "0s", z: 1, x: "-30px" },
    { r: "-3deg", delay: "0.3s", z: 2, x: "-10px" },
    { r: "3deg", delay: "0.6s", z: 3, x: "10px" },
    { r: "10deg", delay: "0.9s", z: 2, x: "28px" },
    { r: "16deg", delay: "1.2s", z: 1, x: "44px" },
  ];
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${accent}22 0%, transparent 70%)` }} />
      {cards.map((c, i) => (
        <div key={i}
          className="absolute float-card"
          style={{
            width: 56, height: 80,
            transform: `translateX(${c.x}) rotate(${c.r})`,
            zIndex: c.z,
            animationDelay: c.delay,
            "--r": c.r,
          } as React.CSSProperties}>
          <div className="w-full h-full rounded-lg border-2 overflow-hidden"
            style={{ borderColor: accent, background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
            <div className="w-full h-[55%] flex items-center justify-center" style={{ background: `${accent}18` }}>
              <div className="w-7 h-7 rounded-full border" style={{ borderColor: accent, opacity: 0.8 }} />
            </div>
            <div className="px-1.5 pt-1">
              <div className="h-1 rounded mb-1" style={{ background: accent, opacity: 0.7, width: "70%" }} />
              <div className="h-0.5 rounded" style={{ background: "#ffffff33", width: "50%" }} />
            </div>
          </div>
        </div>
      ))}
      <div className="relative z-10 mt-24 text-center">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Browser Mini Game</span>
      </div>
    </div>
  );
}

function ProjectCard({ project: p, index }: { project: typeof PROJECTS[0]; index: number }) {
  const isExternal = p.liveUrl.startsWith("http");
  const cardProps = isExternal
    ? { href: p.liveUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: p.liveUrl };

  return (
    <Link {...cardProps}
      className="group card-hover block relative overflow-hidden bg-zinc-950 border border-zinc-900 hover:border-zinc-700"
      style={{ transitionDelay: `${index * 60}ms` }}>

      {/* Header */}
      <div className="relative h-52 overflow-hidden">
        {p.cardType === "cards" ? (
          <CardsHeader accent={p.accent} />
        ) : (
          <>
            {p.photo && (
              <img src={p.photo} alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            )}
            <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} ${p.photo ? "opacity-70" : "opacity-100"}`} />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 p-5 z-10">
          <span className={`text-xs font-bold tracking-widest uppercase ${p.accentText}`}>{p.category}</span>
          <h3 className="text-white font-black text-2xl tracking-tight mt-1 leading-none">{p.name}</h3>
        </div>

        <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 tracking-widest uppercase z-10 ${p.status === "Live" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}>
          {p.status}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-zinc-600 text-xs tracking-widest">{p.location}</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full" />
          <span className="text-zinc-600 text-xs">{p.year}</span>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{p.desc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {p.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 border border-zinc-800 text-zinc-500 tracking-wide">{t}</span>
          ))}
        </div>
        <div className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase ${p.accentText} group-hover:gap-3 transition-all duration-300`}>
          <span>View project</span>
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
        <p className="text-zinc-500 text-xs font-bold tracking-[0.45em] uppercase mb-4">Ready to launch?</p>
        <h2 className="text-white font-black text-4xl md:text-6xl tracking-tight leading-none mb-6">
          Your site in <br /><span className="text-zinc-400">48 hours.</span>
        </h2>
        <p className="text-zinc-500 text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed">
          Restaurant, bar, barbershop, club — we deliver fast, high-performance websites, ready to go.
        </p>
        <a href="mailto:hello@kabal.website"
          className="inline-block bg-white text-black font-black px-12 py-5 tracking-widest uppercase text-sm hover:bg-zinc-200 transition-colors duration-300">
          Start a project
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
        <p className="text-zinc-700 text-xs tracking-widest">© 2026 Kabal Website Agency · Bangkok & Pattaya</p>
        <a href="mailto:hello@kabal.website" className="text-zinc-600 hover:text-zinc-400 text-xs tracking-widest transition-colors">
          hello@kabal.website
        </a>
      </div>
    </footer>
  );
}
