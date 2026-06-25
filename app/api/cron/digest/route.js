import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { buildDigests } from "@/lib/buildDigest";
import { sendDigestEmail } from "@/lib/email";

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const digests = await buildDigests();

  const results = await Promise.allSettled(
    digests.map(async (digest) => {
      const html = buildDigestHtml(digest.changes);
      const result = await sendDigestEmail(
        digest.email,
        `Raydar Digest — ${digest.changes.length} update${digest.changes.length > 1 ? "s" : ""}`,
        html
      );

      if (result.ok) {
        // Only advance the timestamp on actual send success — if email
        // fails, we want the same changes to retry on tomorrow's digest
        // instead of silently marking them as "already sent."
        await User.findByIdAndUpdate(digest.userId, {
          lastDigestSentAt: new Date(),
        });
      }

      return { email: digest.email, ...result };
    })
  );

  return NextResponse.json({
    ranAt: new Date().toISOString(),
    usersDigested: digests.length,
    results: results.map((r) => (r.status === "fulfilled" ? r.value : { error: r.reason?.message })),
  });
}

function buildDigestHtml(changes) {
  const rows = changes
    .map(
      (c) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #333;">${c.title || c.slug}</td>
        <td style="padding:8px;border-bottom:1px solid #333;">
          <a href="${c.url}" style="color:#E8447A;">View</a>
        </td>
      </tr>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;background:#06080A;color:#fff;padding:24px;">
      <h2 style="color:#E8447A;">Raydar Daily Digest</h2>
      <p>Here's what changed across your watched sites:</p>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>
  `;
}