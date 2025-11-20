import HeroSection from '@/components/sections/Profile/HeroSection';
import ProgressSection from '@/components/sections/Profile/ProgressSection';
import AchievementBanner from '@/components/sections/Profile/AchievementBanner';
import BadgeCollectionSection from '@/components/sections/Profile/BadgeCollectionSection';

export default function ProfilPage() {
  return (
    <main className="w-full bg-white">
      <HeroSection />
      <ProgressSection />
      <AchievementBanner />
      <BadgeCollectionSection />
    </main>
  );
}
