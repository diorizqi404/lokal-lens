'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  long_description?: string;
  date_start: string;
  date_end: string;
  time_start: string;
  time_end: string;
  location_name: string;
  location_city: string;
  location_province: string;
  location_address?: string;
  latitude?: number;
  longitude?: number;
  thumbnail?: string;
  status: string;
  price?: number;
  category?: string;
  organizer?: string;
  contact_email?: string;
  contact_phone?: string;
  website_url?: string;
  views: number;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  long_description: string;
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
  thumbnail: string;
  status: string;
  price: string;
  category: string;
  organizer: string;
  contact_email: string;
  contact_phone: string;
  website_url: string;
}

export default function EventsListPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
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

  // Form data
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    description: '',
    long_description: '',
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
    thumbnail: '',
    status: 'available',
    price: '',
    category: '',
    organizer: '',
    contact_email: '',
    contact_phone: '',
    website_url: ''
  });

  useEffect(() => {
    fetchEvents();
  }, [page, search]);

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
        setTotalPages(data.pagination.totalPages);
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
      thumbnail: '',
      status: 'available',
      price: '',
      category: '',
      organizer: '',
      contact_email: '',
      contact_phone: '',
      website_url: ''
    });
    setSelectedEvent(null);
    setIsEditMode(false);
  };

  const handleAdd = () => {
    resetForm();
    setShowFormModal(true);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsEditMode(true);
    setFormData({
      title: event.title,
      slug: event.slug,
      description: event.description,
      long_description: event.long_description || '',
      date_start: event.date_start.split('T')[0],
      date_end: event.date_end.split('T')[0],
      time_start: event.time_start,
      time_end: event.time_end,
      location_name: event.location_name,
      location_city: event.location_city,
      location_province: event.location_province,
      location_address: event.location_address || '',
      latitude: event.latitude?.toString() || '',
      longitude: event.longitude?.toString() || '',
      thumbnail: event.thumbnail || '',
      status: event.status,
      price: event.price?.toString() || '',
      category: event.category || '',
      organizer: event.organizer || '',
      contact_email: event.contact_email || '',
      contact_phone: event.contact_phone || '',
      website_url: event.website_url || ''
    });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const token = localStorage.getItem('token');
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
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseFloat(formData.price) : null,
          latitude: formData.latitude ? parseFloat(formData.latitude) : null,
          longitude: formData.longitude ? parseFloat(formData.longitude) : null
        }),
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
      alert('Terjadi kesalahan saat menyimpan event');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

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
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      available: 'bg-green-100 text-green-700',
      sold_out: 'bg-red-100 text-red-700',
      free: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-gray-100 text-gray-700',
      completed: 'bg-purple-100 text-purple-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Kelola Event</h1>
          <p className="text-gray-600 mt-1">Manage event budaya</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-2.5 bg-[#D4A017] text-white rounded-xl font-semibold hover:bg-[#B38B12] transition-colors"
        >
          + Tambah Event
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Cari event..."
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
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Tanggal</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Lokasi</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Views</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{event.title}</div>
                      <div className="text-sm text-gray-500">{event.slug}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(event.date_start)} - {formatDate(event.date_end)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {event.location_city}, {event.location_province}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(event.status)}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {event.views}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDetail(event)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleEdit(event)}
                          className="px-3 py-1 text-sm text-primary-green hover:bg-green-50 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => handleDeleteClick(event)}
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

      {/* Form Modal (Add/Edit) - Simplified for key fields */}
      <Modal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          resetForm();
        }}
        title={isEditMode ? 'Edit Event' : 'Tambah Event'}
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
                Tanggal Mulai <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date_start}
                onChange={(e) => setFormData({ ...formData, date_start: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Selesai <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date_end}
                onChange={(e) => setFormData({ ...formData, date_end: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Mulai <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.time_start}
                onChange={(e) => setFormData({ ...formData, time_start: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Selesai <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.time_end}
                onChange={(e) => setFormData({ ...formData, time_end: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lokasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location_name}
                onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kota <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location_city}
                onChange={(e) => setFormData({ ...formData, location_city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provinsi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location_province}
                onChange={(e) => setFormData({ ...formData, location_province: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                required
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
                <option value="available">Available</option>
                <option value="sold_out">Sold Out</option>
                <option value="free">Free</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga (Rp)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20"
                min="0"
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
          setSelectedEvent(null);
        }}
        title="Detail Event"
        size="xl"
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Judul</h3>
              <p className="text-gray-900">{selectedEvent.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Deskripsi</h3>
              <p className="text-gray-900">{selectedEvent.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Tanggal & Waktu</h3>
                <p className="text-gray-900">
                  {formatDate(selectedEvent.date_start)} - {formatDate(selectedEvent.date_end)}
                </p>
                <p className="text-gray-600 text-sm">
                  {selectedEvent.time_start} - {selectedEvent.time_end}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Lokasi</h3>
                <p className="text-gray-900">{selectedEvent.location_name}</p>
                <p className="text-gray-600 text-sm">
                  {selectedEvent.location_city}, {selectedEvent.location_province}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Status</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(selectedEvent.status)}`}>
                  {selectedEvent.status}
                </span>
              </div>

              {selectedEvent.price && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Harga</h3>
                  <p className="text-gray-900">Rp {selectedEvent.price.toLocaleString('id-ID')}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Views</h3>
                <p className="text-gray-900">{selectedEvent.views}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedEvent(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Event"
        message={`Apakah Anda yakin ingin menghapus event "${selectedEvent?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
}
