'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <nav className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#EAE3D9] text-[#5C6B8A] hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="24" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7">
          <path d="M13.9544 19.8335L8.12109 14.0002L13.9544 8.16683L15.3155 9.52794L10.8433 14.0002L15.3155 18.4724L13.9544 19.8335Z" fill="currentColor"/>
        </svg>
      </button>

      {/* Page Numbers */}
      <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.1)] text-[#D4A017] text-sm font-medium transition-all duration-200">
        1
      </button>
      <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[#192A51] text-sm font-medium hover:bg-gray-50 transition-all duration-200">
        2
      </button>
      <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[#192A51] text-sm font-medium hover:bg-gray-50 transition-all duration-200">
        3
      </button>
      <div className="w-10 h-10 flex items-center justify-center text-[#192A51] text-sm">
        ...
      </div>
      <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[#192A51] text-sm font-medium hover:bg-gray-50 transition-all duration-200">
        8
      </button>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#EAE3D9] text-[#5C6B8A] hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="24" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7">
          <path d="M12.5933 14.0002L8.12109 9.52794L9.4822 8.16683L15.3155 14.0002L9.4822 19.8335L8.12109 18.4724L12.5933 14.0002Z" fill="currentColor"/>
        </svg>
      </button>
    </nav>
  );
}
