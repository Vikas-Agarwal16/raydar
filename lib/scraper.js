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

export async function scrapeJoSAA() {
  const html = await fetchHTML("https://josaa.nic.in");
  const $ = cheerio.load(html);

  const notices = [];

  $(".newsticker.flexslider .slides li:not(.clone) .with-urlchange").each((i, el) => {
    const item = $(el).clone();
    item.find(".latest-news").remove(); // strip the "New" badge text before reading
    const title = item.text().trim().replace(/\s+/g, " ");
    if (title) {
      notices.push({ title });
    }
  });

  if (notices.length === 0) {
    throw new Error("No notices found — JoSAA's HTML structure may have changed");
  }

  const latest = notices[0];

  return {
    title: latest.title,
    url: null, // confirmed: no <a> tag in the ticker, URL is embedded plain text
    severity: classifySeverity(latest.title),
  };
}

export async function scrapeCSAB() {
  const html = await fetchHTML("https://csab.nic.in");
  const $ = cheerio.load(html);

  const notices = [];

  $(".newsticker.flexslider .slides li:not(.clone) .with-urlchange").each((i, el) => {
    const item = $(el).clone();
    item.find(".latest-news").remove();
    const title = item.text().trim().replace(/\s+/g, " ");
    if (title) {
      notices.push({ title });
    }
  });

  if (notices.length === 0) {
    throw new Error("No notices found — CSAB's HTML structure may have changed");
  }

  const latest = notices[0];

  return {
    title: latest.title,
    url: null,
    severity: classifySeverity(latest.title),
  };
}

export async function scrapeMCC() {
  const html = await fetchHTML("https://mcc.nic.in");
  const $ = cheerio.load(html);

  const notices = [];

  $(".newsticker.flexslider .slides li:not(.clone) .with-urlchange").each((i, el) => {
    const item = $(el).clone();
    item.find(".latest-news").remove();
    const title = item.text().trim().replace(/\s+/g, " ");
    if (title) {
      notices.push({ title });
    }
  });

  if (notices.length === 0) {
    throw new Error("No notices found — MCC's HTML structure may have changed");
  }

  const latest = notices[0];

  return {
    title: latest.title,
    url: null,
    severity: classifySeverity(latest.title),
  };
}

export async function scrapeUPTAC() {
  const html = await fetchHTML("https://uptac.samarth.edu.in");
  const $ = cheerio.load(html);

  const noticesCard = $("h5.fw-bold")
    .filter((i, el) => $(el).text().trim() === "Public Notices")
    .closest(".card");

  const notices = [];

  noticesCard.find("h6.fw-semibold").each((i, el) => {
    const titleEl = $(el).clone();
    titleEl.find(".badge").remove(); // strip "NEW" badge text
    const title = titleEl.text().trim().replace(/\s+/g, " ");
    const href = $(el).parent().find("a").attr("href") || null;

    if (title) {
      notices.push({ title, url: href });
    }
  });

  if (notices.length === 0) {
    throw new Error("No notices found — UPTAC's HTML structure may have changed");
  }

  const latest = notices[0];

  return {
    title: latest.title,
    url: latest.url,
    severity: classifySeverity(latest.title),
  };
}

export async function scrapeDevfolio() {
  const html = await fetchHTML("https://devfolio.co/hackathons");
  const $ = cheerio.load(html);

  const hackathons = [];

  $("h3").each((i, el) => {
    const title = $(el).text().trim();
    const href = $(el).closest("a").attr("href") || null;
    if (title) {
      hackathons.push({ title, url: href });
    }
  });

  if (hackathons.length === 0) {
    throw new Error("No hackathons found — Devfolio's HTML structure may have changed");
  }

  const latest = hackathons[0];

  return {
    title: latest.title,
    url: latest.url,
    severity: classifySeverity(latest.title),
  };
}

export async function scrapeUnstopHackathons() {
  const html = await fetchHTML("https://api.unstop.com/hackathons");
  const $ = cheerio.load(html);

  const hackathons = [];

  $("a.single_profile").each((i, el) => {
    const title = $(el).find("h2.double-wrap").text().trim();
    const href = $(el).attr("href");
    if (title) {
      hackathons.push({ title, url: href });
    }
  });

  if (hackathons.length === 0) {
    throw new Error("No hackathons found — Unstop's HTML structure may have changed");
  }

  const latest = hackathons[0];

  return {
    title: latest.title,
    url: latest.url ? `https://unstop.com${latest.url}` : null,
    severity: classifySeverity(latest.title),
  };
}

export async function scrapeUnstopInternships() {
  const html = await fetchHTML("https://api.unstop.com/internship");
  const $ = cheerio.load(html);

  const internships = [];

  $("a.single_profile").each((i, el) => {
    const title = $(el).find("h2.double-wrap").text().trim();
    const href = $(el).attr("href");
    if (title) {
      internships.push({ title, url: href });
    }
  });

  if (internships.length === 0) {
    throw new Error("No internships found — Unstop's HTML structure may have changed");
  }

  const latest = internships[0];

  return {
    title: latest.title,
    url: latest.url ? `https://unstop.com${latest.url}` : null,
    severity: classifySeverity(latest.title),
  };
}



const SCRAPERS = {
  nta: scrapeNTA,
  'jee-main': scrapeJEEMain,
  neet: scrapeNEET,
  gate: scrapeGATE,
  josaa: scrapeJoSAA,
  csab: scrapeCSAB,
  mcc: scrapeMCC,
  uptac: scrapeUPTAC,
  devfolio: scrapeDevfolio,
  'unstop-hackathons': scrapeUnstopHackathons,
  'unstop-internships': scrapeUnstopInternships,
};;

export async function scrapeBySlug(slug) {
  const scraperFn = SCRAPERS[slug];
  if (!scraperFn) {
    throw new Error(`No scraper defined for slug: ${slug}`);
  }
  return scraperFn();
}