'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import FormModal from '@/components/ui/FormModal';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  is_banned?: boolean;
  profile?: {
    bio?: string;
    avatar?: string;
    provinces_visited: number;
    badges_earned: number;
  };
  _count?: {
    articles: number;
    comments: number;
    scan_history: number;
    endangered_reports: number;
  };
}

export default function PenggunaPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page, search, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search,
        ...(roleFilter && { role: roleFilter })
      });
      
      const response = await fetch(`/api/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (user: User) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleBanClick = (user: User) => {
    setSelectedUser(user);
    setShowBanDialog(true);
  };

  const handleBanUser = async () => {
    if (!selectedUser) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${selectedUser.id}/ban`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ banned: !selectedUser.is_banned })
      });
      
      const data = await response.json();
      if (data.success) {
        alert(selectedUser.is_banned ? 'User berhasil di-unban' : 'User berhasil di-ban');
        setShowBanDialog(false);
        setSelectedUser(null);
        fetchUsers();
      } else {
        alert(data.error || 'Gagal mengubah status user');
      }
    } catch (error) {
      console.error('Error banning user:', error);
      alert('Terjadi kesalahan');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Kelola Pengguna</h1>
          <p className="text-gray-600 mt-1">Manajemen user dan contributor</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
            </svg>
            <input
              type="text"
              placeholder="Cari user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
          >
            <option value="">Semua Role</option>
            <option value="user">User</option>
            <option value="contributor">Contributor</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aktivitas</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <div className="inline-block w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-green to-blue-500 flex items-center justify-center text-white font-bold">
                          {user.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.full_name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'contributor' 
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user._count ? (
                        <div className="space-y-1">
                          <p>{user._count.articles} artikel</p>
                          <p>{user._count.scan_history} scan</p>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        user.is_banned
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {user.is_banned ? 'Banned' : 'Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDetail(user)}
                        className="inline-block px-4 py-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                      >
                        Detail
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBanClick(user)}
                        className={`px-4 py-1.5 rounded-lg transition-colors text-sm font-medium ${
                          user.is_banned
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        {user.is_banned ? 'Unban' : 'Ban'}
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </motion.button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedUser && (
        <FormModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Detail Pengguna"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-green to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {selectedUser.full_name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedUser.full_name}</h3>
                <p className="text-gray-600">{selectedUser.email}</p>
                <span className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedUser.role === 'contributor' 
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {selectedUser.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Provinsi Dikunjungi</p>
                <p className="text-2xl font-bold text-blue-700">
                  {selectedUser.profile?.provinces_visited || 0}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Badge Diraih</p>
                <p className="text-2xl font-bold text-green-700">
                  {selectedUser.profile?.badges_earned || 0}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Total Artikel</p>
                <p className="text-2xl font-bold text-purple-700">
                  {selectedUser._count?.articles || 0}
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Riwayat Scan</p>
                <p className="text-2xl font-bold text-orange-700">
                  {selectedUser._count?.scan_history || 0}
                </p>
              </div>
            </div>

            {selectedUser.profile?.bio && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Bio</p>
                <p className="text-gray-700">{selectedUser.profile.bio}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 mb-2">Status Akun</p>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                selectedUser.is_banned
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {selectedUser.is_banned ? 'Banned' : 'Aktif'}
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Tutup
              </motion.button>
            </div>
          </div>
        </FormModal>
      )}

      {/* Ban Confirmation */}
      {selectedUser && (
        <FormModal
          isOpen={showBanDialog}
          onClose={() => setShowBanDialog(false)}
          title={selectedUser.is_banned ? '⚠️ Unban User' : '⚠️ Ban User'}
          size="md"
        >
          <div className="space-y-6">
            {/* Warning Icon */}
            <div className="flex justify-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                selectedUser.is_banned ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={selectedUser.is_banned ? 'text-green-600' : 'text-red-600'}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedUser.is_banned ? 'Unban' : 'Ban'} "{selectedUser.full_name}"?
              </h3>
              <p className="text-gray-600">
                {selectedUser.is_banned 
                  ? 'User ini akan bisa login dan mengakses semua fitur kembali.'
                  : 'User ini tidak akan bisa login dan mengakses aplikasi. Tindakan ini dapat dibatalkan kapan saja.'}
              </p>
            </div>

            {/* Preview Card */}
            <div className={`border-2 rounded-xl p-4 ${
              selectedUser.is_banned 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  {selectedUser.full_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{selectedUser.full_name}</p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                  <p className="text-xs mt-1">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      selectedUser.role === 'contributor' 
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedUser.role}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowBanDialog(false)}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Batal
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: actionLoading ? 1 : 1.02 }}
                whileTap={{ scale: actionLoading ? 1 : 0.98 }}
                onClick={handleBanUser}
                disabled={actionLoading}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
                  selectedUser.is_banned
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {actionLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {selectedUser.is_banned ? 'Mengaktifkan...' : 'Menonaktifkan...'}
                  </>
                ) : (
                  <>
                    {selectedUser.is_banned ? '✓ Ya, Unban' : '🚫 Ya, Ban'}
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </FormModal>
      )}
    </div>
  );
}
