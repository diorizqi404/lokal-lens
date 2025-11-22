'use client';

import { motion } from 'framer-motion';
import QuizCard from './QuizCard';
import FilterDropdown from './FilterDropdown';

interface Quiz {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  category: string | null;
  difficulty: string;
  time_limit: number | null;
  total_questions: number;
  total_attempts: number;
  category_rel?: {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

interface QuizGridSectionProps {
  quizzes: Quiz[];
  categories: Category[];
  loading: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
}

const difficultyMap: Record<string, 'Mudah' | 'Menengah' | 'Sulit'> = {
  easy: 'Mudah',
  medium: 'Menengah',
  hard: 'Sulit',
};

const categoryColors: Record<string, string> = {
  'tarian': 'rgba(253, 126, 20, 0.90)',
  'musik': 'rgba(74, 144, 226, 0.90)',
  'pakaian': 'rgba(233, 30, 99, 0.90)',
  'arsitektur': 'rgba(156, 39, 176, 0.90)',
  'kuliner': 'rgba(255, 87, 34, 0.90)',
  'upacara': 'rgba(208, 2, 27, 0.90)',
  'kerajinan': 'rgba(144, 19, 254, 0.90)',
  'senjata': 'rgba(121, 85, 72, 0.90)',
  'permainan': 'rgba(0, 188, 212, 0.90)',
  'bahasa': 'rgba(76, 175, 80, 0.90)',
  'default': 'rgba(0, 169, 157, 0.90)',
};

const difficulties = ['all', 'easy', 'medium', 'hard'];
const difficultyLabels: Record<string, string> = {
  'all': 'Semua Tingkat',
  'easy': 'Mudah',
  'medium': 'Menengah',
  'hard': 'Sulit',
};

const QuizGridSection = ({
  quizzes,
  categories,
  loading,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
}: QuizGridSectionProps) => {
  // Build category options
  const categoryOptions = [
    { label: 'Semua Kategori', value: 'all' },
    ...categories.map(cat => ({ label: cat.name, value: cat.slug }))
  ];

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
              options={categoryOptions.map(c => c.label)}
              selected={categoryOptions.find(c => c.value === selectedCategory)?.label || 'Semua Kategori'}
              onSelect={(label) => {
                const option = categoryOptions.find(c => c.label === label);
                setSelectedCategory(option?.value || 'all');
              }}
              placeholder="Semua Kategori"
            />
            <FilterDropdown
              options={difficulties.map(d => difficultyLabels[d])}
              selected={difficultyLabels[selectedDifficulty]}
              onSelect={(label) => {
                const key = Object.keys(difficultyLabels).find(k => difficultyLabels[k] === label) || 'all';
                setSelectedDifficulty(key);
              }}
              placeholder="Semua Tingkat"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-3xl h-96"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {quizzes.map((quiz, index) => (
              <QuizCard 
                key={quiz.id} 
                quiz={{
                  id: quiz.id,
                  title: quiz.title,
                  slug: quiz.slug,
                  category: quiz.category_rel?.name || 'Umum',
                  categoryColor: categoryColors[quiz.category_rel?.slug || ''] || categoryColors['default'],
                  difficulty: (difficultyMap[quiz.difficulty] || 'Menengah') as 'Mudah' | 'Menengah' | 'Sulit',
                  duration: quiz.time_limit ? `${quiz.time_limit} Menit` : `${quiz.total_questions * 2} Menit`,
                  description: quiz.description || 'Uji pengetahuanmu tentang budaya Indonesia!',
                  image: quiz.thumbnail || 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80',
                }} 
                index={index} 
              />
            ))}
          </motion.div>
        )}

        {!loading && quizzes.length === 0 && (
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
