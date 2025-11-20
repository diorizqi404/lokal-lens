import HeroSection from "@/components/sections/ScanBudaya/HeroSection";
import ScannerSection from "@/components/sections/ScanBudaya/ScannerSection";
import ResultsSection from "@/components/sections/ScanBudaya/ResultsSection";

export default function ScanBudayaPage() {
  return (
    <main className="w-full max-w-7xl mx-auto bg-white">
      <HeroSection />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12 sm:pb-16 lg:pb-24">
          <ScannerSection />
          <ResultsSection />
        </div>
      </div>
    </main>
  );
}
