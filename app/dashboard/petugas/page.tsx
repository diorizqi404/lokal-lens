'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function PetugasDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Laporan"
          value="156"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 12, isPositive: false }}
          color="red"
        />
        
        <DashboardCard
          title="Pending Review"
          value="32"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 8, isPositive: false }}
          color="yellow"
        />
        
        <DashboardCard
          title="Terverifikasi"
          value="98"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 15, isPositive: true }}
          color="green"
        />
        
        <DashboardCard
          title="Ditolak"
          value="26"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
            </svg>
          }
          trend={{ value: 5, isPositive: true }}
          color="red"
        />
      </div>

      {/* Priority Tasks */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#1A1A1A]">Tugas Prioritas</h2>
          <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
            {32} Pending
          </span>
        </div>
        
        <div className="space-y-3">
          {[
            { title: 'Verifikasi Laporan Candi Terancam', priority: 'Urgent', time: '30 menit lalu', type: 'verification' },
            { title: 'Review Konten Batik Nusantara', priority: 'High', time: '1 jam lalu', type: 'review' },
            { title: 'Investigasi Spam Report', priority: 'Medium', time: '3 jam lalu', type: 'investigation' },
            { title: 'Update Status Laporan Tari', priority: 'Low', time: '5 jam lalu', type: 'update' },
          ].map((task, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary-green hover:shadow-sm transition-all cursor-pointer">
              <div className={`w-12 h-12 rounded-xl ${
                task.priority === 'Urgent' ? 'bg-red-100' :
                task.priority === 'High' ? 'bg-orange-100' :
                task.priority === 'Medium' ? 'bg-yellow-100' : 'bg-gray-100'
              } flex items-center justify-center`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z" fill="currentColor" className={
                    task.priority === 'Urgent' ? 'text-red-600' :
                    task.priority === 'High' ? 'text-orange-600' :
                    task.priority === 'Medium' ? 'text-yellow-600' : 'text-gray-600'
                  }/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#1A1A1A] mb-1">{task.title}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    task.priority === 'Urgent' ? 'bg-red-100 text-red-600' :
                    task.priority === 'High' ? 'bg-orange-100 text-orange-600' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-sm text-gray-500">• {task.time}</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary-green hover:bg-primary-green/90 text-white rounded-lg font-semibold text-sm transition-colors">
                Proses
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports & Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#1A1A1A]">Laporan Terbaru</h2>
            <button className="text-sm font-semibold text-primary-green hover:text-primary-green/80">
              Lihat Semua
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Candi Borobudur terancam', category: 'Budaya Terancam', status: 'new', time: '10 menit lalu' },
              { title: 'Batik palsu beredar', category: 'Pelanggaran', status: 'processing', time: '1 jam lalu' },
              { title: 'Tari Saman tidak autentik', category: 'Konten', status: 'new', time: '3 jam lalu' },
              { title: 'Vandalisme di candi', category: 'Budaya Terancam', status: 'urgent', time: '5 jam lalu' },
            ].map((report, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  report.status === 'urgent' ? 'bg-red-500' :
                  report.status === 'new' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1A1A1A] mb-1">{report.title}</p>
                  <p className="text-sm text-gray-500">{report.category} • {report.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-6">Statistik Minggu Ini</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Diverifikasi</span>
                <span className="text-xl font-bold text-green-600">24</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Ditolak</span>
                <span className="text-xl font-bold text-red-600">8</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Dalam Proses</span>
                <span className="text-xl font-bold text-yellow-600">15</span>
              </div>
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
