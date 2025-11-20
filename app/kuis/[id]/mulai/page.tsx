'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QuizHeader from '@/components/sections/KuisMulai/QuizHeader';
import QuizProgress from '@/components/sections/KuisMulai/QuizProgress';
import QuestionCard from '@/components/sections/KuisMulai/QuestionCard';
import AnswerOptions from '@/components/sections/KuisMulai/AnswerOptions';
import FeedbackCard from '@/components/sections/KuisMulai/FeedbackCard';
import ContinueButton from '@/components/sections/KuisMulai/ContinueButton';

interface Question {
  id: number;
  question: string;
  imageUrl: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const mockQuizData: Question[] = [
  {
    id: 1,
    question: 'Candi manakah yang reliefnya menceritakan kisah Ramayana dan Krishnayana?',
    imageUrl: 'https://images.unsplash.com/photo-1591178825729-928ea0a0fe95?w=800&q=80',
    options: ['Candi Borobudur', 'Candi Prambanan', 'Candi Sewu', 'Candi Plaosan'],
    correctAnswer: 1,
    explanation: 'Jawaban yang tepat. Relief Ramayana di Candi Prambanan terpahat pada dinding pagar langkan Candi Siwa dan Candi Brahma, memberikan narasi visual yang luar biasa.'
  },
  {
    id: 2,
    question: 'Siapakah arsitek yang merancang pembangunan Candi Borobudur?',
    imageUrl: 'https://images.unsplash.com/photo-1555400082-6e33d2fc4a21?w=800&q=80',
    options: ['Gunadharma', 'Empu Sindok', 'Mpu Prapanca', 'Rakai Panangkaran'],
    correctAnswer: 0,
    explanation: 'Gunadharma adalah arsitek legendaris yang dipercaya merancang Candi Borobudur pada masa Dinasti Syailendra.'
  }
];

export default function QuizMulaiPage() {
  const params = useParams();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(200);
  const [answeredQuestions, setAnsweredQuestions] = useState(3);
  
  const quizTitle = 'Kuis Jelajah Candi Nusantara';
  const totalQuestions = 10;
  const question = mockQuizData[currentQuestion % mockQuizData.length];

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === question.correctAnswer) {
      setScore(prev => prev + 100);
    }
  };

  const handleContinue = () => {
    if (answeredQuestions >= totalQuestions) {
      router.push(`/kuis/${params.id}/skor`);
      return;
    }

    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnsweredQuestions(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-[85px]">
        <QuizHeader title={quizTitle} />
        
        <div className="mt-6 sm:mt-8">
          <QuizProgress 
            score={score}
            current={answeredQuestions}
            total={totalQuestions}
          />
        </div>

        <div className="mt-6 sm:mt-8">
          <QuestionCard
            questionNumber={answeredQuestions}
            question={question.question}
            imageUrl={question.imageUrl}
            instruction="Pilih salah satu jawaban yang paling tepat di bawah ini."
          />
        </div>

        <div className="mt-6 sm:mt-8">
          <AnswerOptions
            options={question.options}
            selectedAnswer={selectedAnswer}
            correctAnswer={question.correctAnswer}
            showFeedback={showFeedback}
            onSelect={handleAnswerSelect}
          />
        </div>

        {showFeedback && (
          <div className="mt-6 sm:mt-8">
            <FeedbackCard
              isCorrect={selectedAnswer === question.correctAnswer}
              explanation={question.explanation}
            />
            
            <div className="flex justify-center mt-6">
              <ContinueButton onClick={handleContinue} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
