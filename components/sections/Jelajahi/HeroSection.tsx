'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

interface HeroSectionProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const HeroSection = ({ selectedCategory, onCategoryChange }: HeroSectionProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?type=culture');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full bg-white pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-extrabold leading-tight tracking-[-3px] text-[#111218] mb-4 sm:mb-6 max-w-4xl"
          >
            Jelajahi Kekayaan Budaya
            Indonesia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg lg:text-xl font-normal leading-7 text-[#616889] max-w-2xl"
          >
            Temukan keragaman budaya yang luar biasa dari seluruh nusantara, dari tarian
            tradisional hingga kuliner yang melegenda.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange('')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium sm:font-bold leading-5 transition-all whitespace-nowrap ${
              selectedCategory === ''
                ? 'bg-[#E2725B] text-white shadow-md'
                : 'bg-[#F5F5DC] text-[#111218] hover:bg-[#ebe9d0]'
            }`}
          >
            Semua
          </motion.button>
          {!loading && categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + (index + 1) * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.slug)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium sm:font-bold leading-5 transition-all whitespace-nowrap ${
                selectedCategory === category.slug
                  ? 'bg-[#E2725B] text-white shadow-md'
                  : 'bg-[#F5F5DC] text-[#111218] hover:bg-[#ebe9d0]'
              }`}
            >
              {category.icon && <span className="mr-1">{category.icon}</span>}
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
