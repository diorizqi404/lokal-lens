'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import FormModal from '@/components/ui/FormModal';

interface EndangeredReport {
  id: number;
  culture_name: string;
  threat_type: string;
  description: string;
  location: string;
  province?: string;
  city?: string;
  image_url?: string;
  reporter_name?: string;
  reporter_email?: string;
  is_anonymous: boolean;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  reviewed_at?: string;
  created_at: string;
  user?: {
    id: number;
    full_name: string;
    email: string;
  };
  reviewer?: {
    id: number;
    full_name: string;
  };
}

export default function LaporanBudayaPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<EndangeredReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<EndangeredReport | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchReports();
  }, [page, search, statusFilter]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search,
        ...(statusFilter && { status: statusFilter })
      });
      
      const response = await fetch(`/api/admin/endangered-reports?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setReports(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (report: EndangeredReport) => {
    setSelectedReport(report);
    setAdminNotes(report.admin_notes || '');
    setShowDetailModal(true);
  };

  const handleDeleteClick = (report: EndangeredReport) => {
    setSelectedReport(report);
    setShowDeleteDialog(true);
  };

  const handleApprove = async () => {
    if (!selectedReport) return;
    await handleReview('approved');
  };

  const handleReject = async () => {
    if (!selectedReport) return;
    if (!adminNotes.trim()) {
      alert('Mohon isi catatan admin untuk penolakan');
      return;
    }
    await handleReview('rejected');
  };

  const handleReview = async (status: 'approved' | 'rejected') => {
    if (!selectedReport) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/endangered-reports/${selectedReport.id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          status,
          admin_notes: adminNotes 
        })
      });
      
      const data = await response.json();
      if (data.success) {
        alert(`Laporan berhasil di-${status === 'approved' ? 'approve' : 'reject'}`);
        setShowDetailModal(false);
        setSelectedReport(null);
        setAdminNotes('');
        fetchReports();
      } else {
        alert(data.error || 'Gagal review laporan');
      }
    } catch (error) {
      console.error('Error reviewing report:', error);
      alert('Terjadi kesalahan');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedReport) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/endangered-reports/${selectedReport.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Laporan berhasil dihapus');
        setShowDeleteDialog(false);
        setSelectedReport(null);
        fetchReports();
      } else {
        alert(data.error || 'Gagal menghapus laporan');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Terjadi kesalahan');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      default: return 'Pending';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Laporan Budaya Terancam</h1>
          <p className="text-gray-600 mt-1">Kelola laporan budaya terancam dari user</p>
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
              placeholder="Cari laporan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
          >
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Budaya</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jenis Ancaman</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lokasi</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pelapor</th>
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
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                reports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{report.culture_name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(report.created_at).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.threat_type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {report.city}, {report.province}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {report.is_anonymous ? (
                        <span className="italic">Anonymous</span>
                      ) : (
                        report.user?.full_name || report.reporter_name || '-'
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                        {getStatusLabel(report.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDetail(report)}
                          className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                        >
                          Detail
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteClick(report)}
                          className="px-4 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                          Hapus
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
      {selectedReport && (
        <FormModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Detail Laporan Budaya Terancam"
        >
          <div className="space-y-6">
            {selectedReport.image_url && (
              <img
                src={selectedReport.image_url}
                alt={selectedReport.culture_name}
                className="w-full h-64 object-cover rounded-xl"
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nama Budaya</p>
                <p className="font-semibold text-gray-900">{selectedReport.culture_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Jenis Ancaman</p>
                <p className="font-semibold text-gray-900">{selectedReport.threat_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Kota</p>
                <p className="font-semibold text-gray-900">{selectedReport.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Provinsi</p>
                <p className="font-semibold text-gray-900">{selectedReport.province}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Lokasi Lengkap</p>
              <p className="text-gray-700">{selectedReport.location}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedReport.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pelapor</p>
                <p className="font-semibold text-gray-900">
                  {selectedReport.is_anonymous ? (
                    <span className="italic">Anonymous</span>
                  ) : (
                    selectedReport.user?.full_name || selectedReport.reporter_name || '-'
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedReport.status)}`}>
                  {getStatusLabel(selectedReport.status)}
                </span>
              </div>
            </div>

            {selectedReport.status !== 'pending' && (
              <>
                {selectedReport.reviewer && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Di-review oleh</p>
                    <p className="font-semibold text-gray-900">{selectedReport.reviewer.full_name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedReport.reviewed_at && new Date(selectedReport.reviewed_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                )}
                {selectedReport.admin_notes && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Catatan Admin</p>
                    <p className="text-gray-700">{selectedReport.admin_notes}</p>
                  </div>
                )}
              </>
            )}

            {selectedReport.status === 'pending' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan Admin {selectedReport.status === 'pending' && '(Opsional untuk approval, wajib untuk reject)'}
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="Masukkan catatan..."
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                disabled={actionLoading}
              >
                Tutup
              </motion.button>
              {selectedReport.status === 'pending' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReject}
                    className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Loading...' : '❌ Reject'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApprove}
                    className="px-6 py-2.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Loading...' : '✓ Approve'}
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </FormModal>
      )}

      {/* Delete Confirmation */}
      {selectedReport && (
        <FormModal
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          title="⚠️ Hapus Laporan"
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
                Hapus Laporan "{selectedReport.culture_name}"?
              </h3>
              <p className="text-gray-600">
                Apakah Anda yakin ingin menghapus laporan ini? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            {/* Preview Card */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                {selectedReport.image_url && (
                  <img 
                    src={selectedReport.image_url} 
                    alt={selectedReport.culture_name} 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{selectedReport.culture_name}</p>
                  <p className="text-sm text-gray-600">{selectedReport.location}</p>
                  <p className="text-xs text-red-600 mt-1">
                    Jenis Ancaman: {selectedReport.threat_type}
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
