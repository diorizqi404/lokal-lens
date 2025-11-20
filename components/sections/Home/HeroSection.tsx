import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-[87px] mt-8 sm:mt-12 lg:mt-[69px]">
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[523px] max-w-7xl mx-auto rounded-3xl lg:rounded-[48px] relative overflow-hidden">
        <Image
          src="/assets/img/hero.png"
          alt="Indonesian Culture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.2)]" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-[249px] gap-3 sm:gap-4">
          <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold leading-tight lg:leading-[60px] tracking-tight lg:tracking-[-1.584px] text-white text-center max-w-full lg:w-[643px]">
              Scan Budaya Indonesia untuk
              Melihat Identitasnya.
            </h1>
            <p className="text-sm sm:text-base font-normal leading-relaxed text-[rgba(255,255,255,0.9)] text-center max-w-full sm:max-w-md lg:w-[555px]">
              Temukan kekayaan budaya di sekitar Anda melalui teknologi canggih kami.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 sm:mt-6 lg:mt-[36px] w-full sm:w-auto">
            <Link href={'/scan-budaya'} className="flex items-center justify-center px-6 py-3 rounded-full bg-[#13EC5B] w-full sm:w-auto sm:min-w-[133px] h-12 hover:bg-[#10d952] transition-colors">
              <span className="text-base font-bold leading-6 tracking-[0.24px] text-[#111813]">
                Mulai Scan
              </span>
            </Link>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,0,0,0.3)] backdrop-blur-sm">
              <span className="text-sm font-medium leading-[21px] text-[rgba(255,255,255,0.9)]">
                Budaya Terdata:
              </span>
              <span className="text-sm font-bold leading-[17.5px] text-white">
                +1200
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
