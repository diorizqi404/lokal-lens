'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import FormModal from '@/components/ui/FormModal';
import { motion } from 'framer-motion';

interface Culture {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  province: string;
  status: string;
  created_at: string;
  category_rel?: { id: number; name: string };
  images: Array<{ id: number; image_url: string; is_primary: boolean }>;
}

export default function ApprovalBudayaPage() {
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('draft');
  const [selectedCulture, setSelectedCulture] = useState<Culture | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchCultures();
  }, [page, search, statusFilter]);

  const fetchCultures = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({ page: page.toString(), limit: '10', status: statusFilter, search });
      const response = await fetch(`/api/admin/approvals/cultures?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCultures(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedCulture) return;
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/approvals/cultures/${selectedCulture.id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        alert('Budaya berhasil disetujui!');
        setShowApproveDialog(false);
        setSelectedCulture(null);
        fetchCultures();
      } else {
        alert(data.error || 'Gagal approve');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedCulture) return;
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/approvals/cultures/${selectedCulture.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        alert('Budaya ditolak dan diarsipkan');
        setShowRejectDialog(false);
        setSelectedCulture(null);
        fetchCultures();
      } else {
        alert(data.error || 'Gagal reject');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: 'bg-yellow-100 text-yellow-700',
      published: 'bg-green-100 text-green-700',
      archive: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Approval Budaya</h1>
        <p className="text-gray-600 mt-1">Kelola persetujuan data budaya dari contributor</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Cari budaya..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20">
            <option value="draft">Draft (Menunggu)</option>
            <option value="published">Published</option>
            <option value="archive">Archive (Ditolak)</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Budaya</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lokasi</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : cultures.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Tidak ada data</td></tr>
              ) : (
                cultures.map((culture, index) => (
                  <motion.tr
                    key={culture.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{culture.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">{culture.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{culture.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{culture.category_rel?.name || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(culture.status)}`}>
                        {culture.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setSelectedCulture(culture); setShowDetailModal(true); }} className="px-4 py-1.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium">Detail</button>
                        {culture.status === 'draft' && (
                          <>
                            <button onClick={() => { setSelectedCulture(culture); setShowApproveDialog(true); }} className="px-4 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium">Approve</button>
                            <button onClick={() => { setSelectedCulture(culture); setShowRejectDialog(true); }} className="px-4 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium">Reject</button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex justify-between">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50">Previous</button>
            <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50">Next</button>
          </div>
        )}
      </div>

      {selectedCulture && (
        <>
          <FormModal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Detail Budaya">
            <div className="space-y-4">
              <div><p className="text-sm text-gray-500 mb-1">Nama</p><p className="font-semibold text-gray-900">{selectedCulture.name}</p></div>
              <div><p className="text-sm text-gray-500 mb-1">Deskripsi</p><p className="text-gray-700">{selectedCulture.description}</p></div>
              <div><p className="text-sm text-gray-500 mb-1">Lokasi</p><p className="text-gray-700">{selectedCulture.location}, {selectedCulture.province}</p></div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={() => setShowDetailModal(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200">Tutup</button>
              </div>
            </div>
          </FormModal>

          <FormModal isOpen={showApproveDialog} onClose={() => setShowApproveDialog(false)} title="✅ Approve Budaya">
            <div className="space-y-4">
              <p className="text-gray-600">Apakah Anda yakin ingin menyetujui budaya <strong>"{selectedCulture.name}"</strong>?</p>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={() => setShowApproveDialog(false)} disabled={actionLoading} className="px-6 py-2.5 border text-gray-700 rounded-xl font-semibold">Batal</button>
                <button onClick={handleApprove} disabled={actionLoading} className="px-6 py-2.5 bg-green-500 text-white rounded-xl font-semibold">{actionLoading ? 'Loading...' : '✓ Ya, Approve'}</button>
              </div>
            </div>
          </FormModal>

          <FormModal isOpen={showRejectDialog} onClose={() => setShowRejectDialog(false)} title="❌ Reject Budaya">
            <div className="space-y-4">
              <p className="text-gray-600">Anda akan menolak budaya <strong>"{selectedCulture.name}"</strong></p>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={() => setShowRejectDialog(false)} disabled={actionLoading} className="px-6 py-2.5 border text-gray-700 rounded-xl font-semibold">Batal</button>
                <button onClick={handleReject} disabled={actionLoading} className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-semibold">{actionLoading ? 'Loading...' : '❌ Ya, Reject'}</button>
              </div>
            </div>
          </FormModal>
        </>
      )}
    </div>
  );
}
