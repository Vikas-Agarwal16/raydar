export const STATUS_STYLES = {
  CRITICAL: { label: "CRITICAL", badge: "bg-[#DC2626]/15 text-[#DC2626] border-[#DC2626]/30" },
  SOON: { label: "SOON", badge: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30" },
  MINOR: { label: "MINOR", badge: "bg-[#5B7FFF]/15 text-[#7FA8FF] border-[#5B7FFF]/30" },
  NOISE: { label: "CLEAR", badge: "bg-white/10 text-white/50 border-white/10" },
  WATCHING: { label: "WATCHING", badge: "bg-white/5 text-white/40 border-white/10" },
};

export function isToday(date) {
  if (!date) return false;
  return new Date(date).toDateString() === new Date().toDateString();
}

export function formatRelativeTime(date, now = Date.now()) {
  if (!date) return "Never";
  const mins = Math.floor((now - new Date(date).getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;

}