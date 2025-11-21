'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function ContributorDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Konten"
          value="24"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        
        <DashboardCard
          title="Konten Aktif"
          value="18"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        
        <DashboardCard
          title="Pending Review"
          value="4"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 2, isPositive: false }}
          color="yellow"
        />
        
        <DashboardCard
          title="Total Views"
          value="1,245"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 15, isPositive: true }}
          color="purple"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#1A1A1A]">Aktivitas Terbaru</h2>
          <button className="text-sm font-semibold text-primary-green hover:text-primary-green/80">
            Lihat Semua
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { title: 'Artikel tentang Batik Tulis', status: 'published', date: '2 jam lalu', color: 'green' },
            { title: 'Video Tari Saman', status: 'review', date: '5 jam lalu', color: 'yellow' },
            { title: 'Cerita Rakyat Malin Kundang', status: 'published', date: '1 hari lalu', color: 'green' },
            { title: 'Resep Rendang Padang', status: 'draft', date: '2 hari lalu', color: 'gray' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-lg ${
                activity.color === 'green' ? 'bg-green-100' : 
                activity.color === 'yellow' ? 'bg-yellow-100' : 'bg-gray-100'
              } flex items-center justify-center`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z" fill="currentColor" className={
                    activity.color === 'green' ? 'text-green-600' : 
                    activity.color === 'yellow' ? 'text-yellow-600' : 'text-gray-600'
                  }/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#1A1A1A]">{activity.title}</p>
                <p className="text-sm text-gray-500 capitalize">{activity.status} • {activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-primary-green hover:bg-primary-green/90 text-white rounded-2xl p-6 flex flex-col items-center gap-3 transition-colors">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="white"/>
          </svg>
          <span className="font-bold">Buat Konten Baru</span>
        </button>

        <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 flex flex-col items-center gap-3 transition-colors">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z" fill="#1A1A1A"/>
          </svg>
          <span className="font-bold text-[#1A1A1A]">Lihat Konten Saya</span>
        </button>

        <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 flex flex-col items-center gap-3 transition-colors">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#1A1A1A"/>
          </svg>
          <span className="font-bold text-[#1A1A1A]">Panduan</span>
        </button>
      </div>
    </div>
  );
}
