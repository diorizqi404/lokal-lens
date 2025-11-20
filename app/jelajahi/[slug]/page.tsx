'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CultureDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://api.builder.io/api/v1/image/assets/TEMP/a750e1f8453b7fb698de9eddf3667a4dfb1f7650?width=1152',
    'https://api.builder.io/api/v1/image/assets/TEMP/016fb59542d6055f393b02658e12af7f9fef5701?width=270',
    'https://api.builder.io/api/v1/image/assets/TEMP/0df7cc7a6183b86345dea87c8a95f4178b3b7e5c?width=270',
    'https://api.builder.io/api/v1/image/assets/TEMP/aa87aa1621225f84daa70ceb0b620aad969e462a?width=270',
    'https://api.builder.io/api/v1/image/assets/TEMP/92153ce373cfcafd48d08679f9e12cbfc054d677?width=270',
  ];

  const similarCultures = [
    {
      title: 'Ketoprak Dor',
      location: 'Jombang, Jawa Timur',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/f20bc18a8250eb3bc60d4b53327d1a942183e028?width=572',
    },
    {
      title: 'Karapan Sapi',
      location: 'Madura, Jawa Timur',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/07f0e879664c8fe3a6e8ce94f97ad77ac6d47a8c?width=572',
    },
    {
      title: 'Jaranan Buto',
      location: 'Banyuwangi, Jawa Timur',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/bea37b729d9810764ed84e34b90c29527a336c9a?width=572',
    },
    {
      title: 'Larung Sembonyo',
      location: 'Trenggalek, Jawa Timur',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/cd86de0ab4b96a7a07db1f395b148d5b0a38ca9e?width=572',
    },
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-medium leading-[21px] mb-6 sm:mb-8 lg:mb-12 flex-wrap">
          <Link href="/" className="text-[#495057] hover:text-[#212529] transition-colors">
            Home
          </Link>
          <span className="text-[#495057]">/</span>
          <Link href="/jelajahi" className="text-[#495057] hover:text-[#212529] transition-colors">
            Jelajah Budaya
          </Link>
          <span className="text-[#495057]">/</span>
          <span className="text-[#212529]">Budaya Reog Ponorogo</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column - Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] w-full rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt="Reog Ponorogo"
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  onClick={handlePrevImage}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Previous image"
                >
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9544 19.8333L8.12109 14L13.9544 8.16665L15.3155 9.52776L10.8433 14L15.3155 18.4722L13.9544 19.8333Z" fill="white"/>
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Next image"
                >
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5933 14L8.12109 9.52776L9.4822 8.16665L15.3155 14L9.4822 19.8333L8.12109 18.4722L12.5933 14Z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {images.slice(1).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index + 1)}
                  className={`aspect-square rounded-lg overflow-hidden transition-all ${
                    currentImageIndex === index + 1
                      ? 'ring-2 ring-[#FF7A00] opacity-100'
                      : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Title Section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight sm:leading-[48px] tracking-[-2.4px] text-[#212529]">
                Reog Ponorogo
              </h1>
              <p className="text-base sm:text-lg font-normal leading-7 text-[#495057]">
                Tarian Mistis dari Gerbang Timur Jawa
              </p>
            </div>

            {/* Info Card */}
            <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-lg bg-[#FFEACD]">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="pt-0.5">
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0102 14C12.5449 14 13.0027 13.8096 13.3835 13.4288C13.7643 13.048 13.9546 12.5903 13.9546 12.0556C13.9546 11.5208 13.7643 11.0631 13.3835 10.6823C13.0027 10.3015 12.5449 10.1111 12.0102 10.1111C11.4755 10.1111 11.0177 10.3015 10.6369 10.6823C10.2561 11.0631 10.0658 11.5208 10.0658 12.0556C10.0658 12.5903 10.2561 13.048 10.6369 13.4288C11.0177 13.8096 11.4755 14 12.0102 14ZM12.0102 21.1458C13.9871 19.331 15.4535 17.6823 16.4095 16.1997C17.3655 14.717 17.8435 13.4005 17.8435 12.25C17.8435 10.4838 17.2805 9.03762 16.1543 7.91146C15.0281 6.78531 13.6468 6.22223 12.0102 6.22223C10.3736 6.22223 8.99226 6.78531 7.8661 7.91146C6.73995 9.03762 6.17687 10.4838 6.17687 12.25C6.17687 13.4005 6.65488 14.717 7.61089 16.1997C8.56691 17.6823 10.0333 19.331 12.0102 21.1458ZM12.0102 23.7222C9.4014 21.5023 7.45291 19.4404 6.16471 17.5365C4.87652 15.6325 4.23242 13.8704 4.23242 12.25C4.23242 9.81945 5.01425 7.88311 6.57791 6.44098C8.14157 4.99885 9.95233 4.27778 12.0102 4.27778C14.0681 4.27778 15.8788 4.99885 17.4425 6.44098C19.0061 7.88311 19.788 9.81945 19.788 12.25C19.788 13.8704 19.1439 15.6325 17.8557 17.5365C16.5675 19.4404 14.619 21.5023 12.0102 23.7222Z" fill="#FF7A00"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-normal leading-5 text-[#495057]">Lokasi</span>
                  <span className="text-base font-semibold leading-6 text-[#212529]">Ponorogo, Jawa Timur</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-4">
                <div className="pt-0.5">
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.31543 22.75L12.0099 4.27778L22.7043 22.75H1.31543ZM4.6696 20.8056H19.3502L12.0099 8.16667L4.6696 20.8056ZM12.0099 19.8333C12.2853 19.8333 12.5162 19.7402 12.7026 19.5538C12.8889 19.3675 12.9821 19.1366 12.9821 18.8611C12.9821 18.5856 12.8889 18.3547 12.7026 18.1684C12.5162 17.9821 12.2853 17.8889 12.0099 17.8889C11.7344 17.8889 11.5035 17.9821 11.3172 18.1684C11.1308 18.3547 11.0377 18.5856 11.0377 18.8611C11.0377 19.1366 11.1308 19.3675 11.3172 19.5538C11.5035 19.7402 11.7344 19.8333 12.0099 19.8333ZM11.0377 16.9167H12.9821V12.0556H11.0377V16.9167Z" fill="#EF4444"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-normal leading-5 text-[#495057]">Status</span>
                  <span className="text-base font-semibold leading-6 text-[#DC2626]">Terancam Punah</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4">
              <p className="text-base font-normal leading-6 text-[#212529]">
                Reog adalah salah satu kesenian budaya yang berasal dari Jawa Timur bagian barat-laut dan Ponorogo dianggap sebagai kota asal Reog yang sebenarnya. Gerbang kota Ponorogo dihiasi oleh sosok warok dan gemblak, dua sosok yang ikut tampil pada saat Reog dipertunjukkan.
              </p>
              
              <p className="text-base font-normal leading-6 text-[#212529]">
                Reog adalah salah satu budaya daerah di Indonesia yang masih sangat kental dengan hal-hal yang berbau mistis dan ilmu kebatinan yang kuat. Sejarahnya dimulai pada zaman Kerajaan Majapahit, di mana Ki Ageng Kutu, seorang abdi kerajaan, menciptakan tarian ini sebagai sindiran kepada Raja Kertabhumi.
              </p>

              <h3 className="text-base font-normal leading-6 text-[#212529] mt-2">
                Makna dan Filosofi
              </h3>

              <p className="text-base font-normal leading-6 text-[#212529]">
                Tarian ini menggambarkan singa barong, raja hutan, yang menjadi simbol bagi Kertabhumi, dan di atasnya bertengger bulu merak hingga menyerupai kipas raksasa yang menyimbolkan pengaruh kuat para rekannya dari kerajaan Tiongkok. Kesenian ini merupakan wujud kritik terhadap penguasa yang tunduk pada kehendak asing.
              </p>
            </div>

            {/* Map Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-bold leading-8 text-[#212529]">
                Peta Lokasi
              </h3>
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/1ed380ee92c552f8cddd5f79f48be9f001517349?width=1152"
                  alt="Map of Ponorogo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cultures Section */}
        <section className="mt-12 sm:mt-16 lg:mt-20">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold leading-9 text-[#212529]">
              Similar Cultures Nearby
            </h2>
            <Link
              href="/jelajahi"
              className="text-sm font-semibold leading-5 text-[#FF7A00] hover:text-[#E66D00] transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {similarCultures.map((culture, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="aspect-[286/214.5] w-full rounded-lg overflow-hidden">
                  <img
                    src={culture.image}
                    alt={culture.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold leading-7 text-[#212529]">
                    {culture.title}
                  </h4>
                  <p className="text-sm font-normal leading-5 text-[#495057]">
                    {culture.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
