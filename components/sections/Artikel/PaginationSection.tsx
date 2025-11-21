'use client';

import { useState, useEffect } from 'react';

interface PaginationSectionProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationSection = ({ currentPage, onPageChange }: PaginationSectionProps) => {
  const [totalPages, setTotalPages] = useState(1);

  // Get totalPages from ArticleGridSection via window
  useEffect(() => {
    const checkTotalPages = () => {
      if (typeof window !== 'undefined' && (window as any).__articleTotalPages) {
        setTotalPages((window as any).__articleTotalPages);
      }
    };

    checkTotalPages();
    const interval = setInterval(checkTotalPages, 100);

    return () => clearInterval(interval);
  }, [currentPage]);

  // Don't show pagination if only 1 page
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 5) {
      // Show all pages if 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <section className="w-full mb-16 sm:mb-20 lg:mb-24">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          aria-label="Previous page"
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.33301 14L5.33301 10L9.33301 6L10.2663 6.93333L7.19967 10L10.2663 13.0667L9.33301 14Z" fill="#333333"/>
          </svg>
        </button>

        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === '...') {
            return (
              <span key={`ellipsis-${index}`} className="text-[#6B7280] font-noto text-base px-2">
                ...
              </span>
            );
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum as number)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-noto text-sm font-bold leading-5 transition-colors ${
                currentPage === pageNum
                  ? 'bg-[#C1A36F] text-white'
                  : 'bg-white text-[#333] hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
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
