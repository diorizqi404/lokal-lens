'use client';

import { useState } from 'react';
import CulturalItemCard from './CulturalItemCard';

const MapView = () => {
  const [showCard, setShowCard] = useState(true);

  const regions = ['Jawa', 'Sumatra', 'Kalimantan', 'Papua'];

  return (
    <div className="flex-1 relative">
      <div className="rounded-[32px] overflow-hidden bg-gray-200 h-[400px] sm:h-[500px] lg:h-[503px] relative">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/2a2a80ce40bdae1fb51e593efc72357ab3889117?width=1730')",
            backgroundSize: '268.75px 268.75px',
            backgroundRepeat: 'repeat',
          }}
        >
          <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-[320px] lg:max-w-[380px]">
            <div className="flex items-center rounded-full bg-white/0 shadow-lg backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-center pl-4 pr-0 py-3 sm:py-3.5 bg-white rounded-l-full">
                <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-6 sm:w-6 sm:h-7">
                  <path d="M19.3987 22.75L13.2737 16.625C12.7875 17.0139 12.2285 17.3218 11.5966 17.5486C10.9646 17.7755 10.2922 17.8889 9.57921 17.8889C7.81301 17.8889 6.31821 17.2772 5.09484 16.0538C3.87146 14.8304 3.25977 13.3356 3.25977 11.5694C3.25977 9.80324 3.87146 8.30845 5.09484 7.08507C6.31821 5.86169 7.81301 5.25 9.57921 5.25C11.3454 5.25 12.8402 5.86169 14.0636 7.08507C15.287 8.30845 15.8987 9.80324 15.8987 11.5694C15.8987 12.2824 15.7852 12.9549 15.5584 13.5868C15.3315 14.2188 15.0237 14.7778 14.6348 15.2639L20.7598 21.3889L19.3987 22.75ZM9.57921 15.9444C10.7945 15.9444 11.8275 15.5191 12.6782 14.6684C13.5289 13.8177 13.9542 12.7847 13.9542 11.5694C13.9542 10.3542 13.5289 9.32118 12.6782 8.47049C11.8275 7.61979 10.7945 7.19444 9.57921 7.19444C8.36393 7.19444 7.33095 7.61979 6.48025 8.47049C5.62956 9.32118 5.20421 10.3542 5.20421 11.5694C5.20421 12.7847 5.62956 13.8177 6.48025 14.6684C7.33095 15.5191 8.36393 15.9444 9.57921 15.9444Z" fill="#618989"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari budaya atau lokasi"
                className="flex-1 px-2 sm:px-3 py-3 sm:py-3.5 bg-white text-sm sm:text-base font-normal text-[#618989] placeholder:text-[#618989] outline-none border-none"
              />
              <div className="w-2 bg-white rounded-r-full"></div>
            </div>
          </div>

          <div className="absolute hidden sm:block top-4 right-4 lg:right-6 rounded-[32px] bg-white/80 backdrop-blur-sm shadow-lg p-4 w-48">
            <h3 className="text-base font-bold leading-6 text-[#333333] mb-3">
              Legenda
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FD7E14]"></div>
                <span className="text-sm font-normal leading-5 text-[#333333]">Tarian</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4A90E2]"></div>
                <span className="text-sm font-normal leading-5 text-[#333333]">Musik</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#9013FE]"></div>
                <span className="text-sm font-normal leading-5 text-[#333333]">Kerajinan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D0021B]"></div>
                <span className="text-sm font-normal leading-5 text-[#333333]">Upacara Adat</span>
              </div>
            </div>
          </div>

          <div className="absolute right-4 sm:right-6 top-[45%] sm:top-[360px] lg:top-[359px] flex flex-col gap-2">
            <div className="flex flex-col">
              <button className="w-10 h-10 flex items-center justify-center rounded-t-[32px] bg-white shadow-md hover:bg-gray-50 transition-colors">
                <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7">
                  <path d="M11.0374 14.9722H5.2041V13.0278H11.0374V7.19443H12.9819V13.0278H18.8152V14.9722H12.9819V20.8055H11.0374V14.9722Z" fill="#333333"/>
                </svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-b-[32px] bg-white shadow-md hover:bg-gray-50 transition-colors">
                <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7">
                  <path d="M5.2041 14.9722V13.0278H18.8152V14.9722H5.2041Z" fill="#333333"/>
                </svg>
              </button>
            </div>
            <button className="w-10 h-10 flex items-center justify-center rounded-[32px] bg-white shadow-md hover:bg-gray-50 transition-colors">
              <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7">
                <path d="M11.0379 24.6458V22.7014C9.01241 22.4745 7.27456 21.636 5.82433 20.1857C4.3741 18.7355 3.53555 16.9977 3.3087 14.9722H1.36426V13.0278H3.3087C3.53555 11.0023 4.3741 9.26445 5.82433 7.81421C7.27456 6.36398 9.01241 5.52544 11.0379 5.29859V3.35415H12.9823V5.29859C15.0078 5.52544 16.7456 6.36398 18.1959 7.81421C19.6461 9.26445 20.4846 11.0023 20.7115 13.0278H22.6559V14.9722H20.7115C20.4846 16.9977 19.6461 18.7355 18.1959 20.1857C16.7456 21.636 15.0078 22.4745 12.9823 22.7014V24.6458H11.0379ZM12.0101 20.8055C13.8897 20.8055 15.4939 20.1412 16.8226 18.8125C18.1513 17.4838 18.8156 15.8796 18.8156 14C18.8156 12.1203 18.1513 10.5162 16.8226 9.18748C15.4939 7.85877 13.8897 7.19442 12.0101 7.19442C10.1305 7.19442 8.5263 7.85877 7.19759 9.18748C5.86889 10.5162 5.20454 12.1203 5.20454 14C5.20454 15.8796 5.86889 17.4838 7.19759 18.8125C8.5263 20.1412 10.1305 20.8055 12.0101 20.8055ZM12.0101 17.8889C10.9406 17.8889 10.0251 17.5081 9.26356 16.7465C8.50199 15.9849 8.1212 15.0694 8.1212 14C8.1212 12.9305 8.50199 12.015 9.26356 11.2535C10.0251 10.4919 10.9406 10.1111 12.0101 10.1111C13.0795 10.1111 13.995 10.4919 14.7566 11.2535C15.5182 12.015 15.899 12.9305 15.899 14C15.899 15.0694 15.5182 15.9849 14.7566 16.7465C13.995 17.5081 13.0795 17.8889 12.0101 17.8889ZM12.0101 15.9444C12.5448 15.9444 13.0026 15.754 13.3834 15.3732C13.7641 14.9925 13.9545 14.5347 13.9545 14C13.9545 13.4653 13.7641 13.0075 13.3834 12.6267C13.0026 12.2459 12.5448 12.0555 12.0101 12.0555C11.4754 12.0555 11.0176 12.2459 10.6368 12.6267C10.256 13.0075 10.0656 13.4653 10.0656 14C10.0656 14.5347 10.256 14.9925 10.6368 15.3732C11.0176 15.754 11.4754 15.9444 12.0101 15.9444Z" fill="#333333"/>
              </svg>
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region}
                className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
              >
                <span className="text-sm font-semibold leading-5 text-[#333333]">
                  {region}
                </span>
              </button>
            ))}
          </div>

          <div className="absolute top-[35%] sm:top-[40%] left-[18%] sm:left-[260px] w-6 h-6 rounded-full border-2 border-white bg-[#4A90E2] shadow-lg"></div>
          <div className="absolute top-[45%] sm:top-[50%] left-[38%] sm:left-[346px] w-6 h-6 rounded-full border-2 border-white bg-[#9013FE] shadow-lg"></div>
          <div className="absolute top-[50%] sm:top-[55%] left-[60%] sm:left-[519px] w-6 h-6 rounded-full border-2 border-white bg-[#FD7E14] shadow-lg"></div>

          {showCard && (
            <div className="hidden sm:block absolute bottom-4 left-4">
              <CulturalItemCard onClose={() => setShowCard(false)} />
            </div>
          )}
        </div>
      </div>

      {showCard && (
        <div className="sm:hidden mt-4">
          <CulturalItemCard onClose={() => setShowCard(false)} />
        </div>
      )}
    </div>
  );
};

export default MapView;
