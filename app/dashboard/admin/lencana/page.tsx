'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { motion } from 'framer-motion';

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
  points: number;
  created_at: string;
}

interface FormData {
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
  points: string;
}

export default function BadgesListPage() {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    icon: '🏆',
    category: 'explorer',
    requirement: '',
    points: '10'
  });

  useEffect(() => {
    fetchBadges();
  }, [page, search]);

  const fetchBadges = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(
        `/api/admin/badges?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setBadges(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: '🏆',
      category: 'explorer',
      requirement: '',
      points: '10'
    });
    setSelectedBadge(null);
    setIsEditMode(false);
  };

  const handleAdd = () => {
    resetForm();
    setShowFormModal(true);
  };

  const handleEdit = (badge: Badge) => {
    setSelectedBadge(badge);
    setIsEditMode(true);
    setFormData({
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      category: badge.category,
      requirement: badge.requirement,
      points: badge.points.toString()
    });
    setShowFormModal(true);
  };

  const handleDetail = (badge: Badge) => {
    setSelectedBadge(badge);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (badge: Badge) => {
    setSelectedBadge(badge);
    setShowDeleteDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = isEditMode 
        ? `/api/admin/badges/${selectedBadge?.id}`
        : '/api/admin/badges';
      
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          points: parseInt(formData.points)
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(isEditMode ? 'Lencana berhasil diupdate' : 'Lencana berhasil ditambahkan');
        setShowFormModal(false);
        resetForm();
        fetchBadges();
      } else {
        alert(data.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Error saving badge:', error);
      alert('Terjadi kesalahan saat menyimpan lencana');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedBadge) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/badges/${selectedBadge.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        alert('Lencana berhasil dihapus');
        setShowDeleteDialog(false);
        setSelectedBadge(null);
        fetchBadges();
      } else {
        alert(data.error || 'Gagal menghapus lencana');
      }
    } catch (error) {
      console.error('Error deleting badge:', error);
      alert('Terjadi kesalahan saat menghapus lencana');
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: string } = {
      explorer: 'bg-blue-100 text-blue-700',
      collector: 'bg-purple-100 text-purple-700',
      master: 'bg-yellow-100 text-yellow-700',
      social: 'bg-green-100 text-green-700',
      special: 'bg-pink-100 text-pink-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Kelola Lencana</h1>
          <p className="text-gray-600 mt-1">Manage lencana pencapaian</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAdd()}
          className="px-6 flex items-center gap-1 py-2.5 bg-[#D4A017] text-white rounded-xl font-semibold hover:bg-[#B38B12] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
          </svg>
          Tambah Lencana
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Cari lencana..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 mb-6"
        />

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Icon</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Nama</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Kategori</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Poin</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {badges.map((badge) => (
                  <tr key={badge.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="text-2xl">{badge.icon}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{badge.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryBadge(badge.category)}`}>
                        {badge.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {badge.points} poin
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDetail(badge)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleEdit(badge)}
                          className="px-3 py-1 text-sm text-primary-green hover:bg-green-50 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => handleDeleteClick(badge)}
                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Form Modal (Add/Edit) */}
      <Modal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          resetForm();
        }}
        title={isEditMode ? 'Edit Lencana' : 'Tambah Lencana'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon (Emoji) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="🏆"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Gunakan emoji atau URL image</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
              >
                <option value="explorer">Explorer</option>
                <option value="collector">Collector</option>
                <option value="master">Master</option>
                <option value="social">Social</option>
                <option value="special">Special</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poin <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                min="1"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirement <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                rows={3}
                placeholder="Contoh: Scan 10 budaya berbeda"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setShowFormModal(false);
                resetForm();
              }}
              className="px-6 py-2 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="px-6 py-2 bg-primary-green text-white rounded-xl font-semibold hover:bg-primary-green/90 disabled:opacity-50"
            >
              {formLoading ? 'Menyimpan...' : isEditMode ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedBadge(null);
        }}
        title="Detail Lencana"
        size="lg"
      >
        {selectedBadge && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{selectedBadge.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedBadge.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryBadge(selectedBadge.category)}`}>
                  {selectedBadge.category}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Deskripsi</h3>
              <p className="text-gray-900">{selectedBadge.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Poin</h3>
                <p className="text-gray-900">{selectedBadge.points} poin</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Requirement</h3>
              <p className="text-gray-900">{selectedBadge.requirement}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Dibuat</h3>
              <p className="text-gray-900">
                {new Date(selectedBadge.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedBadge(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Lencana"
        message={`Apakah Anda yakin ingin menghapus lencana "${selectedBadge?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
}
