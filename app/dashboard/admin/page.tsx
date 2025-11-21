'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total User"
          value="1,234"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 8, isPositive: true }}
          color="blue"
        />
        
        <DashboardCard
          title="Total Konten"
          value="856"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 15, isPositive: true }}
          color="green"
        />
        
        <DashboardCard
          title="Pending Review"
          value="42"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 5, isPositive: false }}
          color="yellow"
        />
        
        <DashboardCard
          title="Laporan"
          value="18"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 3, isPositive: false }}
          color="red"
        />
      </div>

      {/* Charts & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Statistik User</h2>
          <div className="space-y-4">
            {[
              { role: 'Contributor', count: 823, color: 'bg-blue-500' },
              { role: 'Petugas', count: 156, color: 'bg-green-500' },
              { role: 'Admin', count: 12, color: 'bg-purple-500' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{item.role}</span>
                  <span className="text-sm font-bold text-[#1A1A1A]">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(item.count / 1234) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Status Konten</h2>
          <div className="space-y-4">
            {[
              { status: 'Published', count: 756, color: 'bg-green-500' },
              { status: 'Under Review', count: 42, color: 'bg-yellow-500' },
              { status: 'Draft', count: 58, color: 'bg-gray-400' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{item.status}</span>
                  <span className="text-sm font-bold text-[#1A1A1A]">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(item.count / 856) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users & Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#1A1A1A]">User Terbaru</h2>
            <button className="text-sm font-semibold text-primary-green hover:text-primary-green/80">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Budi Santoso', role: 'Contributor', date: '2 jam lalu' },
              { name: 'Siti Nurhaliza', role: 'Contributor', date: '5 jam lalu' },
              { name: 'Ahmad Hidayat', role: 'Petugas', date: '1 hari lalu' },
              { name: 'Dewi Lestari', role: 'Contributor', date: '2 hari lalu' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-green to-blue-500 flex items-center justify-center text-white font-bold">
                  {item.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1A1A1A]">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role} • {item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#1A1A1A]">Laporan Terbaru</h2>
            <button className="text-sm font-semibold text-primary-green hover:text-primary-green/80">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Konten tidak sesuai', type: 'Content', priority: 'high' },
              { title: 'Spam di komentar', type: 'Comment', priority: 'medium' },
              { title: 'Data tidak akurat', type: 'Content', priority: 'high' },
              { title: 'Pelanggaran guideline', type: 'User', priority: 'low' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-10 h-10 rounded-lg ${
                  item.priority === 'high' ? 'bg-red-100' :
                  item.priority === 'medium' ? 'bg-yellow-100' : 'bg-gray-100'
                } flex items-center justify-center`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor" className={
                      item.priority === 'high' ? 'text-red-600' :
                      item.priority === 'medium' ? 'text-yellow-600' : 'text-gray-600'
                    }/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1A1A1A]">{item.title}</p>
                  <p className="text-sm text-gray-500 capitalize">{item.type} • {item.priority} priority</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
