'use client';

const ScannerSection = () => {
  return (
    <section className="w-full bg-white py-0">
      <div className="w-full mx-auto px-4 lg:px-0">
        <div className="relative w-full mx-auto lg:mx-0">
          <div className="relative w-full aspect-[584/329] rounded-2xl border border-[#F0F4F4] bg-[#1A2C2C] shadow-sm overflow-hidden">
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="relative w-[calc(100%-66px)] h-[calc(100%-66px)] rounded-xl border-2 border-dashed border-white/50">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4">
                  <p className="text-base font-semibold leading-6 text-white text-center">
                    Posisikan Objek di Dalam Bingkai
                  </p>
                  <p className="text-sm font-normal leading-5 text-white/80 text-center">
                    Pastikan pencahayaan cukup
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button className="flex items-center justify-center gap-3 px-6 sm:px-12 lg:px-[100.5px] py-3.5 rounded-full bg-[#13EC5B] hover:bg-[#10d952] transition-colors shadow-sm">
              <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7 flex-shrink-0">
                <path d="M11.4266 11.0833H19.2044C18.7669 9.96528 18.0985 9.00521 17.1992 8.20313C16.2999 7.40105 15.2669 6.83797 14.1002 6.5139L11.4266 11.0833ZM9.1905 13.0278L13.0794 6.31945C12.9011 6.28704 12.7229 6.26274 12.5447 6.24653C12.3664 6.23033 12.1882 6.22223 12.0099 6.22223C10.9405 6.22223 9.94397 6.42477 9.02036 6.82987C8.09675 7.23496 7.27846 7.77778 6.5655 8.45834L9.1905 13.0278ZM4.47522 15.9445H9.77383L5.88494 9.23612C5.36642 9.90047 4.96133 10.6337 4.66966 11.4358C4.378 12.2379 4.23216 13.0926 4.23216 14C4.23216 14.3403 4.25242 14.6684 4.29293 14.9844C4.33344 15.3004 4.3942 15.6204 4.47522 15.9445ZM9.91966 21.4861L12.5447 16.9167H4.8155C5.253 18.0347 5.9214 18.9948 6.82071 19.7969C7.72001 20.599 8.753 21.162 9.91966 21.4861ZM12.0099 21.7778C13.0794 21.7778 14.0759 21.5752 14.9995 21.1701C15.9231 20.7651 16.7414 20.2222 17.4544 19.5417L14.8294 14.9722L10.9405 21.6806C11.1187 21.713 11.2929 21.7373 11.4631 21.7535C11.6332 21.7697 11.8155 21.7778 12.0099 21.7778ZM18.1349 18.7639C18.6535 18.0995 19.0586 17.3663 19.3502 16.5642C19.6419 15.7622 19.7877 14.9074 19.7877 14C19.7877 13.6597 19.7675 13.3316 19.727 13.0156C19.6864 12.6997 19.6257 12.3796 19.5447 12.0556H14.2461L18.1349 18.7639ZM12.0099 23.7222C10.6812 23.7222 9.42545 23.467 8.24258 22.9566C7.05971 22.4462 6.02672 21.7494 5.14362 20.8663C4.26052 19.9832 3.56376 18.9502 3.05334 17.7674C2.54293 16.5845 2.28772 15.3287 2.28772 14C2.28772 12.6551 2.54293 11.3953 3.05334 10.2205C3.56376 9.04572 4.26052 8.01679 5.14362 7.13369C6.02672 6.25059 7.05971 5.55383 8.24258 5.04341C9.42545 4.53299 10.6812 4.27778 12.0099 4.27778C13.3548 4.27778 14.6147 4.53299 15.7895 5.04341C16.9642 5.55383 17.9932 6.25059 18.8763 7.13369C19.7594 8.01679 20.4561 9.04572 20.9665 10.2205C21.477 11.3953 21.7322 12.6551 21.7322 14C21.7322 15.3287 21.477 16.5845 20.9665 17.7674C20.4561 18.9502 19.7594 19.9832 18.8763 20.8663C17.9932 21.7494 16.9642 22.4462 15.7895 22.9566C14.6147 23.467 13.3548 23.7222 12.0099 23.7222Z" fill="#111818"/>
              </svg>
              <span className="text-base sm:text-lg font-bold leading-7 tracking-[0.45px] text-[#111818]">
                Pindai Sekarang
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScannerSection;
