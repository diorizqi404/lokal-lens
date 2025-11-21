import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/lib/auth/AuthContext";

export const metadata: Metadata = {
  title: "LokalLens - Platform Budaya Indonesia",
  description: "Platform digital untuk melestarikan dan berbagi kekayaan budaya Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
