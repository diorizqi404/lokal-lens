'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';

interface HighlightArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  read_time: number;
  author: {
    full_name: string;
  };
}

const HeroSection = () => {
  const [article, setArticle] = useState<HighlightArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighlightArticle();
  }, []);

  const fetchHighlightArticle = async () => {
    try {
      const response = await fetch('/api/articles?highlight=true&limit=1');
      if (response.ok) {
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setArticle(data.articles[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching highlight article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full mt-6 sm:mt-8 lg:mt-12 mb-10 sm:mb-14 lg:mb-16">
        <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[480px] rounded-xl overflow-hidden bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Memuat artikel pilihan...</div>
        </div>
      </section>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <section className="w-full mt-6 sm:mt-8 lg:mt-12 mb-10 sm:mb-14 lg:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[400px] sm:h-[450px] lg:h-[480px] rounded-xl overflow-hidden group"
      >
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${article.featured_image}')`,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-full sm:max-w-[600px] lg:max-w-[672px] flex flex-col gap-4 sm:gap-6 lg:gap-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="px-3 py-1 rounded-full bg-[#E57373]/90 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold">
                🔥 Artikel Pilihan
              </span>
              <span className="text-white/80 text-sm">
                {article.read_time} menit baca
              </span>
            </motion.div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white font-newsreader text-3xl sm:text-4xl lg:text-[48px] font-extrabold leading-tight sm:leading-[50px] lg:leading-[60px] tracking-[-1.584px]"
              >
                {article.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/90 font-noto text-base sm:text-lg leading-relaxed sm:leading-[29.25px]"
              >
                {article.excerpt}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="text-white/70 text-sm mt-2"
              >
                Oleh {article.author.full_name}
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link 
                href={`/artikel/${article.slug}`}
                className="inline-block self-start px-6 py-3 rounded-full bg-[#E57373] hover:bg-[#D66565] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span className="text-white font-noto text-base font-bold leading-6 tracking-[0.24px]">
                  Baca Selengkapnya →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
