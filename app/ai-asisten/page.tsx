'use client';

import { useState } from 'react';

const AIAssistantPage = () => {
  const [inputValue, setInputValue] = useState('');

  const suggestions = [
    {
      title: 'Jelaskan filosofi batik Parang',
      description: 'Pahami makna di balik motif klasik.',
    },
    {
      title: 'Apa itu upacara Rambu Solo\'?',
      description: 'Temukan tradisi unik dari Tana Toraja.',
    },
    {
      title: 'Sebutkan alat musik dari Jawa Barat',
      description: 'Kenali instrumen tradisional Sunda.',
    },
    {
      title: 'Ceritakan legenda Candi Prambanan',
      description: 'Dengarkan kisah cinta Roro Jonggrang.',
    },
  ];

  const handleSend = () => {
    if (inputValue.trim()) {
      console.log('Sending:', inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 px-4">
      <div className="w-full max-w-[896px] border border-[#E5E7EB] rounded-[32px] bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-6">
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#D4A017] via-[#C0392B] to-[#006C84] flex items-center justify-center">
              <svg width="48" height="58" viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-12 sm:w-12 sm:h-14">
                <path d="M38 23L35.5 17.5L30 15L35.5 12.5L38 7L40.5 12.5L46 15L40.5 17.5L38 23ZM38 51L35.5 45.5L30 43L35.5 40.5L38 35L40.5 40.5L46 43L40.5 45.5L38 51ZM18 45L13 34L2 29L13 24L18 13L23 24L34 29L23 34L18 45ZM18 35.3L20 31L24.3 29L20 27L18 22.7L16 27L11.7 29L16 31L18 35.3Z" fill="white"/>
              </svg>
            </div>

            <div className="flex flex-col items-center gap-2 max-w-[448px]">
              <h1 className="text-2xl sm:text-[30px] font-bold leading-[1.2] tracking-[-0.75px] text-[#1A1A1A] text-center">
                AI Assistant Budaya
              </h1>
              <p className="text-sm sm:text-base font-normal leading-6 text-[#6B7280] text-center">
                Saya di sini untuk membantu Anda menjelajahi kekayaan
                budaya Indonesia. Tanyakan apa saja!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-[512px]">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="flex flex-col items-start gap-1 p-3 rounded-[32px] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors text-left"
                >
                  <span className="text-sm font-semibold leading-5 text-[#1A1A1A]">
                    {suggestion.title}
                  </span>
                  <span className="text-xs font-normal leading-4 text-[#6B7280]">
                    {suggestion.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-end">
              <div className="max-w-[576px] bg-[#D4A017] rounded-[32px_32px_0_32px] px-4 py-3">
                <p className="text-base font-normal leading-6 text-white">
                  Bisa ceritakan tentang sejarah Wayang Kulit?
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-[#D4A017] to-[#C0392B] flex items-center justify-center">
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8334 9.49984L14.7917 7.20817L12.5 6.1665L14.7917 5.12484L15.8334 2.83317L16.875 5.12484L19.1667 6.1665L16.875 7.20817L15.8334 9.49984ZM15.8334 21.1665L14.7917 18.8748L12.5 17.8332L14.7917 16.7915L15.8334 14.4998L16.875 16.7915L19.1667 17.8332L16.875 18.8748L15.8334 21.1665ZM7.50004 18.6665L5.41671 14.0832L0.833374 11.9998L5.41671 9.9165L7.50004 5.33317L9.58337 9.9165L14.1667 11.9998L9.58337 14.0832L7.50004 18.6665ZM7.50004 14.6248L8.33337 12.8332L10.125 11.9998L8.33337 11.1665L7.50004 9.37484L6.66671 11.1665L4.87504 11.9998L6.66671 12.8332L7.50004 14.6248Z" fill="white"/>
                </svg>
              </div>
              <div className="flex-1 bg-[#F3F4F6] rounded-[32px_32px_32px_0] px-4 py-4">
                <div className="flex flex-col gap-3">
                  <p className="text-base font-normal leading-6 text-[#1A1A1A]">
                    Tentu! Wayang Kulit adalah seni pertunjukan tradisional Indonesia yang
                    berasal dari Jawa. Diperkirakan telah ada sejak abad ke-9, wayang kulit
                    menggunakan boneka kulit yang dimainkan oleh seorang dalang di balik
                    layar putih.
                  </p>
                  <p className="text-base font-normal leading-6 text-[#1A1A1A]">
                    Cerita yang dibawakan biasanya berasal dari epos Ramayana dan
                    Mahabharata dengan adaptasi nilai-nilai lokal. Pertunjukan ini tidak hanya
                    hiburan, tapi juga sarana pendidikan moral dan filosofis. UNESCO telah
                    mengakui Wayang Kulit sebagai Masterpiece of Oral and Intangible
                    Heritage of Humanity pada tahun 2003.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] bg-white/50 backdrop-blur-sm px-4 sm:px-6 md:px-8 lg:px-12 py-4">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              placeholder="Tanyakan tentang budaya Nusantara..."
              className="w-full bg-[#F3F4F6] rounded-full py-3.5 sm:py-4 pl-4 sm:pl-5 pr-14 sm:pr-16 text-sm sm:text-base font-normal text-[#1A1A1A] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#D4A017]/20"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#D4A017] hover:bg-[#C0392B] transition-colors flex items-center justify-center"
            >
              <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7">
                <path d="M3.26001 21.7778V6.22228L21.7322 14.0001L3.26001 21.7778ZM5.20445 18.8612L16.7253 14.0001L5.20445 9.13894V12.5417L11.0378 14.0001L5.20445 15.4584V18.8612ZM5.20445 18.8612V14.0001V9.13894V12.5417V15.4584V18.8612Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
