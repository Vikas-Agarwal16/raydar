import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSiteBySlug, CATEGORIES } from "@/lib/sites";
import SignOutButton from "@/components/SignOutButton";

const STATUS_STYLES = {
  WATCHING: "text-white/50 bg-white/5 border-white/10",
  CRITICAL: "text-white bg-[#DC2626] border-transparent",
  MINOR: "text-white bg-[#5B7FFF] border-transparent",
  SOON: "text-black bg-[#F59E0B] border-transparent",
};

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
    <main
      className="min-h-screen bg-[#06080A] px-6 py-12 md:px-12"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
   {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8447A] flex items-center justify-center">
              <span className="text-white text-xl font-bold">R</span>
            </div>
            <span className="font-display text-xl font-semibold tracking-tight text-white">
              Ray<span className="text-[#E8447A]">dar</span>
            </span>
          </div>
          <SignOutButton />
        </div>

        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">
          Welcome back, {user.name}
        </h1>
        <p className="text-white/50 text-sm mb-10">
          Watching{" "}
          <span className="text-white/80 font-medium">{sites.length} sites</span>{" "}
          across{" "}
          <span className="text-white/80 font-medium">
            {Object.keys(grouped).length} categories
          </span>
          .
        </p>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden mb-12">
          {[
            { label: "SITES WATCHED", value: sites.length },
            { label: "CATEGORIES", value: Object.keys(grouped).length },
            { label: "ALERTS TODAY", value: 0 },
            { label: "LAST SCAN", value: "—" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0B0C10] px-5 py-5">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-white/40 text-[11px] font-mono tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Category sections */}
        {Object.entries(grouped).map(([category, categorySites]) => (
          <div key={category} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-white/60 text-xs font-mono tracking-widest uppercase">
                {CATEGORIES[category]?.label || category}
              </h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categorySites.map((site) => (
                <div
                  key={site.slug}
                  className="group border border-white/10 rounded-2xl px-5 py-4 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-white font-medium">{site.name}</p>
                    <span
                      className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-full border whitespace-nowrap ${STATUS_STYLES.WATCHING}`}
                    >
                      Watching
                    </span>
                  </div>
                  <p className="text-white/35 text-xs mt-2">
                    Not scanned yet — live monitoring starts once scanning goes live.
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {sites.length === 0 && (
          <p className="text-white/40">No sites enabled yet.</p>
        )}
      </div>
    </main>
  );
}