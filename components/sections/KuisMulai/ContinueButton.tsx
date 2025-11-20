'use client';

import { motion } from 'framer-motion';

interface ContinueButtonProps {
  onClick: () => void;
}

export default function ContinueButton({ onClick }: ContinueButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center justify-center gap-2 min-w-[120px] max-w-[480px] h-12 px-6 rounded-3xl bg-[#2B6CEE] text-white font-bold text-base leading-6 tracking-[0.24px] hover:bg-[#1e5acc] transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>Lanjutkan</span>
      <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.069 14.9723H4.23218V13.0278H16.069L10.6245 7.58339L12.01 6.22228L19.7877 14.0001L12.01 21.7778L10.6245 20.4167L16.069 14.9723Z" fill="white"/>
      </svg>
    </motion.button>
  );
}
