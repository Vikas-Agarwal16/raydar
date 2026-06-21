"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  { key: "exams", label: "Are you preparing for any entrance exams?" },
  { key: "internships", label: "Are you looking for internships?" },
  { key: "hackathons", label: "Are you interested in hackathons?" },
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

 const handleSubmit = async () => {
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

    // ✅ Key fixes:
    router.refresh();                    // Refresh server component data
    await new Promise(resolve => setTimeout(resolve, 700)); // Give DB time to propagate
    router.push("/dashboard");

  } catch (err) {
    setError("Network error. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-md bg-[#0B0C10] border border-white/10 rounded-3xl p-8">
      <h1 className="text-2xl font-semibold text-white mb-2">Quick setup</h1>
      <p className="text-white/50 text-sm mb-8">
        3 questions. We'll only track what's relevant to you.
      </p>

      <div className="space-y-4 mb-8">
        {QUESTIONS.map((q) => (
          <button
            key={q.key}
            onClick={() => toggle(q.key)}
            className={`w-full text-left px-5 py-4 rounded-xl border transition ${
              answers[q.key]
                ? "border-[#5B7FFF] bg-[#5B7FFF]/10 text-white"
                : "border-white/10 text-white/70"
            }`}
          >
            {q.label}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#5B7FFF] text-white rounded-xl py-3 font-medium disabled:opacity-50"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}