'use client';

interface CulturalItem {
  id: number;
  title: string;
  category: string;
  image: string;
  size: 'large' | 'medium' | 'small';
}

const culturalItems: CulturalItem[] = [
  {
    id: 1,
    title: 'Tari Saman',
    category: 'Tari',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/d023c05aaec49676a56ac51af44816d760b48526?width=1192',
    size: 'large',
  },
  {
    id: 2,
    title: 'Filosofi Batik Parang',
    category: 'Kerajinan',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/f3c86926d6d635c80aaf60800abeaffc6c7ee436?width=572',
    size: 'medium',
  },
  {
    id: 3,
    title: 'Keunikan Rumah Gadang',
    category: 'Arsitektur',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/8de5ebbcc6e3c560ecb29092a0a500775e96d739?width=572',
    size: 'medium',
  },
  {
    id: 4,
    title: 'Ritual Rambu Solo\'',
    category: 'Ritual',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/7ebf60a35517624afdb24983ee921752113c3b49?width=572',
    size: 'medium',
  },
  {
    id: 5,
    title: 'Resep Asli Rendang',
    category: 'Kuliner',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/84090140eb5bbb566e252bedf994a2acc7a45c42?width=572',
    size: 'medium',
  },
  {
    id: 6,
    title: 'Gamelan Jawa',
    category: 'Musik',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/f938b1ce6457e52788358b197dfc529d2073f694?width=572',
    size: 'small',
  },
  {
    id: 7,
    title: 'Upacara Ngaben di Bali',
    category: 'Ritual',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/89fd0c616284ae975ecd38672781fb144b1a11b2?width=572',
    size: 'small',
  },
  {
    id: 8,
    title: 'Arsitektur Candi Borobudur',
    category: 'Arsitektur',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/35dbd7f3933ec7452a51ae8fab8772521e127435?width=1192',
    size: 'large',
  },
];

const CulturalGridSection = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
          {culturalItems.map((item, index) => {
            let gridClass = '';
            let heightClass = '';

            if (index === 0) {
              gridClass = 'lg:col-span-6 lg:row-span-2';
              heightClass = 'h-[300px] sm:h-[400px] lg:h-[787px]';
            } else if (index === 1 || index === 2) {
              gridClass = 'lg:col-span-3';
              heightClass = 'h-[300px] sm:h-[350px] lg:h-[381px]';
            } else if (index === 3 || index === 4) {
              gridClass = 'lg:col-span-3';
              heightClass = 'h-[300px] sm:h-[350px] lg:h-[381px]';
            } else if (index === 5 || index === 6) {
              gridClass = 'lg:col-span-3';
              heightClass = 'h-[300px] sm:h-[350px] lg:h-[381px]';
            } else if (index === 7) {
              gridClass = 'sm:col-span-2 lg:col-span-6';
              heightClass = 'h-[300px] sm:h-[350px] lg:h-[381px]';
            }

            return (
              <a
                key={item.id}
                href="#"
                className={`${gridClass} ${heightClass} group relative overflow-hidden rounded-3xl cursor-pointer transition-transform hover:scale-[1.02]`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="mb-1 sm:mb-2">
                    <span className="text-xs font-semibold leading-4 tracking-[1.2px] uppercase text-[#E2725B]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold leading-6 sm:leading-[25px] text-white">
                    {item.title}
                  </h3>
                </div>
              </a>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#F5F5DC] hover:bg-[#ebe9d0] transition-colors">
            <span className="text-sm sm:text-base font-bold leading-6 tracking-[0.4px] text-[#111218]">
              Muat Lebih Banyak
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CulturalGridSection;
