import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const UX_AUDIT = [
  {
    severity: "critical",
    label: "XSS Vulnerability",
    status: "fixed",
    note: "User data was injected raw into HTML templates. All fields are now escaped with esc().",
  },
  {
    severity: "high",
    label: "No error feedback on save failure",
    status: "backlog",
    note: "If the API fails, the form just silently stops loading. Users have no idea what happened.",
  },
  {
    severity: "high",
    label: "Orphaned draft sites on Cancel",
    status: "backlog",
    note: "Clicking Preview on a new unsaved site creates a draft entry. Cancelling the form leaves it in the list.",
  },
  {
    severity: "high",
    label: "No input validation on form fields",
    status: "backlog",
    note: "Phone, email, URL, and hex color inputs accept any string. Bad data silently goes into the template.",
  },
  {
    severity: "medium",
    label: "Hours input is freeform text",
    status: "backlog",
    note: "Entering '12:00 - 22:00' vs '12h-22h' varies per user. No time pickers or format enforcement.",
  },
  {
    severity: "medium",
    label: "Template selector lacks real previews",
    status: "backlog",
    note: "Template cards only show a colored block + name. Users can't see what the actual layout looks like before choosing.",
  },
  {
    severity: "medium",
    label: "Menu editor is click-heavy",
    status: "backlog",
    note: "Adding items requires 2 clicks per item (+ Add item, then fill 3 fields). No bulk paste, no quick-add row.",
  },
  {
    severity: "medium",
    label: "No mobile preview in builder",
    status: "backlog",
    note: "Preview opens a full browser tab. No viewport toggle to check what the site looks like on mobile.",
  },
  {
    severity: "medium",
    label: "Export button label is unclear",
    status: "backlog",
    note: "'Export' doesn't communicate it downloads an HTML file. Should say 'Download HTML' or show a file icon.",
  },
  {
    severity: "low",
    label: "Default menu item 'Example Dish' is confusing",
    status: "backlog",
    note: "Users delete the example and end up with zero items and a blank menu section. Placeholder text would be cleaner.",
  },
  {
    severity: "low",
    label: "Dashboard cards have no last-updated date",
    status: "backlog",
    note: "With many sites, there's no way to know which was edited recently beyond the sort order.",
  },
  {
    severity: "low",
    label: "Deployed URL field is never used",
    status: "backlog",
    note: "deployedUrl exists in the schema but is never shown or set anywhere in the UI.",
  },
];

const V1_FEATURES = [
  {
    id: "v1-01",
    title: "Form validation & error toasts",
    area: "UX",
    effort: "S",
    impact: "High",
    desc: "Validate phone (E.164), email format, hex colors, and URL fields. Show inline errors + toast on save failure.",
  },
  {
    id: "v1-02",
    title: "Mobile preview toggle in builder",
    area: "UX",
    effort: "S",
    impact: "High",
    desc: "Add a phone/desktop toggle in the preview header to resize the iframe to 390px. Critical for restaurant owners checking on mobile.",
  },
  {
    id: "v1-03",
    title: "Template visual previews",
    area: "UX",
    effort: "M",
    impact: "High",
    desc: "Show a thumbnail screenshot (static image) of each template instead of a colored block. Makes template choice obvious.",
  },
  {
    id: "v1-04",
    title: "Social media links",
    area: "Feature",
    effort: "S",
    impact: "High",
    desc: "Add Instagram, Facebook, TripAdvisor, and Google Maps URL fields. Render as icon links in the footer of all templates.",
  },
  {
    id: "v1-05",
    title: "Site duplication (Clone)",
    area: "Feature",
    effort: "S",
    impact: "High",
    desc: "One-click clone a site — keeps all data, resets name to 'Copy of X'. Speeds up creating sites for restaurant chains or similar menus.",
  },
  {
    id: "v1-06",
    title: "Download HTML with better UX",
    area: "UX",
    effort: "XS",
    impact: "Medium",
    desc: "Rename 'Export' button to 'Download HTML'. Add a tooltip/info badge explaining it's a self-contained deployable file.",
  },
  {
    id: "v1-07",
    title: "Orphan draft cleanup",
    area: "Bug",
    effort: "S",
    impact: "Medium",
    desc: "Track preview-draft IDs in local state. On Cancel, offer to delete the auto-created draft. Or use a temp in-memory preview instead.",
  },
  {
    id: "v1-08",
    title: "Hours time picker",
    area: "UX",
    effort: "M",
    impact: "Medium",
    desc: "Replace freeform text with open/close time selectors (dropdowns or HTML time inputs). Output formatted string to template.",
  },
  {
    id: "v1-09",
    title: "Google Maps embed link",
    area: "Feature",
    effort: "S",
    impact: "Medium",
    desc: "Add a Google Maps embed URL field. If provided, show an interactive map iframe in the contact section of templates.",
  },
  {
    id: "v1-10",
    title: "WhatsApp CTA button",
    area: "Feature",
    effort: "XS",
    impact: "High",
    desc: "Add a WhatsApp number field. Render a floating 'Chat on WhatsApp' button on the generated site — highest-converting CTA for restaurants.",
  },
  {
    id: "v1-11",
    title: "SEO fields",
    area: "Feature",
    effort: "S",
    impact: "Medium",
    desc: "Add meta title override, meta description, and og:image URL fields. Currently the description doubles as meta desc.",
  },
  {
    id: "v1-12",
    title: "CSV/text menu import",
    area: "Feature",
    effort: "M",
    impact: "Medium",
    desc: "Paste menu text (e.g. from a photo-to-text extraction) and parse it into menu sections. Essential for agent automation pipeline.",
  },
];

