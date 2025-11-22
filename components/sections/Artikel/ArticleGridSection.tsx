'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featured_image: string;
  read_time: number;
  published_at: string;
  author: {
    id: number;
    full_name: string;
  };
  category_rel?: {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
  };
}

interface ArticleGridSectionProps {
  page: number;
  category: string;
  search: string;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Cerita Budaya': '#4DB6AC',
    'Tokoh Inspiratif': '#E57373',
    'Event Nasional': '#4DB6AC',
    'Upaya UNESCO': '#C1A36F',
  };
  return colors[category] || '#C1A36F';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const ArticleGridSection = ({ page, category, search }: ArticleGridSectionProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '9',
        });

        if (category !== 'semua') {
          params.set('category', category);
        }

        if (search) {
          params.set('search', search);
        }

        const response = await fetch(`/api/articles?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data.articles);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, category, search]);

  // Export totalPages via parent callback
  useEffect(() => {
    // Store totalPages in window for PaginationSection to access
    if (typeof window !== 'undefined') {
      (window as any).__articleTotalPages = totalPages;
    }
  }, [totalPages]);

  if (loading) {
    return (
      <section className="w-full mb-12 sm:mb-16 lg:mb-20">
        <div className="mb-6 sm:mb-8 px-4">
          <h2 className="text-[#333] font-newsreader text-2xl sm:text-3xl font-bold leading-[37.5px] tracking-[-0.45px]">
            Jelajahi Semua Cerita
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mb-12 sm:mb-16 lg:mb-20">
      <div className="mb-6 sm:mb-8 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[#333] font-newsreader text-2xl sm:text-3xl font-bold leading-[37.5px] tracking-[-0.45px]"
        >
          Jelajahi Semua Cerita
        </motion.h2>
      </div>

      {articles.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 px-4"
        >
          <p className="text-[#6B7280] font-noto text-lg">
            Tidak ada artikel ditemukan.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <AnimatePresence mode="wait">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col hover:shadow-xl transition-shadow cursor-pointer"
              >
                <Link href={`/artikel/${article.slug}`}>
                  <div className="relative w-full h-48 overflow-hidden">
                    <motion.img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="p-5 flex flex-col gap-3">
                    <div>
                      <span
                        className="font-noto text-sm font-bold leading-5"
                        style={{ color: getCategoryColor(article.category_rel?.name || article.category) }}
                      >
                        {article.category_rel?.name || article.category}
                      </span>
                    </div>

                    <h3 className="text-[#333] font-newsreader text-xl font-bold leading-[27.5px]">
                      {article.title}
                    </h3>

                    <p className="text-[#4B5563] font-noto text-sm leading-[22.75px]">
                      {article.excerpt}
                    </p>

                    <div className="pt-2 border-t border-[#EAEAEA]">
                      <p className="text-[#6B7280] font-noto text-xs leading-4">
                        {formatDate(article.published_at)} • {article.read_time} menit baca
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

export default ArticleGridSection;
