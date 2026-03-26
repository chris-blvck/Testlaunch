"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

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

const PROJECTS: Record<string, ProjectData> = {
  "le-palais": {
    name: "Le Palais",
    category: "Fine Dining",
    location: "Bangkok, Thailand",
    year: "2025",
    tagline: "French excellence in the heart of Bangkok",
    description: "High-end showcase website for Le Palais, a French gastronomic restaurant in Bangkok. The visual identity plays on golden gradients, elegant serif typography and subtle animations to reflect the refinement of the establishment.",
    challenge: "Create a digital presence that captures the intimate atmosphere of a starred restaurant, while remaining fast and mobile-friendly for an international clientele.",
    solution: "Custom classic template with an amber/gold palette, interactive gastronomic menu, chef section and WhatsApp-integrated reservation form.",
    services: ["UI/UX Design", "Next.js Development", "WhatsApp Integration", "Local SEO"],
    tags: ["Restaurant", "Luxury", "French", "Bangkok"],
    gradient: "from-amber-950 via-stone-950 to-black",
    gradientLight: "from-amber-900/30 to-transparent",
    accent: "#d97706",
    accentText: "text-amber-500",
    accentBg: "bg-amber-500",
    accentBorder: "border-amber-500/30",
    accentBgLight: "bg-amber-500/10",
    shapes: [
      { w: 300, h: 300, x: "80%", y: "10%", blur: 80, opacity: 0.15 },
      { w: 200, h: 200, x: "10%", y: "60%", blur: 60, opacity: 0.1 },
    ],
    mockupLines: [
      "TASTING MENU · 7 COURSES",
      "Foie Gras Poêlé · Breton Lobster",
      "Wagyu Beef Fillet · Tartuffo",
      "Reservations: +66 2 xxx xxxx",
    ],
    status: "Preview",
  },
  "barber-royale": {
    name: "Barber Royale",
    category: "Luxury Barbershop",
    location: "Phuket, Thailand",
    year: "2025",
    tagline: "The art of the shave, elevated",
    description: "Prestige web identity for Barber Royale, a luxury barbershop in Phuket. A dark design with gold accents, full-screen photo gallery and instant WhatsApp booking.",
    challenge: "Stand out in a highly competitive market by immediately conveying a sense of prestige and trust from the very first visit.",
    solution: "Custom barber template with scroll animations, before/after gallery, clear pricing grid and floating WhatsApp CTA to maximise conversions.",
    services: ["UI/UX Design", "Next.js Development", "Photo Gallery", "WhatsApp CTA"],
    tags: ["Barbershop", "Gold", "Premium", "Phuket"],
    gradient: "from-yellow-950 via-zinc-900 to-black",
    gradientLight: "from-yellow-900/30 to-transparent",
    accent: "#ca8a04",
    accentText: "text-yellow-500",
    accentBg: "bg-yellow-500",
    accentBorder: "border-yellow-500/30",
    accentBgLight: "bg-yellow-500/10",
    shapes: [
      { w: 350, h: 350, x: "75%", y: "5%", blur: 100, opacity: 0.12 },
      { w: 250, h: 250, x: "5%", y: "55%", blur: 70, opacity: 0.08 },
    ],
    mockupLines: [
      "BARBER ROYALE · PHUKET",
      "Classic Shave · 600 THB",
      "Hair Cut + Beard · 900 THB",
      "Premium Package · 1 500 THB",
    ],
    status: "Preview",
  },
  "blue-lagoon": {
    name: "Blue Lagoon Beach Bar",
    category: "Beach Bar & Restaurant",
    location: "Koh Samui, Thailand",
    year: "2026",
    tagline: "Cocktails, sunsets & Koh Samui vibes",
    description: "One-page site for Blue Lagoon, a beachfront bar & restaurant on Koh Samui. Fresh tropical design with cyan/blue gradients, atmosphere gallery and illustrated cocktail menu.",
    challenge: "Capture the energy of an outdoor-focused venue and translate it to tourists searching for THE spot on their phones under the sun.",
    solution: "Immersive mobile-first design, full-bleed photos, scrollable cocktail menu, events section and Google Maps location widget.",
    services: ["UI/UX Design", "Mobile-first", "Google Maps", "Cocktail Menu"],
    tags: ["Beach Bar", "Tropical", "Cocktails", "Koh Samui"],
    gradient: "from-cyan-950 via-blue-950 to-black",
    gradientLight: "from-cyan-900/30 to-transparent",
    accent: "#0891b2",
    accentText: "text-cyan-500",
    accentBg: "bg-cyan-500",
    accentBorder: "border-cyan-500/30",
    accentBgLight: "bg-cyan-500/10",
    shapes: [
      { w: 400, h: 200, x: "70%", y: "15%", blur: 90, opacity: 0.2 },
      { w: 300, h: 300, x: "0%", y: "50%", blur: 80, opacity: 0.12 },
    ],
    mockupLines: [
      "BLUE LAGOON · KOH SAMUI",
      "Blue Lagoon Mojito · 220 THB",
      "Sunset Aperol Spritz · 260 THB",
      "Happy Hour: 16:00 – 19:00",
    ],
    status: "Preview",
  },
  "zen-garden": {
    name: "Zen Garden",
    category: "Japanese Restaurant",
    location: "Chiang Mai, Thailand",
    year: "2026",
    tagline: "Omakase · Silence · Perfection",
    description: "Minimalist web experience for Zen Garden, an authentic Japanese restaurant in Chiang Mai. Clean black/white design with subtle lime accents, omakase menu and exclusive limited-seat reservations.",
    challenge: "Translate the restaurant's philosophy — less is more — into a digital interface that is both understated, refined and fully functional.",
    solution: "Minimal template with wide whitespace, fine typography, very light scroll animations and an exclusive reservation form with manual confirmation.",
    services: ["UI/UX Design", "Minimal Design", "Custom Reservation", "SEO"],
    tags: ["Japanese", "Minimal", "Omakase", "Chiang Mai"],
    gradient: "from-stone-900 via-zinc-900 to-black",
    gradientLight: "from-lime-900/20 to-transparent",
    accent: "#84cc16",
    accentText: "text-lime-500",
    accentBg: "bg-lime-500",
    accentBorder: "border-lime-500/30",
    accentBgLight: "bg-lime-500/10",
    shapes: [
      { w: 250, h: 250, x: "80%", y: "20%", blur: 80, opacity: 0.1 },
      { w: 200, h: 200, x: "5%", y: "60%", blur: 60, opacity: 0.07 },
    ],
    mockupLines: [
      "ZEN GARDEN · CHIANG MAI",
      "Omakase 12 courses · 2 800 THB",
      "Sake Pairing available",
      "Reservation: 7 days in advance",
    ],
    status: "Preview",
  },
};

