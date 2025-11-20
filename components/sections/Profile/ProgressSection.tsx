const ProgressSection = () => {
  return (
    <section className="w-full bg-white pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-[24px] bg-[#221C10] p-6 shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold leading-[27px] text-[#F7F7F7]">
                Penjelajahan Nusantara
              </h3>
              <span className="text-sm font-bold leading-[21px] text-[#F7F7F7]">
                13%
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-[13%] rounded-full bg-[#006C84]"></div>
              </div>

              <div className="flex justify-between items-start -mt-2">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full border-2 border-white bg-[#006C84]"></div>
                </div>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full border-2 border-white bg-[#E5E7EB]"></div>
                </div>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full border-2 border-white bg-[#E5E7EB]"></div>
                </div>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full border-2 border-white bg-[#E5E7EB]"></div>
                </div>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full border-2 border-white bg-[#E5E7EB]"></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-medium leading-4 text-[#9CA3AF]">0</span>
                <span className="text-xs font-medium leading-4 text-[#9CA3AF]">Sumatera</span>
                <span className="text-xs font-medium leading-4 text-[#9CA3AF]">Jawa</span>
                <span className="text-xs font-medium leading-4 text-[#9CA3AF]">Kalimantan</span>
                <span className="text-xs font-medium leading-4 text-[#9CA3AF]">Sulawesi</span>
                <span className="text-xs font-medium leading-4 text-[#9CA3AF]">Papua</span>
              </div>
            </div>

            <div className="rounded-md bg-[rgba(0,180,216,0.1)] p-3">
              <p className="text-sm font-normal leading-5 text-[#F7F7F7] text-center">
                <span className="font-bold">Misi Berikutnya:</span> Jelajahi 3 provinsi di Kalimantan untuk lencana <span className="font-bold">Penjelajah Borneo</span>!
              </p>
            </div>
          </div>

          <div className="rounded-[24px] bg-[#221C10] p-6 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold leading-[27px] text-[#F7F7F7]">
                Tantangan Mingguan
              </h3>
              <p className="text-sm font-normal leading-5 text-[#F7F7F7]">
                Pindai 3 makanan khas daerahmu.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <div className="relative h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-[33%] rounded-full bg-[#C0392B]"></div>
                </div>
                <p className="text-xs font-normal leading-4 text-[#F7F7F7]">
                  1 dari 3 selesai
                </p>
              </div>

              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#C0392B] hover:bg-[#a02f23] transition-colors flex-shrink-0">
                <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 11.75V5.5H8.75V8H5V11.75H2.5ZM2.5 30.5V24.25H5V28H8.75V30.5H2.5ZM21.25 30.5V28H25V24.25H27.5V30.5H21.25ZM25 11.75V8H21.25V5.5H27.5V11.75H25ZM21.875 24.875H23.75V26.75H21.875V24.875ZM21.875 21.125H23.75V23H21.875V21.125ZM20 23H21.875V24.875H20V23ZM18.125 24.875H20V26.75H18.125V24.875ZM16.25 23H18.125V24.875H16.25V23ZM20 19.25H21.875V21.125H20V19.25ZM18.125 21.125H20V23H18.125V21.125ZM16.25 19.25H18.125V21.125H16.25V19.25ZM23.75 9.25V16.75H16.25V9.25H23.75ZM13.75 19.25V26.75H6.25V19.25H13.75ZM13.75 9.25V16.75H6.25V9.25H13.75ZM11.875 24.875V21.125H8.125V24.875H11.875ZM11.875 14.875V11.125H8.125V14.875H11.875ZM21.875 14.875V11.125H18.125V14.875H21.875Z" fill="#221C10"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
