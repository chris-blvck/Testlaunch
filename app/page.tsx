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

function useMagnetic(strength = 0.38) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = Math.max(r.width, r.height) * 1.6;
      if (dist < radius) { el.style.transform = `translate(${dx*(1-dist/radius)*strength}px,${dy*(1-dist/radius)*strength}px)`; }
      else { el.style.transform = ""; }
    };
    const onLeave = () => { el.style.transform = ""; };
    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => { window.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [strength]);
  return ref as React.RefObject<HTMLElement>;
}

function AtmosphereCanvas() {
  const cvs = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = cvs.current; if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true }); if (!ctx) return;
    let W = 0, H = 0;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    type SP = { x:number;y:number;vx:number;vy:number;w:number;h:number;rot:number;vrot:number;maxA:number;g:number };
    type EP = { x:number;y:number;vx:number;vy:number;r:number;a:number;hue:number };
    const mkS = (sy?: number): SP => { const g = 50+(Math.random()*90|0); return { x:Math.random()*W, y:sy??H+80, vx:(Math.random()-.5)*.45, vy:-(0.2+Math.random()*.65), w:120+Math.random()*250, h:80+Math.random()*160, rot:Math.random()*Math.PI*2, vrot:(Math.random()-.5)*.004, maxA:0.035+Math.random()*.09, g }; };
    const mkE = (sy?: number): EP => ({ x:W*.1+Math.random()*W*.8, y:sy??(H*.4+Math.random()*H*.6), vx:(Math.random()-.5)*1.6, vy:-(0.9+Math.random()*2.5), r:0.8+Math.random()*2.2, a:0.5+Math.random()*.5, hue:12+Math.random()*35 });
    const smokes: SP[] = Array.from({length:65}, () => mkS(Math.random()*H));
    const embers: EP[] = Array.from({length:45}, () => mkE());
    let raf = 0, wind = 0;
    const frame = (now: number) => {
      ctx.clearRect(0,0,W,H); wind = Math.sin(now*.0003)*.28;
      for (let i=0;i<smokes.length;i++) {
        const s=smokes[i]; s.x+=s.vx+wind; s.y+=s.vy; s.rot+=s.vrot;
        const a=s.maxA*Math.sin(Math.max(0,Math.min(1,1-s.y/H))*Math.PI);
        if (s.y<-(s.h*2+50)){smokes[i]=mkS();continue;}
        ctx.save(); ctx.translate(s.x,s.y); ctx.rotate(s.rot); ctx.scale(1,s.h/s.w);
        const gr=ctx.createRadialGradient(0,0,0,0,0,s.w);
        gr.addColorStop(0,`rgba(${s.g},${s.g},${s.g+18},${a})`); gr.addColorStop(.5,`rgba(${s.g-15},${s.g-15},${s.g},${a*.5})`); gr.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(0,0,s.w,0,Math.PI*2); ctx.fill(); ctx.restore();
      }
      for (let i=0;i<embers.length;i++) {
        const e=embers[i]; e.x+=e.vx; e.y+=e.vy; e.vy*=.997; e.a-=.004;
        if (e.a<=0||e.y<-20){embers[i]=mkE();continue;}
        const fl=e.a*(0.65+Math.sin(now*.018+i*2.1)*.35);
        const gr=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.r*5);
        gr.addColorStop(0,`hsla(${e.hue},100%,78%,${fl})`); gr.addColorStop(.4,`hsla(${e.hue},90%,55%,${fl*.35})`); gr.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(e.x,e.y,e.r*5,0,Math.PI*2); ctx.fill();
        ctx.fillStyle=`hsla(${e.hue},100%,93%,${fl})`; ctx.beginPath(); ctx.arc(e.x,e.y,e.r,0,Math.PI*2); ctx.fill();
      }
      raf=requestAnimationFrame(frame);
    };
    raf=requestAnimationFrame(frame);
    return () => { window.removeEventListener("resize",resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={cvs} className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:4}} />;
}

function HeroEye() {
  return (
    <svg viewBox="0 0 300 210" width="160" height="112" xmlns="http://www.w3.org/2000/svg" className="eye-hero sm:w-[200px] sm:h-[140px]" style={{overflow:"visible"}}>
      <defs>
        <radialGradient id="holo-h" cx="44%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#d8c820"/><stop offset="18%" stopColor="#7cd028"/><stop offset="36%" stopColor="#28c898"/>
          <stop offset="54%" stopColor="#209cd8"/><stop offset="72%" stopColor="#3848c8"/><stop offset="88%" stopColor="#c84020"/><stop offset="100%" stopColor="#d88020"/>
        </radialGradient>
        <clipPath id="em-h"><path d="M18 105 C65 18 235 18 282 105 C235 192 65 192 18 105Z"/></clipPath>
      </defs>
      <path d="M18 105 C65 18 235 18 282 105 C235 192 65 192 18 105Z" fill="url(#holo-h)"/>
      <g clipPath="url(#em-h)" fill="none" stroke="#1c0e04" strokeLinecap="round">
        <path d="M18 105 C65 18 235 18 282 105" strokeWidth="7"/>
        <path d="M48 105 C85 42 215 42 252 105 C215 168 85 168 48 105Z" strokeWidth="5.5"/>
        <path d="M82 105 C108 60 192 60 218 105 C192 150 108 150 82 105Z" strokeWidth="4.5"/>
      </g>
      <path d="M150 84 C163 84 172 97 172 112 C172 130 161 140 150 143 C139 140 128 130 128 112 C128 97 137 84 150 84Z" fill="#1c0e04" clipPath="url(#em-h)"/>
      <path d="M18 105 C65 18 235 18 282 105 C235 192 65 192 18 105Z" fill="none" stroke="#241206" strokeWidth="10" strokeLinejoin="round"/>
      <g stroke="#1c0e04" strokeWidth="6.5" strokeLinecap="round">
        <line x1="150" y1="20" x2="150" y2="4"/><line x1="122" y1="26" x2="114" y2="11"/>
        <line x1="178" y1="26" x2="186" y2="11"/><line x1="96" y1="44" x2="84" y2="30"/><line x1="204" y1="44" x2="216" y2="30"/>
      </g>
    </svg>
  );
}

 ["All", "Restaurant & Dining", "Gaming & Entertainment", "NFT & Web3", "Health & Beauty", "Sports & Fitness", "Travel & Leisure", "Home & Lifestyle", "Cannabis & Wellness"];

