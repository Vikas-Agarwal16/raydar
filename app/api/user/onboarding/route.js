import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSitesByCategory } from "@/lib/sites";
import { ONBOARDING_CATEGORIES } from "@/lib/onboardingCategories";

export async function PATCH(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  // No category is auto-included anymore — counselling included.
  const enabledSites = ONBOARDING_CATEGORIES.flatMap((cat) =>
    body[cat.id] ? getSitesByCategory(cat.id).map((s) => s.slug) : []
  );

  await dbConnect();
  await User.findByIdAndUpdate(session.user.id, {
    enabledSites,
    onboardingComplete: true,
  });

  return NextResponse.json({ success: true, enabledSites });
}