import webpush from "web-push";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Sends a push notification to a single subscription. Returns {ok, error}
// instead of throwing — same pattern as sendDigestEmail and sendTelegramMessage,
// so the caller can decide whether one failed push should stop a batch.
export async function sendPushNotification(subscription, payload) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return { ok: true };
  } catch (err) {
    // Status 410 (Gone) or 404 means the subscription is dead — the user
    // uninstalled, cleared browser data, or revoked permission. This is
    // expected and common, not a real error — the caller (Step 8) needs
    // this distinction to know when to clear pushSubscription from the DB.
    if (err.statusCode === 410 || err.statusCode === 404) {
      return { ok: false, expired: true, error: err.message };
    }
    console.error("Push send failed:", err.message);
    return { ok: false, expired: false, error: err.message };
  }
}