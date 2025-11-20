'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterDropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder: string;
}

const FilterDropdown = ({ options, selected, onSelect, placeholder }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 w-full sm:w-auto min-w-[144px] px-3.5 py-2.5 rounded-2xl border border-[#D1D5DB] bg-white hover:border-[#006C84] transition-colors"
      >
        <span className="text-sm font-normal leading-5 text-[#1A1A1A]">
          {selected}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.30005 8.3999L10.5 12.5999L14.7 8.3999"
            stroke="#6B7280"
            strokeWidth="1.575"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full sm:w-auto min-w-[144px] bg-white border border-[#E5E7EB] rounded-2xl shadow-lg overflow-hidden z-50"
          >
            {options.map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-3 text-sm font-normal leading-5 transition-colors ${
                  selected === option
                    ? 'bg-[rgba(0,108,132,0.1)] text-[#006C84] font-medium'
                    : 'text-[#1A1A1A] hover:bg-gray-50'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
