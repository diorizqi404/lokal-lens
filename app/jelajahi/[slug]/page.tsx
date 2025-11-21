'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface CultureImage {
  id: number;
  url: string;
  alt: string;
  is_primary: boolean;
}

interface CultureDetail {
  id: number;
  name: string;
  slug: string;
  subtitle?: string;
  description: string;
  long_description?: string;
  meaning?: string;
  location: string;
  province: string;
  city: string;
  is_endangered: boolean;
  map_embed_url?: string;
  latitude?: number;
  longitude?: number;
  images: CultureImage[];
}

interface NearbyCulture {
  id: number;
  name: string;
  slug: string;
  location: string;
  thumbnail: string;
  distance?: number;
}

export default function CultureDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const [culture, setCulture] = useState<CultureDetail | null>(null);
  const [nearbyCultures, setNearbyCultures] = useState<NearbyCulture[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchCultureDetail();
    }
  }, [slug]);

  const fetchCultureDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cultures/${slug}`);

      if (!response.ok) {
        throw new Error('Budaya tidak ditemukan');
      }

      const data = await response.json();
      setCulture(data.culture);
      setNearbyCultures(data.nearby_cultures || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching culture:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevImage = () => {
    if (!culture) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? culture.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!culture) return;
    setCurrentImageIndex((prev) => 
      prev === culture.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <main className="w-full bg-white min-h-screen flex items-center justify-center">
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
            Memuat detail budaya...
          </motion.p>
        </motion.div>
      </main>
    );
  }

  if (error || !culture) {
    return (
      <main className="w-full bg-white min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-red-500 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-gray-900 mb-2"
          >
            {error || 'Budaya tidak ditemukan'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6"
          >
            Budaya yang Anda cari tidak tersedia atau telah dihapus.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/jelajahi"
              className="inline-block px-6 py-3 bg-primary-green text-white rounded-full font-medium hover:bg-[#0BC943] transition-colors"
            >
              Kembali ke Jelajahi
            </Link>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  const images = culture.images.length > 0 
    ? culture.images 
    : [{ id: 0, url: 'https://via.placeholder.com/600x400?text=No+Image', alt: culture.name, is_primary: true }];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 text-sm font-medium leading-[21px] mb-6 sm:mb-8 lg:mb-12 flex-wrap"
        >
          <Link href="/" className="text-[#495057] hover:text-[#212529] transition-colors">
            Home
          </Link>
          <span className="text-[#495057]">/</span>
          <Link href="/jelajahi" className="text-[#495057] hover:text-[#212529] transition-colors">
            Jelajah Budaya
          </Link>
          <span className="text-[#495057]">/</span>
          <span className="text-[#212529]">{culture.name}</span>
        </motion.nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Main Image */}
            <div className="relative aspect-4/3 w-full rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex].url}
                  alt={images[currentImageIndex].alt}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 right-4 flex items-center gap-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevImage}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="Previous image"
                  >
                    <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.9544 19.8333L8.12109 14L13.9544 8.16665L15.3155 9.52776L10.8433 14L15.3155 18.4722L13.9544 19.8333Z" fill="white"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextImage}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="Next image"
                  >
                    <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5933 14L8.12109 9.52776L9.4822 8.16665L15.3155 14L9.4822 19.8333L8.12109 18.4722L12.5933 14Z" fill="white"/>
                    </svg>
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-4 gap-3"
              >
                {images.slice(1, 5).map((image, index) => (
                  <motion.button
                    key={image.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentImageIndex(index + 1)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all ${
                      currentImageIndex === index + 1
                        ? 'ring-2 ring-[#FF7A00] opacity-100'
                        : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6 sm:gap-8"
          >
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-2"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight sm:leading-12 tracking-[-2.4px] text-[#212529]">
                {culture.name}
              </h1>
              {culture.subtitle && (
                <p className="text-base sm:text-lg font-normal leading-7 text-[#495057]">
                  {culture.subtitle}
                </p>
              )}
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col gap-4 p-4 sm:p-6 rounded-lg bg-[#FFEACD]"
            >
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="pt-0.5">
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0102 14C12.5449 14 13.0027 13.8096 13.3835 13.4288C13.7643 13.048 13.9546 12.5903 13.9546 12.0556C13.9546 11.5208 13.7643 11.0631 13.3835 10.6823C13.0027 10.3015 12.5449 10.1111 12.0102 10.1111C11.4755 10.1111 11.0177 10.3015 10.6369 10.6823C10.2561 11.0631 10.0658 11.5208 10.0658 12.0556C10.0658 12.5903 10.2561 13.048 10.6369 13.4288C11.0177 13.8096 11.4755 14 12.0102 14ZM12.0102 21.1458C13.9871 19.331 15.4535 17.6823 16.4095 16.1997C17.3655 14.717 17.8435 13.4005 17.8435 12.25C17.8435 10.4838 17.2805 9.03762 16.1543 7.91146C15.0281 6.78531 13.6468 6.22223 12.0102 6.22223C10.3736 6.22223 8.99226 6.78531 7.8661 7.91146C6.73995 9.03762 6.17687 10.4838 6.17687 12.25C6.17687 13.4005 6.65488 14.717 7.61089 16.1997C8.56691 17.6823 10.0333 19.331 12.0102 21.1458ZM12.0102 23.7222C9.4014 21.5023 7.45291 19.4404 6.16471 17.5365C4.87652 15.6325 4.23242 13.8704 4.23242 12.25C4.23242 9.81945 5.01425 7.88311 6.57791 6.44098C8.14157 4.99885 9.95233 4.27778 12.0102 4.27778C14.0681 4.27778 15.8788 4.99885 17.4425 6.44098C19.0061 7.88311 19.788 9.81945 19.788 12.25C19.788 13.8704 19.1439 15.6325 17.8557 17.5365C16.5675 19.4404 14.619 21.5023 12.0102 23.7222Z" fill="#FF7A00"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-normal leading-5 text-[#495057]">Lokasi</span>
                  <span className="text-base font-semibold leading-6 text-[#212529]">{culture.location}</span>
                </div>
              </div>

              {/* Status */}
              {culture.is_endangered && (
                <div className="flex items-start gap-4">
                  <div className="pt-0.5">
                    <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.31543 22.75L12.0099 4.27778L22.7043 22.75H1.31543ZM4.6696 20.8056H19.3502L12.0099 8.16667L4.6696 20.8056ZM12.0099 19.8333C12.2853 19.8333 12.5162 19.7402 12.7026 19.5538C12.8889 19.3675 12.9821 19.1366 12.9821 18.8611C12.9821 18.5856 12.8889 18.3547 12.7026 18.1684C12.5162 17.9821 12.2853 17.8889 12.0099 17.8889C11.7344 17.8889 11.5035 17.9821 11.3172 18.1684C11.1308 18.3547 11.0377 18.5856 11.0377 18.8611C11.0377 19.1366 11.1308 19.3675 11.3172 19.5538C11.5035 19.7402 11.7344 19.8333 12.0099 19.8333ZM11.0377 16.9167H12.9821V12.0556H11.0377V16.9167Z" fill="#EF4444"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-normal leading-5 text-[#495057]">Status</span>
                    <span className="text-base font-semibold leading-6 text-[#DC2626]">Terancam Punah</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4"
            >
              <p className="text-base font-normal leading-6 text-[#212529]">
                {culture.description}
              </p>
              
              {culture.long_description && (
                <p className="text-base font-normal leading-6 text-[#212529]">
                  {culture.long_description}
                </p>
              )}

              {culture.meaning && (
                <>
                  <h3 className="text-base font-normal leading-6 text-[#212529] mt-2">
                    Makna dan Filosofi
                  </h3>

                  <p className="text-base font-normal leading-6 text-[#212529]">
                    {culture.meaning}
                  </p>
                </>
              )}
            </motion.div>

            {/* Map Section */}
            {culture.map_embed_url && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col gap-4"
              >
                <h3 className="text-xl sm:text-2xl font-bold leading-8 text-[#212529]">
                  Peta Lokasi
                </h3>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="aspect-video w-full rounded-lg overflow-hidden"
                >
                  <iframe
                    src={culture.map_embed_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Peta lokasi ${culture.name}`}
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Similar Cultures Section */}
        {nearbyCultures.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 sm:mt-16 lg:mt-20"
          >
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold leading-9 text-[#212529]">
                Budaya Terdekat
              </h2>
              <Link
                href="/jelajahi"
                className="text-sm font-semibold leading-5 text-[#FF7A00] hover:text-[#E66D00] transition-colors"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {nearbyCultures.map((culture, index) => (
                <motion.div
                  key={culture.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <Link
                    href={`/jelajahi/${culture.slug}`}
                    className="flex flex-col gap-3 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="aspect-[286/214.5] w-full rounded-lg overflow-hidden"
                    >
                      <img
                        src={culture.thumbnail || 'https://via.placeholder.com/286x214?text=No+Image'}
                        alt={culture.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </motion.div>
                    <div className="flex flex-col">
                      <h4 className="text-lg font-bold leading-7 text-[#212529] group-hover:text-[#FF7A00] transition-colors">
                        {culture.name}
                      </h4>
                      <p className="text-sm font-normal leading-5 text-[#495057]">
                        {culture.location}
                        {culture.distance && (
                          <span className="ml-1 text-xs text-[#FF7A00]">
                            • {culture.distance} km
                          </span>
                        )}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.main>
  );
}
