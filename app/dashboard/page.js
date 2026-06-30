import { getDashboardData } from "@/lib/getDashboardData";
import { CATEGORIES } from "@/lib/sites";
import EnablePushButton from "@/components/EnablePushButton";
import SiteExplorer from "@/components/dashboard/SiteExplorer";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import TelegramStatus from "@/components/dashboard/TelegramStatus";
import ChannelStatusCard from "@/components/dashboard/ChannelStatusCard";
import ScanningChart from "@/components/dashboard/ScanningChart";
import { formatRelativeTime, isToday } from "@/lib/dashboardHelpers";
import { Eye, LayoutGrid, BellRing, Clock3, Radar } from "lucide-react";

const STAT_ICONS = [Eye, LayoutGrid, BellRing, Clock3];
const STAT_TONES = [
  "bg-[#E8447A]/15 text-[#E8447A]",
  "bg-[#8B5CF6]/15 text-[#8B5CF6]",
  "bg-[#F59E0B]/15 text-[#F59E0B]",
  "bg-[#34D399]/15 text-[#34D399]",
];

export default async function DashboardPage() {
  const { session, user, sitesWithStatus, now } = await getDashboardData();

  const alertsToday = sitesWithStatus.filter(
    (site) =>
      site.status &&
      (site.status.severity === "CRITICAL" || site.status.severity === "SOON") &&
      isToday(site.status.lastChangedAt)
  ).length;

  const lastScanDate = sitesWithStatus
    .map((s) => s.status?.lastCheckedAt)
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0];

  const categoryCount = new Set(sitesWithStatus.map((s) => s.category)).size;

  const recentActivity = sitesWithStatus
    .filter((s) => s.status?.lastChangedAt)
    .sort((a, b) => new Date(b.status.lastChangedAt) - new Date(a.status.lastChangedAt))
    .slice(0, 6);

  const stats = [
    { label: "Sites Watching", sublabel: "Actively monitored", value: sitesWithStatus.length },
    { label: "Categories", sublabel: "Custom categories", value: categoryCount },
    { label: "Alerts Today", sublabel: "You're all caught up!", value: alertsToday },
    {
      label: "Last Scan",
      sublabel: lastScanDate
        ? new Date(lastScanDate).toLocaleString("en-IN", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })
        : "Not yet",
      value: formatRelativeTime(lastScanDate, now),
    },
  ];

  return (
    <>
      {/* top bar: channel pills only, manage categories moved to /settings */}
      <div className="flex items-center justify-end gap-2 mb-8">
        <TelegramStatus
          initiallyConnected={!!user.telegramChatId}
          connectUrl={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}?start=${session.user.id}`}
        />
        <EnablePushButton />
      </div>

      {/* greeting + hero glow illustration */}
      <div className="relative mb-8">
        <div className="absolute -top-10 right-0 w-72 h-44 pointer-events-none opacity-80 hidden sm:block">
          <div className="absolute top-2 right-8 w-32 h-32 rounded-full bg-[#E8447A]/15 blur-3xl" />
          <svg viewBox="0 0 280 176" className="absolute inset-0 w-full h-full" fill="none">
            <circle cx="220" cy="60" r="14" fill="none" stroke="#E8447A" strokeOpacity="0.5" strokeWidth="1.5" />
            <circle cx="220" cy="60" r="32" fill="none" stroke="#E8447A" strokeOpacity="0.3" strokeWidth="1.5" />
            <circle cx="220" cy="60" r="50" fill="none" stroke="#E8447A" strokeOpacity="0.15" strokeWidth="1.5" />
            <circle cx="220" cy="60" r="3" fill="#E8447A" />
            <path d="M40 150 L90 110 L140 130 L190 90 L260 130" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
          </svg>
        </div>

        <h1 className="relative text-3xl font-semibold text-white tracking-tight mb-1">
          Welcome back, {user.name?.split(" ")[0]} 👋
        </h1>
        <p className="relative text-white/50 text-sm">
          Here&apos;s what&apos;s happening with your monitored sources.
        </p>
      </div>

      {/* stat cards row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative">
        {stats.map((stat, i) => {
          const Icon = STAT_ICONS[i];
          return (
            <div
              key={i}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex items-center gap-3"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${STAT_TONES[i]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-semibold text-white leading-tight">{stat.value}</p>
                <p className="text-white/70 text-xs font-medium">{stat.label}</p>
                <p className="text-white/30 text-[11px] truncate">{stat.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* main grid: site explorer + sidebar cards */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-white text-lg font-semibold">Monitored Sites</h2>
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-[#E8447A]/15 text-[#E8447A]">
              {sitesWithStatus.length}
            </span>
          </div>

          <SiteExplorer sites={sitesWithStatus} categories={CATEGORIES} now={now} />
        </div>

        <aside className="space-y-6">
          <ChannelStatusCard
            telegramConnected={!!user.telegramChatId}
            pushSubscribed={!!user.pushSubscription}
            lastDigestSentAt={user.lastDigestSentAt}
          />
          <ActivityFeed items={recentActivity} />
        </aside>
      </div>

      {/* bottom banner */}
      <div className="mt-10 relative overflow-hidden rounded-3xl border border-[#E8447A]/20 bg-gradient-to-br from-[#E8447A]/10 to-transparent p-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E8447A]/15 flex items-center justify-center shrink-0">
            <Radar className="w-6 h-6 text-[#E8447A]" />
          </div>
          <div>
            <p className="text-white font-semibold mb-0.5">We&apos;re always watching for you</p>
            <p className="text-white/40 text-sm">
              Raydar scans your selected sources regularly and notifies you the moment something changes.
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <ScanningChart />
        </div>
      </div>
    </>
  );
}