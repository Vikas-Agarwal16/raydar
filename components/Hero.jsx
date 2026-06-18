export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] px-6 py-24 md:py-32 bg-[#0B0C10] min-h-[90vh] flex items-center">
      {/* Enhanced Radar Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#E8447A_0.6px,transparent_1px)] [background-size:50px_50px]" />

        {/* Large Radar Rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#E8447A]/10 rounded-full animate-[radar-ring_12s_linear_infinite]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-[#E8447A]/15 rounded-full animate-[radar-ring_12s_linear_infinite_2s]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] border border-[#E8447A]/20 rounded-full animate-[radar-ring_12s_linear_infinite_4s]" />

        {/* Scanning Sweep Line */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-[sweep_4s_linear_infinite]">
          <div className="absolute top-0 left-1/2 w-[3px] h-1/2 bg-gradient-to-b from-transparent via-[#E8447A] to-transparent shadow-[0_0_25px_#E8447A]" />
        </div>

        {/* Blinking Radar Blips */}
        <div className="absolute left-[38%] top-[42%] w-2 h-2 bg-[#E8447A] rounded-full animate-[blip_2.5s_ease-in-out_infinite]" />
        <div className="absolute left-[62%] top-[35%] w-2 h-2 bg-[#E8447A] rounded-full animate-[blip_3.2s_ease-in-out_infinite_0.8s]" />
        <div className="absolute left-[45%] top-[65%] w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-[blip_2.8s_ease-in-out_infinite_1.5s]" />
        <div className="absolute left-[55%] top-[58%] w-2 h-2 bg-[#E8447A] rounded-full animate-[blip_4s_ease-in-out_infinite_2.2s]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2 z-10">
        {/* Left Content */}
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            21 sites watched right now
          </p>

          <h1 className="font-display text-5xl md:text-[56px] leading-[1.05] tracking-tighter text-white">
            Stop refreshing.<br />
            Start <span className="text-[#E8447A]">getting told.</span>
          </h1>

          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/60">
            Raydar continuously scans NTA, JEE, JoSAA, Microsoft careers and 17 other critical sites — and notifies you instantly when something changes.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/signup"
              className="rounded-full bg-[#E8447A] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#E8447A]/40 hover:bg-white hover:text-black transition-all active:scale-[0.98]"
            >
              Start monitoring — free
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white hover:bg-white/5 transition-all"
            >
              See how it works →
            </a>
          </div>
        </div>

        {/* Live Alerts Mock - Also Enhanced */}
        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-[#10121F] p-6 shadow-2xl shadow-black/80 relative">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-white/50">LIVE SCANS</span>
              <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                SCANNING
              </span>
            </div>

            <ul className="space-y-3">
              <AlertRow tag="Exams" text="JEE Main — admit card released" time="2 min ago" severity="critical" />
              <AlertRow tag="Internships" text="Microsoft careers — new SWE listing" time="24 min ago" severity="minor" />
              <AlertRow tag="Hackathons" text="Devfolio — registration opens in 3 days" time="1 hr ago" severity="soon" />
              <AlertRow tag="Counselling" text="JoSAA — round 2 seat allotment out" time="3 hrs ago" severity="critical" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function AlertRow({ tag, text, time, severity }) {
  const styles = {
    critical: "bg-[#E8447A]/15 text-[#F47BA0]",
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