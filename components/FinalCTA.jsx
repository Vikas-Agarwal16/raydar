import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="border-b border-white/[0.08] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-[#E8447A]/25 bg-[#0B0C10]">
          {/* Background art */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cta-lighthouse.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Legibility gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10] via-[#0B0C10]/75 to-transparent" />

          <div className="relative max-w-xl px-8 py-16 sm:px-12 md:py-20 lg:px-16">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Ready when you are.
              <br />
              Stop checking. <span className="text-[#E8447A]">Start preparing.</span>
            </h2>

            <p className="mt-5 text-[15px] leading-relaxed text-white/60 sm:text-base">
              Raydar quietly watches every important update so you never miss what matters.
            </p>

            <a
              href="/signup"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E8447A] px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#E8447A]/30 transition-all hover:bg-white hover:text-black active:scale-[0.985]"
            >
              Start Monitoring — Free
              <ArrowRight size={18} strokeWidth={2.5} />
            </a>

            <p className="mt-5 flex flex-wrap items-center gap-x-2 text-sm text-white/45">
              <span>No credit card</span>
              <span className="text-[#E8447A]">•</span>
              <span>No spam</span>
              <span className="text-[#E8447A]">•</span>
              <span>Free forever</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}