const PROJECTS = [
  {
    slug: "3328-esport",
    name: "3328 E-Sport Club",
    category: "Gaming & Entertainment",
    location: "Pattaya, Thailand",
    year: "2025",
    desc: "Premium landing page for an e-sport gaming club — PC gaming, PS5 lounge, billiards & bar. Dark design with neon effects and scroll animations.",
    tags: ["Gaming", "Dark UI", "Animations"],
    gradient: "from-red-950 via-zinc-950 to-black",
    accent: "#dc2626",
    accentText: "text-red-500",
    photo: "https://images.pexels.com/photos/7897479/pexels-photo-7897479.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/egaming",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "le-palais",
    name: "Le Palais",
    category: "Restaurant & Dining",
    location: "Bangkok, Thailand",
    year: "2025",
    desc: "Elegant showcase website for a high-end French restaurant. Gold palette, gastronomic menu, Playfair Display typography and online reservation.",
    tags: ["Restaurant", "Luxury", "French"],
    gradient: "from-amber-950 via-stone-950 to-black",
    accent: "#d97706",
    accentText: "text-amber-500",
    photo: "https://images.pexels.com/photos/3859234/pexels-photo-3859234.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/le-palais",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "barber-royale",
    name: "Barber Royale",
    category: "Restaurant & Dining",
    location: "Phuket, Thailand",
    year: "2025",
    desc: "Prestige web identity for a luxury barbershop. Dark design with gold accents, photo gallery, pricing grid and WhatsApp booking.",
    tags: ["Barbershop", "Gold", "Premium"],
    gradient: "from-yellow-950 via-zinc-900 to-black",
    accent: "#ca8a04",
    accentText: "text-yellow-500",
    photo: "https://images.pexels.com/photos/7697329/pexels-photo-7697329.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/barber-royale",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "blue-lagoon",
    name: "Blue Lagoon Beach Bar",
    category: "Restaurant & Dining",
    location: "Koh Samui, Thailand",
    year: "2026",
    desc: "Vibrant one-page site for a tropical beach bar. Cyan gradients, cocktail menu, live events section and beachfront location.",
    tags: ["Beach Bar", "Tropical", "Cocktails"],
    gradient: "from-cyan-950 via-blue-950 to-black",
    accent: "#0891b2",
    accentText: "text-cyan-500",
    photo: "https://images.pexels.com/photos/6181098/pexels-photo-6181098.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/blue-lagoon",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "zen-garden",
    name: "Zen Garden",
    category: "Restaurant & Dining",
    location: "Chiang Mai, Thailand",
    year: "2026",
    desc: "Ultra-minimal omakase restaurant website. Cormorant Garamond serif, 12-course tasting menu, exclusive reservation system.",
    tags: ["Japanese", "Minimal", "Omakase"],
    gradient: "from-stone-900 via-zinc-900 to-black",
    accent: "#84cc16",
    accentText: "text-lime-500",
    photo: "https://images.pexels.com/photos/6025655/pexels-photo-6025655.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/zen-garden",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "jungle-kabal",
    name: "Jungle Kabal",
    category: "NFT & Web3",
    location: "Online",
    year: "2026",
    desc: "Immersive NFT & meme community hub with lush jungle aesthetics, token integration and viral social features.",
    tags: ["NFT", "Web3", "Meme"],
    gradient: "from-green-950 via-emerald-950 to-black",
    accent: "#10b981",
    accentText: "text-emerald-500",
    photo: "https://images.pexels.com/photos/7708407/pexels-photo-7708407.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "https://www.junglekabal.meme/",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "pokestoned",
    name: "PokeStoned",
    category: "NFT & Web3",
    location: "Online",
    year: "2026",
    desc: "Browser mini-game with Pokémon card collecting mechanics. Trade, battle and collect in a vibrant community. Built for speed and viral engagement.",
    tags: ["Cards", "Mini Game", "Community"],
    gradient: "from-yellow-950 via-orange-950 to-black",
    accent: "#f59e0b",
    accentText: "text-yellow-400",
    photo: null,
    liveUrl: "https://www.pokestoned.fun/",
    status: "Live",
    cardType: "cards",
  },
  {
    slug: "die-jungle",
    name: "Die Jungle",
    category: "NFT & Web3",
    location: "Online",
    year: "2026",
    desc: "Addictive browser mini game with jungle theme, global leaderboards and daily challenges. Built for speed and engagement.",
    tags: ["Mini Game", "Browser", "Leaderboard"],
    gradient: "from-teal-950 via-green-950 to-black",
    accent: "#14b8a6",
    accentText: "text-teal-400",
    photo: "https://images.pexels.com/photos/7708409/pexels-photo-7708409.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "https://www.diejungle.fun/",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "neon-noir",
    name: "Neon Noir",
    category: "Gaming & Entertainment",
    location: "Bangkok, Thailand",
    year: "2026",
    desc: "Immersive nightclub experience website. Bebas Neue, deep violet palette, VIP table booking, DJ events calendar and gallery.",
    tags: ["Nightclub", "VIP", "Events"],
    gradient: "from-violet-950 via-purple-950 to-black",
    accent: "#7c3aed",
    accentText: "text-violet-400",
    photo: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/neon-noir",
    status: "Preview",
    cardType: "photo",
  },
  {
    slug: "aura-spa",
    name: "Aura Spa",
    category: "Restaurant & Dining",
    location: "Koh Samui, Thailand",
    year: "2026",
    desc: "Ultra-premium wellness spa website. Cormorant Garamond, rose gold palette, signature treatment menu, retreat packages and online booking.",
    tags: ["Spa", "Wellness", "Luxury"],
    gradient: "from-rose-950 via-stone-950 to-black",
    accent: "#c9956c",
    accentText: "text-rose-300",
    photo: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/aura-spa",
    status: "Preview",
    cardType: "photo",
  },
  {
    slug: "clinic",
    name: "Aestha Clinic",
    category: "Health & Beauty",
    location: "Bangkok, Thailand",
    year: "2026",
    desc: "Elegant aesthetics clinic website. Light sage & gold palette, service menu, before/after gallery, online consultation booking.",
    tags: ["Clinic", "Beauty", "Light Theme"],
    gradient: "from-emerald-950 via-stone-950 to-black",
    accent: "#b8923a",
    accentText: "text-amber-400",
    photo: "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/clinic",
    status: "Preview",
    cardType: "photo",
  },
  {
    slug: "muaythai",
    name: "Tiger Muay Thai",
    category: "Sports & Fitness",
    location: "Pattaya, Thailand",
    year: "2026",
    desc: "Raw and powerful gym website. Muay Thai training programs, DTV visa services, class schedule and WhatsApp booking. Dark gold palette.",
    tags: ["Gym", "Muay Thai", "DTV Visa"],
    gradient: "from-yellow-950 via-zinc-950 to-black",
    accent: "#c9a84c",
    accentText: "text-yellow-400",
    photo: "https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/muaythai",
    status: "Preview",
    cardType: "photo",
  },
  {
    slug: "boats",
    name: "Blue Horizon Boats",
    category: "Travel & Leisure",
    location: "Pattaya, Thailand",
    year: "2026",
    desc: "Boat rental & island tour website. Navy & teal palette, fleet showcase, 4 tour packages, gallery and WhatsApp booking.",
    tags: ["Boats", "Tours", "Ocean"],
    gradient: "from-cyan-950 via-blue-950 to-black",
    accent: "#0094b8",
    accentText: "text-cyan-400",
    photo: "https://images.pexels.com/photos/7753824/pexels-photo-7753824.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/boats",
    status: "Preview",
    cardType: "photo",
  },
  {
    slug: "crystal",
    name: "Crystal Design",
    category: "Home & Lifestyle",
    location: "Pattaya, Thailand",
    year: "2026",
    desc: "Luxury crystal chandelier showroom. Dark warm palette with gold accents, 500+ models, bespoke installation service.",
    tags: ["Chandeliers", "Luxury", "Interior"],
    gradient: "from-amber-950 via-stone-950 to-black",
    accent: "#c8a84b",
    accentText: "text-amber-400",
    photo: "https://images.pexels.com/photos/5768163/pexels-photo-5768163.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/crystal",
    status: "Preview",
    cardType: "photo",
  },
  {
    slug: "nails",
    name: "Luxury Collection",
    category: "Health & Beauty",
    location: "Pattaya, Thailand",
    year: "2026",
    desc: "Premium nail salon website. Blush rose & cream palette, service pricing, portfolio gallery, booking. Rated 4.9★ on Google.",
    tags: ["Nails", "Beauty", "Salon"],
    gradient: "from-rose-950 via-stone-950 to-black",
    accent: "#c9887a",
    accentText: "text-rose-400",
    photo: "https://images.pexels.com/photos/6135681/pexels-photo-6135681.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/nails",
    status: "Preview",
    cardType: "photo",
  },
  {
    slug: "svens",
    name: "Svens.",
    category: "Health & Beauty",
    location: "Pattaya, Thailand",
    year: "2026",
    desc: "Landing page for Pattaya's top snus shop. Yellow/blue Scandinavian brand identity, 2 locations, 200+ flavors, ice cream section.",
    tags: ["Snus", "Retail", "Pattaya"],
    gradient: "from-yellow-950 via-yellow-900 to-black",
    accent: "#FFD800",
    accentText: "text-yellow-400",
    photo: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/svens",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "kookai",
    name: "Kookai Clean Food",
    category: "Health & Beauty",
    location: "Bangkok, Thailand",
    year: "2026",
    desc: "Fresh clean food brand for Instagram & Grab delivery. Rounded, vibrant design with daily menu, calorie counts, and Bangkok delivery zones.",
    tags: ["Clean Food", "Grab", "Instagram"],
    gradient: "from-green-900 via-emerald-950 to-black",
    accent: "#16a34a",
    accentText: "text-green-500",
    photo: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
    liveUrl: "/kookai",
    status: "Live",
    cardType: "photo",
  },
  {
    slug: "sweed",
    name: "Sweed Cannabis",
    category: "Cannabis & Wellness",
    location: "Pattaya, Thailand",
    year: "2026",
    desc: "Editorial cannabis dispensary website. Dark neon palette, strain showcase, crypto payments, real shop photography.",
    accent: "#00e5c8",
    accentText: "text-teal-400",
    photo: "/sweed/exterior.jpg",
    liveUrl: "/sweed",
    status: "Preview",
    cardType: "photo",
  },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  return (
    <div className="bg-black min-h-screen">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #aaa 40%, #fff 60%, #aaa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .card-hover { transition: transform 0.4s cubic-bezier(.23,1,.32,1), box-shadow 0.4s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 30px 60px rgba(0,0,0,.6); }
        @keyframes float-card {
          0%, 100% { transform: translateY(0px) rotate(var(--r)); }
          50% { transform: translateY(-6px) rotate(var(--r)); }
        }
        .float-card { animation: float-card 3s ease-in-out infinite; }
        .live-dot { animation: live-pulse 1.8s ease-in-out infinite; }
        @keyframes live-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
        @keyframes badge-pop { 0%{opacity:0;transform:scale(.8) translateY(10px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes line-in { 0%{opacity:0;transform:translateY(28px)} 100%{opacity:1;transform:translateY(0)} }
        .line-in{animation:line-in 0.9s cubic-bezier(.23,1,.32,1) both}
        @keyframes noise-move{0%{transform:translate(0,0)}25%{transform:translate(-2%,-2%)}50%{transform:translate(1%,2%)}75%{transform:translate(2%,-1%)}100%{transform:translate(0,0)}}
        .noise-layer{position:absolute;inset:-20%;width:140%;height:140%;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px 200px;opacity:.025;pointer-events:none;animation:noise-move .5s steps(1) infinite}
        @keyframes scroll-bounce{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(6px);opacity:.4}}
        .scroll-bounce{animation:scroll-bounce 2s ease-in-out infinite}
        @keyframes marquee-strip{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .marquee-anim{animation:marquee-strip 22s linear infinite}
        @keyframes crash-in{0%{transform:translateY(-80px) scaleY(1.25);opacity:0}55%{transform:translateY(5px) scaleY(.96);opacity:1}75%{transform:translateY(-2px) scaleY(1.01)}100%{transform:translateY(0) scaleY(1);opacity:1}}
        .crash-in{animation:crash-in 0.7s cubic-bezier(.23,1,.32,1) both}
        @keyframes eye-pop{0%{transform:scale(.15);opacity:0;filter:blur(30px)}65%{transform:scale(1.08);opacity:1;filter:blur(0)}100%{transform:scale(1);opacity:1;filter:blur(0)}}
        @keyframes eye-holo{0%,100%{filter:drop-shadow(0 0 22px rgba(255,110,20,.55)) hue-rotate(0deg)}33%{filter:drop-shadow(0 0 38px rgba(255,50,0,.7)) hue-rotate(25deg)}66%{filter:drop-shadow(0 0 18px rgba(80,160,255,.45)) hue-rotate(-18deg)}}
        .eye-hero{animation:eye-holo 4.5s ease-in-out infinite}
        @keyframes chroma-shift{0%,100%{text-shadow:-2px 0 rgba(255,40,40,.3),2px 0 rgba(40,80,255,.25)}50%{text-shadow:2px 0 rgba(255,40,40,.25),-2px 0 rgba(40,80,255,.3)}}
        .chroma{animation:chroma-shift 6s ease-in-out infinite}
        @keyframes scan{0%{top:-1px;opacity:0}4%{opacity:.55}96%{opacity:.35}100%{top:100%;opacity:0}}
        .scan-line{position:absolute;left:0;right:0;height:1px;pointer-events:none;background:linear-gradient(90deg,transparent 0%,rgba(255,100,20,.7) 20%,rgba(255,150,30,.95) 50%,rgba(255,100,20,.7) 80%,transparent 100%);animation:scan 5s linear 3s infinite}
        .corner{position:absolute;width:30px;height:30px;pointer-events:none}
        .corner-tl{top:16px;left:16px;border-top:1px solid rgba(255,255,255,.18);border-left:1px solid rgba(255,255,255,.18)}
        .corner-tr{top:16px;right:16px;border-top:1px solid rgba(255,255,255,.18);border-right:1px solid rgba(255,255,255,.18)}
        .corner-bl{bottom:56px;left:16px;border-bottom:1px solid rgba(255,255,255,.18);border-left:1px solid rgba(255,255,255,.18)}
        .corner-br{bottom:56px;right:16px;border-bottom:1px solid rgba(255,255,255,.18);border-right:1px solid rgba(255,255,255,.18)}
        .ccard-overlay{transform:translateY(100%);transition:transform .32s cubic-bezier(.23,1,.32,1)}
        .group:hover .ccard-overlay{transform:translateY(0)}
        .magnetic{transition:transform .35s cubic-bezier(.23,1,.32,1);will-change:transform}
      `}</style>

      <Navbar />
      <Hero mounted={mounted} />
      <MarqueeStrip />
      <Stats />
      <Process />
      <Gallery />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [{ label: "Projects", id: "projets" }, { label: "Contact", id: "contact" }];
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-md border-b border-zinc-900" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <KabalLogo />
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button key={l.label}
                onClick={() => scrollTo(l.id)}
                className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.25em] uppercase transition-colors">
                {l.label}
              </button>
            ))}
            <Link href="/services" className="text-zinc-500 hover:text-white text-xs font-semibold tracking-[0.25em] uppercase transition-colors">Services</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:junglekabal@gmail.com"
              className="hidden md:block border border-zinc-700 hover:border-white text-zinc-300 hover:text-white text-xs font-bold px-5 py-2.5 tracking-widest uppercase transition-all duration-300">
              Get in touch
            </a>
            {/* Hamburger */}
            <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {navLinks.map((l) => (
          <button key={l.label} onClick={() => scrollTo(l.id)}
            className="text-white font-black text-3xl tracking-[0.2em] uppercase">
            {l.label}
          </button>
        ))}
        <Link href="/services" onClick={() => setOpen(false)}
          className="text-white font-black text-3xl tracking-[0.2em] uppercase">
          Services
        </Link>
        <a href="mailto:junglekabal@gmail.com"
          className="mt-4 border border-zinc-700 text-zinc-400 text-xs font-bold px-8 py-4 tracking-widest uppercase">
          Get in touch
        </a>
      </div>
    </>
  );
}

function MarqueeStrip() {
  const words = ["Built in 48h","Restaurants","Nightclubs","Barbershops","Gaming","NFT & Web3","Spas","Clinics","Beach Bars","Gyms","Cannabis"];
  const all = [...words,...words];
  return (
    <div className="overflow-hidden border-y border-zinc-900 bg-zinc-950/60 py-3.5">
      <div className="flex whitespace-nowrap marquee-anim">
        {all.map((w,i)=>(
          <span key={i} className="text-zinc-600 text-[10px] font-bold tracking-[0.45em] uppercase flex-shrink-0 px-6">
            {w}<span className="text-zinc-800 ml-6">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Process() {
  const {ref,inView}=useInView(0.2);
  const steps=[
    {n:"01",title:"Brief",desc:"Tell us your concept, location and vibe. A quick call or message — 10 minutes max."},
    {n:"02",title:"Design",desc:"We craft your site in 24h — dark, sharp, built to convert. You approve before we code."},
    {n:"03",title:"Live",desc:"Your site goes live with domain, hosting and analytics. Full handoff, same day."},
  ];
  return (
    <section className="py-24 border-t border-zinc-900 bg-zinc-950/40">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
        <div className="mb-14">
          <p className="text-zinc-600 text-xs font-bold tracking-[0.45em] uppercase mb-3">How it works</p>
          <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight leading-none">
            Brief to live.<br/><span className="text-zinc-500">48 hours.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-0">
          {steps.map((s,i)=>(
            <div key={s.n} className={`p-6 md:p-8 border border-zinc-900 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}
              style={{transitionDelay:`${i*150}ms`}}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 border border-zinc-700 flex items-center justify-center bg-zinc-950">
                  <span className="text-white text-xs font-black">{s.n}</span>
                </div>
                <div className="flex-1 h-px bg-zinc-900"/>
              </div>
              <p className="text-white font-black text-2xl mb-3">{s.title}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-6">
          <div className="h-px flex-1 bg-zinc-900"/>
          <span className="text-zinc-600 text-[10px] tracking-widest uppercase">Delivery guaranteed or refunded</span>
          <div className="h-px flex-1 bg-zinc-900"/>
        </div>
      </div>
    </section>
  );
}

function KabalLogo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="w-7 h-7 bg-white flex items-center justify-center">
        <span className="text-black font-black text-xs tracking-tighter">K</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-white font-black tracking-[0.2em] uppercase text-sm">Kabal</span>
        <span className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase">Website Agency</span>
      </div>
    </Link>
  );
}

