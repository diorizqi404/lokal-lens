'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalReports: number;
  pendingReports: number;
  approvedReports: number;
  rejectedReports: number;
  weeklyStats: {
    approved: number;
    rejected: number;
    pending: number;
  };
  contentVerification: {
    cultures: number;
    articles: number;
    quizzes: number;
    total: number;
  };
  recentReports: Array<{
    id: number;
    cultureName: string;
    threatType: string;
    location: string;
    province: string | null;
    status: string;
    isAnonymous: boolean;
    reporterName: string;
    createdAt: string;
  }>;
  reportsByProvince: Array<{
    province: string;
    count: number;
  }>;
  reportsByThreat: Array<{
    threatType: string;
    count: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    reports: number;
    approved: number;
    rejected: number;
  }>;
  avgResponseTimeHours: number;
  performanceChange: number;
  thisWeekReviewed: number;
  lastWeekReviewed: number;
}

export default function PetugasDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/petugas/dashboard-stats', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getThreatTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'modernization': 'Modernisasi',
      'lack_of_interest': 'Kurang Minat',
      'urbanization': 'Urbanisasi',
      'natural_disaster': 'Bencana Alam',
      'conflict': 'Konflik',
      'economic_pressure': 'Tekanan Ekonomi',
      'other': 'Lainnya'
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
      'approved': { bg: 'bg-green-100', text: 'text-green-700', label: 'Disetujui' },
      'rejected': { bg: 'bg-red-100', text: 'text-red-700', label: 'Ditolak' }
    };
    return badges[status] || badges['pending'];
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} menit lalu`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} hari lalu`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12 text-gray-500">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Selamat datang, {user?.name || 'Petugas'}!
        </h1>
        <p className="text-gray-600 mt-2">Pantau dan kelola laporan budaya terancam</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <DashboardCard
          title="Total Laporan"
          value={stats.totalReports.toString()}
          icon={
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          color="blue"
        />
        <DashboardCard
          title="Menunggu Review"
          value={stats.pendingReports.toString()}
          icon={
            <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="yellow"
        />
        <DashboardCard
          title="Disetujui"
          value={stats.approvedReports.toString()}
          icon={
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="green"
        />
        <DashboardCard
          title="Ditolak"
          value={stats.rejectedReports.toString()}
          icon={
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="red"
        />
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Waktu Respons Rata-rata</h3>
            <svg className="w-6 h-6 text-primary-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-primary-green">{stats.avgResponseTimeHours}h</div>
          <p className="text-sm text-gray-500 mt-2">Dari laporan hingga review</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Performa Minggu Ini</h3>
            <svg className="w-6 h-6 text-primary-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-800">{stats.thisWeekReviewed}</span>
            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
              stats.performanceChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {stats.performanceChange >= 0 ? '+' : ''}{stats.performanceChange}%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Laporan yang direview</p>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Konten Pending</h3>
            <svg className="w-6 h-6 text-primary-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-gray-800">{stats.contentVerification.total}</div>
          <div className="flex gap-2 mt-2 text-xs text-gray-600">
            <span>{stats.contentVerification.cultures} Budaya</span>
            <span>•</span>
            <span>{stats.contentVerification.articles} Artikel</span>
            <span>•</span>
            <span>{stats.contentVerification.quizzes} Kuis</span>
          </div>
        </div>
      </motion.div>

      {/* Weekly Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Statistik 7 Hari Terakhir</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Disetujui', value: stats.weeklyStats.approved, color: 'bg-green-500', icon: '✓' },
            { label: 'Ditolak', value: stats.weeklyStats.rejected, color: 'bg-red-500', icon: '✕' },
            { label: 'Pending', value: stats.weeklyStats.pending, color: 'bg-yellow-500', icon: '⏱' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Tren 6 Bulan Terakhir</h2>
        <div className="space-y-4">
          {stats.monthlyTrend.map((month, index) => {
            const maxValue = Math.max(...stats.monthlyTrend.map(m => m.reports));
            const reportsPercent = (month.reports / maxValue) * 100;
            const approvedPercent = (month.approved / month.reports) * 100;
            const rejectedPercent = (month.rejected / month.reports) * 100;
            
            return (
              <motion.div
                key={month.month}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-semibold text-gray-700 w-12">{month.month}</span>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${approvedPercent}%` }}
                        transition={{ duration: 0.5, delay: 0.9 + index * 0.05 }}
                        className="bg-green-500 flex items-center justify-center text-xs text-white font-semibold"
                      >
                        {month.approved > 0 && month.approved}
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rejectedPercent}%` }}
                        transition={{ duration: 0.5, delay: 0.9 + index * 0.05 }}
                        className="bg-red-500 flex items-center justify-center text-xs text-white font-semibold"
                      >
                        {month.rejected > 0 && month.rejected}
                      </motion.div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-12 text-right">{month.reports}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Disetujui</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Ditolak</span>
          </div>
        </div>
      </motion.div>

      {/* Reports by Province & Threat Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Province */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Laporan per Provinsi</h2>
          <div className="space-y-3">
            {stats.reportsByProvince.slice(0, 5).map((item, index) => {
              const maxCount = stats.reportsByProvince[0]?.count || 1;
              const percentage = (item.count / maxCount) * 100;
              
              return (
                <motion.div
                  key={item.province}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.1 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.province}</span>
                    <span className="text-sm font-bold text-gray-800">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.05 }}
                      className="h-full bg-gradient-to-r from-primary-green to-green-600"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* By Threat Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Jenis Ancaman</h2>
          <div className="space-y-3">
            {stats.reportsByThreat.map((item, index) => {
              const maxCount = stats.reportsByThreat[0]?.count || 1;
              const percentage = (item.count / maxCount) * 100;
              const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500'];
              
              return (
                <motion.div
                  key={item.threatType}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.1 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{getThreatTypeLabel(item.threatType)}</span>
                    <span className="text-sm font-bold text-gray-800">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.05 }}
                      className={`h-full ${colors[index % colors.length]}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Laporan Terbaru</h2>
          <a href="/dashboard/petugas/laporan-budaya-terancam" className="text-sm font-semibold text-primary-green hover:text-primary-green/80">
            Lihat Semua →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Budaya</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lokasi</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ancaman</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Waktu</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentReports.slice(0, 5).map((report, index) => {
                const badge = getStatusBadge(report.status);
                return (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.4 + index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">{report.cultureName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {report.province || report.location}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {getThreatTypeLabel(report.threatType)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {getTimeAgo(report.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-sm font-semibold text-primary-green hover:text-primary-green/80">
                        Review
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { title: 'Verifikasi Budaya', href: '/dashboard/petugas/verifikasi-budaya', icon: '🏛️', color: 'from-blue-500 to-blue-600' },
          { title: 'Verifikasi Artikel', href: '/dashboard/petugas/verifikasi-artikel', icon: '📝', color: 'from-green-500 to-green-600' },
          { title: 'Verifikasi Kuis', href: '/dashboard/petugas/verifikasi-kuis', icon: '❓', color: 'from-purple-500 to-purple-600' },
          { title: 'Laporan Budaya Terancam', href: '/dashboard/petugas/laporan-budaya-terancam', icon: '⚠️', color: 'from-red-500 to-red-600' }
        ].map((action, index) => (
          <motion.a
            key={action.title}
            href={action.href}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 1.6 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-gradient-to-br ${action.color} text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all`}
          >
            <div className="text-4xl mb-3">{action.icon}</div>
            <h3 className="text-lg font-bold">{action.title}</h3>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
