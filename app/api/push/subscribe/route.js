import { NextResponse } from "next/server";
import { auth } from "@/auth"; // adjust path to match your actual auth.js export
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscription = await request.json();

  // Basic shape validation — a malformed subscription object would
  // silently fail later at send-time inside web-push, which is much
  // harder to debug than rejecting it here at the door.
  if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
    return NextResponse.json({ error: "Invalid subscription object" }, { status: 400 });
  }

  await dbConnect();

  await User.findByIdAndUpdate(session.user.id, {
    pushSubscription: subscription,
  });

  return NextResponse.json({ ok: true });
}