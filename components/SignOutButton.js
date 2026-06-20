"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-white/50 hover:text-white text-sm font-mono tracking-wide border border-white/10 hover:border-white/20 rounded-xl px-4 py-2 transition-colors"
    >
      Sign out
    </button>
  );
}