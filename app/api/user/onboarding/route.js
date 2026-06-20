import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSitesByCategory } from "@/lib/sites";

export async function PATCH(req) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { exams, internships, hackathons } = await req.json();

  let enabledSites = [...getSitesByCategory("counselling").map((s) => s.slug)]; // always on

  if (exams) enabledSites.push(...getSitesByCategory("exams").map((s) => s.slug));
  if (internships) enabledSites.push(...getSitesByCategory("internships").map((s) => s.slug));
  if (hackathons) enabledSites.push(...getSitesByCategory("hackathons").map((s) => s.slug));

  await dbConnect();

  await User.findByIdAndUpdate(session.user.id, {
    enabledSites,
    onboardingComplete: true,
  });

  return NextResponse.json({ success: true, enabledSites });
}