'use client';

import { useState } from 'react';

interface FilterSectionProps {
  viewMode: 'grid' | 'calendar';
  setViewMode: (mode: 'grid' | 'calendar') => void;
}

export default function FilterSection({ viewMode, setViewMode }: FilterSectionProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const FilterButton = ({ 
    label, 
    id 
  }: { 
    label: string; 
    id: string; 
  }) => (
    <button
      onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EAE3D9] rounded-lg text-sm font-medium text-[#192A51] hover:border-[#D4A017] hover:bg-[#FFF9F0] transition-all duration-200"
    >
      <span>{label}</span>
      <svg 
        width="24" 
        height="28" 
        viewBox="0 0 25 28" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={`w-5 h-6 transition-transform duration-200 ${openDropdown === id ? 'rotate-180' : ''}`}
      >
        <path d="M12.01 17.2812L6.17667 11.4479L7.53778 10.0868L12.01 14.559L16.4822 10.0868L17.8433 11.4479L12.01 17.2812Z" fill="#5C6B8A"/>
      </svg>
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
      {/* Filter Buttons */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
        <FilterButton label="Semua Provinsi" id="province" />
        <FilterButton label="Bulan Ini" id="month" />
        <FilterButton label="Kategori" id="category" />
        <FilterButton label="Urutkan: Tanggal Terdekat" id="sort" />
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-0.5 bg-[#F8F5F1] border border-[#EAE3D9] rounded-lg p-1">
        <button
          onClick={() => setViewMode('grid')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
            viewMode === 'grid'
              ? 'bg-white shadow-sm text-[#192A51]'
              : 'text-[#5C6B8A] hover:text-[#192A51]'
          }`}
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-6">
            <path d="M2.5 11.1667V4.5H9.16667V11.1667H2.5ZM2.5 19.5V12.8333H9.16667V19.5H2.5ZM10.8333 11.1667V4.5H17.5V11.1667H10.8333ZM10.8333 19.5V12.8333H17.5V19.5H10.8333ZM4.16667 9.5H7.5V6.16667H4.16667V9.5ZM12.5 9.5H15.8333V6.16667H12.5V9.5ZM12.5 17.8333H15.8333V14.5H12.5V17.8333ZM4.16667 17.8333H7.5V14.5H4.16667V17.8333Z" fill="currentColor"/>
          </svg>
          <span className="text-sm font-medium hidden sm:inline">Grid</span>
        </button>
        <button
          onClick={() => setViewMode('calendar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
            viewMode === 'calendar'
              ? 'bg-white shadow-sm text-[#192A51]'
              : 'text-[#5C6B8A] hover:text-[#192A51]'
          }`}
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-6">
            <path d="M4.16667 20.3335C3.70833 20.3335 3.31597 20.1703 2.98958 19.8439C2.66319 19.5175 2.5 19.1252 2.5 18.6668V7.00016C2.5 6.54183 2.66319 6.14947 2.98958 5.82308C3.31597 5.49669 3.70833 5.33349 4.16667 5.33349H5V3.66683H6.66667V5.33349H13.3333V3.66683H15V5.33349H15.8333C16.2917 5.33349 16.684 5.49669 17.0104 5.82308C17.3368 6.14947 17.5 6.54183 17.5 7.00016V18.6668C17.5 19.1252 17.3368 19.5175 17.0104 19.8439C16.684 20.1703 16.2917 20.3335 15.8333 20.3335H4.16667ZM4.16667 18.6668H15.8333V10.3335H4.16667V18.6668ZM4.16667 8.66683H15.8333V7.00016H4.16667V8.66683Z" fill="currentColor"/>
          </svg>
          <span className="text-sm font-medium hidden sm:inline">Kalender</span>
        </button>
      </div>
    </div>
  );
}