const V2_FEATURES = [
  {
    id: "v2-01",
    title: "Claude agent auto-fill from Google Maps",
    area: "Agent",
    effort: "L",
    impact: "Critical",
    desc: "Given a Google Maps URL or Place ID, Claude scrapes the public listing (name, address, phone, hours, cuisine, photos) and calls POST /api/sites automatically. One URL → deployable website.",
  },
  {
    id: "v2-02",
    title: "One-click deploy to GitHub Pages",
    area: "Deploy",
    effort: "L",
    impact: "Critical",
    desc: "Connect a GitHub token. The app creates a repo named restaurant-slug, pushes the HTML as index.html, enables Pages. The restaurant gets a free yourusername.github.io/restaurant-slug URL instantly.",
  },
  {
    id: "v2-03",
    title: "One-click deploy to Vercel",
    area: "Deploy",
    effort: "L",
    impact: "Critical",
    desc: "Use Vercel Deploy API to push the static HTML. Returns a live URL in seconds. No setup needed from the restaurant owner.",
  },
  {
    id: "v2-04",
    title: "Custom subdomain system",
    area: "Deploy",
    effort: "XL",
    impact: "High",
    desc: "Host sites at restaurantname.yourplatform.com. Requires wildcard DNS + reverse proxy (Caddy/Nginx). Gives a professional URL for prospects.",
  },
  {
    id: "v2-05",
    title: "Image upload with CDN storage",
    area: "Feature",
    effort: "M",
    impact: "High",
    desc: "Upload hero images and logo directly from the form instead of requiring a URL. Store in Cloudflare R2 or S3. Auto-optimize and resize.",
  },
  {
    id: "v2-06",
    title: "Prospect pipeline dashboard",
    area: "Business",
    effort: "L",
    impact: "High",
    desc: "Track restaurants in a sales pipeline: Found → Site Created → Contacted → Demo Sent → Sold → Live. Notes, contact history, follow-up reminders.",
  },
  {
    id: "v2-07",
    title: "Batch site generation from spreadsheet",
    area: "Agent",
    effort: "M",
    impact: "High",
    desc: "Upload a CSV of restaurant names/addresses. The system calls the agent for each row and generates a site. Ideal for bulk prospecting campaigns.",
  },
  {
    id: "v2-08",
    title: "Editable demo link for sales",
    area: "Business",
    effort: "M",
    impact: "High",
    desc: "Generate a shareable demo URL pre-populated with the prospect's actual name/logo. When they open it, they see their own restaurant's site — much better conversion than a generic demo.",
  },
  {
    id: "v2-09",
    title: "Contact form on generated sites",
    area: "Feature",
    effort: "M",
    impact: "Medium",
    desc: "Add an optional contact/reservation request form to templates. Submissions sent to restaurant email via a simple email relay (Resend/Postmark).",
  },
  {
    id: "v2-10",
    title: "Photo gallery section",
    area: "Feature",
    effort: "M",
    impact: "Medium",
    desc: "Add a multi-image gallery section to templates. Restaurant owners can add up to 8 photos of the interior, dishes, and team.",
  },
  {
    id: "v2-11",
    title: "Analytics per site",
    area: "Feature",
    effort: "L",
    impact: "Medium",
    desc: "Track unique visitors, page views, and phone click-throughs per site. Embed a lightweight tracking pixel (no cookies). Show data in the dashboard.",
  },
  {
    id: "v2-12",
    title: "Multi-language template output",
    area: "Feature",
    effort: "L",
    impact: "Medium",
    desc: "Select the site language (French, Spanish, English, etc.). All template labels (Opening Hours, Find Us, etc.) are translated automatically.",
  },
];

