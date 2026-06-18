export default function WhyRaydar() {
  return (
    <section className="border-b border-white/[0.08] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="text-[13px] font-medium uppercase tracking-[2px] text-[#E8447A]">THE PROBLEM</p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl tracking-tighter leading-tight text-white">
            Checking manually doesn&apos;t scale to 21 sites.
          </h2>
          <p className="mt-5 text-lg text-white/60">
            Every aspirant ends up doing the same unpaid job — being their own monitoring system. Raydar just does that job better, and never sleeps.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Main Card */}
          <div className="relative lg:col-span-7 rounded-3xl border border-[#E8447A]/20 bg-gradient-to-br from-[#1A0E16] to-[#0B0C10] p-10 overflow-hidden">
            <span className="text-sm font-medium text-[#F47BA0]">THE ACTUAL NIGHTMARE</span>
            <h3 className="mt-4 text-3xl md:text-4xl leading-tight font-medium text-white">
              Results drop at 2 A.M.
            </h3>
            <p className="mt-6 text-[15.5px] leading-relaxed text-white/70 max-w-md">
              Admit cards and seat allotments don&apos;t follow office hours. By the time you wake up, you&apos;re already hours behind everyone else.
            </p>
            <div className="absolute -bottom-12 -right-12 h-80 w-80 rounded-full bg-[#E8447A]/10 blur-3xl" />
          </div>

          {/* Side Cards */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="flex-1 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
              <h3 className="text-xl font-medium text-white">21 tabs open, all day</h3>
              <p className="mt-4 text-white/60">
                You end up checking the same sites five times a day out of anxiety, not because anything changed.
              </p>
            </div>

            <div className="flex-1 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
              <h3 className="text-xl font-medium text-white">Real updates buried in noise</h3>
              <p className="mt-4 text-white/60">
                Most notices are irrelevant circulars. The one update that matters gets lost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}