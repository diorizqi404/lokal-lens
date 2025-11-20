'use client';

import { motion } from 'framer-motion';
import ScoreCard from '@/components/sections/Kuis/ScoreCard';
import StatCard from '@/components/sections/Kuis/StatCard';
import ActionButtons from '@/components/sections/Kuis/ActionButtons';

export default function SkorPage() {
  // Mock data - would come from quiz results
  const scoreData = {
    score: 85,
    message: 'Luar biasa! Pengetahuan Anda tentang candi Nusantara sangat mengagumkan. Teruslah menjelajahi kekayaan budaya Indonesia!',
    correctAnswers: 8,
    totalQuestions: 10,
    wrongAnswers: 2,
    completionTime: '05:23',
  };

  return (
    <main className="min-h-screen bg-white py-8 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[896px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          {/* Score Card */}
          <ScoreCard 
            score={scoreData.score} 
            message={scoreData.message}
          />

          {/* Stats Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              icon="correct"
              label="Jawaban Benar"
              value={`${scoreData.correctAnswers} / ${scoreData.totalQuestions}`}
              index={0}
            />
            <StatCard
              icon="wrong"
              label="Jawaban Salah"
              value={`${scoreData.wrongAnswers} / ${scoreData.totalQuestions}`}
              index={1}
            />
            <StatCard
              icon="time"
              label="Waktu Selesai"
              value={scoreData.completionTime}
              index={2}
            />
          </div>

          {/* Action Buttons */}
          <ActionButtons />

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-4"
          >
            <a
              href="/kuis"
              className="text-[#006C84] text-center font-sans text-base font-normal leading-6 hover:underline transition-all"
            >
              Kembali ke Daftar Kuis
            </a>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
