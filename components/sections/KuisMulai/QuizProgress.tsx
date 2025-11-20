'use client';

import { motion } from 'framer-motion';

interface QuizProgressProps {
  score: number;
  current: number;
  total: number;
}

export default function QuizProgress({ score, current, total }: QuizProgressProps) {
  const progress = (current / total) * 100;

  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 px-4 sm:px-8 py-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.1)]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.12118 19.8333L12.0101 16.868L15.899 19.8333L14.4406 15.0208L18.3295 12.2499H13.5656L12.0101 7.19439L10.4545 12.2499H5.69062L9.57951 15.0208L8.12118 19.8333ZM12.0101 23.7222C10.6652 23.7222 9.40127 23.467 8.2184 22.9565C7.03553 22.4461 6.00659 21.7534 5.13159 20.8784C4.25659 20.0034 3.56388 18.9745 3.05347 17.7916C2.54305 16.6087 2.28784 15.3449 2.28784 13.9999C2.28784 12.655 2.54305 11.3911 3.05347 10.2083C3.56388 9.02541 4.25659 7.99647 5.13159 7.12147C6.00659 6.24647 7.03553 5.55376 8.2184 5.04335C9.40127 4.53293 10.6652 4.27772 12.0101 4.27772C13.355 4.27772 14.6189 4.53293 15.8017 5.04335C16.9846 5.55376 18.0135 6.24647 18.8885 7.12147C19.7635 7.99647 20.4562 9.02541 20.9667 10.2083C21.4771 11.3911 21.7323 12.655 21.7323 13.9999C21.7323 15.3449 21.4771 16.6087 20.9667 17.7916C20.4562 18.9745 19.7635 20.0034 18.8885 20.8784C18.0135 21.7534 16.9846 22.4461 15.8017 22.9565C14.6189 23.467 13.355 23.7222 12.0101 23.7222ZM12.0101 21.7777C14.1814 21.7777 16.0205 21.0243 17.5274 19.5173C19.0344 18.0104 19.7878 16.1712 19.7878 13.9999C19.7878 11.8286 19.0344 9.98953 17.5274 8.48258C16.0205 6.97564 14.1814 6.22217 12.0101 6.22217C9.83877 6.22217 7.99965 6.97564 6.4927 8.48258C4.98576 9.98953 4.23229 11.8286 4.23229 13.9999C4.23229 16.1712 4.98576 18.0104 6.4927 19.5173C7.99965 21.0243 9.83877 21.7777 12.0101 21.7777Z" fill="#EAB308"/>
        </svg>
        <span className="text-sm font-bold leading-5 text-[#111318]">
          Skor: <span className="text-[#2B6CEE]">{score}</span>
        </span>
      </motion.div>

      <div className="flex-1 w-full sm:w-auto flex flex-col gap-3">
        <p className="text-base font-medium leading-6 text-[#111318]">
          {current}/{total} Selesai
        </p>
        <div className="relative w-full h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 h-full rounded-full bg-[#2B6CEE]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
