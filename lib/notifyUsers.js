import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSiteBySlug } from "@/lib/sites";
import { sendTelegramMessage } from "@/lib/telegram";
import { sendPushNotification } from "@/lib/webpush";

const SEVERITY_EMOJI = { CRITICAL: "🔴", SOON: "🟡" };

export async function notifyUsers(slug, change) {
  await dbConnect();

  const site = getSiteBySlug(slug);
  if (!site) return;

  // Broadened to match users who have EITHER channel enabled — previously
  // only matched telegramChatId, which silently excluded any user who'd
  // enabled push but never linked Telegram.
  const users = await User.find({
    enabledSites: slug,
    $or: [{ telegramChatId: { $ne: null } }, { pushSubscription: { $ne: null } }],
  }).select("telegramChatId pushSubscription");

  const emoji = SEVERITY_EMOJI[change.severity] || "🔵";
  const text = `${emoji} ${change.severity}: ${site.name}\n${change.title}${
    change.url ? `\n${change.url}` : ""
  }`;

  const tasks = [];

  for (const user of users) {
    if (user.telegramChatId) {
      tasks.push(sendTelegramMessage(user.telegramChatId, text));
    }

    if (user.pushSubscription) {
      // Push payload is structured data (title/body/url), not a flat
      // string — sw.js's push listener (Step 4) expects this exact shape
      // and reads data.title/data.body/data.url separately.
      tasks.push(
        sendPushNotification(user.pushSubscription, {
          title: `${emoji} ${change.severity}: ${site.name}`,
          body: change.title,
          url: change.url || "/dashboard",
        }).then((result) => {
          // If the push service says this subscription is dead, clear it
          // from the user's doc now — otherwise we'd keep retrying a
          // permanently broken endpoint on every future alert, and the
          // dashboard would keep showing "push enabled" when it isn't.
          if (result.expired) {
            return User.findByIdAndUpdate(user._id, { pushSubscription: null });
          }
        })
      );
    }
  }

  await Promise.allSettled(tasks);
}