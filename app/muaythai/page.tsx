"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const gold = "#c9a84c";
const dark = "#080808";

const I = {
  hero:     "https://images.pexels.com/photos/4651305/pexels-photo-4651305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",   // Muay Thai fight — Pattaya City, Thailand
  bags:     "https://images.pexels.com/photos/2607922/pexels-photo-2607922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",   // Bangkok boxing match with crowd
  ring:     "https://images.pexels.com/photos/238636/pexels-photo-238636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",     // Thapae Boxing Stadium, Thailand
  training: "https://images.pexels.com/photos/2628210/pexels-photo-2628210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",   // Muay Thai training session
  mono:     "https://images.pexels.com/photos/5750852/pexels-photo-5750852.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",   // Bag work
  portrait: "https://images.pexels.com/photos/1394756/pexels-photo-1394756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",   // Children Muay Thai outdoors, Thailand
  kick:     "https://images.pexels.com/photos/5750947/pexels-photo-5750947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",   // Sparring
};

const CONTACT = {
  telegram: "https://t.me/tigermuaythai",
  whatsapp: "https://wa.me/66800000000",
  line: "https://line.me/ti/p/~tigermuaythai",
  phone: "tel:+66800000000",
};

export default function MuaythaiPage() {
  return (
    <div style={{ background: dark, color: "#fff" }} className="min-h-screen overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: ${gold}; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)} }
        @keyframes slideR { from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)} }
        .fade-up { animation: fadeUp .9s cubic-bezier(.4,0,.2,1) forwards; }
        .slide-r { animation: slideR .8s cubic-bezier(.4,0,.2,1) forwards; }
      `}</style>
      <Nav />
      <Hero />
      <Manifesto />
      <Programs />
      <FullBleed />
      <Schedule />
      <DTV />
      <Booking />
      <Footer />
    </div>
  );
}

/* ─────────────────────────── NAV ─────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md border-b border-white/5" : ""}`}
      style={{ background: scrolled ? "rgba(8,8,8,0.92)" : "transparent", padding: "1.5rem 3rem" }}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex flex-col">
          <p className="font-russo text-base tracking-[0.25em] uppercase" style={{ color: gold }}>TIGER</p>
          <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "#555" }}>Muay Thai · Pattaya</p>
        </div>
        <div className="hidden md:flex gap-10 items-center">
          {[["Training", "#programs"], ["Schedule", "#schedule"], ["DTV Visa", "#dtv"], ["Book", "#book"]].map(([l, h]) => (
            <a key={l} href={h} className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <a href="#book" className="text-[11px] uppercase tracking-widest px-5 py-2.5 border transition-colors hover:bg-white hover:text-black"
          style={{ color: gold, borderColor: gold }}>
          Book now
        </a>
      </div>
    </nav>
  );
}

/* ─────────────────────────── HERO — SPLIT ─────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex overflow-hidden">
      {/* full-bleed background image */}
      <div className="absolute inset-0">
        <img src={I.hero} alt="Muay Thai" className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45)", objectPosition: "center 20%" }} />
        <div className="absolute inset-0 hidden md:block"
          style={{ background: `linear-gradient(100deg, ${dark} 45%, transparent 75%)` }} />
        <div className="absolute inset-0 md:hidden" style={{ background: "rgba(8,8,8,0.7)" }} />
      </div>

      {/* content left */}
      <div className="relative z-10 flex flex-col justify-end pb-24 pt-40 pl-[8vw] pr-8 max-w-3xl">
        <p className="text-[10px] tracking-[0.5em] uppercase mb-8 slide-r"
          style={{ color: gold, animationDelay: "0.3s" }}>
          Est. Pattaya · Thailand · The Art of Eight Limbs
        </p>
        <h1 className="font-russo leading-[0.88] mb-8 fade-up"
          style={{ fontSize: "clamp(5.5rem, 16vw, 13rem)", letterSpacing: "-0.03em", animationDelay: "0.45s" }}>
          MUAY<br />
          <span style={{ WebkitTextStroke: `2px ${gold}`, color: "transparent" }}>THAI</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-sm leading-relaxed mb-12 fade-up" style={{ animationDelay: "0.65s" }}>
          Train with Kru. Fight with purpose.<br />Transform in Pattaya.
        </p>
        <div className="flex gap-4 fade-up" style={{ animationDelay: "0.8s" }}>
          <a href="#book" className="px-8 py-4 font-russo text-sm uppercase tracking-widest transition-opacity hover:opacity-90"
            style={{ background: gold, color: dark }}>
            Start training
          </a>
          <a href="#programs" className="px-8 py-4 font-russo text-sm uppercase tracking-widest border border-white/25 hover:border-white transition-colors">
            View programs
          </a>
        </div>
        <div className="absolute bottom-10 left-[8vw] flex items-center gap-4">
          <div className="w-10 h-px" style={{ background: gold }} />
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-600">Scroll to explore</p>
        </div>
      </div>

      {/* vertical text right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-20">
        <div className="h-14 w-px" style={{ background: `linear-gradient(transparent, ${gold})` }} />
        <p className="text-[10px] tracking-[0.35em] uppercase" style={{ writingMode: "vertical-rl", color: gold }}>
          Thailand · 2026
        </p>
        <div className="h-14 w-px" style={{ background: `linear-gradient(${gold}, transparent)` }} />
      </div>
    </section>
  );
}

/* ─────────────────────────── MANIFESTO ─────────────────────────── */
function Manifesto() {
  const { ref, inView } = useInView(0.15);
  return (
    <div ref={ref} className="relative overflow-hidden flex items-center" style={{ height: "75vh" }}>
      <img src={I.bags} alt="Training" className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.28)", objectPosition: "center 40%" }} />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full flex flex-col items-center text-center px-8">
        <p className={`text-[10px] tracking-[0.5em] uppercase mb-8 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ color: gold, transitionDelay: "0.1s" }}>
          Our philosophy
        </p>
        <h2 className={`font-russo leading-[1.05] transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", transitionDelay: "0.25s", maxWidth: "16ch" }}>
          {"\"This is not a gym. "}
          <span style={{ color: gold }}>{"This is a temple.\""}</span>
        </h2>
        <p className={`mt-8 text-zinc-500 max-w-xl leading-relaxed text-sm transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "0.45s" }}>
          We train fighters, professionals, tourists and seekers. Every session is a step closer to the best version of yourself.
        </p>
        <div className={`mt-16 flex gap-16 md:gap-24 flex-wrap justify-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "0.6s" }}>
          {[["500+", "fighters trained"], ["15+", "years in Pattaya"], ["EN · RU · TH", "languages"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="font-russo text-3xl md:text-4xl" style={{ color: gold }}>{v}</p>
              <p className="text-[10px] tracking-widest uppercase text-zinc-600 mt-2">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── PROGRAMS ─────────────────────────── */
function Programs() {
  const { ref, inView } = useInView(0.08);
  return (
    <section id="programs" className="py-28 md:py-40" style={{ background: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: gold }}>Training programs</p>
            <h2 className="font-russo leading-[0.9]" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
              Choose<br />your path.
            </h2>
          </div>
          <p className="text-zinc-600 text-sm max-w-xs leading-relaxed md:text-right">
            Three levels of commitment, one transformation. Beginners welcome. Fighters preferred.
          </p>
        </div>

        {/* editorial grid: FEATURED 3/5 + STACK 2/5 */}
        <div ref={ref} className={`grid md:grid-cols-5 gap-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          {/* FEATURED */}
          <div className="md:col-span-3 border border-zinc-800 group hover:border-zinc-600 transition-colors duration-500 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <img src={I.training} alt="Fighter program" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #0d0d0d 100%)" }} />
              <span className="absolute top-5 left-5 px-3 py-1 text-[10px] uppercase tracking-widest font-bold"
                style={{ background: gold, color: dark }}>Most popular</span>
            </div>
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2">Fighter Program</p>
                  <h3 className="font-russo text-4xl">Fighter</h3>
                </div>
                <div className="text-right">
                  <p className="font-russo text-4xl" style={{ color: gold }}>9 900</p>
                  <p className="text-xs text-zinc-700 mt-1">฿ / month</p>
                </div>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-7">
                Train like a professional. Unlimited sessions, private pad work 2× per week, sparring and full fight preparation with our Kru.
              </p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-zinc-400 mb-8">
                {["Unlimited sessions", "Pad work 2×/week", "Sparring included", "Fight prep & strategy"].map(f => (
                  <li key={f} className="flex items-center gap-2"><span style={{ color: gold }}>—</span> {f}</li>
                ))}
              </ul>
              <a href="#book" className="block text-center py-4 font-russo text-sm uppercase tracking-widest transition-opacity hover:opacity-80"
                style={{ background: gold, color: dark }}>
                Train like a fighter →
              </a>
            </div>
          </div>

          {/* STACK */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex-1 border border-zinc-800 hover:border-zinc-600 transition-colors duration-500 overflow-hidden">
              <div className="h-36 overflow-hidden">
                <img src={I.bags} alt="Beginner" className="w-full h-full object-cover opacity-50" />
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">All levels</p>
                    <h3 className="font-russo text-3xl">Beginner</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-russo text-2xl" style={{ color: gold }}>4 500</p>
                    <p className="text-[10px] text-zinc-700">฿/month</p>
                  </div>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed mb-5">Morning & evening sessions, technique drills, pad work and conditioning.</p>
                <a href="#book" className="block text-center py-3 text-[10px] uppercase tracking-widest border border-zinc-800 text-zinc-500 hover:border-white hover:text-white transition-colors">
                  Start training →
                </a>
              </div>
            </div>

            <div className="flex-1 border border-zinc-800 hover:border-zinc-600 transition-colors duration-500 p-7">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">1–2 weeks</p>
                  <h3 className="font-russo text-3xl">Retreat</h3>
                </div>
                <div className="text-right">
                  <p className="font-russo text-2xl" style={{ color: gold }}>15 000</p>
                  <p className="text-[10px] text-zinc-700">฿/2wks</p>
                </div>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed mb-5">Full immersion — twice-daily training, accommodation, meals and Thai massage.</p>
              <ul className="space-y-1 text-[11px] text-zinc-700 mb-5">
                {["2× daily training", "Accommodation included", "Meals & smoothies", "Thai massage 3×/week"].map(f => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
              <a href="#book" className="block text-center py-3 text-[10px] uppercase tracking-widest border border-zinc-800 text-zinc-500 hover:border-white hover:text-white transition-colors">
                Book retreat →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FULL-BLEED BREAK ──────────────────── */
function FullBleed() {
  const { ref, inView } = useInView(0.2);
  return (
    <div ref={ref} className="relative overflow-hidden flex items-center justify-center" style={{ height: "55vh" }}>
      <img src={I.ring} alt="Fight night" className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.25)", objectPosition: "center 30%" }} />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, black 100%)" }} />
      <div className="relative z-10 text-center px-6">
        <p className={`font-russo transition-all duration-1000 leading-none ${inView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          style={{ fontSize: "clamp(5rem, 16vw, 13rem)", WebkitTextStroke: `1px ${gold}`, color: "transparent" }}>
          20+ YEARS
        </p>
        <p className={`mt-4 text-zinc-500 tracking-[0.45em] uppercase text-xs transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "0.4s" }}>
          of excellence in Pattaya
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────── SCHEDULE ─────────────────────────── */
function Schedule() {
  const { ref, inView } = useInView(0.08);
  const slots = [
    { time: "06:30", label: "Morning run", desc: "Beach conditioning warm-up — 5 km" },
    { time: "07:00", label: "Technique drills", desc: "Footwork, jabs, teeps, kicks and defensive movement" },
    { time: "08:30", label: "Pad work", desc: "Private sessions with Kru for fighter program members" },
    { time: "09:30", label: "Sparring", desc: "Controlled contact for intermediate and advanced levels" },
    { time: "11:00", label: "Strength & conditioning", desc: "Weights, resistance bands and functional fitness" },
    { time: "17:00", label: "Evening session", desc: "Full repeat for retreat guests and dedicated fighters" },
    { time: "19:00", label: "Recovery", desc: "Thai massage and stretch — included in retreat package" },
  ];
  return (
    <section id="schedule" className="py-28 md:py-40" style={{ background: dark }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* LEFT — sticky visual block */}
          <div className="md:sticky md:top-28 space-y-6">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: gold }}>Daily program</p>
              <h2 className="font-russo leading-[0.9] mb-8" style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}>
                A day<br />at camp.
              </h2>
            </div>
            <div className="relative">
              <img src={I.portrait} alt="Training" className="w-full object-cover"
                style={{ aspectRatio: "3/4", objectPosition: "center 15%" }} />
              <div className="absolute -bottom-5 -right-5 p-5" style={{ background: gold }}>
                <p className="font-russo text-4xl leading-none" style={{ color: dark }}>6:30</p>
                <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: dark }}>AM Start</p>
              </div>
            </div>
            <div className="mt-10 ml-auto w-3/4">
              <img src={I.kick} alt="Kickboxing" className="w-full object-cover" style={{ aspectRatio: "4/3" }} />
            </div>
          </div>

          {/* RIGHT — timeline */}
          <div ref={ref} className="pt-4 md:pt-20">
            {slots.map((s, i) => (
              <div key={s.time}
                className={`relative pl-8 pb-10 border-l transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
                style={{ borderColor: "#1f1f1f", transitionDelay: `${i * 90}ms` }}>
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border"
                  style={{ background: i === 0 ? gold : dark, borderColor: i === 0 ? gold : "#2a2a2a" }} />
                <p className="font-russo text-xl mb-0.5" style={{ color: gold }}>{s.time}</p>
                <p className="font-russo text-white text-base mb-1">{s.label}</p>
                <p className="text-zinc-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── DTV VISA ─────────────────────────── */
function DTV() {
  const { ref, inView } = useInView(0.1);
  const steps = [
    { n: "01", title: "Choose your visa", body: "60-day or 180-day DTV. We explain every option, no jargon." },
    { n: "02", title: "Documents", body: "We prepare your full application — proof of training, financials, photos." },
    { n: "03", title: "Submission", body: "Filed at the Thai consulate of your choice. We track everything." },
    { n: "04", title: "Land & train", body: "We pick you up from the airport. Training starts day one." },
  ];
  return (
    <section id="dtv" style={{ background: "#0a0a0a" }} className="overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[85vh]">

        {/* LEFT — full image */}
        <div className="relative min-h-[50vh] md:min-h-full overflow-hidden">
          <img src={I.mono} alt="DTV Visa" className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.4) contrast(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 55%, #0a0a0a 100%)" }} />
          <div className="absolute bottom-12 left-10 md:left-14">
            <div className="p-6 border border-zinc-700 inline-block" style={{ background: "rgba(8,8,8,0.8)" }}>
              <p className="font-russo text-5xl mb-1" style={{ color: gold }}>25 000</p>
              <p className="text-xs text-zinc-500 tracking-widest uppercase">฿ · Full DTV service</p>
            </div>
          </div>
        </div>

        {/* RIGHT — editorial content */}
        <div ref={ref}
          className={`flex flex-col justify-center px-10 md:px-16 py-20 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          style={{ transitionDelay: "0.15s" }}>
          <p className="text-[10px] tracking-[0.5em] uppercase mb-5" style={{ color: gold }}>Visa services</p>
          <h2 className="font-russo leading-[0.9] mb-4" style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}>
            DTV<br />Visa
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-14 max-w-xs">
            Stay and train legally in Thailand for 60 to 180 days. We handle your Destination Thailand Visa, start to finish.
          </p>
          <div className="space-y-10">
            {steps.map((s, i) => (
              <div key={s.n}
                className={`flex gap-7 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${0.3 + i * 0.1}s` }}>
                <p className="font-russo text-5xl leading-none shrink-0 select-none"
                  style={{ color: gold, opacity: 0.18 }}>{s.n}</p>
                <div className="pt-1">
                  <p className="font-russo text-white text-xl mb-1">{s.title}</p>
                  <p className="text-zinc-600 text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="#book" className="mt-14 self-start px-8 py-4 font-russo text-sm uppercase tracking-widest border transition-colors hover:bg-white hover:text-black"
            style={{ borderColor: gold, color: gold }}>
            Get your DTV →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── BOOKING ──────────────────────────── */
function Booking() {
  const { ref, inView } = useInView(0.15);
  const channels = [
    { href: CONTACT.telegram, label: "Telegram", sub: "@tigermuaythai",   bg: "#229ED9" },
    { href: CONTACT.whatsapp, label: "WhatsApp", sub: "+66 80 000 0000", bg: "#25D366" },
    { href: CONTACT.line,     label: "Line",      sub: "@tigermuaythai",  bg: "#06C755" },
    { href: CONTACT.phone,    label: "Call us",   sub: "+66 80 000 0000", bg: "#1c1c1c" },
  ];
  return (
    <section id="book" className="relative py-44 px-6 overflow-hidden" style={{ background: "#050505" }}>
      <p className="absolute inset-0 flex items-center justify-center font-russo text-center pointer-events-none select-none whitespace-nowrap"
        style={{ fontSize: "clamp(5rem, 18vw, 16rem)", color: "white", opacity: 0.025, letterSpacing: "-0.04em" }}>
        BOOK NOW
      </p>
      <div ref={ref} className="max-w-3xl mx-auto text-center relative z-10">
        <p className={`text-[10px] tracking-[0.5em] uppercase mb-8 transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ color: gold }}>
          Start your journey
        </p>
        <h2 className={`font-russo leading-[0.95] mb-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", transitionDelay: "0.15s" }}>
          Ready to fight<br />for yourself?
        </h2>
        <p className={`text-zinc-600 text-sm mb-16 max-w-sm mx-auto leading-relaxed transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "0.3s" }}>
          We reply within the hour. Same-day sessions available. English, Russian and Thai spoken.
        </p>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "0.45s" }}>
          {channels.map(c => (
            <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 py-7 px-4 transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ background: c.bg }}>
              <span className="font-russo text-white text-sm uppercase tracking-widest">{c.label}</span>
              <span className="text-[10px] text-white/60">{c.sub}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FOOTER ───────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 border-t px-6 md:px-16" style={{ borderColor: "#141414", background: dark }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-russo tracking-[0.25em] uppercase" style={{ color: gold }}>TIGER MUAY THAI</p>
          <p className="text-[11px] text-zinc-700 mt-1">Pattaya, Thailand · Est. 2008</p>
        </div>
        <p className="text-[11px] text-zinc-800">© 2026 Tiger Muay Thai · All rights reserved</p>
      </div>
    </footer>
  );
}
