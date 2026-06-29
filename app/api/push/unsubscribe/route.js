import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  await User.findByIdAndUpdate(session.user.id, { $unset: { pushSubscription: "" } });

  return NextResponse.json({ ok: true });
}