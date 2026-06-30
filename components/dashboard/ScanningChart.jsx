"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

// Decorative only — no real time-series backing this yet.
// Deterministic zigzag so it doesn't reshuffle on every render.
const DATA = [
  { v: 20 }, { v: 45 }, { v: 30 }, { v: 60 }, { v: 38 },
  { v: 70 }, { v: 50 }, { v: 85 }, { v: 55 }, { v: 90 },
];

export default function ScanningChart() {
  return (
    <div className="relative w-[280px] h-16 shrink-0">
      <span className="absolute -top-6 right-8 px-2.5 py-1 text-[10px] font-mono rounded-full bg-[#E8447A] text-white shadow-lg shadow-[#E8447A]/30">
        Scanning...
      </span>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DATA} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="scanGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8447A" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#E8447A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke="#E8447A"
            strokeWidth={2}
            fill="url(#scanGlow)"
            dot={{ r: 2, fill: "#E8447A", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
