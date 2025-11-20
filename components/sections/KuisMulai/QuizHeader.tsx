'use client';

import { motion } from 'framer-motion';

interface QuizHeaderProps {
  title: string;
}

export default function QuizHeader({ title }: QuizHeaderProps) {
  return (
    <motion.div 
      className="flex flex-col items-center py-6 sm:py-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight lg:leading-[40px] tracking-[-0.8px] text-[#111318] text-center">
        {title}
      </h1>
    </motion.div>
  );
}
