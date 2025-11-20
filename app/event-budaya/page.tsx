'use client';

import { useState } from 'react';
import EventCard from '@/components/sections/EventBudaya/EventCard';
import SearchBar from '@/components/sections/EventBudaya/SearchBar';
import FilterSection from '@/components/sections/EventBudaya/FilterSection';
import Pagination from '@/components/sections/EventBudaya/Pagination';

export default function EventBudayaPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');

  const events = [
    {
      id: 1,
      title: 'Festival Jazz Internasional',
      date: '15 - 17 Agustus 2024',
      location: 'Jakarta, DKI Jakarta',
      price: 'Rp 250.000',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60',
      status: 'TERSEDIA',
      statusColor: 'red',
    },
    {
      id: 2,
      title: 'Pekan Kesenian Bali',
      date: '20 September 2024',
      location: 'Denpasar, Bali',
      price: null,
      image: 'https://images.unsplash.com/photo-1555400082-8a2583bf4a1f?w=800&auto=format&fit=crop&q=60',
      status: 'GRATIS',
      statusColor: 'green',
    },
    {
      id: 3,
      title: 'Pagelaran Wayang Kulit Semalam Suntuk',
      date: '05 Oktober 2024',
      location: 'Yogyakarta, DI Yogyakarta',
      price: null,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=60',
      status: 'HABIS',
      statusColor: 'gray',
    },
    {
      id: 4,
      title: 'Pameran Batik Nusantara',
      date: '10 - 20 November 2024',
      location: 'Surakarta, Jawa Tengah',
      price: 'Rp 50.000',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=60',
      status: 'TERSEDIA',
      statusColor: 'red',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] lg:h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[rgba(25,42,81,0.5)] to-[rgba(25,42,81,0.8)]"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(25, 42, 81, 0.50) 0%, rgba(25, 42, 81, 0.80) 100%), url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">
                Kalender Budaya Nusantara
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed px-4 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200">
                Jelajahi dan ikuti beragam festival, pameran, dan acara budaya yang
                mempesona di seluruh penjuru Indonesia.
              </p>
            </div>
            <button className="px-8 sm:px-10 py-3 sm:py-4 bg-[#D4A017] hover:bg-[#B8860B] text-white font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300">
              Lihat Acara Unggulan
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <SearchBar />
        <FilterSection viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {/* Events Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'backwards',
              }}
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 sm:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
          <Pagination currentPage={1} totalPages={8} />
        </div>
      </section>
    </div>
  );
}
