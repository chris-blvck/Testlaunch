"use client";
import { useRef, useEffect, useState } from "react";
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

const SERVICES = [
  {
    icon: "◈",
    title: "Landing Page",
    desc: "One-page site optimized to convert visitors — clear offer, CTA, contact. Fast to ship, fast to load.",
    features: ["1 page", "Mobile-first", "Contact form", "SEO ready", "48h delivery"],
    price: "From $299",
    accent: "#ffffff",
  },
  {
    icon: "◉",
    title: "Business Website",
    desc: "Multi-page website with services, about, gallery and booking — everything a local business needs.",
    features: ["3–5 pages", "Gallery / menu", "Booking or contact", "Google Maps", "7-day delivery"],
    price: "From $599",
    accent: "#a1a1aa",
    highlight: true,
  },
  {
    icon: "◐",
    title: "Custom Build",
    desc: "Full custom design, animations, multilingual support, advanced features. Built to stand out.",
    features: ["Unlimited pages", "Custom animations", "Multilingual", "CMS integration", "Timeline TBD"],
    price: "From $999",
    accent: "#71717a",
  },
];

const PROCESS = [
  { step: "01", title: "Brief", desc: "You fill out a short form — your business, your style, your budget. We respond within the hour." },
  { step: "02", title: "Design", desc: "We send you a visual direction in 24h. One round of feedback. No endless revisions." },
  { step: "03", title: "Build", desc: "We build it. Fast. Clean. Mobile-perfect. You get a live preview link before anything goes live." },
  { step: "04", title: "Launch", desc: "Domain, hosting, deployment — we handle it all. Your site is live and indexed within days." },
];

const FAQ = [
  { q: "Do you work with businesses outside Thailand?", a: "Yes. We work fully remote. Most of our clients are in Bangkok, Pattaya, and Koh Samui, but we take projects from anywhere." },
  { q: "What do I need to provide?", a: "Text, logo (if you have one), and a few reference sites you like. We handle photos, design, and code." },
  { q: "Can I update the site myself after launch?", a: "Yes — we can integrate a simple CMS (like Notion or Sanity) so you can edit content without touching code." },
  { q: "Do you offer hosting and domain?", a: "We can handle it or work with your existing setup. We recommend Vercel for hosting — fast, reliable, free tier available." },
  { q: "What if I'm not happy with the result?", a: "We do one free revision round after delivery. If it's genuinely off-brief, we fix it. We care about the work." },
];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white flex items-center justify-center">
            <span className="text-black font-black text-xs tracking-tighter">K</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black tracking-[0.2em] uppercase text-sm">Kabal</span>
            <span className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase">Website Agency</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.25em] uppercase transition-colors">Portfolio</Link>
          <span className="text-white text-xs font-semibold tracking-[0.25em] uppercase">Services</span>
        </div>
        <a href="mailto:junglekabal@gmail.com"
          className="border border-zinc-700 hover:border-white text-zinc-300 hover:text-white text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-all duration-300">
          Get in touch
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/4 rounded-full blur-[120px] pointer-events-none" />
      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-zinc-500 text-xs font-bold tracking-[0.6em] uppercase mb-8">What we build</p>
        <h1 className="font-black leading-none mb-6 select-none" style={{ fontSize: "clamp(3rem,10vw,8rem)", letterSpacing: "-0.04em" }}>
          <span className="text-white">Services.</span>
        </h1>
        <p className="text-zinc-400 text-lg font-light max-w-xl mx-auto leading-relaxed">
          Clean, fast websites for restaurants, clubs, barbershops, and local businesses. Delivered in 48 hours.
        </p>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className={`max-w-6xl mx-auto px-6 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={s.title}
              className={`relative p-8 border transition-all duration-300 hover:-translate-y-1 ${s.highlight ? "border-zinc-600 bg-zinc-950" : "border-zinc-900 bg-black hover:border-zinc-700"}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              {s.highlight && (
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              )}
              {s.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest uppercase bg-white text-black px-3 py-1">
                  Most popular
                </span>
              )}
              <div className="text-3xl mb-6" style={{ color: s.accent }}>{s.icon}</div>
              <h3 className="text-white font-black text-xl tracking-tight mb-3">{s.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">{s.desc}</p>
              <ul className="space-y-2 mb-8">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-zinc-400 text-xs">
                    <span className="w-1 h-1 bg-zinc-500 rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-end justify-between">
                <span className="text-white font-black text-lg">{s.price}</span>
                <a href="mailto:junglekabal@gmail.com?subject=[Kabal]%20Project%20inquiry"
                  className="text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-white transition-colors">
                  Start →
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-zinc-700 text-xs tracking-widest mt-8">All prices in USD · Payment via bank transfer, Wise, or crypto</p>
      </div>
    </section>
  );
}

