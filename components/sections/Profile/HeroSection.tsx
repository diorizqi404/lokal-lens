import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="w-full bg-white pt-8 sm:pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] bg-[#221C10] px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
              <div className="w-[109px] h-[109px] rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex-shrink-0 overflow-hidden">
                <Image 
                  src="/assets/img/profil.png" 
                  alt="Profile" 
                  width={109} 
                  height={109}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl sm:text-[32px] font-bold leading-[27.5px] tracking-[-0.33px] text-[#F7F7F7]">
                  Jejak Budaya Anda
                </h1>
                <p className="text-base sm:text-xl font-normal leading-6 text-[#F7F7F7] max-w-[524px]">
                  Selamat, Budi! Kamu telah menjelajahi 5 provinsi dan meraih 3 lencana.
                </p>
              </div>
            </div>

            <button className="flex items-center justify-center px-4 py-3 sm:px-4 sm:py-[17.5px] rounded-full bg-[#F0F4F4] hover:bg-white transition-colors whitespace-nowrap min-w-[196px] h-[76px] self-end md:self-auto">
              <span className="text-base font-bold leading-[21px] tracking-[0.21px] text-[#111818] text-center">
                Bagikan Pencapaian
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
