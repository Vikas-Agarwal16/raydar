import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSiteBySlug, CATEGORIES } from "@/lib/sites";
import { getSiteStatusMap } from "@/lib/getSiteStatuses";
import SignOutButton from "@/components/SignOutButton";

const STATUS_STYLES = {
  CRITICAL: {
    label: "CRITICAL",
    badge: "bg-[#DC2626]/15 text-[#DC2626] border-[#DC2626]/30",
  },
  SOON: {
    label: "SOON",
    badge: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30",
  },
  MINOR: {
    label: "MINOR",
    badge: "bg-[#5B7FFF]/15 text-[#7FA8FF] border-[#5B7FFF]/30",
  },
  NOISE: { label: "CLEAR", badge: "bg-white/10 text-white/50 border-white/10" },
  WATCHING: {
    label: "WATCHING",
    badge: "bg-white/5 text-white/40 border-white/10",
  },
};

function isToday(date) {
  if (!date) return false;
  return new Date(date).toDateString() === new Date().toDateString();
}

function formatRelativeTime(date) {
  if (!date) return "Never";
  const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/signin");

  await dbConnect();
  const user = await User.findById(session.user.id).select(
    "enabledSites onboardingComplete name telegramChatId",
  );

  if (!user?.onboardingComplete) redirect("/onboarding");

  const sites = user.enabledSites.map(getSiteBySlug).filter(Boolean);
  const statusMap = await getSiteStatusMap(sites.map((s) => s.slug));

  const sitesWithStatus = sites.map((site) => ({
    ...site,
    status: statusMap[site.slug] || null,
  }));

  const grouped = sitesWithStatus.reduce((acc, site) => {
    acc[site.category] = acc[site.category] || [];
    acc[site.category].push(site);
    return acc;
  }, {});

  const alertsToday = sitesWithStatus.filter(
    (site) =>
      site.status &&
      (site.status.severity === "CRITICAL" ||
        site.status.severity === "SOON") &&
      isToday(site.status.lastChangedAt),
  ).length;

  const lastScanDate = sitesWithStatus
    .map((s) => s.status?.lastCheckedAt)
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0];

  return (
    <main className="min-h-screen bg-[#06080A] px-6 py-12 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8447A] flex items-center justify-center">
              <span className="text-white text-2xl font-bold">R</span>
            </div>
            <span className="font-display text-3xl font-semibold tracking-tight text-white">
              Ray<span className="text-[#E8447A]">dar</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {user.telegramChatId ? (
              <span className="px-3 py-1.5 text-xs font-mono rounded-full border border-[#5B7FFF]/30 bg-[#5B7FFF]/10 text-[#7FA8FF]">
                Telegram Connected
              </span>
            ) : (
              <a
                href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}?start=${session.user.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 text-xs font-mono rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                Connect Telegram
              </a>
            )}
            <SignOutButton />
          </div>
        </div>

        <h1 className="text-4xl font-semibold text-white tracking-tight mb-2">
          Welcome back, {user.name?.split(" ")[0]}
        </h1>
        <p className="text-white/60 text-lg">
          Monitoring{" "}
          <span className="text-white font-medium">
            {sites.length} key sources
          </span>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 mb-16">
          {[
            { label: "Sites Watching", value: sites.length },
            { label: "Categories", value: Object.keys(grouped).length },
            { label: "Alerts Today", value: alertsToday },
            { label: "Last Scan", value: formatRelativeTime(lastScanDate) },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-6"
            >
              <p className="text-4xl font-semibold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-white/50 text-sm font-mono tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {Object.entries(grouped).map(([category, categorySites]) => (
          <div key={category} className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-white/80 uppercase tracking-[3px] text-sm font-mono">
                {CATEGORIES[category]?.label || category}
              </h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categorySites.map((site) => {
                const style = site.status
                  ? STATUS_STYLES[site.status.severity] || STATUS_STYLES.NOISE
                  : STATUS_STYLES.WATCHING;

                return (
                  <div
                    key={site.slug}
                    className="group bg-white/[0.02] border border-white/10 hover:border-white/30 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-white text-xl font-medium">
                        {site.name}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-mono rounded-full border ${style.badge}`}
                      >
                        {style.label}
                      </span>
                    </div>

                    <p className="text-white/40 text-sm mt-3">
                      {site.status?.lastTitle ||
                        "Monitoring for important updates"}
                    </p>

                    <p className="text-white/25 text-xs mt-3 font-mono">
                      {site.status
                        ? `Checked ${formatRelativeTime(site.status.lastCheckedAt)}`
                        : "Scraper not live yet"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
