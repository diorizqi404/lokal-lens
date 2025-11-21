'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface AchievementCertificateProps {
  userName: string;
  certificateTitle: string;
  description: string;
  dateEarned: string;
  certificateId: number;
}

const AchievementCertificate = ({
  userName,
  certificateTitle,
  description,
  dateEarned,
  certificateId
}: AchievementCertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#F5EFE0',
        logging: false,
        useCORS: true,
        allowTaint: true,
        ignoreElements: (element) => {
          // Ignore elements that might cause issues
          return element.classList?.contains('ignore-capture');
        },
      });
      
      const link = document.createElement('a');
      link.download = `Sertifikat-${userName.replace(/\s+/g, '-')}-${certificateId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download error:', error);
      alert('Gagal mengunduh sertifikat. Silakan coba lagi.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#F5EFE0',
        logging: false,
        useCORS: true,
        allowTaint: true,
        ignoreElements: (element) => {
          return element.classList?.contains('ignore-capture');
        },
      });
      
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        
        const file = new File([blob], `Sertifikat-${userName}.png`, { type: 'image/png' });
        
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: certificateTitle,
            text: `Saya telah mendapatkan ${certificateTitle} dari Lokallens!`,
            files: [file]
          });
        } else {
          // Fallback: copy image to clipboard
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob
              })
            ]);
            alert('Sertifikat berhasil disalin ke clipboard!');
          } catch (err) {
            alert('Browser Anda tidak mendukung fitur berbagi. Silakan unduh sertifikat terlebih dahulu.');
          }
        }
      }, 'image/png');
    } catch (error) {
      console.error('Share error:', error);
      alert('Gagal membagikan sertifikat. Silakan coba lagi.');
    }
  };

  return (
    <section className="w-full min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[960px] mx-auto flex flex-col items-center gap-8">
        <div className="w-full max-w-lg flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-center text-[#1B2A41] tracking-tight">
            Selamat! {certificateTitle}
          </h1>
          <p className="text-sm sm:text-base leading-6 text-center" style={{ color: '#6B7280' }}>
            {description}
          </p>
        </div>

        <div 
          ref={certificateRef}
          className="w-full max-w-4xl p-2 rounded-xl shadow-2xl"
          style={{ backgroundColor: 'rgb(128, 128, 128)' }}
        >
          <div 
            className="relative w-full aspect-4/3 rounded-lg overflow-hidden flex flex-col items-center justify-center p-8 sm:p-12"
            style={{ 
              backgroundColor: '#F5EFE0',
              border: '8px solid rgb(234, 213, 179)'
            }}
          >
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0" style={{ opacity: 0.05 }}>
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4A017" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Certificate Content */}
            <div className="relative z-10 w-full flex flex-col items-center gap-6">
              {/* Logo/Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#D4A017] rounded-full flex items-center justify-center shadow-lg">
                <svg width="40" height="48" viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 11H42.5V30.625C42.5 31.5833 42.2917 32.4375 41.875 33.1875C41.4583 33.9375 40.875 34.5417 40.125 35L31.25 40.25L33 46H42.5L34.75 51.5L37.75 61L30 55.125L22.25 61L25.25 51.5L17.5 46H27L28.75 40.25L19.875 35C19.125 34.5417 18.5417 33.9375 18.125 33.1875C17.7083 32.4375 17.5 31.5833 17.5 30.625V11ZM22.5 16V30.625L27.5 33.625V16H22.5ZM37.5 16H32.5V33.625L37.5 30.625V16Z" fill="#1A1A1A" opacity="0.8"/>
                </svg>
              </div>

              {/* Title */}
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-center text-[#1B2A41]" style={{ fontFamily: 'Georgia, serif' }}>
                  Lokallens
                </h2>
                <div className="w-24 h-1 bg-[#D4A017] rounded-full"></div>
                <p className="text-base sm:text-lg leading-7 text-center" style={{ fontFamily: 'Georgia, serif', color: '#4A5568' }}>
                  Sertifikat Penghargaan
                </p>
              </div>

              {/* Recipient */}
              <div className="w-full flex flex-col gap-3 py-4">
                <p className="text-sm sm:text-base leading-6 text-center" style={{ color: '#6B7280' }}>
                  Dengan hormat diberikan kepada:
                </p>
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center text-[#006C84]" style={{ fontFamily: 'Georgia, serif' }}>
                  {userName}
                </h3>
                
                <p className="text-sm sm:text-base leading-6 text-center max-w-md mx-auto" style={{ color: '#4A5568' }}>
                  {description}
                </p>
              </div>

              {/* Footer */}
              <div className="w-full flex justify-between items-end px-4 sm:px-8 pt-6" style={{ borderTop: '2px solid #EDD5B3' }}>
                <div className="flex flex-col gap-1">
                  <p className="text-xs sm:text-sm leading-5" style={{ color: '#6B7280' }}>
                    Diberikan pada:
                  </p>
                  <p className="text-sm sm:text-base font-bold leading-6 text-[#1B2A41]">
                    {formatDate(dateEarned)}
                  </p>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <div className="w-32 h-16 flex items-center justify-center">
                    <svg viewBox="0 0 120 50" className="w-full h-full">
                      <text x="60" y="25" textAnchor="middle" fill="#1B2A41" fontSize="24" fontFamily="Georgia, serif" fontStyle="italic">
                        Lokallens
                      </text>
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base font-bold leading-6 text-[#1B2A41]">
                    CEO Lokallens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 px-6 py-3 min-w-[200px] sm:min-w-[265px] rounded-full bg-[#D4A017] hover:bg-[#C08F15] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <div className="w-6 h-6 border-3 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg width="24" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7 shrink-0">
                <path d="M12.0102 17.8889L7.14909 13.0278L8.5102 11.6181L11.038 14.1459V6.22228H12.9824V14.1459L15.5102 11.6181L16.8713 13.0278L12.0102 17.8889ZM6.17687 21.7778C5.64214 21.7778 5.18439 21.5874 4.8036 21.2067C4.42282 20.8259 4.23242 20.3681 4.23242 19.8334V16.9167H6.17687V19.8334H17.8435V16.9167H19.788V19.8334C19.788 20.3681 19.5976 20.8259 19.2168 21.2067C18.836 21.5874 18.3783 21.7778 17.8435 21.7778H6.17687Z" fill="#1A1A1A"/>
              </svg>
            )}
            <span className="text-base font-bold leading-6 tracking-[0.24px] text-[#1A1A1A]">
              {isDownloading ? 'Mengunduh...' : 'Unduh Sertifikat'}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 min-w-40 sm:min-w-[199px] rounded-full bg-[#006C84] hover:bg-[#005768] transition-colors shadow-md"
          >
            <svg width="24" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7 shrink-0">
              <path d="M16.8639 23.7125C16.054 23.7125 15.3657 23.429 14.7988 22.8621C14.2319 22.2952 13.9484 21.6069 13.9484 20.797C13.9484 20.6998 13.9727 20.4731 14.0213 20.1167L7.1943 16.1323C6.93515 16.3752 6.6355 16.5656 6.29537 16.7032C5.95523 16.8409 5.5908 16.9097 5.20207 16.9097C4.39223 16.9097 3.70385 16.6263 3.13696 16.0594C2.57007 15.4925 2.28662 14.8041 2.28662 13.9943C2.28662 13.1844 2.57007 12.4961 3.13696 11.9292C3.70385 11.3623 4.39223 11.0788 5.20207 11.0788C5.5908 11.0788 5.95523 11.1477 6.29537 11.2853C6.6355 11.423 6.93515 11.6133 7.1943 11.8563L14.0213 7.87184C13.9889 7.75846 13.9687 7.64913 13.9606 7.54385C13.9525 7.43857 13.9484 7.32114 13.9484 7.19156C13.9484 6.38172 14.2319 5.69335 14.7988 5.12645C15.3657 4.55956 16.054 4.27611 16.8639 4.27611C17.6737 4.27611 18.3621 4.55956 18.929 5.12645C19.4959 5.69335 19.7793 6.38172 19.7793 7.19156C19.7793 8.00141 19.4959 8.68978 18.929 9.25668C18.3621 9.82357 17.6737 10.107 16.8639 10.107C16.4752 10.107 16.1107 10.0382 15.7706 9.90051C15.4305 9.76283 15.1308 9.57252 14.8717 9.32956L8.04464 13.314C8.07703 13.4274 8.09728 13.5367 8.10538 13.642C8.11348 13.7473 8.11753 13.8647 8.11753 13.9943C8.11753 14.1239 8.11348 14.2413 8.10538 14.3466C8.09728 14.4519 8.07703 14.5612 8.04464 14.6746L14.8717 18.659C15.1308 18.4161 15.4305 18.2257 15.7706 18.0881C16.1107 17.9504 16.4752 17.8816 16.8639 17.8816C17.6737 17.8816 18.3621 18.165 18.929 18.7319C19.4959 19.2988 19.7793 19.9872 19.7793 20.797C19.7793 21.6069 19.4959 22.2952 18.929 22.8621C18.3621 23.429 17.6737 23.7125 16.8639 23.7125ZM16.8639 21.7688C17.1392 21.7688 17.37 21.6757 17.5563 21.4894C17.7426 21.3032 17.8357 21.0724 17.8357 20.797C17.8357 20.5217 17.7426 20.2909 17.5563 20.1046C17.37 19.9183 17.1392 19.8252 16.8639 19.8252C16.5885 19.8252 16.3577 19.9183 16.1715 20.1046C15.9852 20.2909 15.8921 20.5217 15.8921 20.797C15.8921 21.0724 15.9852 21.3032 16.1715 21.4894C16.3577 21.6757 16.5885 21.7688 16.8639 21.7688ZM5.20207 14.9661C5.47742 14.9661 5.70823 14.873 5.89449 14.6867C6.08076 14.5004 6.17389 14.2696 6.17389 13.9943C6.17389 13.7189 6.08076 13.4881 5.89449 13.3019C5.70823 13.1156 5.47742 13.0225 5.20207 13.0225C4.92673 13.0225 4.69592 13.1156 4.50965 13.3019C4.32339 13.4881 4.23026 13.7189 4.23026 13.9943C4.23026 14.2696 4.32339 14.5004 4.50965 14.6867C4.69592 14.873 4.92673 14.9661 5.20207 14.9661ZM16.8639 8.16338C17.1392 8.16338 17.37 8.07025 17.5563 7.88399C17.7426 7.69772 17.8357 7.46691 17.8357 7.19156C17.8357 6.91622 17.7426 6.68541 17.5563 6.49915C17.37 6.31288 17.1392 6.21975 16.8639 6.21975C16.5885 6.21975 16.3577 6.31288 16.1715 6.49915C15.9852 6.68541 15.8921 6.91622 15.8921 7.19156C15.8921 7.46691 15.9852 7.69772 16.1715 7.88399C16.3577 8.07025 16.5885 8.16338 16.8639 8.16338Z" fill="#F7F7F7"/>
            </svg>
            <span className="text-base font-bold leading-6 tracking-[0.24px] text-[#F7F7F7]">
              Bagikan
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AchievementCertificate;
