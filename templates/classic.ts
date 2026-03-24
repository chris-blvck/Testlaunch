import { RestaurantData } from "@/lib/types";
import { esc, renderHours, renderWhatsApp, renderSocialLinks } from "./utils";

export function generateClassic(r: RestaurantData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(r.name)}${r.city ? ` — ${esc(r.city)}` : ""}</title>
  <meta name="description" content="${esc(r.description)}" />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: ${esc(r.primaryColor)};
      --accent: ${esc(r.accentColor)};
      --bg: #faf8f5;
      --text: #2c2416;
    }
    body { font-family: 'Lato', sans-serif; background: var(--bg); color: var(--text); }
    a { color: var(--primary); text-decoration: none; }

    nav {
      background: #fff; padding: 1rem 3rem;
      display: flex; align-items: center; justify-content: space-between;
      box-shadow: 0 1px 0 rgba(0,0,0,0.08);
      position: sticky; top: 0; z-index: 100;
    }
    .nav-logo {
      font-family: 'Cormorant Garamond', serif; font-size: 1.8rem;
      color: var(--text); font-weight: 700; letter-spacing: 0.03em;
    }
    .nav-links { display: flex; gap: 2.5rem; }
    .nav-links a { font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: #666; font-weight: 700; transition: color .2s; }
    .nav-links a:hover { color: var(--primary); }

    .hero {
      background: ${r.heroImage ? `url('${esc(r.heroImage)}') center/cover no-repeat` : `var(--primary)`};
      height: 85vh; display: flex; align-items: center; justify-content: center;
      text-align: center; position: relative;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: rgba(0,0,0,${r.heroImage ? "0.5" : "0.3"});
    }
    .hero-content { position: relative; z-index: 1; padding: 2rem; }
    .hero-pre { font-size: 0.8rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.2rem; }
    .hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3.5rem, 9vw, 7rem);
      color: #fff; font-weight: 700; line-height: 1;
      text-shadow: 0 2px 20px rgba(0,0,0,0.3);
    }
    .hero-divider { width: 60px; height: 2px; background: var(--accent); margin: 1.5rem auto; }
    .hero-sub { color: rgba(255,255,255,0.85); font-size: 1.15rem; font-weight: 300; margin-bottom: 2.5rem; max-width: 500px; }
    .btn {
      display: inline-block; padding: 1rem 3rem;
      font-size: 0.8rem; font-weight: 700; letter-spacing: 0.15em;
      text-transform: uppercase; transition: all .25s;
    }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-primary:hover { background: #fff; color: var(--text); }
    .btn-outline { border: 2px solid #fff; color: #fff; margin-left: 1rem; }
    .btn-outline:hover { background: #fff; color: var(--text); }

    section { padding: 6rem 3rem; }
    .container { max-width: 1000px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 4rem; }
    .section-pre { font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--primary); margin-bottom: 1rem; display: block; }
    .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 2.8rem); color: var(--text); }
    .section-divider { width: 50px; height: 2px; background: var(--accent); margin: 1.2rem auto 0; }

    .about { background: #fff; }
    .about-content { max-width: 700px; margin: 0 auto; text-align: center; }
    .about-content p { font-size: 1.1rem; line-height: 1.9; color: #555; font-weight: 300; }
    .about-features { display: flex; justify-content: center; gap: 3rem; margin-top: 3rem; flex-wrap: wrap; }
    .feature { text-align: center; }
    .feature-icon { font-size: 2rem; margin-bottom: 0.5rem; }
    .feature h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--text); }

    .menu { background: var(--bg); }
    .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem; }
    .menu-section h3 {
      font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: var(--primary);
      text-align: center; margin-bottom: 1.5rem; padding-bottom: 0.75rem;
      border-bottom: 1px solid #ddd;
    }
    .menu-item { padding: 0.8rem 0; border-bottom: 1px dotted #e0d8cc; }
    .menu-item-row { display: flex; justify-content: space-between; }
    .menu-item-name { font-weight: 700; font-size: 0.95rem; }
    .menu-item-price { color: var(--primary); font-family: 'Cormorant Garamond', serif; font-size: 1rem; }
    .menu-item-desc { font-size: 0.8rem; color: #888; margin-top: 0.2rem; font-style: italic; }

    .info-section { background: var(--primary); color: #fff; }
    .info-section .section-title { color: #fff; }
    .info-section .section-pre { color: var(--accent); }
    .info-section .section-divider { background: var(--accent); }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
    .info-block h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; margin-bottom: 1.5rem; }
    .hours-table { width: 100%; }
    .hours-table tr td { padding: 0.5rem 0; }
    .hours-table tr td:first-child { color: rgba(255,255,255,0.7); padding-right: 2rem; }
    .contact-line { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; font-size: 1rem; }
    .contact-line a { color: #fff; }

    footer { background: #1a1a1a; color: #666; text-align: center; padding: 2.5rem; font-size: 0.85rem; }
    footer .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: #fff; margin-bottom: 0.5rem; }

    @media (max-width: 768px) {
      .info-grid { grid-template-columns: 1fr; }
      .nav-links { display: none; }
      .btn-outline { display: none; }
      nav { padding: 1rem 1.5rem; }
      section { padding: 4rem 1.5rem; }
    }
  </style>
</head>
<body>
  <nav>
    <div class="nav-logo">${esc(r.logoText || r.name)}</div>
    <div class="nav-links">
      <a href="#about">About</a>
      ${r.menu?.length ? `<a href="#menu">Menu</a>` : ""}
      <a href="#info">Contact</a>
    </div>
  </nav>

  <div class="hero">
    <div class="hero-content">
      <p class="hero-pre">✦ ${esc(r.cuisine)} ✦</p>
      <h1>${esc(r.name)}</h1>
      <div class="hero-divider"></div>
      <p class="hero-sub">${esc(r.tagline || r.description)}</p>
      ${r.phone ? `<a href="tel:${esc(r.phone)}" class="btn btn-primary">Reserve a Table</a>` : ""}
      <a href="#menu" class="btn btn-outline">Discover Menu</a>
    </div>
  </div>

  <section class="about" id="about">
    <div class="container">
      <div class="section-header">
        <span class="section-pre">Our Story</span>
        <h2 class="section-title">Welcome to ${esc(r.name)}</h2>
        <div class="section-divider"></div>
      </div>
      <div class="about-content">
        <p>${esc(r.description)}</p>
        ${r.address ? `<p style="margin-top:1rem;color:#999">📍 ${esc(r.address)}${r.city ? `, ${esc(r.city)}` : ""}</p>` : ""}
      </div>
      <div class="about-features">
        <div class="feature"><div class="feature-icon">🌿</div><h4>Fresh Ingredients</h4></div>
        <div class="feature"><div class="feature-icon">👨‍🍳</div><h4>Expert Chefs</h4></div>
        <div class="feature"><div class="feature-icon">🍷</div><h4>Fine Selection</h4></div>
        <div class="feature"><div class="feature-icon">✨</div><h4>Warm Atmosphere</h4></div>
      </div>
    </div>
  </section>

  ${r.menu?.length ? `
  <section class="menu" id="menu">
    <div class="container">
      <div class="section-header">
        <span class="section-pre">Culinary Delights</span>
        <h2 class="section-title">Our Menu</h2>
        <div class="section-divider"></div>
      </div>
      <div class="menu-grid">
        ${r.menu.map((section) => `
          <div class="menu-section">
            <h3>${esc(section.name)}</h3>
            ${section.items.map((item) => `
              <div class="menu-item">
                <div class="menu-item-row">
                  <span class="menu-item-name">${esc(item.name)}</span>
                  ${item.price ? `<span class="menu-item-price">${esc(item.price)}</span>` : ""}
                </div>
                ${item.description ? `<p class="menu-item-desc">${esc(item.description)}</p>` : ""}
              </div>`).join("")}
          </div>`).join("")}
      </div>
    </div>
  </section>` : ""}

  <section class="info-section" id="info">
    <div class="container">
      <div class="section-header">
        <span class="section-pre">Visit Us</span>
        <h2 class="section-title">Find &amp; Contact Us</h2>
        <div class="section-divider"></div>
      </div>
      <div class="info-grid">
        ${r.hours ? `
        <div class="info-block">
          <h3>Opening Hours</h3>
          <table class="hours-table">
            ${renderHours(r.hours, "table")}
          </table>
        </div>` : ""}
        <div class="info-block">
          <h3>Get in Touch</h3>
          ${r.address ? `<div class="contact-line">📍 <span>${esc(r.address)}${r.city ? `, ${esc(r.city)}` : ""}</span></div>` : ""}
          ${r.phone ? `<div class="contact-line">📞 <a href="tel:${esc(r.phone)}">${esc(r.phone)}</a></div>` : ""}
          ${r.email ? `<div class="contact-line">✉️ <a href="mailto:${esc(r.email)}">${esc(r.email)}</a></div>` : ""}
          ${r.phone ? `<a href="tel:${esc(r.phone)}" class="btn btn-primary" style="margin-top:2rem;display:inline-block">Call to Reserve</a>` : ""}
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="footer-logo">${esc(r.name)}</div>
    <p>${esc(r.cuisine)} Restaurant${r.city ? ` · ${esc(r.city)}` : ""}</p>
    ${renderSocialLinks(r, "#666")}
  </footer>
  ${renderWhatsApp(r)}
</body>
</html>`;
}
