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

const NAV_LINKS = ["Menu", "Gallery", "Reservations", "Location"];

const DISHES = [
  {
    title: "Foie Gras Poêlé",
    subtitle: "",
    tag: "SIGNATURE",
    desc: "Pan-seared duck foie gras resting on a delicate brioche toast, accompanied by a caramelized fig compote and a port wine reduction. A timeless French classic elevated to perfection.",
    details: ["Duck foie gras", "Caramelised fig compote", "Port wine reduction", "Toasted brioche"],
    img: "https://images.pexels.com/photos/6880221/pexels-photo-6880221.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Homard Breton",
    subtitle: "Breton Lobster",
    tag: "CHEF'S SELECTION",
    desc: "Whole Breton lobster poached à la nage with aromatic vegetables, finished with a cognac-infused bisque, cauliflower mousseline and Oscietra caviar. The jewel of the Atlantic, brought to the heart of Bangkok.",
    details: ["Live Breton lobster — imported daily", "Cognac lobster bisque", "Cauliflower mousseline", "Oscietra caviar garnish"],
    img: "https://images.pexels.com/photos/5555878/pexels-photo-5555878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Crème Brûlée Vanille",
    subtitle: "",
    tag: "DESSERT",
    desc: "A quivering vanilla custard made with Madagascan Bourbon vanilla, crowned with a gossamer layer of caramelised raw cane sugar. Served with a shortbread tuile and fresh seasonal berries.",
    details: ["Madagascan Bourbon vanilla", "Raw cane sugar crust", "Shortbread tuile", "Fresh seasonal berries"],
    img: "https://images.pexels.com/photos/5638511/pexels-photo-5638511.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const GALLERY_IMGS = [
  { src: "https://images.pexels.com/photos/1872892/pexels-photo-1872892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "The dining room" },
  { src: "https://images.pexels.com/photos/156650/pexels-photo-156650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Elegant table setting" },
  { src: "https://images.pexels.com/photos/7243885/pexels-photo-7243885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Artful plating" },
  { src: "https://images.pexels.com/photos/7474048/pexels-photo-7474048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Chef at work" },
  { src: "https://images.pexels.com/photos/341045/pexels-photo-341045.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Wine cellar" },
  { src: "https://images.pexels.com/photos/2290737/pexels-photo-2290737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Private dining" },
];

const TASTING_COURSES = [
  { num: "I", name: "Amuse-Bouche", desc: "Chef's daily inspiration" },
  { num: "II", name: "Foie Gras Poêlé", desc: "Caramelised fig · port wine reduction" },
  { num: "III", name: "Velouté de Homard", desc: "Brittany lobster bisque · saffron cream" },
  { num: "IV", name: "Granite de Champagne", desc: "Palate cleanser" },
  { num: "V", name: "Filet de Boeuf Rossini", desc: "Wagyu beef · truffle · Madeira jus" },
  { num: "VI", name: "Sélection de Fromages", desc: "Artisan French cheeses · walnut bread" },
  { num: "VII", name: "Crème Brûlée Vanille", desc: "Madagascan vanilla · seasonal berries" },
];

export default function LePalaisPage() {
  const [mode, setMode] = useState<"compact" | "full">("compact");
  return (
    <div className="bg-black min-h-screen text-center">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #d97706; }
        .playfair { font-family: var(--font-playfair), 'Playfair Display', Georgia, serif; }
        @keyframes shimmer { 0%,100% { text-shadow: 0 0 30px rgba(217,119,6,.3); } 50% { text-shadow: 0 0 60px rgba(217,119,6,.7), 0 0 120px rgba(217,119,6,.2); } }
        .gold-shimmer { animation: shimmer 4s ease-in-out infinite; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes img-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(217,119,6,0); } 50% { box-shadow: 0 0 40px 4px rgba(217,119,6,.15); } }
        .dish-img:hover { transform: scale(1.03); }
        .dish-img { transition: transform .7s cubic-bezier(.16,1,.3,1); }
      `}</style>
      <Navbar mode={mode} setMode={setMode} />
      <Hero />
      <Marquee />
      <StatsBar />
      <SignatureDishes />
      {mode === "full" && <Gallery />}
      {mode === "full" && <TastingMenu />}
      <Location />
      <Footer />
    </div>
  );
}

function Marquee() {
  const items = ["Fine Dining", "Paris · Bangkok", "3 Michelin Stars", "Chef Laurent Dubois", "Wine Cellar", "Private Dining", "Tasting Menu", "French Excellence"];
  const all = [...items, ...items];
  return (
    <div className="overflow-hidden border-y py-3" style={{ borderColor: "#d9770622", background: "#050300" }}>
      <div style={{ display: "flex", gap: "3rem", width: "max-content", animation: "marquee 30s linear infinite" }}>
        {all.map((item, i) => (
          <span key={i} className="text-[10px] font-bold tracking-[0.45em] uppercase whitespace-nowrap flex items-center gap-3"
            style={{ color: i % 2 === 0 ? "#d97706" : "#78400a" }}>
            {item}{i % 2 === 0 && <span style={{ color: "#d97706", opacity: 0.4 }}>◆</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <span className="playfair text-2xl italic font-bold" style={{ color: "#d97706", letterSpacing: "0.04em" }}>
      Le Palais
    </span>
  );
}

function Navbar({ mode, setMode }: { mode: "compact" | "full"; setMode: (m: "compact" | "full") => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-md border-b border-zinc-900" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => go(l.toLowerCase())}
                className="text-zinc-400 hover:text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase transition-colors">
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center border border-zinc-800 overflow-hidden">
              {(["compact", "full"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className="text-[9px] font-bold px-2.5 py-1.5 tracking-widest uppercase transition-all duration-200"
                  style={{ background: mode === m ? "#d97706" : "transparent", color: mode === m ? "#000" : "#52525b" }}>
                  {m}
                </button>
              ))}
            </div>
            <button onClick={() => go("reservations")}
              className="hidden md:block bg-amber-600 hover:bg-amber-500 text-black text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-colors">
              Book a Table
            </button>
            <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>
      <div className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {NAV_LINKS.map((l) => (
          <button key={l} onClick={() => go(l.toLowerCase())}
            className="playfair text-white italic font-bold text-3xl tracking-wide">{l}</button>
        ))}
      </div>
    </>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-center">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3859234/pexels-photo-3859234.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
          className="w-full h-full object-cover scale-105"
          style={{ opacity: 0.45 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, black 80%), linear-gradient(to bottom, black/30, transparent 40%, black)" }} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(217,119,6,0.08)" }} />

      <div className={`relative z-10 px-6 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-amber-500 text-xs font-bold tracking-[0.6em] uppercase mb-8">BANGKOK · THAILAND</p>

        <h1 className="playfair gold-shimmer text-white font-black leading-none mb-6 select-none"
          style={{ fontSize: "clamp(4rem,16vw,12rem)", letterSpacing: "0.06em" }}>
          LE PALAIS
        </h1>

        <p className="text-zinc-300 text-lg md:text-xl tracking-widest mb-12"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>
          French Excellence in the Heart of Bangkok
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden text-black font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300"
            style={{ background: "#d97706" }}
            onMouseEnter={(e) => { (e.currentTarget.style.background = "#b45309"); }}
            onMouseLeave={(e) => { (e.currentTarget.style.background = "#d97706"); }}>
            View Menu
          </button>
          <button
            onClick={() => document.getElementById("reservations")?.scrollIntoView({ behavior: "smooth" })}
            className="border text-zinc-300 hover:text-white hover:border-amber-500 font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300"
            style={{ borderColor: "#52525b" }}>
            Reserve a Table
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 mx-auto animate-pulse"
          style={{ background: "linear-gradient(to bottom, rgba(217,119,6,0.6), transparent)" }} />
      </div>
    </section>
  );
}

function StatsBar() {
  const { ref, inView } = useInView();
  const items = [
    { v: "3 Michelin Stars", l: "International recognition" },
    { v: "Est. 2022", l: "Founded in Bangkok" },
    { v: "Chef Laurent Dubois", l: "Executive Chef" },
    { v: "Open Tue–Sun", l: "19:00 – 23:00" },
  ];
  return (
    <section ref={ref} className="bg-zinc-950 border-y border-zinc-900 text-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <div key={s.v}
            className={`flex flex-col items-center py-8 border-r border-zinc-900 last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="font-black text-lg md:text-xl tracking-tight playfair" style={{ color: "#d97706" }}>{s.v}</span>
            <span className="text-zinc-600 text-xs tracking-widest uppercase mt-1 text-center">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SignatureDishes() {
  return (
    <section id="menu" className="bg-black py-28 md:py-36 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel label="À la carte" title="Signature Dishes" />
        <div className="mt-24 space-y-28">
          {DISHES.map((dish, i) => <DishBlock key={dish.title} dish={dish} flip={i % 2 !== 0} />)}
        </div>
      </div>
    </section>
  );
}

function DishBlock({ dish, flip }: { dish: typeof DISHES[0]; flip: boolean }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref}
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <div className={`relative aspect-[4/3] overflow-hidden bg-zinc-900 group ${flip ? "md:order-2" : ""}`}
        style={{ boxShadow: "0 0 0 1px #d9770618" }}>
        <img src={dish.img} alt={dish.title}
          className="dish-img w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "inset 0 0 40px rgba(217,119,6,.2)" }} />
        <span className="absolute top-4 left-4 text-black text-xs font-bold px-3 py-1 tracking-widest uppercase"
          style={{ background: "#d97706" }}>{dish.tag}</span>
      </div>
      <div className={`text-center ${flip ? "md:order-1" : ""}`}>
        <h3 className="playfair text-white font-bold text-3xl md:text-4xl mb-1" style={{ fontStyle: "italic" }}>{dish.title}</h3>
        {dish.subtitle && (
          <p className="text-amber-600/70 text-xs tracking-widest uppercase mb-5">{dish.subtitle}</p>
        )}
        {!dish.subtitle && <div className="mb-5" />}
        <p className="text-zinc-400 leading-relaxed mb-8 max-w-md mx-auto">{dish.desc}</p>
        <div className="inline-block text-left space-y-3 border-l-2 pl-5" style={{ borderColor: "#d97706" }}>
          {dish.details.map((d) => (
            <div key={d} className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#d97706" }} />
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
    <section id="gallery" className="bg-zinc-950 py-28 md:py-36 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel label="The Ambiance" title="Inside Le Palais" />
        <div ref={ref}
          className={`mt-16 grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px] gap-2 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {GALLERY_IMGS.map((img, i) => (
            <div key={img.src}
              className="relative overflow-hidden group bg-zinc-900"
              style={{ transitionDelay: `${i * 60}ms` }}>
              <img src={img.src} alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="absolute inset-0 transition-colors duration-300 group-hover:bg-black/40" style={{ background: "rgba(0,0,0,0)" }} />
              <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-white text-xs translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent text-center">
                {img.alt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TastingMenu() {
  const { ref, inView } = useInView();
  return (
    <section id="reservations" className="bg-black py-28 md:py-36 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <SectionLabel label="Tasting Experience" title="Menu Dégustation" />
        <div ref={ref}
          className={`mt-16 border transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ borderColor: "#d97706", background: "linear-gradient(to bottom, rgba(217,119,6,0.05), rgba(0,0,0,0.8))" }}>
          <div className="px-8 py-10 md:px-14 md:py-12">
            <p className="text-amber-500 text-xs font-bold tracking-[0.5em] uppercase mb-2">7 Courses</p>
            <h2 className="playfair text-white font-bold text-3xl md:text-4xl mb-8" style={{ fontStyle: "italic" }}>
              MENU DÉGUSTATION
            </h2>
            <div className="w-16 h-px mx-auto mb-10" style={{ background: "#d97706" }} />

            <div className="space-y-6 mb-10">
              {TASTING_COURSES.map((course, i) => (
                <div key={course.num}
                  className={`flex items-start gap-5 text-left transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                  style={{ transitionDelay: `${i * 80 + 200}ms` }}>
                  <span className="playfair font-bold text-sm shrink-0 w-6" style={{ color: "#d97706" }}>{course.num}</span>
                  <div className="flex-1 border-b border-zinc-900 pb-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="playfair text-white font-semibold text-base">{course.name}</span>
                    </div>
                    <p className="text-zinc-500 text-xs mt-1 tracking-wide">{course.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-16 h-px mx-auto mb-8" style={{ background: "#d97706" }} />

            <div className="mb-10 text-center">
              <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">Per person</p>
              <p className="playfair text-white font-black text-5xl" style={{ color: "#d97706" }}>4 200 ฿</p>
              <p className="text-zinc-600 text-xs mt-2 tracking-wide">Wine pairing available · +2 200 ฿</p>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById("location");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block text-black font-bold px-12 py-4 tracking-widest uppercase text-sm transition-all duration-300 hover:opacity-90"
              style={{ background: "#d97706" }}>
              Reserve Your Table
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="bg-zinc-950 py-28 md:py-36 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel label="Find Us" title="Located in Bangkok" />
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start text-left">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Address</p>
                <p className="text-white font-semibold text-sm playfair">Le Palais</p>
                <p className="text-zinc-400 text-sm mt-1">Silom Road, Bang Rak</p>
                <p className="text-zinc-500 text-sm">Bangkok 10500, Thailand</p>
              </div>
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Opening Hours</p>
                <p className="text-white font-bold text-sm">Tuesday – Sunday</p>
                <p className="text-zinc-400 text-sm mt-1">19:00 – 23:00</p>
                <p className="text-zinc-600 text-xs mt-1">Closed Mondays</p>
              </div>
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Reservations</p>
                <p className="text-zinc-300 text-sm">+66 (0)2 000 0000</p>
                <p className="text-zinc-300 text-sm">contact@lepalais.th</p>
              </div>
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Dress Code</p>
                <p className="text-zinc-300 text-sm">Smart elegant</p>
                <p className="text-zinc-500 text-xs mt-1">Casual attire not permitted</p>
              </div>
            </div>
            <div className="border border-zinc-800 px-6 py-5">
              <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-2">Important Notice</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We kindly request that reservations be made at least 48 hours in advance.
                A credit card is required to secure your booking.
              </p>
            </div>
          </div>
          <div className="aspect-video overflow-hidden border border-zinc-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7750!2d100.5018!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sth!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(88%) contrast(80%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Le Palais — Bangkok"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 mb-5">
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, #d97706aa)" }} />
        <p className="text-amber-500 text-[10px] font-bold tracking-[0.55em] uppercase">{label}</p>
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, #d97706aa)" }} />
      </div>
      <h2 className="playfair text-white font-bold text-5xl md:text-6xl leading-tight"
        style={{ fontStyle: "italic" }}>{title}</h2>
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, #d97706)" }} />
        <span style={{ color: "#d97706", fontSize: "7px" }}>◆</span>
        <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #d97706)" }} />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-10 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button key={l}
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="text-zinc-600 hover:text-amber-400 text-xs tracking-widest uppercase transition-colors">
              {l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/le-palais/story" className="text-zinc-600 hover:text-amber-400 text-xs tracking-widest uppercase transition-colors">
            Case Study
          </Link>
          <p className="text-zinc-700 text-xs">© 2026 Le Palais · Bangkok, Thailand</p>
        </div>
      </div>
    </footer>
  );
}
