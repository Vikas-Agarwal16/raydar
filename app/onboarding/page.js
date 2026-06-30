import { redirect } from "next/navigation";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSitesByCategory } from "@/lib/sites";
import { ONBOARDING_CATEGORIES } from "@/lib/onboardingCategories";
import OnboardingForm from "@/components/OnboardingForm";


export async function PATCH(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  // body = { exams: true, internships: false, hackathons: true, counselling: true }
  // counselling is now a real toggle — no longer auto-injected regardless of input.
  const enabledSites = ONBOARDING_CATEGORIES.flatMap((cat) =>
    body[cat.id] ? getSitesByCategory(cat.id).map((s) => s.slug) : []
  );

  await dbConnect();
  await User.findByIdAndUpdate(session.user.id, {
    enabledSites,
    onboardingComplete: true,
  });

  return Response.json({ ok: true, enabledSites });
}

export default async function OnboardingPage() {
  const session = await auth();

  if (session?.user?.id) {
    await dbConnect();
    const user = await User.findById(session.user.id).select("onboardingComplete");

    if (user?.onboardingComplete) {
      redirect("/dashboard");
    }
  }

  return <OnboardingForm />;
}