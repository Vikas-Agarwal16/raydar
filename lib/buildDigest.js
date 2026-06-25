import User from "@/models/User";
import SiteStatus from "@/models/SiteStatus";

// Builds and returns a digest payload per user: which of their enabled
// sites have MINOR changes since their last digest. Pure data-gathering —
// no email sending here, keeps this testable independent of nodemailer.
export async function buildDigests() {
  const users = await User.find({
    email: { $ne: null },
    enabledSites: { $exists: true, $not: { $size: 0 } },
  }).lean();

  const digests = [];

  for (const user of users) {
    const since = user.lastDigestSentAt ?? new Date(0); // null → epoch, means "everything counts as new"

    const changes = await SiteStatus.find({
      slug: { $in: user.enabledSites },
      severity: "MINOR",
      lastChangedAt: { $gt: since },
    }).lean();

    if (changes.length > 0) {
      digests.push({
        userId: user._id,
        email: user.email,
        changes, // array of {slug, title, url, lastChangedAt, ...}
      });
    }
  }

  return digests;
}