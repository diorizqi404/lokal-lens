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
  certificates: Certificate[];
}

interface Certificate {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  date_earned: string;
  certificate_url?: string;
  created_at: string;
  user: {
    id: number;
    full_name: string;
    email: string;
  };
}

interface FormData {
  title: string;
  description: string;
  date_earned: string;
}

export default function SertifikatPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date_earned: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search,
        role: 'user,contributor',
        include: 'certificates'
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

  const handleCreateCertificate = (user: User) => {
    setSelectedUser(user);
    setIsEditMode(false);
    setFormData({
      title: '',
      description: '',
      date_earned: new Date().toISOString().split('T')[0]
    });
    setShowFormModal(true);
  };

  const handleEditCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsEditMode(true);
    setFormData({
      title: certificate.title,
      description: certificate.description || '',
      date_earned: new Date(certificate.date_earned).toISOString().split('T')[0]
    });
    setShowFormModal(true);
  };

  const handleDeleteClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowDeleteDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = isEditMode
        ? `/api/admin/certificates/${selectedCertificate?.id}`
        : `/api/admin/certificates`;
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          user_id: isEditMode ? undefined : selectedUser?.id
        })
      });
      
      const data = await response.json();
      if (data.success) {
        alert(isEditMode ? 'Sertifikat berhasil diupdate' : 'Sertifikat berhasil dibuat');
        setShowFormModal(false);
        setShowDetailModal(false);
        fetchUsers();
      } else {
        alert(data.error || 'Gagal menyimpan sertifikat');
      }
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Terjadi kesalahan');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCertificate) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/certificates/${selectedCertificate.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Sertifikat berhasil dihapus');
        setShowDeleteDialog(false);
        setSelectedCertificate(null);
        fetchUsers();
      } else {
        alert(data.error || 'Gagal menghapus sertifikat');
      }
    } catch (error) {
      console.error('Error deleting certificate:', error);
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
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Kelola Sertifikat</h1>
          <p className="text-gray-600 mt-1">Manajemen sertifikat user dan contributor</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sertifikat</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
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
                        <p className="font-semibold text-gray-900">{user.full_name}</p>
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
                      {user.certificates?.length || 0} sertifikat
                    </td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDetail(user)}
                        className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        Detail
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
          title={`Sertifikat - ${selectedUser.full_name}`}
        >
          <div className="space-y-6">
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCreateCertificate(selectedUser)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                </svg>
                Buat Sertifikat
              </motion.button>
            </div>

            {selectedUser.certificates && selectedUser.certificates.length > 0 ? (
              <div className="space-y-3">
                {selectedUser.certificates.map((cert) => (
                  <div key={cert.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{cert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Diraih: {new Date(cert.date_earned).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCertificate(cert)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(cert)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {cert.certificate_url && (
                      <a
                        href={cert.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mt-2"
                      >
                        Lihat Sertifikat
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <p className="text-gray-500">Belum ada sertifikat</p>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t">
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

      {/* Form Modal */}
      <FormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        title={isEditMode ? 'Edit Sertifikat' : 'Buat Sertifikat Baru'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Sertifikat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
              placeholder="Contoh: Ahli Budaya Jawa Tengah"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
              placeholder="Deskripsi sertifikat..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Diraih <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date_earned}
              onChange={(e) => setFormData(prev => ({ ...prev, date_earned: e.target.value }))}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFormModal(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              disabled={actionLoading}
            >
              Batal
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 bg-[#D4A017] text-white rounded-xl font-semibold hover:bg-[#B38B12] transition-colors"
              disabled={actionLoading}
            >
              {actionLoading ? 'Loading...' : isEditMode ? '💾 Update' : '✨ Buat'}
            </motion.button>
          </div>
        </form>
      </FormModal>

      {/* Delete Confirmation */}
      {selectedCertificate && (
        <FormModal
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          title="⚠️ Hapus Sertifikat"
          size="md"
        >
          <div className="space-y-6">
            {/* Warning Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hapus "{selectedCertificate.title}"?
              </h3>
              <p className="text-gray-600">
                Sertifikat ini akan dihapus dari akun {selectedCertificate.user.full_name}. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            {/* Preview Card */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green to-blue-500 flex items-center justify-center text-white font-bold">
                  {selectedCertificate.user.full_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{selectedCertificate.title}</p>
                  <p className="text-sm text-gray-600">{selectedCertificate.user.full_name}</p>
                  <p className="text-xs text-red-600 mt-1">
                    Diraih: {new Date(selectedCertificate.date_earned).toLocaleDateString('id-ID')}
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
                onClick={() => setShowDeleteDialog(false)}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Batal
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: actionLoading ? 1 : 1.02 }}
                whileTap={{ scale: actionLoading ? 1 : 0.98 }}
                onClick={handleDelete}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menghapus...
                  </>
                ) : (
                  <>
                    🗑️ Ya, Hapus
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
