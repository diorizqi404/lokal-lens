'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import FormModal from '@/components/ui/FormModal';

interface ScanHistory {
  id: number;
  user_id?: number;
  culture_id?: number;
  object_name: string;
  object_type: string;
  category_id?: number;
  location?: string;
  province?: string;
  accuracy?: string;
  description?: string;
  scan_result?: string;
  created_at: string;
  user?: {
    id: number;
    full_name: string;
    email: string;
  };
  culture?: {
    id: number;
    name: string;
    slug: string;
  };
  category_rel?: {
    id: number;
    name: string;
    slug: string;
  };
}

export default function RiwayatScanPage() {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('');
  
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedScan, setSelectedScan] = useState<ScanHistory | null>(null);

  useEffect(() => {
    fetchScans();
  }, [page, search, provinceFilter]);

  const fetchScans = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        search,
        ...(provinceFilter && { province: provinceFilter })
      });
      
      const response = await fetch(`/api/admin/scan-history?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setScans(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching scan history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (scan: ScanHistory) => {
    setSelectedScan(scan);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Riwayat Scan Budaya</h1>
          <p className="text-gray-600 mt-1">Riwayat scan budaya dari semua user</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
            </svg>
            <input
              type="text"
              placeholder="Cari object..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
            />
          </div>
          
          <input
            type="text"
            placeholder="Filter provinsi..."
            value={provinceFilter}
            onChange={(e) => setProvinceFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Object</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipe</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lokasi</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Akurasi</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    <div className="inline-block w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
                  </td>
                </tr>
              ) : scans.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                scans.map((scan, index) => (
                  <motion.tr
                    key={scan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{scan.object_name}</p>
                        {scan.culture && (
                          <p className="text-sm text-gray-500">Ref: {scan.culture.name}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="inline-flex px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                        {scan.object_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {scan.province || scan.location || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {scan.user ? (
                        <div>
                          <p className="font-medium">{scan.user.full_name}</p>
                          <p className="text-xs text-gray-500">{scan.user.email}</p>
                        </div>
                      ) : (
                        <span className="italic text-gray-400">Guest</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {scan.accuracy ? (
                        <span className="inline-flex px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-semibold">
                          {scan.accuracy}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(scan.created_at).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDetail(scan)}
                        className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        Detail
                      </motion.button>
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

      {/* Detail Modal */}
      {selectedScan && (
        <FormModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Detail Scan"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nama Object</p>
                <p className="font-semibold text-gray-900">{selectedScan.object_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tipe Object</p>
                <p className="font-semibold text-gray-900">{selectedScan.object_type}</p>
              </div>
              {selectedScan.category_rel && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Kategori</p>
                  <p className="font-semibold text-gray-900">{selectedScan.category_rel.name}</p>
                </div>
              )}
              {selectedScan.accuracy && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Akurasi</p>
                  <span className="inline-flex px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-semibold">
                    {selectedScan.accuracy}
                  </span>
                </div>
              )}
            </div>

            {selectedScan.culture && (
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Referensi Budaya</p>
                <p className="font-semibold text-blue-900">{selectedScan.culture.name}</p>
              </div>
            )}

            {selectedScan.location && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Lokasi</p>
                <p className="text-gray-700">{selectedScan.location}</p>
              </div>
            )}

            {selectedScan.province && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Provinsi</p>
                <p className="text-gray-700">{selectedScan.province}</p>
              </div>
            )}

            {selectedScan.description && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedScan.description}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 mb-1">User</p>
              {selectedScan.user ? (
                <div>
                  <p className="font-semibold text-gray-900">{selectedScan.user.full_name}</p>
                  <p className="text-sm text-gray-600">{selectedScan.user.email}</p>
                </div>
              ) : (
                <p className="italic text-gray-500">Guest User</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Tanggal Scan</p>
              <p className="text-gray-700">
                {new Date(selectedScan.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {selectedScan.scan_result && (
              <div>
                <p className="text-sm text-gray-500 mb-2">AI Scan Result (JSON)</p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-green-400 font-mono">
                    {JSON.stringify(JSON.parse(selectedScan.scan_result), null, 2)}
                  </pre>
                </div>
              </div>
            )}

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
    </div>
  );
}
