"use client";

import { useState } from "react";
import { GraduationCap, Briefcase, Trophy, Landmark, Globe, ShieldCheck, Zap, ChevronDown } from "lucide-react";
import { CATEGORIES, getSitesByCategory, SITES } from "@/lib/sites";

const SECTOR_META = {
  exams: { icon: GraduationCap, desc: "Entrance exams and government job updates — all in one place." },
  internships: { icon: Briefcase, desc: "Top companies and platforms posting internships." },
  hackathons: { icon: Trophy, desc: "Track hackathons and registrations as they go live." },
  counselling: { icon: Landmark, desc: "Counselling schedules and deadlines across platforms." },
};

const TRUST = [
  { icon: Globe, title: "20+ trusted sources", desc: "Carefully curated and monitored 24/7." },
  { icon: ShieldCheck, title: "100% focused on opportunities", desc: "We monitor only what truly matters." },
  { icon: Zap, title: "Real-time updates", desc: "Get notified the moment it goes live." },
];

const CHIP_LIMIT = 4;

function initialsOf(name = "") {
  return name.slice(0, 2).toUpperCase();
}

const SECTORS = Object.entries(CATEGORIES).map(([key, cat]) => {
  const sites = getSitesByCategory(key);
  return {
    key,
    label: cat.label,
    sites,
    ...SECTOR_META[key],
  };
});

export default function Sectors() {
  const [expanded, setExpanded] = useState({});

  const toggle = (key) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section id="sectors" className="border-b border-white/[0.08] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8447A]/25 bg-[#E8447A]/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-[#E8447A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8447A]" />
            COVERAGE
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-6 text-center font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Widest coverage.
          <br />
          More <span className="text-[#E8447A]">opportunities.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-white/55">
          Raydar monitors {SITES.length}+ trusted platforms across India so you never miss an important update.
        </p>

        {/* Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((sector) => {
            const SectorIcon = sector.icon;
            const isExpanded = !!expanded[sector.key];
            const visibleSites = isExpanded ? sector.sites : sector.sites.slice(0, CHIP_LIMIT);
            const overflowCount = sector.sites.length - CHIP_LIMIT;

            return (
              <div
                key={sector.key}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8447A]/10 border border-[#E8447A]/25">
                  <SectorIcon size={20} className="text-[#E8447A]" strokeWidth={1.75} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">{sector.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{sector.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.08] pt-5">
                  {visibleSites.map((site) => (
                    <span
                      key={site.slug}
                      title={site.name}
                      className={`flex items-center rounded-full border-2 border-[#0B0C10] bg-white/10 text-[10px] font-semibold text-white/80 ${
                        isExpanded ? "px-3 py-1.5 w-fit" : "h-8 w-8 justify-center -ml-2 first:ml-0"
                      }`}
                    >
                      {isExpanded ? site.name : initialsOf(site.name)}
                    </span>
                  ))}
                </div>

                {overflowCount > 0 && (
                  <button
                    type="button"
                    onClick={() => toggle(sector.key)}
                    className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-[#E8447A] hover:text-white transition-colors"
                  >
                    {isExpanded ? "Show less" : `+ ${overflowCount} more`}
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Trust bar */}
        <div className="mt-5 grid grid-cols-1 gap-6 rounded-2xl border border-[#E8447A]/25 bg-white/[0.02] px-8 py-7 sm:grid-cols-3 sm:divide-x sm:divide-white/[0.08]">
          {TRUST.map((item, i) => {
            const TrustIcon = item.icon;
            return (
              <div key={i} className={`flex items-center gap-3 ${i > 0 ? "sm:pl-6" : ""}`}>
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#E8447A]/10 border border-[#E8447A]/25">
                  <TrustIcon size={18} className="text-[#E8447A]" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-white/45">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}