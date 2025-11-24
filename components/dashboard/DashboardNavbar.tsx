'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { usePathname } from 'next/navigation';

interface Props {
  onToggleSidebar?: () => void;
}

export default function DashboardNavbar({ onToggleSidebar }: Props) {
  const { user } = useAuth();
  const pathname = usePathname();

  // Tentukan title berdasarkan path
  const getPageTitle = () => {
    if (pathname.includes('/contributor/konten')) return 'Konten Saya';
    if (pathname.includes('/contributor/buat')) return 'Buat Konten Baru';
    if (pathname.includes('/petugas/laporan')) return 'Daftar Laporan';
    if (pathname.includes('/petugas/verifikasi')) return 'Verifikasi Konten';
    if (pathname.includes('/admin/users')) return 'Manajemen User';
    if (pathname.includes('/admin/settings')) return 'Pengaturan Sistem';
    if (pathname.includes('/admin')) return 'Dashboard Admin';
    if (pathname.includes('/contributor')) return 'Dashboard Contributor';
    if (pathname.includes('/petugas')) return 'Dashboard Petugas';
    return 'Dashboard';
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 sticky top-0 z-10">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          {/* Hamburger - visible on small screens */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-md mr-1 text-gray-600 hover:bg-gray-100 md:hidden"
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className='hidden sm:block'>
            <h1 className="text-xl font-bold text-[#1A1A1A]">{getPageTitle()}</h1>
            <p className="text-sm text-gray-500">Selamat datang kembali, {user?.name || 'User'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="currentColor"/>
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Role Badge */}
          <div className="px-3 py-1 bg-primary-green/10 text-primary-green rounded-full text-xs font-semibold capitalize">
            {user?.role || 'Guest'}
          </div>
        </div>
      </div>
    </header>
  );
}
