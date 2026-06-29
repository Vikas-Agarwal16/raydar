import { Layers, Briefcase, Laptop2, GraduationCap } from "lucide-react";

// Single source of truth for category UI — radar + toggle cards on
// both Onboarding and Manage Categories pull from this. Add/remove
// a category here, both pages update automatically.
export const ONBOARDING_CATEGORIES = [
  {
    id: "exams",
    label: "Exams",
    icon: Layers,
    position: "top",
    dotColor: "bg-emerald-500",
    iconBg: "bg-emerald-950/60",
    iconColor: "text-emerald-400",
    borderColor: "border-l-emerald-500",
    manageTitle: "Entrance exams",
    manageSubtitle: "JEE, NEET, GATE, CAT, UPSC & more",
    onboardingQuestion: "Are you preparing for any entrance exams?",
  },
  {
    id: "internships",
    label: "Internships",
    icon: Briefcase,
    position: "right",
    dotColor: "bg-orange-500",
    iconBg: "bg-orange-950/60",
    iconColor: "text-orange-400",
    borderColor: "border-l-orange-500",
    manageTitle: "Internships",
    manageSubtitle: "Microsoft, Google, Amazon & more",
    onboardingQuestion: "Are you looking for internships?",
  },
  {
    id: "hackathons",
    label: "Hackathons",
    icon: Laptop2,
    position: "bottom",
    dotColor: "bg-sky-500",
    iconBg: "bg-sky-950/60",
    iconColor: "text-sky-400",
    borderColor: "border-l-sky-500",
    manageTitle: "Hackathons",
    manageSubtitle: "Devfolio, Unstop, SIH & more",
    onboardingQuestion: "Are you interested in hackathons?",
  },
  {
    id: "counselling",
    label: "Counselling",
    icon: GraduationCap,
    position: "left",
    dotColor: "bg-violet-500",
    iconBg: "bg-violet-950/60",
    iconColor: "text-violet-400",
    borderColor: "border-l-violet-500",
    manageTitle: "Counselling updates",
    manageSubtitle: "JoSAA, CSAB, MCC & more",
    onboardingQuestion: "Want updates on counselling/admissions?",
  },
];