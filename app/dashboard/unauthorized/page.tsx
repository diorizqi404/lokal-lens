'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#DC2626"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">
            Akses Ditolak
          </h1>
          <p className="text-gray-600">
            Anda tidak memiliki akses untuk halaman ini. Silakan hubungi administrator jika Anda merasa ini adalah kesalahan.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full py-3 bg-primary-green hover:bg-primary-green/90 text-white font-bold rounded-xl transition-colors"
          >
            Kembali ke Dashboard
          </Link>
          <Link
            href="/"
            className="block w-full py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 text-[#1A1A1A] font-bold rounded-xl transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
