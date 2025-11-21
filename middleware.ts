import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simulasi pengecekan role - nanti ganti dengan logic autentikasi real (JWT, session, dll)
function getUserRole(request: NextRequest): string | null {
  // Ambil role dari cookie atau header
  const role = request.cookies.get('user_role')?.value;
  return role || null;
}

function isAuthenticated(request: NextRequest): boolean {
  // Cek apakah user sudah login (dari cookie/token)
  const token = request.cookies.get('auth_token')?.value;
  return !!token;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Jika mengakses halaman dashboard
  if (pathname.startsWith('/dashboard')) {
    // Cek apakah user sudah login
    if (!isAuthenticated(request)) {
      // Redirect ke login jika belum login
      const loginUrl = new URL('/masuk', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = getUserRole(request);

    // Proteksi route dashboard contributor
    if (pathname.startsWith('/dashboard/contributor')) {
      if (role !== 'contributor' && role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard/unauthorized', request.url));
      }
    }

    // Proteksi route dashboard admin
    if (pathname.startsWith('/dashboard/admin')) {
      if (role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard/unauthorized', request.url));
      }
    }

    // Proteksi route dashboard petugas
    if (pathname.startsWith('/dashboard/petugas')) {
      if (role !== 'petugas' && role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard/unauthorized', request.url));
      }
    }

    // Redirect dari /dashboard ke dashboard sesuai role
    if (pathname === '/dashboard') {
      if (role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
      } else if (role === 'contributor') {
        return NextResponse.redirect(new URL('/dashboard/contributor', request.url));
      } else if (role === 'petugas') {
        return NextResponse.redirect(new URL('/dashboard/petugas', request.url));
      }
    }
  }

  return NextResponse.next();
}

// Konfigurasi matcher untuk menentukan route mana yang akan di-intercept
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};
