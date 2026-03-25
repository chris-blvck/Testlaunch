import { RestaurantData } from "@/lib/types";
import { esc, renderHours, renderMenu, renderWhatsApp, renderSocialLinks } from "./utils";

export function generateModern(r: RestaurantData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(r.name)}${r.city ? ` — ${esc(r.city)}` : ""}</title>
  <meta name="description" content="${esc(r.description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: ${esc(r.primaryColor)};
      --accent: ${esc(r.accentColor)};
      --dark: #111111;
      --light: #f9f7f4;
    }
    body { font-family: 'Inter', sans-serif; background: var(--dark); color: #e8e4de; }
    a { color: var(--accent); text-decoration: none; }

    /* NAV */
    nav {
      position: fixed; top: 0; width: 100%; z-index: 100;
      padding: 1.2rem 2rem;
      display: flex; align-items: center; justify-content: space-between;
      background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
      backdrop-filter: blur(4px);
    }
    .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #fff; letter-spacing: 0.05em; }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { color: rgba(255,255,255,0.8); font-size: 0.875rem; letter-spacing: 0.1em; text-transform: uppercase; transition: color .2s; }
    .nav-links a:hover { color: var(--accent); }

    /* HERO */
    .hero {
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      text-align: center;
      background: ${r.heroImage ? `url('${esc(r.heroImage)}') center/cover no-repeat` : `linear-gradient(135deg, #1a0a00 0%, #2d1200 50%, #1a0a00 100%)`};
      position: relative;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%);
    }
    .hero-content { position: relative; z-index: 1; padding: 2rem; max-width: 800px; }
    .hero-badge {
      display: inline-block; margin-bottom: 1.5rem;
      padding: 0.4rem 1.2rem; border: 1px solid var(--accent);
      font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--accent);
    }
    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(3rem, 8vw, 6rem);
      color: #fff; line-height: 1.1; margin-bottom: 1rem;
    }
    .hero p {
      font-size: 1.2rem; color: rgba(255,255,255,0.75);
      max-width: 500px; margin: 0 auto 2.5rem;
    }
    .btn {
      display: inline-block; padding: 0.9rem 2.5rem;
      background: var(--accent); color: #000;
      font-size: 0.85rem; font-weight: 600;
      letter-spacing: 0.15em; text-transform: uppercase;
      transition: transform .2s, opacity .2s;
    }
    .btn:hover { transform: translateY(-2px); opacity: 0.9; color: #000; }
    .btn-outline {
      background: transparent; color: #fff;
      border: 1px solid rgba(255,255,255,0.5); margin-left: 1rem;
    }
    .btn-outline:hover { border-color: #fff; color: #fff; }

    /* SECTIONS */
    section { padding: 6rem 2rem; }
    .container { max-width: 1100px; margin: 0 auto; }
    .section-label {
      font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 1rem;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 4vw, 3rem); color: #fff;
      margin-bottom: 1.5rem;
    }

    /* ABOUT */
    .about { background: #161616; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
    .about-text p { line-height: 1.8; color: #a09890; font-size: 1.05rem; margin-bottom: 1.5rem; }
    .about-stat { text-align: center; padding: 2rem; border: 1px solid #2a2a2a; }
    .about-stat .number {
      font-family: 'Playfair Display', serif;
      font-size: 3rem; color: var(--accent);
    }
    .about-stat .label { font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; color: #666; margin-top: 0.5rem; }
    .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

    /* MENU */
    .menu { background: var(--dark); }
    .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; margin-top: 3rem; }
    .menu-section h3 {
      font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--accent);
      margin-bottom: 1.5rem; padding-bottom: 0.75rem;
      border-bottom: 1px solid #2a2a2a;
    }
    .menu-item { display: flex; justify-content: space-between; align-items: baseline; padding: 0.75rem 0; border-bottom: 1px solid #1e1e1e; }
    .menu-item-info h4 { color: #e8e4de; font-weight: 400; margin-bottom: 0.2rem; }
    .menu-item-info p { font-size: 0.85rem; color: #666; }
    .menu-item-price { font-family: 'Playfair Display', serif; color: var(--accent); white-space: nowrap; margin-left: 1rem; }

    /* HOURS + CONTACT */
    .info { background: #161616; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
    .info-block h3 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #fff; margin-bottom: 1.5rem; }
    .hours-list { list-style: none; }
    .hours-list li { display: flex; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid #222; color: #a09890; font-size: 0.95rem; }
    .hours-list li span:first-child { color: #e8e4de; }
    .contact-item { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; color: #a09890; }
    .contact-item .icon { font-size: 1.2rem; }

    /* FOOTER */
    footer {
      background: #0a0a0a; padding: 3rem 2rem; text-align: center;
      color: #444; font-size: 0.85rem;
    }
    footer .footer-name { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #fff; margin-bottom: 1rem; }

    @media (max-width: 768px) {
      .about-grid, .info-grid { grid-template-columns: 1fr; gap: 2rem; }
      .nav-links { display: none; }
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

  <section class="hero">
    <div class="hero-content">
      <div class="hero-badge">${esc(r.cuisine)}</div>
      <h1>${esc(r.name)}</h1>
      <p>${esc(r.tagline || r.description)}</p>
      <a href="#menu" class="btn">View Menu</a>
      ${r.phone ? `<a href="tel:${esc(r.phone)}" class="btn btn-outline">Reserve a Table</a>` : ""}
    </div>
  </section>

  <section class="about" id="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-text">
          <p class="section-label">Our Story</p>
          <h2 class="section-title">A Taste of Passion</h2>
          <p>${esc(r.description)}</p>
          ${r.address ? `<p style="color:#666">📍 ${esc(r.address)}${r.city ? `, ${esc(r.city)}` : ""}</p>` : ""}
        </div>
        <div class="about-stats">
          <div class="about-stat"><div class="number">★</div><div class="label">Premium Quality</div></div>
          <div class="about-stat"><div class="number">🍽</div><div class="label">Fine Cuisine</div></div>
          <div class="about-stat"><div class="number">♥</div><div class="label">Made with Love</div></div>
          <div class="about-stat"><div class="number">👨‍🍳</div><div class="label">Expert Chefs</div></div>
        </div>
      </div>
    </div>
  </section>

  ${r.menu?.length ? `
  <section class="menu" id="menu">
    <div class="container">
      <p class="section-label">What We Offer</p>
      <h2 class="section-title">Our Menu</h2>
      <div class="menu-grid">
        ${renderMenu(r.menu)}
      </div>
    </div>
  </section>` : ""}

  <section class="info" id="info">
    <div class="container">
      <div class="info-grid">
        ${r.hours ? `
        <div class="info-block">
          <h3>Opening Hours</h3>
          <ul class="hours-list">
            ${renderHours(r.hours)}
          </ul>
        </div>` : ""}
        <div class="info-block">
          <h3>Find Us</h3>
          ${r.address ? `<div class="contact-item"><span class="icon">📍</span><span>${esc(r.address)}${r.city ? `, ${esc(r.city)}` : ""}</span></div>` : ""}
          ${r.phone ? `<div class="contact-item"><span class="icon">📞</span><a href="tel:${esc(r.phone)}" style="color:inherit">${esc(r.phone)}</a></div>` : ""}
          ${r.email ? `<div class="contact-item"><span class="icon">✉️</span><a href="mailto:${esc(r.email)}" style="color:inherit">${esc(r.email)}</a></div>` : ""}
          ${r.phone ? `<a href="tel:${esc(r.phone)}" class="btn" style="margin-top:2rem">Reserve Now</a>` : ""}
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="footer-name">${esc(r.name)}</div>
    <p>${esc(r.cuisine)} Restaurant${r.city ? ` in ${esc(r.city)}` : ""}</p>
    ${r.address ? `<p style="margin-top:0.5rem">${esc(r.address)}</p>` : ""}
    ${renderSocialLinks(r, "#888")}
  </footer>
  ${renderWhatsApp(r)}
</body>
</html>`;
}
