'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { motion } from 'framer-motion';

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  points: number;
  requirements: string;
  created_at: string;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  points: string;
  requirements: string;
}

export default function ChallengesListPage() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'scan',
    difficulty: 'easy',
    points: '10',
    requirements: ''
  });

  useEffect(() => {
    fetchChallenges();
  }, [page, search]);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(
        `/api/admin/challenges?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setChallenges(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'scan',
      difficulty: 'easy',
      points: '10',
      requirements: ''
    });
    setSelectedChallenge(null);
    setIsEditMode(false);
  };

  const handleAdd = () => {
    resetForm();
    setShowFormModal(true);
  };

  const handleEdit = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsEditMode(true);
    setFormData({
      title: challenge.title,
      description: challenge.description,
      category: challenge.category,
      difficulty: challenge.difficulty,
      points: challenge.points.toString(),
      requirements: challenge.requirements
    });
    setShowFormModal(true);
  };

  const handleDetail = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowDeleteDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = isEditMode 
        ? `/api/admin/challenges/${selectedChallenge?.id}`
        : '/api/admin/challenges';
      
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
        alert(isEditMode ? 'Tantangan berhasil diupdate' : 'Tantangan berhasil ditambahkan');
        setShowFormModal(false);
        resetForm();
        fetchChallenges();
      } else {
        alert(data.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Error saving challenge:', error);
      alert('Terjadi kesalahan saat menyimpan tantangan');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedChallenge) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/challenges/${selectedChallenge.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        alert('Tantangan berhasil dihapus');
        setShowDeleteDialog(false);
        setSelectedChallenge(null);
        fetchChallenges();
      } else {
        alert(data.error || 'Gagal menghapus tantangan');
      }
    } catch (error) {
      console.error('Error deleting challenge:', error);
      alert('Terjadi kesalahan saat menghapus tantangan');
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: string } = {
      scan: 'bg-blue-100 text-blue-700',
      quiz: 'bg-purple-100 text-purple-700',
      article: 'bg-green-100 text-green-700',
      exploration: 'bg-orange-100 text-orange-700',
      social: 'bg-pink-100 text-pink-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      easy: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      hard: 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Kelola Tantangan</h1>
          <p className="text-gray-600 mt-1">Manage tantangan untuk user</p>
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
          Tambah Tantangan
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Cari tantangan..."
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
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Judul</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Kategori</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Kesulitan</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Poin</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {challenges.map((challenge) => (
                  <tr key={challenge.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{challenge.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryBadge(challenge.category)}`}>
                        {challenge.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyBadge(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {challenge.points} poin
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDetail(challenge)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleEdit(challenge)}
                          className="px-3 py-1 text-sm text-primary-green hover:bg-green-50 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => handleDeleteClick(challenge)}
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
        title={isEditMode ? 'Edit Tantangan' : 'Tambah Tantangan'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                rows={4}
                required
              />
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
                <option value="scan">Scan</option>
                <option value="quiz">Quiz</option>
                <option value="article">Article</option>
                <option value="exploration">Exploration</option>
                <option value="social">Social</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kesulitan <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
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
                Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                rows={3}
                placeholder="Contoh: Scan 5 budaya berbeda"
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
          setSelectedChallenge(null);
        }}
        title="Detail Tantangan"
        size="lg"
      >
        {selectedChallenge && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Judul</h3>
              <p className="text-gray-900">{selectedChallenge.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Deskripsi</h3>
              <p className="text-gray-900">{selectedChallenge.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Kategori</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryBadge(selectedChallenge.category)}`}>
                  {selectedChallenge.category}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Kesulitan</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyBadge(selectedChallenge.difficulty)}`}>
                  {selectedChallenge.difficulty}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Poin</h3>
                <p className="text-gray-900">{selectedChallenge.points} poin</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Requirements</h3>
              <p className="text-gray-900">{selectedChallenge.requirements}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Dibuat</h3>
              <p className="text-gray-900">
                {new Date(selectedChallenge.created_at).toLocaleDateString('id-ID', {
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
          setSelectedChallenge(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Tantangan"
        message={`Apakah Anda yakin ingin menghapus tantangan "${selectedChallenge?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
}
