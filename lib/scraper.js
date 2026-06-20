import https from "https";
import * as cheerio from "cheerio";
import { classifySeverity } from "@/lib/severity";

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const agent = new https.Agent({ rejectUnauthorized: false });

    https
      .get(
        url,
        {
          agent,
          headers: { "User-Agent": "Mozilla/5.0" },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve(data));
        }
      )
      .on("error", reject);
  });
}

export async function scrapeNTA() {
  const html = await fetchHTML("https://www.nta.ac.in");
  const $ = cheerio.load(html);

  const notices = [];

  $('a[href*="Download/Notice"]').each((i, el) => {
    const href = $(el).attr("href");
    const fullText = $(el).parent().text().trim();
    const title = fullText.replace(/Read More\s*$/i, "").trim();
    if (title && href) {
      notices.push({ title, url: href });
    }
  });

  if (notices.length === 0) {
    throw new Error("No notices found — NTA's HTML structure may have changed");
  }

  const latest = notices[0];

  return {
    title: latest.title,
    url: latest.url.startsWith("http") ? latest.url : `https://nta.ac.in${latest.url}`,
    severity: classifySeverity(latest.title),
  };
}

// ↓ this is the part you just asked about — add it here, after scrapeNTA
const SCRAPERS = {
  nta: scrapeNTA,
};

export async function scrapeBySlug(slug) {
  const scraperFn = SCRAPERS[slug];
  if (!scraperFn) {
    throw new Error(`No scraper defined for slug: ${slug}`);
  }
  return scraperFn();
}