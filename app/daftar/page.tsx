'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt with:', { fullName, email, password });
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row" style={{background: '#F7F7F7'}}>
      <div className="relative hidden flex-1 lg:flex">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop')",
            backgroundSize: '234.375px 234.375px',
          }}
        />
        <div 
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background: 'linear-gradient(0deg, rgba(0, 108, 132, 0.50) 0%, rgba(212, 160, 23, 0.30) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative flex flex-1 flex-col justify-end p-12">
          <blockquote className="text-2xl font-semibold italic leading-8 text-white">
            "Nusantara adalah mozaik budaya yang tak ternilai, setiap kepingnya adalah warisan yang harus kita jaga."
          </blockquote>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-[448px]">
          <div className="mb-[72px]">
            <h1 className="text-2xl font-bold leading-8 text-[#1A1A1A]">
              Lokallens
            </h1>
          </div>

          <div className="mb-8 space-y-2">
            <h2 className="text-4xl font-bold leading-10 tracking-[-0.9px] text-[#1A1A1A]">
              Daftarkan Akun Anda
            </h2>
            <p className="text-base leading-6 text-[#5E5E5E]">
              Bergabunglah dengan kami untuk melestarikan kekayaan Nusantara.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium leading-[21px] text-[#1A1A1A]">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full rounded-2xl border border-[#D1D5DB] bg-white px-[17px] py-[9px] text-base text-gray-900 placeholder:text-[#9CA3AF] focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium leading-[21px] text-[#1A1A1A]">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full rounded-2xl border border-[#D1D5DB] bg-white px-[17px] py-[9px] text-base text-gray-900 placeholder:text-[#9CA3AF] focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline">
                <label htmlFor="password" className="flex-1 text-sm font-medium leading-[21px] text-[#1A1A1A]">
                  Buat Kata Sandi
                </label>
              </div>
              <div className="relative flex items-stretch">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="flex-1 rounded-l-2xl border border-[#D1D5DB] bg-white px-[13px] py-[14px] text-base text-gray-900 placeholder:text-[#9CA3AF] focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red focus:z-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center justify-center rounded-r-2xl border border-l-0 border-[#D1D5DB] bg-white px-[13px] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-red"
                >
                  <svg
                    width="25"
                    height="28"
                    viewBox="0 0 25 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-6"
                  >
                    <path
                      d="M15.9961 15.264L14.5864 13.8543C14.7322 13.0927 14.5135 12.3797 13.9301 11.7154C13.3468 11.051 12.5933 10.7918 11.6697 10.9376L10.26 9.52789C10.5355 9.39826 10.815 9.30103 11.0985 9.23622C11.3821 9.1714 11.6859 9.139 12.01 9.139C13.2253 9.139 14.2583 9.56434 15.109 10.415C15.9596 11.2657 16.385 12.2987 16.385 13.514C16.385 13.8381 16.3526 14.1419 16.2878 14.4255C16.223 14.709 16.1257 14.9885 15.9961 15.264ZM19.1072 18.3265L17.6975 16.9654C18.3132 16.4955 18.8601 15.981 19.3381 15.422C19.8161 14.863 20.2253 14.227 20.5656 13.514C19.7554 11.8774 18.5928 10.5771 17.0777 9.61296C15.5627 8.64884 13.8734 8.16677 12.01 8.16677C11.5401 8.16677 11.0783 8.19918 10.6246 8.264C10.1709 8.32881 9.72527 8.42603 9.28777 8.55566L7.78083 7.04872C8.44518 6.77326 9.12574 6.56666 9.8225 6.42893C10.5193 6.2912 11.2484 6.22233 12.01 6.22233C14.4568 6.22233 16.6362 6.89883 18.5482 8.25184C20.4602 9.60485 21.8456 11.3589 22.7044 13.514C22.3318 14.47 21.8416 15.3572 21.234 16.1755C20.6263 16.9937 19.9174 17.7108 19.1072 18.3265ZM19.5933 24.3057L15.51 20.2709C14.9429 20.4492 14.3717 20.5829 13.7965 20.672C13.2212 20.7611 12.6257 20.8057 12.01 20.8057C9.56324 20.8057 7.38384 20.1292 5.4718 18.7762C3.55976 17.4231 2.17435 15.6691 1.31555 13.514C1.65583 12.6552 2.08523 11.8572 2.60375 11.1199C3.12226 10.3826 3.7137 9.72233 4.37805 9.139L1.70444 6.41677L3.06555 5.05566L20.9544 22.9446L19.5933 24.3057ZM5.73916 10.5001C5.26926 10.9214 4.83986 11.3832 4.45097 11.8855C4.06208 12.3878 3.7299 12.9307 3.45444 13.514C4.26463 15.1506 5.42724 16.4509 6.94229 17.415C8.45733 18.3792 10.1466 18.8612 12.01 18.8612C12.3341 18.8612 12.65 18.841 12.9579 18.8005C13.2658 18.7599 13.5818 18.7154 13.9058 18.6668L13.0308 17.7432C12.8526 17.7918 12.6825 17.8282 12.5204 17.8525C12.3584 17.8768 12.1882 17.889 12.01 17.889C10.7947 17.889 9.76173 17.4637 8.91104 16.613C8.06034 15.7623 7.635 14.7293 7.635 13.514C7.635 13.3358 7.64715 13.1656 7.67145 13.0036C7.69576 12.8415 7.73222 12.6714 7.78083 12.4932L5.73916 10.5001Z"
                      fill="#5E5E5E"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#A94438] px-5 py-3 text-center text-base font-bold leading-6 tracking-[0.24px] text-white transition-colors hover:bg-[#8B3529] focus:outline-none focus:ring-2 focus:ring-[#A94438] focus:ring-offset-2"
            >
              Daftar
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-0 text-center text-sm leading-5">
            <span className="text-[#5E5E5E]">Sudah punya akun? </span>
            <Link 
              href="/masuk" 
              className="ms-1 font-bold text-[#A94438] underline hover:text-[#8B3529]"
            >
              Masuk Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
