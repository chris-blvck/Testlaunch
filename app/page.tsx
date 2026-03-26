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

const CATEGORIES = ["All", "Restaurant & Dining", "Gaming & Entertainment", "NFT & Web3", "Health & Beauty", "Sports & Fitness"];

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
  {
    slug: "neon-noir",
    name: "Neon Noir",
    category: "Gaming & Entertainment",
    location: "Bangkok, Thailand",
    year: "2026",
    desc: "Immersive nightclub experience website. Bebas Neue, deep violet palette, VIP table booking, DJ events calendar and gallery.",
    tags: ["Nightclub", "VIP", "Events"],
    gradient: "from-violet-950 via-purple-950 to-black",
    accent: "#7c3aed",
    accentText: "text-violet-400",
    photo: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/neon-noir",
    status: "Preview",
    cardType: "photo",
  },
  {
    slug: "aura-spa",
    name: "Aura Spa",
    category: "Restaurant & Dining",
    location: "Koh Samui, Thailand",
    year: "2026",
    desc: "Ultra-premium wellness spa website. Cormorant Garamond, rose gold palette, signature treatment menu, retreat packages and online booking.",
    tags: ["Spa", "Wellness", "Luxury"],
    gradient: "from-rose-950 via-stone-950 to-black",
    accent: "#c9956c",
    accentText: "text-rose-300",
    photo: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/aura-spa",
    status: "Preview",
    cardType: "photo",
  },
  {
    slug: "clinic",
    name: "Aestha Clinic",
    category: "Health & Beauty",
    location: "Bangkok, Thailand",
    year: "2026",
    desc: "Elegant aesthetics clinic website. Light sage & gold palette, service menu, before/after gallery, online consultation booking.",
    tags: ["Clinic", "Beauty", "Light Theme"],
    gradient: "from-emerald-950 via-stone-950 to-black",
    accent: "#b8923a",
    accentText: "text-amber-400",
    photo: "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/clinic",
    status: "Preview",
    cardType: "photo",
  },
  {
    slug: "muaythai",
    name: "Tiger Muay Thai",
    category: "Sports & Fitness",
    location: "Pattaya, Thailand",
    year: "2026",
    desc: "Raw and powerful gym website. Muay Thai training programs, DTV visa services, class schedule and WhatsApp booking. Dark gold palette.",
    tags: ["Gym", "Muay Thai", "DTV Visa"],
    gradient: "from-yellow-950 via-zinc-950 to-black",
    accent: "#c9a84c",
    accentText: "text-yellow-400",
    photo: "https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/muaythai",
    status: "Preview",
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
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [{ label: "Projects", id: "projets" }, { label: "Contact", id: "contact" }];
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-md border-b border-zinc-900" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <KabalLogo />
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button key={l.label}
                onClick={() => scrollTo(l.id)}
                className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.25em] uppercase transition-colors">
                {l.label}
              </button>
            ))}
            <Link href="/services" className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.25em] uppercase transition-colors">Services</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:junglekabal@gmail.com"
              className="hidden md:block border border-zinc-700 hover:border-white text-zinc-300 hover:text-white text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-all duration-300">
              Get in touch
            </a>
            {/* Hamburger */}
            <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {navLinks.map((l) => (
          <button key={l.label} onClick={() => scrollTo(l.id)}
            className="text-white font-black text-3xl tracking-[0.2em] uppercase">
            {l.label}
          </button>
        ))}
        <Link href="/services" onClick={() => setOpen(false)}
          className="text-white font-black text-3xl tracking-[0.2em] uppercase">
          Services
        </Link>
        <a href="mailto:junglekabal@gmail.com"
          className="mt-4 border border-zinc-700 text-zinc-400 text-xs font-bold px-8 py-4 tracking-widest uppercase">
          Get in touch
        </a>
      </div>
    </>
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
          <a href="mailto:junglekabal@gmail.com"
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

function useCounter(target: number, inView: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return n;
}

