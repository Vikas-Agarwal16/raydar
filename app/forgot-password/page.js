"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-3xl border border-[#E8447A]/20 bg-white/[0.02] p-8 md:p-10">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#E8447A]/10 blur-3xl" />

          {/* Logo */}
          <Link href="/" className="relative z-10 inline-flex items-center gap-2.5 mb-8">
            <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
              <rect width="28" height="28" rx="7" fill="#E8447A" />
              <circle cx="14" cy="14" r="7.5" fill="none" stroke="#fff" strokeWidth="1.4" opacity="0.9" />
              <path d="M14 14 L14 6.5 A7.5 7.5 0 0 1 20.8 10.5 Z" fill="#fff" opacity="0.85" />
              <circle cx="14" cy="14" r="1.8" fill="#fff" />
            </svg>
            <span className="font-display text-[20px] font-semibold tracking-tighter text-white">
              Ray<span className="text-[#E8447A]">dar</span>
            </span>
          </Link>

          {sent ? (
            <div className="relative z-10 text-center py-4">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8447A]/10">
                <CheckCircle2 className="h-7 w-7 text-[#E8447A]" />
              </div>
              <h1 className="text-2xl font-semibold text-white tracking-tight">Check your email</h1>
              <p className="text-white/60 mt-2 text-sm">
                If an account exists for <span className="text-white/80">{email}</span>, a reset link has been sent. It expires in 1 hour.
              </p>
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 text-sm text-[#E8447A] hover:underline font-medium mt-7"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="relative z-10 mb-8">
                <h1 className="text-3xl font-semibold text-white tracking-tight">
                  Forgot <span className="text-[#E8447A]">password?</span>
                </h1>
                <p className="text-white/60 mt-2 text-sm">
                  Enter your email and we&apos;ll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                <div>
                  <label htmlFor="email" className="block text-xs font-mono tracking-widest text-white/60 mb-2">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A] transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-2xl">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E8447A] to-[#D63A6C] hover:brightness-110 disabled:opacity-50 text-white font-medium rounded-2xl py-3.5 transition-all active:scale-[0.985]"
                >
                  {loading ? (
                    "Sending link..."
                  ) : (
                    <>
                      Send Reset Link <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="relative z-10 text-center text-sm text-white/50 mt-7">
                Remembered it?{" "}
                <Link href="/signin" className="text-[#E8447A] hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}