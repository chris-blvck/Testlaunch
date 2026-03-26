"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Locale = "en" | "ru";
type CopyContent = {
  nav: [string, string, string, string];
  ctaMap: string;
  heroTop: string;
  heroSub: string;
  heroMeta: string;
  heroCta1: string;
  heroCta2: string;
  expLabel: string;
  expTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  pricingLabel: string;
  pricingTitle: string;
  locationLabel: string;
  locationTitle: string;
  certified: string;
  openDaily: string;
  onSite: string;
  address: string;
  hours: string;
  find: string;
  allRights: string;
  localeButton: string;
  bookLabel: string;
  bookTitle: string;
  bookDesc: string;
  bookTelegram: string;
  bookWhatsapp: string;
  bookLine: string;
  bookPhone: string;
  bookStickyLabel: string;
};

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const COPY: Record<Locale, CopyContent> = {
  en: {
    nav: ["Experience", "Gallery", "Pricing", "Book"],
    ctaMap: "Find us",
    heroTop: "Pattaya · Thailand",
    heroSub: "E-Sport Gaming Club",
    heroMeta: "Food · Drinks · Billiards · PS5 · PC Gaming",
    heroCta1: "Discover",
    heroCta2: "View pricing",
    expLabel: "The experience",
    expTitle: "Play at the next level",
    galleryLabel: "Inside the club",
    galleryTitle: "See where you will play",
    pricingLabel: "Pricing",
    pricingTitle: "Choose your setup",
    locationLabel: "Location",
    locationTitle: "Visit us in Pattaya",
    certified: "Certified equipment",
    openDaily: "Open every day",
    onSite: "On site",
    address: "Address",
    hours: "Hours",
    find: "Find us",
    allRights: "© 2026 33X28 E-Sport Club · Pattaya",
    localeButton: "Русский",
    bookLabel: "Book a session",
    bookTitle: "Come play with us",
    bookDesc: "Message us directly to book a PC, PS5 or billiards session. We reply fast.",
    bookTelegram: "Telegram",
    bookWhatsapp: "WhatsApp",
    bookLine: "Line",
    bookPhone: "Call us",
    bookStickyLabel: "Book now",
  },
  ru: {
    nav: ["Зона", "Галерея", "Цены", "Бронь"],
    ctaMap: "Как добраться",
    heroTop: "Паттайя · Таиланд",
    heroSub: "Киберспортивный клуб",
    heroMeta: "Еда · Напитки · Бильярд · PS5 · ПК",
    heroCta1: "Открыть",
    heroCta2: "Смотреть цены",
    expLabel: "Атмосфера",
    expTitle: "Играй на новом уровне",
    galleryLabel: "Внутри клуба",
    galleryTitle: "Посмотри, где ты будешь играть",
    pricingLabel: "Тарифы",
    pricingTitle: "Выбери свой формат",
    locationLabel: "Локация",
    locationTitle: "Ждём вас в Паттайе",
    certified: "Проверенное оборудование",
    openDaily: "Открыто каждый день",
    onSite: "На месте",
    address: "Адрес",
    hours: "Часы работы",
    find: "Как найти",
    allRights: "© 2026 33X28 E-Sport Club · Паттайя",
    localeButton: "English",
    bookLabel: "Бронирование",
    bookTitle: "Приходите играть",
    bookDesc: "Напишите нам напрямую, чтобы забронировать место за ПК, PS5 или бильярд. Отвечаем быстро.",
    bookTelegram: "Telegram",
    bookWhatsapp: "WhatsApp",
    bookLine: "Line",
    bookPhone: "Позвонить",
    bookStickyLabel: "Забронировать",
  },
};

const GALLERY = [
  { src: "/egaming/exterior-neon.png", altEn: "Neon entrance", altRu: "Неоновый вход", span: "col-span-2 row-span-2" },
  { src: "/egaming/gaming-floor.png", altEn: "Main gaming floor", altRu: "Главная игровая зона", span: "" },
  { src: "/egaming/players-gaming.png", altEn: "Players in action", altRu: "Игроки в матче", span: "" },
  { src: "/egaming/stations-row.png", altEn: "Gaming stations", altRu: "Ряд игровых станций", span: "" },
  { src: "/egaming/billiard-lounge.png", altEn: "Billiards lounge", altRu: "Бильярдная зона", span: "" },
  { src: "/egaming/cs2-screen.png", altEn: "Counter-Strike 2", altRu: "Counter-Strike 2", span: "col-span-2" },
  { src: "/egaming/lounge-bar.png", altEn: "Bar and lounge", altRu: "Бар и лаунж", span: "" },
  { src: "/egaming/station-headset.png", altEn: "Ready-to-play setup", altRu: "Готовая игровая станция", span: "" },
  { src: "/egaming/billiard-table.png", altEn: "Billiard table", altRu: "Бильярдный стол", span: "" },
];

