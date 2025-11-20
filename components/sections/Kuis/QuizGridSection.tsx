'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import QuizCard from './QuizCard';
import FilterDropdown from './FilterDropdown';

interface Quiz {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  difficulty: 'Mudah' | 'Menengah' | 'Sulit';
  duration: string;
  description: string;
  image: string;
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'Jelajah Candi Nusantara',
    category: 'Candi',
    categoryColor: 'rgba(212, 160, 23, 0.90)',
    difficulty: 'Menengah',
    duration: '5 Menit',
    description: 'Seberapa jauh pengetahuanmu tentang candi-candi megah yang tersebar di seluruh Indonesia?',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80',
  },
  {
    id: 2,
    title: 'Ragam Tarian Indonesia',
    category: 'Tarian',
    categoryColor: 'rgba(192, 57, 43, 0.90)',
    difficulty: 'Mudah',
    duration: '3 Menit',
    description: 'Kenali berbagai tarian tradisional dari Sabang sampai Merauke dalam kuis yang seru ini.',
    image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&q=80',
  },
  {
    id: 3,
    title: 'Cita Rasa Kuliner Khas',
    category: 'Kuliner',
    categoryColor: 'rgba(0, 108, 132, 0.90)',
    difficulty: 'Menengah',
    duration: '7 Menit',
    description: 'Tebak nama dan asal masakan tradisional Indonesia. Awas, bikin lapar!',
    image: 'https://images.unsplash.com/photo-1604429278231-e5d2d3e2e00c?w=800&q=80',
  },
];

const categories = ['Semua Kategori', 'Candi', 'Tarian', 'Kuliner'];
const levels = ['Semua Tingkat', 'Mudah', 'Menengah', 'Sulit'];

const QuizGridSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedLevel, setSelectedLevel] = useState('Semua Tingkat');

  const filteredQuizzes = quizzes.filter((quiz) => {
    const categoryMatch = selectedCategory === 'Semua Kategori' || quiz.category === selectedCategory;
    const levelMatch = selectedLevel === 'Semua Tingkat' || quiz.difficulty === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8"
        >
          <h2 className="text-2xl font-bold leading-8 text-[#1A1A1A]">
            Pilih Kuis
          </h2>
          
          <div className="flex flex-wrap items-center gap-4">
            <FilterDropdown
              options={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              placeholder="Semua Kategori"
            />
            <FilterDropdown
              options={levels}
              selected={selectedLevel}
              onSelect={setSelectedLevel}
              placeholder="Semua Tingkat"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredQuizzes.map((quiz, index) => (
            <QuizCard key={quiz.id} quiz={quiz} index={index} />
          ))}
        </motion.div>

        {filteredQuizzes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <p className="text-lg text-[#6B7280]">
              Tidak ada kuis yang sesuai dengan filter yang dipilih.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QuizGridSection;
