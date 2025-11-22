'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DaftarContributorPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [contributorStatus, setContributorStatus] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    reason: '',
    portfolio_url: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/masuk');
      return;
    }
    
    if (user.role === 'contributor') {
      router.push('/dashboard/contributor');
      return;
    }
    
    checkContributorStatus();
  }, [user]);

  const checkContributorStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/contributor', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success && data.data) {
        setContributorStatus(data.data);
        if (data.data.verification_status === 'pending') {
          // Already has pending application
        }
      }
    } catch (error) {
      console.error('Error checking status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/contributor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Pendaftaran berhasil! Menunggu verifikasi dari admin.');
        checkContributorStatus();
      } else {
        alert(data.error || 'Gagal mendaftar');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Terjadi kesalahan');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (contributorStatus?.verification_status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-green/5 via-white to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-yellow-600">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Sedang Diproses</h1>
            <p className="text-gray-600 mb-6">
              Pengajuan Anda untuk menjadi contributor sedang dalam proses verifikasi oleh admin.
              Kami akan memberitahu Anda segera setelah verifikasi selesai.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span className="inline-flex px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                🕐 Menunggu Verifikasi
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/profil')}
              className="px-6 py-3 bg-primary-green text-white rounded-xl font-semibold hover:bg-primary-green/90 transition-colors"
            >
              Kembali ke Profil
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  if (contributorStatus?.verification_status === 'rejected') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-green/5 via-white to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-red-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Ditolak</h1>
              <p className="text-gray-600">
                Maaf, pengajuan Anda untuk menjadi contributor ditolak.
              </p>
            </div>
            
            {contributorStatus.rejection_reason && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-red-900 mb-2">Alasan Penolakan:</p>
                <p className="text-red-700">{contributorStatus.rejection_reason}</p>
              </div>
            )}

            <p className="text-center text-gray-600 mb-6">
              Anda dapat mendaftar kembali dengan memperbaiki hal-hal yang disebutkan di atas.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alasan Ingin Menjadi Contributor <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                  placeholder="Ceritakan motivasi dan pengalaman Anda..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Portfolio (Opsional)
                </label>
                <input
                  type="url"
                  value={formData.portfolio_url}
                  onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/profil')}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Batal
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className="flex-1 px-6 py-3 bg-primary-green text-white rounded-xl font-semibold hover:bg-primary-green/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Mengirim...' : '🚀 Daftar Ulang'}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green/5 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-green to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Sebagai Contributor</h1>
            <p className="text-gray-600">
              Bergabunglah dengan komunitas contributor dan bantu melestarikan budaya Indonesia
            </p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">✨ Keuntungan Menjadi Contributor:</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Dapat membuat dan mempublikasikan artikel budaya</li>
              <li>• Berkontribusi dalam pelestarian budaya Indonesia</li>
              <li>• Mendapat badge khusus contributor</li>
              <li>• Menjadi bagian dari komunitas pelestari budaya</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alasan Ingin Menjadi Contributor <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="Ceritakan motivasi, pengalaman, atau keahlian Anda terkait budaya Indonesia..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Jelaskan mengapa Anda ingin berkontribusi dan apa yang dapat Anda tawarkan
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link Portfolio (Opsional)
              </label>
              <input
                type="url"
                value={formData.portfolio_url}
                onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="https://portfolio-anda.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Jika Anda memiliki blog, artikel, atau karya lain yang relevan
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <strong>Catatan:</strong> Pendaftaran Anda akan direview oleh admin. 
                Proses verifikasi biasanya memakan waktu 1-3 hari kerja.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/profil')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Batal
              </motion.button>
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="flex-1 px-6 py-3 bg-primary-green text-white rounded-xl font-semibold hover:bg-primary-green/90 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Mengirim...' : '🚀 Kirim Pendaftaran'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