const BRANDS = ["ASUS ROG", "Logitech G", "HyperX", "TTRacing", "NVIDIA", "BenQ Zowie"];

export default function EgamingPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [mode, setMode] = useState<"compact" | "full">("compact");
  const t = COPY[locale];
  const experiences = useMemo(() => ([
    {
      title: locale === "en" ? "PC Gaming" : "ПК-гейминг",
      tag: locale === "en" ? "20+ STATIONS" : "20+ СТАНЦИЙ",
      desc: locale === "en"
        ? "Custom stations by ASUS ROG, Logitech G and HyperX with high refresh displays and mechanical keyboards."
        : "Кастомные станции от ASUS ROG, Logitech G и HyperX: быстрые мониторы, механика и полный комфорт.",
      details: locale === "en"
        ? ["RGB mechanical keyboards", "TTRacing chairs", "High refresh monitors", "ASUS ROG · Logitech G · HyperX"]
        : ["Механические RGB-клавиатуры", "Кресла TTRacing", "Мониторы с высокой герцовкой", "ASUS ROG · Logitech G · HyperX"],
      icon: "⌨",
      img: "/egaming/station-closeup.png",
    },
    {
      title: locale === "en" ? "Console & PS5 Lounge" : "Консоли и PS5 лаунж",
      tag: locale === "en" ? "LOUNGE" : "ЛАУНЖ",
      desc: locale === "en"
        ? "PlayStation 5 on a big screen, premium sofas and cinematic sound for a relaxed but competitive vibe."
        : "PlayStation 5 на большом экране, премиальные диваны и объёмный звук для идеального отдыха и игры.",
      details: locale === "en"
        ? ["PlayStation 5", "Large TV screen", "Premium leather sofa", "1h = 60 THB · 2h = 100 THB"]
        : ["PlayStation 5", "Большой ТВ-экран", "Премиальный кожаный диван", "1 час = 60 THB · 2 часа = 100 THB"],
      icon: "🎮",
      img: "/egaming/ps5-store.png",
    },
    {
      title: locale === "en" ? "Billiards & Bar" : "Бильярд и бар",
      tag: locale === "en" ? "CHILL ZONE" : "CHILL ZONE",
      desc: locale === "en"
        ? "Take a break between matches with drinks, billiards and a moody lounge atmosphere."
        : "Между катками отдыхайте с напитками, бильярдом и атмосферным лаунжем.",
      details: locale === "en"
        ? ["Billiard table", "Food & drinks", "Lounge music", "World clocks: London · Tokyo · NY"]
        : ["Бильярдный стол", "Еда и напитки", "Лаунж-музыка", "Мировые часы: Лондон · Токио · Нью-Йорк"],
      icon: "🎱",
      img: "/egaming/billiard-table.png",
    },
  ]), [locale]);

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes pulse-glow { 0%,100% { text-shadow: 0 0 20px rgba(239,68,68,.4);} 50% {text-shadow:0 0 70px rgba(239,68,68,.9);} }
        .pulse-glow { animation: pulse-glow 3.3s ease-in-out infinite; }
      `}</style>
      <Navbar t={t} locale={locale} setLocale={setLocale} mode={mode} setMode={setMode} />
      <Hero t={t} />
      <Stats t={t} />
      <Experience t={t} experiences={experiences} />
      {mode === "full" && <Gallery locale={locale} t={t} />}
      <Pricing t={t} />
      {mode === "full" && <Brands t={t} />}
      <Location t={t} />
      <Booking t={t} />
      <Footer t={t} />
      <StickyBook t={t} />
    </div>
  );
}

function Logo() {
  return (
    <p className="font-display text-4xl tracking-tight leading-none select-none">
      33<span className="text-red-500">X</span>28
    </p>
  );
}

function Navbar({ t, locale, setLocale, mode, setMode }: { t: CopyContent; locale: Locale; setLocale: (x: Locale) => void; mode: "compact" | "full"; setMode: (m: "compact" | "full") => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-black/90 border-b border-zinc-800 backdrop-blur" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Logo />
        <div className="hidden md:flex gap-8 justify-center flex-1">
          {t.nav.map((item, idx) => (
            <button key={item} onClick={() => document.getElementById(["experience", "gallery", "pricing", "booking"][idx])?.scrollIntoView({ behavior: "smooth" })} className="text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white">
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center overflow-hidden border border-zinc-800">
            {(["compact", "full"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className="text-[9px] font-bold px-2.5 py-1.5 tracking-widest uppercase transition-all duration-200"
                style={{ background: mode === m ? "#dc2626" : "transparent", color: mode === m ? "#fff" : "#52525b" }}>
                {m}
              </button>
            ))}
          </div>
          <button onClick={() => setLocale(locale === "en" ? "ru" : "en")} className="text-xs uppercase tracking-wider px-3 py-2 border border-zinc-700 hover:border-zinc-400">
            {t.localeButton}
          </button>
          <a href="https://maps.app.goo.gl/DQ7cxdCdAEXwXhgW8" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-500 px-4 py-2 text-xs uppercase tracking-wider font-bold">
            {t.ctaMap}
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ t }: { t: CopyContent }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6">
      <img src="/egaming/exterior-neon.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.45em] text-red-400 mb-8">{t.heroTop}</p>
        <h1 className="pulse-glow font-display text-[clamp(5.5rem,22vw,16rem)] leading-none tracking-tight">
          33<span className="text-red-500">X</span>28
        </h1>
        <p className="mt-6 text-zinc-300 tracking-[0.35em] uppercase text-sm">{t.heroSub}</p>
        <p className="mt-2 text-zinc-500 tracking-widest text-xs uppercase">{t.heroMeta}</p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })} className="bg-red-600 hover:bg-red-500 px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold">
            {t.heroCta1}
          </button>
          <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="border border-zinc-700 hover:border-zinc-400 px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold text-zinc-300 hover:text-white">
            {t.heroCta2}
          </button>
        </div>
      </div>
    </section>
  );
}

function Stats({ t }: { t: CopyContent }) {
  const { ref, inView } = useInView();
  const items = [
    { value: "14:00–00:00", label: t.openDaily },
    { value: "50 ฿", label: t.nav[2] === "Pricing" ? "PC / hour" : "ПК / час" },
    { value: "20+", label: t.nav[0] === "Experience" ? "gaming stations" : "игровых станций" },
    { value: "PS5", label: t.onSite },
  ];

  return (
    <section ref={ref} className="bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center">
        {items.map((item, i) => (
          <div key={item.value} className={`py-8 border-r border-zinc-800 last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${i * 90}ms` }}>
            <p className="text-3xl font-display">{item.value}</p>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience({ t, experiences }: { t: CopyContent; experiences: Array<{ title: string; tag: string; desc: string; details: string[]; icon: string; img: string }> }) {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <SectionLabel label={t.expLabel} title={t.expTitle} />
        <div className="mt-16 space-y-20 text-left">
          {experiences.map((exp, i) => <ExpBlock key={exp.title} exp={exp} flip={i % 2 !== 0} />)}
        </div>
      </div>
    </section>
  );
}

function ExpBlock({ exp, flip }: { exp: { title: string; tag: string; desc: string; details: string[]; icon: string; img: string }; flip: boolean }) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-10 items-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className={`relative overflow-hidden ${flip ? "md:order-2" : ""}`}>
        <img src={exp.img} alt={exp.title} className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" />
        <span className="absolute top-4 left-4 bg-red-600 px-3 py-1 text-xs uppercase tracking-wider font-bold">{exp.tag}</span>
      </div>
      <div className={flip ? "md:order-1" : ""}>
        <p className="text-3xl mb-3">{exp.icon}</p>
        <h3 className="font-display text-4xl mb-4">{exp.title}</h3>
        <p className="text-zinc-400 mb-6 leading-relaxed">{exp.desc}</p>
        <ul className="space-y-2">
          {exp.details.map((d) => <li key={d} className="text-sm text-zinc-300">• {d}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Gallery({ locale, t }: { locale: Locale; t: CopyContent }) {
  const { ref, inView } = useInView(0.05);

  return (
    <section id="gallery" className="bg-zinc-950 py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <SectionLabel label={t.galleryLabel} title={t.galleryTitle} />
        <div ref={ref} className={`mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[190px] md:auto-rows-[220px] gap-2 text-left transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          {GALLERY.map((img, i) => (
            <div key={img.src} className={`relative overflow-hidden group ${img.span} transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{ borderRadius: i === 0 ? "1rem" : "0.25rem", transitionDelay: `${i * 50}ms` }}>
              <img src={img.src} alt={locale === "en" ? img.altEn : img.altRu} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-0.5 h-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-3 py-3 text-xs font-russo tracking-wide uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-500">{locale === "en" ? img.altEn : img.altRu}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ t }: { t: CopyContent }) {
  const { ref, inView } = useInView();
  const pricingText = {
    bestDeal: t.nav[2] === "Pricing" ? "Best deal" : "Лучшее предложение",
    playNow: t.nav[2] === "Pricing" ? "Play now" : "Играть",
    membership: t.nav[2] === "Pricing" ? "Members top-up" : "Пополнение для участников",
    reserve: t.nav[2] === "Pricing" ? "Reserve" : "Бронировать",
  };

  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <SectionLabel label={t.pricingLabel} title={t.pricingTitle} />
        <div ref={ref} className={`mt-14 grid md:grid-cols-3 gap-6 text-left transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          <article className="border border-zinc-800 p-7">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">PC Gaming</p>
            <p className="font-display text-5xl">50 ฿</p>
            <p className="text-zinc-500 text-sm mb-6">/ hour</p>
            <ul className="space-y-2 text-sm text-zinc-300 mb-6"><li>✓ HyperX headset</li><li>✓ RGB keyboard</li><li>✓ TTRacing chair</li></ul>
            <a href="https://maps.app.goo.gl/DQ7cxdCdAEXwXhgW8" target="_blank" rel="noopener noreferrer" className="block text-center border border-zinc-700 py-3 text-xs uppercase tracking-wider">{pricingText.playNow}</a>
          </article>
          <article className="border border-red-700 p-7 bg-gradient-to-b from-red-950/40 to-black relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 px-4 py-1 text-xs uppercase tracking-wider font-bold">{pricingText.bestDeal}</span>
            <p className="text-red-400 text-xs uppercase tracking-wider mb-2">PC Gaming</p>
            <p className="text-zinc-300 text-sm mb-4">{pricingText.membership}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border border-zinc-800 px-3 py-2"><span>200 ฿</span><span className="text-red-400">1 h</span></div>
              <div className="flex justify-between border border-zinc-800 px-3 py-2"><span>500 ฿</span><span className="text-red-400">3 h</span></div>
              <div className="flex justify-between border border-zinc-800 px-3 py-2"><span>1 000 ฿</span><span className="text-red-400">10 h</span></div>
            </div>
          </article>
          <article className="border border-zinc-800 p-7">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">PS5 Lounge</p>
            <p className="text-zinc-300 text-sm mb-2">60 ฿ / 1h</p>
            <p className="text-zinc-300 text-sm mb-6">100 ฿ / 2h</p>
            <ul className="space-y-2 text-sm text-zinc-300 mb-6"><li>✓ Big TV</li><li>✓ 2 DualSense controllers</li><li>✓ Premium sofa</li></ul>
            <a href="https://maps.app.goo.gl/DQ7cxdCdAEXwXhgW8" target="_blank" rel="noopener noreferrer" className="block text-center border border-zinc-700 py-3 text-xs uppercase tracking-wider">{pricingText.reserve}</a>
          </article>
        </div>
      </div>
    </section>
  );
}

function Brands({ t }: { t: CopyContent }) {
  return (
    <section className="py-10 bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-6">{t.certified}</p>
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400 uppercase tracking-wider font-bold">
          {BRANDS.map((b) => <span key={b}>{b}</span>)}
        </div>
      </div>
    </section>
  );
}

function Location({ t }: { t: CopyContent }) {
  return (
    <section id="location" className="py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <SectionLabel label={t.locationLabel} title={t.locationTitle} />
        <div className="mt-14 grid md:grid-cols-2 gap-8 text-left">
          <div className="space-y-6">
            <img src="/egaming/exterior-facade.png" alt="3328 facade" className="w-full aspect-video object-cover" />
            <div className="grid grid-cols-2 gap-6">
              <div><p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{t.address}</p><p className="text-sm">33X28 E-Sport Club</p><p className="text-zinc-400 text-sm">Pattaya, Chonburi</p></div>
              <div><p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{t.hours}</p><p className="text-sm">14:00 – 00:00</p><p className="text-zinc-400 text-sm">{t.openDaily}</p></div>
              <div><p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{t.onSite}</p><p className="text-sm">Food · Drinks · Billiards</p><p className="text-zinc-400 text-sm">PC Gaming · PS5</p></div>
              <div><p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{t.find}</p><a href="https://maps.app.goo.gl/DQ7cxdCdAEXwXhgW8" target="_blank" rel="noopener noreferrer" className="text-red-500">Google Maps →</a></div>
            </div>
          </div>
          <div className="aspect-video border border-zinc-800 overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d100.8706445!3d12.9132849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310297004f5c34f9%3A0xfc2db1962da92567!2s3328+e-sport+gaming+club!5e0!3m2!1sen!2sth!4v1" width="100%" height="100%" style={{ border: 0, filter: "grayscale(100%) invert(88%) contrast(85%)" }} loading="lazy" title="33X28 E-Sport Club map" />
          </div>
        </div>
      </div>
    </section>
  );
}

const CONTACT_LINKS = {
  telegram: "https://t.me/cyberclub33X28",
  whatsapp: "https://wa.me/66647315217",
  line: "https://line.me/ti/p/~0647315217",
  phone: "tel:0647315217",
};

function Booking({ t }: { t: CopyContent }) {
  const { ref, inView } = useInView();
  const buttons = [
    { href: CONTACT_LINKS.telegram, label: t.bookTelegram, bg: "bg-[#229ED9] hover:bg-[#1a8bc4]", icon: "✈" },
    { href: CONTACT_LINKS.whatsapp, label: t.bookWhatsapp, bg: "bg-[#25D366] hover:bg-[#1db954]", icon: "💬" },
    { href: CONTACT_LINKS.line, label: t.bookLine, bg: "bg-[#06C755] hover:bg-[#05a847]", icon: "💚" },
    { href: CONTACT_LINKS.phone, label: `${t.bookPhone} · 064 731 5217`, bg: "bg-zinc-800 hover:bg-zinc-700", icon: "📞" },
  ];
  return (
    <section id="booking" className="bg-zinc-950 py-28 px-6 border-t border-zinc-900">
      <div ref={ref} className={`max-w-2xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-red-500 text-xs uppercase tracking-[0.35em] mb-3">{t.bookLabel}</p>
        <h2 className="font-russo text-4xl md:text-5xl text-white mb-4">{t.bookTitle}</h2>
        <p className="text-zinc-400 mb-12 leading-relaxed">{t.bookDesc}</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          {buttons.map((b) => (
            <a key={b.href} href={b.href} target="_blank" rel="noopener noreferrer"
              className={`${b.bg} text-white font-bold px-7 py-4 text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 active:scale-95`}>
              <span>{b.icon}</span>{b.label}
            </a>
          ))}
        </div>
        <p className="mt-10 text-zinc-600 text-xs">Open daily · 14:00 – 00:00</p>
      </div>
    </section>
  );
}

function StickyBook({ t }: { t: CopyContent }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href={CONTACT_LINKS.telegram} target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-[#229ED9] hover:bg-[#1a8bc4] text-white font-bold px-6 py-3 text-sm tracking-wide flex items-center gap-2 shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      ✈ {t.bookStickyLabel}
    </a>
  );
}

function SectionLabel({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-red-500 text-xs uppercase tracking-[0.35em] mb-3">{label}</p>
      <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}

function Footer({ t }: { t: CopyContent }) {
  return (
    <footer className="py-10 border-t border-zinc-900 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 text-center flex flex-col gap-5 items-center">
        <Logo />
        <div className="flex gap-6 text-xs uppercase tracking-wider text-zinc-500">
          {t.nav.map((item) => <span key={item}>{item}</span>)}
        </div>
        <p className="text-zinc-600 text-xs">{t.allRights}</p>
      </div>
    </footer>
  );
}
