'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    full_name: string;
  };
}

interface RelatedArticlesProps {
  articles: Article[];
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

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-12 md:py-16 border-t border-gray-100">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[#333] font-newsreader text-2xl sm:text-3xl font-bold mb-8"
        >
          Artikel Terkait
        </motion.h2>

        {/* Articles Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -8 }}
              className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer"
            >
              <Link href={`/artikel/${article.slug}`}>
                {/* Article Image */}
                <div className="w-full aspect-[16/9] relative overflow-hidden bg-gray-200">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Article Content */}
                <div className="p-5 flex flex-col gap-3">
                  {/* Category */}
                  <span
                    className="text-sm font-bold leading-5 font-[family-name:var(--font-noto-sans)]"
                    style={{ color: getCategoryColor(article.category) }}
                  >
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-[#333] font-[family-name:var(--font-newsreader)] text-xl font-bold leading-[27.5px]">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#4B5563] font-[family-name:var(--font-noto-sans)] text-sm leading-[22.75px]">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="pt-2 border-t border-[#EAEAEA]">
                    <span className="text-[#6B7280] font-[family-name:var(--font-noto-sans)] text-xs leading-4">
                      {formatDate(article.published_at)} • {article.read_time} menit baca
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
