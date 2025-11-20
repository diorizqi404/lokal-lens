import HeroSection from "@/components/sections/BudayaTerancam/HeroSection";
import SearchFilterSection from "@/components/sections/BudayaTerancam/SearchFilterSection";
import ReportGridSection from "@/components/sections/BudayaTerancam/ReportGridSection";

export default function BudayaTerancamPage() {
  return (
    <main className="w-full bg-white">
      <HeroSection />
      <SearchFilterSection />
      <ReportGridSection />
    </main>
  );
}
