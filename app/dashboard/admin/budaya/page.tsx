'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { motion, AnimatePresence } from 'framer-motion';

interface Culture {
  id: number;
  name: string;
  slug: string;
  subtitle?: string;
  description: string;
  long_description?: string;
  meaning?: string;
  province: string;
  city: string;
  location: string;
  latitude?: number;
  longitude?: number;
  category: string;
  status: string;
  is_endangered: boolean;
  thumbnail?: string;
  map_embed_url?: string;
  created_at: string;
  images?: any[];
}

interface FormData {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  long_description: string;
  meaning: string;
  category: string;
  location: string;
  province: string;
  city: string;
  latitude: string;
  longitude: string;
  status: string;
  is_endangered: boolean;
  thumbnail: string;
  map_embed_url: string;
}

export default function CulturesListPage() {
  const { user } = useAuth();
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCulture, setSelectedCulture] = useState<Culture | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    subtitle: '',
    description: '',
    long_description: '',
    meaning: '',
    category: '',
    location: '',
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    status: 'draft',
    is_endangered: false,
    thumbnail: '',
    map_embed_url: ''
  });

  useEffect(() => {
    fetchCultures();
  }, [page, search]);

  const fetchCultures = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(
        `/api/admin/cultures?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setCultures(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching cultures:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      subtitle: '',
      description: '',
      long_description: '',
      meaning: '',
      category: '',
      location: '',
      province: '',
      city: '',
      latitude: '',
      longitude: '',
      status: 'draft',
      is_endangered: false,
      thumbnail: '',
      map_embed_url: ''
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsEditMode(false);
    setShowFormModal(true);
  };

  const handleEdit = (culture: Culture) => {
    setFormData({
      name: culture.name || '',
      slug: culture.slug || '',
      subtitle: culture.subtitle || '',
      description: culture.description || '',
      long_description: culture.long_description || '',
      meaning: culture.meaning || '',
      category: culture.category || '',
      location: culture.location || '',
      province: culture.province || '',
      city: culture.city || '',
      latitude: culture.latitude?.toString() || '',
      longitude: culture.longitude?.toString() || '',
      status: culture.status || 'draft',
      is_endangered: culture.is_endangered || false,
      thumbnail: culture.thumbnail || '',
      map_embed_url: culture.map_embed_url || ''
    });
    setSelectedCulture(culture);
    setIsEditMode(true);
    setShowFormModal(true);
  };

  const handleDetail = (culture: Culture) => {
    setSelectedCulture(culture);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (culture: Culture) => {
    setSelectedCulture(culture);
    setShowDeleteDialog(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Auto-generate slug from name
    if (name === 'name' && !isEditMode) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = isEditMode 
        ? `/api/admin/cultures/${selectedCulture?.id}`
        : '/api/admin/cultures';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowFormModal(false);
        resetForm();
        fetchCultures();
      } else {
        alert(data.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Error saving culture:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCulture) return;
    
    setFormLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/cultures/${selectedCulture.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      if (data.success) {
        setShowDeleteDialog(false);
        setSelectedCulture(null);
        fetchCultures();
      } else {
        alert(data.error || 'Gagal menghapus budaya');
      }
    } catch (error) {
      console.error('Error deleting culture:', error);
      alert('Terjadi kesalahan saat menghapus budaya');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Kelola Budaya</h1>
          <p className="text-gray-600 mt-1">Manage budaya lokal Indonesia</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-2.5 bg-[#D4A017] text-white rounded-xl font-semibold hover:bg-[#B38B12] transition-colors"
        >
          + Tambah Budaya
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Cari budaya..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : cultures.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                cultures.map((culture) => (
                  <tr key={culture.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">{culture.name}</p>
                        {culture.is_endangered && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                            Terancam Punah
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {culture.city}, {culture.province}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg capitalize">
                        {culture.category || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm rounded-lg capitalize ${
                          culture.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : culture.status === 'draft'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {culture.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleDetail(culture)}
                        className="inline-block px-4 py-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleEdit(culture)}
                        className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        Edit
                      </button>
                      {user?.role === 'admin' && (
                        <button
                          onClick={() => handleDeleteClick(culture)}
                          className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Form Modal (Add/Edit) */}
      <AnimatePresence>
        {showFormModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFormModal(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">
                    {isEditMode ? 'Edit Budaya' : 'Tambah Budaya Baru'}
                  </h2>
                  <button
                    onClick={() => setShowFormModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-6">
                  <form onSubmit={handleSubmit} className="space-y-6" id="culture-form">
          {/* Informasi Dasar */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Informasi Dasar</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Budaya *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="Contoh: Tari Reog Ponorogo"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="tari-reog-ponorogo"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="Tarian Mistis dari Gerbang Timur Jawa"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Singkat *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="Deskripsi singkat tentang budaya ini..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Lengkap
                </label>
                <textarea
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="Deskripsi lengkap dan detail..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Makna & Filosofi
                </label>
                <textarea
                  name="meaning"
                  value={formData.meaning}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="Makna dan filosofi dari budaya ini..."
                />
              </div>
            </div>
          </div>

          {/* Lokasi */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Lokasi</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provinsi *
                </label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="Jawa Timur"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kota *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="Ponorogo"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi Lengkap *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="Ponorogo, Jawa Timur"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="-7.8753"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="111.4644"
                />
              </div>
            </div>
          </div>

          {/* Detail Lainnya */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Detail Lainnya</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="tarian">Tarian</option>
                  <option value="musik">Musik</option>
                  <option value="pakaian">Pakaian Adat</option>
                  <option value="arsitektur">Arsitektur</option>
                  <option value="kuliner">Kuliner</option>
                  <option value="upacara">Upacara Adat</option>
                  <option value="kerajinan">Kerajinan</option>
                  <option value="senjata">Senjata</option>
                  <option value="permainan">Permainan</option>
                  <option value="bahasa">Bahasa & Aksara</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Thumbnail
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps Embed URL
                </label>
                <textarea
                  name="map_embed_url"
                  value={formData.map_embed_url}
                  onChange={handleFormChange}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  placeholder="<iframe src='https://www.google.com/maps/embed?...'></iframe>"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_endangered"
                    checked={formData.is_endangered}
                    onChange={handleFormChange}
                    className="w-5 h-5 text-primary-green border-gray-300 rounded focus:ring-primary-green"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Budaya Terancam Punah
                  </span>
                </label>
              </div>
            </div>
          </div>
                  </form>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center gap-3 p-6 border-t border-gray-200 bg-gray-50">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowFormModal(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-white transition-colors"
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    type="submit"
                    form="culture-form"
                    disabled={formLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2.5 bg-[#D4A017] text-white rounded-lg font-semibold hover:bg-[#B38B12] transition-colors disabled:opacity-50"
                  >
                    {formLoading ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Tambah Budaya')}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedCulture && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailModal(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Detail Budaya</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    {selectedCulture.thumbnail && (
                      <img 
                        src={selectedCulture.thumbnail} 
                        alt={selectedCulture.name}
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Nama</p>
                        <p className="font-semibold text-gray-900">{selectedCulture.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Slug</p>
                        <p className="font-semibold text-gray-900">{selectedCulture.slug}</p>
                      </div>
                      {selectedCulture.subtitle && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Subtitle</p>
                          <p className="font-semibold text-gray-900">{selectedCulture.subtitle}</p>
                        </div>
                      )}
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Deskripsi</p>
                        <p className="text-gray-900">{selectedCulture.description}</p>
                      </div>
                      {selectedCulture.long_description && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Deskripsi Lengkap</p>
                          <p className="text-gray-900">{selectedCulture.long_description}</p>
                        </div>
                      )}
                      {selectedCulture.meaning && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Makna & Filosofi</p>
                          <p className="text-gray-900">{selectedCulture.meaning}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-500">Provinsi</p>
                        <p className="font-semibold text-gray-900">{selectedCulture.province}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Kota</p>
                        <p className="font-semibold text-gray-900">{selectedCulture.city}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Lokasi</p>
                        <p className="font-semibold text-gray-900">{selectedCulture.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Kategori</p>
                        <p className="font-semibold text-gray-900 capitalize">{selectedCulture.category || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span className={`inline-block px-3 py-1 text-sm rounded-lg capitalize ${
                          selectedCulture.status === 'active' ? 'bg-green-100 text-green-700' :
                          selectedCulture.status === 'draft' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {selectedCulture.status}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Terancam Punah</p>
                        <p className="font-semibold text-gray-900">{selectedCulture.is_endangered ? 'Ya' : 'Tidak'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center gap-3 p-6 border-t border-gray-200 bg-gray-50">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowDetailModal(false);
                      setSelectedCulture(null);
                    }}
                    className="flex-1 px-4 py-2.5 bg-[#D4A017] text-white rounded-lg font-semibold hover:bg-[#B38B12] transition-colors"
                  >
                    Tutup
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowDetailModal(false);
                      handleEdit(selectedCulture);
                    }}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Hapus Budaya"
        message={`Apakah Anda yakin ingin menghapus "${selectedCulture?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
        loading={formLoading}
      />
    </div>
  );
}
