const AchievementBanner = () => {
  return (
    <section className="w-full bg-white pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-[24px] bg-[#D4A017] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
          <div className="flex-shrink-0">
            <svg width="60" height="72" viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 11H42.5V30.625C42.5 31.5833 42.2917 32.4375 41.875 33.1875C41.4583 33.9375 40.875 34.5417 40.125 35L31.25 40.25L33 46H42.5L34.75 51.5L37.75 61L30 55.125L22.25 61L25.25 51.5L17.5 46H27L28.75 40.25L19.875 35C19.125 34.5417 18.5417 33.9375 18.125 33.1875C17.7083 32.4375 17.5 31.5833 17.5 30.625V11ZM22.5 16V30.625L27.5 33.625V16H22.5ZM37.5 16H32.5V33.625L37.5 30.625V16Z" fill="#1A1A1A" fillOpacity="0.8"/>
            </svg>
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-lg font-bold leading-[22.5px] text-[#1A1A1A]">
              Anda adalah Duta Budaya Lokallens!
            </h3>
            <p className="text-sm font-normal leading-5 text-[rgba(26,26,26,0.9)]">
              Pencapaian luar biasa ini berhak mendapatkan pengakuan. Klaim dan bagikan sertifikat digital Anda.
            </p>
          </div>

          <button className="flex items-center justify-center px-6 h-11 rounded-full bg-[#1A1A1A] hover:bg-[#000] transition-colors whitespace-nowrap">
            <span className="text-sm font-bold leading-[21px] tracking-[0.21px] text-white">
              Lihat Sertifikat Duta Budaya
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AchievementBanner;
