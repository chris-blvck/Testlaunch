import { RestaurantData } from "@/lib/types";
import { esc, renderHours, renderWhatsApp, renderSocialLinks } from "./utils";

export function generateMinimal(r: RestaurantData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(r.name)}${r.city ? ` — ${esc(r.city)}` : ""}</title>
  <meta name="description" content="${esc(r.description)}" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --primary: ${esc(r.primaryColor)}; --accent: ${esc(r.accentColor)}; }
    body { font-family: 'DM Sans', sans-serif; background: #fff; color: #1a1a1a; }
    a { color: var(--primary); text-decoration: none; }

    nav {
      padding: 2rem 4rem; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;
    }
    .nav-logo { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #1a1a1a; }
    .nav-cta {
      background: var(--primary); color: #fff; padding: 0.6rem 1.5rem;
      font-size: 0.85rem; transition: opacity .2s;
    }
    .nav-cta:hover { opacity: 0.85; color: #fff; }

    .hero {
      display: grid; grid-template-columns: 1fr 1fr;
      min-height: 90vh; align-items: stretch;
    }
    .hero-left {
      padding: 6rem 4rem; display: flex; flex-direction: column; justify-content: center;
    }
    .hero-tag {
      display: inline-block; background: #f5f5f5; color: #666;
      padding: 0.3rem 0.8rem; font-size: 0.75rem; letter-spacing: 0.1em;
      text-transform: uppercase; margin-bottom: 2rem; border-radius: 2px;
    }
    .hero h1 {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      line-height: 1.1; margin-bottom: 1.5rem; color: #1a1a1a;
    }
    .hero-desc { font-size: 1.1rem; line-height: 1.7; color: #666; max-width: 420px; margin-bottom: 3rem; font-weight: 300; }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn-main {
      background: var(--primary); color: #fff;
      padding: 0.9rem 2rem; font-size: 0.9rem; font-weight: 500;
      transition: opacity .2s;
    }
    .btn-main:hover { opacity: 0.85; color: #fff; }
    .btn-ghost {
      border: 1px solid #ddd; color: #1a1a1a;
      padding: 0.9rem 2rem; font-size: 0.9rem; font-weight: 500;
      transition: border-color .2s;
    }
    .btn-ghost:hover { border-color: #999; color: #1a1a1a; }
    .hero-right {
      background: ${r.heroImage ? `url('${esc(r.heroImage)}') center/cover no-repeat` : `var(--primary)`};
      position: relative;
    }
    .hero-right::after {
      content: ''; position: absolute; inset: 0;
      background: ${r.heroImage ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.1)"};
    }

    .features {
      padding: 5rem 4rem; background: #fafafa;
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;
    }
    .feat { padding: 2rem; background: #fff; border: 1px solid #f0f0f0; }
    .feat-icon { font-size: 1.8rem; margin-bottom: 1rem; }
    .feat h3 { font-family: 'DM Serif Display', serif; font-size: 1.1rem; margin-bottom: 0.5rem; }
    .feat p { font-size: 0.85rem; color: #888; line-height: 1.6; }

    .about-section { padding: 6rem 4rem; max-width: 800px; margin: 0 auto; text-align: center; }
    .label { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; display: block; }
    .about-section h2 { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 2rem; }
    .about-section p { font-size: 1.1rem; line-height: 1.9; color: #555; font-weight: 300; }

    ${r.menu?.length ? `
    .menu-section-outer { padding: 6rem 4rem; }
    .menu-header { margin-bottom: 3rem; }
    .menu-header h2 { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 4vw, 3rem); }
    .menu-tabs { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem; }
    .menu-group h3 {
      font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 1.5rem; padding-bottom: 0.75rem;
      border-bottom: 2px solid var(--accent);
    }
    .mi { display: flex; justify-content: space-between; padding: 0.9rem 0; border-bottom: 1px solid #f0f0f0; }
    .mi-left h4 { font-size: 1rem; font-weight: 500; }
    .mi-left p { font-size: 0.82rem; color: #999; margin-top: 0.2rem; }
    .mi-price { font-family: 'DM Serif Display', serif; color: var(--primary); font-size: 1rem; }
    ` : ""}

    .contact-section { background: #1a1a1a; color: #fff; padding: 6rem 4rem; }
    .contact-inner { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
    .contact-section .label { color: var(--accent); }
    .contact-section h2 { font-family: 'DM Serif Display', serif; font-size: 2.5rem; margin-bottom: 0.5rem; }
    .contact-detail { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; color: #aaa; }
    .contact-detail a { color: #aaa; transition: color .2s; }
    .contact-detail a:hover { color: #fff; }
    .hours-block h3 { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #fff; margin-bottom: 1.5rem; }
    .hour-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #333; color: #aaa; font-size: 0.9rem; }
    .hour-row span:first-child { color: #fff; }

    footer { padding: 2rem 4rem; border-top: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; color: #999; font-size: 0.85rem; }
    footer .footer-name { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: #1a1a1a; }

    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; }
      .hero-right { min-height: 40vh; }
      .hero-left { padding: 3rem 2rem; }
      .features { grid-template-columns: 1fr 1fr; padding: 3rem 2rem; }
      nav, .about-section, ${r.menu?.length ? ".menu-section-outer," : ""} .contact-section, footer { padding-left: 2rem; padding-right: 2rem; }
      .contact-inner { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .features { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <nav>
    <div class="nav-logo">${esc(r.logoText || r.name)}</div>
    ${r.phone ? `<a href="tel:${esc(r.phone)}" class="nav-cta">Reserve</a>` : `<a href="#contact" class="nav-cta">Contact</a>`}
  </nav>

  <div class="hero">
    <div class="hero-left">
      <span class="hero-tag">${esc(r.cuisine)}</span>
      <h1>${esc(r.name)}</h1>
      <p class="hero-desc">${esc(r.tagline || r.description)}</p>
      <div class="hero-actions">
        ${r.phone ? `<a href="tel:${esc(r.phone)}" class="btn-main">Call Us</a>` : ""}
        <a href="#about" class="btn-ghost">Learn More</a>
      </div>
    </div>
    <div class="hero-right"></div>
  </div>

  <div class="features">
    <div class="feat"><div class="feat-icon">🌿</div><h3>Fresh Daily</h3><p>Only the finest ingredients sourced fresh every day.</p></div>
    <div class="feat"><div class="feat-icon">👨‍🍳</div><h3>Expert Chefs</h3><p>Passionate culinary team with years of experience.</p></div>
    <div class="feat"><div class="feat-icon">🍽</div><h3>${esc(r.cuisine)} Cuisine</h3><p>Authentic flavors and traditional recipes.</p></div>
    <div class="feat"><div class="feat-icon">❤️</div><h3>Made with Love</h3><p>Every dish crafted with care and attention.</p></div>
  </div>

  <div class="about-section" id="about">
    <span class="label">About Us</span>
    <h2>Welcome to ${esc(r.name)}</h2>
    <p>${esc(r.description)}</p>
  </div>

  ${r.menu?.length ? `
  <div class="menu-section-outer" id="menu">
    <div class="menu-header">
      <span class="label">What We Serve</span>
      <h2>Our Menu</h2>
    </div>
    <div class="menu-tabs">
      ${r.menu.map((section) => `
        <div class="menu-group">
          <h3>${esc(section.name)}</h3>
          ${section.items.map((item) => `
            <div class="mi">
              <div class="mi-left">
                <h4>${esc(item.name)}</h4>
                ${item.description ? `<p>${esc(item.description)}</p>` : ""}
              </div>
              ${item.price ? `<span class="mi-price">${esc(item.price)}</span>` : ""}
            </div>`).join("")}
        </div>`).join("")}
    </div>
  </div>` : ""}

  <div class="contact-section" id="contact">
    <div class="contact-inner">
      <div>
        <span class="label">Visit Us</span>
        <h2>Come &amp; Dine</h2>
        <p style="color:#aaa;margin-bottom:2rem;font-weight:300">${esc(r.cuisine)} dining${r.city ? ` in ${esc(r.city)}` : ""}.</p>
        ${r.address ? `<div class="contact-detail">📍 <span>${esc(r.address)}${r.city ? `, ${esc(r.city)}` : ""}</span></div>` : ""}
        ${r.phone ? `<div class="contact-detail">📞 <a href="tel:${esc(r.phone)}">${esc(r.phone)}</a></div>` : ""}
        ${r.email ? `<div class="contact-detail">✉️ <a href="mailto:${esc(r.email)}">${esc(r.email)}</a></div>` : ""}
        ${r.phone ? `<a href="tel:${esc(r.phone)}" class="btn-main" style="display:inline-block;margin-top:2rem">Reserve a Table</a>` : ""}
      </div>
      ${r.hours ? `
      <div>
        <div class="hours-block">
          <h3>Opening Hours</h3>
          ${renderHours(r.hours, "div")}
        </div>
      </div>` : ""}
    </div>
  </div>

  <footer>
    <span class="footer-name">${esc(r.name)}</span>
    <div style="display:flex;align-items:center;gap:1.5rem">
      <span>${esc(r.cuisine)}${r.city ? ` · ${esc(r.city)}` : ""}</span>
      ${renderSocialLinks(r, "#999")}
    </div>
  </footer>
  ${renderWhatsApp(r)}
</body>
</html>`;
}
