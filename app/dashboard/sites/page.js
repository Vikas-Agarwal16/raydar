import { getDashboardData } from "@/lib/getDashboardData";
import { CATEGORIES } from "@/lib/sites";
import SiteExplorer from "@/components/dashboard/SiteExplorer";

export default async function SitesPage() {
  const { sitesWithStatus, now } = await getDashboardData();

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-2xl font-semibold text-white">All Sites</h1>
        <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-[#E8447A]/15 text-[#E8447A]">
          {sitesWithStatus.length}
        </span>
      </div>
      <p className="text-white/40 text-sm mb-6">Every source currently being monitored.</p>

      <SiteExplorer sites={sitesWithStatus} categories={CATEGORIES} now={now} />
    </div>
  );
}