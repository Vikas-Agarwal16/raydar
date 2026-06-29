const POSITION_CLASSES = {
  top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
};

// Coordinates on a 420x420 viewBox, matched to POSITION_CLASSES above —
// only used to draw the dashed connector lines in "labels" mode.
const LINE_POINTS = {
  top: { x: 210, y: 40 },
  right: { x: 380, y: 210 },
  bottom: { x: 210, y: 380 },
  left: { x: 40, y: 210 },
};

const LABEL_OFFSET_CLASSES = {
  top: "top-0 left-1/2 -translate-x-1/2 -translate-y-[150%]",
  right: "right-0 top-1/2 translate-x-[60%] -translate-y-1/2",
  bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-[150%]",
  left: "left-0 top-1/2 -translate-x-[60%] -translate-y-1/2",
};

/**
 * Shared radar graphic for Onboarding + Manage Categories.
 * showLabels=true → adds dashed center-to-icon lines + text labels (Onboarding).
 * showLabels=false → bare rings + icons only (Manage Categories).
 */
export default function RadarVisual({
  categories,
  headingLine1,
  headingLine2,
  description,
  trackedCount,
  totalCount,
  showLabels = false,
}) {
  const progressPct = totalCount > 0 ? (trackedCount / totalCount) * 100 : 0;

  return (
    <div className="flex h-full flex-col justify-between p-10">
      {/* Radar */}
      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        {/* decorative scatter dots */}
        <span className="absolute left-[8%] top-[20%] h-1 w-1 rounded-full bg-pink-500/60" />
        <span className="absolute left-[88%] top-[12%] h-1.5 w-1.5 rounded-full bg-pink-500/40" />
        <span className="absolute left-[78%] top-[78%] h-1 w-1 rounded-full bg-pink-500/50" />

        {/* concentric rings */}
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-[15%] rounded-full border border-white/[0.08]" />
        <div className="absolute inset-[30%] rounded-full border border-white/[0.06]" />

        {/* sweep beam */}
        <div className="absolute left-1/2 top-1/2 h-[2px] w-[48%] origin-left -rotate-[55deg] bg-gradient-to-r from-pink-500/90 via-pink-500/30 to-transparent blur-[0.5px]" />

        {/* dashed connector lines (labels mode only) */}
        {showLabels && (
          <svg
            viewBox="0 0 420 420"
            className="absolute inset-0 h-full w-full"
          >
            {categories.map((cat) => {
              const pt = LINE_POINTS[cat.position];
              return (
                <line
                  key={cat.id}
                  x1={210}
                  y1={210}
                  x2={pt.x}
                  y2={pt.y}
                  stroke="rgba(232,68,122,0.35)"
                  strokeWidth={1}
                  strokeDasharray="4 5"
                />
              );
            })}
          </svg>
        )}

        {/* center R mark */}
        <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-xl font-bold text-white shadow-[0_0_40px_rgba(232,68,122,0.55)]">
          R
        </div>

        {/* category satellites */}
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className={`absolute ${POSITION_CLASSES[cat.position]}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60">
                <Icon className={`h-5 w-5 ${cat.iconColor}`} />
              </div>

              {showLabels && (
                <span
                  className={`absolute ${LABEL_OFFSET_CLASSES[cat.position]} flex items-center gap-1.5 whitespace-nowrap rounded-full bg-black/70 px-2 py-1 text-xs text-white/80`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor}`} />
                  {cat.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* heading + copy */}
      <div>
        <h2 className="text-3xl font-bold leading-tight">
          <span className="text-white">{headingLine1}</span>
          <br />
          <span className="text-pink-500">{headingLine2}</span>
        </h2>
        <p className="mt-3 max-w-sm text-sm text-white/60">{description}</p>

        {/* tracked count card */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10">
              <span className="text-pink-500">◎</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {trackedCount} of {totalCount}
              </p>
              <p className="text-xs tracking-wide text-white/50">
                CATEGORIES TRACKED
              </p>
            </div>
          </div>
          <div className="mt-3 h-1 w-full rounded-full bg-white/10">
            <div
              className="h-1 rounded-full bg-pink-500 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}