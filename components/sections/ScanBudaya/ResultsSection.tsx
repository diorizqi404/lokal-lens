'use client';

import Image from 'next/image';

const ResultsSection = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-0">
      <div className="w-full mx-auto px-4 lg:px-0">
        <div className="w-full mx-auto lg:ml-auto lg:mr-0">
          <div className="relative w-full rounded-2xl border border-[#F0F4F4] bg-white shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-[33px] space-y-6">
              <div className="flex items-start gap-4 sm:gap-6 lg:gap-[57px]">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src="/assets/img/result.png"
                    alt="Keris Nogososro"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-9 tracking-[-0.75px] text-[#111818] mb-2">
                    Keris Nogososro
                  </h2>
                  <p className="text-base font-medium leading-6 text-[#618989]">
                    Jawa Tengah, Indonesia
                  </p>
                </div>
              </div>

              <div className="w-full rounded-xl bg-[#F6F8F8] p-6 relative">
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0">
                    <p className="text-sm font-bold leading-5 text-[#111818]">
                      92%
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold leading-6 text-[#111818] mb-1">
                      Tingkat Akurasi Model AI
                    </h3>
                    <p className="text-sm font-normal leading-5 text-[#618989]">
                      Objek berhasil diidentifikasi.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold leading-6 text-[#111818]">
                  Deskripsi
                </h3>
                <p className="text-sm font-normal leading-[22.75px] text-[#618989]">
                  Keris Nogososro adalah salah satu dhapur keris luk 13 yang melegenda. Dikenal
                  sebagai pusaka agung yang melambangkan kekuasaan, kebijaksanaan, dan
                  perlindungan bagi pemiliknya.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <h3 className="text-base font-bold leading-6 text-[#111818]">
                    Tingkat Kelangkaan
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEE2E2]">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-5 flex-shrink-0">
                      <path d="M7.99992 16L1.33325 8L3.33325 4H12.6666L14.6666 8L7.99992 16ZM6.41659 7.33333H9.58325L8.58325 5.33333H7.41659L6.41659 7.33333ZM7.33325 13.1167V8.66667H3.63325L7.33325 13.1167ZM8.66659 13.1167L12.3666 8.66667H8.66659V13.1167ZM11.0666 7.33333H12.8333L11.8333 5.33333H10.0666L11.0666 7.33333ZM3.16659 7.33333H4.93325L5.93325 5.33333H4.16659L3.16659 7.33333Z" fill="#991B1B"/>
                    </svg>
                    <span className="text-sm font-semibold leading-5 text-[#991B1B]">
                      Langka
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold leading-6 text-[#111818]">
                    Status UNESCO
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DBEAFE]">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-5 flex-shrink-0">
                      <path d="M5.73342 17L4.46675 14.8667L2.06675 14.3333L2.30008 11.8667L0.666748 10L2.30008 8.13333L2.06675 5.66667L4.46675 5.13333L5.73342 3L8.00008 3.96667L10.2667 3L11.5334 5.13333L13.9334 5.66667L13.7001 8.13333L15.3334 10L13.7001 11.8667L13.9334 14.3333L11.5334 14.8667L10.2667 17L8.00008 16.0333L5.73342 17ZM6.30008 15.3L8.00008 14.5667L9.73342 15.3L10.6667 13.7L12.5001 13.2667L12.3334 11.4L13.5667 10L12.3334 8.56667L12.5001 6.7L10.6667 6.3L9.70008 4.7L8.00008 5.43333L6.26675 4.7L5.33342 6.3L3.50008 6.7L3.66675 8.56667L2.43341 10L3.66675 11.4L3.50008 13.3L5.33342 13.7L6.30008 15.3ZM7.30008 12.3667L11.0667 8.6L10.1334 7.63333L7.30008 10.4667L5.86675 9.06667L4.93341 10L7.30008 12.3667Z" fill="#1E40AF"/>
                    </svg>
                    <span className="text-sm font-semibold leading-5 text-[#1E40AF]">
                      Diakui
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#F0F4F4] pt-4 flex flex-wrap items-center lg:justify-between gap-3">
                <button className="flex items-center justify-center gap-2 px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 rounded-full bg-[rgba(19,236,236,0.2)] hover:bg-[rgba(19,236,236,0.3)] transition-colors flex-1 sm:flex-none min-w-[180px]">
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7 flex-shrink-0">
                    <path d="M14.9204 22.7405L9.08945 20.6997L4.5705 22.449C4.24656 22.5786 3.94692 22.5421 3.67157 22.3397C3.39622 22.1372 3.25854 21.8659 3.25854 21.5258V7.92032C3.25854 7.70976 3.31928 7.5235 3.44076 7.36153C3.56224 7.19956 3.72826 7.07808 3.93882 6.9971L9.08945 5.24783L14.9204 7.28864L19.4393 5.53937C19.7632 5.4098 20.0629 5.44624 20.3382 5.6487C20.6136 5.85116 20.7513 6.12246 20.7513 6.4626V20.068C20.7513 20.2786 20.6905 20.4649 20.569 20.6268C20.4476 20.7888 20.2815 20.9103 20.071 20.9913L14.9204 22.7405ZM13.9485 20.3596V8.98932L10.0613 7.62878V18.999L13.9485 20.3596ZM15.8922 20.3596L18.8076 19.3878V7.87173L15.8922 8.98932V20.3596ZM5.20218 20.1166L8.11763 18.999V7.62878L5.20218 8.6006V20.1166Z" fill="#111818"/>
                  </svg>
                  <span className="text-base font-bold leading-6 text-[#111818]">
                    Lihat di Peta
                  </span>
                </button>

                <button className="flex items-center justify-center gap-2 px-6 sm:px-8 lg:px-9 py-2.5 sm:py-3 rounded-full bg-[rgba(19,236,236,0.2)] hover:bg-[rgba(19,236,236,0.3)] transition-colors flex-1 sm:flex-none min-w-[180px]">
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7 flex-shrink-0">
                    <path d="M8.1212 21.7778C7.58648 21.7778 7.12873 21.5874 6.74794 21.2066C6.36715 20.8258 6.17676 20.368 6.17676 19.8333V16.9167H9.09342V14.7292C8.5263 14.6968 7.98752 14.5712 7.47711 14.3524C6.96669 14.1337 6.50083 13.8055 6.07954 13.368V12.2986H4.96148L1.80176 9.13888C2.38509 8.39351 3.10616 7.86689 3.96495 7.55902C4.82375 7.25115 5.69065 7.09722 6.56565 7.09722C7.00315 7.09722 7.42849 7.12962 7.84169 7.19444C8.25488 7.25925 8.67213 7.38078 9.09342 7.55902V6.22222H20.7601V18.8611C20.7601 19.6713 20.4765 20.3599 19.9094 20.9271C19.3423 21.4942 18.6536 21.7778 17.8434 21.7778H8.1212ZM11.0379 16.9167H16.8712V18.8611C16.8712 19.1366 16.9644 19.3675 17.1507 19.5538C17.3371 19.7402 17.568 19.8333 17.8434 19.8333C18.1189 19.8333 18.3498 19.7402 18.5361 19.5538C18.7225 19.3675 18.8156 19.1366 18.8156 18.8611V8.16666H11.0379V8.74999L16.8712 14.5833V15.9444H15.5101L12.7393 13.1736L12.5448 13.368C12.318 13.5949 12.079 13.7974 11.8278 13.9757C11.5766 14.1539 11.3133 14.2917 11.0379 14.3889V16.9167ZM5.78787 10.3542H8.02398V12.4444C8.21842 12.5741 8.42097 12.6632 8.63162 12.7118C8.84227 12.7604 9.06102 12.7847 9.28787 12.7847C9.66055 12.7847 9.99678 12.728 10.2965 12.6146C10.5963 12.5012 10.892 12.2986 11.1837 12.0069L11.3781 11.8125L10.017 10.4514C9.54713 9.98147 9.02051 9.62904 8.43717 9.39409C7.85384 9.15914 7.23 9.04166 6.56565 9.04166C6.24157 9.04166 5.9337 9.06597 5.64204 9.11458C5.35037 9.16319 5.0587 9.2361 4.76704 9.33333L5.78787 10.3542ZM14.9268 18.8611H8.1212V19.8333H15.0726C15.024 19.6875 14.9875 19.5336 14.9632 19.3715C14.9389 19.2095 14.9268 19.0393 14.9268 18.8611ZM8.1212 19.8333C8.1212 19.6875 8.1212 19.5336 8.1212 19.3715C8.1212 19.2095 8.1212 19.0393 8.1212 18.8611C8.1212 19.0231 8.1212 19.1852 8.1212 19.3472C8.1212 19.5093 8.1212 19.6713 8.1212 19.8333Z" fill="#111818"/>
                  </svg>
                  <span className="text-base font-bold leading-6 text-[#111818]">
                    Cerita Lengkap
                  </span>
                </button>

                <button className="flex items-center justify-center p-3 rounded-full bg-[rgba(19,236,236,0.2)] hover:bg-[rgba(19,236,236,0.3)] transition-colors">
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7 flex-shrink-0">
                    <path d="M5.20435 22.75V7.19444C5.20435 6.65972 5.39474 6.20197 5.77553 5.82118C6.15631 5.44039 6.61407 5.25 7.14879 5.25H12.9821C12.9821 5.62268 12.9821 5.94676 12.9821 6.22222C12.9821 6.49768 12.9821 6.82176 12.9821 7.19444H7.14879V19.7847L12.0099 17.6944L16.871 19.7847V13.0278C17.2437 13.0278 17.5678 13.0278 17.8432 13.0278C18.1187 13.0278 18.4428 13.0278 18.8155 13.0278V22.75L12.0099 19.8333L5.20435 22.75ZM7.14879 7.19444H12.9821H12.0099H7.14879ZM16.871 11.0833V9.13889H14.9266V7.19444H16.871V5.25H18.8155V7.19444H20.7599V9.13889H18.8155V11.0833H16.871Z" fill="#111818"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
