'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags?: string;
  province?: string;
  read_time: number;
  is_highlight: boolean;
  views: number;
  published_at: string;
  author: {
    id: number;
    full_name: string;
    email: string;
  };
}

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string;
  province: string;
  read_time: string;
  is_highlight: boolean;
}

export default function ArticlesListPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: 'budaya',
    tags: '',
    province: '',
    read_time: '5',
    is_highlight: false
  });

  useEffect(() => {
    fetchArticles();
  }, [page, search]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(
        `/api/admin/articles?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: '',
      category: 'budaya',
      tags: '',
      province: '',
      read_time: '5',
      is_highlight: false
    });
    setSelectedArticle(null);
    setIsEditMode(false);
  };

  const handleAdd = () => {
    resetForm();
    setShowFormModal(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setIsEditMode(true);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      featured_image: article.featured_image,
      category: article.category,
      tags: article.tags || '',
      province: article.province || '',
      read_time: article.read_time.toString(),
      is_highlight: article.is_highlight
    });
    setShowFormModal(true);
  };

  const handleDetail = (article: Article) => {
    setSelectedArticle(article);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    setShowDeleteDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = isEditMode 
        ? `/api/admin/articles/${selectedArticle?.id}`
        : '/api/admin/articles';
      
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          read_time: parseInt(formData.read_time)
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(isEditMode ? 'Artikel berhasil diupdate' : 'Artikel berhasil ditambahkan');
        setShowFormModal(false);
        resetForm();
        fetchArticles();
      } else {
        alert(data.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Terjadi kesalahan saat menyimpan artikel');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedArticle) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/articles/${selectedArticle.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        alert('Artikel berhasil dihapus');
        setShowDeleteDialog(false);
        setSelectedArticle(null);
        fetchArticles();
      } else {
        alert(data.error || 'Gagal menghapus artikel');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Terjadi kesalahan saat menghapus artikel');
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: string } = {
      budaya: 'bg-purple-100 text-purple-700',
      sejarah: 'bg-blue-100 text-blue-700',
      tradisi: 'bg-green-100 text-green-700',
      kuliner: 'bg-orange-100 text-orange-700',
      seni: 'bg-pink-100 text-pink-700',
      wisata: 'bg-cyan-100 text-cyan-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Kelola Artikel</h1>
          <p className="text-gray-600 mt-1">Manage artikel budaya</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-2.5 bg-[#D4A017] text-white rounded-xl font-semibold hover:bg-[#B38B12] transition-colors"
        >
          + Tambah Artikel
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Cari artikel..."
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
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Penulis</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Views</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Highlight</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500">{article.slug}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadge(article.category)}`}>
                        {article.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {article.author.full_name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {article.views}
                    </td>
                    <td className="py-3 px-4">
                      {article.is_highlight ? (
                        <span className="text-yellow-500">⭐</span>
                      ) : (
                        <span className="text-gray-300">☆</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDetail(article)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleEdit(article)}
                          className="px-3 py-1 text-sm text-primary-green hover:bg-green-50 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => handleDeleteClick(article)}
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
        title={isEditMode ? 'Edit Artikel' : 'Tambah Artikel'}
        size="xl"
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
                placeholder="judul-artikel-url-friendly"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Format: huruf kecil, tanpa spasi, gunakan dash (-)</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                rows={3}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konten <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                rows={8}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="https://example.com/image.jpg"
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
                <option value="budaya">Budaya</option>
                <option value="sejarah">Sejarah</option>
                <option value="tradisi">Tradisi</option>
                <option value="kuliner">Kuliner</option>
                <option value="seni">Seni</option>
                <option value="wisata">Wisata</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Baca (menit) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="tag1,tag2,tag3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provinsi
              </label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                placeholder="Jawa Barat"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_highlight}
                  onChange={(e) => setFormData({ ...formData, is_highlight: e.target.checked })}
                  className="w-4 h-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Jadikan Artikel Highlight</span>
              </label>
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
          setSelectedArticle(null);
        }}
        title="Detail Artikel"
        size="xl"
      >
        {selectedArticle && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Judul</h3>
              <p className="text-gray-900">{selectedArticle.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Slug</h3>
              <p className="text-gray-600 font-mono text-sm">{selectedArticle.slug}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Kategori</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadge(selectedArticle.category)}`}>
                {selectedArticle.category}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Excerpt</h3>
              <p className="text-gray-900">{selectedArticle.excerpt}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Konten</h3>
              <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                <p className="text-gray-900 whitespace-pre-wrap">{selectedArticle.content}</p>
              </div>
            </div>

            {selectedArticle.featured_image && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Featured Image</h3>
                <img 
                  src={selectedArticle.featured_image} 
                  alt={selectedArticle.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Waktu Baca</h3>
                <p className="text-gray-900">{selectedArticle.read_time} menit</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Views</h3>
                <p className="text-gray-900">{selectedArticle.views}</p>
              </div>

              {selectedArticle.province && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Provinsi</h3>
                  <p className="text-gray-900">{selectedArticle.province}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Highlight</h3>
                <p className="text-gray-900">{selectedArticle.is_highlight ? 'Ya ⭐' : 'Tidak'}</p>
              </div>
            </div>

            {selectedArticle.tags && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Tags</h3>
                <p className="text-gray-900">{selectedArticle.tags}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Penulis</h3>
              <p className="text-gray-900">{selectedArticle.author.full_name}</p>
              <p className="text-gray-600 text-sm">{selectedArticle.author.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Tanggal Publish</h3>
              <p className="text-gray-900">
                {new Date(selectedArticle.published_at).toLocaleDateString('id-ID', {
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
          setSelectedArticle(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Artikel"
        message={`Apakah Anda yakin ingin menghapus artikel "${selectedArticle?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
}
