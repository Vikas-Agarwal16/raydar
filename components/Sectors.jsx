"use client";

import { useState } from "react";

const SECTORS = [
  {
    label: "Exams",
    count: 7,
    color: "#E8447A",
    desc: "Major entrance exams & government job notifications",
    sites: ["NTA", "JEE Main", "NEET", "GATE", "CAT", "SSC", "UPSC"],
  },
  {
    label: "Internships",
    count: 6,
    color: "#3B82F6",
    desc: "Top tech companies & platforms offering internships",
    sites: ["Microsoft", "Google", "Amazon", "Internshala", "Unstop", "LinkedIn"],
  },
  {
    label: "Hackathons",
    count: 4,
    color: "#8B5CF6",
    desc: "Coding competitions & innovation challenges",
    sites: ["Devfolio", "Unstop", "AICTE", "National Scholarship Portal"],
  },
  {
    label: "Counselling",
    count: 4,
    color: "#10B981",
    desc: "Seat allotment & counselling updates",
    sites: ["JoSAA", "CSAB", "MCC", "UPTAC"],
  },
];

export default function Sectors() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="sectors" className="border-b border-white/[0.08] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-[13px] font-medium uppercase tracking-[2px] text-[#E8447A]">COVERAGE</p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl tracking-tighter leading-tight text-white">
            21 sites, sorted into 4 things you actually care about.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SECTORS.map((sector, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={sector.label}
                className={`group rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#E8447A]/60 bg-white/[0.05] shadow-xl"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => toggleCard(index)}
                  className="w-full p-8 md:p-10 text-left flex items-start justify-between hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="mt-1 h-5 w-5 rounded-full flex-shrink-0 ring-2 ring-offset-4 ring-offset-[#0B0C10]"
                      style={{ backgroundColor: sector.color }}
                    />
                    <div>
                      <h3 className="text-3xl font-medium text-white">{sector.label}</h3>
                      <p className="text-white/60 mt-2 pr-8">{sector.desc}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-medium text-white/50">{sector.count} sites</span>
                    <span className={`text-3xl text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      ↓
                    </span>
                  </div>
                </button>

                {/* Expanded Content - Much Richer */}
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 md:px-10 pb-10">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

                    <p className="text-white/70 text-sm mb-6">Popular platforms we track:</p>

                    <div className="grid grid-cols-2 gap-3">
                      {sector.sites.map((site, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-2xl bg-white/[0.04] border border-white/[0.1] px-5 py-4 hover:bg-white/[0.08] hover:border-white/30 group-hover/item:scale-[1.02] transition-all"
                        >
                          <div className="h-2 w-2 rounded-full bg-white/40" />
                          <span className="text-white/90 text-[15px] font-medium">{site}</span>
                        </div>
                      ))}
                    </div>

                    {isOpen && (
                      <div className="mt-8 pt-6 border-t border-white/[0.08] text-xs text-white/50 flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Updated every 20 minutes
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}