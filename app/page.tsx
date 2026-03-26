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

function useMagnetic(strength = 0.38) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = Math.max(r.width, r.height) * 1.6;
      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
      } else {
        el.style.transform = "";
      }
    };
    const onLeave = () => { el.style.transform = ""; };
    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => { window.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [strength]);
  return ref as React.RefObject<HTMLElement>;
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
        .tilt-card { transform-style: preserve-3d; transition: transform 0.15s ease, box-shadow 0.4s ease; }
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
        .live-dot { animation: live-pulse 1.8s ease-in-out infinite; }

        /* Magnetic */
        .magnetic { transition: transform 0.35s cubic-bezier(.23,1,.32,1); will-change: transform; }

        /* Quick-view */
        @keyframes qv-in {
          from { opacity: 0; transform: translateY(6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .qv-in { animation: qv-in 0.18s ease-out; }

        /* Image blur-load */
        .img-unloaded { filter: blur(14px) saturate(0.7); transform: scale(1.04); transition: filter 0.5s ease, transform 0.5s ease; }
        .img-loaded   { filter: blur(0) saturate(1); transform: scale(1); }

        /* Staggered card */
        @keyframes card-in {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .card-in { animation: card-in 0.55s cubic-bezier(.23,1,.32,1) both; }

        /* Mobile project carousel */
        @media (max-width: 767px) {
          .project-grid {
            display: flex !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
            gap: 14px;
            padding-bottom: 4px;
          }
          .project-grid::-webkit-scrollbar { display: none; }
          .project-grid > * {
            min-width: 82vw;
            scroll-snap-align: start;
            flex-shrink: 0;
          }
        }

        /* Hero */
        @keyframes orb-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes orb-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-70px, 30px) scale(0.9); }
          66% { transform: translate(50px, -60px) scale(1.15); }
        }
        @keyframes orb-drift-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        .orb-a { animation: orb-drift-a 18s ease-in-out infinite; }
        .orb-b { animation: orb-drift-b 22s ease-in-out infinite; }
        .orb-c { animation: orb-drift-c 15s ease-in-out infinite; }

        @keyframes char-reveal {
          0% { opacity: 0; transform: translateY(60%) skewY(4deg); }
          100% { opacity: 1; transform: translateY(0) skewY(0deg); }
        }
        .char-reveal { display: inline-block; animation: char-reveal 0.7s cubic-bezier(.23,1,.32,1) both; }

        @keyframes line-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .line-in { animation: line-in 0.9s cubic-bezier(.23,1,.32,1) both; }

        @keyframes badge-pop {
          0% { opacity: 0; transform: scale(0.8) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .badge-pop { animation: badge-pop 0.6s cubic-bezier(.34,1.56,.64,1) both; }

        @keyframes float-tag {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes noise-move {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          30% { transform: translate(1%, 2%); }
          50% { transform: translate(-1%, 1%); }
          70% { transform: translate(2%, -2%); }
          90% { transform: translate(-1%, 3%); }
          100% { transform: translate(0, 0); }
        }
        .noise-layer {
          position: absolute;
          inset: -20%;
          width: 140%;
          height: 140%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          opacity: 0.025;
          pointer-events: none;
          animation: noise-move 0.5s steps(1) infinite;
        }

        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.4; }
        }
        .scroll-bounce { animation: scroll-bounce 2s ease-in-out infinite; }

        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-marquee { animation: marquee-slow 30s linear infinite; }
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
  const magCta1 = useMagnetic(0.32);
  const magCta2 = useMagnetic(0.32);
  const heroRef = useRef<HTMLElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);
  const orbCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: W, innerHeight: H } = window;
      const rx = (e.clientX / W - 0.5);
      const ry = (e.clientY / H - 0.5);
      if (orbARef.current) orbARef.current.style.transform = `translate(${rx * 40}px, ${ry * 30}px)`;
      if (orbBRef.current) orbBRef.current.style.transform = `translate(${-rx * 60}px, ${-ry * 45}px)`;
      if (orbCRef.current) orbCRef.current.style.transform = `translate(${rx * 25}px, ${ry * 50}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const word1 = "Websites".split("");
  const word2 = "That Win.".split("");

  const floatTags = [
    { label: "Restaurant", x: "8%", y: "22%", delay: "0s", dur: "6s" },
    { label: "Nightclub", x: "82%", y: "18%", delay: "1.5s", dur: "7s" },
    { label: "Barbershop", x: "6%", y: "72%", delay: "0.8s", dur: "8s" },
    { label: "Spa & Wellness", x: "78%", y: "68%", delay: "2s", dur: "5.5s" },
    { label: "NFT & Web3", x: "50%", y: "82%", delay: "1s", dur: "9s" },
    { label: "E-Sport", x: "72%", y: "42%", delay: "0.3s", dur: "7.5s" },
  ];

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Noise texture */}
      <div className="noise-layer z-[1]" />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

      {/* Gradient orbs */}
      <div ref={orbARef} className="orb-a absolute top-[15%] left-[10%] w-[600px] h-[500px] rounded-full pointer-events-none z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.055) 0%, transparent 70%)", transition: "transform 0.8s cubic-bezier(.23,1,.32,1)" }} />
      <div ref={orbBRef} className="orb-b absolute bottom-[10%] right-[5%] w-[500px] h-[400px] rounded-full pointer-events-none z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(120,80,255,0.07) 0%, transparent 70%)", transition: "transform 0.8s cubic-bezier(.23,1,.32,1)" }} />
      <div ref={orbCRef} className="orb-c absolute top-[55%] left-[40%] w-[400px] h-[300px] rounded-full pointer-events-none z-[2]"
        style={{ background: "radial-gradient(ellipse, rgba(255,180,50,0.045) 0%, transparent 70%)", transition: "transform 0.8s cubic-bezier(.23,1,.32,1)" }} />

      {/* Floating background tags */}
      {floatTags.map((t) => (
        <div key={t.label}
          className="absolute hidden md:block pointer-events-none select-none z-[3]"
          style={{
            left: t.x, top: t.y,
            animation: `float-tag ${t.dur} ease-in-out ${t.delay} infinite`,
            opacity: mounted ? 1 : 0,
            transition: "opacity 1.5s ease",
            transitionDelay: "0.8s",
          }}>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/8 border border-white/8 px-3 py-1.5 backdrop-blur-sm">
            {t.label}
          </span>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">

        {/* Badge */}
        <div className="flex items-center justify-center mb-10"
          style={{ opacity: mounted ? 1 : 0, animation: mounted ? "badge-pop 0.6s cubic-bezier(.34,1.56,.64,1) 0.1s both" : "none" }}>
          <div className="flex items-center gap-2.5 border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 live-dot" />
            <span className="text-zinc-400 text-[10px] font-bold tracking-[0.4em] uppercase">Website Agency · Bangkok & Pattaya</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-black leading-[0.9] mb-8 select-none overflow-hidden" style={{ fontSize: "clamp(4.5rem,16vw,14rem)", letterSpacing: "-0.05em" }}>
          {/* Line 1 — shimmer chars */}
          <div className="overflow-hidden block">
            <div>
              {word1.map((ch, i) => (
                <span key={i} className="char-reveal shimmer-text"
                  style={{ animationDelay: mounted ? `${0.3 + i * 0.045}s` : "9999s", animationFillMode: "both" }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </div>
          </div>
          {/* Line 2 — white chars */}
          <div className="overflow-hidden block">
            <div>
              {word2.map((ch, i) => (
                <span key={i} className="char-reveal text-white"
                  style={{ animationDelay: mounted ? `${0.5 + i * 0.05}s` : "9999s", animationFillMode: "both" }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </div>
          </div>
        </h1>

        {/* Subtitle */}
        <div className="line-in overflow-hidden mb-12" style={{ animationDelay: mounted ? "0.95s" : "9999s" }}>
          <p className="text-zinc-500 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">
            Restaurants, clubs, barbershops — we launch in{" "}
            <span className="text-zinc-200 font-semibold">48 hours</span>, built to convert.
          </p>
        </div>

        {/* CTAs */}
        <div className="line-in flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: mounted ? "1.1s" : "9999s" }}>
          <button ref={magCta1 as React.RefObject<HTMLButtonElement>}
            onClick={() => document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })}
            className="magnetic group relative overflow-hidden bg-white text-black font-black px-10 py-4 tracking-widest uppercase text-sm hover:scale-105 transition-[box-shadow,opacity] duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]">
            <span className="relative z-10">View projects</span>
          </button>
          <a ref={magCta2 as React.RefObject<HTMLAnchorElement>}
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="magnetic group relative overflow-hidden border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300">
            <span className="relative z-10">Work with us</span>
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 1s ease 1.5s" }}>
        <span className="text-zinc-700 text-[9px] font-bold tracking-[0.4em] uppercase">Scroll</span>
        <div className="scroll-bounce w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[4]" />
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
  const [prevCategory, setPrevCategory] = useState(activeCategory);
  const [gridKey, setGridKey] = useState(0);

  // Re-trigger stagger when filter changes
  useEffect(() => {
    if (prevCategory !== activeCategory) {
      setPrevCategory(activeCategory);
      setGridKey(k => k + 1);
    }
  }, [activeCategory, prevCategory]);

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

        <div ref={ref} key={gridKey} className="project-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} inView={inView} />
          ))}
        </div>

        {/* Mobile swipe hint */}
        <p className="md:hidden text-center text-zinc-700 text-[10px] tracking-widest uppercase mt-4">
          Swipe to browse →
        </p>
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

function ProjectCard({ project: p, index, inView }: { project: typeof PROJECTS[0]; index: number; inView: boolean }) {
  const isExternal = p.liveUrl.startsWith("http");
  const cardProps = isExternal
    ? { href: p.liveUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: p.liveUrl };
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    el.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(0,0,0,.5)`;
  };
  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
    setHovered(false);
  };

  return (
    <div className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
    <Link {...cardProps} ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group tilt-card block relative overflow-hidden bg-zinc-950 border border-zinc-900 hover:border-zinc-700 card-in`}
      style={{
        animationDelay: inView ? `${index * 75}ms` : "9999s",
        animationPlayState: inView ? "running" : "paused",
        borderColor: hovered ? `${p.accent}55` : undefined,
      }}>

      {/* Header */}
      <div className="relative h-52 overflow-hidden">
        {p.cardType === "cards" ? (
          <CardsHeader accent={p.accent} />
        ) : (
          <>
            {p.photo && (
              <img src={p.photo} alt={p.name}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 ${imgLoaded ? "img-loaded" : "img-unloaded"}`}
                onLoad={() => setImgLoaded(true)}
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

        <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 tracking-widest uppercase z-10 flex items-center gap-1.5 ${p.status === "Live" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}>
          {p.status === "Live" && <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />}
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

    {/* Quick-view overlay — desktop only */}
    {hovered && (
      <div className="qv-in absolute left-0 right-0 -bottom-1 z-20 pointer-events-none hidden md:block">
        <div className="mx-1 border border-zinc-700 bg-zinc-900/95 backdrop-blur-sm p-4 shadow-2xl"
          style={{ borderTopColor: p.accent }}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${p.accentText}`}>{p.category}</span>
            <span className="text-zinc-600 text-[10px]">{p.location}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 border border-zinc-700 text-zinc-400">{t}</span>
            ))}
          </div>
          <p className={`text-[10px] font-bold tracking-widest uppercase mt-3 ${p.accentText}`}>
            Open site →
          </p>
        </div>
      </div>
    )}
    </div>
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
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(a => (a + 1) % TESTIMONIALS.length);
        setFading(false);
      }, 350);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section className="py-24 md:py-32 border-t border-zinc-900">
      <div ref={ref} className={`max-w-4xl mx-auto px-6 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-16">
          <p className="text-zinc-500 text-xs font-bold tracking-[0.6em] uppercase mb-3">Social proof</p>
          <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            What clients say.
          </h2>
        </div>

        {/* Rotating testimonial */}
        <div className="relative border border-zinc-900 bg-zinc-950 p-8 md:p-12 text-center min-h-[220px] flex flex-col justify-between"
          style={{ transition: "border-color 0.5s ease", borderColor: "#27272a" }}>
          <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.35s ease", transform: fading ? "translateY(6px)" : "translateY(0)" }}>
            <div className="flex gap-0.5 justify-center mb-6">
              {[...Array(5)].map((_, s) => <span key={s} className="text-amber-400 text-sm">★</span>)}
            </div>
            <p className="text-zinc-200 text-lg md:text-xl leading-relaxed mb-8 font-light">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">{t.initial}</span>
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-zinc-500 text-xs tracking-wide">{t.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => { setFading(true); setTimeout(() => { setActive(i); setFading(false); }, 350); }}
              className="transition-all duration-300"
              style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? "#fff" : "#3f3f46", borderRadius: 3 }} />
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
