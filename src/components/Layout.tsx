
import React, { useState } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Camera,
  Users,
  Database,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  File
} from "lucide-react";
import { toast } from 'sonner';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: <Database size={20} />, path: '/dashboard' },
    { name: 'Student Management', icon: <Users size={20} />, path: '/students' },
    { name: 'Train Photos', icon: <Camera size={20} />, path: '/train' },
    { name: 'Take Attendance', icon: <Calendar size={20} />, path: '/attendance' },
    { name: 'Attendance Reports', icon: <FileText size={20} />, path: '/reports' },
    { name: 'Developer', icon: <Settings size={20} />, path: '/developer' },
    { name: 'Help', icon: <HelpCircle size={20} />, path: '/help' },
  ];

  const handleLogout = () => {
    toast.info('Logged out successfully');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`bg-card shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b">
            <div className={`flex items-center space-x-2 ${!isSidebarOpen && 'hidden'}`}>
              <Camera className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">SmartAttend</span>
            </div>
            {!isSidebarOpen && <Camera className="h-6 w-6 text-primary mx-auto" />}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className={`${!isSidebarOpen && 'hidden'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={isSidebarOpen ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
              </svg>
            </Button>
          </div>

          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 py-3 px-3 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {item.icon}
                    {isSidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="w-full flex items-center justify-start"
            >
              <LogOut size={20} className="mr-2" />
              {isSidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-16 bg-card shadow-sm flex items-center px-6 sticky top-0 z-10">
          {!isSidebarOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="mr-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          )}
          <h1 className="text-xl font-semibold">
            {menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
          </h1>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
