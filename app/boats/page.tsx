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

/* ─── tokens ────────────────────────────────────────────────────── */
const C = {
  navy:    "#0a1628",
  navyMid: "#0f2240",
  ocean:   "#1a4a7a",
  teal:    "#0094b8",
  aqua:    "#00c9e4",
  gold:    "#e8a020",
  white:   "#ffffff",
  muted:   "#8fa8c4",
  border:  "#1e3a5f",
};

/* ─── photos ────────────────────────────────────────────────────── */
const I = {
  hero:      "https://images.pexels.com/photos/36661715/pexels-photo-36661715.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920",
  manifesto: "https://images.pexels.com/photos/7753824/pexels-photo-7753824.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920",
  island:    "https://images.pexels.com/photos/1198835/pexels-photo-1198835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  wake:      "https://images.pexels.com/photos/36472763/pexels-photo-36472763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  snorkel:   "https://images.pexels.com/photos/1085756/pexels-photo-1085756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  speed:     "https://images.pexels.com/photos/5940391/pexels-photo-5940391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

/* ─── data ──────────────────────────────────────────────────────── */
const TOURS = [
  { num: "01", title: "Island Hopping", duration: "Full day · 8h", price: "From 2 500 ฿", desc: "Koh Larn, Koh Sak, Koh Krok — three islands, crystal waters, lunch on the beach.", badge: "Most popular", img: I.island },
  { num: "02", title: "Sunset Cruise",  duration: "3 hours · 17:00–20:00", price: "From 1 800 ฿", desc: "Watch the sun sink into the Gulf of Thailand with drinks in hand. Magical every time.", badge: "Romantic", img: I.wake },
  { num: "03", title: "Snorkeling Adventure", duration: "Half day · 5h", price: "From 2 000 ฿", desc: "Guided snorkeling at the best reef spots around Pattaya. Equipment included for all levels.", badge: "Family-friendly", img: I.snorkel },
  { num: "04", title: "Private Transfer", duration: "Flexible timing", price: "From 4 500 ฿", desc: "Koh Chang, Koh Samet or any Gulf destination. Private speedboat, no shared tours, no waiting.", badge: "Exclusive", img: I.speed },
];

const FLEET = [
  { name: "Speedboat",    cap: "Up to 10 guests", tag: "MOST BOOKED",    price: "3 500", unit: "฿ / half day", desc: "Fast and fun. Perfect for island hopping, snorkeling or a quick coastal escape. Includes captain & fuel.", features: ["Captain included", "Fuel included", "Snorkeling gear", "Cooler & ice"], highlight: true,  img: I.speed },
  { name: "Catamaran",    cap: "Up to 20 guests", tag: "GROUPS & PARTIES",price: "9 500", unit: "฿ / half day", desc: "Spacious twin-hull for groups, corporate events and birthday parties. Stable, shaded, with sun deck.", features: ["Captain + crew", "Sound system", "Shaded lounge deck", "Swim platform"], highlight: false, img: I.snorkel },
  { name: "Luxury Yacht", cap: "Up to 12 guests", tag: "PRIVATE CHARTER", price: "18 000",unit: "฿ / day",      desc: "Full-day private yacht charter. Air-conditioned cabin, gourmet catering option, champagne on arrival.", features: ["Captain + hostess", "AC cabin & salon", "Catering available", "Champagne welcome"], highlight: false, img: "https://images.pexels.com/photos/783346/pexels-photo-783346.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { name: "Longtail Boat",cap: "Up to 6 guests",  tag: "LOCAL EXPERIENCE", price: "1 200", unit: "฿ / 2 hours", desc: "The authentic Thai way to explore hidden coves, mangroves and local fishing villages.", features: ["Local driver-guide", "Hidden spots access", "Flexible routing", "Photo stops"], highlight: false, img: I.island },
];

const CONTACT = {
  whatsapp: "https://wa.me/66800000000",
  telegram: "https://t.me/bluehorizonpattaya",
  line: "https://line.me/ti/p/~bluehorizon",
  tel: "tel:+66800000000",
};

const STATS = [
  { v: "12+",    l: "Years on water" },
  { v: "4 800+", l: "Trips completed" },
  { v: "15",     l: "Boats in fleet" },
  { v: "4.9★",   l: "Average rating" },
];

/* ─── page ──────────────────────────────────────────────────────── */
export default function BoatsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.navy, color: C.white }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.navy}; }
        ::-webkit-scrollbar-thumb { background: ${C.teal}; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 24s linear infinite; }
      `}</style>
      <Navbar />
      <Hero />
      <Ticker />
      <Tours />
      <Manifesto />
      <Fleet />
      <Gallery />
      <Booking />
      <Footer />
      <StickyBtn />
    </div>
  );
}

/* ─── navbar ────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{ background: scrolled ? `${C.navy}f0` : "transparent", borderBottom: scrolled ? `1px solid ${C.border}` : "none", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {[["Tours", "tours"], ["Fleet", "fleet"], ["Book", "book"]].map(([l, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.2em] transition-colors hover:text-white"
              style={{ color: C.muted }}>{l}</button>
          ))}
        </div>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
          className="text-xs font-black px-5 py-2.5 tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{ background: C.teal, color: C.white }}>
          Book a trip
        </a>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex flex-col leading-none">
      <span className="font-russo text-lg tracking-widest uppercase" style={{ color: C.white }}>Blue Horizon</span>
      <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: C.aqua }}>Boats & Tours · Pattaya</span>
    </div>
  );
}

/* ─── hero ──────────────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: C.navy }}>
      {/* full-bleed photo */}
      <img src={I.hero} alt="Blue Horizon speedboat"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.5) saturate(1.1)" }} />

      {/* gradient: left readable, right transparent */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(10,22,40,.9) 30%, rgba(10,22,40,.3) 70%, transparent)" }} />
      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: `linear-gradient(to top, ${C.navy}, transparent)` }} />

      <div className={`relative z-10 px-8 md:px-16 pb-24 md:pb-32 max-w-5xl w-full transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px" style={{ background: C.aqua }} />
          <p className="text-xs tracking-[0.5em] uppercase" style={{ color: C.aqua }}>Pattaya · Gulf of Thailand</p>
        </div>

        <h1 className="font-russo leading-none mb-2" style={{ fontSize: "clamp(4rem,12vw,10rem)", color: C.white }}>
          BLUE
        </h1>
        <h1 className="font-russo leading-none mb-10"
          style={{ fontSize: "clamp(4rem,12vw,10rem)", color: "transparent", WebkitTextStroke: `2px ${C.aqua}` }}>
          HORIZON
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-3 max-w-lg" style={{ color: "#cce0f0" }}>
          Private speedboats, catamarans and yacht charters. Island hopping, sunset cruises, custom routes.
        </p>
        <p className="text-xs tracking-[0.35em] uppercase mb-12" style={{ color: `${C.teal}cc` }}>
          Captain included · Daily departures · Bali Hai Pier
        </p>

        <div className="flex flex-wrap gap-4">
          <button onClick={() => document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" })}
            className="font-black px-10 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-90"
            style={{ background: C.teal, color: C.white }}>
            Explore tours
          </button>
          <button onClick={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold px-10 py-4 text-sm tracking-widest uppercase border transition-all hover:border-white/40"
            style={{ borderColor: "rgba(255,255,255,.25)", color: "rgba(255,255,255,.7)" }}>
            Our fleet
          </button>
        </div>
      </div>

      {/* stats — bottom right corner */}
      <div className={`absolute bottom-8 right-8 hidden md:flex gap-10 transition-all duration-1000 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
        {STATS.map((s) => (
          <div key={s.l} className="text-right">
            <p className="font-russo text-2xl" style={{ color: C.aqua }}>{s.v}</p>
            <p className="text-[9px] tracking-widest uppercase" style={{ color: C.muted }}>{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── ticker ────────────────────────────────────────────────────── */
function Ticker() {
  const items = ["15 Boats", "Island Hopping", "Sunset Cruises", "Captain Included", "Pattaya Bay", "Daily Departures", "Snorkeling Tours", "Private Charters", "4 800+ Trips", "Gulf of Thailand"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y py-4" style={{ borderColor: C.border, background: C.navyMid }}>
      <div className="flex whitespace-nowrap marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span className="font-russo text-sm tracking-widest uppercase" style={{ color: C.muted }}>{item}</span>
            <span style={{ color: C.teal, fontSize: "6px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── tours ─────────────────────────────────────────────────────── */
function Tours() {
  return (
    <section id="tours" className="py-28 md:py-36" style={{ background: C.navy }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16 md:mb-20">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: C.aqua }}>Experiences</p>
          <h2 className="font-russo leading-none" style={{ fontSize: "clamp(3rem,9vw,7rem)", color: C.white }}>
            CHOOSE<br />
            <span style={{ color: "transparent", WebkitTextStroke: `2px ${C.teal}` }}>YOUR TRIP</span>
          </h2>
        </div>
        <div className="divide-y" style={{ borderColor: C.border }}>
          {TOURS.map((t, i) => <TourBlock key={t.title} tour={t} flip={i % 2 !== 0} />)}
        </div>
      </div>
    </section>
  );
}

function TourBlock({ tour: t, flip }: { tour: typeof TOURS[0]; flip: boolean }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref}
      className={`grid md:grid-cols-[3fr_2fr] transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${flip ? "md:grid-cols-[2fr_3fr]" : ""}`}>
      {/* photo */}
      <div className={`relative overflow-hidden aspect-[16/9] md:aspect-auto md:min-h-[360px] ${flip ? "md:order-2" : ""}`}>
        <img src={t.img} alt={t.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(10,22,40,.65))" }} />
        {/* ghost number */}
        <span className="absolute bottom-4 right-4 font-russo leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(5rem,12vw,9rem)", color: "rgba(255,255,255,.06)" }}>
          {t.num}
        </span>
      </div>

      {/* text */}
      <div className={`flex flex-col justify-center px-10 py-14 md:py-16 ${flip ? "md:order-1" : ""}`}
        style={{ background: C.navyMid }}>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-russo text-5xl leading-none select-none" style={{ color: `${C.teal}25` }}>{t.num}</span>
          <div>
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-1" style={{ color: C.aqua }}>{t.badge}</p>
            <p className="text-xs" style={{ color: C.muted }}>{t.duration}</p>
          </div>
        </div>
        <h3 className="font-russo text-3xl md:text-4xl text-white mb-4">{t.title}</h3>
        <p className="leading-relaxed mb-8 max-w-sm" style={{ color: C.muted }}>{t.desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-russo text-xl" style={{ color: C.aqua }}>{t.price}</span>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
            className="text-xs font-black px-6 py-2.5 tracking-widest uppercase transition-opacity hover:opacity-80"
            style={{ background: C.teal, color: C.white }}>
            Book now
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── manifesto ─────────────────────────────────────────────────── */
function Manifesto() {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: "65vh" }}>
      <img src={I.manifesto} alt="Sunset over the Gulf of Thailand"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.4) saturate(0.85)" }} />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(10,22,40,.5), rgba(10,22,40,.15), rgba(10,22,40,.75))" }} />

      <div className={`relative z-10 flex flex-col items-center justify-center min-h-[65vh] px-6 text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <p className="font-russo text-sm tracking-[0.7em] uppercase mb-6" style={{ color: C.aqua }}>
          12 years · Pattaya · Gulf of Thailand
        </p>
        <h2 className="font-russo leading-none mb-4"
          style={{ fontSize: "clamp(3.5rem,12vw,10rem)", color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,.75)" }}>
          4 800+
        </h2>
        <h2 className="font-russo leading-none mb-10"
          style={{ fontSize: "clamp(2rem,7vw,6rem)", color: C.white }}>
          TRIPS COMPLETED
        </h2>
        <div className="w-16 h-px mx-auto" style={{ background: C.teal }} />
        <p className="mt-8 text-lg max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,.65)" }}>
          Every sunrise, a new departure. Every island, a new memory. The Gulf of Thailand is our backyard.
        </p>
      </div>
    </section>
  );
}

