"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is this actually free?",
    a: "Yes. Raydar runs entirely on free-tier infrastructure — there's no premium tier, no credit card, no catch. If that ever changes, existing users won't be the ones who find out the hard way.",
  },
  {
    q: "How fast will I actually get notified?",
    a: "Each category is checked every 20 minutes, on a staggered schedule. Worst case, you're about 20 minutes behind the site itself.",
  },
  {
    q: "Will I get spammed with notifications?",
    a: "No. Raydar filters out routine notices and circulars automatically. You only get pinged for critical updates and important deadlines.",
  },
  {
    q: "What if a site changes its layout and breaks tracking?",
    a: "Every tracked site has a \"Site broken?\" button — report it, and it gets fixed quickly instead of silently failing.",
  },
  {
    q: "Can I add a site that isn't on the list?",
    a: "Not yet in the first version. Custom site tracking is something we're considering for later based on user demand.",
  },
  {
    q: "Do I need to keep a tab open for this to work?",
    a: "No. Checks run on our servers around the clock. You can close the browser completely.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="border-b border-white/[0.08] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[2px] text-[#E8447A]">
            QUESTIONS
          </p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl tracking-tighter text-white">
            Before you ask in the comments
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#E8447A]/50 bg-white/[0.04]"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-8 py-7 text-left hover:bg-white/[0.03] transition-colors group"
                >
                  <span className="text-[16px] font-medium text-white pr-8 leading-snug">
                    {item.q}
                  </span>
                  <span
                    className={`text-2xl text-white/50 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-45" : "group-hover:text-white/70"
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Smooth Expand Animation */}
                <div
                  className={`overflow-hidden transition-all duration-400 ease-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-8 text-[15px] leading-relaxed text-white/70">
                    {item.a}
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