const TECH_DEBT = [
  { title: "Replace file-based JSON store with SQLite (better-sqlite3)", effort: "M", reason: "JSON store has concurrency issues under parallel requests. SQLite is still file-based but handles concurrent reads/writes correctly." },
  { title: "Add concurrency lock to store.ts", effort: "XS", reason: "Quick short-term fix: use a mutex or queue to prevent simultaneous writes corrupting the JSON file." },
  { title: "API rate limiting", effort: "S", reason: "POST /api/sites has no rate limit. Add a simple IP-based limiter (upstash/ratelimit or in-memory) to prevent abuse." },
  { title: "Environment config file (.env.example)", effort: "XS", reason: "No env vars are documented. Add .env.example for future API keys (GitHub token, Vercel token, etc.)." },
  { title: "Error boundaries in React", effort: "S", reason: "No error boundaries in the form or dashboard. A single failed fetch crashes the whole page silently." },
  { title: "API response types (Zod validation)", effort: "M", reason: "API routes accept any JSON body. Add Zod schemas to validate input shapes server-side." },
];

// ─── Components ──────────────────────────────────────────────────────────────

const severityStyle: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border border-red-200",
  high: "bg-orange-100 text-orange-700 border border-orange-200",
  medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  low: "bg-gray-100 text-gray-600 border border-gray-200",
};

const statusStyle: Record<string, string> = {
  fixed: "bg-green-100 text-green-700 border border-green-200",
  backlog: "bg-gray-100 text-gray-500 border border-gray-200",
  "in-progress": "bg-blue-100 text-blue-700 border border-blue-200",
};

const effortStyle: Record<string, string> = {
  XS: "bg-emerald-50 text-emerald-700",
  S: "bg-teal-50 text-teal-700",
  M: "bg-sky-50 text-sky-700",
  L: "bg-violet-50 text-violet-700",
  XL: "bg-pink-50 text-pink-700",
};

const impactStyle: Record<string, string> = {
  Critical: "font-bold text-red-600",
  High: "font-semibold text-orange-600",
  Medium: "text-yellow-700",
  Low: "text-gray-500",
};

