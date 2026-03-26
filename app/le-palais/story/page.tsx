"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView(threshold = 0.15) {
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const GOLD = "#c9a55a";
const GOLD_LIGHT = "#e8d5a3";

export default function LePalaisStory() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  return (
    <div className="bg-black min-h-screen text-white" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; }

        @keyframes shimmer-gold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shimmer {
          background: linear-gradient(90deg, ${GOLD} 0%, ${GOLD_LIGHT} 40%, ${GOLD} 60%, #a07840 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-gold 5s linear infinite;
        }
        .divider-rule {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .divider-rule::before, .divider-rule::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${GOLD}60);
        }
        .divider-rule::after {
          background: linear-gradient(270deg, transparent, ${GOLD}60);
        }
        .metric-card {
          border: 1px solid ${GOLD}30;
          background: linear-gradient(135deg, ${GOLD}08, transparent);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .metric-card:hover {
          border-color: ${GOLD}70;
          background: linear-gradient(135deg, ${GOLD}12, transparent);
        }
        .timeline-line {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, ${GOLD}60, transparent);
        }
        .timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid ${GOLD};
          background: black;
          position: absolute;
          left: -4.5px;
          top: 6px;
        }
        @keyframes float-ornament {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
          50% { transform: translateY(-12px) rotate(3deg); opacity: 0.25; }
        }
        .float-ornament { animation: float-ornament 8s ease-in-out infinite; }
      `}</style>

      {/* Floating background ornaments */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="float-ornament absolute top-[20%] left-[5%] text-[120px] select-none" style={{ color: GOLD }}>◆</div>
        <div className="float-ornament absolute bottom-[30%] right-[4%] text-[80px] select-none" style={{ color: GOLD, animationDelay: "3s" }}>◆</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full blur-[160px] pointer-events-none opacity-10"
          style={{ background: `radial-gradient(ellipse, ${GOLD}, transparent)` }} />
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <div className={`transition-all duration-1200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="divider-rule mb-8 max-w-xs mx-auto">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: GOLD }}>Case Study</span>
          </div>
          <p className="text-xs font-bold tracking-[0.6em] uppercase mb-4" style={{ color: GOLD, opacity: 0.6 }}>Le Palais · Bangkok · 2025</p>
          <h1 className="font-black leading-none mb-6" style={{ fontSize: "clamp(3rem,10vw,8rem)", letterSpacing: "-0.04em" }}>
            <span className="gold-shimmer">From Brief</span>
            <br />
            <span className="text-white">to Launch</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            How we transformed a Michelin-starred French restaurant's vision into a high-converting luxury website — delivered in 36 hours.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 mx-auto animate-pulse" style={{ background: `linear-gradient(to bottom, ${GOLD}60, transparent)` }} />
        </div>
      </section>

      {/* Results at a glance */}
      <section className="py-16 border-y" style={{ borderColor: `${GOLD}20` }}>
        <Reveal>
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-center text-[10px] font-bold tracking-[0.5em] uppercase mb-10" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif" }}>Results at a glance</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "+40%", label: "Reservations in month 1" },
                { value: "36h", label: "Delivery time" },
                { value: "3", label: "Michelin stars featured" },
                { value: "1", label: "Brief, zero revisions" },
              ].map((m) => (
                <div key={m.label} className="metric-card p-6 text-center">
                  <div className="font-black text-3xl md:text-4xl leading-none mb-2 gold-shimmer">{m.value}</div>
                  <div className="text-xs tracking-widest uppercase text-zinc-500" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-32">

        {/* 01 — The Brief */}
        <Reveal>
          <div className="relative pl-8">
            <div className="timeline-line" />
            <div className="timeline-dot" />
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif" }}>01 · The Brief</p>
            <h2 className="text-white font-black text-4xl md:text-5xl leading-tight mb-6">
              &ldquo;Something that feels<br /><span className="gold-shimmer">like a Michelin menu.&rdquo;</span>
            </h2>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              <p>
                Marc Lefebvre, the owner of Le Palais, had been operating his award-winning French restaurant in Bangkok for three years. His reputation was stellar — three Michelin stars, consistently fully booked via word of mouth. But his website was a liability.
              </p>
              <p>
                The old site looked like it was built in 2012: generic template, no photos, slow to load. Guests were being referred to a site that didn't match the experience they'd just had. New guests judged the restaurant by the website before ever walking through the door.
              </p>
              <p>
                His brief to us was simple: <em className="text-zinc-200">"Make it feel like the restaurant. Gold, luxurious, French. And I need it by the weekend."</em>
              </p>
            </div>

            <div className="mt-8 p-6 border-l-2" style={{ borderColor: GOLD, background: `${GOLD}08` }}>
              <p className="text-xl leading-relaxed italic" style={{ color: GOLD_LIGHT }}>
                &ldquo;The old site was embarrassing. Guests would book through Instagram DMs because the website didn&apos;t have a real reservation button.&rdquo;
              </p>
              <p className="mt-3 text-sm text-zinc-500" style={{ fontFamily: "var(--font-inter), sans-serif" }}>— Marc Lefebvre, Owner</p>
            </div>
          </div>
        </Reveal>

        {/* 02 — The Design */}
        <Reveal>
          <div className="relative pl-8">
            <div className="timeline-line" />
            <div className="timeline-dot" />
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif" }}>02 · The Design</p>
            <h2 className="text-white font-black text-4xl md:text-5xl leading-tight mb-6">
              Every pixel<br /><span className="gold-shimmer">tells the story.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              <p>
                We started from a single reference: the restaurant's printed menu. Heavy cream paper, gold foil title, Playfair Display serif. That became the entire design language.
              </p>
              <p>
                Black backgrounds to let the food photography breathe. Amber and gold accents to evoke warmth and prestige. Playfair Display for headings — elegant, literary, French in spirit. A dish-by-dish showcase that scrolled like a menu being handed to you.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Typography", value: "Playfair Display", sub: "Serif, editorial" },
                { label: "Palette", value: "Amber & Noir", sub: "Gold on deep black" },
                { label: "Motion", value: "Parallax scroll", sub: "Marquee + fade-ins" },
              ].map((d) => (
                <div key={d.label} className="metric-card p-5">
                  <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-zinc-600 mb-1" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{d.label}</div>
                  <div className="font-black text-white text-lg leading-none mb-1">{d.value}</div>
                  <div className="text-xs text-zinc-500" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{d.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 03 — The Build */}
        <Reveal>
          <div className="relative pl-8">
            <div className="timeline-line" />
            <div className="timeline-dot" />
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif" }}>03 · The Build</p>
            <h2 className="text-white font-black text-4xl md:text-5xl leading-tight mb-6">
              36 hours.<br /><span className="gold-shimmer">Start to launch.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              <p>
                We built on Next.js with Tailwind CSS — our standard stack. Next.js gives us instant performance out of the box: image optimization, edge rendering, near-zero Time to Interactive. Critical for a luxury brand where slow = dead.
              </p>
              <p>
                The reservation system uses a direct WhatsApp deep link — no backend, no maintenance, no failure points. Guests tap a button and land in a pre-filled WhatsApp conversation. Marc sees the booking request on his phone instantly.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {[
                { time: "Hour 0–4", task: "Brief call, mood board, color palette locked" },
                { time: "Hour 4–12", task: "Component architecture, hero section, typography system" },
                { time: "Hour 12–24", task: "Menu section, photo integration, animations" },
                { time: "Hour 24–30", task: "Reservation flow, mobile optimization, SEO" },
                { time: "Hour 30–36", task: "QA across devices, performance audit, DNS handoff" },
              ].map((step) => (
                <div key={step.time} className="flex items-start gap-4 p-4 metric-card">
                  <div className="text-xs font-bold tracking-widest shrink-0 pt-0.5" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif", minWidth: 80 }}>{step.time}</div>
                  <div className="text-zinc-400 text-sm" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{step.task}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 04 — The Result */}
        <Reveal>
          <div className="relative pl-8">
            <div className="timeline-line" />
            <div className="timeline-dot" />
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase mb-3" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif" }}>04 · The Result</p>
            <h2 className="text-white font-black text-4xl md:text-5xl leading-tight mb-6">
              The site became<br /><span className="gold-shimmer">the front of house.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              <p>
                Within the first week, Marc reported that guests were mentioning the website at the table. Reservations shifted from Instagram DMs to the WhatsApp flow — measurable, trackable, professional.
              </p>
              <p>
                Month one: +40% in direct reservations. Marc attributed the increase entirely to the new online presence making the booking process frictionless.
              </p>
            </div>

            <div className="mt-8 p-6 border-l-2" style={{ borderColor: GOLD, background: `${GOLD}08` }}>
              <p className="text-xl leading-relaxed italic" style={{ color: GOLD_LIGHT }}>
                &ldquo;They delivered our entire restaurant website in 36 hours. The design is incredible — our reservations went up 40% in the first month.&rdquo;
              </p>
              <p className="mt-3 text-sm text-zinc-500" style={{ fontFamily: "var(--font-inter), sans-serif" }}>— Marc Lefebvre, Owner · Le Palais Bangkok</p>
            </div>
          </div>
        </Reveal>

      </div>

      {/* CTA */}
      <Reveal>
        <section className="py-24 border-t text-center px-6" style={{ borderColor: `${GOLD}20` }}>
          <div className="divider-rule mb-10 max-w-xs mx-auto">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: GOLD }}>Your story next</span>
          </div>
          <h2 className="font-black text-4xl md:text-6xl leading-none mb-6" style={{ letterSpacing: "-0.04em" }}>
            <span className="gold-shimmer">Ready to launch</span>
            <br />
            <span className="text-white">in 48 hours?</span>
          </h2>
          <p className="text-zinc-500 text-lg mb-10 max-w-md mx-auto" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Tell us about your business. We'll design, build, and launch your site — fast.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`https://wa.me/66812345678?text=${encodeURIComponent("Hi Kabal! I saw your Le Palais case study and want to build a website. 🙏")}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-white text-black font-black px-10 py-4 tracking-widest uppercase text-sm hover:bg-zinc-200 transition-colors"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Start your project
            </a>
            <Link href="/le-palais"
              className="border text-zinc-400 hover:text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300"
              style={{ borderColor: "#333", fontFamily: "var(--font-inter), sans-serif" }}>
              View Le Palais site
            </Link>
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="py-10 border-t text-center" style={{ borderColor: `${GOLD}15` }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-5 h-5 bg-white flex items-center justify-center">
            <span className="text-black font-black text-[9px]">K</span>
          </div>
          <span className="text-zinc-600 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Kabal · Website Agency</span>
        </div>
        <Link href="/" className="text-zinc-700 hover:text-zinc-400 text-xs tracking-widest uppercase transition-colors" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          ← Back to portfolio
        </Link>
      </footer>
    </div>
  );
}