function StatItem({ v, l, inView, delay }: { v: string; l: string; inView: boolean; delay: number }) {
  const num = parseInt(v.replace(/\D/g, ""));
  const suffix = v.replace(/[0-9]/g, "");
  const count = useCounter(num || 0, inView);
  const display = isNaN(num) || num === 0 ? v : `${count}${suffix}`;
  return (
    <div className={`flex flex-col items-center py-8 border-r border-zinc-900 last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <span className="text-white font-black text-2xl md:text-3xl tracking-tight">{display}</span>
      <span className="text-zinc-600 text-xs tracking-widest uppercase mt-1 text-center">{l}</span>
    </div>
  );
}

function Stats() {
  const { ref, inView } = useInView();
  const items = [
    { v: "10+", l: "Sites delivered" },
    { v: "100%", l: "Happy clients" },
    { v: "48h", l: "Average turnaround" },
    { v: "TH", l: "Based in Thailand" },
  ];
  return (
    <section ref={ref} className="border-y border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => <StatItem key={s.l} v={s.v} l={s.l} inView={inView} delay={i * 80} />)}
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

const TESTIMONIALS = [
  {
    quote: "They delivered our entire restaurant website in 36 hours. The design is incredible — our reservations went up 40% in the first month.",
    name: "Marc Lefebvre",
    role: "Owner, Le Palais Bangkok",
    initial: "M",
  },
  {
    quote: "I showed them one photo of my barbershop and they built exactly the vibe I had in my head. Professional, fast, no back-and-forth.",
    name: "James Okonkwo",
    role: "Founder, Barber Royale Phuket",
    initial: "J",
  },
  {
    quote: "Our nightclub needed something dark and cinematic. Kabal nailed it. Every DJ we book asks who made the site.",
    name: "Krit Tansakul",
    role: "Director, Neon Noir Bangkok",
    initial: "K",
  },
  {
    quote: "Simple brief, fast delivery, zero headaches. They even handled our domain and hosting setup. Worth every baht.",
    name: "Nadia Petrov",
    role: "Manager, Aura Spa Koh Samui",
    initial: "N",
  },
];

function Testimonials() {
  const { ref, inView } = useInView();
  return (
    <section className="py-24 md:py-32 border-t border-zinc-900">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-16">
          <p className="text-zinc-500 text-xs font-bold tracking-[0.6em] uppercase mb-3">Social proof</p>
          <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            What clients say.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name}
              className="border border-zinc-900 bg-zinc-950 p-8 hover:border-zinc-700 transition-colors duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="text-zinc-300 text-base leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-sm">{t.initial}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-zinc-500 text-xs tracking-wide">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-amber-400 text-xs">★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Kabal] New project — ${form.type || "Website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\nBudget: ${form.budget}\n\n${form.message}`
    );
    window.open(`mailto:junglekabal@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  const inputCls = "w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 transition-colors";
  const selectCls = inputCls + " appearance-none cursor-pointer";

  return (
    <section id="contact" className="py-28 md:py-36 bg-zinc-950 border-t border-zinc-900">
      <div ref={ref} className={`max-w-5xl mx-auto px-6 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div>
            <p className="text-zinc-500 text-xs font-bold tracking-[0.45em] uppercase mb-4">Start a project</p>
            <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight leading-none mb-6">
              Your site in<br /><span className="text-zinc-400">48 hours.</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-10">
              Restaurant, bar, barbershop, club, gaming — we build fast, sharp websites that convert. Tell us about your project and we'll get back to you same day.
            </p>
            <div className="space-y-4">
              {[
                { icon: "✉", label: "Email", value: "junglekabal@gmail.com", href: "mailto:junglekabal@gmail.com" },
                { icon: "📍", label: "Based in", value: "Bangkok & Pattaya, Thailand", href: null },
                { icon: "⚡", label: "Turnaround", value: "48h average delivery", href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-lg w-6 text-center">{item.icon}</span>
                  <div>
                    <p className="text-zinc-600 text-xs tracking-widest uppercase">{item.label}</p>
                    {item.href
                      ? <a href={item.href} className="text-zinc-300 text-sm hover:text-white transition-colors">{item.value}</a>
                      : <p className="text-zinc-300 text-sm">{item.value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {sent ? (
              <div className="border border-zinc-800 p-10 text-center">
                <p className="text-white font-black text-2xl mb-3">Message sent ✓</p>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">Your email client opened with the message pre-filled. We'll reply within a few hours.</p>
                <button onClick={() => setSent(false)} className="text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-white transition-colors">
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Your name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={inputCls} />
                  <input required type="email" placeholder="Your email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select required value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className={selectCls}>
                    <option value="" disabled>Project type</option>
                    {["Restaurant / Bar", "Nightclub / Lounge", "Barbershop / Salon", "Gaming / E-sport", "Spa / Wellness", "NFT / Web3", "Other"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <select value={form.budget}
                    onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                    className={selectCls}>
                    <option value="" disabled>Budget</option>
                    {["Under 15,000 THB", "15,000 – 40,000 THB", "40,000 – 100,000 THB", "100,000+ THB", "Let's discuss"].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <textarea required rows={5} placeholder="Tell us about your project — location, style, deadline..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={inputCls + " resize-none"} />
                <button type="submit"
                  className="w-full bg-white text-black font-black py-4 tracking-widest uppercase text-sm hover:bg-zinc-200 transition-colors duration-300">
                  Send message →
                </button>
                <p className="text-zinc-700 text-xs text-center">Opens your email client · Reply within same day</p>
              </form>
            )}
          </div>
        </div>
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
        <a href="mailto:junglekabal@gmail.com" className="text-zinc-600 hover:text-zinc-400 text-xs tracking-widest transition-colors">
          junglekabal@gmail.com
        </a>
      </div>
    </footer>
  );
}
