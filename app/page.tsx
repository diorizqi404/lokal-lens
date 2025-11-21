import HeroSection from "@/components/sections/Home/HeroSection";
import FeaturesSection from "@/components/sections/Home/FeaturesSection";
import CulturalShowcaseSection from "@/components/sections/Home/CulturalShowcaseSection";
import TestimonialsSection from "@/components/sections/Home/TestimonialsSection";
import ProductsSection from "@/components/sections/Home/EventsSection";

export default function Home() {
  return (
    <main className="w-full bg-white">
      <HeroSection />
      <FeaturesSection />
      <CulturalShowcaseSection />
      <TestimonialsSection />
      <ProductsSection />
    </main>
  );
}
