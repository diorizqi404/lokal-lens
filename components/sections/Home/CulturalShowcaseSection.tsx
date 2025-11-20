import Image from 'next/image';

const CulturalShowcaseSection = () => {
  const cultures = [
    {
      image: "/assets/img/batik.png",
      title: "Tari Saman Gayo",
      location: "Aceh"
    },
    {
      image: "/assets/img/batik.png",
      title: "Ukiran Asmat",
      location: "Papua"
    },
    {
      image: "/assets/img/batik.png",
      title: "Batik Parang",
      location: "Jawa"
    },
    {
      image: "/assets/img/batik.png",
      title: "Rumah Gadang",
      location: "Sumatera Barat"
    }
  ];

  return (
    <section className="w-full mt-12 sm:mt-16 lg:mt-[69px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-[30px] font-bold leading-tight tracking-[-0.45px] text-[#181611] text-center mb-8 sm:mb-12 lg:mb-[62px]">
          Jelajahi Kekayaan Nusantara
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-[22px] w-full">
          {cultures.map((culture, index) => (
            <div
              key={index}
              className="w-full h-[350px] sm:h-[381px] rounded-2xl lg:rounded-[24px] relative overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            >
              <Image
                src={culture.image}
                alt={culture.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.6)]" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-0">
                <h3 className="text-lg font-bold leading-[22.5px] text-white">
                  {culture.title}
                </h3>
                <p className="text-sm font-medium leading-5 text-white">
                  {culture.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalShowcaseSection;