const areaColor: Record<string, string> = {
  UX: "bg-purple-100 text-purple-700",
  Feature: "bg-blue-100 text-blue-700",
  Bug: "bg-red-100 text-red-700",
  Agent: "bg-indigo-100 text-indigo-700",
  Deploy: "bg-green-100 text-green-700",
  Business: "bg-amber-100 text-amber-800",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-gray-700 text-sm transition-colors">← Dashboard</Link>
            <span className="text-gray-200">|</span>
            <h1 className="text-base font-bold text-gray-900">Roadmap & Backlog</h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200 font-medium">v0.1 — MVP</span>
            <span>→</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 font-medium">v1 — Launch ready</span>
            <span>→</span>
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 font-medium">v2 — Scale</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-14">

        {/* Vision */}
        <section>
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white">
            <p className="text-indigo-200 text-xs font-semibold tracking-widest uppercase mb-2">Product Vision</p>
            <h2 className="text-2xl font-bold mb-3">From Google Maps to Live Website in Under 60 Seconds</h2>
            <p className="text-indigo-100 leading-relaxed max-w-2xl">
              Target restaurants with no website on Google Maps. Generate a beautiful, personalized one-pager with a Claude agent,
              deploy it instantly, and use the live site as a sales demo. High volume, low effort, strong ROI.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { label: "Find target", icon: "🗺", desc: "Google Maps scrape" },
                { label: "Generate site", icon: "⚡", desc: "Claude agent fills form" },
                { label: "Deploy", icon: "🚀", desc: "GitHub Pages / Vercel" },
                { label: "Send demo", icon: "📩", desc: "Prospect sees their site" },
                { label: "Close", icon: "💰", desc: "Sell the live website" },
              ].map((step) => (
                <div key={step.label} className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                  <span className="mr-1">{step.icon}</span>
                  <strong>{step.label}</strong>
                  <span className="text-indigo-200 text-xs ml-1">— {step.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current State */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Current State — v0.1 MVP</h2>
          <p className="text-sm text-gray-500 mb-4">What is fully working today</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: "🍽", title: "Dashboard", desc: "Create, edit, preview, delete sites" },
              { icon: "📝", title: "Form Builder", desc: "Name, cuisine, contact, colors, hours, menu" },
              { icon: "🎨", title: "3 Templates", desc: "Modern Dark, Classic Warm, Minimal Clean" },
              { icon: "👁", title: "Live Preview", desc: "Full-page render before saving" },
              { icon: "📦", title: "HTML Export", desc: "Self-contained downloadable file" },
              { icon: "🤖", title: "Agent API", desc: "POST /api/sites — programmatic creation" },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-semibold text-sm text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* UX/UI Audit */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-1">UX / UI Audit</h2>
          <p className="text-sm text-gray-500 mb-4">Issues found in the current version, ordered by severity</p>
          <div className="space-y-2">
            {UX_AUDIT.map((item) => (
              <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-start">
                <div className="flex gap-2 flex-shrink-0 pt-0.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityStyle[item.severity]}`}>{item.severity}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[item.status]}`}>{item.status}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* V1 Backlog */}
        <section>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-lg font-bold text-gray-900">V1 — Launch Ready</h2>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full border border-blue-200 font-medium">{V1_FEATURES.length} items</span>
          </div>
          <p className="text-sm text-gray-500 mb-5">Everything needed before showing this to real restaurant owners or running a sales campaign</p>
          <div className="space-y-3">
            {V1_FEATURES.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono text-gray-400">{item.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${areaColor[item.area] ?? "bg-gray-100 text-gray-600"}`}>{item.area}</span>
                      <p className="font-semibold text-sm text-gray-900">{item.title}</p>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 items-start">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${effortStyle[item.effort]}`}>Effort: {item.effort}</span>
                    <span className={`text-xs ${impactStyle[item.impact]}`}>{item.impact} impact</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* V2 Features */}
        <section>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-lg font-bold text-gray-900">V2 — Scale & Automate</h2>
            <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full border border-indigo-200 font-medium">{V2_FEATURES.length} items</span>
          </div>
          <p className="text-sm text-gray-500 mb-5">Features that unlock the full business model — agents, deployment, and sales automation</p>
          <div className="space-y-3">
            {V2_FEATURES.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono text-gray-400">{item.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${areaColor[item.area] ?? "bg-gray-100 text-gray-600"}`}>{item.area}</span>
                      <p className="font-semibold text-sm text-gray-900">{item.title}</p>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 items-start">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${effortStyle[item.effort]}`}>Effort: {item.effort}</span>
                    <span className={`text-xs ${impactStyle[item.impact]}`}>{item.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Debt */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Tech Debt</h2>
          <p className="text-sm text-gray-500 mb-4">Infrastructure and code quality improvements needed before scaling</p>
          <div className="space-y-3">
            {TECH_DEBT.map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-4">
                <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 mt-0.5 ${effortStyle[item.effort]}`}>Effort: {item.effort}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Effort legend */}
        <section className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Effort Key</h3>
          <div className="flex flex-wrap gap-3 text-xs">
            {[
              { key: "XS", label: "Extra Small — half a day" },
              { key: "S", label: "Small — 1 day" },
              { key: "M", label: "Medium — 2–3 days" },
              { key: "L", label: "Large — 1 week" },
              { key: "XL", label: "Extra Large — 2+ weeks" },
            ].map((e) => (
              <span key={e.key} className={`px-2 py-1 rounded font-medium ${effortStyle[e.key]}`}>
                {e.key} = {e.label}
              </span>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
