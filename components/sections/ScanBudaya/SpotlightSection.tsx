'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface SpotlightSectionProps {
  location?: string;
}

// Database budaya terkenal per provinsi
const culturalDatabase: Record<string, Array<{title: string, description: string, image: string}>> = {
  'Jawa Tengah': [
    { title: 'Batik Parang Rusak', description: 'Motif batik eksklusif keraton', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200' },
    { title: 'Candi Borobudur', description: 'Situs warisan dunia UNESCO', image: 'https://images.unsplash.com/photo-1591336095888-a5f62f355a3c?w=200' },
    { title: 'Wayang Kulit Purwa', description: 'Seni pertunjukan tradisional', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200' },
    { title: 'Gamelan Jawa', description: 'Ansambel musik tradisional', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200' },
    { title: 'Keris Luk 13', description: 'Pusaka bersejarah Jawa', image: 'https://images.unsplash.com/photo-1582735689738-75ac2d354f9e?w=200' }
  ],
  'Jawa Barat': [
    { title: 'Angklung', description: 'Alat musik bambu UNESCO', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { title: 'Wayang Golek', description: 'Boneka kayu tradisional Sunda', image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=200' },
    { title: 'Batik Megamendung', description: 'Batik khas Cirebon', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200' },
    { title: 'Kujang', description: 'Senjata tradisional Sunda', image: 'https://images.unsplash.com/photo-1582735689738-75ac2d354f9e?w=200' },
    { title: 'Tari Jaipong', description: 'Tarian pergaulan Sunda', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=200' }
  ],
  'DKI Jakarta': [
    { title: 'Ondel-Ondel', description: 'Boneka raksasa Betawi', image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200' },
    { title: 'Batik Betawi', description: 'Motif batik khas Jakarta', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200' },
    { title: 'Tanjidor', description: 'Musik tradisional Betawi', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200' },
    { title: 'Kerak Telor', description: 'Kuliner warisan Betawi', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200' },
    { title: 'Kebaya Encim', description: 'Pakaian adat Betawi', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200' }
  ],
  'Yogyakarta': [
    { title: 'Batik Kawung', description: 'Motif batik geometris klasik', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200' },
    { title: 'Candi Prambanan', description: 'Kompleks candi Hindu terbesar', image: 'https://images.unsplash.com/photo-1591336095888-a5f62f355a3c?w=200' },
    { title: 'Keris Yogyakarta', description: 'Pusaka keraton Ngayogyakarta', image: 'https://images.unsplash.com/photo-1582735689738-75ac2d354f9e?w=200' },
    { title: 'Tari Bedhaya Ketawang', description: 'Tarian sakral keraton', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=200' },
    { title: 'Gamelan Kyai Kanyut Mesem', description: 'Gamelan pusaka keraton', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200' }
  ],
  'Jawa Timur': [
    { title: 'Reog Ponorogo', description: 'Tarian barongan ikonik', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=200' },
    { title: 'Batik Madura', description: 'Batik warna cerah khas Madura', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200' },
    { title: 'Candi Penataran', description: 'Kompleks candi terbesar Jawa Timur', image: 'https://images.unsplash.com/photo-1591336095888-a5f62f355a3c?w=200' },
    { title: 'Ludruk', description: 'Teater rakyat Surabaya', image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=200' },
    { title: 'Celurit', description: 'Senjata tradisional Madura', image: 'https://images.unsplash.com/photo-1582735689738-75ac2d354f9e?w=200' }
  ],
  'Bali': [
    { title: 'Tari Kecak', description: 'Tarian kolosal Ramayana', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=200' },
    { title: 'Keris Bali', description: 'Keris dengan pamor khas Bali', image: 'https://images.unsplash.com/photo-1582735689738-75ac2d354f9e?w=200' },
    { title: 'Barong', description: 'Topeng singa pelindung', image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200' },
    { title: 'Gamelan Gong Kebyar', description: 'Musik Bali modern dinamis', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200' },
    { title: 'Pura Besakih', description: 'Pura agung ibu seluruh pura', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=200' }
  ],
  'Sumatera Barat': [
    { title: 'Rumah Gadang', description: 'Rumah adat Minangkabau', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200' },
    { title: 'Rendang', description: 'Masakan terbaik dunia UNESCO', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200' },
    { title: 'Tari Piring', description: 'Tarian dengan piring di tangan', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=200' },
    { title: 'Keris Panjang Minang', description: 'Keris khas Minangkabau', image: 'https://images.unsplash.com/photo-1582735689738-75ac2d354f9e?w=200' },
    { title: 'Songket Minang', description: 'Kain tenun sutra emas', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200' }
  ],
  'Sumatera Utara': [
    { title: 'Ulos Batak', description: 'Kain tenun sakral Batak', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200' },
    { title: 'Rumah Bolon', description: 'Rumah adat Batak Toba', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200' },
    { title: 'Gordang Sambilan', description: 'Alat musik Batak 9 gendang', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200' },
    { title: 'Tortor', description: 'Tarian tradisional Batak', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=200' },
    { title: 'Piso Surit', description: 'Senjata tradisional Batak', image: 'https://images.unsplash.com/photo-1582735689738-75ac2d354f9e?w=200' }
  ],
  'Aceh': [
    { title: 'Tari Saman', description: 'Tarian 1000 tangan UNESCO', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=200' },
    { title: 'Rumoh Aceh', description: 'Rumah panggung tradisional', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200' },
    { title: 'Rencong', description: 'Senjata tradisional Aceh', image: 'https://images.unsplash.com/photo-1582735689738-75ac2d354f9e?w=200' },
    { title: 'Rapai', description: 'Alat musik rebana khas Aceh', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200' },
    { title: 'Masjid Raya Baiturrahman', description: 'Masjid bersejarah Aceh', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=200' }
  ],
  'Sulawesi Selatan': [
    { title: 'Tongkonan', description: 'Rumah adat Toraja berukir', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200' },
    { title: 'Badik Bugis', description: 'Senjata khas Bugis Makassar', image: 'https://images.unsplash.com/photo-1582735689738-75ac2d354f9e?w=200' },
    { title: 'Kapal Pinisi', description: 'Kapal layar tradisional Bugis', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200' },
    { title: 'Tari Pakarena', description: 'Tarian klasik Makassar', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=200' },
    { title: 'Rambu Solo', description: 'Upacara pemakaman Toraja', image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200' }
  ]
};

const SpotlightSection = ({ location }: SpotlightSectionProps) => {
  // Extract province from location string (e.g., "Jawa Tengah, Indonesia" -> "Jawa Tengah")
  const extractProvince = (loc?: string) => {
    if (!loc) return 'Jawa Tengah'; // default
    const parts = loc.split(',');
    return parts[0].trim();
  };

  const province = extractProvince(location);
  const allItems = culturalDatabase[province] || culturalDatabase['Jawa Tengah'];
  
  // Get 3 random famous items from the same province
  const items = allItems.slice(0, 3);

  return (
    <motion.section 
      className="w-full"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="rounded-[20px] border border-[#EAEAEA] bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8 space-y-4">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-8 sm:w-[30px] sm:h-9 flex-shrink-0">
            <path d="M15.834 9.5L14.7923 7.20833L12.5007 6.16667L14.7923 5.125L15.834 2.83333L16.8757 5.125L19.1673 6.16667L16.8757 7.20833L15.834 9.5ZM15.834 21.1667L14.7923 18.875L12.5007 17.8333L14.7923 16.7917L15.834 14.5L16.8757 16.7917L19.1673 17.8333L16.8757 18.875L15.834 21.1667ZM7.50065 18.6667L5.41732 14.0833L0.833984 12L5.41732 9.91667L7.50065 5.33333L9.58398 9.91667L14.1673 12L9.58398 14.0833L7.50065 18.6667ZM7.50065 14.625L8.33398 12.8333L10.1257 12L8.33398 11.1667L7.50065 9.375L6.66732 11.1667L4.87565 12L6.66732 12.8333L7.50065 14.625Z" fill="#D4A017"/>
          </svg>
          <div className="flex-1">
            <h3 className="text-lg sm:text-[20px] font-bold leading-7 text-[#1A1A1A]">
              Spotlight Budaya Terdekat
            </h3>
            <p className="text-xs sm:text-sm font-normal leading-5 text-[#666]">
              Temukan budaya lain di {province}
            </p>
          </div>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {items.map((item, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-base font-bold leading-6 text-[#1A1A1A] truncate">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm font-normal leading-5 text-[#666] truncate">
                  {item.description}
                </p>
              </div>
              <motion.svg 
                width="25" 
                height="28" 
                viewBox="0 0 25 28" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-6 sm:w-6 sm:h-7 flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"
                whileHover={{ x: 5 }}
              >
                <path d="M12.5933 14L8.12109 9.52776L9.4822 8.16665L15.3155 14L9.4822 19.8333L8.12109 18.4722L12.5933 14Z" fill="currentColor"/>
              </motion.svg>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SpotlightSection;
