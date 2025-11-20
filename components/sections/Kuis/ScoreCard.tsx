'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ScoreCardProps {
  score: number;
  message: string;
}

const ScoreCard = ({ score, message }: ScoreCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      className="relative w-full max-w-[512px] p-8 md:p-12 flex flex-col items-center rounded-3xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-5 pointer-events-none">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 512 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="512" height="340" fill="#006C84" fillOpacity="0.1" />
          <path
            d="M0 0 L512 340 M0 340 L512 0"
            stroke="#006C84"
            strokeWidth="2"
            strokeOpacity="0.1"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-primary-gold text-center font-sans text-lg font-bold leading-7 mb-2"
        >
          Skor Akhir Anda
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            type: 'spring',
            stiffness: 150
          }}
          className="py-2"
        >
          <h1 className="text-[#006C84] text-center font-sans text-[80px] md:text-[128px] font-extrabold leading-none tracking-[-0.05em]">
            {score}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="max-w-[448px] text-[#4B5563] text-center font-sans text-base font-normal leading-6 px-1"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ScoreCard;
