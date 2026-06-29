import { formatRelativeTime } from "@/lib/dashboardHelpers";

const TONE_STYLES = {
  active: "bg-[#34D399]/15 text-[#34D399] border-[#34D399]/30",
  warning: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30",
  neutral: "bg-white/5 text-white/40 border-white/10",
};

function Row({ label, status, tone, detail }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
      <span className="text-white/70 text-sm">{label}</span>
      <div className="flex items-center gap-2">
        {detail && <span className="text-white/30 text-xs font-mono">{detail}</span>}
        <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full border ${TONE_STYLES[tone]}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

export default function ChannelStatusCard({ telegramConnected, pushSubscribed, lastDigestSentAt }) {
  const digestHours = lastDigestSentAt
    ? (Date.now() - new Date(lastDigestSentAt).getTime()) / 36e5
    : null;
  const digestTone = !lastDigestSentAt ? "neutral" : digestHours <= 36 ? "active" : "warning";
  const digestStatus = !lastDigestSentAt ? "PENDING" : digestHours <= 36 ? "ACTIVE" : "STALE";

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-5">
      <h3 className="text-white/50 text-xs font-mono uppercase tracking-[3px] mb-3">Channels</h3>
      <Row label="Telegram" status={telegramConnected ? "ACTIVE" : "INACTIVE"} tone={telegramConnected ? "active" : "neutral"} />
      <Row label="Push" status={pushSubscribed ? "ACTIVE" : "INACTIVE"} tone={pushSubscribed ? "active" : "neutral"} />
      <Row
        label="Email Digest"
        status={digestStatus}
        tone={digestTone}
        detail={lastDigestSentAt ? formatRelativeTime(lastDigestSentAt) : null}
      />
    </div>
  );
}