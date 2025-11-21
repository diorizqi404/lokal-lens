'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Register form state
  const [fullName, setFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerIsLoading, setRegisterIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Login gagal. Periksa email dan password Anda.');
        return;
      }

      const { user, token } = await response.json();

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      document.cookie = `user_role=${user.role}; path=/`;
      document.cookie = `auth_token=${token}; path=/`;

      if (user.role === 'admin') {
        window.location.href = '/dashboard/admin';
      } else if (user.role === 'officer') {
        window.location.href = '/dashboard/petugas';
      } else if (user.role === 'contributor') {
        window.location.href = '/dashboard/contributor';
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError('Login gagal. Periksa email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setRegisterError(data.error || 'Pendaftaran gagal. Silakan coba lagi.');
        return;
      }

      const { user, token } = await response.json();

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      document.cookie = `user_role=${user.role}; path=/`;
      document.cookie = `user_full_name=${user.full_name}; path=/`;
      document.cookie = `auth_token=${token}; path=/`;

      setFullName('');
      setRegisterEmail('');
      setRegisterPassword('');

      if (user.role === 'admin') {
        router.push('/masuk');
      } else if (user.role === 'officer') {
        router.push('/masuk');
      } else if (user.role === 'contributor') {
        router.push('/masuk');
      } else {
        router.push('/masuk');
      }

      setIsLogin(true);
    } catch (err) {
      setRegisterError('Pendaftaran gagal. Silakan coba lagi.');
    } finally {
      setRegisterIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setRegisterError('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const formVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { x: -100, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }
  };

  const imageVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { x: 100, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row overflow-hidden" style={{background: '#F8F5F1'}}>
      {/* Image Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login-image' : 'register-image'}
          className="relative hidden flex-1 lg:flex"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: isLogin 
                ? "url('https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop')"
                : "url('https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop')",
            }}
          />
          <div 
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background: isLogin
                ? 'linear-gradient(0deg, rgba(169, 68, 56, 0.50) 0%, rgba(243, 185, 95, 0.30) 100%)'
                : 'linear-gradient(0deg, rgba(0, 108, 132, 0.50) 0%, rgba(212, 160, 23, 0.30) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative flex flex-1 flex-col justify-end p-12">
            <blockquote className="text-2xl font-semibold italic leading-8 text-white">
              {isLogin 
                ? '"Budaya adalah jembatan yang menghubungkan masa lalu, masa kini, dan masa depan."'
                : '"Nusantara adalah mozaik budaya yang tak ternilai, setiap kepingnya adalah warisan yang harus kita jaga."'
              }
            </blockquote>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Form Section */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login-form' : 'register-form'}
            className="w-full max-w-[448px]"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mb-[72px]">
              <h1 className="text-2xl font-bold leading-8 text-[#333333]">
                Lokallens
              </h1>
            </div>

            {isLogin ? (
              // Login Form
              <>
                <div className="mb-8 space-y-2">
                  <h2 className="text-4xl font-bold leading-10 tracking-[-0.9px] text-[#333333]">
                    Selamat Datang Kembali
                  </h2>
                  <p className="text-base leading-6 text-[#5E5E5E]">
                    Masuk ke akun Anda untuk melanjutkan perjalanan budaya.
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-6">
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
                            d="M15.9962 15.2639L14.5865 13.8542C14.7323 13.0926 14.5136 12.3796 13.9303 11.7153C13.3469 11.0509 12.5935 10.7917 11.6698 10.9375L10.2601 9.52776C10.5356 9.39813 10.8151 9.30091 11.0987 9.2361C11.3822 9.17128 11.686 9.13888 12.0101 9.13888C13.2254 9.13888 14.2584 9.56422 15.1091 10.4149C15.9598 11.2656 16.3851 12.2986 16.3851 13.5139C16.3851 13.8379 16.3527 14.1418 16.2879 14.4253C16.2231 14.7089 16.1259 14.9884 15.9962 15.2639ZM19.1073 18.3264L17.6976 16.9653C18.3134 16.4954 18.8602 15.9809 19.3382 15.4219C19.8163 14.8628 20.2254 14.2268 20.5657 13.5139C19.7555 11.8773 18.5929 10.577 17.0778 9.61283C15.5628 8.64871 13.8735 8.16665 12.0101 8.16665C11.5402 8.16665 11.0784 8.19906 10.6247 8.26388C10.171 8.32869 9.7254 8.42591 9.2879 8.55554L7.78095 7.0486C8.4453 6.77313 9.12586 6.56654 9.82262 6.42881C10.5194 6.29107 11.2485 6.22221 12.0101 6.22221C14.4569 6.22221 16.6363 6.89871 18.5483 8.25172C20.4604 9.60473 21.8458 11.3588 22.7046 13.5139C22.3319 14.4699 21.8417 15.357 21.2341 16.1753C20.6264 16.9936 19.9175 17.7106 19.1073 18.3264ZM19.5935 24.3055L15.5101 20.2708C14.943 20.4491 14.3718 20.5827 13.7966 20.6719C13.2213 20.761 12.6259 20.8055 12.0101 20.8055C9.56336 20.8055 7.38396 20.129 5.47192 18.776C3.55989 17.423 2.17447 15.669 1.31567 13.5139C1.65595 12.6551 2.08535 11.857 2.60387 11.1198C3.12239 10.3825 3.71382 9.72221 4.37817 9.13888L1.70456 6.41665L3.06567 5.05554L20.9546 22.9444L19.5935 24.3055ZM5.73928 10.5C5.26938 10.9213 4.83998 11.3831 4.45109 11.8855C4.0622 12.3878 3.71364 12.9251 3.40541 13.4972C4.21558 15.1337 5.37816 16.434 6.89311 17.3982C8.40807 18.3623 10.0973 18.8443 12.01 18.8443C12.4799 18.8443 12.9417 18.8119 13.3955 18.7471C13.8492 18.6823 14.2947 18.585 14.7323 18.4554L13.2254 17.0486C12.8205 17.1223 12.4084 17.1591 11.9891 17.1591C10.7739 17.1591 9.74088 16.7338 8.89011 15.883C8.03933 15.0323 7.61394 14.0005 7.61394 12.7873C7.61394 12.3849 7.64634 11.9979 7.71116 11.6263C7.77597 11.2548 7.87319 10.9004 8.0029 10.5631C7.35855 10.5178 6.73786 10.5296 6.14082 10.5984C5.54378 10.6671 4.97646 10.8038 4.43888 11.0084C4.71435 10.5719 5.01763 10.1314 5.34871 9.68688C5.6798 9.24232 6.03836 8.8375 6.42426 8.47244C6.2278 8.39879 6.03561 8.33865 5.84769 8.29203C5.65978 8.24541 5.46543 8.21706 5.26467 8.20699C5.16077 8.30422 5.00096 8.52575 4.78523 8.87257C4.56949 9.21938 4.35709 9.60906 4.14805 10.0416C3.93901 10.4741 3.76126 10.8654 3.62482 11.2156C3.48839 11.5658 3.40541 11.8408 3.37593 12.0402C3.34644 12.2397 3.33169 12.3939 3.33169 12.503C3.33169 12.7024 3.35618 12.9216 3.40541 13.1606C3.45463 13.3995 3.51779 13.6451 3.59486 13.8973ZM9.71933 5.8916C10.3236 5.78768 10.9563 5.73572 11.6172 5.73572C11.0651 5.39544 10.6042 4.96605 10.2346 4.44753C9.86501 3.92902 9.68722 3.32533 9.70122 2.63648C9.47946 2.87503 9.25005 3.10653 9.01298 3.33097C8.7759 3.55541 8.56592 3.76539 8.38306 3.96091C8.20019 4.15643 8.04721 4.33084 7.92413 4.48415C7.80104 4.63745 7.71116 4.76233 7.6545 4.8688C7.53141 5.08089 7.44629 5.25172 7.39914 5.38129C7.35198 5.51086 7.33842 5.63041 7.35844 5.73993C7.37845 5.84945 7.43161 5.94833 7.51791 6.03647C7.60421 6.12462 7.77598 6.20832 8.03321 6.28767C8.29044 6.36701 8.66827 6.42718 9.16669 6.46815C9.66511 6.50912 10.1841 6.53008 10.7231 6.53104C10.2369 6.15916 9.86501 5.73572 9.61614 5.26071C9.36727 4.7857 9.29311 4.26886 9.39368 3.71019C9.26411 3.85316 9.14292 4.0169 9.03013 4.20137C8.91734 4.38585 8.82227 4.57893 8.74493 4.78063C8.66759 4.98232 8.60675 5.18401 8.5624 5.3857C8.51806 5.58739 8.49003 5.73995 8.47831 5.84336C8.88721 5.84945 9.29435 5.86609 9.69973 5.89327C10.1051 5.92045 10.4161 5.91944 10.633 5.89023C10.1991 5.85578 9.88239 5.79227 9.68364 5.70969C9.48488 5.62712 9.35193 5.52227 9.28479 5.39514C9.21765 5.268 9.20908 5.12088 9.25907 4.94376C9.30906 4.76665 9.41864 4.57212 9.5879 4.36017C9.75716 4.14822 9.97555 3.92834 10.2431 3.70051C10.5107 3.47268 10.8115 3.25356 11.1454 3.04314C11.4794 2.83273 11.8183 2.64529 12.1622 2.48082C12.506 2.31635 12.8206 2.18854 13.1061 2.09738C13.3915 2.00621 13.6137 1.96064 13.7726 1.96064C13.7405 2.17275 13.6788 2.46903 13.5873 2.84951C13.4958 3.22998 13.4044 3.59654 13.3129 3.9492C13.2214 4.30185 13.1626 4.60447 13.1366 4.85705C13.1106 5.10963 13.1264 5.2852 13.1841 5.38375C13.2417 5.4823 13.3564 5.51854 13.528 5.49246C13.6996 5.46638 13.952 5.35872 14.2852 5.16948C14.6185 4.98024 14.9858 4.70819 15.3871 4.35333C15.7885 3.99848 16.1699 3.53827 16.5314 2.97272C16.8929 2.40717 17.1893 1.72329 17.4206 0.921076C17.0965 1.11319 16.7504 1.33599 16.3823 1.59448C16.0142 1.85296 15.6624 2.13087 15.327 2.42819C14.9916 2.72552 14.6885 3.02699 14.4178 3.3326C14.147 3.6382 13.9364 3.91626 13.7859 4.16678C13.6354 4.41731 13.5526 4.61519 13.5375 4.76041C13.5224 4.90563 13.5926 4.96937 13.7481 4.95162C13.6275 4.77802 13.5348 4.57283 13.4699 4.33604C13.4049 4.09925 13.3723 3.82929 13.3723 3.52615C13.3723 3.05114 13.4313 2.54433 13.5494 2.00572C13.6674 1.46712 13.8285 0.912344 14.0326 0.334905C14.1007 0.151786 14.1933 0 14.3104 -0.120297C14.3104 0.0874066 14.2983 0.328832 14.2742 0.648338C14.2501 0.967844 14.2138 1.33433 14.1654 1.74758C14.1169 2.16082 14.0621 2.58876 14.001 3.03139C13.9398 3.47401 13.8875 3.89421 13.8442 4.29199C13.8008 4.68976 13.7754 5.04199 13.768 5.34867C13.7606 5.65535 13.7894 5.88098 13.8544 6.02554C13.9195 6.17011 14.034 6.18644 14.1979 6.07453C14.3618 5.96263 14.5695 5.78106 14.8211 5.52982C15.0727 5.27859 15.3396 4.94881 15.6219 4.54047C15.9043 4.13214 16.1771 3.62904 16.4403 3.03119C16.7035 2.43334 16.8919 1.74759 16.9956 0.973926C16.5942 1.59298 16.1525 2.16629 15.6703 2.69388C15.1882 3.22147 14.6888 3.68227 14.1722 4.07629C13.6555 4.4703 13.1549 4.76336 12.6704 4.95545C12.186 5.14754 11.7717 5.2097 11.4276 5.14192C11.1892 5.10093 11.0228 5.03141 10.9282 4.93336C10.8336 4.83531 10.8312 4.70922 10.9211 4.5551C11.0109 4.40099 11.1883 4.19398 11.4533 3.93409C11.7184 3.67419 11.9741 3.42099 12.2207 3.17449C12.4673 2.928 12.6755 2.71549 12.8455 2.53697C13.0154 2.35845 13.1286 2.23897 13.1851 2.17852C13.2416 2.11808 13.2602 2.09276 13.2409 2.10256C13.2215 2.11237 13.1588 2.15909 13.0527 2.24273C12.9467 2.32636 12.7975 2.44689 12.6052 2.60432C12.4128 2.76175 12.1919 2.9633 11.9424 3.20897C11.693 3.45464 11.4328 3.71019 11.1618 3.97564C10.8909 4.2411 10.6424 4.49048 10.4164 4.72377C10.1903 4.95707 10.0221 5.14306 9.91175 5.28174C9.80138 5.42042 9.78423 5.47677 9.86029 5.45079C9.93634 5.42481 10.1128 5.35606 10.3898 5.24455C10.6667 5.13305 11.0038 5.00077 11.4013 4.84772C11.7987 4.69466 12.2358 4.54784 12.7125 4.40724C13.1892 4.26665 13.6657 4.15815 14.1419 4.08173C14.6181 4.00531 15.066 4.00531 15.4854 4.08173C15.9049 4.15815 16.2607 4.31488 16.5528 4.55191C16.845 4.78895 17.0384 5.11269 17.133 5.52312C17.2277 5.93355 17.2087 6.43633 17.076 7.03144C16.9434 7.62656 16.6966 8.2988 16.3358 9.04815C15.9751 9.7975 15.5089 10.6022 14.9375 11.4621C14.3661 12.322 13.7128 13.1096 12.9776 13.8251C12.2425 14.5405 11.4571 15.1418 10.6214 15.6289C9.78563 16.116 8.94387 16.4725 8.0961 16.6985C7.24833 16.9245 6.43487 17.0218 5.65573 16.9904C4.87659 16.959 4.18299 16.8077 3.57496 16.5365C2.96692 16.2653 2.48906 15.8974 2.14137 15.4327C1.79369 14.968 1.59788 14.4221 1.55394 13.795C1.5 13.1679 1.61968 12.4929 1.91308 11.77C2.20649 11.0471 2.64356 10.3243 3.22429 9.60161C3.80502 8.87885 4.47772 8.20913 5.24239 7.59246C5.96449 6.99837 6.74364 6.45087 7.57983 5.94997C8.41602 5.44908 9.27394 5.05173 10.1536 4.75793C10.9142 4.51778 11.6455 4.35846 12.3475 4.28003C12.5771 4.26023 12.8196 4.24532 13.075 4.23532C13.33 4.22532 13.5792 4.21932 13.8224 4.21732C13.7162 4.08759 13.6062 3.91627 13.4922 3.70337C13.3783 3.49047 13.2754 3.24893 13.1836 2.97876C13.0917 2.70859 13.0197 2.41266 12.9677 2.09098C12.9156 1.76929 12.8835 1.44051 12.8714 1.10464C12.9634 1.48511 13.0764 1.81626 13.2106 2.09809C13.3447 2.37992 13.5023 2.6323 13.6833 2.85522C13.8644 3.07814 14.0835 3.28085 14.3407 3.46334C14.5979 3.64583 14.9125 3.82297 15.2844 3.99478C15.6563 4.16659 16.1108 4.3645 16.6479 4.58852C17.185 4.81253 17.8045 5.08886 18.5066 5.4175C19.2087 5.74615 19.9889 6.14951 20.8473 6.62758C21.7056 7.10565 22.6164 7.67304 23.5796 8.32975C24.5428 8.98646 25.5098 9.74705 26.4805 10.6115C27.4512 11.4761 28.3741 12.4544 29.2492 13.5464C29.8225 14.3015 30.3415 15.0729 30.8062 15.8606C31.2709 16.6483 31.6663 17.4518 31.9923 18.2711C32.3183 19.0903 32.556 19.9098 32.7053 20.7296C32.8547 21.5495 32.9009 22.3539 32.8439 23.143C32.7869 23.932 32.6167 24.6983 32.3333 25.4419C32.05 26.1856 31.633 26.8898 31.0824 27.5556C30.5318 28.2214 29.8212 28.8319 28.9507 29.387C28.0802 29.942 26.9942 30.406 25.6927 30.7791C24.3913 31.1522 22.8569 31.4169 21.0894 31.5731C19.3219 31.7293 17.3159 31.7629 14.9676 31.5487Z"
                            fill="#5E5E5E"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-full bg-[#A94438] px-5 py-3 text-center text-base font-bold leading-6 tracking-[0.24px] text-white transition-colors hover:bg-[#8B3529] focus:outline-none focus:ring-2 focus:ring-[#A94438] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Memproses...' : 'Masuk'}
                  </button>
                </form>

                <div className="mt-8 flex items-center justify-center gap-0 text-center text-sm leading-5">
                  <span className="text-[#5E5E5E]">Belum punya akun? </span>
                  <button 
                    onClick={toggleAuthMode}
                    className="ms-1 font-bold text-[#A94438] underline hover:text-[#8B3529]"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </>
            ) : (
              // Register Form
              <>
                <div className="mb-8 space-y-2">
                  <h2 className="text-4xl font-bold leading-10 tracking-[-0.9px] text-[#1A1A1A]">
                    Daftarkan Akun Anda
                  </h2>
                  <p className="text-base leading-6 text-[#5E5E5E]">
                    Bergabunglah dengan kami untuk melestarikan kekayaan Nusantara.
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-6">
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
                    <label htmlFor="registerEmail" className="block text-sm font-medium leading-[21px] text-[#1A1A1A]">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      id="registerEmail"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="contoh@email.com"
                      className="w-full rounded-2xl border border-[#D1D5DB] bg-white px-[17px] py-[9px] text-base text-gray-900 placeholder:text-[#9CA3AF] focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline">
                      <label htmlFor="registerPassword" className="flex-1 text-sm font-medium leading-[21px] text-[#1A1A1A]">
                        Buat Kata Sandi
                      </label>
                    </div>
                    <div className="relative flex items-stretch">
                      <input
                        type={showRegisterPassword ? 'text' : 'password'}
                        id="registerPassword"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="Minimal 8 karakter"
                        className="flex-1 rounded-l-2xl border border-[#D1D5DB] bg-white px-[13px] py-[14px] text-base text-gray-900 placeholder:text-[#9CA3AF] focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red focus:z-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
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
                            d="M15.9961 15.264L14.5864 13.8543C14.7322 13.0927 14.5135 12.3797 13.9301 11.7154C13.3468 11.051 12.5933 10.7918 11.6697 10.9376L10.26 9.52789C10.5355 9.39826 10.815 9.30103 11.0985 9.23622C11.3821 9.1714 11.6859 9.139 12.01 9.139C13.2253 9.139 14.2583 9.56434 15.109 10.415C15.9596 11.2657 16.385 12.2987 16.385 13.514C16.385 13.8381 16.3526 14.1419 16.2878 14.4255C16.223 14.709 16.1257 14.9885 15.9961 15.264ZM19.1072 18.3265L17.6975 16.9654C18.3132 16.4955 18.8601 15.981 19.3381 15.422C19.8161 14.863 20.2253 14.227 20.5656 13.514C19.7554 11.8774 18.5928 10.5771 17.0777 9.61296C15.5627 8.64884 13.8734 8.16677 12.01 8.16677C11.5401 8.16677 11.0783 8.19918 10.6246 8.264C10.1709 8.32881 9.72527 8.42603 9.28777 8.55566L7.78083 7.04872C8.44518 6.77326 9.12574 6.56666 9.8225 6.42893C10.5193 6.2912 11.2484 6.22233 12.01 6.22233C14.4568 6.22233 16.6362 6.89883 18.5482 8.25184C20.4602 9.60485 21.8456 11.3589 22.7044 13.514C22.3318 14.47 21.8416 15.3572 21.234 16.1755C20.6263 16.9937 19.9174 17.7108 19.1072 18.3265ZM19.5933 24.3057L15.51 20.2709C14.9429 20.4492 14.3717 20.5829 13.7965 20.672C13.2212 20.7611 12.6257 20.8057 12.01 20.8057C9.56324 20.8057 7.38384 20.1292 5.4718 18.7762C3.55976 17.4231 2.17435 15.6691 1.31555 13.514C1.65583 12.6552 2.08523 11.8572 2.60375 11.1199C3.12226 10.3826 3.7137 9.72233 4.37805 9.139L1.70444 6.41677L3.06555 5.05566L20.9544 22.9446L19.5933 24.3057ZM5.73916 10.5001C5.26926 10.9214 4.83986 11.3832 4.45097 11.8855C4.06208 12.3878 3.76126 12.9251 3.54145 13.4972C4.35162 15.1337 5.51419 16.434 7.02915 17.3982C8.5441 18.3623 10.2334 18.8443 12.1461 18.8443C12.616 18.8443 13.0778 18.8119 13.5315 18.7471C13.9852 18.6823 14.4308 18.585 14.8683 18.4554L13.3614 17.0486C12.9565 17.1223 12.5444 17.1591 12.1251 17.1591C10.9099 17.1591 9.87685 16.7338 9.02608 15.883C8.1753 15.0323 7.74991 14.0005 7.74991 12.7873C7.74991 12.3849 7.78231 11.9979 7.84713 11.6263C7.91194 11.2548 8.00916 10.9004 8.13887 10.5631C7.49452 10.5178 6.87383 10.5296 6.27679 10.5984C5.67975 10.6671 5.11243 10.8038 4.57485 11.0084C4.85032 10.5719 5.1536 10.1314 5.48468 9.68688C5.81577 9.24232 6.17433 8.8375 6.56023 8.47244C6.36377 8.39879 6.17158 8.33865 5.98366 8.29203C5.79575 8.24541 5.6014 8.21706 5.40064 8.20699C5.29674 8.30422 5.13693 8.52575 4.9212 8.87257C4.70546 9.21938 4.49306 9.60906 4.28402 10.0416C4.07498 10.4741 3.89723 10.8654 3.76079 11.2156C3.62436 11.5658 3.54138 11.8408 3.5119 12.0402C3.48241 12.2397 3.46766 12.3939 3.46766 12.503C3.46766 12.7024 3.49215 12.9216 3.54138 13.1606C3.5906 13.3995 3.65376 13.6451 3.73083 13.8973Z"
                            fill="#5E5E5E"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {registerError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-600">{registerError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={registerIsLoading}
                    className="w-full rounded-full bg-[#A94438] px-5 py-3 text-center text-base font-bold leading-6 tracking-[0.24px] text-white transition-colors hover:bg-[#8B3529] focus:outline-none focus:ring-2 focus:ring-[#A94438] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {registerIsLoading ? 'Memproses...' : 'Daftar'}
                  </button>
                </form>

                <div className="mt-8 flex items-center justify-center gap-0 text-center text-sm leading-5">
                  <span className="text-[#5E5E5E]">Sudah punya akun? </span>
                  <button 
                    onClick={toggleAuthMode}
                    className="ms-1 font-bold text-[#A94438] underline hover:text-[#8B3529]"
                  >
                    Masuk Sekarang
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
