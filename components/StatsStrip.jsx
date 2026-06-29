"use client";

import { useEffect, useRef, useState } from "react";
import { SITES } from "@/lib/sites";

const Icon = {
  Monitor: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  Grid: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  Clock: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>,
  Bell: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
};

const STATS = [
  { target: SITES.length, suffix: "", label: "Sites watched", icon: Icon.Monitor },
  { target: 4, suffix: "", label: "Categories covered", icon: Icon.Grid },
  { target: 20, suffix: " min", label: "Max check interval", icon: Icon.Clock },
  { target: 0, suffix: "", label: "Things to do manually", icon: Icon.Bell },
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
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-10">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-8 sm:px-10">
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:divide-x sm:divide-white/[0.08]">
          {STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, inView }) {
  const count = useCountUp(stat.target, inView);
  const Icon = stat.icon;

  return (
    <div className="flex items-center gap-3 px-2 sm:px-6">
      <Icon className="h-5 w-5 flex-shrink-0 text-[#E8447A]" />
      <div>
        <p className="font-display text-2xl font-semibold text-white tracking-tight">
          {count}
          {stat.suffix}
        </p>
        <p className="text-xs text-white/50">{stat.label}</p>
      </div>
    </div>
  );
}
