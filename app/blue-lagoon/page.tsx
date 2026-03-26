"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function BlueLagoonPage() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"compact" | "full">("compact");
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ backgroundColor: "#050e12", minHeight: "100vh", color: "#e0f7fa", fontFamily: "system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #050e12; }
        ::-webkit-scrollbar-thumb { background: #0891b2; }
        .fade-up { transition: opacity 0.8s ease, transform 0.8s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.hidden-state { opacity: 0; transform: translateY(30px); }
        .nav-link { color: #94e0ed; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; transition: color 0.3s ease; background: none; border: none; cursor: pointer; font-family: system-ui, sans-serif; }
        .nav-link:hover { color: #22d3ee; }
        .btn-cyan { display: inline-block; background: #0891b2; color: #fff; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; padding: 13px 32px; text-decoration: none; border-radius: 3px; transition: background 0.3s ease, box-shadow 0.3s ease; border: none; cursor: pointer; font-family: system-ui, sans-serif; }
        .btn-cyan:hover { background: #0e7490; box-shadow: 0 0 20px rgba(8,145,178,0.5); }
        .btn-outline-cyan { display: inline-block; border: 1.5px solid #0891b2; color: #22d3ee; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; padding: 13px 32px; text-decoration: none; border-radius: 3px; transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease; background: transparent; cursor: pointer; font-family: system-ui, sans-serif; }
        .btn-outline-cyan:hover { background: rgba(8,145,178,0.15); box-shadow: 0 0 16px rgba(8,145,178,0.3); color: #fff; }
        .gallery-img { transition: transform 0.4s ease, filter 0.4s ease; filter: brightness(0.8) saturate(1.1); overflow: hidden; }
        .gallery-img:hover { filter: brightness(1) saturate(1.3); }
        .gallery-img img { transition: transform 0.5s ease; }
        .gallery-img:hover img { transform: scale(1.06); }
        .cocktail-img { transition: transform 0.5s ease, box-shadow 0.5s ease; }
        .cocktail-img:hover { transform: scale(1.03); box-shadow: 0 0 40px rgba(8,145,178,0.35); }
        .event-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .event-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(8,145,178,0.25); border-color: #0891b2 !important; }
        .stat-pill { transition: box-shadow 0.3s ease; }
        .stat-pill:hover { box-shadow: 0 0 24px rgba(8,145,178,0.4); }
        .hours-row:nth-child(even) { background: rgba(8,145,178,0.06); }
      `}</style>

      <Navbar mode={mode} setMode={setMode} />
      <Hero mounted={mounted} />
      <StatsBar />
      <SignatureCocktails />
      {mode === "full" && <Gallery />}
      {mode === "full" && <Events />}
      <Location />
      <Footer />
    </div>
  );
}

/* ── Navbar ──────────────────────────────────────────────────── */
function Navbar({ mode, setMode }: { mode: "compact" | "full"; setMode: (m: "compact" | "full") => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "background 0.5s ease, borderColor 0.5s ease",
      background: scrolled ? "rgba(5,14,18,0.93)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(8,145,178,0.2)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      padding: "0 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "68px",
    }}>
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontSize: "26px", lineHeight: 1 }}>🌊</span>
        <span className="righteous" style={{ color: "#22d3ee", fontSize: "18px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Blue Lagoon
        </span>
      </button>

      {/* Nav links + toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        <button className="nav-link" onClick={() => scrollTo("cocktails")}>Menu</button>
        <button className="nav-link" onClick={() => scrollTo("gallery")}>Gallery</button>
        <button className="nav-link" onClick={() => scrollTo("events")}>Events</button>
        <button className="nav-link" onClick={() => scrollTo("location")}>Location</button>
        <div style={{ display: "flex", overflow: "hidden", border: "1px solid rgba(8,145,178,0.3)" }}>
          {(["compact", "full"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              style={{
                fontSize: "9px", fontWeight: "bold", padding: "6px 10px", letterSpacing: "0.2em",
                textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.2s",
                background: mode === m ? "#0891b2" : "transparent",
                color: mode === m ? "#fff" : "rgba(8,145,178,0.5)",
              }}>
              {m}
            </button>
          ))}
        </div>
        <button className="btn-cyan" onClick={() => scrollTo("location")} style={{ fontSize: "11px", padding: "9px 22px" }}>
          Find Us
        </button>
      </div>
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
function Hero({ mounted }: { mounted: boolean }) {
  return (
    <section style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", textAlign: "center",
    }}>
      {/* Background photo */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://images.pexels.com/photos/6181098/pexels-photo-6181098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.4,
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, #050e12 0%, transparent 35%, transparent 65%, #050e12 100%)",
      }} />
      {/* Cyan glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 60%, rgba(8,145,178,0.18) 0%, transparent 65%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2, maxWidth: "880px", padding: "0 24px",
        opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 1s ease, transform 1s ease",
      }}>
        <p style={{
          fontSize: "11px", letterSpacing: "0.42em", textTransform: "uppercase",
          color: "#22d3ee", marginBottom: "20px", fontWeight: 500,
        }}>
          Koh Samui · Thailand
        </p>

        <h1 className="righteous" style={{
          fontSize: "clamp(64px, 12vw, 128px)", lineHeight: 0.9,
          color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase",
          textShadow: "0 0 60px rgba(8,145,178,0.5), 0 0 120px rgba(8,145,178,0.25)",
          marginBottom: "28px",
        }}>
          Blue Lagoon
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2.5vw, 22px)", color: "#94e0ed",
          letterSpacing: "0.12em", marginBottom: "40px", fontStyle: "italic",
        }}>
          Cocktails, Sunsets &amp; Good Vibes
        </p>

        {/* Stats inline */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "24px", marginBottom: "48px", flexWrap: "wrap",
        }}>
          <span style={{ fontSize: "12px", letterSpacing: "0.16em", color: "#67e8f9", textTransform: "uppercase" }}>
            ⏰ Happy Hour 16:00–19:00
          </span>
          <span style={{ color: "rgba(8,145,178,0.5)", fontSize: "18px" }}>·</span>
          <span style={{ fontSize: "12px", letterSpacing: "0.16em", color: "#67e8f9", textTransform: "uppercase" }}>
            🌴 Open Daily 11:00–02:00
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn-cyan"
            onClick={() => document.getElementById("cocktails")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Cocktail Menu
          </button>
          <button
            className="btn-outline-cyan"
            onClick={() => document.getElementById("location")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Directions
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        opacity: mounted ? 0.6 : 0, transition: "opacity 1.2s ease 0.5s",
      }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#67e8f9", textTransform: "uppercase" }}>Scroll</span>
        <div style={{
          width: "1px", height: "40px",
          background: "linear-gradient(to bottom, #0891b2, transparent)",
        }} />
      </div>
    </section>
  );
}

/* ── Stats Bar ───────────────────────────────────────────────── */
function StatsBar() {
  const { ref, inView } = useInView(0.2);
  const stats = [
    { icon: "🕐", label: "Open Daily" },
    { icon: "🍹", label: "100+ Cocktails" },
    { icon: "🎵", label: "Live Events" },
    { icon: "🏖️", label: "Beachfront" },
  ];
  return (
    <div ref={ref} style={{
      borderTop: "1px solid rgba(8,145,178,0.2)",
      borderBottom: "1px solid rgba(8,145,178,0.2)",
      background: "rgba(8,145,178,0.06)",
      padding: "28px 24px",
    }}>
      <div style={{
        maxWidth: "900px", margin: "0 auto",
        display: "flex", justifyContent: "center", alignItems: "center",
        gap: "16px", flexWrap: "wrap",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              className="stat-pill"
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 24px",
                border: "1px solid rgba(8,145,178,0.3)",
                borderRadius: "40px",
                background: "rgba(8,145,178,0.08)",
              }}
            >
              <span style={{ fontSize: "18px" }}>{s.icon}</span>
              <span style={{ fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#67e8f9" }}>
                {s.label}
              </span>
            </div>
            {i < stats.length - 1 && (
              <span style={{ color: "rgba(8,145,178,0.3)", fontSize: "20px", marginLeft: "8px" }}>·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Signature Cocktails ─────────────────────────────────────── */
const COCKTAILS = [
  {
    name: "Blue Lagoon Mojito",
    price: "220 THB",
    desc: "Our signature twist on a classic — fresh mint, blue curaçao, lime juice, and soda over crushed ice. Vivid, refreshing, and impossible to resist.",
    img: "https://images.pexels.com/photos/3320497/pexels-photo-3320497.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tag: "House Favourite",
  },
  {
    name: "Sunset Aperol Spritz",
    price: "260 THB",
    desc: "Aperol, prosecco and a splash of tropical passion fruit syrup, garnished with an orange slice — the perfect golden-hour companion on the beach.",
    img: "https://images.pexels.com/photos/5856354/pexels-photo-5856354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tag: "Sunset Special",
  },
  {
    name: "Tropical Punch",
    price: "200 THB",
    desc: "A vibrant blend of mango, pineapple, coconut rum and grenadine, finished with a cinnamon stick and fresh fruit skewer. Pure island joy in a glass.",
    img: "https://images.pexels.com/photos/2531184/pexels-photo-2531184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tag: "Crowd Pleaser",
  },
];

function SignatureCocktails() {
  return (
    <section id="cocktails" style={{ padding: "100px 24px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
      <SectionLabel label="Craft Cocktails" />
      <h2 className="righteous" style={{
        fontSize: "clamp(36px, 6vw, 60px)", color: "#fff", letterSpacing: "0.06em",
        textTransform: "uppercase", marginBottom: "16px",
        textShadow: "0 0 30px rgba(8,145,178,0.3)",
      }}>
        Signature Drinks
      </h2>
      <p style={{ color: "#67e8f9", fontSize: "15px", marginBottom: "72px", letterSpacing: "0.05em" }}>
        Handcrafted with love, served with a view
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
        {COCKTAILS.map((c, i) => {
          const isEven = i % 2 === 0;
          return <CocktailRow key={i} cocktail={c} reversed={!isEven} />;
        })}
      </div>
    </section>
  );
}

function CocktailRow({
  cocktail,
  reversed,
}: {
  cocktail: (typeof COCKTAILS)[0];
  reversed: boolean;
}) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className="fade-up"
      style={{
        display: "flex",
        flexDirection: reversed ? "row-reverse" : "row",
        alignItems: "center",
        gap: "56px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* Image */}
      <div className="cocktail-img" style={{
        flex: "0 0 420px", height: "320px", borderRadius: "8px",
        overflow: "hidden", border: "1px solid rgba(8,145,178,0.2)",
        boxShadow: "0 0 30px rgba(8,145,178,0.12)",
      }}>
        <img
          src={cocktail.img}
          alt={cocktail.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <span style={{
          display: "inline-block", fontSize: "10px", letterSpacing: "0.3em",
          textTransform: "uppercase", color: "#0891b2", border: "1px solid rgba(8,145,178,0.4)",
          padding: "4px 14px", borderRadius: "20px", marginBottom: "16px",
          background: "rgba(8,145,178,0.08)",
        }}>
          {cocktail.tag}
        </span>
        <h3 className="righteous" style={{
          fontSize: "clamp(26px, 3.5vw, 38px)", color: "#fff",
          letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "8px",
        }}>
          {cocktail.name}
        </h3>
        <p style={{
          fontSize: "22px", color: "#22d3ee", fontWeight: 600,
          marginBottom: "20px", letterSpacing: "0.08em",
        }}>
          {cocktail.price}
        </p>
        <p style={{ color: "#94e0ed", fontSize: "15px", lineHeight: 1.75, maxWidth: "420px", margin: "0 auto" }}>
          {cocktail.desc}
        </p>
      </div>
    </div>
  );
}

/* ── Gallery ─────────────────────────────────────────────────── */
const GALLERY_PHOTOS = [
  "https://images.pexels.com/photos/2531188/pexels-photo-2531188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/2531185/pexels-photo-2531185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/1879386/pexels-photo-1879386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/4869319/pexels-photo-4869319.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/3320497/pexels-photo-3320497.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/5856354/pexels-photo-5856354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/2531184/pexels-photo-2531184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/6181098/pexels-photo-6181098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
];

function Gallery() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="gallery" style={{ padding: "100px 24px", textAlign: "center", background: "rgba(8,145,178,0.03)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionLabel label="The Vibe" />
        <h2 className="righteous" style={{
          fontSize: "clamp(36px, 6vw, 60px)", color: "#fff", letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: "16px",
          textShadow: "0 0 30px rgba(8,145,178,0.3)",
        }}>
          Gallery
        </h2>
        <p style={{ color: "#67e8f9", fontSize: "15px", marginBottom: "56px", letterSpacing: "0.05em" }}>
          Sun, sea, and seriously good drinks
        </p>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, 240px)",
            gap: "12px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {GALLERY_PHOTOS.map((src, i) => (
            <div
              key={i}
              className="gallery-img"
              style={{
                borderRadius: "6px", overflow: "hidden",
                border: "1px solid rgba(8,145,178,0.15)",
              }}
            >
              <img
                src={src}
                alt={`Gallery photo ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Events ──────────────────────────────────────────────────── */
const EVENTS = [
  {
    emoji: "🎧",
    title: "Every Friday",
    subtitle: "Live DJ Night",
    desc: "Top local and international DJs spin deep house, tropical beats and island grooves from 21:00 until the early hours. Free entry before 22:00.",
    badge: "Weekly",
  },
  {
    emoji: "🌅",
    title: "Every Sunday",
    subtitle: "Sunset Party",
    desc: "Our legendary weekly sunset celebration. Watch the sky turn gold over the Gulf of Thailand while sipping on discounted cocktails and sharing great energy.",
    badge: "Weekly",
  },
  {
    emoji: "🍹",
    title: "Daily",
    subtitle: "Happy Hour",
    desc: "Every single day from 16:00 to 19:00 — two-for-one on all signature cocktails, craft beers, and mocktails. The best way to start your evening.",
    badge: "Daily 16:00–19:00",
  },
];

function Events() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="events" style={{ padding: "100px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel label="What's On" />
        <h2 className="righteous" style={{
          fontSize: "clamp(36px, 6vw, 60px)", color: "#fff", letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: "16px",
          textShadow: "0 0 30px rgba(8,145,178,0.3)",
        }}>
          Events
        </h2>
        <p style={{ color: "#67e8f9", fontSize: "15px", marginBottom: "60px", letterSpacing: "0.05em" }}>
          The party never stops at Blue Lagoon
        </p>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              className="event-card"
              style={{
                padding: "40px 32px",
                border: "1px solid rgba(8,145,178,0.25)",
                borderRadius: "10px",
                background: "rgba(8,145,178,0.05)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "42px", marginBottom: "20px" }}>{ev.emoji}</div>
              <span style={{
                display: "inline-block", fontSize: "10px", letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#0891b2",
                border: "1px solid rgba(8,145,178,0.4)", padding: "3px 12px",
                borderRadius: "20px", marginBottom: "16px",
                background: "rgba(8,145,178,0.08)",
              }}>
                {ev.badge}
              </span>
              <h3 className="righteous" style={{
                fontSize: "13px", letterSpacing: "0.3em", color: "#94e0ed",
                textTransform: "uppercase", marginBottom: "6px",
              }}>
                {ev.title}
              </h3>
              <h4 className="righteous" style={{
                fontSize: "24px", color: "#fff", letterSpacing: "0.06em",
                textTransform: "uppercase", marginBottom: "16px",
              }}>
                {ev.subtitle}
              </h4>
              <p style={{ color: "#7dd3e8", fontSize: "14px", lineHeight: 1.75 }}>
                {ev.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Location ────────────────────────────────────────────────── */
function Location() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="location" style={{ padding: "100px 24px", textAlign: "center", background: "rgba(8,145,178,0.03)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel label="Find Us" />
        <h2 className="righteous" style={{
          fontSize: "clamp(36px, 6vw, 60px)", color: "#fff", letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: "16px",
          textShadow: "0 0 30px rgba(8,145,178,0.3)",
        }}>
          Location &amp; Hours
        </h2>
        <p style={{ color: "#67e8f9", fontSize: "15px", marginBottom: "56px", letterSpacing: "0.05em" }}>
          Right on the beach — you really can&apos;t miss us
        </p>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "40px",
            alignItems: "start",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {/* Map */}
          <div style={{
            borderRadius: "10px", overflow: "hidden",
            border: "1px solid rgba(8,145,178,0.25)",
            boxShadow: "0 0 40px rgba(8,145,178,0.15)",
            height: "420px",
          }}>
            <iframe
              title="Blue Lagoon Beach Bar location"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", filter: "invert(0.9) hue-rotate(180deg) saturate(0.8)" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=9.5120,100.0136&z=15&output=embed"
            />
          </div>

          {/* Hours */}
          <div style={{
            border: "1px solid rgba(8,145,178,0.25)",
            borderRadius: "10px",
            overflow: "hidden",
            background: "rgba(8,145,178,0.05)",
          }}>
            <div style={{
              padding: "24px 28px",
              borderBottom: "1px solid rgba(8,145,178,0.2)",
              background: "rgba(8,145,178,0.1)",
            }}>
              <h3 className="righteous" style={{
                fontSize: "18px", color: "#22d3ee", letterSpacing: "0.12em", textTransform: "uppercase",
              }}>
                Opening Hours
              </h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Monday", "11:00 – 02:00"],
                  ["Tuesday", "11:00 – 02:00"],
                  ["Wednesday", "11:00 – 02:00"],
                  ["Thursday", "11:00 – 02:00"],
                  ["Friday", "11:00 – 03:00"],
                  ["Saturday", "11:00 – 03:00"],
                  ["Sunday", "11:00 – 02:00"],
                ].map(([day, hours]) => (
                  <tr key={day} className="hours-row">
                    <td style={{ padding: "13px 28px", fontSize: "13px", color: "#94e0ed", letterSpacing: "0.05em" }}>{day}</td>
                    <td style={{ padding: "13px 28px", fontSize: "13px", color: "#22d3ee", textAlign: "right", letterSpacing: "0.08em" }}>{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: "20px 28px", borderTop: "1px solid rgba(8,145,178,0.2)" }}>
              <p style={{ fontSize: "12px", color: "#67e8f9", letterSpacing: "0.1em", marginBottom: "4px" }}>
                Happy Hour Every Day
              </p>
              <p style={{ fontSize: "14px", color: "#22d3ee", letterSpacing: "0.08em", fontWeight: 600 }}>
                16:00 – 19:00
              </p>
            </div>

            <div style={{ padding: "20px 28px", borderTop: "1px solid rgba(8,145,178,0.2)" }}>
              <p style={{ fontSize: "12px", color: "#67e8f9", letterSpacing: "0.08em", marginBottom: "4px" }}>
                Address
              </p>
              <p style={{ fontSize: "13px", color: "#94e0ed", lineHeight: 1.6 }}>
                Chaweng Beach Road<br />
                Koh Samui, Surat Thani<br />
                Thailand 84320
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(8,145,178,0.2)",
      padding: "56px 24px 40px",
      textAlign: "center",
      background: "rgba(8,145,178,0.04)",
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "24px" }}>
          <span style={{ fontSize: "28px" }}>🌊</span>
          <span className="righteous" style={{ color: "#22d3ee", fontSize: "22px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Blue Lagoon
          </span>
        </div>

        <p style={{ fontSize: "13px", color: "#67e8f9", letterSpacing: "0.1em", marginBottom: "8px" }}>
          Cocktails · Sunsets · Good Vibes
        </p>
        <p style={{ fontSize: "12px", color: "#4a9ab5", letterSpacing: "0.08em", marginBottom: "32px" }}>
          Chaweng Beach, Koh Samui, Thailand
        </p>

        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "36px", flexWrap: "wrap" }}>
          {["Menu", "Gallery", "Events", "Location"].map((link) => (
            <button
              key={link}
              className="nav-link"
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              style={{ fontSize: "11px" }}
            >
              {link}
            </button>
          ))}
        </div>

        <div style={{
          height: "1px", background: "linear-gradient(to right, transparent, rgba(8,145,178,0.3), transparent)",
          marginBottom: "28px",
        }} />

        <p style={{ fontSize: "11px", color: "#3a7d94", letterSpacing: "0.12em" }}>
          © {new Date().getFullYear()} Blue Lagoon Beach Bar · All rights reserved
        </p>
      </div>
    </footer>
  );
}

/* ── Shared: Section Label ───────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <p style={{
      fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase",
      color: "#0891b2", marginBottom: "14px", fontWeight: 600,
    }}>
      — {label} —
    </p>
  );
}
