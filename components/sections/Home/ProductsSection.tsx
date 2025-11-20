'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const ProductsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const products = [
    {
      image: "/assets/img/product.png",
      vendorLogo: "/assets/img/vendor.png",
      vendorName: "Rotan Jaya",
      title: "Tas Rotan Etnik Kalimantan",
      description: "Kerajinan tangan otentik dari pedalaman Kalimantan, kuat dan bergaya.",
      price: "Rp 250.000"
    },
    {
      image: "/assets/img/product.png",
      vendorLogo: "/assets/img/vendor.png",
      vendorName: "Pusaka Jawa",
      title: "Blangkon Batik Solo \"Wibawa\"",
      description: "Blangkon premium dengan motif batik tulis khas Keraton Solo.",
      price: "Rp 125.000"
    },
    {
      image: "/assets/img/product.png",
      vendorLogo: "/assets/img/vendor.png",
      vendorName: "Asmat Art",
      title: "Ukiran Kayu Miniatur Asmat",
      description: "Representasi seni ukir Suku Asmat yang penuh makna spiritual.",
      price: "Rp 450.000"
    },
    {
      image: "/assets/img/product.png",
      vendorLogo: "/assets/img/vendor.png",
      vendorName: "Sumba Woven",
      title: "Kain Tenun Ikat Sumba",
      description: "Mahakarya tenun tangan dengan pewarna alami dan motif warisan.",
      price: "Rp 780.000"
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 lg:py-[126px]">
      <div className="flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-[48px]">
          <h2 className="text-2xl sm:text-3xl lg:text-[48px] font-extrabold leading-tight lg:leading-[48px] tracking-tight lg:tracking-[-1.44px] text-[#1A1A1A] text-center">
            Dukung UMKM Budaya Nusantara
          </h2>
          <p className="text-base sm:text-lg font-normal leading-[27px] text-[#4B5563] text-center">
            Jelajahi Karya Autentik Pengrajin Lokal
          </p>
        </div>

        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-8 w-full scrollbar-hide snap-x snap-mandatory scroll-smooth select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="w-[320px] flex-shrink-0 flex flex-col rounded-2xl lg:rounded-[32px] border border-[#E5E7EB] bg-white shadow-sm hover:shadow-lg transition-shadow snap-start"
            >
              <div className="relative h-[240px]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover rounded-t-2xl lg:rounded-t-[32px]"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.8)] backdrop-blur-sm">
                  <Image
                    src={product.vendorLogo}
                    alt={product.vendorName}
                    width={24}
                    height={24}
                    className="rounded-full border-2 border-white"
                  />
                  <span className="text-xs font-semibold leading-4 text-[#1A1A1A]">
                    {product.vendorName}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5">
                <h3 className="text-base font-bold leading-5 text-[#1A1A1A]">
                  {product.title}
                </h3>
                <p className="text-sm font-normal leading-5 text-[#6B7280] h-10">
                  {product.description}
                </p>
                <p className="text-xl font-bold leading-7 text-[#006C84] mt-auto">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="flex items-center gap-2 px-6 sm:px-[34px] py-3 sm:py-[13px] rounded-full border-2 border-[#D4A017] hover:bg-[#D4A017] hover:text-white transition-colors mt-4 sm:mt-[10px] group">
          <span className="text-sm sm:text-base font-bold leading-6 tracking-[0.24px] text-[#D4A017] group-hover:text-white">
            Lihat Semua Produk
          </span>
          <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-6">
            <path d="M16.0623 14.9659H4.23047V13.0223H16.0623L10.6202 7.58008L12.005 6.21954L19.7795 13.9941L12.005 21.7686L10.6202 20.4081L16.0623 14.9659Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ProductsSection;
