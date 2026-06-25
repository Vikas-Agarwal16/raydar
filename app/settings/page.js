import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSitesByCategory } from "@/lib/sites";
import ManageCategoriesForm from "@/components/ManageCategoriesForm";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) redirect("/signin");

  await dbConnect();
  const user = await User.findById(session.user.id).select("enabledSites");

  const initialAnswers = {
    exams: getSitesByCategory("exams").some((s) => user.enabledSites.includes(s.slug)),
    internships: getSitesByCategory("internships").some((s) => user.enabledSites.includes(s.slug)),
    hackathons: getSitesByCategory("hackathons").some((s) => user.enabledSites.includes(s.slug)),
  };

  return (
    <main className="min-h-screen bg-[#06080A] flex items-center justify-center px-4">
      <ManageCategoriesForm initialAnswers={initialAnswers} />
    </main>
  );
}