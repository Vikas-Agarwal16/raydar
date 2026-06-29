"use client";

export default function RadarBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #E8447A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* concentric radar rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[180, 340, 520, 720].map((size) => (
          <div
            key={size}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E8447A]/10"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* rotating sweep */}
      <div
        className="absolute left-1/2 top-1/2 w-[720px] h-[720px] radar-sweep"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, rgba(232,68,122,0.18) 18deg, transparent 40deg)",
          borderRadius: "50%",
        }}
      />

      <style jsx>{`
        .radar-sweep {
          animation: radar-spin 6s linear infinite;
        }
        @keyframes radar-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}