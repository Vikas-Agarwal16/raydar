import { CATEGORIES, getSitesByCategory, SITES } from "@/lib/sites";

const SECTOR_META = {
  exams: { color: "#E8447A", desc: "Major entrance exams & board level notifications" },
  internships: { color: "#3B82F6", desc: "Internship listings from companies & platforms" },
  hackathons: { color: "#8B5CF6", desc: "Coding competitions & innovation challenges" },
  counselling: { color: "#10B981", desc: "Seat allotment & counselling updates" },
};

const SECTORS = Object.entries(CATEGORIES).map(([key, cat]) => {
  const sites = getSitesByCategory(key);
  return {
    key,
    label: cat.label,
    count: sites.length,
    ...SECTOR_META[key],
  };
});

export default function Sectors() {
  return (
    <section id="sectors" className="border-b border-white/[0.08] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-[13px] font-medium uppercase tracking-[2px] text-[#E8447A]">COVERAGE</p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl tracking-tighter leading-tight text-white">
            {SITES.length} sites, sorted into 4 things you actually care about.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((sector) => (
            <a
              key={sector.key}
              href={`#sectors`}
              className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-white/20 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${sector.color}1F`, color: sector.color }}
                >
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: sector.color }} />
                </div>
                <span className="text-sm font-medium text-white/50">{sector.count} sites</span>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">{sector.label}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed flex-1">{sector.desc}</p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm text-white/40 group-hover:text-white transition-colors">
                Learn more →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
