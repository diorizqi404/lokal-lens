'use client';

import { useState } from 'react';

const categories = [
  { id: 'semua', label: 'Semua' },
  { id: 'tari', label: 'Tari' },
  { id: 'musik', label: 'Musik' },
  { id: 'kuliner', label: 'Kuliner' },
  { id: 'pakaian', label: 'Pakaian' },
  { id: 'tradisi', label: 'Tradisi' },
  { id: 'arsitektur', label: 'Arsitektur' },
  { id: 'ritual', label: 'Ritual' },
  { id: 'kerajinan', label: 'Kerajinan' },
];

const HeroSection = () => {
  const [activeCategory, setActiveCategory] = useState('semua');

  return (
    <section className="w-full bg-white pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-extrabold leading-tight tracking-[-3px] text-[#111218] mb-4 sm:mb-6 max-w-4xl">
            Jelajahi Kekayaan Budaya
            Indonesia
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-normal leading-7 text-[#616889] max-w-2xl">
            Temukan keragaman budaya yang luar biasa dari seluruh nusantara, dari tarian
            tradisional hingga kuliner yang melegenda.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium sm:font-bold leading-5 transition-all whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-[#E2725B] text-white shadow-md'
                  : 'bg-[#F5F5DC] text-[#111218] hover:bg-[#ebe9d0]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
