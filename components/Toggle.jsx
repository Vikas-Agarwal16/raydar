export default function Toggle({ checked, onChange, srLabel }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-gradient-to-r from-pink-500 to-rose-600" : "bg-white/10"
      }`}
    >
      <span className="sr-only">{srLabel}</span>
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}