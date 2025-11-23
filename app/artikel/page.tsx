'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import HeroSection from "@/components/sections/Artikel/HeroSection";
import SearchSection from "@/components/sections/Artikel/SearchSection";
import ArticleGridSection from "@/components/sections/Artikel/ArticleGridSection";
import PaginationSection from "@/components/sections/Artikel/PaginationSection";

export default function ArtikelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get URL params
  const currentPage = parseInt(searchParams.get('page') || '1', 10) || 1;
  const currentCategory = searchParams.get('category') || 'semua';
  const currentSearch = searchParams.get('search') || '';

  // Update URL with new params
  const updateUrlParams = useCallback((updates: { page?: number; category?: string; search?: string }) => {
    // Build params from the current location to ensure we preserve any external params
    const baseParams = typeof window !== 'undefined'
      ? new URL(window.location.href).searchParams
      : new URLSearchParams(searchParams.toString());

    const params = new URLSearchParams(baseParams.toString());

    // Page handling
    if (updates.page !== undefined) {
      if (updates.page === 1) params.delete('page');
      else params.set('page', updates.page.toString());
    }

    // Category handling — reset page to 1
    if (updates.category !== undefined) {
      if (updates.category === 'semua') params.delete('category');
      else params.set('category', updates.category);
      params.delete('page');
    }

    // Search handling — reset page to 1
    if (updates.search !== undefined) {
      if (updates.search === '') params.delete('search');
      else params.set('search', updates.search);
      params.delete('page');
    }

    const queryString = params.toString();
    const url = `/artikel${queryString ? '?' + queryString : ''}`;

    // Use replace for filter/search updates to avoid history spam; push for page changes
    if (updates.page !== undefined) {
      router.push(url);
    } else {
      router.replace(url);
    }
  }, [searchParams, router]);

  return (
      <main className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSection />
          <SearchSection 
            currentCategory={currentCategory}
            currentSearch={currentSearch}
            onCategoryChange={(category) => updateUrlParams({ category })}
            onSearchChange={(search) => updateUrlParams({ search })}
          />
          <ArticleGridSection 
            page={currentPage}
            category={currentCategory}
            search={currentSearch}
          />
          <PaginationSection 
            currentPage={currentPage}
            onPageChange={(page) => updateUrlParams({ page })}
          />
        </div>
      </main>
  );
}
