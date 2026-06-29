import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSiteBySlug, CATEGORIES } from "@/lib/sites";
import { getSiteStatusMap } from "@/lib/getSiteStatuses";
import SignOutButton from "@/components/SignOutButton";
import EnablePushButton from "@/components/EnablePushButton";
import SiteExplorer from "@/components/dashboard/SiteExplorer";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import TelegramStatus from "@/components/dashboard/TelegramStatus";
import ChannelStatusCard from "@/components/dashboard/ChannelStatusCard";
import { formatRelativeTime, isToday } from "@/lib/dashboardHelpers";

function StatusDot({ active }) {
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        active ? "bg-[#34D399]" : "bg-white/20"
      }`}
    />
  );
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/signin");

  await dbConnect();

  const user = await User.findById(session.user.id).select(
    "enabledSites onboardingComplete name telegramChatId pushSubscription lastDigestSentAt"
  );

  if (!user?.onboardingComplete) redirect("/onboarding");

  const sites = user.enabledSites.map(getSiteBySlug).filter(Boolean);
  const statusMap = await getSiteStatusMap(sites.map((s) => s.slug));

  function serializeStatus(status) {
    if (!status) return null;

    return {
      severity: status.severity,
      lastTitle: status.lastTitle,
      lastCheckedAt: status.lastCheckedAt
        ? new Date(status.lastCheckedAt).toISOString()
        : null,
      lastChangedAt: status.lastChangedAt
        ? new Date(status.lastChangedAt).toISOString()
        : null,
    };
  }

  const sitesWithStatus = sites.map((site) => ({
    ...site,
    status: serializeStatus(statusMap[site.slug]),
  }));

  const alertsToday = sitesWithStatus.filter(
    (site) =>
      site.status &&
      (site.status.severity === "CRITICAL" ||
        site.status.severity === "SOON") &&
      isToday(site.status.lastChangedAt)
  ).length;

  const lastScanDate = sitesWithStatus
    .map((s) => s.status?.lastCheckedAt)
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0];

  const categoryCount = new Set(
    sitesWithStatus.map((s) => s.category)
  ).size;

  // Single timestamp shared across the whole page
  const now = Date.now();

  const recentActivity = sitesWithStatus
    .filter((s) => s.status?.lastChangedAt)
    .sort(
      (a, b) =>
        new Date(b.status.lastChangedAt) -
        new Date(a.status.lastChangedAt)
    )
    .slice(0, 6);

  const stats = [
    { label: "Sites Watching", value: sites.length },
    { label: "Categories", value: categoryCount },
    { label: "Alerts Today", value: alertsToday },
    { label: "Last Scan", value: formatRelativeTime(lastScanDate) },
  ];

  return (
    <main className="min-h-screen bg-[#06080A] px-6 py-12 md:px-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8447A] flex items-center justify-center">
              <span className="text-white text-2xl font-bold">R</span>
            </div>

            <span className="font-display text-3xl font-semibold tracking-tight text-white">
              Ray<span className="text-[#E8447A]">dar</span>
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <TelegramStatus
              initiallyConnected={!!user.telegramChatId}
              connectUrl={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}?start=${session.user.id}`}
            />

            <EnablePushButton />

            <div className="w-px h-5 bg-white/10 mx-1" />

            <Link
              href="/settings"
              className="px-4 py-1.5 text-xs font-mono rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-colors"
            >
              Manage Categories
            </Link>

            <SignOutButton />
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white tracking-tight mb-1">
            Welcome back, {user.name?.split(" ")[0]}
          </h1>

          <p className="text-white/50 text-sm">
            Monitoring{" "}
            <span className="text-white font-medium">
              {sites.length} key sources
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-4"
            >
              <p className="text-2xl font-semibold text-white mb-0.5">
                {stat.value}
              </p>

              <p className="text-white/40 text-[11px] font-mono tracking-widest uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 lg:gap-8">
          <SiteExplorer
            sites={sitesWithStatus}
            categories={CATEGORIES}
            now={now}
          />

          <aside className="space-y-6">
            <ChannelStatusCard
              telegramConnected={!!user.telegramChatId}
              pushSubscribed={!!user.pushSubscription}
              lastDigestSentAt={user.lastDigestSentAt}
            />

            <ActivityFeed items={recentActivity} />
          </aside>
        </div>
      </div>
    </main>
  );
}