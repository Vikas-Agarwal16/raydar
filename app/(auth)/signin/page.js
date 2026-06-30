"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCredentialsSignIn(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    // Go to onboarding first — let the server decide
    router.push("/onboarding");
  }

  function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "/onboarding" });
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

          {/* Copy + decorative tablet illustration */}
          <div className="relative z-10 flex items-start justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8447A]/30 bg-[#E8447A]/10 px-3 py-1 text-xs font-medium text-[#E8447A] mb-4">
                Welcome back 👋
              </span>
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Welcome <span className="text-[#E8447A]">back</span>
              </h1>
              <p className="text-white/60 mt-2 text-sm">Sign in to continue monitoring</p>
            </div>

            {/* Mini dashboard-tablet decoration */}
            <div className="relative hidden sm:block h-[110px] w-[110px] flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#E8447A]/10 blur-2xl" />
              <svg
                viewBox="0 0 110 110"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <ellipse
                  cx="55"
                  cy="55"
                  rx="50"
                  ry="20"
                  fill="none"
                  stroke="#E8447A"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  transform="rotate(-18 55 55)"
                />
                <circle cx="14" cy="42" r="2" fill="#E8447A" fillOpacity="0.7" />
                <circle cx="96" cy="64" r="1.5" fill="#E8447A" fillOpacity="0.5" />
              </svg>
              <div className="absolute left-1/2 top-1/2 h-16 w-12 -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] rounded-lg border border-white/15 bg-[#13151A] shadow-[0_0_30px_rgba(232,68,122,0.35)]">
                <div className="flex h-3.5 items-center gap-1 border-b border-white/10 px-1.5">
                  <div className="h-1.5 w-1.5 rounded-[2px] bg-[#E8447A]" />
                  <div className="h-[3px] flex-1 rounded-full bg-white/20" />
                </div>
                <div className="space-y-1 p-1.5">
                  <div className="h-[3px] w-3/4 rounded-full bg-white/15" />
                  <div className="h-[3px] w-1/2 rounded-full bg-[#E8447A]/50" />
                  <div className="h-[3px] w-2/3 rounded-full bg-white/15" />
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleCredentialsSignIn} className="relative z-10 space-y-5">
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A] transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-mono tracking-widest text-white/60">
                  PASSWORD
                </label>
                <Link href="/forgot-password" className="text-xs text-[#E8447A] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-11 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A] transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
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
                "Signing in..."
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative z-10 flex items-center gap-3 my-7">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-white/40 font-mono tracking-widest">OR</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="relative z-10 w-full flex items-center justify-center gap-3 border border-white/10 hover:bg-white/5 text-white rounded-2xl py-3.5 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="relative z-10 text-center text-sm text-white/50 mt-7">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#E8447A] hover:underline font-medium">
              Create one now
            </Link>
          </p>

          {/* Feature pills */}
          <div className="relative z-10 grid grid-cols-3 gap-3 mt-8 pt-7 border-t border-white/[0.06]">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#E8447A]" />
              <p className="text-xs font-medium text-white">Secure & Private</p>
              <p className="text-[11px] text-white/40 leading-tight">Your data is always protected</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Zap className="h-5 w-5 text-[#E8447A]" />
              <p className="text-xs font-medium text-white">Real-time Alerts</p>
              <p className="text-[11px] text-white/40 leading-tight">Instant notifications that matter</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Target className="h-5 w-5 text-[#E8447A]" />
              <p className="text-xs font-medium text-white">Set & Forget</p>
              <p className="text-[11px] text-white/40 leading-tight">We watch. You focus on your goals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}