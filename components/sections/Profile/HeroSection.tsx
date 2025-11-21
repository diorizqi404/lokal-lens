'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';

interface HeroSectionProps {
  profileData?: {
    user: {
      full_name: string;
    };
    profile: {
      avatar?: string;
      provinces_visited: number;
    };
    stats: {
      badges_earned: number;
    };
  };
  onAvatarUpdate?: () => void;
}

const HeroSection = ({ profileData, onAvatarUpdate }: HeroSectionProps) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userName = profileData?.user.full_name || user?.name || 'Pengguna';
  const avatar = profileData?.profile?.avatar || user?.avatar;
  const provincesVisited = profileData?.profile?.provinces_visited || 0;
  const badgesEarned = profileData?.stats?.badges_earned || 0;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa gambar');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran file maksimal 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Gagal upload avatar');
      }

      // Trigger refetch profile data
      if (onAvatarUpdate) {
        onAvatarUpdate();
      } else {
        // Reload page if no callback provided
        window.location.reload();
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Gagal upload avatar');
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleShare = async () => {
    // Redirect to share page instead of direct sharing
    window.location.href = '/profil/bagikan';
  };

  return (
    <section className="w-full bg-white pt-8 sm:pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] bg-[#221C10] px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
              {/* Avatar with upload */}
              <div className="relative w-[109px] h-[109px] flex-shrink-0">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-500 overflow-hidden">
                  {avatar ? (
                    <Image 
                      src={avatar} 
                      alt={userName} 
                      width={109} 
                      height={109}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23F7F7F7"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F7F7F7" className="w-16 h-16">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Upload button overlay */}
                <button
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-green hover:bg-[#0BC943] transition-colors flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Upload avatar"
                >
                  {isUploading ? (
                    <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  )}
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="text-2xl sm:text-[32px] font-bold leading-[27.5px] tracking-[-0.33px] text-[#F7F7F7]">
                  Jejak Budaya Anda
                </h1>
                <p className="text-base sm:text-xl font-normal leading-6 text-[#F7F7F7] max-w-[524px]">
                  Selamat, {userName.split(' ')[0]}! Kamu telah menjelajahi {provincesVisited} provinsi dan meraih {badgesEarned} lencana.
                </p>
                {uploadError && (
                  <p className="text-sm text-red-400">
                    {uploadError}
                  </p>
                )}
              </div>
            </div>

            <button 
              onClick={handleShare}
              className="flex items-center justify-center px-4 py-3 sm:px-4 sm:py-[17.5px] rounded-full bg-[#F0F4F4] hover:bg-white transition-colors whitespace-nowrap min-w-[196px] h-[76px] self-end md:self-auto"
            >
              <span className="text-base font-bold leading-[21px] tracking-[0.21px] text-[#111818] text-center">
                Bagikan Pencapaian
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
