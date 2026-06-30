"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  FolderKanban,
  Bell,
  Activity,
  Settings,
  ArrowRight,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, soon: false },
  { href: "/dashboard/sites", label: "Sites", icon: Globe, soon: false },
  { href: "/settings", label: "Categories", icon: FolderKanban, soon: false },
  { href: "/dashboard/alerts", label: "Alerts", icon: Bell, soon: false },
  { href: "/dashboard/activity", label: "Activity", icon: Activity, soon: false },
  { href: "/settings", label: "Settings", icon: Settings, soon: false },
];

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <aside className="w-[220px] shrink-0 h-screen sticky top-0 flex flex-col border-r border-white/10 bg-[#06080A] px-4 py-6">
      {/* logo */}
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="w-8 h-8 rounded-xl bg-[#E8447A] flex items-center justify-center">
          <span className="text-white text-base font-bold">R</span>
        </div>
        <span className="font-display text-xl font-semibold tracking-tight text-white">
          Ray<span className="text-[#E8447A]">dar</span>
        </span>
      </div>

      {/* nav */}
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon, soon }) => {
          const active = pathname === href;
          const content = (
            <span
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                active
                  ? "bg-[#E8447A]/10 text-[#E8447A]"
                  : soon
                  ? "text-white/25 cursor-default"
                  : "text-white/50 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-[#E8447A]" />
              )}
              <Icon className="w-4 h-4" />
              {label}
              {soon && (
                <span className="ml-auto text-[9px] font-mono tracking-wider text-white/20 border border-white/10 rounded-full px-1.5 py-0.5">
                  SOON
                </span>
              )}
            </span>
          );

          return soon ? (
            <div key={label}>{content}</div>
          ) : (
            <Link key={label} href={href}>
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* stay ahead card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 mb-4 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#E8447A]/20 blur-2xl pointer-events-none" />
        <p className="text-white text-sm font-semibold mb-1 relative">Stay ahead.</p>
        <p className="text-white/40 text-xs leading-relaxed mb-3 relative">
          We scan, detect and notify—so you never miss an opportunity.
        </p>
        <button className="relative inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[#E8447A] rounded-full px-3 py-1.5 hover:bg-[#E8447A]/90 transition-colors">
          Learn more <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* user profile + dropdown */}
      <div ref={menuRef} className="relative pt-3 border-t border-white/10">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-white/[0.04] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#E8447A]/20 border border-[#E8447A]/30 flex items-center justify-center text-[#E8447A] text-xs font-semibold shrink-0">
            {user.name?.[0]?.toUpperCase() || "V"}
          </div>
          <div className="min-w-0 text-left flex-1">
            <p className="text-white text-xs font-medium truncate">{user.name}</p>
            <p className="text-white/30 text-[11px] truncate">{user.email}</p>
          </div>
          <ChevronUp className={`w-3.5 h-3.5 text-white/30 transition-transform ${menuOpen ? "" : "rotate-180"}`} />
        </button>

        {menuOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0B0C10] border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <Link
              href="/settings"
              className="flex items-center gap-2.5 px-3 py-2.5 text-xs text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              Settings
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-white/60 hover:text-[#E8447A] hover:bg-white/[0.04] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
