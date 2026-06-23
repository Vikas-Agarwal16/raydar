import { NextResponse } from "next/server";
import { getSitesByCategory } from "@/lib/sites";
import { updateSiteStatus } from "@/lib/updateSiteStatus";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sites = getSitesByCategory("hackathons");

  const results = await Promise.allSettled(
    sites.map((site) => updateSiteStatus(site.slug))
  );

  const summary = results.map((result, i) => {
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

  return NextResponse.json({ ranAt: new Date().toISOString(), summary });
}