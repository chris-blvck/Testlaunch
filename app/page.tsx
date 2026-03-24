"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RestaurantData } from "@/lib/types";

export default function Dashboard() {
  const [sites, setSites] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSites = async () => {
    const res = await fetch("/api/sites");
    setSites(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchSites(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    await fetch(`/api/sites/${id}`, { method: "DELETE" });
    setSites((s) => s.filter((r) => r.id !== id));
  };

  const templateBadge: Record<string, string> = {
    modern: "bg-gray-800 text-gray-200",
    classic: "bg-amber-100 text-amber-800",
    minimal: "bg-green-100 text-green-800",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">🍽 Restaurant Builder</h1>
            <p className="text-sm text-gray-500">Deploy beautiful sites in seconds</p>
          </div>
          <Link
            href="/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            + New Site
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-indigo-600 rounded-full mr-3" />
            Loading...
          </div>
        ) : sites.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No sites yet</h2>
            <p className="text-gray-500 mb-6">Create your first restaurant website in under 60 seconds.</p>
            <Link
              href="/new"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Create First Site
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">{sites.length} site{sites.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sites.map((site) => (
                <div key={site.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Preview strip */}
                  <div
                    className="h-24 flex items-center justify-center text-3xl font-serif tracking-wide"
                    style={{ background: site.primaryColor, color: site.accentColor }}
                  >
                    {site.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 truncate">{site.name}</h3>
                        <p className="text-sm text-gray-500">{site.cuisine}{site.city ? ` · ${site.city}` : ""}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${templateBadge[site.templateId] ?? "bg-gray-100 text-gray-600"}`}>
                        {site.templateId}
                      </span>
                    </div>
                    {site.description && (
                      <p className="text-xs text-gray-400 line-clamp-2 mb-3">{site.description}</p>
                    )}
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <Link
                        href={`/preview/${site.id}`}
                        target="_blank"
                        className="flex-1 text-center text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded font-medium transition-colors"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/edit/${site.id}`}
                        className="flex-1 text-center text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-1.5 rounded font-medium transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => window.open(`/api/export/${site.id}`, "_blank")}
                        className="flex-1 text-xs bg-green-50 hover:bg-green-100 text-green-700 py-1.5 rounded font-medium transition-colors"
                      >
                        Export
                      </button>
                      <button
                        onClick={() => handleDelete(site.id, site.name)}
                        className="text-xs text-gray-400 hover:text-red-500 px-2 py-1.5 rounded transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* API hint */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="bg-gray-800 text-gray-300 rounded-xl p-4 text-sm font-mono">
          <p className="text-gray-500 text-xs mb-2 font-sans font-normal">Agent API — create a site programmatically:</p>
          <p><span className="text-green-400">POST</span> /api/sites</p>
          <p className="text-gray-500 mt-1">{"{ name, cuisine, description, phone, address, city, templateId }"}</p>
          <p className="mt-1"><span className="text-blue-400">GET</span> /api/preview/:id — render HTML</p>
          <p className="mt-1"><span className="text-yellow-400">GET</span> /api/export/:id — download HTML</p>
        </div>
      </div>
    </div>
  );
}
