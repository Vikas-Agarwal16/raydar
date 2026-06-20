import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import OnboardingForm from "@/components/OnboardingForm";

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
    <main className="min-h-screen bg-[#0B0C10] flex items-center justify-center px-4">
      <OnboardingForm />
    </main>
  );
}