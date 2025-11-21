'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import AchievementCertificate from '@/components/sections/Profile/Achievement/AchievementCertificate';

interface CertificateData {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  date_earned: string;
  certificate_url: string | null;
  user: {
    full_name: string;
  };
}

export default function CertificatePage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push('/masuk');
      return;
    }

    fetchCertificate();
  }, [user, authLoading, params.id, router]);

  const fetchCertificate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/certificate/${params.id}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Certificate not found');
      }

      const data = await response.json();
      setCertificate(data);
    } catch (error) {
      console.error('Fetch certificate error:', error);
      setError('Sertifikat tidak ditemukan');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <main className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Memuat sertifikat...</p>
        </div>
      </main>
    );
  }

  if (error || !certificate) {
    return (
      <main className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 px-4">
          <div className="text-6xl">⚠️</div>
          <p className="text-lg font-semibold text-gray-700">{error}</p>
          <button
            onClick={() => router.push('/profil')}
            className="px-6 py-3 bg-primary-green text-white font-semibold rounded-full hover:bg-[#0BC943] transition-colors"
          >
            Kembali ke Profil
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-white">
      <AchievementCertificate
        userName={certificate.user.full_name}
        certificateTitle={certificate.title}
        description={certificate.description || ''}
        dateEarned={certificate.date_earned}
        certificateId={certificate.id}
      />
    </main>
  );
}
