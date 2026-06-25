import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSiteBySlug } from "@/lib/sites";
import { sendTelegramMessage } from "@/lib/telegram";

const SEVERITY_EMOJI = { CRITICAL: "🔴", SOON: "🟡" };

export async function notifyUsers(slug, change) {
  await dbConnect();

  const site = getSiteBySlug(slug);
  if (!site) return;

  const users = await User.find({
    enabledSites: slug,
    telegramChatId: { $ne: null },
  }).select("telegramChatId");

  const emoji = SEVERITY_EMOJI[change.severity] || "🔵";
  const text = `${emoji} ${change.severity}: ${site.name}\n${change.title}${
    change.url ? `\n${change.url}` : ""
  }`;

  await Promise.allSettled(
    users.map((user) => sendTelegramMessage(user.telegramChatId, text))
  );
}