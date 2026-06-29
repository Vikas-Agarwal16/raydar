"use client";

import { useState, useMemo } from "react";
import { STATUS_STYLES, formatRelativeTime } from "@/lib/dashboardHelpers";

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-white/30 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M6 9l6 6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SiteCard({ site, now }) {
  const [open, setOpen] = useState(false);

  const style = site.status
    ? STATUS_STYLES[site.status.severity] || STATUS_STYLES.NOISE
    : STATUS_STYLES.WATCHING;

  return (
    <div className="bg-white/[0.02] border border-white/10 hover:border-white/30 rounded-2xl transition-all duration-300 overflow-hidden mb-3 break-inside-avoid">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3"
      >
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-white text-sm font-medium truncate min-w-0">{site.name}</h3>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`px-2 py-0.5 text-[10px] font-mono rounded-full border ${style.badge}`}
            >
              {style.label}
            </span>
    
            <ChevronIcon open={open} />
          </div>
        </div>

        <p className="text-white/35 text-xs mt-1.5 truncate">
          {site.status?.lastTitle || "Monitoring for important updates"}
        </p>

        <p className="text-white/20 text-[10px] mt-1 font-mono">
          {site.status
            ? `Checked ${formatRelativeTime(site.status.lastCheckedAt, now)}`
            : "Scraper not live yet"}
        </p>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-white/5">
        <p className="text-white/60 text-xs leading-relaxed mb-3 break-words">
  {site.status?.lastTitle || "No update detected yet."}
</p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-0.5">
                Last Checked
              </p>

              <p className="text-white/50 text-xs">
                {formatRelativeTime(site.status?.lastCheckedAt, now)}
              </p>
            </div>

            <div>
              <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-0.5">
                Last Changed
              </p>

              <p className="text-white/50 text-xs">
                {formatRelativeTime(site.status?.lastChangedAt, now)}
              </p>
            </div>
          </div>

          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7FA8FF] hover:text-[#9DBCFF]"
          >
            Visit source ↗
          </a>
        </div>
      )}
    </div>
  );
}

export default function SiteExplorer({ sites, categories, now }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return sites;

    const q = query.toLowerCase();

    return sites.filter((s) => s.name.toLowerCase().includes(q));
  }, [sites, query]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, site) => {
      acc[site.category] = acc[site.category] || [];
      acc[site.category].push(site);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search sites..."
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 mb-8"
      />

      {Object.keys(grouped).length === 0 && (
        <p className="text-white/30 text-sm">
          No sites match "{query}".
        </p>
      )}

      {Object.entries(grouped).map(([category, categorySites]) => (
        <div key={category} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-white/80 uppercase tracking-[3px] text-sm font-mono">
              {categories[category]?.label || category}
            </h2>

            <div className="h-px bg-white/10 flex-1" />
          </div>

         <div className="columns-1 xl:columns-2 gap-3">
            {categorySites.map((site) => (
              <SiteCard
                key={site.slug}
                site={site}
                now={now}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}