function Process() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 md:py-28 border-t border-zinc-900">
      <div ref={ref} className={`max-w-5xl mx-auto px-6 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-zinc-500 text-xs font-bold tracking-[0.6em] uppercase mb-4 text-center">How it works</p>
        <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight text-center mb-16" style={{ letterSpacing: "-0.03em" }}>
          Four steps to live.
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {PROCESS.map((p, i) => (
            <div key={p.step} className="text-center" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center mx-auto mb-5">
                <span className="text-zinc-500 font-black text-sm">{p.step}</span>
              </div>
              <h3 className="text-white font-black tracking-wide text-sm uppercase mb-3">{p.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 md:py-28 border-t border-zinc-900">
      <div ref={ref} className={`max-w-3xl mx-auto px-6 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-zinc-500 text-xs font-bold tracking-[0.6em] uppercase mb-4 text-center">FAQ</p>
        <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight text-center mb-14" style={{ letterSpacing: "-0.03em" }}>
          Questions.
        </h2>
        <div className="space-y-0">
          {FAQ.map((item, i) => (
            <div key={i} className="border-b border-zinc-900">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left text-white font-semibold text-sm tracking-wide hover:text-zinc-300 transition-colors">
                {item.q}
                <span className={`text-zinc-500 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <p className="text-zinc-500 text-sm leading-relaxed pb-5">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 md:py-28 border-t border-zinc-900 bg-zinc-950">
      <div ref={ref} className={`max-w-2xl mx-auto px-6 text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-zinc-500 text-xs font-bold tracking-[0.6em] uppercase mb-4">Ready?</p>
        <h2 className="text-white font-black text-4xl md:text-6xl tracking-tight mb-6" style={{ letterSpacing: "-0.04em" }}>
          Let's build it.
        </h2>
        <p className="text-zinc-400 text-lg font-light mb-10 leading-relaxed">
          Tell us about your project. We'll get back to you within the hour.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:junglekabal@gmail.com?subject=[Kabal]%20New%20project"
            className="bg-white text-black font-black px-10 py-4 tracking-widest uppercase text-sm hover:bg-zinc-200 transition-colors">
            Email us
          </a>
          <Link href="/#contact"
            className="border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300">
            Use the form
          </Link>
        </div>
        <p className="text-zinc-700 text-xs tracking-widest mt-8">junglekabal@gmail.com · Bangkok & Pattaya · 48h turnaround</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white flex items-center justify-center">
            <span className="text-black font-black text-xs tracking-tighter">K</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black tracking-[0.2em] uppercase text-sm">Kabal</span>
            <span className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase">Website Agency</span>
          </div>
        </Link>
        <p className="text-zinc-700 text-xs tracking-widest">© 2026 Kabal Website Agency · Bangkok & Pattaya</p>
        <a href="mailto:junglekabal@gmail.com" className="text-zinc-600 hover:text-zinc-400 text-xs tracking-widest transition-colors">
          junglekabal@gmail.com
        </a>
      </div>
    </footer>
  );
}

export default function ServicesPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <ServicesGrid />
      <Process />
      <FAQSection />
      <CTA />
      <Footer />
    </main>
  );
}
