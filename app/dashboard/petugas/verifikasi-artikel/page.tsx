'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import FormModal from '@/components/ui/FormModal';
import { motion } from 'framer-motion';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  status: string;
  created_at: string;
  published_at: string;
  author: {
    id: number;
    full_name: string;
    email: string;
    role: string;
  };
  category_rel?: {
    id: number;
    name: string;
  };
}

export default function ApprovalArtikelPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('draft');

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchArticles();
  }, [page, search, statusFilter]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        status: statusFilter,
        search
      });
      
      const response = await fetch(`/api/admin/approvals/articles?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setArticles(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedArticle) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/approvals/articles/${selectedArticle.id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Artikel berhasil disetujui dan dipublikasikan!');
        setShowApproveDialog(false);
        setSelectedArticle(null);
        fetchArticles();
      } else {
        alert(data.error || 'Gagal approve artikel');
      }
    } catch (error) {
      console.error('Error approving article:', error);
      alert('Terjadi kesalahan');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedArticle) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/approvals/articles/${selectedArticle.id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason: rejectReason })
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Artikel ditolak dan diarsipkan');
        setShowRejectDialog(false);
        setSelectedArticle(null);
        setRejectReason('');
        fetchArticles();
      } else {
        alert(data.error || 'Gagal reject artikel');
      }
    } catch (error) {
      console.error('Error rejecting article:', error);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Approval Artikel</h1>
          <p className="text-gray-600 mt-1">Kelola persetujuan artikel dari contributor</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
            </svg>
            <input
              type="text"
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
          >
            <option value="draft">Draft (Menunggu)</option>
            <option value="published">Published</option>
            <option value="archive">Archive (Ditolak)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Tidak ada data</td>
                </tr>
              ) : (
                articles.map((article, index) => (
                  <motion.tr
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">{article.excerpt}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{article.author.full_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{article.category_rel?.name || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(article.status)}`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(article.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setSelectedArticle(article); setShowDetailModal(true); }}
                          className="px-4 py-1.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                        >
                          Detail
                        </motion.button>
                        {article.status === 'draft' && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => { setSelectedArticle(article); setShowApproveDialog(true); }}
                              className="px-4 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                            >
                              Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => { setSelectedArticle(article); setShowRejectDialog(true); }}
                              className="px-4 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                            >
                              Reject
                            </motion.button>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedArticle && (
        <FormModal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Detail Artikel">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Judul</p>
              <p className="font-semibold text-gray-900">{selectedArticle.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Excerpt</p>
              <p className="text-gray-700">{selectedArticle.excerpt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Author</p>
              <p className="text-gray-700">{selectedArticle.author.full_name} ({selectedArticle.author.role})</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Kategori</p>
              <p className="text-gray-700">{selectedArticle.category_rel?.name || '-'}</p>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button onClick={() => setShowDetailModal(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200">
                Tutup
              </button>
            </div>
          </div>
        </FormModal>
      )}

      {/* Approve Dialog */}
      {selectedArticle && (
        <FormModal isOpen={showApproveDialog} onClose={() => setShowApproveDialog(false)} title="✅ Approve Artikel">
          <div className="space-y-4">
            <p className="text-gray-600">
              Apakah Anda yakin ingin menyetujui artikel <strong>"{selectedArticle.title}"</strong> dan mempublikasikannya?
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button onClick={() => setShowApproveDialog(false)} disabled={actionLoading} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
                Batal
              </button>
              <button onClick={handleApprove} disabled={actionLoading} className="px-6 py-2.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600">
                {actionLoading ? 'Loading...' : '✓ Ya, Approve'}
              </button>
            </div>
          </div>
        </FormModal>
      )}

      {/* Reject Dialog */}
      {selectedArticle && (
        <FormModal isOpen={showRejectDialog} onClose={() => setShowRejectDialog(false)} title="❌ Reject Artikel">
          <div className="space-y-4">
            <p className="text-gray-600">
              Anda akan menolak artikel <strong>"{selectedArticle.title}"</strong>
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alasan Penolakan (Opsional)
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="Jelaskan alasan penolakan..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button onClick={() => setShowRejectDialog(false)} disabled={actionLoading} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
                Batal
              </button>
              <button onClick={handleReject} disabled={actionLoading} className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600">
                {actionLoading ? 'Loading...' : '❌ Ya, Reject'}
              </button>
            </div>
          </div>
        </FormModal>
      )}
    </div>
  );
}
