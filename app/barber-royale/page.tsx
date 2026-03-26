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

const SERVICES = [
  {
    title: "Premium Haircut",
    price: "600 THB",
    desc: "Precision cut tailored to your face shape. Includes hot towel finish, styling and scalp massage.",
    details: ["Consultation included", "Hot towel finish", "Scalp massage", "Styling product"],
    img: "https://images.pexels.com/photos/7697445/pexels-photo-7697445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tag: "MOST POPULAR",
  },
  {
    title: "Classic Hot Shave",
    price: "800 THB",
    desc: "Traditional straight razor shave with hot towel preparation, pre-shave oil and soothing aftershave balm.",
    details: ["Hot towel prep", "Pre-shave oil", "Straight razor", "Aftershave balm"],
    img: "https://images.pexels.com/photos/36150766/pexels-photo-36150766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tag: "SIGNATURE",
  },
  {
    title: "Beard Sculpt",
    price: "500 THB",
    desc: "Expert beard shaping and grooming. Clean lines, precise edges and premium beard oil treatment.",
    details: ["Precise shaping", "Clean edges", "Beard oil treatment", "Defining wax"],
    img: "https://images.pexels.com/photos/3998405/pexels-photo-3998405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tag: "GROOMING",
  },
];

const GALLERY = [
  { src: "https://images.pexels.com/photos/7697278/pexels-photo-7697278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", span: "col-span-2 row-span-2" },
  { src: "https://images.pexels.com/photos/7518729/pexels-photo-7518729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", span: "" },
  { src: "https://images.pexels.com/photos/7697642/pexels-photo-7697642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", span: "" },
  { src: "https://images.pexels.com/photos/7697677/pexels-photo-7697677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", span: "col-span-2" },
];

export default function BarberRoyalePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  return (
    <div className="bg-black min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #ca8a04; }
        .bebas { font-family: 'Bebas Neue', sans-serif; }
        @keyframes goldglow { 0%,100% { text-shadow: 0 0 20px rgba(202,138,4,.3); } 50% { text-shadow: 0 0 60px rgba(202,138,4,.8); } }
        .gold-glow { animation: goldglow 3s ease-in-out infinite; }
      `}</style>
      <Navbar />
      <Hero mounted={mounted} />
      <Stats />
      <Services />
      <Gallery />
      <Pricing />
      <Location />
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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-yellow-600 flex items-center justify-center">
            <span className="text-yellow-500 font-black text-xs bebas tracking-wider">BR</span>
          </div>
          <span className="text-white bebas tracking-[0.2em] text-lg">BARBER ROYALE</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[["Services", "services"], ["Gallery", "gallery"], ["Pricing", "pricing"], ["Location", "location"]].map(([l, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors">
              {l}
            </button>
          ))}
        </div>
        <a href="https://wa.me/66812345678" target="_blank" rel="noopener noreferrer"
          className="bg-yellow-600 hover:bg-yellow-500 text-black text-xs font-black px-5 py-2.5 tracking-widest uppercase transition-colors bebas">
          Book Now
        </a>
      </div>
    </nav>
  );
}

function Hero({ mounted }: { mounted: boolean }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-center">
      <div className="absolute inset-0">
        <img src="https://images.pexels.com/photos/7697329/pexels-photo-7697329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="" className="w-full h-full object-cover opacity-20"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.2) 3px,rgba(0,0,0,.2) 4px)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-yellow-700/10 rounded-full blur-[100px] pointer-events-none" />

      <div className={`relative z-10 px-6 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-yellow-600 text-xs font-bold tracking-[0.6em] uppercase mb-8">Phuket · Thailand</p>
        <h1 className="gold-glow bebas leading-none mb-4 text-white" style={{ fontSize: "clamp(5rem,18vw,15rem)", letterSpacing: "0.05em" }}>
          BARBER<br /><span className="text-yellow-500">ROYALE</span>
        </h1>
        <p className="text-zinc-300 tracking-[0.35em] uppercase text-sm mb-2">The Art of the Perfect Cut</p>
        <p className="text-zinc-600 text-xs tracking-widest mb-12">Haircut · Hot Shave · Beard Sculpt · Walk-ins Welcome</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/66812345678" target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden bg-yellow-600 hover:bg-yellow-500 text-black font-black px-10 py-4 tracking-widest uppercase text-sm transition-all bebas">
            Book via WhatsApp
          </a>
          <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-zinc-700 hover:border-yellow-600 text-zinc-400 hover:text-yellow-400 font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300">
            View Pricing
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-yellow-600/60 to-transparent animate-pulse mx-auto" />
      </div>
    </section>
  );
}

