const CRITICAL_KEYWORDS = [
  "admit card",
  "result",
  "declared",
  "released",
  "download",
  "application open",
  "last date",
  "extended",
  "postponed",
  "cancelled",
  "answer key",
  "scorecard",
  "cutoff",
  "declaration ",
  "scores",
];

const MINOR_KEYWORDS = [
  "new",
  "updated",
  "notice",
  "circular",
  "schedule",
  "list",
  "dates",
  "available",
  "invited",
  "apply",
];

function matchesKeyword(text, keyword) {
  const escaped = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const pattern = new RegExp(`\\b${escaped}\\b`, "i");
  return pattern.test(text);
}

export function classifySeverity(title) {
  if (CRITICAL_KEYWORDS.some((kw) => matchesKeyword(title, kw))) {
    return "CRITICAL";
  }
  if (MINOR_KEYWORDS.some((kw) => matchesKeyword(title, kw))) {
    return "MINOR";
  }
  return "NOISE";
}
