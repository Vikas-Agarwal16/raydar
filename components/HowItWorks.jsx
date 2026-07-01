"use client";

import { Home, PenLine, Globe, BellRing, Clock, ShieldCheck, Zap, Lock } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: PenLine,
    title: "Tell us what you're chasing",
    text: "Pick your exams, internships, hackathons, counselling or careers once.",
  },
  {
    number: "02",
    icon: Globe,
    title: "Raydar checks every 20 minutes",
    text: "We scan trusted websites 24/7 and detect important changes in real time.",
  },
  {
    number: "03",
    icon: BellRing,
    title: "You hear about it only if it matters",
    text: "Instant alerts on Telegram and push — the important stuff, only.",
  },
];

const TRUST = [
  { icon: Clock, title: "24/7 Monitoring", desc: "Always on. Never misses." },
  { icon: ShieldCheck, title: "Smart Filtering", desc: "No spam. Only what matters." },
  { icon: Zap, title: "Instant Alerts", desc: "Be the first to know." },
  { icon: Lock, title: "100% Secure", desc: "Your data is always safe." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-white/[0.08] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8447A]/25 bg-[#E8447A]/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-[#E8447A]">
            <Home size={13} strokeWidth={2.5} />
            HOW IT WORKS
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-6 text-center font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Three steps. Then you <span className="text-[#E8447A]">forget</span> about it.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-white/55">
          Raydar handles the tracking, so you can focus on what really matters.
        </p>

        {/* Steps */}
        <div className="relative mt-16 grid gap-4 md:grid-cols-3">
          {/* connector dots (desktop only) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden items-center justify-center md:flex">
            <div className="flex w-full items-center px-[16.6%]">
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E8447A]" />
              <span
                className="mx-2 h-px flex-1"
                style={{ backgroundImage: "repeating-linear-gradient(to right, #E8447A 0 6px, transparent 6px 12px)" }}
              />
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E8447A]" />
              <span
                className="mx-2 h-px flex-1"
                style={{ backgroundImage: "repeating-linear-gradient(to right, #E8447A 0 6px, transparent 6px 12px)" }}
              />
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E8447A]" />
            </div>
          </div>

          {STEPS.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <div
                key={i}
                className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 pt-10 text-center"
              >
                <span className="absolute -top-3 left-6 flex h-9 w-9 items-center justify-center rounded-xl bg-[#3A0F1E] text-sm font-semibold text-white">
                  {step.number}
                </span>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8447A]/10 border border-[#E8447A]/25 shadow-[0_0_30px_-8px_rgba(232,68,122,0.5)]">
                  <StepIcon size={26} className="text-[#E8447A]" strokeWidth={1.75} />
                </div>

                <h3 className="mt-6 text-xl font-medium text-white">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55">{step.text}</p>
              </div>
            );
          })}
        </div>

        {/* Trust bar */}
        <div className="mt-14 grid grid-cols-2 gap-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-7 sm:grid-cols-4">
          {TRUST.map((item, i) => {
            const TrustIcon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#E8447A]/10 border border-[#E8447A]/25">
                  <TrustIcon size={18} className="text-[#E8447A]" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-white/45">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}