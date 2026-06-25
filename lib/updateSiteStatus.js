import dbConnect from "@/lib/mongodb";
import SiteStatus from "@/models/SiteStatus";
import { scrapeBySlug } from "@/lib/scraper";

export async function updateSiteStatus(slug) {
  await dbConnect();

  const scraped = await scrapeBySlug(slug);
  const existing = await SiteStatus.findOne({ slug });
  const now = new Date();
  const isFirstRun = !existing;

  const update = {
    severity: scraped.severity,
    lastCheckedAt: now,
  };

  let titleChanged = false;

  // scraped.title === null means "ran fine, nothing matched this time"
  // (e.g. Amazon's India query came back empty). Don't let that overwrite
  // a real previous title with null, and don't trip lastChangedAt for it —
  // there's no actual change to report.
  if (scraped.title !== null) {
    titleChanged = isFirstRun || existing.lastTitle !== scraped.title;
    update.lastTitle = scraped.title;
    update.url = scraped.url;
    if (titleChanged) {
      update.lastChangedAt = now;
    }
  }

  const doc = await SiteStatus.findOneAndUpdate(
    { slug },
    { $set: update },
    { upsert: true, new: true }
  );

  return {
    doc,
    changed: titleChanged,
    // A site's very first scrape has no real baseline to compare against —
    // it's "we just started watching," not "this just happened." Don't alert on it.
    shouldNotify: titleChanged && !isFirstRun,
    severity: scraped.severity,
    title: scraped.title,
    url: scraped.url,
  };
}