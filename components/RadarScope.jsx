"use client";

const POSITIONS = {
  exams: "top-0 left-1/2 -translate-x-1/2",
  internships: "top-1/2 right-0 -translate-y-1/2",
  hackathons: "bottom-0 left-1/2 -translate-x-1/2",
  counselling: "top-1/2 left-0 -translate-y-1/2",
};

export default function RadarScope({ questions, answers }) {
  const activeCount = Object.values(answers).filter(Boolean).length;

  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="relative w-56 h-56 lg:w-64 lg:h-64">
        {[100, 70, 40].map((pct) => (
          <div
            key={pct}
            className="absolute rounded-full border border-[#E8447A]/15"
            style={{
              width: `${pct}%`,
              height: `${pct}%`,
              top: `${(100 - pct) / 2}%`,
              left: `${(100 - pct) / 2}%`,
            }}
          />
        ))}

        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E8447A]/10" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#E8447A]/10" />

        <div
          className="absolute inset-0 rounded-full overflow-hidden scope-sweep"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(232,68,122,0.25) 25deg, transparent 50deg)",
          }}
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#E8447A] flex items-center justify-center shadow-lg shadow-[#E8447A]/40 z-10">
          <span className="text-lg font-bold text-white">R</span>
        </div>

        {questions.map((q) => {
          const active = !!answers[q.key];
          return (
            <div
              key={q.key}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 ${POSITIONS[q.key] || ""}`}
            >
              <span
                className={`relative flex items-center justify-center w-9 h-9 rounded-full border text-base transition-all duration-300 ${
                  active
                    ? "border-[#E8447A] bg-[#E8447A]/20 scale-110"
                    : "border-white/15 bg-[#0B0C10] opacity-50"
                }`}
              >
                {active && (
                  <span className="absolute inset-0 rounded-full bg-[#E8447A]/40 animate-ping" />
                )}
                <span className="relative">{q.icon}</span>
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-white/40 text-xs tracking-wide uppercase">
        {activeCount}/{questions.length} categories tracked
      </p>

      <style jsx>{`
        .scope-sweep {
          animation: scope-spin 4s linear infinite;
        }
        @keyframes scope-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}