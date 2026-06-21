import { scrapeBySlug } from "@/lib/scraper";

export async function GET(request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "josaa";

  try {
    const result = await scrapeBySlug(slug);
    return Response.json({ ok: true, result });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}