import Image from 'next/image';

interface Article {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
}

const relatedArticles: Article[] = [
  {
    id: 1,
    category: 'Tokoh Inspiratif',
    categoryColor: '#E57373',
    title: 'Didik Nini Thowok: Maestro Tari Lintas Gender',
    description: 'Perjalanan hidup sang maestro yang mendedikasikan hidupnya untuk seni tari.',
    date: '10 Mei 2024',
    readTime: '9 menit baca',
    image: '/assets/img/related1.png'
  },
  {
    id: 2,
    category: 'Upaya UNESCO',
    categoryColor: '#C1A36F',
    title: 'Gamelan dan Pantun: Pengakuan UNESCO untuk Indonesia',
    description: 'Bagaimana pengakuan dunia membantu pelestarian budaya takbenda.',
    date: '8 Mei 2024',
    readTime: '6 menit baca',
    image: '/assets/img/related1.png'
  },
  {
    id: 3,
    category: 'Cerita Budaya',
    categoryColor: '#E57373',
    title: 'Perjalanan Sehelai Kain Batik: Dari Lilin Hingga Warisan',
    description: 'Menelusuri proses panjang di balik mahakarya batik tulis yang melegenda.',
    date: '2 Mei 2024',
    readTime: '8 menit baca',
    image: '/assets/img/related1.png'
  }
];

export default function RelatedArticles() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {relatedArticles.map((article) => (
            <article
              key={article.id}
              className="flex flex-col bg-[#F8F5F2] rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer"
            >
              {/* Article Image */}
              <div className="w-full aspect-[16/9] relative overflow-hidden bg-gray-200">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Article Content */}
              <div className="p-5 flex flex-col gap-3">
                {/* Category */}
                <span
                  className="text-sm font-bold leading-5 font-[family-name:var(--font-noto-sans)]"
                  style={{ color: article.categoryColor }}
                >
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="text-[#333] font-[family-name:var(--font-newsreader)] text-xl font-bold leading-[27.5px]">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-[#4B5563] font-[family-name:var(--font-noto-sans)] text-sm leading-[22.75px]">
                  {article.description}
                </p>

                {/* Meta */}
                <div className="pt-2 border-t border-[#EAEAEA]">
                  <span className="text-[#6B7280] font-[family-name:var(--font-noto-sans)] text-xs leading-4">
                    {article.date} • {article.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
