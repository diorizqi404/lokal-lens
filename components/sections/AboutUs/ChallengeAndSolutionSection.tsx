const ChallengeAndSolutionSection = () => {
  return (
    <section className="w-full bg-[#F5F5DC] py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
          <div className="space-y-6">
            <p className="text-sm font-bold leading-5 tracking-[0.7px] uppercase text-[#FDB813]">
              Tantangan
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[36px] font-bold leading-[40px] tracking-[-0.9px] text-[#4A2C2A]">
              Lunturnya Minat, Pudarnya
              <br />
              Jati Diri
            </h2>
            <p className="text-base font-normal leading-[26px] text-[#6F5E5D]">
              Di tengah derasnya arus globalisasi, banyak generasi muda
              kehilangan koneksi dengan budaya leluhur mereka.
              Kurangnya akses terhadap informasi budaya yang
              terverifikasi dan disajikan secara modern membuat mereka
              sulit untuk tertarik dan belajar. Akibatnya, warisan berharga
              ini terancam pudar.
            </p>
          </div>
          <div className="order-first lg:order-last">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/4f933ce487a9a398618856c196f6882888fed6b2?width=896" 
              alt="Cultural challenge illustration"
              className="w-full h-auto rounded-[32px] object-cover aspect-square"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-last lg:order-first">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/9034e3c65c1fe61fb563e371bff50ae5bd0169f7?width=896" 
              alt="Cultural solution illustration"
              className="w-full h-auto rounded-[32px] object-cover aspect-square"
            />
          </div>
          <div className="space-y-6">
            <p className="text-sm font-bold leading-5 tracking-[0.7px] uppercase text-[#FDB813]">
              Solusi Kami
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[36px] font-bold leading-[40px] tracking-[-0.9px] text-[#4A2C2A]">
              Menyajikan Budaya dalam
              <br />
              Genggaman
            </h2>
            <p className="text-base font-normal leading-[26px] text-[#6F5E5D]">
              Lokallens menjembatani kesenjangan ini. Kami menyajikan
              konten budaya melalui artikel, video, dan galeri interaktif
              yang dapat diakses kapan saja, di mana saja. Kami
              mengubah cara pandang terhadap budaya, dari sesuatu
              yang kuno menjadi relevan dan menginspirasi,
              membangkitkan kembali rasa ingin tahu dan kebanggaan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeAndSolutionSection;
