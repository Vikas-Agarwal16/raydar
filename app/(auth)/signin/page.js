"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

// Replace the handleCredentialsSignIn function with this:

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
        {/* Header */}
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
            Welcome back
          </h1>
          <p className="text-white/60 mt-2">
            Sign in to continue monitoring
          </p>
        </div>

        {/* Form Card */}
         <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-10">
          <form onSubmit={handleCredentialsSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-mono tracking-widest text-white/60 mb-2">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A] transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-mono tracking-widest text-white/60 mb-2">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E8447A] transition-all"
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-white/40 font-mono tracking-widest">OR</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-white/10 hover:bg-white/5 text-white rounded-2xl py-3.5 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-white/50 mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#E8447A] hover:underline font-medium">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}