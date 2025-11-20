'use client';

export default function SearchBar() {
  return (
    <div className="w-full mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div className="bg-white border border-[#EAE3D9] rounded-xl shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <svg width="24" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7 flex-shrink-0 text-[#5C6B8A]">
            <path d="M19.3989 22.75L13.2739 16.625C12.7878 17.0139 12.2287 17.3218 11.5968 17.5486C10.9649 17.7755 10.2924 17.8889 9.57944 17.8889C7.81324 17.8889 6.31844 17.2772 5.09506 16.0538C3.87168 14.8304 3.25999 13.3356 3.25999 11.5694C3.25999 9.80324 3.87168 8.30845 5.09506 7.08507C6.31844 5.86169 7.81324 5.25 9.57944 5.25C11.3456 5.25 12.8404 5.86169 14.0638 7.08507C15.2872 8.30845 15.8989 9.80324 15.8989 11.5694C15.8989 12.2824 15.7855 12.9549 15.5586 13.5868C15.3318 14.2188 15.0239 14.7778 14.635 15.2639L20.76 21.3889L19.3989 22.75ZM9.57944 15.9444C10.7947 15.9444 11.8277 15.5191 12.6784 14.6684C13.5291 13.8177 13.9544 12.7847 13.9544 11.5694C13.9544 10.3542 13.5291 9.32118 12.6784 8.47049C11.8277 7.61979 10.7947 7.19444 9.57944 7.19444C8.36416 7.19444 7.33118 7.61979 6.48048 8.47049C5.62979 9.32118 5.20444 10.3542 5.20444 11.5694C5.20444 12.7847 5.62979 13.8177 6.48048 14.6684C7.33118 15.5191 8.36416 15.9444 9.57944 15.9444Z" fill="currentColor"/>
          </svg>
          <input
            type="text"
            placeholder="Cari acara, festival, atau pameran..."
            className="flex-1 bg-transparent outline-none text-base text-[#192A51] placeholder:text-[#5C6B8A] placeholder:opacity-60"
          />
        </div>
      </div>
    </div>
  );
}
