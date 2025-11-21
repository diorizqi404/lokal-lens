'use client';

import { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import MapView from './MapView';

const MapSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori');
  const [selectedProvince, setSelectedProvince] = useState<string>('Seluruh Indonesia');
  const [selectedRarity, setSelectedRarity] = useState<string>('Semua Tingkat');

  const handleApplyFilter = () => {
    console.log('Filters applied:', { selectedCategory, selectedProvince, selectedRarity });
  };

  const handleResetFilter = () => {
    setSelectedCategory('Semua Kategori');
    setSelectedProvince('Seluruh Indonesia');
    setSelectedRarity('Semua Tingkat');
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            selectedRarity={selectedRarity}
            setSelectedRarity={setSelectedRarity}
            onApplyFilter={handleApplyFilter}
            onResetFilter={handleResetFilter}
          />
          <MapView 
            selectedCategory={selectedCategory}
            selectedProvince={selectedProvince}
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
