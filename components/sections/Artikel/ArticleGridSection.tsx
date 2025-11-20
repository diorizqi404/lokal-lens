'use client';

const articles = [
  {
    id: 1,
    category: 'Cerita Budaya',
    categoryColor: '#4DB6AC',
    title: 'Filosofi di Balik Setiap Corak Tenun Ikat Sumba',
    description: 'Setiap helai benang dan motifnya menyimpan cerita leluhur, status sosial, dan harapan bagi pemakainya.',
    date: '12 Mei 2024',
    readTime: '7 menit baca',
    image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85f7?w=800&q=80',
  },
  {
    id: 2,
    category: 'Tokoh Inspiratif',
    categoryColor: '#E57373',
    title: 'Didik Nini Thowok: Maestro Tari Lintas Gender',
    description: 'Perjalanan hidup sang maestro yang mendedikasikan hidupnya untuk melestarikan dan merevolusi seni tari tradisional Indonesia.',
    date: '10 Mei 2024',
    readTime: '9 menit baca',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
  },
  {
    id: 3,
    category: 'Upaya UNESCO',
    categoryColor: '#C1A36F',
    title: 'Gamelan dan Pantun: Pengakuan UNESCO untuk Indonesia',
    description: 'Bagaimana pengakuan dunia internasional melalui UNESCO membantu upaya pelestarian budaya takbenda di tanah air.',
    date: '8 Mei 2024',
    readTime: '6 menit baca',
    image: 'https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=800&q=80',
  },
  {
    id: 4,
    category: 'Event Nasional',
    categoryColor: '#4DB6AC',
    title: 'Jember Fashion Carnaval: Panggung Budaya Kelas Dunia',
    description: 'Melihat lebih dekat kemegahan salah satu festival kostum terbesar di dunia yang berakar dari budaya lokal.',
    date: '5 Mei 2024',
    readTime: '5 menit baca',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
  },
  {
    id: 5,
    category: 'Cerita Budaya',
    categoryColor: '#E57373',
    title: 'Perjalanan Sehelai Kain Batik: Dari Lilin Hingga Warisan',
    description: 'Menelusuri proses panjang dan penuh kesabaran di balik mahakarya batik tulis yang melegenda.',
    date: '2 Mei 2024',
    readTime: '8 menit baca',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
  },
  {
    id: 6,
    category: 'Tokoh Inspiratif',
    categoryColor: '#C1A36F',
    title: 'Ibu Iravati M. Sudiarso: Penjaga Resep Nusantara',
    description: 'Kisah seorang ahli gastronomi yang mendedikasikan hidupnya untuk mendokumentasikan dan melestarikan kuliner warisan bangsa.',
    date: '28 April 2024',
    readTime: '10 menit baca',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
  },
];

const ArticleGridSection = () => {
  return (
    <section className="w-full mb-12 sm:mb-16 lg:mb-20">
      <div className="mb-6 sm:mb-8 px-4">
        <h2 className="text-[#333] font-newsreader text-2xl sm:text-3xl font-bold leading-[37.5px] tracking-[-0.45px]">
          Jelajahi Semua Cerita
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <span
                  className="font-noto text-sm font-bold leading-5"
                  style={{ color: article.categoryColor }}
                >
                  {article.category}
                </span>
              </div>

              <h3 className="text-[#333] font-newsreader text-xl font-bold leading-[27.5px]">
                {article.title}
              </h3>

              <p className="text-[#4B5563] font-noto text-sm leading-[22.75px]">
                {article.description}
              </p>

              <div className="pt-2 border-t border-[#EAEAEA]">
                <p className="text-[#6B7280] font-noto text-xs leading-4">
                  {article.date} • {article.readTime}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ArticleGridSection;
