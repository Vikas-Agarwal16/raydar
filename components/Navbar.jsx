"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Sectors", href: "#sectors" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0B0C10]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="Raydar home">
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <rect width="28" height="28" rx="7" fill="#E8447A" />
            <circle cx="14" cy="14" r="7.5" fill="none" stroke="#fff" strokeWidth="1.4" opacity="0.9" />
            <path d="M14 14 L14 6.5 A7.5 7.5 0 0 1 20.8 10.5 Z" fill="#fff" opacity="0.85" />
            <circle cx="14" cy="14" r="1.8" fill="#fff" />
          </svg>
          <span className="font-display text-[19px] font-semibold tracking-tight text-white">
            Ray<span className="text-[#E8447A]">dar</span>
          </span>
        </Link>

        {/* Center links — desktop only */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[14px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8447A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C10] rounded-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — desktop only */}
        <Link
          href="/signup"
          className="hidden rounded-lg bg-[#E8447A] px-4 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#D63A6C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8447A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C10] md:inline-block"
        >
          Start monitoring
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[#0B0C10] px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[15px] text-white/70 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            onClick={() => setMobileOpen(false)}
            className="mt-5 block rounded-lg bg-[#E8447A] px-4 py-2.5 text-center text-[14px] font-medium text-white"
          >
            Start monitoring
          </Link>
        </div>
      )}
    </header>
  );
}
