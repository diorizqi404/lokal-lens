'use client';

const AchievementCertificate = () => {
  const handleDownload = () => {
    console.log('Download certificate');
  };

  const handleShare = () => {
    console.log('Share certificate');
  };

  return (
    <section className="w-full min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[960px] mx-auto flex flex-col items-center gap-8">
        <div className="w-full max-w-[512px] flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-center text-[#1B2A41] tracking-tight">
            Selamat, Duta Pelestari<br className="sm:hidden" /> Budaya!
          </h1>
          <p className="text-sm sm:text-base leading-6 text-center text-[rgba(27,42,65,0.7)]">
            Penghargaan atas dedikasi dan kontribusi luar biasa Anda dalam
            melestarikan kekayaan budaya Indonesia.
          </p>
        </div>

        <div className="w-full max-w-[896px] p-2 rounded-xl bg-[rgba(26,26,26,0.5)] shadow-2xl">
          <div 
            className="relative w-full aspect-[4/3] rounded-lg border-8 border-[rgba(212,160,23,0.2)] bg-[#F5EFE0] overflow-hidden"
            style={{
              backgroundImage: 'url(https://api.builder.io/api/v1/image/assets/TEMP/f658e85b8af94acb5844b8b59f7a9eb5af19a9ee?width=1760)',
              backgroundSize: '100px 100px',
              backgroundRepeat: 'repeat'
            }}
          >
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/7d3496974391bd62b4ac8819676646476106e05f?width=1728"
              alt="Certificate Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.05)] to-transparent opacity-30"></div>
          </div>
        </div>

        <div className="w-full max-w-[512px] flex flex-col items-center gap-6 pt-4">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-center text-[#1B2A41] tracking-wide" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Lokallens
            </h2>
            
            <p className="text-lg sm:text-xl leading-7 text-center text-[rgba(27,42,65,0.8)]" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
              Sertifikat Duta Pelestari Budaya
            </p>
          </div>

          <div className="w-full flex flex-col gap-2 py-4 px-4 sm:px-0">
            <p className="text-sm sm:text-base leading-6 text-center text-[rgba(27,42,65,0.8)]" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
              Dengan hormat diberikan kepada:
            </p>
            
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center text-[#006C84]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              User
            </h3>
            
            <p className="text-sm sm:text-base leading-6 text-center text-[rgba(27,42,65,0.8)] max-w-[448px] mx-auto" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
              Atas Dedikasi Luar Biasa dalam Menjelajahi dan
              Mempromosikan 30 Ragam Budaya Indonesia
            </p>
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-8 px-4 sm:px-8 pt-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs sm:text-sm leading-5 text-[rgba(27,42,65,0.7)]" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                Diberikan pada:
              </p>
              <p className="text-sm sm:text-base font-bold leading-6 text-[#1B2A41]" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                17 Agustus 2024
              </p>
            </div>
            
            <div className="flex flex-col items-start sm:items-end gap-0">
              <p className="text-lg sm:text-xl leading-7 text-right text-[#1B2A41]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Ttd.
              </p>
              <p className="text-sm sm:text-base font-bold leading-6 text-right text-[#1B2A41]" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                CEO Lokallens
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-6 py-3 min-w-[200px] sm:min-w-[265px] rounded-full bg-[#D4A017] hover:bg-[#C08F15] transition-colors shadow-md"
          >
            <svg width="24" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7 flex-shrink-0">
              <path d="M12.0102 17.8889L7.14909 13.0278L8.5102 11.6181L11.038 14.1459V6.22228H12.9824V14.1459L15.5102 11.6181L16.8713 13.0278L12.0102 17.8889ZM6.17687 21.7778C5.64214 21.7778 5.18439 21.5874 4.8036 21.2067C4.42282 20.8259 4.23242 20.3681 4.23242 19.8334V16.9167H6.17687V19.8334H17.8435V16.9167H19.788V19.8334C19.788 20.3681 19.5976 20.8259 19.2168 21.2067C18.836 21.5874 18.3783 21.7778 17.8435 21.7778H6.17687Z" fill="#1A1A1A"/>
            </svg>
            <span className="text-base font-bold leading-6 tracking-[0.24px] text-[#1A1A1A]">
              Unduh Sertifikat
            </span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 min-w-[160px] sm:min-w-[199px] rounded-full bg-[#006C84] hover:bg-[#005768] transition-colors shadow-md"
          >
            <svg width="24" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-7 flex-shrink-0">
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
