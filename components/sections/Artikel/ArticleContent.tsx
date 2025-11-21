'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ArticleContentProps {
  article: {
    title: string;
    category: string;
    content: string;
    featured_image: string;
    read_time: number;
    published_at: string;
    author: {
      full_name: string;
    };
  };
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
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[896px] mx-auto px-4 py-8 md:py-12 lg:py-16"
    >
      {/* Header */}
      <header className="flex flex-col items-start gap-4 mb-12">
        {/* Category */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full text-center"
        >
          <span 
            className="text-sm font-bold leading-5 font-[family-name:var(--font-noto-sans)]"
            style={{ color: getCategoryColor(article.category) }}
          >
            {article.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full text-center text-[#333] font-[family-name:var(--font-newsreader)] text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-extrabold leading-tight lg:leading-[60px] tracking-[-3px]"
        >
          {article.title}
        </motion.h1>

        {/* Meta Information */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full flex flex-wrap justify-center items-center gap-4 pt-2"
        >
          <span className="text-sm leading-5 text-[#4B5563] font-[family-name:var(--font-noto-sans)]">
            Oleh: {article.author.full_name}
          </span>
          <span className="text-sm leading-5 text-[#9CA3AF] font-[family-name:var(--font-noto-sans)]">
            |
          </span>
          <span className="text-sm leading-5 text-[#4B5563] font-[family-name:var(--font-noto-sans)]">
            {formatDate(article.published_at)}
          </span>
          <span className="text-sm leading-5 text-[#9CA3AF] font-[family-name:var(--font-noto-sans)]">
            |
          </span>
          <span className="text-sm leading-5 text-[#4B5563] font-[family-name:var(--font-noto-sans)]">
            {article.read_time} menit baca
          </span>
        </motion.div>
      </header>

      {/* Article Body */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col gap-8"
      >
        {/* Main Image */}
        <motion.figure 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full flex flex-col gap-2"
        >
          <div className="w-full aspect-[36/25] relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.figure>

        {/* Content - Render HTML */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </motion.div>
    </motion.article>
  );
}
