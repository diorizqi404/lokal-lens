const ProvinceCollectionSection = () => {
  const provinces = [
    {
      name: 'Jawa Barat',
      count: '24 Budaya',
      description: 'Dari Angklung yang mendunia hingga Tari Jaipong yang energik, Jawa Barat menyimpan kekayaan budaya Sunda yang mempesona.',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/25269685759a33fac5309e99da8e6083f8949f92?width=832',
    },
    {
      name: 'Bali',
      count: '32 Budaya',
      description: 'Pulau Dewata yang kaya akan tradisi, mulai dari upacara Ngaben yang sakral hingga Tari Kecak yang ikonik di pura-pura megah.',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/7e25e75c1572c5c361ddf55f02df5b3c14f9511d?width=832',
    },
    {
      name: 'Sumatera Utara',
      count: '18 Budaya',
      description: 'Jelajahi kekayaan budaya Batak, dari Kain Ulos yang penuh makna hingga tradisi lompat batu yang melegenda di Nias.',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/c1f0fa9c6d5a8c34e686623e2e5ea7c1ede493c5?width=832',
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-[28px] lg:text-[30px] font-bold leading-[30px] sm:leading-[35px] lg:leading-[37.5px] tracking-[-0.6px] text-[#333333] mb-3">
            Koleksi Pilihan Provinsi
          </h2>
          <p className="text-sm sm:text-base font-normal leading-6 text-[#618989] max-w-2xl mx-auto">
            Temukan keunikan budaya dari berbagai provinsi di Indonesia yang telah kami kurasi
            secara khusus untuk Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {provinces.map((province, index) => (
            <div
              key={index}
              className="rounded-[32px] bg-white shadow-sm overflow-hidden flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={province.image}
                  alt={province.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold leading-7 text-white mb-0">
                    {province.name}
                  </h3>
                  <p className="text-sm font-normal leading-5 text-white/90">
                    {province.count}
                  </p>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm font-normal leading-5 text-[#618989] mb-4 flex-1">
                  {province.description}
                </p>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm font-bold leading-5 text-[#00A99D] hover:text-[#008f85] transition-colors group"
                >
                  <span>Jelajahi Sekarang</span>
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7 group-hover:translate-x-1 transition-transform">
                    <path d="M16.0692 14.9723H4.23242V13.0278H16.0692L10.6248 7.58339L12.0102 6.22228L19.788 14.0001L12.0102 21.7778L10.6248 20.4167L16.0692 14.9723Z" fill="#00A99D"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProvinceCollectionSection;
