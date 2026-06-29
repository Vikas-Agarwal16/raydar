import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import OnboardingForm from "@/components/OnboardingForm";
import RadarBackground from "@/components/RadarBackground";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  await dbConnect();
  const user = await User.findById(session.user.id).select("onboardingComplete");

  if (user?.onboardingComplete) {
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen bg-[#06080A] flex items-center justify-center px-4 py-12">
      <RadarBackground />
      <OnboardingForm />
    </main>
  );
}