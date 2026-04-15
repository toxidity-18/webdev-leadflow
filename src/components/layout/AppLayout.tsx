import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Toaster } from '@/components/ui/sonner';

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear session
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuToggle={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
};

export default AppLayout;