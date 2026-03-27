"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

const C = {
  green:   "#16a34a",
  greenLt: "#dcfce7",
  greenMd: "#4ade80",
  lime:    "#a3e635",
  limeLt:  "#f7fee7",
  yellow:  "#fef08a",
  white:   "#ffffff",
  cream:   "#fefdf8",
  black:   "#0f1a0a",
  gray:    "#6b7280",
  grayLt:  "#f9fafb",
  border:  "#e5e7eb",
};

const MENU = [
  {
    name: "Clean Bowl #1",
    thai: "คลีนโบว์ล",
    cal: "420 kcal",
    price: "89฿",
    tag: "High Protein",
    tagColor: C.green,
    photo: "https://i.postimg.cc/cHkL4ydg/Whats-App-Image-2026-03-27-at-21-30-31.jpg",
    desc: "Grilled protein, brown rice, steamed veggies, house sauce",
  },
  {
    name: "Clean Bowl #2",
    thai: "คลีนโบว์ล",
    cal: "380 kcal",
    price: "89฿",
    tag: "Balanced",
    tagColor: "#0ea5e9",
    photo: "https://i.postimg.cc/fLqRTnMW/Whats-App-Image-2026-03-27-at-21-30-31-(1).jpg",
    desc: "Lean protein, quinoa, fresh greens, light dressing",
  },
  {
    name: "Clean Bowl #3",
    thai: "คลีนโบว์ล",
    cal: "350 kcal",
    price: "89฿",
    tag: "Low Cal",
    tagColor: C.lime,
    photo: "https://i.postimg.cc/pTcLXbP5/Whats-App-Image-2026-03-27-at-21-30-32.jpg",
    desc: "Seasonal veggies, lean protein, wholesome grains",
  },
  {
    name: "Clean Bowl #4",
    thai: "คลีนโบว์ล",
    cal: "400 kcal",
    price: "89฿",
    tag: "High Protein",
    tagColor: C.green,
    photo: "https://i.postimg.cc/PxV5rsdZ/Whats-App-Image-2026-03-27-at-21-30-33.jpg",
    desc: "Power bowl with egg, grains, fresh vegetables & sauce",
  },
  {
    name: "Clean Bowl #5",
    thai: "คลีนโบว์ล",
    cal: "360 kcal",
    price: "89฿",
    tag: "Antioxidant",
    tagColor: "#7c3aed",
    photo: "https://i.postimg.cc/50K2NdfP/Whats-App-Image-2026-03-27-at-21-30-34.jpg",
    desc: "Colorful bowl packed with nutrients, protein & good fats",
  },
  {
    name: "Clean Bowl #6",
    thai: "คลีนโบว์ล",
    cal: "310 kcal",
    price: "89฿",
    tag: "Light",
    tagColor: "#f59e0b",
    photo: "https://i.postimg.cc/cHkL4ydw/Whats-App-Image-2026-03-27-at-21-30-34-(1).jpg",
    desc: "Light & refreshing — perfect for a clean midday meal",
  },
];

const STEPS = [
  { n: "01", icon: "📱", title: "Follow on Instagram", sub: "@kookaicleanfood", desc: "Find us on Instagram and check today's menu & specials." },
  { n: "02", icon: "🛒", title: "DM your order", sub: "Or order via Grab", desc: "Message us directly or order on Grab — we deliver daily across Bangkok." },
  { n: "03", icon: "🏍️", title: "Delivered fresh", sub: "45–60 min", desc: "Your meal is prepared fresh and delivered straight to your door." },
];

const FEATURES = [
  { icon: "🥗", title: "Clean ingredients", desc: "No MSG, no preservatives. Fresh local produce every day." },
  { icon: "⚖️", title: "Calorie counted", desc: "Every meal comes with full nutritional info — so you stay on track." },
  { icon: "🚴", title: "Grab delivery", desc: "Order via Grab and get it delivered anywhere in Bangkok." },
  { icon: "🌿", title: "Thai & healthy", desc: "Thai flavors reimagined — light, balanced, and delicious." },
];

