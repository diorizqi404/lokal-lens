'use client';

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="p-8 rounded-[20px] shadow-lg relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #006C84 0%, #0F766E 100%)',
      }}
    >
      {/* Animated background effect */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 flex items-center gap-6">
        <motion.div
          animate={{
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex-shrink-0"
        >
          <svg width="60" height="72" viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.5 28.5L44.375 21.625L37.5 18.5L44.375 15.375L47.5 8.5L50.625 15.375L57.5 18.5L50.625 21.625L47.5 28.5ZM47.5 63.5L44.375 56.625L37.5 53.5L44.375 50.375L47.5 43.5L50.625 50.375L57.5 53.5L50.625 56.625L47.5 63.5ZM22.5 56L16.25 42.25L2.5 36L16.25 29.75L22.5 16L28.75 29.75L42.5 36L28.75 42.25L22.5 56ZM22.5 43.875L25 38.5L30.375 36L25 33.5L22.5 28.125L20 33.5L14.625 36L20 38.5L22.5 43.875Z" fill="#F7F7F7"/>
          </svg>
        </motion.div>

        <div className="flex-1 space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-2xl font-bold text-[#F7F7F7] leading-tight"
          >
            Mulai Petualangan Budaya Anda!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="text-base text-[#F7F7F7]/90 leading-6"
          >
            Setiap pindaian adalah langkah baru untuk menemukan cerita,
            mengungkap makna, dan melestarikan warisan bangsa. Dapatkan
            poin, buka lencana, dan jadilah Penjaga Budaya bersama Lokallens.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
