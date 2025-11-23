'use client';

import { motion } from 'framer-motion';

interface AnswerOptionsProps {
  options: string[];
  selectedAnswer: number | null;
  correctAnswer: number | null;
  showFeedback: boolean;
  onSelect: (index: number) => void;
  submitting?: boolean;
}

export default function AnswerOptions({ 
  options, 
  selectedAnswer, 
  correctAnswer, 
  showFeedback, 
  onSelect,
  submitting = false
}: AnswerOptionsProps) {
  const getButtonStyle = (index: number) => {
    if (!showFeedback || correctAnswer === null) {
      return selectedAnswer === index 
        ? 'bg-[#2B6CEE] text-white border-2 border-[#2B6CEE]' 
        : 'bg-[#F6F6F8] text-[#111318] hover:bg-gray-200';
    }

    if (index === correctAnswer) {
      return 'bg-[#2ECC71] text-white border-2 border-[#2ECC71]';
    }

    if (selectedAnswer === index && index !== correctAnswer) {
      return 'bg-[#EF4444] text-white border-2 border-[#EF4444]';
    }

    return 'bg-[#F6F6F8] text-[#111318] opacity-50';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((option, index) => (
        <motion.button
          key={index}
          onClick={() => onSelect(index)}
          disabled={showFeedback || submitting}
          className={`
            min-h-14 px-5 py-3 rounded-3xl font-bold text-base leading-6 tracking-[0.24px]
            transition-all duration-300 disabled:cursor-not-allowed
            ${getButtonStyle(index)}
          `}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
          whileHover={!showFeedback ? { scale: 1.02 } : {}}
          whileTap={!showFeedback ? { scale: 0.98 } : {}}
        >
          <div className="flex items-center justify-center gap-3">
            {submitting && selectedAnswer === index && !showFeedback && (
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
            <span>{option}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
