import dbConnect from "@/lib/mongodb";
import SiteStatus from "@/models/SiteStatus";
import { scrapeBySlug } from "@/lib/scraper";

export async function updateSiteStatus(slug) {
  await dbConnect();

  const scraped = await scrapeBySlug(slug);

  const existing = await SiteStatus.findOne({ slug });
  const titleChanged = !existing || existing.lastTitle !== scraped.title;

  const now = new Date();

  const update = {
    lastTitle: scraped.title,
    severity: scraped.severity,
    url: scraped.url,
    lastCheckedAt: now,
  };

  if (titleChanged) {
    update.lastChangedAt = now;
  }

  const result = await SiteStatus.findOneAndUpdate(
    { slug },
    { $set: update },
    { upsert: true, new: true }
  );

  return result;
}