'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/ListKuis/HeroSection';
import QuizGridSection from '@/components/sections/ListKuis/QuizGridSection';

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

export default function KuisPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, [selectedCategory, selectedDifficulty]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?type=culture');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedDifficulty !== 'all') params.append('difficulty', selectedDifficulty);

      const response = await fetch(`/api/quizzes?${params}`);
      const data = await response.json();

      if (data.success) {
        setQuizzes(data.data);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <QuizGridSection 
        quizzes={quizzes}
        categories={categories}
        loading={loading}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
      />
    </div>
  );
}
