"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 21, suffix: "", label: "sites watched" },
  { target: 4, suffix: "", label: "categories covered" },
  { target: 20, suffix: " min", label: "max check interval" },
  { target: 0, prefix: "₹", suffix: "", label: "to get started" },
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
    <section ref={sectionRef} className="border-b border-white/[0.08] px-6 py-12">
      <div className="mx-auto max-w-6xl grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatItem key={i} stat={stat} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ stat, inView }) {
  const count = useCountUp(stat.target, inView);

  return (
    <div className="text-center">
      <p className="font-display text-4xl md:text-5xl font-semibold text-white tracking-tighter">
        {stat.prefix}
        {count}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-white/50 uppercase tracking-widest">{stat.label}</p>
    </div>
  );
}