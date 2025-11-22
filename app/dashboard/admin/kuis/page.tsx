'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { motion } from 'framer-motion';

interface Quiz {
  id: number;
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  total_questions: number;
  status: string;
  description?: string;
  thumbnail?: string;
  time_limit?: number;
  created_at: string;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  difficulty: string;
  time_limit: string;
  status: string;
}

export default function QuizzesListPage() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    description: '',
    thumbnail: '',
    category: '',
    difficulty: 'easy',
    time_limit: '30',
    status: 'draft'
  });

  useEffect(() => {
    fetchQuizzes();
  }, [page, search]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(
        `/api/admin/quizzes?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setQuizzes(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      thumbnail: '',
      category: '',
      difficulty: 'easy',
      time_limit: '30',
      status: 'draft'
    });
    setSelectedQuiz(null);
    setIsEditMode(false);
  };

  const handleAdd = () => {
    resetForm();
    setShowFormModal(true);
  };

  const handleEdit = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsEditMode(true);
    setFormData({
      title: quiz.title,
      slug: quiz.slug,
      description: quiz.description || '',
      thumbnail: quiz.thumbnail || '',
      category: quiz.category || '',
      difficulty: quiz.difficulty,
      time_limit: quiz.time_limit?.toString() || '30',
      status: quiz.status
    });
    setShowFormModal(true);
  };

  const handleDetail = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowDeleteDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = isEditMode 
        ? `/api/admin/quizzes/${selectedQuiz?.id}`
        : '/api/admin/quizzes';
      
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          time_limit: formData.time_limit ? parseInt(formData.time_limit) : null
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(isEditMode ? 'Kuis berhasil diupdate' : 'Kuis berhasil ditambahkan');
        setShowFormModal(false);
        resetForm();
        fetchQuizzes();
      } else {
        alert(data.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Terjadi kesalahan saat menyimpan kuis');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedQuiz) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/quizzes/${selectedQuiz.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        alert('Kuis berhasil dihapus');
        setShowDeleteDialog(false);
        setSelectedQuiz(null);
        fetchQuizzes();
      } else {
        alert(data.error || 'Gagal menghapus kuis');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Terjadi kesalahan saat menghapus kuis');
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      easy: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      hard: 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      published: 'bg-green-100 text-green-700',
      draft: 'bg-gray-100 text-gray-700',
      archived: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Kelola Kuis</h1>
          <p className="text-gray-600 mt-1">Manage kuis budaya</p>
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
          Tambah Kuis
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Cari kuis..."
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
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Kesulitan</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Soal</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{quiz.title}</div>
                      <div className="text-sm text-gray-500">{quiz.slug}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyBadge(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {quiz.total_questions} soal
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(quiz.status)}`}>
                        {quiz.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDetail(quiz)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleEdit(quiz)}
                          className="px-3 py-1 text-sm text-primary-green hover:bg-green-50 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => handleDeleteClick(quiz)}
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
        title={isEditMode ? 'Edit Kuis' : 'Tambah Kuis'}
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
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="judul-kuis-url-friendly"
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="Budaya, Sejarah, dll"
              />
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
                Batas Waktu (menit)
              </label>
              <input
                type="number"
                value={formData.time_limit}
                onChange={(e) => setFormData({ ...formData, time_limit: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                min="1"
                placeholder="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Untuk menambahkan soal/pertanyaan, simpan kuis ini terlebih dahulu, lalu edit kuis dan tambahkan soal dari halaman edit.
            </p>
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
          setSelectedQuiz(null);
        }}
        title="Detail Kuis"
        size="lg"
      >
        {selectedQuiz && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Judul</h3>
              <p className="text-gray-900">{selectedQuiz.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Slug</h3>
              <p className="text-gray-600 font-mono text-sm">{selectedQuiz.slug}</p>
            </div>

            {selectedQuiz.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Deskripsi</h3>
                <p className="text-gray-900">{selectedQuiz.description}</p>
              </div>
            )}

            {selectedQuiz.thumbnail && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Thumbnail</h3>
                <img 
                  src={selectedQuiz.thumbnail} 
                  alt={selectedQuiz.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {selectedQuiz.category && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Kategori</h3>
                  <p className="text-gray-900">{selectedQuiz.category}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Kesulitan</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyBadge(selectedQuiz.difficulty)}`}>
                  {selectedQuiz.difficulty}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Total Soal</h3>
                <p className="text-gray-900">{selectedQuiz.total_questions} soal</p>
              </div>

              {selectedQuiz.time_limit && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Batas Waktu</h3>
                  <p className="text-gray-900">{selectedQuiz.time_limit} menit</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Status</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(selectedQuiz.status)}`}>
                  {selectedQuiz.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Dibuat</h3>
              <p className="text-gray-900">
                {new Date(selectedQuiz.created_at).toLocaleDateString('id-ID', {
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
          setSelectedQuiz(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Kuis"
        message={`Apakah Anda yakin ingin menghapus kuis "${selectedQuiz?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
}
