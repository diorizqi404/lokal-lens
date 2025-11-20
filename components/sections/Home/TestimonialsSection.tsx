import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      avatar: "/assets/img/testimoni.png",
      name: "Andini Putri",
      role: "Travel Blogger",
      quote: "\"Lokallens benar-benar membuka mata saya terhadap budaya yang ada di sekitar. Fitur scan-nya luar biasa, seperti punya ensiklopedia budaya di saku!\""
    },
    {
      avatar: "/assets/img/testimoni.png",
      name: "Budi Santoso",
      role: "Mahasiswa Sejarah",
      quote: "\"Sebagai mahasiswa sejarah, aplikasi ini sangat membantu riset saya. Peta budayanya detail dan informatif. Wajib punya untuk akademisi dan peneliti.\""
    },
    {
      avatar: "/assets/img/testimoni.png",
      name: "Citra Lestari",
      role: "Guru Seni Budaya",
      quote: "\"Saya menggunakan Lokallens sebagai media pembelajaran di kelas. Anak- anak jadi lebih antusias belajar budaya lokal. Sangat edukatif dan interaktif!\""
    }
  ];

  return (
    <section className="w-full mt-12 sm:mt-16 lg:mt-[88px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-8 sm:gap-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <h2 className="text-2xl sm:text-[30px] font-bold leading-tight tracking-[-0.45px] text-[#1A1A1A] text-center">
            Kata Mereka Tentang Lokallens
          </h2>
          <p className="text-sm sm:text-base font-normal leading-6 text-[#4B5563] text-center max-w-2xl">
            Dengarkan cerita dan pengalaman pengguna yang telah menjelajahi kekayaan budaya bersama kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-5 sm:p-[25px] rounded-2xl lg:rounded-[32px] border border-[#E5E7EB] hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <h4 className="text-base font-bold leading-6 text-[#1A1A1A]">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm font-normal leading-5 text-[#6B7280]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base font-normal italic leading-6 text-[#374151]">
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
