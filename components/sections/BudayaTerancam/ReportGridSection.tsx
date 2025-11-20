'use client';

import { useState } from 'react';
import ReportCard from './ReportCard';

const mockReports = [
  {
    id: 1,
    title: 'Tari Topeng Cirebon',
    image: 'https://images.unsplash.com/photo-1555992336-fb0d29aadb0e?w=800&h=450&fit=crop',
    status: 'review',
    threat: 'Kurangnya Regenerasi',
    location: 'Cirebon, Jawa Barat',
    date: '15 Okt 2023',
  },
  {
    id: 2,
    title: 'Wayang Kulit',
    image: 'https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?w=800&h=450&fit=crop',
    status: 'verified',
    threat: 'Modernisasi',
    location: 'Yogyakarta, DI Yogyakarta',
    date: '12 Okt 2023',
  },
  {
    id: 3,
    title: 'Gamelan Jawa',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=450&fit=crop',
    status: 'rejected',
    threat: 'Minimnya Minat Generasi Muda',
    location: 'Surakarta, Jawa Tengah',
    date: '10 Okt 2023',
  },
  {
    id: 4,
    title: 'Tenun Sasambo',
    image: 'https://images.unsplash.com/photo-1601924638867-1a8708fc0610?w=800&h=450&fit=crop',
    status: 'new',
    threat: 'Kelangkaan Bahan Baku',
    location: 'Lombok, NTB',
    date: '25 Okt 2023',
  },
  {
    id: 5,
    title: 'Reog Ponorogo',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop',
    status: 'review',
    threat: 'Klaim oleh Negara Lain',
    location: 'Ponorogo, Jawa Timur',
    date: '05 Nov 2023',
  },
  {
    id: 6,
    title: 'Batik Tulis',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=450&fit=crop',
    status: 'verified',
    threat: 'Dominasi Batik Cetak',
    location: 'Pekalongan, Jawa Tengah',
    date: '28 Sep 2023',
  },
];

const ReportGridSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const renderPageNumbers = () => {
    const pages = [];
    
    pages.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold leading-5 transition-colors ${
          currentPage === 1
            ? 'bg-[rgba(212,155,22,0.2)] text-primary-gold'
            : 'text-[rgba(26,26,26,0.6)] hover:bg-gray-100'
        }`}
      >
        1
      </button>
    );

    if (currentPage > 1 && currentPage <= 3) {
      pages.push(
        <button
          key={2}
          onClick={() => setCurrentPage(2)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium leading-5 transition-colors ${
            currentPage === 2
              ? 'bg-[rgba(212,155,22,0.2)] text-primary-gold'
              : 'text-[rgba(26,26,26,0.6)] hover:bg-gray-100'
          }`}
        >
          2
        </button>
      );
      pages.push(
        <button
          key={3}
          onClick={() => setCurrentPage(3)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium leading-5 transition-colors ${
            currentPage === 3
              ? 'bg-[rgba(212,155,22,0.2)] text-primary-gold'
              : 'text-[rgba(26,26,26,0.6)] hover:bg-gray-100'
          }`}
        >
          3
        </button>
      );
    }

    if (currentPage > 3) {
      pages.push(
        <span key="ellipsis1" className="text-[rgba(26,26,26,0.6)] text-base font-normal leading-6">
          ...
        </span>
      );
    }

    if (currentPage > 3 && currentPage < totalPages) {
      pages.push(
        <button
          key={currentPage}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[rgba(212,155,22,0.2)] text-primary-gold text-sm font-bold leading-5"
        >
          {currentPage}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="ellipsis2" className="text-[rgba(26,26,26,0.6)] text-base font-normal leading-6">
          ...
        </span>
      );
    }

    pages.push(
      <button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium leading-5 transition-colors ${
          currentPage === totalPages
            ? 'bg-[rgba(212,155,22,0.2)] text-primary-gold'
            : 'text-[rgba(26,26,26,0.6)] hover:bg-gray-100'
        }`}
      >
        {totalPages}
      </button>
    );

    return pages;
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {mockReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>

        <div className="flex items-center justify-center pt-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6667 17L6.66669 12L11.6667 7L12.8334 8.16667L9.00002 12L12.8334 15.8333L11.6667 17Z" fill="#1A1A1A" fillOpacity="0.6"/>
              </svg>
            </button>

            {renderPageNumbers()}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 12L6.66669 8.16667L7.83335 7L12.8334 12L7.83335 17L6.66669 15.8333L10.5 12Z" fill="#1A1A1A" fillOpacity="0.6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportGridSection;
