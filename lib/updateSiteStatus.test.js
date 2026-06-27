import { updateSiteStatus } from "./updateSiteStatus";
import dbConnect from "@/lib/mongodb";
import SiteStatus from "@/models/SiteStatus";
import { scrapeBySlug } from "@/lib/scraper";

jest.mock("@/lib/mongodb", () => jest.fn());
jest.mock("@/models/SiteStatus", () => ({
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
}));
jest.mock("@/lib/scraper", () => ({
  scrapeBySlug: jest.fn(),
}));

function getSetArg() {
  return SiteStatus.findOneAndUpdate.mock.calls[0][1].$set;
}

beforeEach(() => {
  jest.clearAllMocks();
  SiteStatus.findOneAndUpdate.mockResolvedValue({});
});

test("calls dbConnect before doing anything else", async () => {
  SiteStatus.findOne.mockResolvedValue(null);
  scrapeBySlug.mockResolvedValue({ title: "T", url: "u", severity: "MINOR" });

  await updateSiteStatus("slug");

  expect(dbConnect).toHaveBeenCalled();
});

test("first run: changed true but shouldNotify false (no baseline to alert against)", async () => {
  SiteStatus.findOne.mockResolvedValue(null);
  scrapeBySlug.mockResolvedValue({
    title: "JEE Main Admit Card Released",
    url: "https://x",
    severity: "CRITICAL",
  });

  const result = await updateSiteStatus("jee");

  expect(result.changed).toBe(true);
  expect(result.shouldNotify).toBe(false);
  expect(getSetArg().lastTitle).toBe("JEE Main Admit Card Released");
});

test("title unchanged: changed false, shouldNotify false, lastChangedAt not set", async () => {
  SiteStatus.findOne.mockResolvedValue({ slug: "jee", lastTitle: "Same Title" });
  scrapeBySlug.mockResolvedValue({
    title: "Same Title",
    url: "https://x",
    severity: "MINOR",
  });

  const result = await updateSiteStatus("jee");

  expect(result.changed).toBe(false);
  expect(result.shouldNotify).toBe(false);
  expect(getSetArg().lastChangedAt).toBeUndefined();
});

test("title changed on existing doc: changed true, shouldNotify true, lastChangedAt set", async () => {
  SiteStatus.findOne.mockResolvedValue({ slug: "jee", lastTitle: "Old Title" });
  scrapeBySlug.mockResolvedValue({
    title: "New Title",
    url: "https://x",
    severity: "CRITICAL",
  });

  const result = await updateSiteStatus("jee");

  expect(result.changed).toBe(true);
  expect(result.shouldNotify).toBe(true);
  expect(getSetArg().lastChangedAt).toBeInstanceOf(Date);
});

test("scraped.title null: does not overwrite stored lastTitle/url, changed false, severity still updates", async () => {
  SiteStatus.findOne.mockResolvedValue({
    slug: "amazon",
    lastTitle: "SDE Intern 2026",
  });
  scrapeBySlug.mockResolvedValue({ title: null, url: null, severity: "WATCHING" });

  const result = await updateSiteStatus("amazon");

  const setArg = getSetArg();
  expect(result.changed).toBe(false);
  expect(result.shouldNotify).toBe(false);
  expect(setArg.lastTitle).toBeUndefined(); // key absent → existing DB value untouched
  expect(setArg.url).toBeUndefined();
  expect(setArg.lastChangedAt).toBeUndefined();
  expect(setArg.severity).toBe("WATCHING"); // severity always updates
  expect(setArg.lastCheckedAt).toBeInstanceOf(Date); // always updates
});

test("scraped.title null on first run: does not count as first real baseline change", async () => {
  SiteStatus.findOne.mockResolvedValue(null);
  scrapeBySlug.mockResolvedValue({ title: null, url: null, severity: "WATCHING" });

  const result = await updateSiteStatus("amazon");

  expect(result.changed).toBe(false);
  expect(result.shouldNotify).toBe(false);
});

test("findOneAndUpdate always called with upsert true", async () => {
  SiteStatus.findOne.mockResolvedValue(null);
  scrapeBySlug.mockResolvedValue({ title: "T", url: "u", severity: "MINOR" });

  await updateSiteStatus("newslug");

  expect(SiteStatus.findOneAndUpdate.mock.calls[0][2]).toEqual({
    upsert: true,
    new: true,
  });
  expect(SiteStatus.findOneAndUpdate.mock.calls[0][0]).toEqual({
    slug: "newslug",
  });
});

test("returns severity/title/url from scrape result regardless of changed state", async () => {
  SiteStatus.findOne.mockResolvedValue({ slug: "x", lastTitle: "A" });
  scrapeBySlug.mockResolvedValue({ title: "A", url: "u", severity: "NOISE" });

  const result = await updateSiteStatus("x");

  expect(result.severity).toBe("NOISE");
  expect(result.title).toBe("A");
  expect(result.url).toBe("u");
});
