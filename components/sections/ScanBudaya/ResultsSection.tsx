'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ResultData {
  name: string;
  location: string;
  accuracy: string;
  description: string;
  rarity: string;
  unesco: string;
  image?: string;
  capturedImage?: string; // Add captured image from scanner
}

interface ResultsSectionProps {
  data?: ResultData;
  isLoading?: boolean;
}

const ResultsSection = ({ data, isLoading }: ResultsSectionProps) => {
  // Check if object is not recognized
  const isNotRecognized = (data: ResultData | undefined) => {
    if (!data) return false;
    const name = data.name.toLowerCase();
    const accuracy = parseInt(data.accuracy) || 0;
    return name.includes('tidak dikenali') || 
           name.includes('tidak teridentifikasi') ||
           accuracy < 20;
  };

  // Validate and get safe image URL
  const getSafeImageUrl = (imageUrl: string | undefined) => {
    const defaultImage = "https://api.builder.io/api/v1/image/assets/TEMP/89c67eb5f11a227a160db9dd9ebf291d6ca0b917?width=224";
    
    if (!imageUrl) return defaultImage;
    
    // Check if it's a valid URL (starts with http:// or https://)
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      try {
        new URL(imageUrl);
        return imageUrl;
      } catch {
        return defaultImage;
      }
    }
    
    // If it's a relative path starting with /
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    
    // Otherwise, it's invalid (like "URL gambar placeholder atau deskripsi")
    return defaultImage;
  };

  // Default data
  const defaultData: ResultData = {
    name: "Keris Nogososro",
    location: "Jawa Tengah, Indonesia",
    accuracy: "92%",
    description: "Keris Nogososro adalah salah satu dhapur keris luk 13 yang melegenda. Dikenal sebagai pusaka agung yang melambangkan kekuasaan, kebijaksanaan, dan perlindungan bagi pemiliknya.",
    rarity: "Sangat Langka",
    unesco: "Terdaftar",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/89c67eb5f11a227a160db9dd9ebf291d6ca0b917?width=224"
  };

  const displayData = data || defaultData;
  
  const getRarityColor = (rarity: string) => {
    if (rarity.includes('Sangat Langka')) return 'bg-[#FEE2E2]';
    if (rarity.includes('Langka')) return 'bg-[#FEF3C7]';
    return 'bg-[#D1FAE5]';
  };

  const getRarityTextColor = (rarity: string) => {
    if (rarity.includes('Sangat Langka')) return 'text-[#991B1B]';
    if (rarity.includes('Langka')) return 'text-[#92400E]';
    return 'text-[#065F46]';
  };

  const getUnescoColor = (unesco: string) => {
    return unesco.includes('Terdaftar') ? 'bg-[#DBEAFE]' : 'bg-[#F3F4F6]';
  };

  const getUnescoTextColor = (unesco: string) => {
    return unesco.includes('Terdaftar') ? 'text-[#1E40AF]' : 'text-[#4B5563]';
  };

  if (isLoading) {
    return (
      <motion.section 
        className="w-full"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="w-full rounded-2xl border border-[#F0F4F4] bg-white shadow-lg">
          <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-center py-12">
              <motion.div
                className="w-12 h-12 border-4 border-[#13EC5B] border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="text-center text-[#618989]">Menganalisis objek budaya...</p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className="w-full"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="w-full rounded-2xl border border-[#F0F4F4] bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
          <motion.div 
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div 
              className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 shrink-0 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {isNotRecognized(data) ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              ) : (
                <Image
                  src={displayData.capturedImage || getSafeImageUrl(displayData.image)}
                  alt={displayData.name}
                  fill
                  className="object-cover"
                />
              )}
            </motion.div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-9 tracking-[-0.75px] text-[#111818] mb-2">
                {displayData.name}
              </h2>
              <p className="text-sm sm:text-base font-medium leading-6 text-[#618989]">
                {displayData.location}
              </p>
            </div>
          </motion.div>

          <motion.div 
            className={`rounded-xl p-4 sm:p-6 ${isNotRecognized(data) ? 'bg-red-50 border border-red-200' : 'bg-[#F6F8F8]'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 sm:gap-5">
              {isNotRecognized(data) && (
                <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              <motion.div 
                className={`text-xl sm:text-2xl font-bold leading-5 ${isNotRecognized(data) ? 'text-red-600' : 'text-[#111818]'}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
              >
                {displayData.accuracy}
              </motion.div>
              <div className="flex-1">
                <h3 className={`text-sm sm:text-base font-bold leading-6 mb-1 ${isNotRecognized(data) ? 'text-red-700' : 'text-[#111818]'}`}>
                  {isNotRecognized(data) ? 'Objek Tidak Dikenali' : 'Tingkat Akurasi Model AI'}
                </h3>
                <p className={`text-xs sm:text-sm font-normal leading-5 ${isNotRecognized(data) ? 'text-red-600' : 'text-[#618989]'}`}>
                  {isNotRecognized(data) 
                    ? 'AI tidak dapat mengidentifikasi objek budaya Indonesia. Coba foto lagi dengan pencahayaan lebih baik.'
                    : 'Objek berhasil diidentifikasi.'
                  }
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-2 sm:space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="text-sm sm:text-base font-bold leading-6 text-[#111818]">
              Deskripsi
            </h3>
            <p className="text-xs sm:text-sm font-normal leading-relaxed text-[#618989]">
              {displayData.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div 
              className="space-y-2 sm:space-y-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-sm sm:text-base font-bold leading-6 text-[#111818]">
                Tingkat Kelangkaan
              </h3>
              <motion.div 
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${getRarityColor(displayData.rarity)}`}
                whileHover={{ scale: 1.05 }}
              >
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-5">
                  <path d="M8.00065 16L1.33398 8L3.33398 4H12.6673L14.6673 8L8.00065 16ZM6.41732 7.33333H9.58398L8.58398 5.33333H7.41732L6.41732 7.33333ZM7.33398 13.1167V8.66667H3.63398L7.33398 13.1167ZM8.66732 13.1167L12.3673 8.66667H8.66732V13.1167ZM11.0673 7.33333H12.834L11.834 5.33333H10.0673L11.0673 7.33333ZM3.16732 7.33333H4.93398L5.93398 5.33333H4.16732L3.16732 7.33333Z" className={getRarityTextColor(displayData.rarity)} fill="currentColor"/>
                </svg>
                <span className={`text-xs sm:text-sm font-semibold leading-5 ${getRarityTextColor(displayData.rarity)}`}>
                  {displayData.rarity}
                </span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-2 sm:space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-sm sm:text-base font-bold leading-6 text-[#111818]">
                Status UNESCO
              </h3>
              <motion.div 
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${getUnescoColor(displayData.unesco)}`}
                whileHover={{ scale: 1.05 }}
              >
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-5">
                  <path d="M5.73268 17L4.46602 14.8667L2.06602 14.3333L2.29935 11.8667L0.666016 10L2.29935 8.13333L2.06602 5.66667L4.46602 5.13333L5.73268 3L7.99935 3.96667L10.266 3L11.5327 5.13333L13.9327 5.66667L13.6993 8.13333L15.3327 10L13.6993 11.8667L13.9327 14.3333L11.5327 14.8667L10.266 17L7.99935 16.0333L5.73268 17ZM6.29935 15.3L7.99935 14.5667L9.73268 15.3L10.666 13.7L12.4993 13.2667L12.3327 11.4L13.566 10L12.3327 8.56667L12.4993 6.7L10.666 6.3L9.69935 4.7L7.99935 5.43333L6.26602 4.7L5.33268 6.3L3.49935 6.7L3.66602 8.56667L2.43268 10L3.66602 11.4L3.49935 13.3L5.33268 13.7L6.29935 15.3ZM7.29935 12.3667L11.066 8.6L10.1327 7.63333L7.29935 10.4667L5.86602 9.06667L4.93268 10L7.29935 12.3667Z" className={getUnescoTextColor(displayData.unesco)} fill="currentColor"/>
                </svg>
                <span className={`text-xs sm:text-sm font-semibold leading-5 ${getUnescoTextColor(displayData.unesco)}`}>
                  {displayData.unesco}
                </span>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="border-t border-[#F0F4F4] pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <motion.button 
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[rgba(19,236,236,0.2)] hover:bg-[rgba(19,236,236,0.3)] transition-all flex-1 sm:flex-initial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="24" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-6">
                <path d="M14.9196 22.7405L9.08872 20.6997L4.56977 22.449C4.24583 22.5786 3.94618 22.5421 3.67083 22.3397C3.39549 22.1372 3.25781 21.8659 3.25781 21.5258V7.92032C3.25781 7.70976 3.31855 7.5235 3.44003 7.36153C3.56151 7.19956 3.72752 7.07808 3.93808 6.9971L9.08872 5.24783L14.9196 7.28864L19.4386 5.53937C19.7625 5.4098 20.0622 5.44624 20.3375 5.6487C20.6129 5.85116 20.7505 6.12246 20.7505 6.4626V20.068C20.7505 20.2786 20.6898 20.4649 20.5683 20.6268C20.4468 20.7888 20.2808 20.9103 20.0703 20.9913L14.9196 22.7405ZM13.9478 20.3596V8.98932L10.0605 7.62878V18.999L13.9478 20.3596ZM15.8914 20.3596L18.8069 19.3878V7.87173L15.8914 8.98932V20.3596ZM5.20145 20.1166L8.1169 18.999V7.62878L5.20145 8.6006V20.1166Z" fill="#111818"/>
              </svg>
              <span className="text-sm sm:text-base font-bold leading-6 text-[#111818]">
                Lihat di Peta
              </span>
            </motion.button>

            <motion.button 
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[rgba(19,236,236,0.2)] hover:bg-[rgba(19,236,236,0.3)] transition-all flex-1 sm:flex-initial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="24" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-6">
                <path d="M8.12023 21.7778C7.5855 21.7778 7.12775 21.5874 6.74696 21.2066C6.36617 20.8258 6.17578 20.368 6.17578 19.8333V16.9167H9.09245V14.7292C8.52532 14.6968 7.98655 14.5712 7.47613 14.3524C6.96571 14.1337 6.49986 13.8055 6.07856 13.368V12.2986H4.9605L1.80078 9.13888C2.38411 8.39351 3.10518 7.86689 3.96398 7.55902C4.82277 7.25115 5.68967 7.09722 6.56467 7.09722C7.00217 7.09722 7.42752 7.12962 7.84071 7.19444C8.25391 7.25925 8.67115 7.38078 9.09245 7.55902V6.22222H20.7591V18.8611C20.7591 19.6713 20.4755 20.3599 19.9084 20.9271C19.3413 21.4942 18.6526 21.7778 17.8424 21.7778H8.12023ZM11.0369 16.9167H16.8702V18.8611C16.8702 19.1366 16.9634 19.3675 17.1497 19.5538C17.3361 19.7402 17.567 19.8333 17.8424 19.8333C18.1179 19.8333 18.3488 19.7402 18.5352 19.5538C18.7215 19.3675 18.8147 19.1366 18.8147 18.8611V8.16666H11.0369V8.74999L16.8702 14.5833V15.9444H15.5091L12.7383 13.1736L12.5438 13.368C12.317 13.5949 12.078 13.7974 11.8268 13.9757C11.5757 14.1539 11.3124 14.2917 11.0369 14.3889V16.9167ZM5.78689 10.3542H8.023V12.4444C8.21745 12.5741 8.41999 12.6632 8.63064 12.7118C8.84129 12.7604 9.06004 12.7847 9.28689 12.7847C9.65958 12.7847 9.9958 12.728 10.2956 12.6146C10.5953 12.5012 10.8911 12.2986 11.1827 12.0069L11.3772 11.8125L10.0161 10.4514C9.54615 9.98147 9.01953 9.62904 8.4362 9.39409C7.85286 9.15914 7.22902 9.04166 6.56467 9.04166C6.2406 9.04166 5.93273 9.06597 5.64106 9.11458C5.34939 9.16319 5.05773 9.2361 4.76606 9.33333L5.78689 10.3542ZM14.9258 18.8611H8.12023V19.8333H15.0716C15.023 19.6875 14.9865 19.5336 14.9622 19.3715C14.9379 19.2095 14.9258 19.0393 14.9258 18.8611ZM8.12023 19.8333C8.12023 19.6875 8.12023 19.5336 8.12023 19.3715C8.12023 19.2095 8.12023 19.0393 8.12023 18.8611C8.12023 19.0231 8.12023 19.1852 8.12023 19.3472C8.12023 19.5093 8.12023 19.6713 8.12023 19.8333Z" fill="#111818"/>
              </svg>
              <span className="text-sm sm:text-base font-bold leading-6 text-[#111818]">
                Cerita Lengkap
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ResultsSection;
