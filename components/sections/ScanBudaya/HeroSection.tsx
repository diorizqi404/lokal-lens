'use client';

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="pt-12 pb-8 lg:pt-16 lg:pb-12"
    >
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-4xl sm:text-5xl lg:text-[48px] font-extrabold leading-tight tracking-[-2.4px] text-[#111818] mb-4"
      >
        Pindai Objek Budaya
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg leading-7 text-[#618989] max-w-[595px]"
      >
        Arahkan kamera ke objek budaya dan temukan ceritanya secara instan.
      </motion.p>
    </motion.section>
  );
}
