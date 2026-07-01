"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Rocket, Star, LayoutGrid, CircleHelp, User, ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/", hash: null, icon: null },
  { label: "How It Works", href: "/#how-it-works", hash: "how-it-works", icon: Rocket },
  // { label: "Features", href: "/#why-raydar", hash: "why-raydar", icon: Star },
  { label: "Supported Sites", href: "/#sectors", hash: "sectors", icon: LayoutGrid },
  { label: "FAQ", href: "/#faq", hash: "faq", icon: CircleHelp },
];

const SECTION_IDS = NAV_LINKS.filter((l) => l.hash).map((l) => l.hash);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(null); // null = Home/top

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 80) setActiveHash(null);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[#E8447A]/25 bg-[#0B0C10]/95 px-3 py-2.5 shadow-[0_0_40px_-12px_rgba(232,68,122,0.35)] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5 pl-2 group" aria-label="Raydar home">
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <rect width="28" height="28" rx="7" fill="#E8447A" />
            <circle cx="14" cy="14" r="7.5" fill="none" stroke="#fff" strokeWidth="1.4" opacity="0.9" />
            <path d="M14 14 L14 6.5 A7.5 7.5 0 0 1 20.8 10.5 Z" fill="#fff" opacity="0.85" />
            <circle cx="14" cy="14" r="1.8" fill="#fff" />
          </svg>
          <span className="font-display text-[19px] font-semibold tracking-tighter text-white group-hover:text-[#E8447A] transition-colors">
            Ray<span className="text-[#E8447A]">dar</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.hash === activeHash;
            const Icon = link.icon;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] transition-colors ${
                    isActive
                      ? "bg-[#E8447A]/12 text-[#E8447A] font-medium"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  {Icon && <Icon size={15} strokeWidth={2} />}
                  {link.label}
                </Link>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#E8447A]" />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <span className="h-6 w-px bg-white/10" />
          <Link
            href="/signin"
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[14px] text-white/85 hover:border-white/30 hover:text-white transition-colors"
          >
            <User size={15} strokeWidth={2} />
            Log in
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8447A] to-[#F2679A] px-5 py-2.5 text-[14px] font-medium text-white shadow-lg shadow-[#E8447A]/30 hover:shadow-xl active:scale-[0.985] transition-all"
          >
            Start Monitoring
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-white/80"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/[0.08] bg-[#0B0C10] px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5 text-[15px]">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 text-white/80 hover:text-white"
                  >
                    {Icon && <Icon size={16} strokeWidth={2} />}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/signin"
            onClick={() => setMobileOpen(false)}
            className="mt-6 block w-full rounded-full border border-white/15 py-3 text-center text-white/85"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block w-full rounded-full bg-gradient-to-r from-[#E8447A] to-[#F2679A] py-3.5 text-center font-medium text-white"
          >
            Start Monitoring
          </Link>
        </div>
      )}
    </header>
  );
}