function Hero({ mounted }: { mounted: boolean }) {
  const magCta1 = useMagnetic(0.32);
  const magCta2 = useMagnetic(0.32);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="noise-layer" style={{zIndex:1}}/>
      <div className="absolute inset-0 pointer-events-none" style={{zIndex:2,backgroundImage:"linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)",backgroundSize:"80px 80px"}}/>
      <div className="absolute pointer-events-none" style={{zIndex:3,top:"38%",left:"50%",transform:"translate(-50%,-50%)",width:800,height:600,background:"radial-gradient(ellipse,rgba(255,90,10,.09) 0%,transparent 65%)",filter:"blur(50px)"}}/>
      <div className="absolute pointer-events-none" style={{zIndex:3,bottom:"15%",right:"5%",width:500,height:400,background:"radial-gradient(ellipse,rgba(100,20,255,.07) 0%,transparent 65%)",filter:"blur(55px)"}}/>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{zIndex:2}}>
        <span className="bebas text-white select-none" style={{fontSize:"clamp(10rem,45vw,46rem)",letterSpacing:"-0.04em",opacity:.018,lineHeight:1}}>KABAL</span>
      </div>
      <AtmosphereCanvas/>
      <div className="absolute inset-0 pointer-events-none" style={{zIndex:5,background:"radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,.75) 100%)"}}/>
      <div className="scan-line" style={{zIndex:6}}/>
      <div className="corner corner-tl" style={{zIndex:15}}/><div className="corner corner-tr" style={{zIndex:15}}/>
      <div className="corner corner-bl" style={{zIndex:15}}/><div className="corner corner-br" style={{zIndex:15}}/>

      <div className="relative text-center px-6 w-full max-w-7xl mx-auto pt-24" style={{zIndex:10}}>
        <div className="flex justify-center mb-8" style={{opacity:mounted?1:0,animation:mounted?"badge-pop .6s cubic-bezier(.34,1.56,.64,1) .1s both":"none"}}>
          <div className="flex items-center gap-2.5 border border-zinc-800 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 live-dot"/>
            <span className="text-zinc-400 text-[10px] font-bold tracking-[0.4em] uppercase">Website Agency · Bangkok & Pattaya</span>
          </div>
        </div>
        <div className="flex justify-center mb-6" style={{opacity:mounted?1:0,animation:mounted?"eye-pop .85s cubic-bezier(.34,1.2,.64,1) .3s both":"none"}}>
          <HeroEye/>
        </div>
        <div className="overflow-hidden select-none" style={{lineHeight:.88}}>
          <div className="bebas chroma text-white crash-in" style={{fontSize:"clamp(3rem,14vw,13rem)",letterSpacing:"-.02em",animationDelay:mounted?"0.65s":"9999s"}}>WE TURN YOUR</div>
        </div>
        <div className="overflow-hidden select-none" style={{lineHeight:.88}}>
          <div className="bebas chroma text-white crash-in" style={{fontSize:"clamp(3rem,14vw,13rem)",letterSpacing:"-.02em",animationDelay:mounted?"0.75s":"9999s"}}>GOOGLE MAPS</div>
        </div>
        <div className="overflow-hidden select-none" style={{lineHeight:.88}}>
          <div className="bebas chroma text-white crash-in" style={{fontSize:"clamp(3rem,14vw,13rem)",letterSpacing:"-.02em",animationDelay:mounted?"0.85s":"9999s"}}>TRAFFIC INTO</div>
        </div>
        <div className="overflow-hidden select-none mb-8 md:mb-10" style={{lineHeight:.88}}>
          <div className="bebas crash-in" style={{fontSize:"clamp(3rem,14vw,13rem)",letterSpacing:"-.02em",animationDelay:mounted?"0.95s":"9999s",background:"linear-gradient(95deg,#fff 0%,#ff9940 45%,#fff 85%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>$$$.</div>
        </div>
        <div className="line-in mb-12" style={{animationDelay:mounted?"1.15s":"9999s"}}>
          <p className="text-zinc-500 text-base md:text-lg font-light max-w-lg mx-auto leading-relaxed">
            Restaurants, clubs, barbershops — a website that converts visitors into customers. Launched in <span className="text-zinc-200 font-semibold">48 hours</span>.
          </p>
        </div>
        <div className="line-in flex flex-col sm:flex-row items-center justify-center gap-4" style={{animationDelay:mounted?"1.3s":"9999s"}}>
          <button ref={magCta1 as React.RefObject<HTMLButtonElement>}
            onClick={()=>document.getElementById("projets")?.scrollIntoView({behavior:"smooth"})}
            className="magnetic w-full sm:w-auto bg-white text-black font-black px-10 py-4 tracking-widest uppercase text-sm hover:shadow-[0_0_50px_rgba(255,140,40,.4)] transition-shadow duration-300">
            View projects
          </button>
          <a ref={magCta2 as React.RefObject<HTMLAnchorElement>}
            href="#contact" onClick={e=>{e.preventDefault();document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});}}
            className="magnetic w-full sm:w-auto border border-zinc-700 hover:border-orange-700/60 text-zinc-400 hover:text-white font-bold px-10 py-4 tracking-widest uppercase text-sm transition-all duration-300">
            Work with us
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{zIndex:10,opacity:mounted?1:0,transition:"opacity 1s ease 1.8s"}}>
        <span className="text-zinc-700 text-[9px] font-bold tracking-[0.4em] uppercase">Scroll</span>
        <div className="scroll-bounce w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent"/>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" style={{zIndex:8}}/>
    </section>
  );
}

