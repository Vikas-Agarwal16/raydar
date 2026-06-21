import dbConnect from "@/lib/mongodb";
import SiteStatus from "@/models/SiteStatus";

export async function getSiteStatusMap(slugs) {
  await dbConnect();

  const statuses = await SiteStatus.find({ slug: { $in: slugs } }).lean();

  const map = {};
  for (const status of statuses) {
    map[status.slug] = status;
  }

  return map;
}