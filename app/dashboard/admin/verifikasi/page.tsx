'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import FormModal from '@/components/ui/FormModal';

interface VerificationRequest {
  id: number;
  user_id: number;
  reason?: string;
  portfolio_url?: string;
  verification_status: string;
  created_at: string;
  user: {
    id: number;
    email: string;
    full_name: string;
    role: string;
    created_at: string;
    profile?: {
      bio?: string;
      avatar?: string;
    };
    _count?: {
      articles: number;
      scan_history: number;
    };
  };
}

export default function VerifikasiPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchRequests();
  }, [page, search]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search,
        verification_status: 'pending'
      });
      
      const response = await fetch(`/api/admin/verifications?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setRequests(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const handleApproveClick = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setShowApproveDialog(true);
  };

  const handleRejectClick = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setRejectReason('');
    setShowRejectDialog(true);
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/verifications/${selectedRequest.id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        alert('User berhasil diverifikasi sebagai contributor');
        setShowApproveDialog(false);
        setSelectedRequest(null);
        fetchRequests();
      } else {
        alert(data.error || 'Gagal approve verifikasi');
      }
    } catch (error) {
      console.error('Error approving verification:', error);
      alert('Terjadi kesalahan');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;
    if (!rejectReason.trim()) {
      alert('Mohon isi alasan penolakan');
      return;
    }
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/verifications/${selectedRequest.id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason: rejectReason })
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Verifikasi berhasil ditolak');
        setShowRejectDialog(false);
        setSelectedRequest(null);
        setRejectReason('');
        fetchRequests();
      } else {
        alert(data.error || 'Gagal reject verifikasi');
      }
    } catch (error) {
      console.error('Error rejecting verification:', error);
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
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Verifikasi Contributor</h1>
          <p className="text-gray-600 mt-1">Kelola permintaan verifikasi menjadi contributor</p>
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
            placeholder="Cari permintaan..."
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aktivitas</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal Daftar</th>
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
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada permintaan verifikasi
                  </td>
                </tr>
              ) : (
                requests.map((request, index) => (
                  <motion.tr
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-green to-blue-500 flex items-center justify-center text-white font-bold">
                          {request.user.full_name.charAt(0)}
                        </div>
                        <p className="font-semibold text-gray-900">{request.user.full_name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{request.user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.user._count ? (
                        <div className="space-y-1">
                          <p>{request.user._count.articles} artikel</p>
                          <p>{request.user._count.scan_history} scan</p>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(request.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDetail(request)}
                          className="px-4 py-1.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                        >
                          Detail
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApproveClick(request)}
                          className="px-4 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                        >
                          Approve
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRejectClick(request)}
                          className="px-4 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                          Reject
                        </motion.button>
                      </div>
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
      {selectedRequest && (
        <FormModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Detail Permintaan Verifikasi"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-green to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {selectedRequest.user.full_name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedRequest.user.full_name}</h3>
                <p className="text-gray-600">{selectedRequest.user.email}</p>
                <span className="inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                  Menunggu Verifikasi
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Total Artikel</p>
                <p className="text-2xl font-bold text-purple-700">
                  {selectedRequest.user._count?.articles || 0}
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Riwayat Scan</p>
                <p className="text-2xl font-bold text-orange-700">
                  {selectedRequest.user._count?.scan_history || 0}
                </p>
              </div>
            </div>

            {selectedRequest.reason && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Alasan Mendaftar</p>
                <p className="text-gray-700">{selectedRequest.reason}</p>
              </div>
            )}

            {selectedRequest.portfolio_url && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Portfolio</p>
                <a href={selectedRequest.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {selectedRequest.portfolio_url}
                </a>
              </div>
            )}

            {selectedRequest.user.profile?.bio && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Bio</p>
                <p className="text-gray-700">{selectedRequest.user.profile.bio}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 mb-2">Tanggal Pendaftaran</p>
              <p className="text-gray-700">{new Date(selectedRequest.user.created_at).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</p>
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowDetailModal(false);
                  handleRejectClick(selectedRequest);
                }}
                className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
              >
                ❌ Reject
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowDetailModal(false);
                  handleApproveClick(selectedRequest);
                }}
                className="px-6 py-2.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                ✓ Approve
              </motion.button>
            </div>
          </div>
        </FormModal>
      )}

      {/* Approve Confirmation */}
      {selectedRequest && (
        <FormModal
          isOpen={showApproveDialog}
          onClose={() => setShowApproveDialog(false)}
          title="✓ Approve Verifikasi"
          size="md"
        >
          <div className="space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Approve "{selectedRequest.user.full_name}"?
              </h3>
              <p className="text-gray-600">
                User ini akan diupgrade menjadi contributor dan bisa menulis artikel serta konten budaya.
              </p>
            </div>

            {/* Preview Card */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  {selectedRequest.user.full_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{selectedRequest.user.full_name}</p>
                  <p className="text-sm text-gray-600">{selectedRequest.user.email}</p>
                  <p className="text-xs text-green-600 mt-1">
                    Role: User → Contributor
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
                onClick={() => setShowApproveDialog(false)}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Batal
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: actionLoading ? 1 : 1.02 }}
                whileTap={{ scale: actionLoading ? 1 : 0.98 }}
                onClick={handleApprove}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    ✓ Ya, Approve
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </FormModal>
      )}

      {/* Reject Dialog */}
      {selectedRequest && (
        <FormModal
          isOpen={showRejectDialog}
          onClose={() => setShowRejectDialog(false)}
          title="❌ Reject Verifikasi"
          size="md"
        >
          <div className="space-y-6">
            {/* Warning Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Reject "{selectedRequest.user.full_name}"?
              </h3>
              <p className="text-gray-600">
                Verifikasi user ini akan ditolak. Mohon berikan alasan penolakan yang jelas.
              </p>
            </div>

            {/* Preview Card */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  {selectedRequest.user.full_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{selectedRequest.user.full_name}</p>
                  <p className="text-sm text-gray-600">{selectedRequest.user.email}</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alasan Penolakan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="Masukkan alasan penolakan..."
                required
              />
            </div>
            
            {/* Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowRejectDialog(false)}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Batal
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: actionLoading ? 1 : 1.02 }}
                whileTap={{ scale: actionLoading ? 1 : 0.98 }}
                onClick={handleReject}
                disabled={actionLoading || !rejectReason.trim()}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    ❌ Ya, Reject
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