type ProjectData = {
  name: string;
  category: string;
  location: string;
  year: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  services: string[];
  tags: string[];
  gradient: string;
  gradientLight: string;
  accent: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentBgLight: string;
  shapes: { w: number; h: number; x: string; y: string; blur: number; opacity: number }[];
  mockupLines: string[];
  status: string;
};

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = PROJECTS[slug];
  if (!project) notFound();

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
      `}</style>

      <Navbar accentText={project.accentText} />

      {/* Hero */}
      <section className={`relative min-h-screen flex flex-col justify-end overflow-hidden bg-gradient-to-br ${project.gradient}`}>
        {project.shapes.map((s, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ width: s.w, height: s.h, left: s.x, top: s.y, background: project.accent, filter: `blur(${s.blur}px)`, opacity: s.opacity }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className={`relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-40 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-bold tracking-widest uppercase mb-10 transition-colors">
            <span>←</span> Portfolio
          </Link>
          <p className={`text-xs font-bold tracking-[0.45em] uppercase mb-4 ${project.accentText}`}>{project.category}</p>
          <h1 className="text-white font-black leading-none mb-4" style={{ fontSize: "clamp(3.5rem,10vw,8rem)", letterSpacing: "-0.04em" }}>
            {project.name}
          </h1>
          <p className="text-zinc-300 text-xl md:text-2xl font-light max-w-2xl">{project.tagline}</p>

          <div className="flex flex-wrap items-center gap-6 mt-10">
            <div>
              <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Location</p>
              <p className="text-white font-semibold text-sm">{project.location}</p>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div>
              <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Year</p>
              <p className="text-white font-semibold text-sm">{project.year}</p>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div>
              <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Status</p>
              <span className={`text-xs font-bold px-3 py-1 tracking-widest uppercase ${project.status === "Live" ? "bg-green-500/20 text-green-400 border border-green-500/30" : `${project.accentBgLight} ${project.accentText} border ${project.accentBorder}`}`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mockup preview */}
      <MockupSection project={project} />

      {/* Details */}
      <Details project={project} />

      {/* Services */}
      <Services project={project} />

      {/* Next project */}
      <NextProject current={slug} />

      <Footer />
    </div>
  );
}