export default function KookaiPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.cream, color: C.black }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.green}; border-radius: 9999px; }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes marquee { from{transform:translateX(0)}to{transform:translateX(-50%)} }
        @keyframes pop-in { 0%{opacity:0;transform:scale(.9) translateY(16px)}100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        .float { animation: float 5s ease-in-out infinite; }
        .marquee { animation: marquee 22s linear infinite; }
        .blob { animation: blob 12s ease-in-out infinite; }
        .card { transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s; }
        .card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(22,163,74,.15); }
        .btn-green { background: ${C.green}; color: white; transition: all .2s; box-shadow: 0 4px 20px ${C.green}55; }
        .btn-green:hover { background: #15803d; box-shadow: 0 8px 30px ${C.green}88; transform: translateY(-2px); }
        .btn-outline { border: 2.5px solid ${C.green}; color: ${C.green}; transition: all .2s; }
        .btn-outline:hover { background: ${C.greenLt}; transform: translateY(-2px); }
        .tag-pill { font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 3px 10px; border-radius: 9999px; }
      `}</style>

      <Navbar mounted={mounted} />
      <Hero mounted={mounted} />
      <Ticker />
      <Features />
      <Menu />
      <HowToOrder />
      <InstagramCTA />
      <Footer />
    </div>
  );
}

function Navbar({ mounted }: { mounted: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(255,255,255,.97)" : C.cream, backdropFilter: "blur(20px)", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.06)" : "none" }}>
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,.1))" }}>🥗</span>
          <span className="righteous text-xl font-black tracking-tight" style={{ color: C.green }}>Kookai.</span>
          <span className="hidden sm:inline text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ml-1" style={{ background: C.greenLt, color: C.green }}>Clean Food</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[["Menu", "menu"], ["How it works", "how"], ["Order", "order"]].map(([l, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[.2em] font-bold transition-colors hover:text-green-600" style={{ color: C.gray }}>{l}</button>
          ))}
        </div>
        <a href="https://instagram.com/kookaicleanfood" target="_blank" rel="noopener noreferrer"
          className="btn-green righteous text-xs px-5 py-2.5 tracking-widest uppercase rounded-full font-bold">
          Order now
        </a>
      </div>
    </nav>
  );
}

function Hero({ mounted }: { mounted: boolean }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ background: `linear-gradient(160deg, ${C.cream} 0%, ${C.greenLt} 60%, ${C.limeLt} 100%)` }}>
      {/* blob bg */}
      <div className="absolute right-[-15%] top-[-10%] w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] blob pointer-events-none opacity-40"
        style={{ background: `radial-gradient(circle, ${C.greenMd} 0%, ${C.lime} 100%)` }} />
      <div className="absolute left-[-8%] bottom-[-5%] w-[40vw] h-[40vw] max-w-[400px] blob pointer-events-none opacity-25"
        style={{ background: C.lime, animationDelay: "4s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full"
                style={{ background: C.green, color: "white" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"/>🏍️ Grab delivery · Bangkok
              </span>
              <span className="text-xs font-black px-3 py-1.5 rounded-full" style={{ background: C.yellow, color: C.black }}>
                📱 Instagram brand
              </span>
            </div>

            <h1 className="righteous leading-[.9] mb-3" style={{ fontSize: "clamp(4rem,12vw,10rem)", color: C.black, letterSpacing: "-.03em" }}>
              Clean.<br />
              <span style={{ color: C.green }}>Real.</span><br />
              Delicious.
            </h1>
            <p className="text-lg mb-2 font-bold" style={{ color: C.green }}>คลีน สุขภาพ ดูโปร 🌿</p>
            <p className="text-base mb-10 leading-relaxed max-w-md" style={{ color: C.gray }}>
              Fresh, clean food made in Bangkok — delivered to you via Grab. No MSG, no preservatives, always calorie-counted.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="https://instagram.com/kookaicleanfood" target="_blank" rel="noopener noreferrer"
                className="btn-green righteous text-sm px-8 py-4 rounded-full tracking-widest uppercase font-black">
                Order on Instagram
              </a>
              <button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-outline righteous text-sm px-8 py-4 rounded-full tracking-widest uppercase font-black">
                See menu
              </button>
            </div>

            {/* stats */}
            <div className="flex gap-8 mt-12">
              {[["6+", "Clean meals"], ["45min", "Avg delivery"], ["0", "MSG added"]].map(([v, l]) => (
                <div key={l}>
                  <p className="righteous text-3xl font-black" style={{ color: C.black }}>{v}</p>
                  <p className="text-xs font-bold tracking-widest uppercase" style={{ color: C.gray }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: food photos */}
          <div className={`relative transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative">
              {/* Main photo */}
              <div className="float relative overflow-hidden shadow-2xl" style={{ borderRadius: "2.5rem", border: `4px solid white`, height: "420px" }}>
                <img src="https://i.postimg.cc/PxV5rsdV/Whats-App-Image-2026-03-27-at-21-30-35.jpg"
                  alt="Kookai clean food" className="w-full h-full object-cover" />
                <div className="absolute inset-0 rounded-[2.3rem]" style={{ background: `linear-gradient(to top, ${C.green}30, transparent)` }} />
              </div>

              {/* Float card 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-4 py-3 shadow-xl" style={{ border: `2px solid ${C.greenLt}` }}>
                <p className="text-xs font-bold" style={{ color: C.gray }}>Today's special 🌟</p>
                <p className="righteous text-base font-black" style={{ color: C.green }}>Grilled Chicken Bowl</p>
                <p className="text-xs font-bold" style={{ color: C.gray }}>420 kcal · 89฿</p>
              </div>

              {/* Float card 2 */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl" style={{ border: `2px solid ${C.limeLt}` }}>
                <p className="text-2xl mb-1">⭐⭐⭐⭐⭐</p>
                <p className="text-xs font-bold" style={{ color: C.gray }}>Loved by 200+ customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = ["Clean Food", "คลีนฟู้ด", "Grab Delivery", "Bangkok", "No MSG", "High Protein", "Low Calorie", "Fresh Daily", "ดูโปร", "สุขภาพดี", "Acai Bowl", "Chicken Bowl", "Calorie Counted"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-4 border-y-2" style={{ background: C.green, borderColor: C.black }}>
      <div className="flex whitespace-nowrap marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-6">
            <span className="righteous text-sm tracking-[.25em] uppercase font-black text-white">{item}</span>
            <span className="text-white/50 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const { ref, inView } = useInView(0.1);
  return (
    <section className="py-20 md:py-28" style={{ background: C.white }}>
      <div className="max-w-6xl mx-auto px-6">
        <p className="righteous text-xs tracking-[.45em] uppercase mb-3 font-bold" style={{ color: C.green }}>Why Kookai</p>
        <h2 className="righteous leading-none mb-14" style={{ fontSize: "clamp(2.5rem,7vw,6rem)", color: C.black }}>
          Food that<br /><span style={{ color: C.green }}>works for you.</span>
        </h2>
        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="card p-7 text-center"
              style={{ background: i % 2 === 0 ? C.greenLt : C.limeLt, borderRadius: "2rem", transitionDelay: `${i * 60}ms` }}>
              <p className="text-4xl mb-4">{f.icon}</p>
              <p className="righteous text-base font-black mb-2" style={{ color: C.black }}>{f.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: C.gray }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="menu" className="py-20 md:py-28" style={{ background: C.cream }}>
      <div className="max-w-6xl mx-auto px-6">
        <p className="righteous text-xs tracking-[.45em] uppercase mb-3 font-bold" style={{ color: C.green }}>Our menu</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="righteous leading-none" style={{ fontSize: "clamp(2.5rem,7vw,6rem)", color: C.black }}>
            Fresh.<br /><span style={{ color: C.green }}>Every day.</span>
          </h2>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: C.gray }}>
            Our menu rotates daily. Follow us on Instagram to see what's cooking today 🌿
          </p>
        </div>
        <div ref={ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {MENU.map((m, i) => (
            <div key={m.name} className="card overflow-hidden bg-white"
              style={{ borderRadius: "2rem", transitionDelay: `${i * 60}ms`, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
              {/* Photo */}
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <img src={m.photo} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,.3), transparent)" }} />
                <span className="absolute top-3 left-3 tag-pill" style={{ background: m.tagColor, color: "white" }}>{m.tag}</span>
                <span className="absolute top-3 right-3 tag-pill bg-white font-black" style={{ color: C.black }}>{m.cal}</span>
              </div>
              {/* Info */}
              <div className="p-5">
                <p className="righteous text-lg font-black mb-0.5" style={{ color: C.black }}>{m.name}</p>
                <p className="text-xs mb-2 font-bold" style={{ color: C.green }}>{m.thai}</p>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: C.gray }}>{m.desc}</p>
                <div className="flex items-center justify-between">
                  <p className="righteous text-2xl font-black" style={{ color: C.green }}>{m.price}</p>
                  <a href="https://instagram.com/kookaicleanfood" target="_blank" rel="noopener noreferrer"
                    className="btn-green text-xs font-black px-4 py-2 rounded-full tracking-wider uppercase">
                    Order
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowToOrder() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="how" className="py-20 md:py-28" style={{ background: C.green }}>
      <div className="max-w-6xl mx-auto px-6">
        <p className="righteous text-xs tracking-[.45em] uppercase mb-3 font-bold" style={{ color: C.greenMd }}>Simple</p>
        <h2 className="righteous leading-none mb-14" style={{ fontSize: "clamp(2.5rem,7vw,6rem)", color: "white" }}>
          3 steps to<br />clean eating.
        </h2>
        <div ref={ref} className={`grid md:grid-cols-3 gap-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {STEPS.map((s, i) => (
            <div key={s.n} className="card p-8"
              style={{ background: "rgba(255,255,255,.12)", borderRadius: "2rem", border: "1px solid rgba(255,255,255,.2)", transitionDelay: `${i * 80}ms` }}>
              <span className="righteous text-6xl font-black block mb-4" style={{ color: "rgba(255,255,255,.15)" }}>{s.n}</span>
              <p className="text-4xl mb-4">{s.icon}</p>
              <p className="righteous text-xl font-black text-white mb-1">{s.title}</p>
              <p className="text-sm font-bold mb-3" style={{ color: C.greenMd }}>{s.sub}</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.7)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramCTA() {
  const { ref, inView } = useInView(0.2);
  return (
    <section id="order" className="py-20 md:py-28" style={{ background: C.cream }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-6xl mb-6 float inline-block">🥗</div>
          <h2 className="righteous leading-none mb-4" style={{ fontSize: "clamp(3rem,9vw,8rem)", color: C.black }}>
            Ready to<br /><span style={{ color: C.green }}>eat clean?</span>
          </h2>
          <p className="text-lg mb-3 font-bold" style={{ color: C.green }}>สั่งได้เลย · Order now</p>
          <p className="text-base mb-10 max-w-md mx-auto leading-relaxed" style={{ color: C.gray }}>
            Follow us on Instagram for the daily menu. DM to order or find us on Grab — delivered fresh across Bangkok.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://instagram.com/kookaicleanfood" target="_blank" rel="noopener noreferrer"
              className="btn-green righteous text-sm px-10 py-5 rounded-full tracking-widest uppercase font-black text-white w-full sm:w-auto">
              📱 @kookaicleanfood
            </a>
            <a href="https://grab.com" target="_blank" rel="noopener noreferrer"
              className="righteous text-sm px-10 py-5 rounded-full tracking-widest uppercase font-black w-full sm:w-auto transition-all hover:-translate-y-1"
              style={{ background: "#00B14F", color: "white", boxShadow: "0 4px 20px #00B14F55" }}>
              🏍️ Order on Grab
            </a>
          </div>
          {/* Delivery areas */}
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {["Sukhumvit", "Silom", "Sathorn", "Asok", "Phrom Phong", "On Nut", "Thonglor", "Ekkamai"].map(area => (
              <span key={area} className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: C.greenLt, color: C.green }}>📍 {area}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t-2" style={{ background: C.black, borderColor: C.green }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span>🥗</span>
          <span className="righteous text-xl font-black" style={{ color: C.green }}>Kookai.</span>
          <span className="text-xs font-bold tracking-widest uppercase ml-3" style={{ color: "#4a5a40" }}>Clean Food · Bangkok</span>
        </div>
        <p className="text-xs font-bold" style={{ color: "#3a4a30" }}>คลีน สุขภาพ ดูโปร · Grab delivery · 2026</p>
      </div>
    </footer>
  );
}
