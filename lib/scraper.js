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

export async function scrapeJEEMain() {
  const html = await fetchHTML("https://jeemain.nta.nic.in/");
  const $ = cheerio.load(html);

  const notices = [];

  $('a[title="download"]').each((i, el) => {
    const title = $(el).text().trim();
    const href = $(el).attr("href");
    if (title && href) {
      notices.push({ title, url: href });
    }
  });

  if (notices.length === 0) {
    throw new Error("No notices found — JEE Main's HTML structure may have changed");
  }

  const latest = notices[0];

  return {
    title: latest.title,
    url: latest.url,
    severity: classifySeverity(latest.title),
  };
}

export async function scrapeNEET() {
  const html = await fetchHTML("https://neet.nta.nic.in/");
  const $ = cheerio.load(html);

  const notices = [];

  $('a[title="download"]').each((i, el) => {
    const title = $(el).text().trim();
    const href = $(el).attr("href");
    if (title && href) {
      notices.push({ title, url: href });
    }
  });

  if (notices.length === 0) {
    throw new Error("No notices found — NEET's HTML structure may have changed");
  }

  const latest = notices[0];

  return {
    title: latest.title,
    url: latest.url,
    severity: classifySeverity(latest.title),
  };
}

export async function scrapeGATE() {
  const html = await fetchHTML("https://gate2026.iitg.ac.in/notifications.html");
  const $ = cheerio.load(html);

  const notices = [];

  $("table tr").each((i, el) => {
    const cells = $(el).find("td");
    if (cells.length === 0) return; // skips the header row (uses <th>, not <td>)

    const title = $(cells[0]).text().trim();
    if (title) {
      notices.push({ title });
    }
  });

  if (notices.length === 0) {
    throw new Error("No notifications found — GATE's HTML structure may have changed");
  }

  const latest = notices[0];

  return {
    title: latest.title,
    url: "https://gate2026.iitg.ac.in/notifications.html",
    severity: classifySeverity(latest.title),
  };
}
const SCRAPERS = {
  nta: scrapeNTA,
  'jee-main': scrapeJEEMain,   // was: jeemain
  neet: scrapeNEET,
  gate: scrapeGATE,
};

export async function scrapeBySlug(slug) {
  const scraperFn = SCRAPERS[slug];
  if (!scraperFn) {
    throw new Error(`No scraper defined for slug: ${slug}`);
  }
  return scraperFn();
}