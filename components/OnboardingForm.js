"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import RadarVisual from "./RadarVisual";
import CategoryToggleCard from "./CategoryToggleCard";
import { ONBOARDING_CATEGORIES } from "@/lib/onboardingCategories";

export default function OnboardingForm() {
  const router = useRouter();
  const [selected, setSelected] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const trackedCount = Object.values(selected).filter(Boolean).length;
  const hasSelection = trackedCount > 0;

  function toggle(id) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function handleSubmit() {
    if (!hasSelection || submitting) return;
    setSubmitting(true);
    setError("");

    const body = Object.fromEntries(
      ONBOARDING_CATEGORIES.map((cat) => [cat.id, !!selected[cat.id]])
    );

    try {
      const res = await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to save");

      router.refresh();
      await new Promise((r) => setTimeout(r, 150));
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#06080A] lg:grid-cols-2">
      <div className="hidden border-r border-white/10 lg:block">
        <RadarVisual
          categories={ONBOARDING_CATEGORIES}
          headingLine1="We watch."
          headingLine2="You focus."
          description="Raydar monitors the categories you care about and alerts you the moment something changes."
          trackedCount={trackedCount}
          totalCount={ONBOARDING_CATEGORIES.length}
          showLabels
        />
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-16">
        <div className="mx-auto w-full max-w-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-[0_0_30px_rgba(232,68,122,0.4)]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Quick Setup</h1>
              <p className="text-sm text-white/50">
                Select the areas you want us to monitor.
                <br />
                You can change this anytime later.
              </p>
            </div>
          </div>

          <div className="my-6 h-px w-full bg-white/10" />

          <div className="space-y-4">
            {ONBOARDING_CATEGORIES.map((cat) => (
              <CategoryToggleCard
                key={cat.id}
                category={cat}
                checked={!!selected[cat.id]}
                onChange={() => toggle(cat.id)}
                variant="onboarding"
              />
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-white/50">
              <ShieldCheck className="h-5 w-5 shrink-0 text-pink-500" />
              <p className="text-sm">
                You can change these anytime.
                <br className="hidden sm:block" />
                Stay updated on what truly matters.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!hasSelection || submitting}
              className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition ${
                hasSelection
                  ? "bg-gradient-to-r from-pink-500 to-rose-600 shadow-[0_0_30px_rgba(232,68,122,0.4)] hover:brightness-110"
                  : "cursor-not-allowed bg-white/10 text-white/40"
              }`}
            >
              {submitting ? "Saving..." : hasSelection ? "Continue" : "Select at least one option to continue"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}