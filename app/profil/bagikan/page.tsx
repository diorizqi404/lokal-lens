'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  shareableId: string;
}

export default function BagikanPencapaianPage() {
  const [achievementData, setAchievementData] = useState<AchievementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchAchievementData();
  }, []);

  const fetchAchievementData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/share-achievement', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data pencapaian');
      }

      const data = await response.json();
      setAchievementData(data);

      // Calculate percentage
      const percentage = Math.round((data.profile.provinces_visited / 38) * 100);
      
      // Set default message
      const defaultMessage = `Bangga menjadi bagian dari pelestarian budaya Indonesia! Saya sudah menjelajahi ${percentage}% Nusantara dan mendapatkan lencana ${data.badge.name}. #LokalLens #BudayaIndonesia #JelajahNusantara`;
      setMessage(defaultMessage);

      // Set share URL
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/profil/bagikan/${data.shareableId}`;
      setShareUrl(url);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching achievement:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    if (!achievementData) return;
    
    const text = encodeURIComponent(message);
    const url = encodeURIComponent(shareUrl);
    
    const shareLinks: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <main className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
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
            {error || 'Tidak ada lencana yang ditemukan'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error ? 'Silakan coba lagi nanti' : 'Dapatkan lencana pertamamu dengan menjelajahi budaya Nusantara!'}
          </p>
          <Link
            href="/profil"
            className="inline-block px-6 py-3 bg-primary-green text-white rounded-full font-medium hover:bg-[#0BC943] transition-colors"
          >
            Kembali ke Profil
          </Link>
        </div>
      </main>
    );
  }

  const percentage = Math.round((achievementData.profile.provinces_visited / 38) * 100);

  return (
    <main className="w-full bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.45px] text-[#1A1A1A] text-center">
            Bagikan Jejak Pencapaian Budayamu!
          </h1>
          <p className="max-w-xl text-sm sm:text-base font-normal leading-6 text-[#6B7280] text-center">
            Tunjukkan pada dunia pencapaianmu dalam melestarikan budaya Nusantara.
            Pilih platform dan sebarkan inspirasi!
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-4">
            {/* Preview Section */}
            <div>
              <h2 className="text-lg font-bold leading-[27px] text-[#1A1A1A] mb-4">
                Pratinjau Postingan
              </h2>
              
              {/* Preview Card */}
              <div className="relative bg-[#F9FAFB] border border-[#E5E7EB] rounded-3xl p-4 sm:p-6 pb-6">
                {/* Avatar */}
                <div className="flex justify-center -mt-12 sm:-mt-14 mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-lg bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                    {achievementData.user.avatar ? (
                      <Image
                        src={achievementData.user.avatar}
                        alt={achievementData.user.full_name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10">
                        <circle cx="16" cy="12" r="5" fill="white"/>
                        <path d="M6 26C6 21.5817 9.58172 18 14 18H18C22.4183 18 26 21.5817 26 26V26H6V26Z" fill="white"/>
                      </svg>
                    )}
                  </div>
                </div>

                {/* User Name */}
                <div className="text-center mb-2">
                  <p className="text-base font-bold leading-6 text-[#1A1A1A]">
                    {achievementData.user.full_name}
                  </p>
                </div>

                {/* Caption */}
                <p className="text-sm font-normal leading-5 text-[#6B7280] text-center mb-4">
                  Baru saja mendapatkan lencana baru di LokalLens!
                </p>

                {/* Badge Preview */}
                <div className="relative rounded-3xl overflow-hidden aspect-574/300 bg-[rgba(0,108,132,0.1)]">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-linear-to-br from-[#006C84] via-[#00A8CC] to-[#006C84]" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                    {/* Badge Icon */}
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[rgba(212,160,23,0.2)] flex items-center justify-center mb-3 sm:mb-4">
                      <svg width="48" height="48" viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-12 sm:h-12">
                        <path d="M15 38L29 34L33 20L19 24L15 38ZM24 32C23.1667 32 22.4583 31.7083 21.875 31.125C21.2917 30.5417 21 29.8333 21 29C21 28.1667 21.2917 27.4583 21.875 26.875C22.4583 26.2917 23.1667 26 24 26C24.8333 26 25.5417 26.2917 26.125 26.875C26.7083 27.4583 27 28.1667 27 29C27 29.8333 26.7083 30.5417 26.125 31.125C25.5417 31.7083 24.8333 32 24 32ZM24 49C21.2333 49 18.6333 48.475 16.2 47.425C13.7667 46.375 11.65 44.95 9.85 43.15C8.05 41.35 6.625 39.2333 5.575 36.8C4.525 34.3667 4 31.7667 4 29C4 26.2333 4.525 23.6333 5.575 21.2C6.625 18.7667 8.05 16.65 9.85 14.85C11.65 13.05 13.7667 11.625 16.2 10.575C18.6333 9.525 21.2333 9 24 9C26.7667 9 29.3667 9.525 31.8 10.575C34.2333 11.625 36.35 13.05 38.15 14.85C39.95 16.65 41.375 18.7667 42.425 21.2C43.475 23.6333 44 26.2333 44 29C44 31.7667 43.475 34.3667 42.425 36.8C41.375 39.2333 39.95 41.35 38.15 43.15C36.35 44.95 34.2333 46.375 31.8 47.425C29.3667 48.475 26.7667 49 24 49ZM24 45C28.4333 45 32.2083 43.4417 35.325 40.325C38.4417 37.2083 40 33.4333 40 29C40 24.5667 38.4417 20.7917 35.325 17.675C32.2083 14.5583 28.4333 13 24 13C19.5667 13 15.7917 14.5583 12.675 17.675C9.55833 20.7917 8 24.5667 8 29C8 33.4333 9.55833 37.2083 12.675 40.325C15.7917 43.4417 19.5667 45 24 45Z" fill="#D4A017"/>
                      </svg>
                    </div>

                    {/* Badge Name */}
                    <h3 className="text-base sm:text-lg font-bold leading-7 text-[#1A1A1A] mb-2">
                      {achievementData.badge.name}
                    </h3>

                    {/* Badge Description */}
                    <p className="max-w-xs text-xs sm:text-sm font-normal leading-5 text-[#006C84] mb-3 sm:mb-4">
                      Saya telah menjelajahi {percentage}% kekayaan budaya
                      Nusantara! Ayo bergabung dan lestarikan
                      budaya kita bersama LokalLens!
                    </p>

                    {/* Site URL */}
                    <p className="text-xs font-bold leading-4 tracking-[0.6px] uppercase text-[rgba(26,26,26,0.5)]">
                      lokallens.id
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-1">
              <label className="text-sm font-medium leading-5 text-[#374151]">
                Pesan (opsional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 text-sm font-normal leading-5 text-[#1A1A1A] bg-[#F9FAFB] border border-[#D1D5DB] rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
            </div>

            {/* Share Buttons */}
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-medium leading-5 text-[#374151] text-center">
                Bagikan melalui
              </h3>
              
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {/* Facebook */}
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-12 h-12 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors flex items-center justify-center"
                  aria-label="Share to Facebook"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.878V14.891H7.898V12H10.438V9.797C10.438 7.291 11.93 5.907 14.215 5.907C15.309 5.907 16.453 6.102 16.453 6.102V8.562H15.193C13.95 8.562 13.563 9.333 13.563 10.124V12H16.336L15.893 14.89H13.563V21.878C18.343 21.128 22 16.991 22 12Z" fill="white"/>
                  </svg>
                </button>

                {/* Twitter/X */}
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-12 h-12 rounded-full bg-[#1F2937] hover:bg-black transition-colors flex items-center justify-center"
                  aria-label="Share to X (Twitter)"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.2439 2.25H21.5519L14.3249 10.51L22.8269 21.75H16.1699L10.9559 14.933L4.98991 21.75H1.67991L9.40991 12.915L1.25391 2.25H8.07991L12.7929 8.481L18.2439 2.25ZM17.0829 19.77H18.9159L7.08391 4.126H5.11691L17.0829 19.77Z" fill="white"/>
                  </svg>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-12 h-12 rounded-full bg-[#22C55E] hover:bg-[#16a34a] transition-colors flex items-center justify-center"
                  aria-label="Share to WhatsApp"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.3668 16.5668L17.6168 16.3334C17.3834 16.3334 17.1501 16.4501 17.0334 16.5668L15.8668 17.9668C14.4668 17.2668 13.1834 16.4501 12.0168 15.1668C10.8501 14.0001 10.0334 12.7168 9.21676 11.3168L10.6168 10.1501C10.8501 9.91676 10.8501 9.80009 10.8501 9.56676L10.6168 7.81676C10.5001 7.00009 9.91676 6.41676 9.1001 6.41676H5.2501C4.43343 5.83343 3.8501 6.41676 3.8501 7.23343C3.8501 7.35009 3.8501 7.46676 3.8501 7.58343C4.43343 11.5501 6.18343 15.0501 8.86676 17.8501C11.6668 20.6501 15.2834 22.4001 19.1334 22.8668C19.2501 22.8668 19.3668 22.8668 19.4834 22.8668C20.3001 22.8668 20.8834 22.2834 20.8834 21.4668V18.7834C20.7668 17.2668 20.1834 16.6834 19.3668 16.5668Z" fill="white"/>
                  </svg>
                </button>

                {/* More Options */}
                <button
                  className="w-12 h-12 rounded-full bg-[#E5E7EB] hover:bg-[#D1D5DB] transition-colors flex items-center justify-center"
                  aria-label="More share options"
                >
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.17687 15.9443C5.64214 15.9443 5.18439 15.7539 4.8036 15.3732C4.42282 14.9924 4.23242 14.5346 4.23242 13.9999C4.23242 13.4652 4.42282 13.0074 4.8036 12.6266C5.18439 12.2458 5.64214 12.0554 6.17687 12.0554C6.71159 12.0554 7.16934 12.2458 7.55013 12.6266C7.93092 13.0074 8.12131 13.4652 8.12131 13.9999C8.12131 14.5346 7.93092 14.9924 7.55013 15.3732C7.16934 15.7539 6.71159 15.9443 6.17687 15.9443ZM12.0102 15.9443C11.4755 15.9443 11.0177 15.7539 10.6369 15.3732C10.2561 14.9924 10.0658 14.5346 10.0658 13.9999C10.0658 13.4652 10.2561 13.0074 10.6369 12.6266C11.0177 12.2458 11.4755 12.0554 12.0102 12.0554C12.5449 12.0554 13.0027 12.2458 13.3835 12.6266C13.7643 13.0074 13.9546 13.4652 13.9546 13.9999C13.9546 14.5346 13.7643 14.9924 13.3835 15.3732C13.0027 15.7539 12.5449 15.9443 12.0102 15.9443ZM17.8435 15.9443C17.3088 15.9443 16.8511 15.7539 16.4703 15.3732C16.0895 14.9924 15.8991 14.5346 15.8991 13.9999C15.8991 13.4652 16.0895 13.0074 16.4703 12.6266C16.8511 12.2458 17.3088 12.0554 17.8435 12.0554C18.3783 12.0554 18.836 12.2458 19.2168 12.6266C19.5976 13.0074 19.788 13.4652 19.788 13.9999C19.788 14.5346 19.5976 14.9924 19.2168 15.3732C18.836 15.7539 18.3783 15.9443 17.8435 15.9443Z" fill="#1A1A1A"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Copy Link Section */}
            <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
              <h3 className="text-sm font-medium leading-5 text-[#374151] text-center">
                Atau salin tautan
              </h3>
              
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 h-12 px-4 pr-24 text-sm font-normal text-[#6B7280] bg-[#F9FAFB] border border-[#D1D5DB] rounded-full shadow-sm focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="absolute right-2 h-9 px-4 rounded-full bg-[#D4A017] hover:bg-[#c29316] transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 14.0001C5.63333 14.0001 5.31944 13.8695 5.05833 13.6084C4.79722 13.3473 4.66667 13.0334 4.66667 12.6667V4.66675C4.66667 4.30008 4.79722 3.98619 5.05833 3.72508C5.31944 3.46397 5.63333 3.33341 6 3.33341H12C12.3667 3.33341 12.6806 3.46397 12.9417 3.72508C13.2028 3.98619 13.3333 4.30008 13.3333 4.66675V12.6667C13.3333 13.0334 13.2028 13.3473 12.9417 13.6084C12.6806 13.8695 12.3667 14.0001 12 14.0001H6ZM6 12.6667H12V4.66675H6V12.6667ZM3.33333 16.6667C2.96667 16.6667 2.65278 16.5362 2.39167 16.2751C2.13056 16.014 2 15.7001 2 15.3334V6.00008H3.33333V15.3334H10.6667V16.6667H3.33333Z" fill="#1A1A1A"/>
                  </svg>
                  <span className="text-sm font-bold leading-[21px] tracking-[0.21px] text-[#1A1A1A]">
                    {copied ? 'Tersalin!' : 'Salin'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/profil"
              className="text-sm font-medium leading-[21px] text-[#6B7280] hover:text-[#374151] transition-colors"
            >
              Kembali ke Pencapaian
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
