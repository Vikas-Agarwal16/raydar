import { STATUS_STYLES, formatRelativeTime } from "@/lib/dashboardHelpers";

export default function ActivityFeed({ items }) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-5">
      <h3 className="text-white/50 text-xs font-mono uppercase tracking-[3px] mb-3">Recent Activity</h3>
      {items.length === 0 ? (
        <p className="text-white/30 text-sm">No changes detected yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const style = STATUS_STYLES[item.status.severity] || STATUS_STYLES.NOISE;
            return (
              <div key={item.slug} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white text-sm truncate">{item.name}</p>
                  <p className="text-white/35 text-xs truncate">
                    {item.status.lastTitle || "Status changed"}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full border ${style.badge}`}>
                    {style.label}
                  </span>
                  <p className="text-white/25 text-[10px] font-mono mt-1">
                    {formatRelativeTime(item.status.lastChangedAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}