/* ─── fleet ─────────────────────────────────────────────────────── */
function Fleet() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="fleet" className="py-28 md:py-36" style={{ background: C.navyMid }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: C.aqua }}>Our fleet</p>
          <h2 className="font-russo leading-none" style={{ fontSize: "clamp(3rem,9vw,7rem)", color: C.white }}>
            PICK YOUR<br />
            <span style={{ color: "transparent", WebkitTextStroke: `2px ${C.teal}` }}>VESSEL</span>
          </h2>
        </div>
        <div ref={ref}
          className={`space-y-3 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {FLEET.map((f, i) => <FleetRow key={f.name} f={f} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function FleetRow({ f, i }: { f: typeof FLEET[0]; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="group relative overflow-hidden cursor-pointer transition-all duration-300"
      style={{ border: `1px solid ${open ? C.teal : C.border}`, transitionDelay: `${i * 60}ms` }}
      onClick={() => setOpen(!open)}>

      {/* collapsed row */}
      <div className="flex items-center min-h-[88px]">
        {/* photo thumb */}
        <div className="relative w-32 md:w-52 h-[88px] flex-shrink-0 overflow-hidden">
          <img src={f.img} alt={f.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, transparent 40%, rgba(15,34,64,.95))" }} />
        </div>

        {/* name + capacity */}
        <div className="flex-1 px-6 md:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h3 className="font-russo text-xl md:text-2xl text-white">{f.name}</h3>
            {f.highlight && (
              <span className="text-[10px] font-black px-2.5 py-0.5 tracking-widest uppercase"
                style={{ background: C.teal, color: C.white }}>{f.tag}</span>
            )}
            {!f.highlight && (
              <span className="text-xs tracking-widest uppercase" style={{ color: C.muted }}>{f.tag}</span>
            )}
          </div>
          <p className="text-xs" style={{ color: C.muted }}>{f.cap}</p>
        </div>

        {/* price */}
        <div className="px-6 text-right hidden md:block flex-shrink-0">
          <p className="font-russo text-2xl text-white">{f.price} ฿</p>
          <p className="text-xs mt-0.5" style={{ color: C.muted }}>{f.unit}</p>
        </div>

        {/* expand icon */}
        <div className="px-6 flex-shrink-0">
          <div className={`transition-transform duration-300 text-xs ${open ? "rotate-180" : ""}`}
            style={{ color: C.teal }}>▼</div>
        </div>
      </div>

      {/* expanded content */}
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-8 py-7 border-t" style={{ borderColor: C.border }}>
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <p className="leading-relaxed mb-5" style={{ color: C.muted }}>{f.desc}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {f.features.map((ft) => (
                  <span key={ft} className="flex items-center gap-2 text-sm" style={{ color: C.muted }}>
                    <span style={{ color: C.aqua }}>✓</span>{ft}
                  </span>
                ))}
              </div>
            </div>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="whitespace-nowrap text-xs font-black px-8 py-3 tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ background: C.teal, color: C.white }}>
              Request quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── gallery ───────────────────────────────────────────────────── */
function Gallery() {
  const { ref, inView } = useInView(0.05);
  const imgs = [
    { src: I.hero,    alt: "Speedboat at overwater villas",  span: "col-span-2 row-span-2" },
    { src: I.speed,   alt: "Clear blue ocean run",           span: "" },
    { src: I.island,  alt: "Aerial turquoise waters",        span: "" },
    { src: I.wake,    alt: "Wake trail on the ocean",        span: "" },
    { src: I.snorkel, alt: "Coastline aerial view",          span: "" },
    { src: I.manifesto, alt: "Sunset cruise",                span: "col-span-2" },
  ];
  return (
    <section className="py-28 md:py-36" style={{ background: C.navy }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-14">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: C.aqua }}>On the water</p>
          <h2 className="font-russo leading-none" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", color: C.white }}>
            EVERY TRIP,<br />
            <span style={{ color: "transparent", WebkitTextStroke: `2px ${C.teal}` }}>A MEMORY</span>
          </h2>
        </div>
        <div ref={ref}
          className={`grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] gap-2 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          {imgs.map((img, i) => (
            <div key={img.src}
              className={`relative overflow-hidden group ${img.span} transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{
                borderRadius: i === 0 ? "1.5rem" : i % 3 === 0 ? "1.5rem 0.4rem 1.5rem 0.4rem" : "0.75rem",
                transitionDelay: `${i * 60}ms`,
              }}>
              <img src={img.src} alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-30 group-hover:opacity-80 transition-opacity duration-500" />
              <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">{img.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── booking ───────────────────────────────────────────────────── */
function Booking() {
  const { ref, inView } = useInView();
  return (
    <section id="book" className="relative overflow-hidden py-36 md:py-52">
      <img src={I.hero} alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.22) saturate(0.7)" }} />
      <div className="absolute inset-0"
        style={{ background: `linear-gradient(160deg, rgba(10,22,40,.92) 40%, rgba(0,148,184,.1))` }} />

      <div ref={ref}
        className={`relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-xs tracking-[0.6em] uppercase mb-6" style={{ color: C.aqua }}>Book your trip</p>
        <h2 className="font-russo leading-none mb-10"
          style={{ fontSize: "clamp(3rem,10vw,8rem)", color: C.white }}>
          READY TO<br />
          <span style={{ color: "transparent", WebkitTextStroke: `2px ${C.aqua}` }}>SET SAIL?</span>
        </h2>
        <p className="text-lg mb-14 leading-relaxed max-w-lg mx-auto" style={{ color: C.muted }}>
          Tell us your date, group size and preferred experience. We'll send a quote within the hour and handle everything else.
        </p>

        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
          className="inline-block font-black text-sm md:text-base px-14 py-5 tracking-widest uppercase transition-opacity hover:opacity-80 mb-10"
          style={{ background: C.teal, color: C.white }}>
          Book on WhatsApp →
        </a>

        <div className="grid grid-cols-3 border" style={{ borderColor: C.border }}>
          {[
            { label: "Telegram", href: CONTACT.telegram, sub: "@bluehorizonpattaya" },
            { label: "Line", href: CONTACT.line, sub: "@bluehorizon" },
            { label: "Call us", href: CONTACT.tel, sub: "+66 80 000 0000" },
          ].map((ch, i) => (
            <a key={ch.href} href={ch.href} target="_blank" rel="noopener noreferrer"
              className={`py-5 text-center transition-all hover:bg-white/5 ${i > 0 ? "border-l" : ""}`}
              style={{ background: "rgba(255,255,255,.03)", borderColor: C.border }}>
              <p className="text-xs font-bold tracking-widest uppercase text-white">{ch.label}</p>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>{ch.sub}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t" style={{ borderColor: C.border }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: C.aqua }}>Departure point</p>
          <p className="font-russo text-xl text-white">Pattaya Bay · Bali Hai Pier</p>
          <p className="text-sm mt-1" style={{ color: C.muted }}>Daily departures · 06:00 – 18:00</p>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 border-t" style={{ background: "#050d1a", borderColor: C.border }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <p className="text-xs" style={{ color: "#4b5563" }}>© 2026 Blue Horizon · Pattaya · All rights reserved</p>
      </div>
    </footer>
  );
}

/* ─── sticky ────────────────────────────────────────────────────── */
function StickyBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 font-black px-6 py-3 text-sm tracking-wide flex items-center gap-2 shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: C.teal, color: C.white }}>
      ⚓ Book a trip
    </a>
  );
}
