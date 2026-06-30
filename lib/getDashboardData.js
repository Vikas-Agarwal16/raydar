import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSiteBySlug } from "@/lib/sites";
import { getSiteStatusMap } from "@/lib/getSiteStatuses";

function serializeStatus(status) {
  if (!status) return null;
  return {
    severity: status.severity,
    lastTitle: status.lastTitle,
    lastCheckedAt: status.lastCheckedAt
      ? new Date(status.lastCheckedAt).toISOString()
      : null,
    lastChangedAt: status.lastChangedAt
      ? new Date(status.lastChangedAt).toISOString()
      : null,
  };
}

const DEFAULT_FIELDS =
  "enabledSites onboardingComplete name email telegramChatId pushSubscription lastDigestSentAt";

export async function getDashboardData(selectFields = DEFAULT_FIELDS) {
  const session = await auth();
  if (!session) redirect("/signin");

  await dbConnect();

  const user = await User.findById(session.user.id).select(selectFields);
  if (!user?.onboardingComplete) redirect("/onboarding");

  const sites = user.enabledSites.map(getSiteBySlug).filter(Boolean);
  const statusMap = await getSiteStatusMap(sites.map((s) => s.slug));

  const sitesWithStatus = sites.map((site) => ({
    ...site,
    status: serializeStatus(statusMap[site.slug]),
  }));

  return { session, user, sitesWithStatus, now: Date.now() };
}