"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Clear error when user starts typing
  const clearError = () => setError("");

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
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Auto login after signup
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        router.push("/signin");
        return;
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8447A] flex items-center justify-center">
              <span className="text-white text-xl font-bold">R</span>
            </div>
            <span className="font-display text-3xl font-semibold tracking-tighter text-white">
              Ray<span className="text-[#E8447A]">dar</span>
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Create your account
        </h1>
        <p className="text-white/60 mt-2">
          Set it up once, never refresh again
        </p>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-10">
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block text-xs font-mono tracking-widest text-white/60 mb-2">
              FULL NAME
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => { setName(e.target.value); clearError(); }}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A]"
              placeholder="Vikas Agarwal"
            />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-widest text-white/60 mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError(); }}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-widest text-white/60 mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError(); }}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A]"
              placeholder="At least 8 characters"
            />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-widest text-white/60 mb-2">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-2xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E8447A] hover:bg-[#D63A6C] disabled:opacity-50 text-white font-medium rounded-2xl py-3.5 transition-all active:scale-[0.985]"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Google Button (same as before) */}
        <div className="flex items-center gap-3 my-8">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs text-white/40 font-mono tracking-widest">OR</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 border border-white/10 hover:bg-white/5 text-white rounded-2xl py-3.5 transition-all"
        >
          Continue with Google
        </button>
      </div>
    </>
  );
}