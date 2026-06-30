import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session) redirect("/signin");

  await dbConnect();

  const user = await User.findById(session.user.id).select(
    "name email onboardingComplete"
  );
  if (!user?.onboardingComplete) redirect("/onboarding");

  return (
    <div className="min-h-screen bg-[#06080A] flex">
      <Sidebar user={{ name: user.name, email: user.email }} />

      <main className="flex-1 px-8 py-8 lg:px-12 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}