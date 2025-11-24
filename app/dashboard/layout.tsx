'use client';

import { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar (desktop inline, mobile overlay) */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <DashboardNavbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
