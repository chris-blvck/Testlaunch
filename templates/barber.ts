import { RestaurantData } from "@/lib/types";
import { esc, renderHours, renderWhatsApp, renderSocialLinks } from "./utils";

function renderServices(sections: RestaurantData["menu"]): string {
  if (!sections?.length) return "";
  return sections
    .map(
      (section) => `
    <div class="service-category">
      <h3 class="service-cat-title">${esc(section.name)}</h3>
      <div class="service-list">
        ${section.items
          .map(
            (item) => `
        <div class="service-item">
          <div class="service-item-left">
            <span class="service-name">${esc(item.name)}</span>
            ${item.description ? `<span class="service-desc">${esc(item.description)}</span>` : ""}
          </div>
          ${item.price ? `<span class="service-price">${esc(item.price)}</span>` : ""}
        </div>`
          )
          .join("")}
      </div>
    </div>`
    )
    .join("");
}

export function generateBarber(r: RestaurantData): string {
  const whatsappNum = r.whatsapp?.replace(/\D/g, "") || r.phone?.replace(/\D/g, "") || "";
  const bookingMsg = encodeURIComponent(`Bonjour ${r.name}, je souhaite prendre rendez-vous.`);
  const bookingLink = whatsappNum
    ? `https://wa.me/${whatsappNum}?text=${bookingMsg}`
    : r.phone
    ? `tel:${r.phone}`
    : "#contact";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(r.name)}${r.city ? ` — ${esc(r.city)}` : ""}</title>
  <meta name="description" content="${esc(r.description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --gold: ${esc(r.accentColor)};
      --bg: #080808;
      --bg2: #0e0e0e;
      --bg3: #141414;
      --text: #d8d0c4;
      --muted: #6b6560;
      --white: #f5f0e8;
    }
    html { scroll-behavior: smooth; }
    body { font-family: 'Montserrat', sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; overflow-x: hidden; }
    a { color: var(--gold); text-decoration: none; transition: opacity .2s; }
    a:hover { opacity: 0.75; }
    img { max-width: 100%; display: block; }

    /* ─── NAV ─── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 1.4rem 2.5rem;
      display: flex; align-items: center; justify-content: space-between;
      background: linear-gradient(to bottom, rgba(8,8,8,.95) 0%, rgba(8,8,8,0) 100%);
    }
    .nav-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem; font-weight: 300; letter-spacing: .12em;
      color: var(--white);
    }
    .nav-logo span { color: var(--gold); }
    .nav-links { display: flex; gap: 2.5rem; }
    .nav-links a {
      font-size: .72rem; letter-spacing: .2em; text-transform: uppercase;
      color: rgba(245,240,232,.65); font-weight: 500;
      transition: color .2s;
    }
    .nav-links a:hover { color: var(--gold); opacity: 1; }
    .nav-cta {
      font-size: .72rem; letter-spacing: .18em; text-transform: uppercase;
      font-weight: 600; color: var(--gold) !important;
      border: 1px solid var(--gold); padding: .45rem 1.2rem;
      transition: background .2s, color .2s !important;
    }
    .nav-cta:hover { background: var(--gold); color: #000 !important; opacity: 1 !important; }

    /* ─── HERO ─── */
    .hero {
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      text-align: center;
      ${r.heroImage
        ? `background: url('${esc(r.heroImage)}') center/cover no-repeat;`
        : `background: linear-gradient(160deg, #0d0806 0%, #1a100a 40%, #0d0806 100%);`}
      position: relative;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(to bottom, rgba(8,8,8,.6) 0%, rgba(8,8,8,.82) 100%);
    }
    /* decorative horizontal lines */
    .hero::after {
      content: '';
      position: absolute; left: 50%; top: 50%;
      transform: translate(-50%, -50%);
      width: min(700px, 90vw); height: min(700px, 90vw);
      border: 1px solid rgba(201,168,76,.12);
      border-radius: 50%; pointer-events: none;
    }
    .hero-content { position: relative; z-index: 1; padding: 2rem; max-width: 860px; }
    .hero-ornament {
      display: flex; align-items: center; gap: 1rem;
      justify-content: center; margin-bottom: 2rem;
    }
    .hero-ornament-line { flex: 1; max-width: 80px; height: 1px; background: var(--gold); opacity: .5; }
    .hero-ornament-text {
      font-size: .65rem; letter-spacing: .35em; text-transform: uppercase;
      color: var(--gold); font-weight: 500;
    }
    .hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3.2rem, 9vw, 7rem);
      font-weight: 300; color: var(--white);
      line-height: 1.05; letter-spacing: .04em;
      margin-bottom: 1.2rem;
    }
    .hero h1 em { font-style: italic; color: var(--gold); }
    .hero-tagline {
      font-size: clamp(.85rem, 2vw, 1.05rem);
      color: rgba(216,208,196,.7); letter-spacing: .08em;
      max-width: 520px; margin: 0 auto 3rem;
    }
    .hero-buttons { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
    .btn {
      display: inline-block; padding: .85rem 2.4rem;
      font-size: .75rem; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
      transition: all .25s;
    }
    .btn-primary { background: var(--gold); color: #000; }
    .btn-primary:hover { background: #e8c96a; color: #000; opacity: 1; transform: translateY(-2px); }
    .btn-ghost {
      background: transparent; color: var(--white);
      border: 1px solid rgba(245,240,232,.35);
    }
    .btn-ghost:hover { border-color: var(--white); opacity: 1; color: var(--white); }
    .hero-scroll {
      position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: .5rem;
      font-size: .6rem; letter-spacing: .25em; text-transform: uppercase; color: var(--muted);
    }
    .hero-scroll-line {
      width: 1px; height: 40px;
      background: linear-gradient(to bottom, var(--muted), transparent);
      animation: scrollDrop 1.8s ease-in-out infinite;
    }
    @keyframes scrollDrop { 0%,100%{opacity:0;transform:scaleY(0);transform-origin:top} 40%{opacity:1;transform:scaleY(1)} 80%{opacity:0} }

    /* ─── SECTION COMMONS ─── */
    section { padding: 7rem 2rem; }
    .container { max-width: 1100px; margin: 0 auto; }
    .section-header { margin-bottom: 4rem; }
    .section-eyebrow {
      font-size: .65rem; letter-spacing: .35em; text-transform: uppercase;
      color: var(--gold); margin-bottom: .8rem; font-weight: 500;
    }
    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2rem, 4.5vw, 3.4rem);
      font-weight: 300; color: var(--white); line-height: 1.15;
    }
    .section-divider {
      width: 48px; height: 1px; background: var(--gold);
      margin: 1.5rem 0; opacity: .6;
    }
    .section-lead {
      font-size: .95rem; color: var(--muted); max-width: 540px; line-height: 1.85;
    }

    /* ─── ABOUT ─── */
    .about { background: var(--bg2); }
    .about-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 6rem; align-items: center;
    }
    .about-text p { color: #8d8479; line-height: 1.9; margin-bottom: 1.4rem; font-size: .95rem; }
    .about-cta { margin-top: 2rem; }
    .about-stats {
      display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
      background: #1e1e1e;
    }
    .stat-box {
      background: var(--bg3); padding: 2.5rem 1.5rem; text-align: center;
    }
    .stat-number {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.2rem; font-weight: 300; color: var(--gold);
      line-height: 1;
    }
    .stat-label {
      font-size: .68rem; letter-spacing: .2em; text-transform: uppercase;
      color: var(--muted); margin-top: .6rem;
    }
    .zone-badge {
      display: inline-flex; align-items: center; gap: .5rem;
      margin-top: 2rem; padding: .6rem 1.2rem;
      border: 1px solid rgba(201,168,76,.25);
      font-size: .75rem; letter-spacing: .12em; color: var(--gold);
    }

    /* ─── HOW IT WORKS ─── */
    .how { background: var(--bg); }
    .steps {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0; border: 1px solid #1c1c1c;
    }
    .step {
      padding: 3rem 2.5rem;
      border-right: 1px solid #1c1c1c;
      position: relative;
    }
    .step:last-child { border-right: none; }
    .step-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.5rem; font-weight: 300;
      color: rgba(201,168,76,.15); line-height: 1;
      margin-bottom: 1rem;
    }
    .step-icon { font-size: 1.8rem; margin-bottom: 1rem; }
    .step h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem; font-weight: 400; color: var(--white);
      margin-bottom: .8rem;
    }
    .step p { font-size: .85rem; color: var(--muted); line-height: 1.8; }

    /* ─── SERVICES ─── */
    .services { background: var(--bg2); }
    .services-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 3rem; margin-top: 1rem;
    }
    .service-category { }
    .service-cat-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem; font-weight: 400; color: var(--gold);
      padding-bottom: .8rem; margin-bottom: 1.2rem;
      border-bottom: 1px solid #222;
      letter-spacing: .04em;
    }
    .service-list { display: flex; flex-direction: column; gap: 0; }
    .service-item {
      display: flex; justify-content: space-between; align-items: flex-start;
      padding: 1rem 0; border-bottom: 1px solid #181818;
    }
    .service-item-left { display: flex; flex-direction: column; gap: .2rem; }
    .service-name { color: var(--white); font-size: .9rem; font-weight: 400; }
    .service-desc { font-size: .78rem; color: var(--muted); }
    .service-price {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.15rem; color: var(--gold);
      white-space: nowrap; margin-left: 1.5rem; flex-shrink: 0;
    }

    /* ─── CONTACT ─── */
    .contact { background: var(--bg3); }
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
    .contact-info-block { margin-bottom: 1.8rem; }
    .contact-info-block .label {
      font-size: .65rem; letter-spacing: .25em; text-transform: uppercase;
      color: var(--gold); margin-bottom: .4rem; font-weight: 500;
    }
    .contact-info-block .value { color: var(--text); font-size: .95rem; }
    .contact-info-block a { color: var(--text); }
    .contact-info-block a:hover { color: var(--gold); opacity: 1; }
    .hours-block h4 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.8rem; font-weight: 300; color: var(--white); margin-bottom: 1.5rem;
    }
    .hour-row {
      display: flex; justify-content: space-between;
      padding: .55rem 0; border-bottom: 1px solid #1c1c1c;
      font-size: .85rem; color: var(--muted);
    }
    .hour-row span:first-child { color: var(--text); }
    .booking-cta {
      margin-top: 3rem; padding: 2.5rem;
      border: 1px solid rgba(201,168,76,.2);
      background: rgba(201,168,76,.04);
      text-align: center;
    }
    .booking-cta p {
      font-size: .85rem; color: var(--muted); margin-bottom: 1.5rem; line-height: 1.7;
    }

    /* ─── FOOTER ─── */
    footer {
      background: #050505; padding: 4rem 2rem 2.5rem;
      text-align: center; border-top: 1px solid #141414;
    }
    .footer-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem; font-weight: 300; color: var(--white);
      letter-spacing: .08em; margin-bottom: .5rem;
    }
    .footer-logo span { color: var(--gold); }
    .footer-tagline { font-size: .75rem; letter-spacing: .2em; color: var(--muted); margin-bottom: 2rem; text-transform: uppercase; }
    footer .divider { width: 40px; height: 1px; background: #222; margin: 1.5rem auto; }
    footer .copy { font-size: .75rem; color: #333; }

    /* ─── MOBILE ─── */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
      .steps { grid-template-columns: 1fr; }
      .step { border-right: none; border-bottom: 1px solid #1c1c1c; }
      .step:last-child { border-bottom: none; }
      .services-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- NAV -->
  <nav>
    <div class="nav-logo">${esc(r.logoText || r.name).split(" ").map((w, i) => i === 0 ? `<span>${w}</span>` : ` ${w}`).join("")}</div>
    <div class="nav-links">
      <a href="#about">À Propos</a>
      ${r.menu?.length ? `<a href="#services">Services</a>` : ""}
      <a href="#contact">Contact</a>
      <a href="${bookingLink}" class="nav-cta" target="_blank" rel="noopener">Réserver</a>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-content">
      <div class="hero-ornament">
        <div class="hero-ornament-line"></div>
        <div class="hero-ornament-text">${esc(r.cuisine)}</div>
        <div class="hero-ornament-line"></div>
      </div>
      <h1>${esc(r.name).includes(" ") ? esc(r.name).replace(/\s+/, "<br><em>") + "</em>" : `<em>${esc(r.name)}</em>`}</h1>
      <p class="hero-tagline">${esc(r.tagline || r.description)}</p>
      <div class="hero-buttons">
        <a href="${bookingLink}" class="btn btn-primary" target="_blank" rel="noopener">Prendre Rendez-vous</a>
        ${r.menu?.length ? `<a href="#services" class="btn btn-ghost">Nos Services</a>` : ""}
      </div>
    </div>
    <div class="hero-scroll">
      <div class="hero-scroll-line"></div>
      Découvrir
    </div>
  </section>

  <!-- ABOUT -->
  <section class="about" id="about">
    <div class="container">
      <div class="about-grid">
        <div>
          <p class="section-eyebrow">Notre Savoir-Faire</p>
          <h2 class="section-title">L'Art du Soin<br><em style="font-style:italic;color:var(--gold)">à Domicile</em></h2>
          <div class="section-divider"></div>
          <div class="about-text">
            <p>${esc(r.description)}</p>
            <p>Nous nous déplaçons directement chez vous ou à votre hôtel${r.city ? ` à ${esc(r.city)}` : ""}, apportant tout l'équipement professionnel nécessaire pour une expérience irréprochable.</p>
          </div>
          ${r.address || r.city ? `
          <div class="zone-badge">
            <span>📍</span>
            <span>Zone de déplacement : ${r.city ? esc(r.city) : ""}${r.address ? ` · ${esc(r.address)}` : ""}</span>
          </div>` : ""}
          <div class="about-cta">
            <a href="${bookingLink}" class="btn btn-primary" target="_blank" rel="noopener">Réserver une Séance</a>
          </div>
        </div>
        <div class="about-stats">
          <div class="stat-box">
            <div class="stat-number">✦</div>
            <div class="stat-label">Qualité Premium</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">5★</div>
            <div class="stat-label">Service d'Exception</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">100%</div>
            <div class="stat-label">À Domicile</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">∞</div>
            <div class="stat-label">Discrétion</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="how" id="how">
    <div class="container">
      <div class="section-header">
        <p class="section-eyebrow">Le Processus</p>
        <h2 class="section-title">Comment Ça Marche</h2>
        <div class="section-divider"></div>
        <p class="section-lead">Une expérience pensée pour votre confort — sans déplacement, sans attente.</p>
      </div>
      <div class="steps">
        <div class="step">
          <div class="step-num">01</div>
          <div class="step-icon">💬</div>
          <h3>Réservez</h3>
          <p>Contactez-nous via WhatsApp ou téléphone. Choisissez votre créneau, votre lieu et vos services.</p>
        </div>
        <div class="step">
          <div class="step-num">02</div>
          <div class="step-icon">🚗</div>
          <h3>On se Déplace</h3>
          <p>Nous arrivons chez vous à l'heure prévue avec tout l'équipement professionnel — rasoirs, tondeuses, produits haut de gamme.</p>
        </div>
        <div class="step">
          <div class="step-num">03</div>
          <div class="step-icon">✂️</div>
          <h3>On Prend Soin de Vous</h3>
          <p>Installez-vous confortablement. Nous vous offrons un service sur-mesure digne des plus grands salons.</p>
        </div>
        <div class="step">
          <div class="step-num">04</div>
          <div class="step-icon">🪞</div>
          <h3>Résultat Parfait</h3>
          <p>Vous ressortez impeccable, sans avoir quitté votre domicile ou votre hôtel.</p>
        </div>
      </div>
    </div>
  </section>

  ${r.menu?.length ? `
  <!-- SERVICES -->
  <section class="services" id="services">
    <div class="container">
      <div class="section-header">
        <p class="section-eyebrow">Nos Prestations</p>
        <h2 class="section-title">Services & Tarifs</h2>
        <div class="section-divider"></div>
        <p class="section-lead">Tous nos services incluent les produits, le déplacement et un résultat garanti.</p>
      </div>
      <div class="services-grid">
        ${renderServices(r.menu)}
      </div>
      <div style="text-align:center;margin-top:4rem">
        <a href="${bookingLink}" class="btn btn-primary" target="_blank" rel="noopener">Réserver Maintenant</a>
      </div>
    </div>
  </section>` : ""}

  <!-- CONTACT -->
  <section class="contact" id="contact">
    <div class="container">
      <div class="contact-grid">
        <div>
          <p class="section-eyebrow">Nous Contacter</p>
          <h2 class="section-title">Réservations<br>&amp; Informations</h2>
          <div class="section-divider"></div>
          ${r.phone ? `
          <div class="contact-info-block">
            <div class="label">Téléphone</div>
            <div class="value"><a href="tel:${esc(r.phone)}">${esc(r.phone)}</a></div>
          </div>` : ""}
          ${r.whatsapp ? `
          <div class="contact-info-block">
            <div class="label">WhatsApp</div>
            <div class="value"><a href="https://wa.me/${r.whatsapp.replace(/\D/g,'')}" target="_blank" rel="noopener">${esc(r.whatsapp)}</a></div>
          </div>` : ""}
          ${r.email ? `
          <div class="contact-info-block">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></div>
          </div>` : ""}
          ${r.address || r.city ? `
          <div class="contact-info-block">
            <div class="label">Zone de Service</div>
            <div class="value">${r.address ? esc(r.address) + (r.city ? `, ` : '') : ''}${r.city ? esc(r.city) : ''}</div>
          </div>` : ""}
          ${r.instagram ? `
          <div class="contact-info-block">
            <div class="label">Instagram</div>
            <div class="value"><a href="https://instagram.com/${esc(r.instagram.replace(/^@/,''))}" target="_blank" rel="noopener">@${esc(r.instagram.replace(/^@/,''))}</a></div>
          </div>` : ""}

          <div class="booking-cta">
            <p>Disponible 7j/7 sur rendez-vous. Réservez votre créneau dès maintenant.</p>
            <a href="${bookingLink}" class="btn btn-primary" target="_blank" rel="noopener">Réserver par WhatsApp</a>
          </div>
        </div>
        ${r.hours ? `
        <div>
          <div class="hours-block">
            <h4>Horaires de Disponibilité</h4>
            ${renderHours(r.hours, "div")}
          </div>
        </div>` : "<div></div>"}
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-logo">${esc(r.logoText || r.name).split(" ").map((w, i) => i === 0 ? `<span>${w}</span>` : ` ${w}`).join("")}</div>
    <p class="footer-tagline">${esc(r.cuisine)}${r.city ? ` · ${esc(r.city)}` : ""}</p>
    ${renderSocialLinks(r, "var(--muted)")}
    <div class="divider"></div>
    <p class="copy">&copy; ${new Date().getFullYear()} ${esc(r.name)} — Tous droits réservés</p>
  </footer>

  ${renderWhatsApp(r)}

</body>
</html>`;
}
