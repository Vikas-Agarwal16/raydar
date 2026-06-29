import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import WhyRaydar from "@/components/WhyRaydar";
import HowItWorks from "@/components/HowItWorks";
import Sectors from "@/components/Sectors";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsStrip />
      <WhyRaydar />
      <HowItWorks />
      <Sectors />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
