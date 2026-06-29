"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, ArrowRight, ShieldCheck } from "lucide-react";
import RadarVisual from "./RadarVisual";
import CategoryToggleCard from "./CategoryToggleCard";
import { ONBOARDING_CATEGORIES } from "@/lib/onboardingCategories";

export default function ManageCategoriesForm({ initialSelected = {} }) {
  const router = useRouter();
  const [selected, setSelected] = useState(initialSelected);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  const trackedCount = Object.values(selected).filter(Boolean).length;

  function toggle(id) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    setSavedMsg("");
  }

  async function handleSave() {
    setSaving(true);
    setSavedMsg("");

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
      setSavedMsg("Saved.");
    } catch {
      setSavedMsg("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#06080A] lg:grid-cols-2">
      <div className="hidden border-r border-white/10 lg:block">
        <RadarVisual
          categories={ONBOARDING_CATEGORIES}
          headingLine1="Your focus."
          headingLine2="Our watch."
          description="Raydar monitors the categories you care about and alerts you the moment something changes."
          trackedCount={trackedCount}
          totalCount={ONBOARDING_CATEGORIES.length}
          showLabels={false}
        />
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-16">
        <div className="mx-auto w-full max-w-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-[0_0_30px_rgba(232,68,122,0.4)]">
                <LayoutGrid className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Manage Categories</h2>
                <p className="text-sm text-white/50">Toggle what Raydar watches for you.</p>
              </div>
            </div>
            <span className="rounded-full bg-pink-500/10 px-4 py-1.5 text-sm font-medium text-pink-400">
              {ONBOARDING_CATEGORIES.length} Available
            </span>
          </div>

          <div className="mt-8 space-y-4">
            {ONBOARDING_CATEGORIES.map((cat) => (
              <CategoryToggleCard
                key={cat.id}
                category={cat}
                checked={!!selected[cat.id]}
                onChange={() => toggle(cat.id)}
                variant="manage"
              />
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border-l-4 border-pink-500 bg-white/[0.02] p-5">
            <ShieldCheck className="h-5 w-5 shrink-0 text-pink-500" />
            <div>
              <p className="font-medium text-white">You can change these anytime.</p>
              <p className="text-sm text-white/50">Stay updated on what truly matters to you.</p>
            </div>
          </div>

          {savedMsg && (
            <p className={`mt-4 text-sm ${savedMsg === "Saved." ? "text-emerald-400" : "text-red-400"}`}>
              {savedMsg}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-3 font-medium text-white/80 hover:bg-white/[0.05]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(232,68,122,0.4)] hover:brightness-110 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}