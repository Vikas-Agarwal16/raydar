
"use client";

import { useState } from "react";
import {
  HelpCircle,
  ShieldCheck,
  Clock,
  Bell,
  Flag,
  LayoutGrid,
  Server,
  Mail,
} from "lucide-react";

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
    a: 'Every tracked site has a "Site broken?" button — report it, and it gets fixed quickly instead of silently failing.',
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
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-b border-white/[0.06] px-6 py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#E8447A]/5 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8447A]/20 bg-[#E8447A]/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#FF5D91] backdrop-blur-xl">
            <HelpCircle size={13} strokeWidth={2.5} />
            FAQ
          </span>
        </div>

        <h2 className="mt-6 text-center font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Frequently{" "}
          <span className="bg-gradient-to-r from-[#FF5D91] to-[#D946EF] bg-clip-text text-transparent">
            asked questions
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-center text-white/60 leading-7">
          Everything you need to know about Raydar.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr] xl:items-start">
          <div className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,#3C1D46_0%,#19141F_45%,#0B0C10_100%)] p-8 backdrop-blur-xl">
            <div className="flex h-11 w-14 items-center justify-center gap-1 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8447A]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#F2679A]" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            </div>

            <h3 className="mt-8 font-display text-3xl font-semibold leading-tight text-white">
              Still have
              <br />
              questions?
            </h3>

            <p className="mt-4 max-w-[85%] text-[15px] leading-7 text-white/60">
              We're here to help you get the most out of Raydar.
            </p>

            <a
              href="mailto:hello@raydar.app"
              className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#E8447A] to-[#A855F7] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#E8447A]/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#E8447A]/30"
            >
              <Mail size={15} className="transition-transform group-hover:-rotate-6" />
              Contact Us
            </a>

            <img
              src="/images/faq-lighthouse.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 w-[80%] object-contain object-bottom opacity-95 transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="space-y-5">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              const ItemIcon = item.icon;

              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-2xl border transition-all duration-500 ease-out ${
                    isOpen
                      ? "border-[#E8447A]/40 bg-gradient-to-r from-[#E8447A]/[0.05] to-transparent shadow-lg shadow-black/20"
                      : "border-white/[0.08] bg-white/[0.02] hover:-translate-y-[2px] hover:border-white/20 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-black/20"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="group flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <span
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${
                        isOpen
                          ? "border-[#E8447A]/40 bg-[#E8447A]/15"
                          : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <ItemIcon size={17} className="text-[#E8447A]" />
                    </span>

                    <span className="flex-1 text-[16px] font-semibold tracking-[-0.02em] text-white">
                      {item.q}
                    </span>

                    <span
                      className={`flex h-7 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-[#E8447A]/40 bg-[#E8447A]/10 text-[#E8447A]"
                          : "border-white/10 text-white/50 group-hover:border-white/20 group-hover:text-white/80"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${
                      isOpen ? "max-h-[220px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pl-[4.5rem] text-[14px] leading-7 text-white/60">
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
