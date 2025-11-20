'use client';

import HeroSection from '@/components/sections/ListKuis/HeroSection';
import QuizGridSection from '@/components/sections/ListKuis/QuizGridSection';

export default function KuisPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <QuizGridSection />
    </div>
  );
}
