const HeroSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-[#1A1A1A] font-black text-3xl sm:text-4xl leading-10 tracking-[-1.188px]">
              Laporan Budaya Terancam
            </h1>
            <p className="text-[#887D63] font-normal text-base leading-6">
              Tinjau dan kelola laporan mengenai budaya yang membutuhkan perhatian.
            </p>
          </div>

          <a
            href="/budaya-terancam/lapor"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-gold hover:bg-[#C48F15] transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 whitespace-nowrap"
          >
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.16663 12.833H4.16663V11.1663H9.16663V6.16634H10.8333V11.1663H15.8333V12.833H10.8333V17.833H9.16663V12.833Z" fill="#1A1A1A"/>
            </svg>
            <span className="text-[#1A1A1A] text-base font-bold leading-6">
              Kirim Laporan Baru
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
