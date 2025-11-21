'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/sections/Profile/HeroSection';
import ProgressSection from '@/components/sections/Profile/ProgressSection';
import AchievementBanner from '@/components/sections/Profile/AchievementBanner';
import BadgeCollectionSection from '@/components/sections/Profile/BadgeCollectionSection';

interface ProfileData {
  user: {
    id: number;
    email: string;
    full_name: string;
    role: string;
    created_at: string;
  };
  profile: {
    id: number;
    user_id: number;
    bio: string | null;
    avatar: string | null;
    provinces_visited: number;
    badges_earned: number;
    created_at: string;
    updated_at: string;
  } | null;
  badges: {
    earned: Array<{
      id: number;
      badge: {
        id: number;
        name: string;
        description: string;
        icon: string;
        category: string;
        requirement: string;
        points: number;
      };
      earned_at: string;
    }>;
    all: Array<{
      id: number;
      name: string;
      description: string;
      icon: string;
      category: string;
      requirement: string;
      points: number;
    }>;
    stats: {
      total: number;
      earned: number;
      percentage: number;
    };
  };
  challenges: {
    completed: Array<{
      id: number;
      challenge: {
        id: number;
        title: string;
        description: string;
        category: string;
        difficulty: string;
        points: number;
        requirements: string;
      };
      completed_at: string;
    }>;
    all: Array<{
      id: number;
      title: string;
      description: string;
      category: string;
      difficulty: string;
      points: number;
      requirements: string;
    }>;
    stats: {
      total: number;
      completed: number;
      percentage: number;
    };
  };
  certificates: Array<{
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    date_earned: string;
    certificate_url: string | null;
  }>;
  stats: {
    total_points: number;
    provinces_visited: number;
    badges_earned: number;
    challenges_completed: number;
  };
}

export default function ProfilPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user/profile', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Fetch profile error:', error);
      setError('Gagal memuat data profil');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push('/masuk');
      return;
    }

    fetchProfile();
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <main className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Memuat profil...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 px-4">
          <div className="text-6xl">⚠️</div>
          <p className="text-lg font-semibold text-gray-700">{error}</p>
          <button
            onClick={fetchProfile}
            className="px-6 py-3 bg-primary-green text-white font-semibold rounded-full hover:bg-[#0BC943] transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-white">
      <HeroSection 
        profileData={profileData ? {
          user: { full_name: profileData.user.full_name },
          profile: {
            avatar: profileData.profile?.avatar || undefined,
            provinces_visited: profileData.profile?.provinces_visited || 0
          },
          stats: {
            badges_earned: profileData.stats.badges_earned
          }
        } : undefined} 
        onAvatarUpdate={fetchProfile} 
      />
      <ProgressSection provincesVisited={profileData?.profile?.provinces_visited || 0} />
      <AchievementBanner certificates={profileData?.certificates} />
      <BadgeCollectionSection profileData={profileData || undefined} />
    </main>
  );
}
