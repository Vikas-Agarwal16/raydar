import { getDashboardData } from "@/lib/getDashboardData";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

export default async function ActivityPage() {
  const { sitesWithStatus } = await getDashboardData();

  const allActivity = sitesWithStatus
    .filter((s) => s.status?.lastChangedAt)
    .sort((a, b) => new Date(b.status.lastChangedAt) - new Date(a.status.lastChangedAt));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-white mb-1">Activity</h1>
      <p className="text-white/40 text-sm mb-6">Full history of detected changes.</p>

      <ActivityFeed items={allActivity} />
    </div>
  );
}