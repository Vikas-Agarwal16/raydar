import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSiteBySlug, CATEGORIES } from "@/lib/sites";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/signin");

  await dbConnect();
  const user = await User.findById(session.user.id).select(
    "enabledSites onboardingComplete name"
  );

  if (!user?.onboardingComplete) redirect("/onboarding");

  const sites = user.enabledSites.map(getSiteBySlug).filter(Boolean);
  const grouped = sites.reduce((acc, site) => {
    acc[site.category] = acc[site.category] || [];
    acc[site.category].push(site);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#06080A] px-6 py-12 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8447A] flex items-center justify-center">
              <span className="text-white text-2xl font-bold">R</span>
            </div>
            <span className="font-display text-3xl font-semibold tracking-tight text-white">
              Ray<span className="text-[#E8447A]">dar</span>
            </span>
          </div>
          <SignOutButton />
        </div>

        <h1 className="text-4xl font-semibold text-white tracking-tight mb-2">
          Welcome back, {user.name?.split(" ")[0]}
        </h1>
        <p className="text-white/60 text-lg">
          Monitoring <span className="text-white font-medium">{sites.length} key sources</span>
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 mb-16">
          {[
            { label: "Sites Watching", value: sites.length },
            { label: "Categories", value: Object.keys(grouped).length },
            { label: "Alerts Today", value: "0" },
            { label: "Last Scan", value: "Just now" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
              <p className="text-4xl font-semibold text-white mb-1">{stat.value}</p>
              <p className="text-white/50 text-sm font-mono tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Sites */}
        {Object.entries(grouped).map(([category, categorySites]) => (
          <div key={category} className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-white/80 uppercase tracking-[3px] text-sm font-mono">
                {CATEGORIES[category]?.label || category}
              </h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categorySites.map((site) => (
                <div
                  key={site.slug}
                  className="group bg-white/[0.02] border border-white/10 hover:border-white/30 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-white text-xl font-medium">{site.name}</h3>
                    <span className="px-3 py-1 text-xs font-mono bg-white/10 text-white/70 rounded-full">LIVE</span>
                  </div>
                  <p className="text-white/40 text-sm mt-3">Monitoring for important updates</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}