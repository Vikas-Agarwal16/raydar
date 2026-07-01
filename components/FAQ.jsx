"use client";

import { useState } from "react";
import { HelpCircle, ShieldCheck, Clock, Bell, Flag, LayoutGrid, Server, Mail } from "lucide-react";

const FAQS = [
  {
    q: "Is this actually free?",
    a: "Yes. Raydar runs entirely on free-tier infrastructure — there's no premium tier, no credit card, no catch. If that ever changes, existing users won't be the ones who find out the hard way.",
    icon: ShieldCheck,
  },
  {
    q: "How fast will I actually get notified?",
    a: "Each category is checked every 20 minutes, on a staggered schedule. Worst case, you're about 20 minutes behind the site itself.",
    icon: Clock,
  },
  {
    q: "Will I get spammed with notifications?",
    a: "No. Raydar filters out routine notices and circulars automatically. You only get pinged for critical updates and important deadlines.",
    icon: Bell,
  },
  {
    q: "What if a site changes its layout and breaks tracking?",
    a: "Every tracked site has a \"Site broken?\" button — report it, and it gets fixed quickly instead of silently failing.",
    icon: Flag,
  },
  {
    q: "Can I add a site that isn't on the list?",
    a: "Not yet in the first version. Custom site tracking is something we're considering for later based on user demand.",
    icon: LayoutGrid,
  },
  {
    q: "Do I need to keep a tab open for this to work?",
    a: "No. Checks run on our servers around the clock. You can close the browser completely.",
    icon: Server,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1); // none open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="border-b border-white/[0.08] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8447A]/25 bg-[#E8447A]/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-[#E8447A]">
            <HelpCircle size={13} strokeWidth={2.5} />
            FAQ
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-6 text-center font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Frequently <span className="text-[#E8447A]">asked questions</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-white/55">
          Everything you need to know about Raydar.
        </p>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          {/* Left: lighthouse card */}
          <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#241428] to-[#0B0C10] p-8">
            {/* chat bubble */}
            <div className="relative z-10 flex h-11 w-14 items-center justify-center gap-1 rounded-2xl rounded-bl-sm bg-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8447A]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#F2679A]" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            </div>

            <h3 className="relative z-10 mt-8 font-display text-3xl font-semibold leading-tight text-white">
              Still have
              <br />
              questions?
            </h3>
            <p className="relative z-10 mt-4 max-w-[80%] text-[15px] text-white/55">
              We&apos;re here to help you get the most out of Raydar.
            </p>

            <a
              href="mailto:hello@raydar.app"
              className="relative z-10 mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#E8447A] to-[#A855F7] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#E8447A]/20 hover:shadow-xl transition-shadow"
            >
              <Mail size={15} strokeWidth={2} />
              Contact Us
            </a>

            {/* Lighthouse art — fixed aspect box, desktop only */}
            <div className="pointer-events-none absolute bottom-0 right-0 hidden aspect-[4/3] w-[70%] md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/faq-lighthouse.png"
                alt=""
                className="h-full w-full object-contain object-bottom opacity-95"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Right: FAQ list */}
          <div className="space-y-4">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              const ItemIcon = item.icon;

              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#E8447A]/50 bg-white/[0.04]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors group"
                  >
                    <span
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isOpen
                          ? "border-[#E8447A]/40 bg-[#E8447A]/15"
                          : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <ItemIcon size={16} className="text-[#E8447A]" strokeWidth={2} />
                    </span>

                    <span className="flex-1 text-[15px] font-medium text-white leading-snug">
                      {item.q}
                    </span>

                    <span
                      className={`text-xl text-white/50 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-45 text-[#E8447A]" : "group-hover:text-white/70"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pl-[4.25rem] text-[14px] leading-relaxed text-white/65">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}