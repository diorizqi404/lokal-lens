'use client';

import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import HeroSection from '@/components/sections/KuisPembahasan/HeroSection';
import QuestionCard from '@/components/sections/KuisPembahasan/QuestionCard';
import ActionButtons from '@/components/sections/KuisPembahasan/ActionButtons';

export default function PembahasanKuisPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.id;

  const quizData = {
    title: 'Jelajah Candi Nusantara',
    questions: [
      {
        id: 1,
        question: 'Candi Buddha terbesar di dunia yang terletak di Magelang adalah...',
        isCorrect: true,
        correctAnswer: 'Candi Borobudur',
        userAnswer: null,
        explanation: 'Candi Borobudur adalah monumen Buddha Mahayana abad ke-9 di Magelang, Jawa Tengah, Indonesia. Monumen ini terdiri atas sembilan teras berundak, enam berbentuk bujur sangkar dan tiga berbentuk bundar, dengan sebuah stupa induk di puncaknya.'
      },
      {
        id: 2,
        question: 'Relief Ramayana yang sangat terkenal terpahat di candi...',
        isCorrect: false,
        correctAnswer: 'Candi Prambanan',
        userAnswer: 'Candi Sewu',
        explanation: 'Kisah Ramayana terukir pada dinding pagar langkan Candi Siwa di kompleks Candi Prambanan. Relief ini dibaca dari kanan ke kiri mengelilingi candi sesuai arah pradaksina.'
      },
      {
        id: 3,
        question: 'Candi manakah yang dikenal dengan sebutan "Candi Ramping"?',
        isCorrect: true,
        correctAnswer: 'Candi Prambanan',
        userAnswer: null,
        explanation: 'Candi Prambanan memiliki bentuk yang tinggi dan ramping, yang merupakan ciri khas arsitektur candi Hindu, menjadikannya salah satu candi terindah di Asia Tenggara.'
      }
    ]
  };

  const handleRetakeQuiz = () => {
    router.push(`/kuis/${quizId}/detail`);
  };

  const handleBackToQuizList = () => {
    router.push('/kuis');
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-[896px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <HeroSection title={quizData.title} />

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {quizData.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
            />
          ))}
        </motion.div>

        <ActionButtons
          onRetakeQuiz={handleRetakeQuiz}
          onBackToQuizList={handleBackToQuizList}
        />
      </div>
    </main>
  );
}
