'use client';

import { useState } from 'react';

type FilterType = 'all' | 'earned' | 'locked';

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
  points: number;
}

interface UserBadge {
  id: number;
  badge: Badge;
  earned_at: string;
}

interface BadgeCollectionSectionProps {
  profileData?: {
    badges: {
      earned: UserBadge[];
      all: Badge[];
      stats: {
        total: number;
        earned: number;
        percentage: number;
      };
    };
  };
}

const BadgeCollectionSection = ({ profileData }: BadgeCollectionSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const allBadges = profileData?.badges.all || [];
  const earnedBadgeIds = new Set(profileData?.badges.earned.map(ub => ub.badge.id) || []);
  
  const earnedCount = profileData?.badges.stats.earned || 0;
  const lockedCount = (profileData?.badges.stats.total || 0) - earnedCount;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      explorer: 'rgba(212, 160, 23, 0.10)',
      collector: 'rgba(0, 108, 132, 0.10)',
      master: 'rgba(192, 57, 43, 0.10)',
      social: 'rgba(16, 185, 129, 0.10)',
      special: 'rgba(147, 51, 234, 0.10)',
    };
    return colors[category] || 'rgba(229, 231, 235, 1)';
  };

  const getCategoryIconColor = (category: string, isEarned: boolean) => {
    if (!isEarned) return '#9CA3AF';
    
    const colors: Record<string, string> = {
      explorer: '#D4A017',
      collector: '#006C84',
      master: '#C0392B',
      social: '#10B981',
      special: '#9333EA',
    };
    return colors[category] || '#1A1A1A';
  };

  const filteredBadges = allBadges.filter(badge => {
    const isEarned = earnedBadgeIds.has(badge.id);
    if (activeFilter === 'all') return true;
    if (activeFilter === 'earned') return isEarned;
    if (activeFilter === 'locked') return !isEarned;
    return true;
  });

  const getEarnedDate = (badgeId: number) => {
    const userBadge = profileData?.badges.earned.find(ub => ub.badge.id === badgeId);
    if (!userBadge) return null;
    
    const date = new Date(userBadge.earned_at);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <section className="w-full bg-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="px-4 py-3">
            <h2 className="text-[22px] font-bold leading-[27.5px] tracking-[-0.33px] text-[#1A1A1A]">
              Koleksi Lencanamu
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {earnedCount} dari {allBadges.length} lencana terkumpul
            </p>
          </div>

          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F3F4F6] self-start ml-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium leading-[21px] transition-all ${
                activeFilter === 'all'
                  ? 'bg-white text-[#1A1A1A] shadow-sm'
                  : 'bg-transparent text-[#6B7280]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveFilter('earned')}
              className={`px-4 py-2 rounded-full text-sm font-medium leading-[21px] transition-all ${
                activeFilter === 'earned'
                  ? 'bg-white text-[#1A1A1A] shadow-sm'
                  : 'bg-transparent text-[#6B7280]'
              }`}
            >
              Diperoleh ({earnedCount})
            </button>
            <button
              onClick={() => setActiveFilter('locked')}
              className={`px-4 py-2 rounded-full text-sm font-medium leading-[21px] transition-all ${
                activeFilter === 'locked'
                  ? 'bg-white text-[#1A1A1A] shadow-sm'
                  : 'bg-transparent text-[#6B7280]'
              }`}
            >
              Terkunci ({lockedCount})
            </button>
          </div>

          {filteredBadges.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="text-6xl mb-4">🏆</div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Belum ada lencana
              </p>
              <p className="text-sm text-gray-500 text-center max-w-md">
                Mulai jelajahi budaya Indonesia untuk mendapatkan lencana pertamamu!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
              {filteredBadges.map((badge) => {
                const isEarned = earnedBadgeIds.has(badge.id);
                const earnedDate = getEarnedDate(badge.id);
                const bgColor = isEarned ? getCategoryColor(badge.category) : '#E5E7EB';
                const iconColor = getCategoryIconColor(badge.category, isEarned);

                return (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center gap-3 p-6 rounded-[24px] bg-[#F4EBD0] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl ${
                        !isEarned ? 'opacity-50 grayscale' : ''
                      }`}
                      style={{ background: bgColor }}
                    >
                      {badge.icon}
                    </div>

                    <h3
                      className={`text-base font-bold leading-6 text-center ${
                        !isEarned ? 'text-[#9CA3AF]' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {badge.name}
                    </h3>

                    <p
                      className={`text-xs leading-4 text-center font-medium ${
                        !isEarned ? 'text-[#006C84]' : 'text-[#6B7280]'
                      }`}
                    >
                      {isEarned ? `Diperoleh: ${earnedDate}` : badge.requirement}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BadgeCollectionSection;
