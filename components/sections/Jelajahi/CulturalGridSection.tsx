'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

interface CulturalItem {
  id: number;
  name: string;
  slug: string;
  location: string;
  province: string;
  city: string;
  thumbnail: string;
  is_endangered: boolean;
  subtitle?: string;
  category?: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

interface CulturalGridSectionProps {
  selectedCategory: string;
}

const CulturalGridSection = ({ selectedCategory }: CulturalGridSectionProps) => {
  const [cultures, setCultures] = useState<CulturalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCultures(1);
  }, [selectedCategory]);

  const fetchCultures = async (page: number) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '8',
      });

      if (selectedCategory) {
        params.append('category', selectedCategory);
      }

      const response = await fetch(`/api/cultures?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cultures');
      }

      const data = await response.json();

      if (page === 1) {
        setCultures(data.data);
      } else {
        setCultures((prev) => [...prev, ...data.data]);
      }

      setPagination(data.pagination);
      setError(null);
    } catch (error) {
      console.error('Error fetching cultures:', error);
      setError('Gagal memuat data budaya');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (pagination.hasMore && !loadingMore) {
      fetchCultures(pagination.page + 1);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-b-2 border-primary-green rounded-full mx-auto mb-4"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600"
              >
                Memuat budaya...
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-red-600 mb-4"
              >
                {error}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchCultures(1)}
                className="px-6 py-3 bg-primary-green text-white rounded-full hover:bg-[#0BC943] transition-colors"
              >
                Coba Lagi
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cultures.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6"
            >
              <svg
                className="w-24 h-24 mx-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-800 mb-2"
            >
              Tidak Ada Budaya Ditemukan
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 max-w-md"
            >
              Maaf, tidak ada budaya yang sesuai dengan kategori yang dipilih. Coba pilih kategori lain atau kembali ke semua kategori.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16"
          >
            {cultures.map((item, index) => {
            let gridClass = '';
            let heightClass = '';

            if (index % 8 === 0) {
              gridClass = 'lg:col-span-6 lg:row-span-2';
              heightClass = 'h-[300px] sm:h-[400px] lg:h-[787px]';
            } else if (index % 8 === 1 || index % 8 === 2) {
              gridClass = 'lg:col-span-3';
              heightClass = 'h-[300px] sm:h-[350px] lg:h-[381px]';
            } else if (index % 8 === 3 || index % 8 === 4) {
              gridClass = 'lg:col-span-3';
              heightClass = 'h-[300px] sm:h-[350px] lg:h-[381px]';
            } else if (index % 8 === 5 || index % 8 === 6) {
              gridClass = 'lg:col-span-3';
              heightClass = 'h-[300px] sm:h-[350px] lg:h-[381px]';
            } else if (index % 8 === 7) {
              gridClass = 'sm:col-span-2 lg:col-span-6';
              heightClass = 'h-[300px] sm:h-[350px] lg:h-[381px]';
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${gridClass} ${heightClass}`}
              >
                <Link
                  href={`/jelajahi/${item.slug}`}
                  className="block w-full h-full group relative overflow-hidden rounded-3xl cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={item.thumbnail || 'https://via.placeholder.com/600x400?text=No+Image'}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="mb-1 sm:mb-2">
                    <span className="text-xs font-semibold leading-4 tracking-[1.2px] uppercase text-[#E2725B]">
                      {item.province}
                    </span>
                    {item.is_endangered && (
                      <span className="ml-2 text-xs font-semibold leading-4 tracking-[1.2px] uppercase text-[#EF4444]">
                        • TERANCAM PUNAH
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold leading-6 sm:leading-[25px] text-white">
                    {item.name}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-white/80 mt-1 line-clamp-1">
                      {item.subtitle}
                    </p>
                  )}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
          </motion.div>
        )}

        {!loading && cultures.length > 0 && pagination.hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#F5F5DC] hover:bg-[#ebe9d0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#111218]"></div>
                  <span className="text-sm sm:text-base font-bold leading-6 tracking-[0.4px] text-[#111218]">
                    Memuat...
                  </span>
                </span>
              ) : (
                <span className="text-sm sm:text-base font-bold leading-6 tracking-[0.4px] text-[#111218]">
                  Muat Lebih Banyak
                </span>
              )}
            </motion.button>
          </motion.div>
        )}

        {!loading && !pagination.hasMore && cultures.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-gray-500 text-sm"
          >
            Semua budaya telah ditampilkan ({pagination.total} total)
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CulturalGridSection;
