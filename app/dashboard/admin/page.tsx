'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalUsers: number;
  totalContent: number;
  pendingReview: number;
  totalReports: number;
  pendingReports: number;
  userGrowth: number;
  contentGrowth: number;
  userByRole: Record<string, number>;
  contentByStatus: {
    published: number;
    draft: number;
    archive: number;
  };
  contentByType: {
    cultures: number;
    articles: number;
    quizzes: number;
  };
  quizStats: {
    totalAttempts: number;
    averageScore: number;
  };
  recentActivities: {
    newUsers: number;
    newCultures: number;
    newArticles: number;
    newQuizzes: number;
    quizAttempts: number;
  };
  topContributors: Array<{
    id: number;
    name: string;
    email: string;
    articlesCount: number;
  }>;
  monthlyGrowth: Array<{
    month: string;
    users: number;
    content: number;
  }>;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/dashboard-stats', {
        headers: { Authorization: `Bearer ${token}` }
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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600 mt-1">Selamat datang kembali, {user?.name || 'Admin'}! 👋</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <DashboardCard
            title="Total User"
            value={stats.totalUsers.toString()}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
              </svg>
            }
            trend={{ value: stats.userGrowth, isPositive: stats.userGrowth >= 0 }}
            color="blue"
          />
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <DashboardCard
            title="Total Konten"
            value={stats.totalContent.toString()}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z" fill="currentColor"/>
              </svg>
            }
            trend={{ value: stats.contentGrowth, isPositive: stats.contentGrowth >= 0 }}
            color="green"
          />
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <DashboardCard
            title="Pending Review"
            value={stats.pendingReview.toString()}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
              </svg>
            }
            color="yellow"
          />
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <DashboardCard
            title="Laporan"
            value={`${stats.pendingReports}/${stats.totalReports}`}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
              </svg>
            }
            color="red"
          />
        </motion.div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          Aktivitas 7 Hari Terakhir
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'User Baru', value: stats.recentActivities.newUsers, icon: '👥', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'Budaya', value: stats.recentActivities.newCultures, icon: '🏛️', color: 'bg-purple-50 text-purple-700 border-purple-200' },
            { label: 'Artikel', value: stats.recentActivities.newArticles, icon: '📝', color: 'bg-green-50 text-green-700 border-green-200' },
            { label: 'Kuis', value: stats.recentActivities.newQuizzes, icon: '❓', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
            { label: 'Percobaan Kuis', value: stats.recentActivities.quizAttempts, icon: '🎯', color: 'bg-red-50 text-red-700 border-red-200' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className={`${item.color} rounded-xl p-4 border-2`}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm font-medium opacity-80">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">📈</span>
            Pertumbuhan 6 Bulan Terakhir
          </h2>
          <div className="space-y-4">
            {stats.monthlyGrowth.map((data, index) => {
              const maxValue = Math.max(
                ...stats.monthlyGrowth.map(d => Math.max(d.users, d.content))
              );
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-gray-700 w-12">{data.month}</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                          <motion.div
                            className="bg-blue-500 h-full rounded-full flex items-center justify-end pr-2"
                            initial={{ width: 0 }}
                            animate={{ width: `${(data.users / maxValue) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          >
                            <span className="text-xs font-semibold text-white">{data.users}</span>
                          </motion.div>
                        </div>
                        <span className="text-xs text-gray-500 w-16">Users</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                          <motion.div
                            className="bg-green-500 h-full rounded-full flex items-center justify-end pr-2"
                            initial={{ width: 0 }}
                            animate={{ width: `${(data.content / maxValue) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          >
                            <span className="text-xs font-semibold text-white">{data.content}</span>
                          </motion.div>
                        </div>
                        <span className="text-xs text-gray-500 w-16">Content</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Content Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Distribusi Konten
          </h2>
          <div className="space-y-6">
            {/* Content by Type */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Berdasarkan Tipe</h3>
              <div className="space-y-3">
                {[
                  { label: 'Budaya', value: stats.contentByType.cultures, color: 'bg-purple-500', icon: '🏛️' },
                  { label: 'Artikel', value: stats.contentByType.articles, color: 'bg-green-500', icon: '📝' },
                  { label: 'Kuis', value: stats.contentByType.quizzes, color: 'bg-yellow-500', icon: '❓' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`${item.color} h-full rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / stats.totalContent) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Content by Status */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Berdasarkan Status</h3>
              <div className="space-y-3">
                {[
                  { label: 'Published', value: stats.contentByStatus.published, color: 'bg-green-500' },
                  { label: 'Draft', value: stats.contentByStatus.draft, color: 'bg-yellow-500' },
                  { label: 'Archive', value: stats.contentByStatus.archive, color: 'bg-gray-400' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm font-bold text-gray-900">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`${item.color} h-full rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / stats.totalContent) * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">👥</span>
            Statistik User
          </h2>
          <div className="space-y-4">
            {[
              { role: 'User', count: stats.userByRole.user || 0, color: 'bg-blue-500', icon: '👤' },
              { role: 'Contributor', count: stats.userByRole.contributor || 0, color: 'bg-green-500', icon: '✍️' },
              { role: 'Admin', count: stats.userByRole.admin || 0, color: 'bg-purple-500', icon: '👑' },
              { role: 'Officer', count: stats.userByRole.officer || 0, color: 'bg-orange-500', icon: '🛡️' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{item.role}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className={`${item.color} h-full rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.totalUsers > 0 ? (item.count / stats.totalUsers) * 100 : 0}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quiz Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Statistik Kuis
          </h2>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"
            >
              <div className="text-sm font-medium opacity-90 mb-2">Total Percobaan</div>
              <div className="text-4xl font-bold">{stats.quizStats.totalAttempts.toLocaleString()}</div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-sm opacity-90">Dari {stats.totalUsers} pengguna</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white"
            >
              <div className="text-sm font-medium opacity-90 mb-2">Rata-rata Skor</div>
              <div className="text-4xl font-bold">{stats.quizStats.averageScore}%</div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-white h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.quizStats.averageScore}%` }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Top Contributors */}
      {stats.topContributors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            Top Kontributor (Artikel Published)
          </h2>
          <div className="space-y-3">
            {stats.topContributors.map((contributor, index) => (
              <motion.div
                key={contributor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-600' :
                    'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{contributor.name}</div>
                    <div className="text-sm text-gray-500">{contributor.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-green">{contributor.articlesCount}</div>
                  <div className="text-xs text-gray-500">artikel</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Kelola User', href: '/dashboard/admin/pengguna', icon: '👥', color: 'from-blue-500 to-blue-600' },
            { label: 'Laporan Budaya', href: '/dashboard/admin/laporan-budaya', icon: '📋', color: 'from-red-500 to-red-600' },
            { label: 'Verifikasi Konten', href: '/dashboard/admin/verifikasi', icon: '✓', color: 'from-green-500 to-green-600' },
            { label: 'Riwayat Scan', href: '/dashboard/admin/riwayat-scan', icon: '📷', color: 'from-purple-500 to-purple-600' },
          ].map((action, index) => (
            <motion.a
              key={index}
              href={action.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 bg-gradient-to-br ${action.color} rounded-xl text-white text-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="text-4xl mb-2">{action.icon}</div>
              <div className="font-semibold text-sm">{action.label}</div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
