"use client";

import { useState, useMemo } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Weak", "Weak", "Fair", "Good", "Strong"];
  return { score, label: labels[score] };
}

const STRENGTH_COLORS = {
  Weak: "bg-red-500",
  Fair: "bg-amber-500",
  Good: "bg-blue-500",
  Strong: "bg-[#E8447A]",
};

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearError = () => setError("");

  const nameValid = name.trim().length > 1;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;
  const confirmValid = confirmPassword.length > 0 && confirmPassword === password;
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account");
        setLoading(false);
        return;
      }

      // Auto login after successful signup
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError("Account created successfully! Please sign in.");
        router.push("/signin");
        return;
      }

      // Success - go to onboarding
      router.push("/onboarding");
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

          {/* Copy + decorative radar */}
          <div className="relative z-10 flex items-start justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8447A]/30 bg-[#E8447A]/10 px-3 py-1 text-xs font-medium text-[#E8447A] mb-4">
                <Sparkles className="h-3 w-3" />
                Join Raydar
              </span>
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Create <span className="text-[#E8447A]">your account</span>
              </h1>
              <p className="text-white/60 mt-2 text-sm">Set it up once, never refresh again</p>
            </div>

            {/* Mini radar decoration */}
            <div className="relative hidden sm:block h-[110px] w-[110px] flex-shrink-0">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-[18%] rounded-full border border-white/[0.08]" />
              <div className="absolute inset-[36%] rounded-full border border-white/[0.06]" />
              <div className="absolute left-1/2 top-1/2 h-[1.5px] w-[46%] origin-left -rotate-[50deg] bg-gradient-to-r from-[#E8447A]/90 via-[#E8447A]/30 to-transparent" />
              <span className="absolute left-[10%] top-[18%] h-1 w-1 rounded-full bg-[#E8447A]/60" />
              <span className="absolute left-[85%] top-[70%] h-1 w-1 rounded-full bg-[#E8447A]/40" />
              <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-gradient-to-br from-[#E8447A] to-[#D63A6C] text-xs font-bold text-white shadow-[0_0_24px_rgba(232,68,122,0.5)]">
                R
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="relative z-10 space-y-5">
            <div>
              <label className="block text-xs font-mono tracking-widest text-white/60 mb-2">
                FULL NAME
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearError(); }}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-11 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A] transition-all"
                  placeholder="Vikas Agarwal"
                />
                {nameValid && (
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-widest text-white/60 mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-11 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A] transition-all"
                  placeholder="you@example.com"
                />
                {emailValid && (
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-widest text-white/60 mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-20 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A] transition-all"
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-11 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {passwordValid && (
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                )}
              </div>
              {password && (
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="flex gap-1 flex-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i < strength.score ? STRENGTH_COLORS[strength.label] : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      strength.label === "Strong" ? "text-[#E8447A]" : "text-white/50"
                    }`}
                  >
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono tracking-widest text-white/60 mb-2">
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-11 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A] transition-all"
                  placeholder="••••••••"
                />
                {confirmValid && (
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                )}
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
                "Creating account..."
              ) : (
                <>
                  Create Account <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative z-10 flex items-center gap-3 my-7">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-white/40 font-mono tracking-widest">OR</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
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

          <p className="relative z-10 text-center text-sm text-white/50 mt-7">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#E8447A] hover:underline font-medium">
              Sign in here
            </Link>
          </p>

          <p className="relative z-10 flex items-center justify-center gap-1.5 text-xs text-white/30 mt-6">
            <ShieldCheck className="h-3.5 w-3.5" />
            Your data is secure with us.
          </p>
        </div>
      </div>
    </div>
  );
}