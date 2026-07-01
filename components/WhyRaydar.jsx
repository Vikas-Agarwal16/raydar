"use client";

import { AlertCircle, Moon, Clock, Bell, ShieldCheck, Mail } from "lucide-react";
import { SITES } from "@/lib/sites";

const AVATARS = [
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=47",
];

export default function TheProblem() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8447A]/25 bg-[#E8447A]/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-[#E8447A]">
            <AlertCircle size={13} strokeWidth={2.5} />
            THE PROBLEM
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-6 text-center font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Checking manually doesn&apos;t scale to <span className="text-[#E8447A]">{SITES.length} sites.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/55">
          Every aspirant ends up doing the same unpaid job — being their own monitoring system. Raydar just does that job better, and never sleeps.
        </p>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
          {/* Left: nightmare card w/ real photo */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8447A]/25 bg-[#E8447A]/[0.06] px-3 py-1 text-[11px] font-medium tracking-wide text-[#E8447A]">
              <Moon size={12} strokeWidth={2.5} />
              THE ACTUAL NIGHTMARE
            </span>

            <h3 className="mt-6 font-display text-3xl font-semibold leading-tight text-white">
              Results drop
              <br />
              at <span className="text-[#E8447A]">2 A.M.</span>
            </h3>
            <div className="mt-3 h-0.5 w-14 bg-[#E8447A]" />

            <p className="mt-5 max-w-[85%] text-[15px] leading-relaxed text-white/60">
              Alerts come and shock you while you&apos;re asleep. By the time you wake up, your friend or hundreds of others already know.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-[#0B0C10] object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-[#E8447A]">You&apos;re not alone.</p>
                <p className="text-xs text-white/45">Thousands miss out every day.</p>
              </div>
            </div>

            {/* Real photo, right side */}
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[42%] max-w-[280px] overflow-hidden rounded-l-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/problrm-phone.png"
                alt="Phone showing a notification at 2 A.M."
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0B0C10]/60" />

              {/* Notification chip overlay */}
              <div className="absolute bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-xl border border-white/10 bg-[#0B0C10]/90 p-3 backdrop-blur-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E8447A]/15">
                    <Bell size={12} className="text-[#E8447A]" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-white">New Update Detected!</p>
                    <p className="text-[11px] text-white/50">JoSAA Round 2 seat allotment out</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: two stacked cards */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#E8447A]/10 border border-[#E8447A]/25">
                <Clock size={18} className="text-[#E8447A]" strokeWidth={2} />
              </span>
              <div>
                <h4 className="font-medium text-white">18 tabs open, all day</h4>
                <p className="mt-1.5 text-sm text-white/50">
                  You end up checking the same sites again and again. It&apos;s a full-time job of anxiety.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#E8447A]/10 border border-[#E8447A]/25">
                <Bell size={18} className="text-[#E8447A]" strokeWidth={2} />
              </span>
              <div>
                <h4 className="font-medium text-white">Real updates buried in noise</h4>
                <p className="mt-1.5 text-sm text-white/50">
                  Most notices are irrelevant circulars. The ones you care about get buried in the noise.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#E8447A]/10 border border-[#E8447A]/25">
              <ShieldCheck size={18} className="text-[#E8447A]" strokeWidth={2} />
            </span>
            <p className="text-[15px] text-white/80">
              Raydar filters the noise and delivers <span className="text-[#E8447A]">only what matters</span>.
              <br className="hidden sm:block" />
              So you focus on preparing, not refreshing.
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <svg width="200" height="24" viewBox="0 0 200 24" aria-hidden="true">
              <path d="M0 12 Q50 -4 100 12 T200 12" fill="none" stroke="#E8447A" strokeOpacity="0.4" strokeWidth="1.5" />
              <circle cx="196" cy="12" r="3" fill="#E8447A" />
            </svg>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8447A]/30 bg-[#E8447A]/10">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#E8447A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8447A]" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}