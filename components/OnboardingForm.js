"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  { key: "exams", label: "Are you preparing for any entrance exams?", icon: "📚" },
  { key: "internships", label: "Are you looking for internships?", icon: "💼" },
  { key: "hackathons", label: "Are you interested in hackathons?", icon: "💻" },
];

export default function OnboardingForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    exams: false,
    internships: false,
    hackathons: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggle = (key) => {
    setAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasSelection = Object.values(answers).some((val) => val === true);

  const handleSubmit = async () => {
    if (!hasSelection) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        return;
      }

      router.refresh();
      await new Promise((resolve) => setTimeout(resolve, 700));
      router.push("/dashboard");
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0B0C10] border border-white/10 rounded-3xl p-10">
      <div className="text-center mb-10">
        {/* Brand Consistent Icon */}
        <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#E8447A] flex items-center justify-center shadow-lg shadow-[#E8447A]/30">
          <span className="text-3xl font-bold text-white tracking-tighter">R</span>
        </div>

        <h1 className="text-3xl font-semibold text-white tracking-tight">Quick Setup</h1>
        <p className="text-white/60 mt-3 text-[15px] leading-relaxed">
          Select the areas you want us to monitor.<br />
          You can change this anytime later.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {QUESTIONS.map((q) => (
          <button
            key={q.key}
            onClick={() => toggle(q.key)}
            className={`w-full flex items-center gap-4 text-left px-6 py-5 rounded-2xl border transition-all duration-200 group ${
              answers[q.key]
                ? "border-[#E8447A] bg-[#E8447A]/10 text-white"
                : "border-white/10 hover:border-white/30 text-white/70 hover:text-white"
            }`}
          >
            <span className="text-3xl transition-transform group-hover:scale-110">{q.icon}</span>
            <span className="font-medium text-[15px]">{q.label}</span>
          </button>
        ))}
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-6 text-center">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !hasSelection}
        className="w-full bg-[#E8447A] hover:bg-[#D63A6C] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-2xl py-4 transition-all active:scale-[0.985]"
      >
        {loading 
          ? "Saving Preferences..." 
          : !hasSelection 
            ? "Select at least one option to continue" 
            : "Continue to Dashboard"
        }
      </button>
    </div>
  );
}