const HeroSection = () => {
  return (
    <section 
      className="relative w-full h-[603px] flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, rgba(74, 44, 42, 0.40) 0%, rgba(74, 44, 42, 0.70) 100%), url('https://api.builder.io/api/v1/image/assets/TEMP/f3553c731f0df019e9fb0c63e094a7e6304ec0e2?width=2904') lightgray 0px -502.5px / 100% 266.667% no-repeat",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-[768px] px-4 sm:px-6 flex flex-col items-center justify-center gap-[18px] text-center">
        <h1 className="text-white text-4xl sm:text-5xl lg:text-[60px] font-extrabold leading-[1.25] tracking-[-1.98px]">
          Mengenal Kembali Akar
          <br />
          Budaya Kita
        </h1>
        <p className="text-white/90 text-base sm:text-lg font-normal leading-[27px] max-w-[765px]">
          Lokallens adalah sebuah gerakan untuk mendokumentasikan, mempelajari, dan merayakan
          <br className="hidden sm:inline" />
          kembali kekayaan budaya Indonesia yang tak ternilai.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
