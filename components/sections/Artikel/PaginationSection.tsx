'use client';

import { useState } from 'react';

const PaginationSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <section className="w-full mb-16 sm:mb-20 lg:mb-24">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          aria-label="Previous page"
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.33301 14L5.33301 10L9.33301 6L10.2663 6.93333L7.19967 10L10.2663 13.0667L9.33301 14Z" fill="#333333"/>
          </svg>
        </button>

        <button
          onClick={() => setCurrentPage(1)}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-noto text-sm font-bold leading-5 transition-colors ${
            currentPage === 1
              ? 'bg-[#C1A36F] text-white'
              : 'bg-white text-[#333] hover:bg-gray-100'
          }`}
        >
          1
        </button>

        <button
          onClick={() => setCurrentPage(2)}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-noto text-sm font-bold leading-5 transition-colors ${
            currentPage === 2
              ? 'bg-[#C1A36F] text-white'
              : 'bg-white text-[#333] hover:bg-gray-100'
          }`}
        >
          2
        </button>

        <button
          onClick={() => setCurrentPage(3)}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-noto text-sm font-bold leading-5 transition-colors ${
            currentPage === 3
              ? 'bg-[#C1A36F] text-white'
              : 'bg-white text-[#333] hover:bg-gray-100'
          }`}
        >
          3
        </button>

        <span className="text-[#6B7280] font-noto text-base px-2">
          ...
        </span>

        <button
          onClick={() => setCurrentPage(10)}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-noto text-sm font-bold leading-5 transition-colors ${
            currentPage === 10
              ? 'bg-[#C1A36F] text-white'
              : 'bg-white text-[#333] hover:bg-gray-100'
          }`}
        >
          10
        </button>

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          aria-label="Next page"
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39967 10L5.33301 6.93333L6.26634 6L10.2663 10L6.26634 14L5.33301 13.0667L8.39967 10Z" fill="#333333"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default PaginationSection;
