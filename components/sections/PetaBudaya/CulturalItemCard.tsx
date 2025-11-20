interface CulturalItemCardProps {
  onClose: () => void;
}

const CulturalItemCard = ({ onClose }: CulturalItemCardProps) => {
  return (
    <div className="w-full sm:w-60 lg:w-[239px] rounded-[20px] bg-white shadow-sm overflow-hidden">
      <div className="relative h-32 overflow-hidden rounded-t-[32px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/d7b58969d8199d892fdd6b03dffb9125380ce19f?width=432"
          alt="Tari Kecak"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2">
          <span className="inline-flex px-2 py-1 rounded-full bg-[#FD7E14] text-xs font-bold leading-4 text-white">
            Tarian
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-base font-bold leading-7 text-[#333333] mb-1">
          Tari Kecak
        </h3>
        
        <div className="flex items-start gap-1 mb-2">
          <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mt-0.5 flex-shrink-0">
            <path d="M5.33333 6.66668C5.7 6.66668 6.01389 6.53612 6.275 6.27501C6.53611 6.0139 6.66667 5.70001 6.66667 5.33334C6.66667 4.96668 6.53611 4.65279 6.275 4.39168C6.01389 4.13057 5.7 4.00001 5.33333 4.00001C4.96667 4.00001 4.65278 4.13057 4.39167 4.39168C4.13056 4.65279 4 4.96668 4 5.33334C4 5.70001 4.13056 6.0139 4.39167 6.27501C4.65278 6.53612 4.96667 6.66668 5.33333 6.66668ZM5.33333 11.5667C6.68889 10.3222 7.69444 9.19168 8.35 8.17501C9.00556 7.15834 9.33333 6.25557 9.33333 5.46668C9.33333 4.25557 8.94722 3.2639 8.175 2.49168C7.40278 1.71945 6.45556 1.33334 5.33333 1.33334C4.21111 1.33334 3.26389 1.71945 2.49167 2.49168C1.71944 3.2639 1.33333 4.25557 1.33333 5.46668C1.33333 6.25557 1.66111 7.15834 2.31667 8.17501C2.97222 9.19168 3.97778 10.3222 5.33333 11.5667ZM5.33333 13.3333C3.54444 11.8111 2.20833 10.3972 1.325 9.09168C0.441667 7.78612 0 6.57779 0 5.46668C0 3.80001 0.536111 2.47223 1.60833 1.48334C2.68056 0.494454 3.92222 9.53674e-06 5.33333 9.53674e-06C6.74444 9.53674e-06 7.98611 0.494454 9.05833 1.48334C10.1306 2.47223 10.6667 3.80001 10.6667 5.46668C10.6667 6.57779 10.225 7.78612 9.34167 9.09168C8.45833 10.3972 7.12222 11.8111 5.33333 13.3333Z" fill="#618989"/>
          </svg>
          <span className="text-sm font-normal leading-5 text-[#618989]">
            Bali, Indonesia
          </span>
        </div>

        <p className="text-sm font-normal leading-5 text-[#333333] mb-4 line-clamp-4">
          Tarian drama musikal yang menceritakan kisah Ramayana, dibawakan oleh puluhan penari laki-laki…
        </p>

        <button className="w-full h-11 px-4 rounded-full bg-[#00A99D] hover:bg-[#008f85] transition-colors">
          <span className="text-sm font-bold leading-[21px] tracking-[0.21px] text-white">
            Lihat Info Selengkapnya
          </span>
        </button>
      </div>
    </div>
  );
};

export default CulturalItemCard;
