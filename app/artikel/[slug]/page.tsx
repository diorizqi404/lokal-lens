import Image from 'next/image';
import ArticleContent from '@/components/sections/Artikel/ArticleContent';
import ArticleDiscussion from '@/components/sections/Artikel/ArticleDiscussion';
import RelatedArticles from '@/components/sections/Artikel/RelatedArticles';

export default function ArticleDetailPage() {
  return (
    <div className="w-full bg-white">
      <ArticleContent />
      <ArticleDiscussion />
      <RelatedArticles />
    </div>
  );
}
