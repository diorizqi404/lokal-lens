const TeamSection = () => {
  const teamMembers = [
    {
      name: "Moch Djauharil Ilmi",
      role: "Founder & CEO",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a5f76c737a7156a1e577fdc66b1c7064e058cf7c?width=432"
    },
    {
      name: "Khairunnisa",
      role: "Head of Content",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d7c397c28a8e7ff1dc58cc6e2b19f2383f03438f?width=432"
    },
    {
      name: "Djenar Virgiant SN",
      role: "Lead Developer",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/1c88cbea6107b27cce2d7b79790b3ca7704dcf9e?width=432"
    },
    {
      name: "Fieza Rausyan Al Ghifari",
      role: "Community Manager",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/feb9564f8d4c95a5edb2ee5f1cdd281556d48bcb?width=432"
    },
    {
      name: "Muhammad Dio Rizqi Hermawan",
      role: "Community Manager",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/feb9564f8d4c95a5edb2ee5f1cdd281556d48bcb?width=432"
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[36px] font-bold leading-[40px] tracking-[-0.9px] text-[#4A2C2A]">
            Tim di Balik Lokallens
          </h2>
          <p className="text-base font-normal leading-[26px] text-[#6F5E5D] max-w-[659px] mx-auto">
            Kami adalah sekelompok individu yang bersemangat untuk melestarikan dan merayakan
            kekayaan budaya Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-6 justify-items-center">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="flex flex-col items-center w-full max-w-[216px]"
            >
              <div className="w-[216px] h-[216px] mb-4 rounded-[32px] overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base font-bold leading-6 text-[#4A2C2A] text-center mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-normal leading-5 text-[#6F5E5D] text-center">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
