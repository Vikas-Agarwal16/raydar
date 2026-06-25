import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

async function sendMessage(chatId, text) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function POST(request) {
  // Confirms the request really came from Telegram, not a random POST to a guessable
  // URL — Telegram echoes back whatever secret_token we set in setWebhook (Phase 3)
  // as this header on every call. Same idea as the CRON_SECRET bearer check.
  const secret = request.headers.get("x-telegram-bot-api-secret-token");
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const update = await request.json();
  const message = update.message;

  if (message?.text?.startsWith("/start")) {
    const chatId = message.chat.id;
    const userId = message.text.split(" ")[1]; // deep-link payload — Raydar's Mongo _id

    if (userId) {
      await dbConnect();
      const user = await User.findByIdAndUpdate(userId, {
        telegramChatId: String(chatId),
      });

      await sendMessage(
        chatId,
        user
          ? "✅ Raydar connected. Critical alerts land here instantly from now on."
          : "Couldn't find your Raydar account — try the Connect button again from your dashboard."
      );
    }
  }

  // Telegram retries the same update on anything but a 200, so always return ok.
  return NextResponse.json({ ok: true });
}