function Stats() {
  const { ref, inView } = useInView();
  const items = [
    { v: "Est. 2023", l: "Phuket's finest" },
    { v: "600 ฿", l: "Starting price" },
    { v: "5★", l: "Reviews" },
    { v: "Walk-in", l: "Welcome" },
  ];
  return (
    <section ref={ref} className="bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <div key={s.l} className={`flex flex-col items-center text-center py-8 border-r border-zinc-900 last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="text-white bebas text-2xl md:text-3xl tracking-wide">{s.v}</span>
            <span className="text-zinc-600 text-xs tracking-widest uppercase mt-1">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-black py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-yellow-600 text-xs font-bold tracking-[0.45em] uppercase mb-3">Our craft</p>
        <h2 className="text-white bebas text-5xl md:text-6xl tracking-wide leading-none mb-20">Signature Services</h2>
        <div className="space-y-24">
          {SERVICES.map((s, i) => <ServiceBlock key={s.title} service={s} flip={i % 2 !== 0} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceBlock({ service: s, flip }: { service: typeof SERVICES[0]; flip: boolean }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      <div className={`relative aspect-[4/3] overflow-hidden bg-zinc-900 ${flip ? "md:order-2" : ""}`}>
        <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
        <span className="absolute top-4 left-4 bg-yellow-600 text-black text-xs font-black px-3 py-1 tracking-widest uppercase bebas">{s.tag}</span>
      </div>
      <div className={`text-center ${flip ? "md:order-1" : ""}`}>
        <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-2">Starting from</p>
        <p className="text-white bebas text-5xl mb-3">{s.price}</p>
        <h3 className="text-white bebas text-3xl md:text-4xl tracking-wide mb-5">{s.title}</h3>
        <p className="text-zinc-400 leading-relaxed mb-8 max-w-md mx-auto">{s.desc}</p>
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          {s.details.map((d) => (
            <div key={d} className="flex items-center gap-2 justify-center">
              <div className="w-1 h-1 bg-yellow-500 rounded-full flex-shrink-0" />
              <span className="text-zinc-300 text-xs">{d}</span>
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
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-yellow-600 text-xs font-bold tracking-[0.45em] uppercase mb-3">Inside</p>
        <h2 className="text-white bebas text-5xl md:text-6xl tracking-wide leading-none mb-16">The Shop</h2>
        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-2 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {GALLERY.map((img, i) => (
            <div key={img.src} className={`relative overflow-hidden group bg-zinc-900 ${img.span}`}>
              <img src={img.src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
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
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-yellow-600 text-xs font-bold tracking-[0.45em] uppercase mb-3">Transparent</p>
        <h2 className="text-white bebas text-5xl md:text-6xl tracking-wide leading-none mb-16">Pricing</h2>
        <div ref={ref} className={`grid md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {[
            { name: "Standard", price: "600 ฿", desc: "Classic Haircut", items: ["Haircut", "Hot towel finish", "Scalp massage", "Basic styling"] },
            { name: "Premium", price: "900 ฿", desc: "Cut + Beard", items: ["Haircut", "Beard sculpt", "Hot towel", "Premium product"], featured: true },
            { name: "VIP Package", price: "1 500 ฿", desc: "Full Experience", items: ["Haircut", "Hot shave", "Beard sculpt", "Scalp treatment"] },
          ].map((plan) => (
            <div key={plan.name} className={`relative p-8 flex flex-col transition-all duration-300 ${plan.featured ? "border border-yellow-600 bg-gradient-to-b from-yellow-950/40 to-black" : "border border-zinc-800 hover:border-zinc-600"}`}>
              {plan.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-600 text-black text-xs font-black px-5 py-1 tracking-widest uppercase whitespace-nowrap bebas">Best Value</span>}
              <p className={`text-xs tracking-widest uppercase mb-1 ${plan.featured ? "text-yellow-400" : "text-zinc-500"}`}>{plan.name}</p>
              <p className="text-zinc-400 text-xs mb-6">{plan.desc}</p>
              <div className="flex items-end justify-center gap-2 mb-8">
                <span className="text-white bebas text-5xl">{plan.price}</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center justify-center gap-3 text-zinc-300 text-sm">
                    <span className="text-yellow-500">✓</span>{item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/66812345678" target="_blank" rel="noopener noreferrer"
                className={`text-center py-3 font-black text-xs tracking-widest uppercase transition-all bebas ${plan.featured ? "bg-yellow-600 hover:bg-yellow-500 text-black" : "border border-zinc-700 hover:border-yellow-600 text-zinc-400 hover:text-yellow-400"}`}>
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="bg-zinc-950 border-t border-zinc-900 py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-yellow-600 text-xs font-bold tracking-[0.45em] uppercase mb-3">Find us</p>
        <h2 className="text-white bebas text-5xl md:text-6xl tracking-wide leading-none mb-16">Phuket, Thailand</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
          <div className="space-y-6 text-left">
            {[
              { label: "Address", value: "123 Patong Beach Road, Phuket 83150" },
              { label: "Hours", value: "Mon–Sat: 10:00–20:00 · Sun: 11:00–18:00" },
              { label: "WhatsApp", value: "+66 81 234 5678" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
              </div>
            ))}
            <a href="https://wa.me/66812345678" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-yellow-600 hover:bg-yellow-500 text-black font-black px-8 py-3 tracking-widest uppercase text-sm transition-colors bebas mt-4">
              Book via WhatsApp →
            </a>
          </div>
          <div className="aspect-video overflow-hidden border border-zinc-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952!2d98.2976!3d7.8951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df3b6f0d8a1%3A0x0!2zUGh1a2V0!5e0!3m2!1sen!2sth!4v1"
              width="100%" height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(88%) contrast(85%)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Barber Royale — Phuket"
            />
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-yellow-600 flex items-center justify-center">
            <span className="text-yellow-500 font-black text-xs bebas">BR</span>
          </div>
          <span className="text-white bebas tracking-[0.2em] text-lg">BARBER ROYALE</span>
        </div>
        <p className="text-zinc-700 text-xs">© 2026 Barber Royale · Phuket, Thailand</p>
        <a href="https://wa.me/66812345678" className="text-zinc-600 hover:text-yellow-500 text-xs tracking-widest transition-colors">
          WhatsApp Booking
        </a>
      </div>
    </footer>
  );
}
