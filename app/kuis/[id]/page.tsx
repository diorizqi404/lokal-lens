'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function QuizIntroPage() {
  const params = useParams();
  const router = useRouter();

  const quizData = {
    title: 'Kuis Jelajah Candi Nusantara',
    description: 'Uji pengetahuan Anda tentang candi-candi bersejarah di Indonesia. Pelajari lebih dalam tentang arsitektur, sejarah, dan keunikan setiap candi.',
    image: 'https://images.unsplash.com/photo-1591178825729-928ea0a0fe95?w=800&q=80',
    totalQuestions: 10,
    duration: '15 menit',
    difficulty: 'Menengah',
    points: '1000',
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-3xl overflow-hidden bg-white shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] mb-8">
            <motion.div 
              className="relative w-full aspect-video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src={quizData.image}
                alt={quizData.title}
                fill
                className="object-cover"
                sizes="960px"
              />
            </motion.div>

            <div className="p-6 sm:p-8 lg:p-12">
              <motion.h1 
                className="text-3xl sm:text-4xl font-bold leading-tight text-[#111318] mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {quizData.title}
              </motion.h1>

              <motion.p 
                className="text-base sm:text-lg text-[#6B7280] mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {quizData.description}
              </motion.p>

              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs sm:text-sm font-medium text-[#6B7280] mb-1">Soal</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#2B6CEE]">{quizData.totalQuestions}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs sm:text-sm font-medium text-[#6B7280] mb-1">Durasi</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#16A34A]">{quizData.duration}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-xs sm:text-sm font-medium text-[#6B7280] mb-1">Tingkat</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#9333EA]">{quizData.difficulty}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-xs sm:text-sm font-medium text-[#6B7280] mb-1">Poin Max</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#D97706]">{quizData.points}</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-blue-50 border-l-4 border-[#2B6CEE] rounded-lg p-4 sm:p-6 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-bold text-[#2B6CEE] mb-3">Aturan Kuis:</h3>
                <ul className="space-y-2 text-sm sm:text-base text-[#374151]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B6CEE] mt-1">•</span>
                    <span>Setiap pertanyaan memiliki satu jawaban yang benar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B6CEE] mt-1">•</span>
                    <span>Anda akan mendapat poin untuk setiap jawaban yang benar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B6CEE] mt-1">•</span>
                    <span>Tidak ada pengurangan poin untuk jawaban yang salah</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B6CEE] mt-1">•</span>
                    <span>Setelah memilih jawaban, Anda akan melihat penjelasan</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  onClick={() => router.push(`/kuis/${params.id}/mulai`)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#2B6CEE] text-white font-bold text-lg hover:bg-[#1e5acc] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Mulai Kuis</span>
                  <svg width="24" height="24" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.069 14.9723H4.23218V13.0278H16.069L10.6245 7.58339L12.01 6.22228L19.7877 14.0001L12.01 21.7778L10.6245 20.4167L16.069 14.9723Z" fill="white"/>
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => router.push('/kuis')}
                  className="flex-1 px-6 py-4 rounded-full bg-white border-2 border-gray-300 text-[#374151] font-bold text-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Kembali
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
