'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
}

const HeroSection = ({ title }: HeroSectionProps) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 mb-10 sm:mb-12 lg:mb-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-[#1A1A1A] text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Pembahasan Kuis
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg text-[#4B5563] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {title}
      </motion.p>
    </motion.div>
  );
};

export default HeroSection;
