'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import FormModal from '@/components/ui/FormModal';
import { motion } from 'framer-motion';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

interface EventGallery {
  id?: number;
  image_url: string;
  alt_text: string;
  order_number: number;
}

interface EventPerformer {
  id?: number;
  name: string;
  title: string;
  description: string;
  image_url: string;
  order_number: number;
}

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  long_description?: string;
  thumbnail?: string;
  category_id?: number;
  category_rel?: {
    id: number;
    name: string;
    slug: string;
    icon?: string;
  };
  date_start: string;
  date_end?: string;
  time_start: string;
  time_end?: string;
  location_name: string;
  location_city: string;
  location_province: string;
  location_address?: string;
  latitude?: number;
  longitude?: number;
  map_embed_url?: string;
  organizer?: string;
  contact_email?: string;
  contact_phone?: string;
  website_url?: string;
  price?: number;
  status: string;
  created_at: string;
  galleries?: EventGallery[];
  performers?: EventPerformer[];
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  long_description: string;
  thumbnail: string;
  category_id: string;
  date_start: string;
  date_end: string;
  time_start: string;
  time_end: string;
  location_name: string;
  location_city: string;
  location_province: string;
  location_address: string;
  latitude: string;
  longitude: string;
  map_embed_url: string;
  organizer: string;
  contact_email: string;
  contact_phone: string;
  website_url: string;
  price: string;
  status: string;
}

