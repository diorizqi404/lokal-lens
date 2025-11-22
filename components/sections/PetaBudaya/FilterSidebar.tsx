'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedProvince: string;
  setSelectedProvince: (value: string) => void;
  selectedRarity: string;
  setSelectedRarity: (value: string) => void;
  onApplyFilter: () => void;
  onResetFilter: () => void;
}

const INDONESIAN_PROVINCES = [
  'Aceh',
  'Sumatera Utara',
  'Sumatera Barat',
  'Riau',
  'Kepulauan Riau',
  'Jambi',
  'Sumatera Selatan',
  'Kepulauan Bangka Belitung',
  'Bengkulu',
  'Lampung',
  'Banten',
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'DI Yogyakarta',
  'Jawa Timur',
  'Bali',
  'Nusa Tenggara Barat',
  'Nusa Tenggara Timur',
  'Kalimantan Barat',
  'Kalimantan Tengah',
  'Kalimantan Selatan',
  'Kalimantan Timur',
  'Kalimantan Utara',
  'Sulawesi Utara',
  'Gorontalo',
  'Sulawesi Tengah',
  'Sulawesi Barat',
  'Sulawesi Selatan',
  'Sulawesi Tenggara',
  'Maluku',
  'Maluku Utara',
  'Papua Barat',
  'Papua Barat Daya',
  'Papua',
  'Papua Tengah',
  'Papua Pegunungan',
  'Papua Selatan',
];

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedProvince,
  setSelectedProvince,
  selectedRarity,
  setSelectedRarity,
  onApplyFilter,
  onResetFilter,
}: FilterSidebarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?type=culture');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <motion.aside 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full lg:w-[352px] flex-shrink-0"
    >
      <div className="rounded-[32px] bg-[#E8C547] shadow-sm p-6">
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-0"
          >
            <h2 className="text-lg font-bold leading-[27px] text-[#333333] mb-0">
              Filter Peta
            </h2>
            <p className="text-sm font-normal leading-[21px] text-[#000000]">
              Saring berdasarkan preferensi Anda
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-0">
              <label className="text-sm font-medium leading-[21px] text-[#333333] pb-2">
                Kategori
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-[42px] px-3 py-2 rounded-[32px] border border-[#1B2A41] bg-[#E8C547] text-base font-normal leading-6 text-[#333333] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B2A41]"
                  disabled={loadingCategories}
                >
                  <option value="Semua Kategori">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.2002 9.60001L12.0002 14.4L16.8002 9.60001" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-0">
              <label className="text-sm font-medium leading-[21px] text-[#333333] pb-2">
                Provinsi
              </label>
              <div className="relative">
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full h-[42px] px-3 py-2 rounded-[32px] border border-[#1B2A41] bg-[#E8C547] text-base font-normal leading-6 text-[#333333] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B2A41]"
                >
                  <option value="Seluruh Indonesia">Seluruh Indonesia</option>
                  {INDONESIAN_PROVINCES.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.2002 9.60001L12.0002 14.4L16.8002 9.60001" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-0">
              <label className="text-sm font-medium leading-[21px] text-[#333333] pb-2">
                Tingkat Kelangkaan
              </label>
              <div className="relative">
                <select
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="w-full h-[42px] px-3 py-2 rounded-[32px] border border-[#1B2A41] bg-[#E8C547] text-base font-normal leading-6 text-[#333333] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B2A41]"
                >
                  <option value="Semua Tingkat">Semua Tingkat</option>
                  <option value="Umum">Umum</option>
                  <option value="Langka">Langka</option>
                  <option value="Sangat Langka">Sangat Langka</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.2002 9.59998L12.0002 14.4L16.8002 9.59998" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col gap-2 pt-4 border-t border-[#F0F2F5]"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onApplyFilter}
              className="w-full h-11 px-4 rounded-full bg-[#004E89] hover:bg-[#003d6d] transition-colors"
            >
              <span className="text-sm font-bold leading-[21px] tracking-[0.21px] text-[#E8C547]">
                Terapkan Filter
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onResetFilter}
              className="w-full h-11 px-4 rounded-full bg-[#F0F2F5] hover:bg-[#E5E7EB] transition-colors"
            >
              <span className="text-sm font-bold leading-[21px] tracking-[0.21px] text-[#333333]">
                Reset
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
};

export default FilterSidebar;
