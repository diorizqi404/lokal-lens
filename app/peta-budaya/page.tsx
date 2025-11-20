import HeroSection from "@/components/sections/PetaBudaya/HeroSection";
import MapSection from "@/components/sections/PetaBudaya/MapSection";
import ProvinceCollectionSection from "@/components/sections/PetaBudaya/ProvinceCollectionSection";

export default function PetaBudayaPage() {
  return (
    <main className="w-full bg-white">
      <HeroSection />
      <MapSection />
      <ProvinceCollectionSection />
    </main>
  );
}
