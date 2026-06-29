"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Sectors", href: "#sectors" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0B0C10]/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Raydar home">
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <rect width="28" height="28" rx="7" fill="#E8447A" />
            <circle cx="14" cy="14" r="7.5" fill="none" stroke="#fff" strokeWidth="1.4" opacity="0.9" />
            <path d="M14 14 L14 6.5 A7.5 7.5 0 0 1 20.8 10.5 Z" fill="#fff" opacity="0.85" />
            <circle cx="14" cy="14" r="1.8" fill="#fff" />
          </svg>
          <span className="font-display text-[20px] font-semibold tracking-tighter text-white group-hover:text-[#E8447A] transition-colors">
            Ray<span className="text-[#E8447A]">dar</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-[14.5px] text-white/70 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#E8447A] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/signup"
          className="hidden rounded-full bg-[#E8447A] px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#E8447A]/30 hover:bg-white hover:text-[#0B0C10] hover:shadow-xl active:scale-[0.985] transition-all md:inline-block"
        >
          Start monitoring
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-white/80"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6h12v12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-white/[0.08] bg-[#0B0C10] px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-6 text-lg">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            onClick={() => setMobileOpen(false)}
            className="mt-8 block w-full rounded-full bg-[#E8447A] py-3.5 text-center font-medium text-white"
          >
            Start monitoring — free
          </Link>
        </div>
      )}
    </header>
  );
}