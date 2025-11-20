const CTASection = () => {
  return (
    <section className="w-full bg-[#F5F5DC] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[568px] mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-[36px] font-bold leading-[40px] tracking-[-0.9px] text-[#4A2C2A]">
            Mari Bergabung Dalam Gerakan Ini
          </h2>
          <p className="text-base font-normal leading-[26px] text-[#6F5E5D]">
            Jadilah bagian dari perjalanan kami untuk melestarikan warisan budaya.
            Jelajahi, berkontribusi, dan sebarkan kekayaan budaya Indonesia kepada
            dunia.
          </p>
          <button className="inline-flex items-center justify-center px-[18px] py-[13px] rounded-full bg-[#FDB813] hover:bg-[#e5a711] transition-colors">
            <span className="text-base font-bold leading-6 tracking-[0.24px] text-[#181611]">
              Bergabung Sebagai Kontributor
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
