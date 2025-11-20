'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row" style={{background: '#F8F5F1'}}>
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-[448px]">
          <div className="mb-[72px]">
            <h1 className="text-2xl font-bold leading-8 text-[#333333]">
              Lokallens
            </h1>
          </div>

          <div className="mb-8 space-y-2">
            <h2 className="text-4xl font-bold leading-10 tracking-[-0.9px] text-[#333333]">
              Selamat Datang Kembali
            </h2>
            <p className="text-base leading-6 text-[#5E5E5E]">
              Masuk ke akun Anda untuk melanjutkan perjalanan budaya.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium leading-[21px] text-[#333333]">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full rounded-2xl border border-[#D1D5DB] bg-white px-[17px] py-[9px] text-base text-gray-900 placeholder:text-[#9CA3AF] focus:border-[#A94438] focus:outline-none focus:ring-1 focus:ring-[#A94438]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-[21px] text-[#333333]">
                  Kata Sandi
                </label>
                <Link 
                  href="/lupa-kata-sandi" 
                  className="text-sm leading-[21px] text-[#5E5E5E] underline hover:text-[#333333]"
                >
                  Lupa Kata Sandi?
                </Link>
              </div>
              <div className="relative flex items-stretch">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="flex-1 rounded-l-2xl border border-[#D1D5DB] bg-white px-[13px] py-[14px] text-base text-gray-900 placeholder:text-[#9CA3AF] focus:border-[#A94438] focus:outline-none focus:ring-1 focus:ring-[#A94438] focus:z-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center justify-center rounded-r-2xl border border-l-0 border-[#D1D5DB] bg-white px-[13px] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#A94438]"
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
                      d="M15.9962 15.2639L14.5865 13.8542C14.7323 13.0926 14.5136 12.3796 13.9303 11.7153C13.3469 11.0509 12.5935 10.7917 11.6698 10.9375L10.2601 9.52776C10.5356 9.39813 10.8151 9.30091 11.0987 9.2361C11.3822 9.17128 11.686 9.13888 12.0101 9.13888C13.2254 9.13888 14.2584 9.56422 15.1091 10.4149C15.9598 11.2656 16.3851 12.2986 16.3851 13.5139C16.3851 13.8379 16.3527 14.1418 16.2879 14.4253C16.2231 14.7089 16.1259 14.9884 15.9962 15.2639ZM19.1073 18.3264L17.6976 16.9653C18.3134 16.4954 18.8602 15.9809 19.3382 15.4219C19.8163 14.8628 20.2254 14.2268 20.5657 13.5139C19.7555 11.8773 18.5929 10.577 17.0778 9.61283C15.5628 8.64871 13.8735 8.16665 12.0101 8.16665C11.5402 8.16665 11.0784 8.19906 10.6247 8.26388C10.171 8.32869 9.7254 8.42591 9.2879 8.55554L7.78095 7.0486C8.4453 6.77313 9.12586 6.56654 9.82262 6.42881C10.5194 6.29107 11.2485 6.22221 12.0101 6.22221C14.4569 6.22221 16.6363 6.89871 18.5483 8.25172C20.4604 9.60473 21.8458 11.3588 22.7046 13.5139C22.3319 14.4699 21.8417 15.357 21.2341 16.1753C20.6264 16.9936 19.9175 17.7106 19.1073 18.3264ZM19.5935 24.3055L15.5101 20.2708C14.943 20.4491 14.3718 20.5827 13.7966 20.6719C13.2213 20.761 12.6259 20.8055 12.0101 20.8055C9.56336 20.8055 7.38396 20.129 5.47192 18.776C3.55989 17.423 2.17447 15.669 1.31567 13.5139C1.65595 12.6551 2.08535 11.857 2.60387 11.1198C3.12239 10.3825 3.71382 9.72221 4.37817 9.13888L1.70456 6.41665L3.06567 5.05554L20.9546 22.9444L19.5935 24.3055ZM5.73928 10.5C5.26938 10.9213 4.83998 11.3831 4.45109 11.8854C4.0622 12.3877 3.73003 12.9305 3.45456 13.5139C4.26475 15.1504 5.42736 16.4508 6.94241 17.4149C8.45746 18.379 10.1467 18.8611 12.0101 18.8611C12.3342 18.8611 12.6502 18.8408 12.958 18.8003C13.2659 18.7598 13.5819 18.7153 13.906 18.6667L13.031 17.743C12.8527 17.7917 12.6826 17.8281 12.5205 17.8524C12.3585 17.8767 12.1884 17.8889 12.0101 17.8889C10.7948 17.8889 9.76185 17.4635 8.91116 16.6128C8.06047 15.7621 7.63512 14.7292 7.63512 13.5139C7.63512 13.3356 7.64727 13.1655 7.67158 13.0035C7.69588 12.8414 7.73234 12.6713 7.78095 12.493L5.73928 10.5Z"
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
              Masuk
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-0 text-center text-sm leading-5">
            <span className="text-[#5E5E5E]">Belum punya akun? </span>
            <Link 
              href="/daftar" 
              className="ms-1 font-bold text-[#A94438] underline hover:text-[#8B3529]"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden flex-1 lg:flex">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div 
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background: 'linear-gradient(0deg, rgba(169, 68, 56, 0.50) 0%, rgba(243, 185, 95, 0.30) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative flex flex-1 flex-col justify-end p-12">
          <blockquote className="text-2xl font-semibold italic leading-8 text-white">
            "Budaya adalah jembatan yang menghubungkan masa lalu, masa kini, dan masa depan."
          </blockquote>
        </div>
      </div>
    </div>
  );
}
