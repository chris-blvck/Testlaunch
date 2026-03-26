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

const COURSES = [
  {
    num: "01",
    name: "Salmon Nigiri",
    desc: "The purest expression of the sea",
    note: "Hand-pressed with aged sushi rice, a whisper of wasabi",
    img: "https://images.pexels.com/photos/4725638/pexels-photo-4725638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    num: "02",
    name: "Omakase Selection",
    desc: "12 courses, each a meditation",
    note: "Guided entirely by the chef — trust, surrender, experience",
    img: "https://images.pexels.com/photos/3628428/pexels-photo-3628428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    num: "03",
    name: "Sake Pairing",
    desc: "Curated by our sommelier",
    note: "Six selections from Niigata, Kyoto and Hiroshima",
    img: "https://images.pexels.com/photos/2098143/pexels-photo-2098143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const GALLERY_IMGS = [
  { src: "https://images.pexels.com/photos/4725633/pexels-photo-4725633.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Gallery 1" },
  { src: "https://images.pexels.com/photos/4725601/pexels-photo-4725601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Gallery 2" },
  { src: "https://images.pexels.com/photos/3763836/pexels-photo-3763836.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Gallery 3" },
  { src: "https://images.pexels.com/photos/3763816/pexels-photo-3763816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Gallery 4" },
  { src: "https://images.pexels.com/photos/4725633/pexels-photo-4725633.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Gallery 5" },
  { src: "https://images.pexels.com/photos/4725601/pexels-photo-4725601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Gallery 6" },
  { src: "https://images.pexels.com/photos/3763836/pexels-photo-3763836.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Gallery 7" },
  { src: "https://images.pexels.com/photos/3763816/pexels-photo-3763816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Gallery 8" },
];

export default function ZenGardenPage() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"compact" | "full">("compact");
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#e7e5e4", fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #292524; }
        .zen-heading { font-family: var(--font-cormorant), Georgia, serif; }
        .gallery-img {
          transition: filter 0.45s ease;
          filter: brightness(0.78);
        }
        .gallery-img:hover { filter: brightness(1); }
        .nav-link {
          color: #a8a29e;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .nav-link:hover { color: #f5f5f4; }
        .reserve-nav {
          border: 1px solid #57534e;
          color: #a8a29e;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          padding: 8px 22px;
          text-decoration: none;
          transition: border-color 0.35s ease, color 0.35s ease;
          background: transparent;
          cursor: pointer;
          font-family: inherit;
        }
        .reserve-nav:hover { border-color: #84cc16; color: #84cc16; }
        .hero-btn {
          display: inline-block;
          border: 1px solid #57534e;
          color: #d6d3d1;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 14px 44px;
          text-decoration: none;
          transition: border-color 0.4s ease, color 0.4s ease;
          background: transparent;
          cursor: pointer;
          font-family: inherit;
        }
        .hero-btn:hover { border-color: #84cc16; color: #84cc16; }
        .cta-btn {
          display: inline-block;
          border: 1px solid #57534e;
          color: #d6d3d1;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 13px 36px;
          text-decoration: none;
          transition: border-color 0.35s ease, color 0.35s ease;
          background: transparent;
          cursor: pointer;
          font-family: inherit;
        }
        .cta-btn:hover { border-color: #84cc16; color: #84cc16; }
        .email-link {
          color: #84cc16;
          text-decoration: none;
          letter-spacing: 0.06em;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s ease;
        }
        .email-link:hover { border-color: #84cc16; }
      `}</style>

      <Navbar mode={mode} setMode={setMode} />
      <Hero mounted={mounted} />
      <PhilosophyStrip />
      <OmakaseMenu />
      {mode === "full" && <GallerySection />}
      {mode === "full" && <TheExperience />}
      <ReservationSection />
      <Footer />
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────────── */
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
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.5s ease, border-color 0.5s ease",
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid #1c1917" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <span
          className="zen-heading"
          style={{
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "0.38em",
            color: "#f5f5f4",
            textTransform: "uppercase",
            fontStyle: "italic",
          }}
        >
          ZEN GARDEN
        </span>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <button className="nav-link" onClick={() => scrollTo("omakase")}>
            Omakase
          </button>
          <button className="nav-link" onClick={() => scrollTo("gallery")}>
            Gallery
          </button>
          <div style={{ display: "flex", overflow: "hidden", border: "1px solid rgba(168,149,106,0.25)" }}>
            {(["compact", "full"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                style={{
                  fontSize: "9px", fontWeight: "bold", padding: "6px 10px", letterSpacing: "0.2em",
                  textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.2s",
                  background: mode === m ? "#a8956a" : "transparent",
                  color: mode === m ? "#000" : "rgba(168,149,106,0.4)",
                }}>
                {m}
              </button>
            ))}
          </div>
          <button className="reserve-nav" onClick={() => scrollTo("reserve")}>
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────────────── */
function Hero({ mounted }: { mounted: boolean }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Background photo at 20% opacity */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images.pexels.com/photos/6025655/pexels-photo-6025655.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      />
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 24px",
          maxWidth: 800,
          margin: "0 auto",
          transition: "opacity 1.2s ease, transform 1.2s ease",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(28px)",
        }}
      >
        {/* Japanese kanji */}
        <div
          style={{
            fontSize: "clamp(72px, 15vw, 140px)",
            color: "#a8a29e",
            lineHeight: 1,
            marginBottom: 20,
            fontWeight: 300,
            opacity: 0.65,
            letterSpacing: "0.05em",
          }}
        >
          禅
        </div>

        {/* Heading */}
        <h1
          className="zen-heading"
          style={{
            fontSize: "clamp(40px, 10vw, 100px)",
            fontStyle: "italic",
            fontWeight: 300,
            letterSpacing: "0.18em",
            color: "#fafaf9",
            lineHeight: 1.05,
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          ZEN GARDEN
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.42em",
            color: "#a8a29e",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Omakase · Silence · Perfection
        </p>

        {/* Subtext */}
        <p
          style={{
            fontSize: 13,
            color: "#78716c",
            letterSpacing: "0.1em",
            marginBottom: 52,
          }}
        >
          Chiang Mai, Thailand — Limited to 12 seats per evening
        </p>

        {/* CTA */}
        <a
          href="#reserve"
          className="hero-btn"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Request a Reservation
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, rgba(168,162,158,0.4), transparent)",
            margin: "0 auto",
          }}
        />
      </div>
    </section>
  );
}

/* ── Philosophy Strip ────────────────────────────────────────────── */
function PhilosophyStrip() {
  const { ref, inView } = useInView(0.25);
  return (
    <section
      style={{
        borderTop: "1px solid #1c1917",
        borderBottom: "1px solid #1c1917",
        backgroundColor: "#080808",
        padding: "72px 24px",
        textAlign: "center",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 700,
          margin: "0 auto",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.95s ease, transform 0.95s ease",
        }}
      >
        <p
          className="zen-heading"
          style={{
            fontSize: "clamp(20px, 3.5vw, 34px)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "#e7e5e4",
            lineHeight: 1.55,
            letterSpacing: "0.04em",
            marginBottom: 22,
          }}
        >
          "We do not cook food. We craft moments."
        </p>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.38em",
            color: "#57534e",
            textTransform: "uppercase",
          }}
        >
          — Chef Tanaka Kenji
        </p>
      </div>
    </section>
  );
}

/* ── Omakase Menu ────────────────────────────────────────────────── */
function OmakaseMenu() {
  return (
    <section
      id="omakase"
      style={{
        padding: "108px 24px",
        backgroundColor: "#000",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section label */}
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.48em",
            color: "#57534e",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          The Menu
        </p>

        <h2
          className="zen-heading"
          style={{
            fontSize: "clamp(32px, 5.5vw, 58px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#fafaf9",
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}
        >
          Omakase
        </h2>

        {/* Lime accent line */}
        <div
          style={{
            width: 36,
            height: 1,
            background: "#84cc16",
            margin: "0 auto 72px",
            opacity: 0.7,
          }}
        />

        {/* Courses grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 48,
          }}
        >
          {COURSES.map((course, i) => (
            <CourseCard key={course.num} course={course} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({
  course,
  delay,
}: {
  course: (typeof COURSES)[0];
  delay: number;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {/* Photo */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: 28,
          aspectRatio: "4 / 3",
        }}
      >
        <img
          src={course.img}
          alt={course.name}
          className="gallery-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "filter 0.5s ease, transform 0.6s ease",
          }}
          onMouseEnter={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.transform = "scale(1)";
          }}
        />
      </div>

      {/* Course label */}
      <p
        style={{
          fontSize: 10,
          letterSpacing: "0.4em",
          color: "#84cc16",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        Course {course.num}
      </p>

      {/* Name */}
      <h3
        className="zen-heading"
        style={{
          fontSize: 24,
          fontWeight: 400,
          color: "#fafaf9",
          letterSpacing: "0.08em",
          marginBottom: 10,
        }}
      >
        {course.name}
      </h3>

      {/* Desc */}
      <p
        style={{
          fontSize: 13,
          color: "#a8a29e",
          letterSpacing: "0.05em",
          marginBottom: 10,
          fontStyle: "italic",
        }}
      >
        {course.desc}
      </p>

      {/* Note */}
      <p
        style={{
          fontSize: 11,
          color: "#57534e",
          letterSpacing: "0.04em",
          lineHeight: 1.65,
        }}
      >
        {course.note}
      </p>
    </div>
  );
}

/* ── Gallery ─────────────────────────────────────────────────────── */
function GallerySection() {
  const { ref, inView } = useInView(0.05);
  return (
    <section
      id="gallery"
      style={{
        padding: "108px 24px",
        backgroundColor: "#060606",
        textAlign: "center",
        borderTop: "1px solid #1c1917",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.48em",
            color: "#57534e",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Gallery
        </p>

        <h2
          className="zen-heading"
          style={{
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#fafaf9",
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}
        >
          The Art of Simplicity
        </h2>

        {/* Lime accent line */}
        <div
          style={{
            width: 36,
            height: 1,
            background: "#84cc16",
            margin: "0 auto 56px",
            opacity: 0.7,
          }}
        />

        {/* 2×4 grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, 220px)",
            gap: 5,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          {GALLERY_IMGS.map((img, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <img
                src={img.src}
                alt={img.alt}
                className="gallery-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The Experience ──────────────────────────────────────────────── */
function TheExperience() {
  const { ref, inView } = useInView(0.15);
  return (
    <section
      style={{
        padding: "108px 24px",
        backgroundColor: "#000",
        textAlign: "center",
        borderTop: "1px solid #1c1917",
        borderBottom: "1px solid #1c1917",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 800,
          margin: "0 auto",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.95s ease, transform 0.95s ease",
        }}
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.48em",
            color: "#57534e",
            textTransform: "uppercase",
            marginBottom: 44,
          }}
        >
          The Experience
        </p>

        {/* Big course + price display */}
        <div
          className="zen-heading"
          style={{
            fontSize: "clamp(52px, 10vw, 96px)",
            fontWeight: 300,
            color: "#fafaf9",
            letterSpacing: "0.05em",
            lineHeight: 1.05,
            marginBottom: 8,
          }}
        >
          12 Courses
        </div>
        <div
          className="zen-heading"
          style={{
            fontSize: "clamp(26px, 4.5vw, 48px)",
            fontWeight: 300,
            color: "#a8a29e",
            letterSpacing: "0.08em",
            fontStyle: "italic",
            marginBottom: 52,
          }}
        >
          2 800 THB per guest
        </div>

        {/* Lime accent line */}
        <div
          style={{
            width: 36,
            height: 1,
            background: "#84cc16",
            margin: "0 auto 56px",
            opacity: 0.7,
          }}
        />

        {/* Three detail columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 44,
            textAlign: "center",
          }}
        >
          {[
            {
              label: "Reservation",
              value: "Required at least 7 days in advance. Walk-ins not accepted.",
            },
            {
              label: "Ingredients",
              value: "Seasonal produce sourced weekly from Japan and northern Thailand.",
            },
            {
              label: "One Seating",
              value: "A single seating per evening at 19:00 ensures full attention.",
            },
          ].map((item) => (
            <div key={item.label}>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.38em",
                  color: "#84cc16",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "#78716c",
                  lineHeight: 1.7,
                  letterSpacing: "0.03em",
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reservation ─────────────────────────────────────────────────── */
function ReservationSection() {
  const { ref, inView } = useInView(0.15);
  return (
    <section
      id="reserve"
      style={{
        padding: "108px 24px",
        backgroundColor: "#050505",
        textAlign: "center",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 580,
          margin: "0 auto",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.95s ease, transform 0.95s ease",
        }}
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.48em",
            color: "#57534e",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Reserve Your Seat
        </p>

        <h2
          className="zen-heading"
          style={{
            fontSize: "clamp(28px, 5vw, 50px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#fafaf9",
            letterSpacing: "0.08em",
            marginBottom: 24,
            lineHeight: 1.3,
          }}
        >
          Begin the Experience
        </h2>

        {/* Thin vertical line */}
        <div
          style={{
            width: 1,
            height: 40,
            background: "#292524",
            margin: "0 auto 36px",
          }}
        />

        <p
          style={{
            fontSize: 14,
            color: "#78716c",
            letterSpacing: "0.08em",
            lineHeight: 1.75,
            marginBottom: 12,
          }}
        >
          Reservations open 7 days in advance.
        </p>
        <p
          style={{
            fontSize: 14,
            color: "#57534e",
            letterSpacing: "0.05em",
            lineHeight: 1.75,
            marginBottom: 48,
          }}
        >
          Write to us directly — we reply within 24 hours to confirm your seat.
          Please mention any dietary requirements.
        </p>

        {/* Email link */}
        <a
          href="mailto:reserve@zengardenchiangmai.com"
          className="email-link"
          style={{ fontSize: 14, display: "block", marginBottom: 40 }}
        >
          reserve@zengardenchiangmai.com
        </a>

        {/* CTA button */}
        <a
          href="mailto:reserve@zengardenchiangmai.com"
          className="cta-btn"
        >
          Send a Request
        </a>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#000",
        borderTop: "1px solid #1c1917",
        padding: "44px 32px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          className="zen-heading"
          style={{
            fontSize: 15,
            fontWeight: 400,
            letterSpacing: "0.38em",
            color: "#78716c",
            textTransform: "uppercase",
            fontStyle: "italic",
          }}
        >
          ZEN GARDEN
        </span>
        <p
          style={{
            fontSize: 11,
            color: "#44403c",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          © 2026 Zen Garden · Chiang Mai, Thailand
        </p>
      </div>
    </footer>
  );
}
