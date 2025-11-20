const HeroSection = () => {
  return (
    <section className="w-full bg-white pt-10 sm:pt-16 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold leading-tight lg:leading-[48px] tracking-[-2.4px] text-[#111818]">
            Pindai Objek Budaya
          </h1>
          <p className="text-base sm:text-lg font-normal leading-7 text-[#618989] max-w-[595px]">
            Arahkan kamera ke objek budaya dan temukan ceritanya secara instan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
