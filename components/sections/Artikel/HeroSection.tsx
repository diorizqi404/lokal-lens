'use client';

import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="w-full mt-6 sm:mt-8 lg:mt-12 mb-10 sm:mb-14 lg:mb-16">
      <div 
        className="relative w-full h-[400px] sm:h-[450px] lg:h-[480px] rounded-xl overflow-hidden flex flex-col justify-end p-6 sm:p-8 lg:p-10 bg-cover bg-center"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.60) 100%), url('https://images.unsplash.com/photo-1588076749432-ef52a4a685f7?w=1280&q=80') lightgray 50% / cover no-repeat`
        }}
      >
        <div className="max-w-full sm:max-w-[600px] lg:max-w-[672px] flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h1 className="text-white font-newsreader text-3xl sm:text-4xl lg:text-[48px] font-extrabold leading-tight sm:leading-[50px] lg:leading-[60px] tracking-[-1.584px]">
              Menyelami Kisah di Balik Tarian Sakral Bedhaya Ketawang
            </h1>
            <p className="text-white font-noto text-base sm:text-lg leading-relaxed sm:leading-[29.25px]">
              Sebuah warisan adiluhung dari Keraton Mataram yang penuh makna dan filosofi mendalam.
            </p>
          </div>
          
          <Link href={"/artikel/tes"} className="self-start px-6 py-3 rounded-full bg-[#E57373] hover:bg-[#D66565] transition-colors">
            <span className="text-white font-noto text-base font-bold leading-6 tracking-[0.24px]">
              Baca Selengkapnya
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
