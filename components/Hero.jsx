"use client";

import { SITES } from "@/lib/sites";
import {
  Home,
  LayoutGrid,
  Bell,
  BarChart3,
  Settings,
  Zap,
  Clock,
  Target,
  Play,
  Monitor,
  ArrowRight,
  Lock,
  Briefcase,
  Rocket,
  AlertTriangle,
} from "lucide-react";

const SEVERITY_STYLES = {
  critical: { bg: "bg-[#DC2626]/15", text: "text-[#DC2626]", label: "CRITICAL" },
  new: { bg: "bg-[#5B7FFF]/15", text: "text-[#5B7FFF]", label: "NEW" },
  soon: { bg: "bg-[#F59E0B]/15", text: "text-[#F59E0B]", label: "SOON" },
};

const SCAN_ROWS = [
  { icon: Lock, tag: "Exams", text: "JEE Main — admit card released", time: "2 min ago", severity: "critical" },
  { icon: Briefcase, tag: "Internships", text: "Microsoft Careers — new role: SDE Intern", time: "5 min ago", severity: "new" },
  { icon: Rocket, tag: "Hackathons", text: "Devfolio — registration opens in 3 days", time: "12 min ago", severity: "soon" },
  { icon: AlertTriangle, tag: "Counselling", text: "JoSAA — round 2 seat allotment out", time: "18 min ago", severity: "critical" },
];

export default function Hero() {
  const totalSites = SITES.length;

  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] px-4 sm:px-6 py-16 sm:py-24 md:py-32 bg-[#06080A] min-h-[90vh] flex items-center">
      {/* calm decorative bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[8%] top-[10%] w-[420px] h-[420px] rounded-full border border-dashed border-[#E8447A]/15" />
        <div className="absolute right-[18%] top-[6%] w-2 h-2 rounded-full bg-[#E8447A]" />
        <div className="absolute right-[2%] top-[34%] w-1.5 h-1.5 rounded-full bg-[#E8447A]/70" />
        <div className="absolute right-[12%] top-[16%] w-[260px] h-[260px] rounded-full bg-[#E8447A]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 sm:gap-16 md:grid-cols-2 z-10">
        {/* Left Content */}
        <div>
          <p className="mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-widest text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            {totalSites} sites. continuously watched.
          </p>

          <h1 className="font-display text-[40px] leading-[1.08] sm:text-5xl md:text-[56px] sm:leading-[1.05] tracking-tighter text-white">
            Stop refreshing.<br />
            Start <span className="bg-gradient-to-r from-violet-400 to-[#E8447A] bg-clip-text text-transparent">getting told.</span>
          </h1>

          <p className="mt-5 sm:mt-6 max-w-lg text-[15px] sm:text-[17px] leading-relaxed text-white/60">
            Raydar watches {totalSites}+ important Indian websites 24/7 and instantly notifies you when something changes. So you never miss what matters.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#E8447A] px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-xl shadow-[#E8447A]/40 hover:bg-white hover:text-black transition-all active:scale-[0.98]"
            >
              Start monitoring — free <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-white/80 hover:text-white transition-all"
            >
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/20 shrink-0">
                <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="currentColor" />
              </span>
              See how it works
            </a>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-x-5 sm:gap-x-6 gap-y-2.5 sm:gap-y-3 text-[13px] sm:text-sm text-white/50">
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-[#E8447A] shrink-0" /> Real-time alerts</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#E8447A] shrink-0" /> No manual checking</span>
            <span className="flex items-center gap-1.5"><Target className="h-4 w-4 text-[#E8447A] shrink-0" /> Focus on what matters</span>
          </div>
        </div>

        {/* Dashboard device mock */}
        <div className="relative pb-10 sm:pb-12">
          <div className="relative flex overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#10121F] shadow-2xl shadow-black/80">
            {/* Icon rail — hidden on phones, decorative chrome not worth the space below sm */}
            <div className="hidden sm:flex flex-col items-center gap-3 border-r border-white/[0.06] bg-black/20 px-3 sm:px-4 py-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8447A] text-white font-display font-bold text-sm">
                R
              </div>
              <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8447A]/20 text-[#E8447A]">
                <Home className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30">
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30">
                <BarChart3 className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30">
                <Settings className="h-4 w-4" />
              </div>
            </div>

            {/* Panel */}
            <div className="flex-1 min-w-0 p-4 sm:p-6">
              <div className="mb-4 sm:mb-5 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-white font-semibold text-base sm:text-lg truncate">Dashboard</h3>
                  <p className="text-[11px] sm:text-xs text-white/40 truncate">Stay ahead with real-time updates</p>
                </div>
                <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] sm:text-xs shrink-0">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="hidden xs:inline sm:inline">Active</span>
                </span>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
                <StatCard icon={Monitor} value={`${totalSites}+`} label="Sites" color="text-violet-300" />
                <StatCard icon={LayoutGrid} value="4" label="Categories" color="text-[#E8447A]" />
                <StatCard icon={Clock} value="20m" label="Interval" color="text-blue-300" />
              </div>

              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-white/50">Latest Updates</span>
                <a href="/signup" className="text-[11px] sm:text-xs text-white/40 hover:text-white transition-colors">View all</a>
              </div>

              <ul className="space-y-2 sm:space-y-3">
                {SCAN_ROWS.map((row) => (
                  <AlertRow key={row.text} {...row} />
                ))}
              </ul>
            </div>
          </div>

          {/* Floating notification card — desktop/tablet only */}
          <div className="absolute -right-6 -bottom-2 w-64 rounded-2xl border border-white/10 bg-[#10121F] p-4 shadow-2xl shadow-black/80 hidden md:block">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8447A]/20 text-[#E8447A] shrink-0">
                <Bell className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium text-white">Raydar Alert</span>
              <span className="ml-auto text-[10px] text-white/30 shrink-0">now</span>
            </div>
            <p className="text-sm text-white/70 leading-snug">
              New update on <span className="text-white font-medium">Devfolio Hackathon</span> — registration opens in 3 days.
            </p>
            <a href="/signup" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#E8447A] hover:text-white transition-colors">
              View Details <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* tilted glow platform */}
          <div className="absolute -bottom-4 left-1/2 -z-10 h-12 w-[88%] -translate-x-1/2 rounded-[50%] border border-[#E8447A]/40 shadow-[0_0_60px_15px_rgba(232,68,122,0.35)]" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: IconComp, value, label, color }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 sm:p-3 min-w-0">
      <IconComp className={`h-3.5 w-3.5 sm:h-4 sm:w-4 mb-1.5 sm:mb-2 ${color}`} />
      <p className="text-sm sm:text-lg font-bold text-white leading-none truncate">{value}</p>
      <p className="text-[9px] sm:text-[11px] text-white/40 mt-1 truncate">{label}</p>
    </div>
  );
}

function AlertRow({ icon: IconComp, tag, text, time, severity }) {
  const s = SEVERITY_STYLES[severity];
  return (
    <li className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4 hover:bg-white/[0.04] transition-colors">
      <div className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl ${s.bg} ${s.text}`}>
        <IconComp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
          <p className="text-white/90 text-[13px] sm:text-[15px] truncate">{text}</p>
          <span className={`shrink-0 self-start sm:self-auto rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider ${s.bg} ${s.text}`}>
            {s.label}
          </span>
        </div>
        <p className="text-[10px] sm:text-xs text-white/40 mt-1">{tag} • {time}</p>
      </div>
    </li>
  );
}