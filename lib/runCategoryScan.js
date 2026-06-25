import { getSitesByCategory } from "@/lib/sites";
import { updateSiteStatus } from "@/lib/updateSiteStatus";
import { notifyUsers } from "@/lib/notifyUsers";

export async function runCategoryScan(category) {
  const sites = getSitesByCategory(category);

  const results = await Promise.allSettled(
    sites.map((site) => updateSiteStatus(site.slug))
  );

  await Promise.allSettled(
    results.map((result, i) => {
      const slug = sites[i].slug;
      const value = result.status === "fulfilled" ? result.value : null;
      const isAlertable =
        value?.shouldNotify &&
        (value.severity === "CRITICAL" || value.severity === "SOON");
      return isAlertable ? notifyUsers(slug, value) : Promise.resolve();
    })
  );

  return results.map((result, i) => {
    const slug = sites[i].slug;
    if (result.status === "fulfilled") {
      return { slug, status: "ok" };
    }
    const message = result.reason?.message || "Unknown error";
    if (message.startsWith("No scraper defined")) {
      return { slug, status: "skipped", message };
    }
    return { slug, status: "error", message };
  });
}