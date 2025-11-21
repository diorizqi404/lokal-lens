'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const RecommendationsSection = () => {
  const recommendations = [
    {
      category: 'ARTIKEL',
      categoryColor: '#006C84',
      title: 'Seni Empu: Filosofi di Balik Pembuatan Keris',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/5a0ae0d401adfc2732969fcac7f4f6c5669747c0?width=356'
    },
    {
      category: 'EVENT',
      categoryColor: '#C0392B',
      title: 'Pameran Pusaka Nusantara di Museum Nasional',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/5b6ce0692ee9f0c0f72ecb6f44a6b5b81067011b?width=356'
    },
    {
      category: 'KUIS',
      categoryColor: '#D4A017',
      title: 'Seberapa Tahu Kamu Tentang Tosan Aji?',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/f10cb3fb2da0a7344f03bae6f52c228c2eda6608?width=356'
    }
  ];

  return (
    <motion.section 
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="rounded-[20px] bg-[#006C84] shadow-xl p-6 sm:p-8 space-y-5">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-8 sm:w-[30px] sm:h-9 flex-shrink-0">
            <path d="M11.875 23.625L20.625 18L11.875 12.375V23.625ZM5 28C4.3125 28 3.72396 27.7552 3.23438 27.2656C2.74479 26.776 2.5 26.1875 2.5 25.5V10.5C2.5 9.8125 2.74479 9.22396 3.23438 8.73438C3.72396 8.24479 4.3125 8 5 8H25C25.6875 8 26.276 8.24479 26.7656 8.73438C27.2552 9.22396 27.5 9.8125 27.5 10.5V25.5C27.5 26.1875 27.2552 26.776 26.7656 27.2656C26.276 27.7552 25.6875 28 25 28H5ZM5 25.5H25V10.5H5V25.5Z" fill="#F7F7F7"/>
          </svg>
          <div className="flex-1">
            <h3 className="text-lg sm:text-[20px] font-bold leading-7 text-[#F7F7F7]">
              Rekomendasi Konten Berbasis Scan Anda
            </h3>
            <p className="text-xs sm:text-sm font-normal leading-5 text-[rgba(247,247,247,0.8)]">
              Terkait dengan Keris Nogososro & riwayat Anda
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {recommendations.map((item, index) => (
            <motion.div 
              key={index} 
              className="rounded-xl bg-white shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-28 sm:h-32 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-3 sm:p-4 space-y-1">
                <motion.div 
                  className="text-xs font-bold leading-4 tracking-[0.6px] uppercase" 
                  style={{ color: item.categoryColor }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.category}
                </motion.div>
                <h4 className="text-sm sm:text-base font-bold leading-6 text-[#1A1A1A] line-clamp-3">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default RecommendationsSection;
