"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RestaurantData, TemplateId, MenuSection, OpeningHours } from "@/lib/types";
import { TEMPLATES } from "@/templates";

const DEFAULT_HOURS: OpeningHours = {
  monday: "12:00 – 22:00",
  tuesday: "12:00 – 22:00",
  wednesday: "12:00 – 22:00",
  thursday: "12:00 – 22:00",
  friday: "12:00 – 23:00",
  saturday: "12:00 – 23:00",
  sunday: "12:00 – 21:00",
};

const DAY_KEYS: (keyof OpeningHours)[] = [
  "monday","tuesday","wednesday","thursday","friday","saturday","sunday"
];

interface Props {
  initial?: RestaurantData;
}

export default function RestaurantForm({ initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(initial?.id ?? null);

  const [form, setForm] = useState({
    name: initial?.name ?? "",
    tagline: initial?.tagline ?? "",
    cuisine: initial?.cuisine ?? "",
    description: initial?.description ?? "",
    phone: initial?.phone ?? "",
    whatsapp: initial?.whatsapp ?? "",
    email: initial?.email ?? "",
    address: initial?.address ?? "",
    city: initial?.city ?? "",
    instagram: initial?.instagram ?? "",
    facebook: initial?.facebook ?? "",
    primaryColor: initial?.primaryColor ?? "#1a1a2e",
    accentColor: initial?.accentColor ?? "#d4a853",
    templateId: initial?.templateId ?? ("modern" as TemplateId),
    logoText: initial?.logoText ?? "",
    heroImage: initial?.heroImage ?? "",
  });

  const [hours, setHours] = useState<OpeningHours>(initial?.hours ?? DEFAULT_HOURS);
  const [menu, setMenu] = useState<MenuSection[]>(
    initial?.menu ?? [
      {
        name: "Starters",
        items: [
          { name: "Example Dish", description: "A delicious starter", price: "$12" },
        ],
      },
    ]
  );

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const addMenuSection = () =>
    setMenu((m) => [...m, { name: "New Section", items: [] }]);

  const addMenuItem = (sIdx: number) =>
    setMenu((m) =>
      m.map((s, i) =>
        i === sIdx ? { ...s, items: [...s.items, { name: "", description: "", price: "" }] } : s
      )
    );

  const updateSection = (sIdx: number, name: string) =>
    setMenu((m) => m.map((s, i) => (i === sIdx ? { ...s, name } : s)));

  const updateItem = (sIdx: number, iIdx: number, key: string, val: string) =>
    setMenu((m) =>
      m.map((s, i) =>
        i === sIdx
          ? { ...s, items: s.items.map((item, j) => (j === iIdx ? { ...item, [key]: val } : item)) }
          : s
      )
    );

  const removeItem = (sIdx: number, iIdx: number) =>
    setMenu((m) =>
      m.map((s, i) => (i === sIdx ? { ...s, items: s.items.filter((_, j) => j !== iIdx) } : s))
    );

  const removeSection = (sIdx: number) => setMenu((m) => m.filter((_, i) => i !== sIdx));

  const handleSave = async () => {
    setSaving(true);
    const body = { ...form, hours, menu };
    let res;
    if (initial) {
      res = await fetch(`/api/sites/${initial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    const data = await res.json();
    setSaving(false);
    setPreviewId(data.id);
    router.push("/");
  };

  const handlePreview = async () => {
    setSaving(true);
    const body = { ...form, hours, menu };
    let id = previewId;
    if (!id) {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      id = data.id;
      setPreviewId(id);
    } else {
      await fetch(`/api/sites/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    setSaving(false);
    window.open(`/preview/${id}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {initial ? `Editing: ${initial.name}` : "New Restaurant Site"}
            </h1>
            <p className="text-sm text-gray-500">Fill in the details below</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePreview}
              disabled={saving || !form.name}
              className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-40"
            >
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.name || !form.cuisine}
              className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-40"
            >
              {saving ? "Saving…" : initial ? "Save Changes" : "Create Site"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* Template */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Choose Template</h2>
          <div className="grid grid-cols-3 gap-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => set("templateId", t.id)}
                className={`border-2 rounded-lg p-3 text-left transition-all ${
                  form.templateId === t.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className="h-12 rounded mb-2 flex items-center justify-center text-xs font-bold tracking-widest"
                  style={{ background: t.accent, color: "#fff" }}
                >
                  {t.name.split(" ")[0].toUpperCase()}
                </div>
                <p className="text-xs font-semibold text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Basic Info */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Restaurant Name *</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Le Petit Bistro"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Cuisine Type *</label>
              <input
                value={form.cuisine}
                onChange={(e) => set("cuisine", e.target.value)}
                placeholder="French, Italian, Sushi…"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Tagline</label>
            <input
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              placeholder="A short memorable line…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the restaurant, atmosphere, story…"
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            />
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Contact & Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+1 555 000 0000"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">
                WhatsApp
                <span className="ml-1.5 text-green-600 font-normal">— floating CTA on site</span>
              </label>
              <input
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                placeholder="+1 555 000 0000"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Email</label>
              <input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="hello@restaurant.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Street Address</label>
              <input
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="123 Main Street"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">City</label>
              <input
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="New York"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Instagram</label>
              <div className="flex items-center gap-1">
                <span className="text-gray-400 text-sm">@</span>
                <input
                  value={form.instagram}
                  onChange={(e) => set("instagram", e.target.value)}
                  placeholder="yourrestaurant"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Facebook</label>
              <input
                value={form.facebook}
                onChange={(e) => set("facebook", e.target.value)}
                placeholder="facebook.com/yourrestaurant"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
        </section>

        {/* Style */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Style</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.primaryColor}
                  onChange={(e) => set("primaryColor", e.target.value)}
                  className="w-10 h-10 rounded border border-gray-200 cursor-pointer"
                />
                <input
                  value={form.primaryColor}
                  onChange={(e) => set("primaryColor", e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.accentColor}
                  onChange={(e) => set("accentColor", e.target.value)}
                  className="w-10 h-10 rounded border border-gray-200 cursor-pointer"
                />
                <input
                  value={form.accentColor}
                  onChange={(e) => set("accentColor", e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Hero Image URL (optional)</label>
            <input
              value={form.heroImage}
              onChange={(e) => set("heroImage", e.target.value)}
              placeholder="https://…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </section>

        {/* Hours */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <h2 className="font-semibold text-gray-800">Opening Hours</h2>
          {DAY_KEYS.map((day) => (
            <div key={day} className="flex items-center gap-3">
              <span className="w-24 text-xs text-gray-600 capitalize">{day}</span>
              <input
                value={hours[day] ?? ""}
                onChange={(e) => setHours((h) => ({ ...h, [day]: e.target.value }))}
                placeholder="Closed"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          ))}
        </section>

        {/* Menu */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Menu</h2>
            <button
              onClick={addMenuSection}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              + Add Section
            </button>
          </div>
          {menu.map((section, sIdx) => (
            <div key={sIdx} className="border border-gray-100 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  value={section.name}
                  onChange={(e) => updateSection(sIdx, e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                  onClick={() => removeSection(sIdx)}
                  className="text-gray-300 hover:text-red-400 text-sm"
                >
                  ✕
                </button>
              </div>
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    value={item.name}
                    onChange={(e) => updateItem(sIdx, iIdx, "name", e.target.value)}
                    placeholder="Dish name"
                    className="col-span-4 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    value={item.description ?? ""}
                    onChange={(e) => updateItem(sIdx, iIdx, "description", e.target.value)}
                    placeholder="Description"
                    className="col-span-5 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    value={item.price ?? ""}
                    onChange={(e) => updateItem(sIdx, iIdx, "price", e.target.value)}
                    placeholder="$00"
                    className="col-span-2 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <button
                    onClick={() => removeItem(sIdx, iIdx)}
                    className="col-span-1 text-gray-300 hover:text-red-400 text-xs text-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => addMenuItem(sIdx)}
                className="text-xs text-indigo-500 hover:text-indigo-700"
              >
                + Add item
              </button>
            </div>
          ))}
        </section>

        {/* Bottom actions */}
        <div className="flex justify-end gap-3 pb-8">
          <button
            onClick={handlePreview}
            disabled={saving || !form.name}
            className="bg-gray-100 text-gray-700 text-sm px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-40"
          >
            Preview in Browser
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.name || !form.cuisine}
            className="bg-indigo-600 text-white text-sm px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-40"
          >
            {saving ? "Saving…" : initial ? "Save Changes" : "Create Site"}
          </button>
        </div>
      </main>
    </div>
  );
}
