'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import FormModal from '@/components/ui/FormModal';
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
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDetail(challenge)}
                          className="px-4 py-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                        >
                          Detail
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(challenge)}
                          className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                        >
                          Edit
                        </motion.button>
                        {user?.role === 'admin' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteClick(challenge)}
                            className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                          >
                            Hapus
                          </motion.button>
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
      <FormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          resetForm();
        }}
        title={isEditMode ? 'Edit Tantangan' : 'Tambah Tantangan'}
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className='col-span-2'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poin <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                rows={3}
                placeholder="Contoh: Scan 5 budaya berbeda"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowFormModal(false);
                resetForm();
              }}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Batal
            </motion.button>
            <motion.button
              type="submit"
              disabled={formLoading}
              whileHover={{ scale: formLoading ? 1 : 1.02 }}
              whileTap={{ scale: formLoading ? 1 : 0.98 }}
              className="px-6 py-2.5 bg-[#D4A017] text-white rounded-xl font-semibold hover:bg-[#B38B12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formLoading ? 'Menyimpan...' : isEditMode ? '💾 Update' : '✨ Simpan'}
            </motion.button>
          </div>
        </form>
      </FormModal>

      {/* Detail Modal */}
      <FormModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedChallenge(null);
        }}
        title="Detail Tantangan"
      >
        {selectedChallenge && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedChallenge.title}</h3>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryBadge(selectedChallenge.category)}`}>
                  {selectedChallenge.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyBadge(selectedChallenge.difficulty)}`}>
                  {selectedChallenge.difficulty}
                </span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-green-700 mb-1">Deskripsi</h3>
              <p className="text-gray-900">{selectedChallenge.description}</p>
            </div>

            <div className="">
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-yellow-700 mb-1">Poin</h3>
                <p className="text-gray-900 font-semibold">🎯 {selectedChallenge.points} poin</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-blue-700 mb-1">Requirements</h3>
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

            <div className="flex items-center gap-3 pt-4 border-t">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedChallenge(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Tutup
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowDetailModal(false);
                  handleEdit(selectedChallenge);
                }}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                ✏️ Edit Tantangan
              </motion.button>
            </div>
          </div>
        )}
      </FormModal>

      {/* Delete Confirmation */}
      <FormModal
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedChallenge(null);
        }}
        title="⚠️ Hapus Tantangan"
        size="md"
      >
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
              </svg>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Hapus "{selectedChallenge?.title}"?
            </h3>
            <p className="text-gray-600">
              Apakah Anda yakin ingin menghapus tantangan ini? Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>

          {selectedChallenge && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{selectedChallenge.title}</p>
                  <p className="text-sm text-gray-600 capitalize">{selectedChallenge.category} • {selectedChallenge.difficulty} • {selectedChallenge.points} poin</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowDeleteDialog(false);
                setSelectedChallenge(null);
              }}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Batal
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDelete}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              🗑️ Ya, Hapus
            </motion.button>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
