import { NextResponse } from "next/server";
import { runCategoryScan } from "@/lib/runCategoryScan";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await runCategoryScan("internships");

  return NextResponse.json({ ranAt: new Date().toISOString(), summary });
}