import Toggle from "./Toggle";

export default function CategoryToggleCard({ category, checked, onChange, variant = "manage" }) {
  const Icon = category.icon;
  const title = variant === "onboarding" ? category.onboardingQuestion : category.manageTitle;

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 ${
        variant === "onboarding" ? `border-l-4 ${category.borderColor}` : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${category.iconBg}`}>
          <Icon className={`h-5 w-5 ${category.iconColor}`} />
        </div>
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="text-sm text-white/50">{category.manageSubtitle}</p>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} srLabel={`Toggle ${category.label}`} />
    </div>
  );
}