export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  // Image upload states
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [existingGalleries, setExistingGalleries] = useState<EventGallery[]>([]);
  
  // Performers state
  const [performers, setPerformers] = useState<EventPerformer[]>([]);
  const [performerImageFiles, setPerformerImageFiles] = useState<Map<number, File>>(new Map());
  
  // Form data
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    description: '',
    long_description: '',
    thumbnail: '',
    category_id: '',
    date_start: '',
    date_end: '',
    time_start: '',
    time_end: '',
    location_name: '',
    location_city: '',
    location_province: '',
    location_address: '',
    latitude: '',
    longitude: '',
    map_embed_url: '',
    organizer: '',
    contact_email: '',
    contact_phone: '',
    website_url: '',
    price: '',
    status: 'available'
  });

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, [page, search]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?type=event');
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(
        `/api/admin/events?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      long_description: '',
      thumbnail: '',
      category_id: '',
      date_start: '',
      date_end: '',
      time_start: '',
      time_end: '',
      location_name: '',
      location_city: '',
      location_province: '',
      location_address: '',
      latitude: '',
      longitude: '',
      map_embed_url: '',
      organizer: '',
      contact_email: '',
      contact_phone: '',
      website_url: '',
      price: '',
      status: 'available'
    });
    setThumbnailFile(null);
    setThumbnailPreview('');
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGalleries([]);
    setPerformers([]);
    setPerformerImageFiles(new Map());
  };

  const handleAdd = () => {
    resetForm();
    setIsEditMode(false);
    setSelectedEvent(null);
    setShowFormModal(true);
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title || '',
      slug: event.slug || '',
      description: event.description || '',
      long_description: event.long_description || '',
      thumbnail: event.thumbnail || '',
      category_id: event.category_id?.toString() || '',
      date_start: event.date_start ? new Date(event.date_start).toISOString().split('T')[0] : '',
      date_end: event.date_end ? new Date(event.date_end).toISOString().split('T')[0] : '',
      time_start: event.time_start || '',
      time_end: event.time_end || '',
      location_name: event.location_name || '',
      location_city: event.location_city || '',
      location_province: event.location_province || '',
      location_address: event.location_address || '',
      latitude: event.latitude?.toString() || '',
      longitude: event.longitude?.toString() || '',
      map_embed_url: event.map_embed_url || '',
      organizer: event.organizer || '',
      contact_email: event.contact_email || '',
      contact_phone: event.contact_phone || '',
      website_url: event.website_url || '',
      price: event.price?.toString() || '',
      status: event.status || 'available'
    });
    setThumbnailPreview(event.thumbnail || '');
    setExistingGalleries(event.galleries || []);
    setPerformers(event.performers || []);
    setSelectedEvent(event);
    setIsEditMode(true);
    setShowFormModal(true);
  };

  const handleDetail = (event: Event) => {
    setSelectedEvent(event);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
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
    
    // Auto-generate slug from title
    if (name === 'title' && !isEditMode) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGallery = (galleryId: number) => {
    setExistingGalleries(prev => prev.filter(img => img.id !== galleryId));
  };

  const addPerformer = () => {
    setPerformers(prev => [
      ...prev,
      {
        name: '',
        title: '',
        description: '',
        image_url: '',
        order_number: prev.length
      }
    ]);
  };

  const updatePerformer = (index: number, field: keyof EventPerformer, value: string | number) => {
    setPerformers(prev => prev.map((p, i) => 
      i === index ? { ...p, [field]: value } : p
    ));
  };

  const removePerformer = (index: number) => {
    setPerformers(prev => prev.filter((_, i) => i !== index));
    setPerformerImageFiles(prev => {
      const newMap = new Map(prev);
      newMap.delete(index);
      return newMap;
    });
  };

  const handlePerformerImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPerformerImageFiles(prev => new Map(prev).set(index, file));
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePerformer(index, 'image_url', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    if (!result.success) throw new Error(result.error);
    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Upload thumbnail if new file selected
      let thumbnailUrl = formData.thumbnail;
      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile);
      }
      
      // Upload new gallery images
      const newGalleryUrls = await Promise.all(
        galleryFiles.map(file => uploadImage(file))
      );
      
      // Upload performer images
      const performersWithImages = await Promise.all(
        performers.map(async (performer, index) => {
          const file = performerImageFiles.get(index);
          let imageUrl = performer.image_url;
          
          // If there's a new file and image_url is a data URL, upload it
          if (file || (imageUrl && imageUrl.startsWith('data:'))) {
            imageUrl = await uploadImage(file || await fetch(imageUrl).then(r => r.blob()) as File);
          }
          
          return {
            ...performer,
            image_url: imageUrl,
            order_number: index
          };
        })
      );
      
      const submitData = {
        ...formData,
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        price: formData.price ? parseFloat(formData.price) : null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        thumbnail: thumbnailUrl,
        galleries: [
          ...existingGalleries,
          ...newGalleryUrls.map((url, index) => ({
            image_url: url,
            alt_text: formData.title,
            order_number: existingGalleries.length + index
          }))
        ],
        performers: performersWithImages
      };
      
      const url = isEditMode 
        ? `/api/admin/events/${selectedEvent?.id}`
        : '/api/admin/events';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (data.success) {
        alert(isEditMode ? 'Event berhasil diupdate' : 'Event berhasil ditambahkan');
        setShowFormModal(false);
        resetForm();
        fetchEvents();
      } else {
        alert(data.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    
    setFormLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/events/${selectedEvent.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Event berhasil dihapus');
        setShowDeleteDialog(false);
        setSelectedEvent(null);
        fetchEvents();
      } else {
        alert(data.error || 'Gagal menghapus event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Terjadi kesalahan saat menghapus event');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Kelola Event Budaya</h1>
          <p className="text-gray-600 mt-1">Manage event dan acara budaya</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="px-6 py-2.5 bg-[#D4A017] text-white rounded-xl font-semibold hover:bg-[#B38B12] transition-colors flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
          </svg>
          Tambah Event
        </motion.button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
          </svg>
          <input
            type="text"
            placeholder="Cari event..."
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Penyelenggara
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
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <div className="inline-block w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada event
                  </td>
                </tr>
              ) : (
                events.map((event, index) => (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {event.thumbnail && (
                          <img src={event.thumbnail} alt={event.title} className="w-16 h-12 object-cover rounded-lg" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-[#1A1A1A] line-clamp-1">{event.title}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {event.category_rel?.name || '-'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <p className="font-medium">{event.date_start && !isNaN(new Date(event.date_start).getTime()) ? new Date(event.date_start).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      }) : '-'}</p>
                      <p className="text-xs text-gray-500">{event.time_start || '-'}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {event.location_city || '-'}, {event.location_province || '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {event.organizer || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm rounded-lg capitalize ${
                          event.status === 'available'
                            ? 'bg-green-100 text-green-700'
                            : event.status === 'sold_out'
                            ? 'bg-yellow-100 text-yellow-700'
                            : event.status === 'completed'
                            ? 'bg-gray-100 text-gray-700'
                            : event.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDetail(event)}
                        className="inline-block px-4 py-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                      >
                        Detail
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(event)}
                        className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        Edit
                      </motion.button>
                      {user?.role === 'admin' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteClick(event)}
                          className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                          Hapus
                        </motion.button>
                      )}
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

      {/* Form Modal */}
      <FormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          resetForm();
        }}
        title={isEditMode ? 'Edit Event' : 'Tambah Event'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Event <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="Masukkan judul event"
              />
            </div>

            {/* Slug */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="url-friendly-slug"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
              >
                <option value="">Pilih Kategori</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
              >
                <option value="available">Available</option>
                <option value="sold_out">Sold Out</option>
                <option value="free">Free</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Date Start */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Mulai <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date_start"
                value={formData.date_start}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
              />
            </div>

            {/* Date End */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Selesai
              </label>
              <input
                type="date"
                name="date_end"
                value={formData.date_end}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
              />
            </div>

            {/* Time Start */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Mulai <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time_start"
                value={formData.time_start}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
              />
            </div>

            {/* Time End */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Selesai
              </label>
              <input
                type="time"
                name="time_end"
                value={formData.time_end}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
              />
            </div>

            {/* Location Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lokasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location_name"
                value={formData.location_name}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="Contoh: Gedung Serbaguna"
              />
            </div>

            {/* Location City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kota <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location_city"
                value={formData.location_city}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="Contoh: Jakarta"
              />
            </div>

            {/* Location Province */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provinsi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location_province"
                value={formData.location_province}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="Contoh: DKI Jakarta"
              />
            </div>

            {/* Location Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat Lengkap
              </label>
              <input
                type="text"
                name="location_address"
                value={formData.location_address}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="Masukkan alamat lengkap"
              />
            </div>

            {/* Latitude */}
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="-6.200000"
              />
            </div>

            {/* Longitude */}
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="106.816666"
              />
            </div>

            {/* Map Embed URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Map Embed URL
              </label>
              <input
                type="url"
                name="map_embed_url"
                value={formData.map_embed_url}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
            </div>

            {/* Organizer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penyelenggara
              </label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="Nama penyelenggara"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Tiket
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="0 untuk gratis"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Kontak
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="email@example.com"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telepon Kontak
              </label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            {/* Website URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                name="website_url"
                value={formData.website_url}
                onChange={handleFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="https://example.com"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Singkat <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="Deskripsi singkat event"
              />
            </div>

            {/* Long Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Lengkap
              </label>
              <textarea
                name="long_description"
                value={formData.long_description}
                onChange={handleFormChange}
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                placeholder="Deskripsi lengkap event"
              />
            </div>

            {/* Thumbnail */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
              />
              {thumbnailPreview && (
                <div className="mt-2">
                  <img src={thumbnailPreview} alt="Preview" className="w-32 h-24 object-cover rounded-lg" />
                </div>
              )}
            </div>

            {/* Gallery */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery (Multiple)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
              />
              <div className="mt-3 grid grid-cols-4 gap-2">
                {existingGalleries.map((img) => (
                  <div key={img.id} className="relative">
                    <img src={img.image_url} alt={img.alt_text} className="w-full h-24 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => img.id && removeExistingGallery(img.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                ))}
                {galleryPreviews.map((preview, index) => (
                  <div key={`new-${index}`} className="relative">
                    <img src={preview} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performers Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Performers / Penampil</h3>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addPerformer}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                </svg>
                Tambah Performer
              </motion.button>
            </div>

            {performers.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <p className="text-gray-500">Belum ada performer. Klik tombol "Tambah Performer" untuk menambahkan.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {performers.map((performer, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Performer #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removePerformer(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nama <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={performer.name}
                          onChange={(e) => updatePerformer(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                          placeholder="Nama performer"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Jabatan/Peran <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={performer.title}
                          onChange={(e) => updatePerformer(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                          placeholder="Contoh: Maestro Tari"
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Deskripsi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={performer.description}
                          onChange={(e) => updatePerformer(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                          placeholder="Deskripsi performer"
                          rows={2}
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Foto Performer
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePerformerImageChange(index, e)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                        />
                        {performer.image_url && (
                          <div className="mt-2">
                            <img 
                              src={performer.image_url} 
                              alt={performer.name} 
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowFormModal(false);
                resetForm();
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              disabled={formLoading}
            >
              Batal
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 bg-[#D4A017] text-white rounded-xl font-semibold hover:bg-[#B38B12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formLoading}
            >
              {formLoading ? 'Menyimpan...' : isEditMode ? 'Update' : 'Simpan'}
            </motion.button>
          </div>
        </form>
      </FormModal>

      {/* Detail Modal */}
      {selectedEvent && (
        <FormModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Detail Event"
        >
          <div className="space-y-6">
            {selectedEvent.thumbnail && (
              <img
                src={selectedEvent.thumbnail}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            )}
            
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">{selectedEvent.title}</h3>
                {selectedEvent.category_rel && (
                  <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                    {selectedEvent.category_rel.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block mt-1 px-3 py-1 text-sm rounded-lg capitalize ${
                    selectedEvent.status === 'available' ? 'bg-green-100 text-green-700' :
                    selectedEvent.status === 'sold_out' ? 'bg-yellow-100 text-yellow-700' :
                    selectedEvent.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                    selectedEvent.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedEvent.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Harga</p>
                  <p className="font-semibold text-[#1A1A1A]">
                    {selectedEvent.price ? `Rp ${selectedEvent.price.toLocaleString('id-ID')}` : 'Gratis'}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Tanggal & Waktu</p>
                <p className="font-semibold text-[#1A1A1A]">
                  {selectedEvent.date_start && new Date(selectedEvent.date_start).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  {selectedEvent.date_end && ` - ${new Date(selectedEvent.date_end).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}`}
                </p>
                <p className="text-gray-600">
                  {selectedEvent.time_start}{selectedEvent.time_end && ` - ${selectedEvent.time_end}`}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Lokasi</p>
                <p className="font-semibold text-[#1A1A1A]">{selectedEvent.location_name}</p>
                <p className="text-gray-600">
                  {selectedEvent.location_city}, {selectedEvent.location_province}
                </p>
                {selectedEvent.location_address && (
                  <p className="text-gray-600 text-sm">{selectedEvent.location_address}</p>
                )}
              </div>

              {selectedEvent.organizer && (
                <div>
                  <p className="text-sm text-gray-500">Penyelenggara</p>
                  <p className="font-semibold text-[#1A1A1A]">{selectedEvent.organizer}</p>
                </div>
              )}

              {(selectedEvent.contact_email || selectedEvent.contact_phone) && (
                <div>
                  <p className="text-sm text-gray-500">Kontak</p>
                  {selectedEvent.contact_email && (
                    <p className="text-gray-600">{selectedEvent.contact_email}</p>
                  )}
                  {selectedEvent.contact_phone && (
                    <p className="text-gray-600">{selectedEvent.contact_phone}</p>
                  )}
                </div>
              )}

              {selectedEvent.website_url && (
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={selectedEvent.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {selectedEvent.website_url}
                  </a>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">Deskripsi</p>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedEvent.long_description || selectedEvent.description}
                </p>
              </div>

              {selectedEvent.galleries && selectedEvent.galleries.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-3">Galeri</p>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedEvent.galleries.map((img) => (
                      <img
                        key={img.id}
                        src={img.image_url}
                        alt={img.alt_text}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.performers && selectedEvent.performers.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-3">Performers / Penampil</p>
                  <div className="space-y-3">
                    {selectedEvent.performers.map((performer) => (
                      <div key={performer.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex gap-3">
                          {performer.image_url && (
                            <img
                              src={performer.image_url}
                              alt={performer.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{performer.name}</h4>
                            <p className="text-sm text-gray-600">{performer.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{performer.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Tutup
              </motion.button>
            </div>
          </div>
        </FormModal>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedEvent && (
        <FormModal
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          title="Konfirmasi Hapus"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Apakah Anda yakin ingin menghapus event <strong>{selectedEvent.title}</strong>? 
              Tindakan ini tidak dapat dibatalkan.
            </p>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteDialog(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                disabled={formLoading}
              >
                Batal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDelete}
                className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={formLoading}
              >
                {formLoading ? 'Menghapus...' : 'Hapus'}
              </motion.button>
            </div>
          </div>
        </FormModal>
      )}
    </div>
  );
}
