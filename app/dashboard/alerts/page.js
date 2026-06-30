import { getDashboardData } from "@/lib/getDashboardData";
import { CATEGORIES } from "@/lib/sites";
import SiteExplorer from "@/components/dashboard/SiteExplorer";

export default async function AlertsPage() {
  const { sitesWithStatus, now } = await getDashboardData();

  const alertSites = sitesWithStatus.filter(
    (s) => s.status?.severity === "CRITICAL" || s.status?.severity === "SOON"
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-1">Alerts</h1>
      <p className="text-white/40 text-sm mb-6">Sites needing your attention right now.</p>

      {alertSites.length === 0 ? (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-white/40 text-sm">No active alerts. You&apos;re all caught up!</p>
        </div>
      ) : (
        <SiteExplorer sites={alertSites} categories={CATEGORIES} now={now} />
      )}
    </div>
  );
}