function useCounter(target: number, inView: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return n;
}

function StatItem({ v, l, inView, delay }: { v: string; l: string; inView: boolean; delay: number }) {
  const num = parseInt(v.replace(/\D/g, ""));
  const suffix = v.replace(/[0-9]/g, "");
  const count = useCounter(num || 0, inView);
  const display = isNaN(num) || num === 0 ? v : `${count}${suffix}`;
  return (
    <div className={`flex flex-col items-center py-8 border-r border-zinc-900 last:border-r-0 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <span className="text-white font-black text-2xl md:text-3xl tracking-tight">{display}</span>
      <span className="text-zinc-600 text-xs tracking-widest uppercase mt-1 text-center">{l}</span>
    </div>
  );
}

function Stats() {
  const { ref, inView } = useInView();
  const items = [
    { v: "10+", l: "Sites delivered" },
    { v: "100%", l: "Happy clients" },
    { v: "48h", l: "Average turnaround" },
    { v: "TH", l: "Based in Thailand" },
  ];
  return (
    <section ref={ref} className="border-y border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => <StatItem key={s.l} v={s.v} l={s.l} inView={inView} delay={i * 80} />)}
      </div>
    </section>
  );
}

function Gallery() {
  const [cat, setCat] = useState("All");
  const {ref,inView} = useInView(0.05);
  const allCats = Array.from(new Set(PROJECTS.map(p=>p.category)));
  const sortedCats = [
    ...allCats.filter(c=>c!=="NFT & Web3").sort((a,b)=>PROJECTS.filter(p=>p.category===b).length - PROJECTS.filter(p=>p.category===a).length),
    ...(allCats.includes("NFT & Web3") ? ["NFT & Web3"] : []),
  ];
  const cats = ["All", ...sortedCats];
  const groups = cat === "All"
    ? sortedCats.map(c=>({c, items:PROJECTS.filter(p=>p.category===c)})).filter(g=>g.items.length>0)
    : [{c:cat, items:PROJECTS.filter(p=>p.category===cat)}];
  return (
    <section id="projets" className="py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-zinc-600 text-xs font-bold tracking-[0.45em] uppercase mb-3">Portfolio</p>
            <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight leading-none">{PROJECTS.length} sites. All live.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map(c=>(
              <button key={c} onClick={()=>setCat(c)}
                className={`text-[10px] font-bold px-3 py-1.5 tracking-widest uppercase transition-all duration-200 border rounded-full ${cat===c?"bg-white text-black border-white":"border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"}`}>
                {c==="All"?`All (${PROJECTS.length})`:c.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
        <div ref={ref} className={`transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          {groups.map(({c,items})=>(
            <div key={c} className="mb-10 last:mb-0">
              {cat==="All" && (
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-zinc-600 text-[10px] font-bold tracking-[0.4em] uppercase">{c}</span>
                  <div className="flex-1 h-px bg-zinc-900"/>
                  <span className="text-zinc-700 text-[10px]">{items.length}</span>
                </div>
              )}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {items.map((p,i)=><CompactCard key={p.slug} project={p} index={i}/>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardsHeader({ accent }: { accent: string }) {
  const cards = [
    { r: "-8deg", delay: "0s", z: 1, x: "-30px" },
    { r: "-3deg", delay: "0.3s", z: 2, x: "-10px" },
    { r: "3deg", delay: "0.6s", z: 3, x: "10px" },
    { r: "10deg", delay: "0.9s", z: 2, x: "28px" },
    { r: "16deg", delay: "1.2s", z: 1, x: "44px" },
  ];
  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${accent}22 0%, transparent 70%)` }} />
      {cards.map((c, i) => (
        <div key={i}
          className="absolute float-card"
          style={{
            width: 56, height: 80,
            transform: `translateX(${c.x}) rotate(${c.r})`,
            zIndex: c.z,
            animationDelay: c.delay,
            "--r": c.r,
          } as React.CSSProperties}>
          <div className="w-full h-full rounded-lg border-2 overflow-hidden"
            style={{ borderColor: accent, background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
            <div className="w-full h-[55%] flex items-center justify-center" style={{ background: `${accent}18` }}>
              <div className="w-7 h-7 rounded-full border" style={{ borderColor: accent, opacity: 0.8 }} />
            </div>
            <div className="px-1.5 pt-1">
              <div className="h-1 rounded mb-1" style={{ background: accent, opacity: 0.7, width: "70%" }} />
              <div className="h-0.5 rounded" style={{ background: "#ffffff33", width: "50%" }} />
            </div>
          </div>
        </div>
      ))}
      <div className="relative z-10 mt-24 text-center">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Browser Mini Game</span>
      </div>
    </div>
  );
}

function CompactCard({ project: p, index }: { project: typeof PROJECTS[0]; index: number }) {
  const isExternal = p.liveUrl.startsWith("http");
  const cardProps = isExternal ? { href:p.liveUrl, target:"_blank", rel:"noopener noreferrer" } : { href:p.liveUrl };
  return (
    <Link {...cardProps} className="group relative block overflow-hidden bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-colors duration-300" style={{transitionDelay:`${index*40}ms`}}>
      <div className="relative h-28 overflow-hidden">
        {p.cardType==="cards" ? <CardsHeader accent={p.accent}/> : (
          <>
            {p.photo && <img src={p.photo} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70" onError={e=>{(e.target as HTMLImageElement).style.display="none"}}/>}
            <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient??"from-zinc-900 to-black"} ${p.photo?"opacity-60":"opacity-100"}`}/>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"/>
        <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
          <p className="text-white font-black text-xs leading-tight truncate">{p.name}</p>
        </div>
        {p.status==="Live" && (
          <div className="absolute top-1.5 right-1.5 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 border border-green-500/30">
            <span className="w-1 h-1 rounded-full bg-green-400 live-dot"/><span className="text-green-400 text-[8px] font-bold tracking-widest uppercase">Live</span>
          </div>
        )}
        <div className="ccard-overlay absolute inset-0 bg-black/92 backdrop-blur-sm p-3 flex flex-col justify-between z-20">
          <div>
            <span className={`text-[8px] font-bold tracking-[0.25em] uppercase ${p.accentText}`}>{p.category}</span>
            <p className="text-white font-black text-xs mt-0.5 leading-tight">{p.name}</p>
            <p className="text-zinc-400 text-[10px] mt-1 leading-relaxed" style={{display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.desc}</p>
          </div>
          <span className={`text-[9px] font-bold tracking-widest uppercase ${p.accentText}`}>View →</span>
        </div>
      </div>
    </Link>
  );
}

const TESTIMONIALS = [
  {
    quote: "They delivered our entire restaurant website in 36 hours. The design is incredible — our reservations went up 40% in the first month.",
    name: "Marc Lefebvre",
    role: "Owner, Le Palais Bangkok",
    initial: "M",
  },
  {
    quote: "I showed them one photo of my barbershop and they built exactly the vibe I had in my head. Professional, fast, no back-and-forth.",
    name: "James Okonkwo",
    role: "Founder, Barber Royale Phuket",
    initial: "J",
  },
  {
    quote: "Our nightclub needed something dark and cinematic. Kabal nailed it. Every DJ we book asks who made the site.",
    name: "Krit Tansakul",
    role: "Director, Neon Noir Bangkok",
    initial: "K",
  },
  {
    quote: "Simple brief, fast delivery, zero headaches. They even handled our domain and hosting setup. Worth every baht.",
    name: "Nadia Petrov",
    role: "Manager, Aura Spa Koh Samui",
    initial: "N",
  },
];

function Testimonials() {
  const {ref,inView}=useInView();
  const [active,setActive]=useState(0);
  const [fading,setFading]=useState(false);
  useEffect(()=>{
    const t=setInterval(()=>{setFading(true);setTimeout(()=>{setActive(a=>(a+1)%TESTIMONIALS.length);setFading(false);},350);},5000);
    return ()=>clearInterval(t);
  },[]);
  const t=TESTIMONIALS[active];
  return (
    <section className="py-24 md:py-32 border-t border-zinc-900">
      <div ref={ref} className={`max-w-3xl mx-auto px-6 transition-all duration-1000 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
        <div className="text-center mb-12">
          <p className="text-zinc-600 text-xs font-bold tracking-[0.6em] uppercase mb-3">Social proof</p>
          <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight" style={{letterSpacing:"-0.03em"}}>What clients say.</h2>
        </div>
        <div className="border border-zinc-900 bg-zinc-950 p-8 md:p-12 text-center">
          <div style={{opacity:fading?0:1,transform:fading?"translateY(6px)":"translateY(0)",transition:"opacity .35s ease,transform .35s ease"}}>
            <div className="flex gap-0.5 justify-center mb-6">{[...Array(5)].map((_,s)=><span key={s} className="text-amber-400 text-sm">★</span>)}</div>
            <p className="text-zinc-200 text-lg md:text-xl leading-relaxed mb-8 font-light italic">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-9 h-9 bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">{t.initial}</span>
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-zinc-600 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-5">
          {TESTIMONIALS.map((_,i)=>(
            <button key={i} onClick={()=>{setFading(true);setTimeout(()=>{setActive(i);setFading(false);},350);}}
              className="rounded-sm transition-all duration-300"
              style={{width:i===active?20:6,height:4,background:i===active?"#fff":"#3f3f46"}}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const {ref,inView}=useInView(0.15);
  const plans=[
    {
      name:"Flash",price:"7 500",currency:"THB",
      tag:"Simple & fast",
      features:["1-page site (ultra simple)","Mobile responsive","WhatsApp button","Delivered in 24h"],
      accent:"border-zinc-700",cta:"Get started",highlight:false,
    },
    {
      name:"Starter",price:"15 000",currency:"THB",
      tag:"Perfect for small businesses",
      features:["1-page site (landing)","Mobile responsive","WhatsApp booking button","Domain + hosting setup","Delivered in 48h"],
      accent:"border-zinc-700",cta:"Get started",highlight:false,
    },
    {
      name:"Pro",price:"35 000",currency:"THB",
      tag:"Most popular",
      features:["Up to 5 pages","Custom animations & effects","Photo gallery / menu","SEO optimisation","Google Analytics","Delivered in 48h"],
      accent:"border-white",cta:"Start now",highlight:true,
    },
    {
      name:"Premium",price:"Custom",currency:"",
      tag:"Full brand experience",
      features:["Unlimited pages","Advanced interactions","Booking / reservation system","CMS integration","Priority support","Ongoing maintenance"],
      accent:"border-zinc-700",cta:"Let's talk",highlight:false,
    },
  ];
  return (
    <section className="py-24 md:py-32 border-t border-zinc-900 bg-zinc-950/40">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <p className="text-zinc-600 text-xs font-bold tracking-[0.45em] uppercase mb-3">Pricing</p>
          <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight leading-none mb-4">
            Transparent.<br/><span className="text-zinc-500">No surprises.</span>
          </h2>
          <p className="text-zinc-600 text-sm max-w-md mx-auto">Fixed price, fixed deadline. What you see is what you pay.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p,i)=>(
            <div key={p.name}
              className={`relative border ${p.accent} p-6 md:p-8 flex flex-col transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"} ${p.highlight?"bg-white/[0.03]":""}`}
              style={{transitionDelay:`${i*100}ms`}}>
              {p.highlight&&<div className="absolute -top-px left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-4 py-1 tracking-widest uppercase">Most popular</div>}
              <div className="mb-8">
                <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-2">{p.name}</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-white font-black text-4xl tracking-tight">{p.price}</span>
                  {p.currency&&<span className="text-zinc-500 text-sm mb-1">{p.currency}</span>}
                </div>
                <p className="text-zinc-600 text-xs">{p.tag}</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map(f=>(
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span className="text-white mt-0.5 flex-shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
                className={`w-full py-3 text-xs font-black tracking-widest uppercase transition-all duration-300 ${p.highlight?"bg-white text-black hover:bg-zinc-200":"border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"}`}>
                {p.cta} →
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-zinc-700 text-xs mt-8 tracking-wide">All plans include domain setup, hosting config, and post-launch support for 30 days.</p>
      </div>
    </section>
  );
}

function FAQ() {
  const {ref,inView}=useInView(0.1);
  const [open,setOpen]=useState<number|null>(null);
  const items=[
    {q:"Who do you work with?",a:"Restaurants, bars, nightclubs, barbershops, spas, gyms, gaming venues, NFT/Web3 projects — any local business or brand that needs a sharp website fast."},
    {q:"What's included in the delivery?",a:"Design, development, mobile optimisation, domain setup, hosting configuration, Google Analytics, and a 30-day post-launch support window."},
    {q:"Really 48 hours?",a:"Yes. Once we have your brief and content (logo, photos, text), the site is live within 48 hours. Complex Premium builds may take up to 72h."},
    {q:"What do you need from me?",a:"A brief (concept, references, vibe), your logo if you have one, and any photos. No photos? We source professional stock images at no extra cost."},
    {q:"How does payment work?",a:"50% upfront to start, 50% on delivery. We accept bank transfer, PromptPay, and crypto. No hidden fees."},
    {q:"What happens after launch?",a:"30 days of free support included. After that, we offer monthly maintenance packages for updates, backups, and performance monitoring."},
    {q:"Can you update the site later?",a:"Yes. We can make content updates, add pages, or redesign sections. We quote per request — most small updates are done same day."},
  ];
  return (
    <section className="py-24 border-t border-zinc-900 bg-black">
      <div ref={ref} className={`max-w-3xl mx-auto px-6 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
        <div className="mb-12">
          <p className="text-zinc-600 text-xs font-bold tracking-[0.45em] uppercase mb-3">FAQ</p>
          <h2 className="text-white font-black text-4xl tracking-tight leading-none">Common questions.</h2>
        </div>
        <div className="space-y-0">
          {items.map((item,i)=>(
            <div key={i} className="border-b border-zinc-900">
              <button
                onClick={()=>setOpen(open===i?null:i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group">
                <span className={`text-sm font-bold transition-colors duration-200 ${open===i?"text-white":"text-zinc-400 group-hover:text-white"}`}>{item.q}</span>
                <span className={`text-zinc-600 flex-shrink-0 transition-transform duration-300 text-lg leading-none ${open===i?"rotate-45 text-white":""}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open===i?"max-h-40 pb-5":"max-h-0"}`}>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", type: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Kabal] New project — ${form.type || "Website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\nBudget: ${form.budget}\n\n${form.message}`
    );
    window.open(`mailto:junglekabal@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  const inputCls = "w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 transition-colors";
  const selectCls = inputCls + " appearance-none cursor-pointer";

  return (
    <section id="contact" className="py-28 md:py-36 bg-zinc-950 border-t border-zinc-900">
      <div ref={ref} className={`max-w-5xl mx-auto px-6 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div>
            <p className="text-zinc-500 text-xs font-bold tracking-[0.45em] uppercase mb-4">Start a project</p>
            <h2 className="text-white font-black text-4xl md:text-5xl tracking-tight leading-none mb-6">
              Your site in<br /><span className="text-zinc-400">48 hours.</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-10">
              Restaurant, bar, barbershop, club, gaming — we build fast, sharp websites that convert. Tell us about your project and we'll get back to you same day.
            </p>
            <div className="space-y-4">
              {[
                { icon: "✉", label: "Email", value: "junglekabal@gmail.com", href: "mailto:junglekabal@gmail.com" },
                { icon: "📍", label: "Based in", value: "Bangkok & Pattaya, Thailand", href: null },
                { icon: "⚡", label: "Turnaround", value: "48h average delivery", href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-lg w-6 text-center">{item.icon}</span>
                  <div>
                    <p className="text-zinc-600 text-xs tracking-widest uppercase">{item.label}</p>
                    {item.href
                      ? <a href={item.href} className="text-zinc-300 text-sm hover:text-white transition-colors">{item.value}</a>
                      : <p className="text-zinc-300 text-sm">{item.value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {sent ? (
              <div className="border border-zinc-800 p-10 text-center">
                <p className="text-white font-black text-2xl mb-3">Message sent ✓</p>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">Your email client opened with the message pre-filled. We'll reply within a few hours.</p>
                <button onClick={() => setSent(false)} className="text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-white transition-colors">
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required placeholder="Your name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={inputCls} />
                  <input required type="email" placeholder="Your email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={inputCls} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select required value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className={selectCls}>
                    <option value="" disabled>Project type</option>
                    {["Restaurant / Bar", "Nightclub / Lounge", "Barbershop / Salon", "Gaming / E-sport", "Spa / Wellness", "NFT / Web3", "Other"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <select value={form.budget}
                    onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                    className={selectCls}>
                    <option value="" disabled>Budget</option>
                    {["Under 15,000 THB", "15,000 – 40,000 THB", "40,000 – 100,000 THB", "100,000+ THB", "Let's discuss"].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <textarea required rows={5} placeholder="Tell us about your project — location, style, deadline..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={inputCls + " resize-none"} />
                <button type="submit"
                  className="w-full bg-white text-black font-black py-4 tracking-widest uppercase text-sm hover:bg-zinc-200 transition-colors duration-300">
                  Send message →
                </button>
                <p className="text-zinc-700 text-xs text-center">Opens your email client · Reply within same day</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    const contact = document.getElementById("contact");
    if (!contact) return () => window.removeEventListener("scroll", onScroll);
    const obs = new IntersectionObserver(([e]) => setContactInView(e.isIntersecting), { threshold: 0.1 });
    obs.observe(contact);
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);
  if (contactInView) return null;
  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black via-black/95 to-transparent transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <button
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        className="w-full bg-white text-black font-black py-4 tracking-widest uppercase text-sm">
        Start a project →
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <KabalLogo />
        <p className="text-zinc-700 text-xs tracking-widest">© 2026 Kabal Website Agency · Bangkok & Pattaya</p>
        <a href="mailto:junglekabal@gmail.com" className="text-zinc-600 hover:text-zinc-400 text-xs tracking-widest transition-colors">
          junglekabal@gmail.com
        </a>
      </div>
    </footer>
  );
}
