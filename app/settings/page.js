import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getSitesByCategory } from "@/lib/sites";
import { ONBOARDING_CATEGORIES } from "@/lib/onboardingCategories";
import ManageCategoriesForm from "@/components/ManageCategoriesForm";

export default async function SettingsPage() {
  const session = await auth();
  await dbConnect();
  const user = await User.findById(session.user.id).lean();
  const enabledSites = user?.enabledSites || [];

  const initialSelected = Object.fromEntries(
    ONBOARDING_CATEGORIES.map((cat) => {
      const categorySlugs = getSitesByCategory(cat.id).map((s) => s.slug);
      const isEnabled = categorySlugs.some((slug) => enabledSites.includes(slug));
      return [cat.id, isEnabled];
    })
  );

  return <ManageCategoriesForm initialSelected={initialSelected} />;
}