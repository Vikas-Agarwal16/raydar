"use client";

import { useEffect, useRef, useState } from "react";
import { Monitor, FolderOpen, Clock, Bell, ShieldCheck } from "lucide-react";
import { SITES } from "@/lib/sites";

const ACCENT = { pink: "#E8447A", purple: "#A855F7" };

const STATS = [
  {
    target: SITES.length,
    suffix: "+",
    label: "Websites monitored",
    desc: "Trusted Indian websites monitored 24/7",
    icon: Monitor,
    color: ACCENT.pink,
  },
  {
    target: 4,
    suffix: "",
    label: "Categories covered",
    desc: "Exams, Internships, Hackathons & more",
    icon: FolderOpen,
    color: ACCENT.purple,
  },
  {
    target: 20,
    suffix: "",
    unit: "min",
    label: "Check interval",
    desc: "Frequent scans so you never miss important updates",
    icon: Clock,
    color: ACCENT.pink,
  },
  {
    target: 0,
    suffix: "",
    label: "Manual effort",
    desc: "No manual checking. Just set & forget.",
    icon: Bell,
    color: ACCENT.purple,
  },
];

function useCountUp(target, shouldStart, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    if (target === 0) return setValue(0);

    let startTime = null;
    let frameId;

    const tick = (now) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [shouldStart, target, duration]);

  return value;
}

export default function StatsStrip() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-24">
      {/* Ambient section background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, #E8447A, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8447A] animate-pulse" />
            LIVE &amp; IMPACTING
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-6 text-center font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Real impact. <span className="text-[#E8447A]">Every minute.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-white/55">
          Raydar runs non-stop 24/7, scanning trusted websites and delivering critical updates the moment they happen.
        </p>

        {/* Arc connector + cards */}
        <div className="relative mt-16">
          <svg
            className="pointer-events-none absolute -top-8 left-0 hidden w-full sm:block"
            height="60"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 20 55 Q 500 -20 980 55"
              fill="none"
              stroke="#E8447A"
              strokeOpacity="0.35"
              strokeWidth="1.5"
            />
            {[20, 500, 980].map((x, i) => (
              <circle key={i} cx={x} cy={i === 1 ? 5 : 55} r="4" fill="#E8447A" />
            ))}
          </svg>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} inView={inView} />
            ))}
          </div>
        </div>

        {/* Trust line */}
        <div className="mt-14 flex items-center justify-center gap-2 text-white/70">
          <ShieldCheck className="h-5 w-5 text-[#E8447A]" />
          <p className="text-[15px]">
            Built for <span className="text-[#E8447A]">students</span>. Focused on what matters.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, inView }) {
  const count = useCountUp(stat.target, inView);
  const CardIcon = stat.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-8 text-center transition-colors hover:border-white/[0.15]">
      {/* per-card glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-2xl"
        style={{ background: stat.color }}
        aria-hidden="true"
      />
      {/* bottom underglow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-10 w-3/4 -translate-x-1/2 translate-y-1/2 rounded-full opacity-20 blur-2xl"
        style={{ background: stat.color }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: `${stat.color}1A`, border: `1px solid ${stat.color}33` }}
        >
          <CardIcon className="h-5 w-5" style={{ color: stat.color }} />
        </div>

        <p className="mt-5 font-display text-4xl font-semibold text-white tracking-tight">
          {count}
          {stat.suffix && <span style={{ color: stat.color }}>{stat.suffix}</span>}
          {stat.unit && <span className="ml-1 text-xl font-normal text-white/50">{stat.unit}</span>}
        </p>

        <p className="mt-2 text-xs font-medium uppercase tracking-wider" style={{ color: stat.color }}>
          {stat.label}
        </p>

        <div className="mt-4 w-full border-t border-white/[0.08] pt-4">
          <p className="text-sm text-white/50">{stat.desc}</p>
        </div>
      </div>
    </div>
  );
}