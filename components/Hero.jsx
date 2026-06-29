import { SITES } from "@/lib/sites";

const Icon = {
  Home: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" /></svg>,
  Grid: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  Bell: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
  Chart: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 16v-4M12 16V8M17 16v-7" /></svg>,
  Settings: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></svg>,
  Zap: (p) => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7z" /></svg>,
  Clock: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>,
  Target: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>,
  Play: (p) => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M6 4 19 12 6 20Z" /></svg>,
};

export default function Hero() {
  const totalSites = SITES.length;
  const namedSites = ["NTA", "JEE", "JoSAA", "Amazon"];
  const remaining = totalSites - namedSites.length;

  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] px-6 py-24 md:py-32 bg-[#0B0C10] min-h-[90vh] flex items-center">
      {/* Enhanced Radar Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#E8447A_0.6px,transparent_1px)] [background-size:50px_50px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#E8447A]/10 rounded-full animate-[radar-ring_12s_linear_infinite]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-[#E8447A]/15 rounded-full animate-[radar-ring_12s_linear_infinite_2s]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] border border-[#E8447A]/20 rounded-full animate-[radar-ring_12s_linear_infinite_4s]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-[sweep_4s_linear_infinite]">
          <div className="absolute top-0 left-1/2 w-[3px] h-1/2 bg-gradient-to-b from-transparent via-[#E8447A] to-transparent shadow-[0_0_25px_#E8447A]" />
        </div>
        <div className="absolute left-[38%] top-[42%] w-2 h-2 bg-[#E8447A] rounded-full animate-[blip_2.5s_ease-in-out_infinite]" />
        <div className="absolute left-[62%] top-[35%] w-2 h-2 bg-[#E8447A] rounded-full animate-[blip_3.2s_ease-in-out_infinite_0.8s]" />
        <div className="absolute left-[45%] top-[65%] w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-[blip_2.8s_ease-in-out_infinite_1.5s]" />
        <div className="absolute left-[55%] top-[58%] w-2 h-2 bg-[#E8447A] rounded-full animate-[blip_4s_ease-in-out_infinite_2.2s]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2 z-10">
        {/* Left Content */}
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {totalSites} sites. continuously watched.
          </p>

          <h1 className="font-display text-5xl md:text-[56px] leading-[1.05] tracking-tighter text-white">
            Stop refreshing.<br />
            Start <span className="bg-gradient-to-r from-violet-400 to-[#E8447A] bg-clip-text text-transparent">getting told.</span>
          </h1>

          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/60">
            Raydar watches {totalSites}+ important Indian websites 24/7 and instantly notifies you when something changes. So you never miss what matters.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#E8447A] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#E8447A]/40 hover:bg-white hover:text-black transition-all active:scale-[0.98]"
            >
              Start monitoring — free →
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2.5 text-base font-medium text-white/80 hover:text-white transition-all"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20">
                <Icon.Play className="h-3.5 w-3.5" />
              </span>
              See how it works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><Icon.Zap className="h-4 w-4 text-[#E8447A]" /> Real-time alerts</span>
            <span className="flex items-center gap-1.5"><Icon.Clock className="h-4 w-4 text-[#E8447A]" /> No manual checking</span>
            <span className="flex items-center gap-1.5"><Icon.Target className="h-4 w-4 text-[#E8447A]" /> Focus on what matters</span>
          </div>
        </div>

        {/* Live Scans device mock */}
        <div className="relative pb-8">
          <div className="relative flex overflow-hidden rounded-3xl border border-white/10 bg-[#10121F] shadow-2xl shadow-black/80">
            {/* Icon rail */}
            <div className="flex flex-col items-center gap-3 border-r border-white/[0.06] bg-black/20 px-4 py-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8447A] text-white font-display font-bold text-sm">
                R
              </div>
              <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8447A]/20 text-[#E8447A]">
                <Icon.Home className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30">
                <Icon.Grid className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30">
                <Icon.Bell className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30">
                <Icon.Chart className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30">
                <Icon.Settings className="h-4 w-4" />
              </div>
            </div>

            {/* Panel */}
            <div className="flex-1 p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-white/50">Live Scans</span>
                <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Scanning
                </span>
              </div>

              <ul className="space-y-3">
                <AlertRow tag="Exams" text="JEE Main — admit card released" time="2 min ago" severity="critical" />
                <AlertRow tag="Internships" text="Amazon — new SDE Intern listing" time="5 min ago" severity="new" />
                <AlertRow tag="Hackathons" text="Devfolio — registration opens in 3 days" time="12 min ago" severity="soon" />
                <AlertRow tag="Counselling" text="JoSAA — round 2 seat allotment out" time="18 min ago" severity="critical" />
              </ul>

              <a href="/signup" className="mt-5 flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
                View all updates →
              </a>
            </div>
          </div>

          {/* Glow platform */}
          <div className="absolute -bottom-2 left-1/2 -z-10 h-10 w-[85%] -translate-x-1/2 rounded-full bg-[#E8447A]/30 blur-2xl" />
        </div>
      </div>
    </section>
  );
}

function AlertRow({ tag, text, time, severity }) {
  const styles = {
    critical: "bg-[#E8447A]/15 text-[#F47BA0]",
    new: "bg-blue-500/15 text-blue-300",
    minor: "bg-blue-500/15 text-blue-300",
    soon: "bg-amber-500/15 text-amber-300",
  };

  return (
    <li className="flex items-start justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
      <div>
        <p className="text-white/90 text-[15px]">{text}</p>
        <p className="text-xs text-white/40 mt-1">{tag} • {time}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${styles[severity]}`}>
        {severity}
      </span>
    </li>
  );
}
