'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface AchievementData {
  user: {
    id: number;
    full_name: string;
    avatar?: string;
  };
  badge: {
    id: number;
    name: string;
    description: string;
    icon: string;
    category: string;
    earned_at: string;
  };
  profile: {
    provinces_visited: number;
    badges_earned: number;
  };
}

export default function PublicSharePage() {
  const params = useParams();
  const shareId = params.id as string;
  
  const [achievementData, setAchievementData] = useState<AchievementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shareId) {
      fetchPublicAchievement();
    }
  }, [shareId]);

  const fetchPublicAchievement = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/share-achievement/${shareId}`);

      if (!response.ok) {
        throw new Error('Pencapaian tidak ditemukan');
      }

      const data = await response.json();
      setAchievementData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching public achievement:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat pencapaian...</p>
        </div>
      </main>
    );
  }

  if (error || !achievementData) {
    return (
      <main className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Pencapaian Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-6">
            Link yang Anda akses mungkin sudah tidak valid atau telah dihapus.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary-green text-white rounded-full font-medium hover:bg-[#0BC943] transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    );
  }

  const percentage = Math.round((achievementData.profile.provinces_visited / 38) * 100);

  return (
    <main className="w-full bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-[#1A1A1A] mb-3">
            Pencapaian Budaya
          </h1>
          <p className="text-base text-[#6B7280]">
            {achievementData.user.full_name} telah meraih pencapaian baru!
          </p>
        </div>

        {/* Achievement Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            {/* User Info Section */}
            <div className="bg-gradient-to-b from-[#006C84] to-[#00A8CC] px-6 sm:px-8 py-12 text-center">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  {achievementData.user.avatar ? (
                    <Image
                      src={achievementData.user.avatar}
                      alt={achievementData.user.full_name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                        <circle cx="16" cy="12" r="5" fill="#999"/>
                        <path d="M6 26C6 21.5817 9.58172 18 14 18H18C22.4183 18 26 21.5817 26 26V26H6V26Z" fill="#999"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* User Name */}
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {achievementData.user.full_name}
              </h2>

              {/* Stats */}
              <div className="flex items-center justify-center gap-6 text-white/90">
                <div>
                  <p className="text-2xl font-bold">{achievementData.profile.provinces_visited}</p>
                  <p className="text-sm">Provinsi</p>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div>
                  <p className="text-2xl font-bold">{achievementData.profile.badges_earned}</p>
                  <p className="text-sm">Lencana</p>
                </div>
              </div>
            </div>

            {/* Badge Section */}
            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <p className="text-sm font-medium text-[#6B7280] mb-4">
                  Lencana Terbaru
                </p>

                {/* Badge Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[rgba(212,160,23,0.1)] flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 sm:w-20 sm:h-20">
                      <path d="M15 38L29 34L33 20L19 24L15 38ZM24 32C23.1667 32 22.4583 31.7083 21.875 31.125C21.2917 30.5417 21 29.8333 21 29C21 28.1667 21.2917 27.4583 21.875 26.875C22.4583 26.2917 23.1667 26 24 26C24.8333 26 25.5417 26.2917 26.125 26.875C26.7083 27.4583 27 28.1667 27 29C27 29.8333 26.7083 30.5417 26.125 31.125C25.5417 31.7083 24.8333 32 24 32ZM24 49C21.2333 49 18.6333 48.475 16.2 47.425C13.7667 46.375 11.65 44.95 9.85 43.15C8.05 41.35 6.625 39.2333 5.575 36.8C4.525 34.3667 4 31.7667 4 29C4 26.2333 4.525 23.6333 5.575 21.2C6.625 18.7667 8.05 16.65 9.85 14.85C11.65 13.05 13.7667 11.625 16.2 10.575C18.6333 9.525 21.2333 9 24 9C26.7667 9 29.3667 9.525 31.8 10.575C34.2333 11.625 36.35 13.05 38.15 14.85C39.95 16.65 41.375 18.7667 42.425 21.2C43.475 23.6333 44 26.2333 44 29C44 31.7667 43.475 34.3667 42.425 36.8C41.375 39.2333 39.95 41.35 38.15 43.15C36.35 44.95 34.2333 46.375 31.8 47.425C29.3667 48.475 26.7667 49 24 49ZM24 45C28.4333 45 32.2083 43.4417 35.325 40.325C38.4417 37.2083 40 33.4333 40 29C40 24.5667 38.4417 20.7917 35.325 17.675C32.2083 14.5583 28.4333 13 24 13C19.5667 13 15.7917 14.5583 12.675 17.675C9.55833 20.7917 8 24.5667 8 29C8 33.4333 9.55833 37.2083 12.675 40.325C15.7917 43.4417 19.5667 45 24 45Z" fill="#D4A017"/>
                    </svg>
                  </div>
                </div>

                {/* Badge Name */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3">
                  {achievementData.badge.name}
                </h3>

                {/* Badge Description */}
                <p className="text-base text-[#6B7280] mb-4">
                  {achievementData.badge.description}
                </p>

                {/* Achievement Stats */}
                <div className="inline-block bg-[#F0F9FF] border border-[#BAE6FD] rounded-full px-6 py-3">
                  <p className="text-sm font-medium text-[#0369A1]">
                    Telah menjelajahi <span className="font-bold">{percentage}%</span> Nusantara
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="text-center text-sm text-[#9CA3AF] mt-6">
                Diraih pada {new Date(achievementData.badge.earned_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-[#F9FAFB] px-6 sm:px-8 py-6 text-center border-t border-gray-100">
              <p className="text-sm text-[#6B7280] mb-4">
                Bergabunglah dalam pelestarian budaya Indonesia!
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-primary-green text-white rounded-full font-bold hover:bg-[#0BC943] transition-colors"
              >
                Mulai Petualangan Budaya
              </Link>
            </div>
          </div>
        </div>

        {/* LokalLens Branding */}
        <div className="text-center mt-8">
          <p className="text-sm font-medium text-[#9CA3AF]">
            Powered by <span className="font-bold text-[#006C84]">LokalLens</span>
          </p>
        </div>
      </div>
    </main>
  );
}