function MockupSection({ project }: { project: ProjectData }) {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className={`py-24 bg-zinc-950 border-y border-zinc-900 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative rounded-none border border-zinc-800 overflow-hidden bg-gradient-to-br ${project.gradient}`} style={{ minHeight: 320 }}>
          {/* Browser chrome */}
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="flex-1 mx-4 bg-zinc-800 rounded-sm h-5 flex items-center px-3">
              <span className="text-zinc-500 text-xs font-mono">kabal.website/{project.name.toLowerCase().replace(/\s+/g, "-")}</span>
            </div>
          </div>

          {/* Fake content */}
          <div className="relative p-8 md:p-16 flex flex-col items-center justify-center min-h-[260px] text-center overflow-hidden">
            {project.shapes.slice(0, 1).map((s, i) => (
              <div key={i} className="absolute rounded-full pointer-events-none"
                style={{ width: s.w * 0.6, height: s.h * 0.6, right: 0, top: 0, background: project.accent, filter: `blur(${s.blur}px)`, opacity: s.opacity * 1.5 }} />
            ))}
            <p className={`text-xs font-bold tracking-[0.4em] uppercase mb-4 ${project.accentText}`}>{project.category.toUpperCase()}</p>
            <h2 className="text-white font-black text-4xl md:text-6xl tracking-tight mb-6 relative z-10">{project.name}</h2>
            <p className="text-zinc-400 text-sm mb-8 tracking-widest">{project.tagline}</p>
            <div className="space-y-2 w-full max-w-sm">
              {project.mockupLines.map((line, i) => (
                <div key={i} className={`border ${project.accentBorder} ${project.accentBgLight} px-4 py-2`}>
                  <p className="text-zinc-300 text-xs font-mono tracking-wide">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Details({ project }: { project: ProjectData }) {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className={`py-28 bg-black transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className={`text-xs font-bold tracking-[0.45em] uppercase mb-3 ${project.accentText}`}>The project</p>
          <h2 className="text-white font-black text-3xl md:text-4xl tracking-tight leading-tight mb-6">{project.description}</h2>
          <div className="flex flex-wrap gap-2 mt-8">
            {project.tags.map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 border border-zinc-800 text-zinc-500 tracking-wide">{t}</span>
            ))}
          </div>
        </div>
        <div className="space-y-10">
          <div>
            <p className="text-zinc-500 text-xs font-bold tracking-[0.35em] uppercase mb-3">The challenge</p>
            <p className="text-zinc-300 leading-relaxed">{project.challenge}</p>
          </div>
          <div className={`border-l-2 pl-6`} style={{ borderColor: project.accent }}>
            <p className="text-zinc-500 text-xs font-bold tracking-[0.35em] uppercase mb-3">Our approach</p>
            <p className="text-zinc-300 leading-relaxed">{project.solution}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ project }: { project: ProjectData }) {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className={`py-16 bg-zinc-950 border-y border-zinc-900 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-zinc-600 text-xs tracking-widest uppercase text-center mb-8">Services delivered</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {project.services.map((s, i) => (
            <div key={s} className="flex items-center gap-4"
              style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="text-zinc-300 font-semibold text-sm tracking-wide">{s}</span>
              {i < project.services.length - 1 && <span className="w-1 h-1 rounded-full bg-zinc-700" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NextProject({ current }: { current: string }) {
  const slugs = Object.keys(PROJECTS);
  const currentIndex = slugs.indexOf(current);
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];
  const next = PROJECTS[nextSlug];
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className={`py-28 bg-black transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-zinc-600 text-xs tracking-widest uppercase mb-8 text-center">Next project</p>
        <Link href={`/portfolio/${nextSlug}`}
          className={`group block relative overflow-hidden border border-zinc-900 hover:border-zinc-700 transition-all duration-300 bg-gradient-to-r ${next.gradient} p-12 md:p-16`}>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className={`text-xs font-bold tracking-[0.4em] uppercase mb-2 ${next.accentText}`}>{next.category}</p>
              <h3 className="text-white font-black text-3xl md:text-5xl tracking-tight">{next.name}</h3>
              <p className="text-zinc-500 text-sm mt-2">{next.location} · {next.year}</p>
            </div>
            <span className="text-white text-4xl font-light group-hover:translate-x-3 transition-transform duration-300">→</span>
          </div>
        </Link>
        <div className="mt-8 text-center">
          <Link href="/" className="text-zinc-600 hover:text-zinc-400 text-xs font-bold tracking-widest uppercase transition-colors">
            ← All projects
          </Link>
        </div>
      </div>
    </section>
  );
}

function Navbar({ accentText }: { accentText: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-md border-b border-zinc-900" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white flex items-center justify-center">
              <span className="text-black font-black text-xs tracking-tighter">K</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black tracking-[0.2em] uppercase text-sm">Kabal</span>
              <span className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase">Website Agency</span>
            </div>
          </div>
        </Link>
        <Link href="/"
          className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.25em] uppercase transition-colors">
          ← Portfolio
        </Link>
        <a href="mailto:hello@kabal.website"
          className="border border-zinc-700 hover:border-white text-zinc-300 hover:text-white text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-all duration-300">
          Contact
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white flex items-center justify-center">
            <span className="text-black font-black text-xs tracking-tighter">K</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black tracking-[0.2em] uppercase text-sm">Kabal</span>
            <span className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase">Website Agency</span>
          </div>
        </div>
        <p className="text-zinc-700 text-xs tracking-widest">© 2026 Kabal Website Agency · Bangkok & Pattaya</p>
        <a href="mailto:hello@kabal.website" className="text-zinc-600 hover:text-zinc-400 text-xs tracking-widest transition-colors">
          hello@kabal.website
        </a>
      </div>
    </footer>
  );
}
