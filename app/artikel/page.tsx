import HeroSection from "@/components/sections/Artikel/HeroSection";
import SearchSection from "@/components/sections/Artikel/SearchSection";
import ArticleGridSection from "@/components/sections/Artikel/ArticleGridSection";
import PaginationSection from "@/components/sections/Artikel/PaginationSection";

export default function ArtikelPage() {
  return (
    <main className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <SearchSection />
        <ArticleGridSection />
        <PaginationSection />
      </div>
    </main>
  );
}
