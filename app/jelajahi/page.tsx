'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from "@/components/sections/Jelajahi/HeroSection";
import CulturalGridSection from "@/components/sections/Jelajahi/CulturalGridSection";

export default function Jelajahi() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white"
    >
      <HeroSection 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <CulturalGridSection selectedCategory={selectedCategory} />
    </motion.main>
  );
}
