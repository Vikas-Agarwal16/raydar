"use client";

import { useState } from "react";

const STEPS = [
  {
    number: "01",
    title: "Tell us what you're chasing",
    text: "Pick your exam, your interest in internships or hackathons, and your year. Raydar auto-enables the sites that actually matter to you.",
  },
  {
    number: "02",
    title: "Raydar checks every 20 minutes",
    text: "Exams, internships, hackathons and counselling sites are each swept on their own schedule, around the clock. You don't open a single tab.",
  },
  {
    number: "03",
    title: "You hear about it only if it matters",
    text: "A new circular gets filtered out. An admit card release gets pushed to you instantly on Telegram and push — the moment it's live.",
  },
];

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="how-it-works" className="border-b border-white/[0.08] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[2px] text-[#E8447A]">HOW IT WORKS</p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl tracking-tighter leading-tight text-white">
            Three steps. Then you forget about it.
          </h2>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`group rounded-3xl border p-8 text-left transition-all duration-300 ${
                  isActive
                    ? "border-[#E8447A] bg-white/[0.06] shadow-xl shadow-black/50"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-semibold transition-all ${
                      isActive
                        ? "bg-[#E8447A] text-black"
                        : "bg-white/10 text-white/60 group-hover:bg-white/20"
                    }`}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-xl font-medium text-white">{step.title}</h3>
                </div>

                <p
                  className={`mt-6 text-[15px] leading-relaxed text-white/60 transition-all ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {step.text}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}