
import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Users, MessageCircle, Settings, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItem = {
  path: string;
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    path: '/profiles',
    label: 'Profiles',
    icon: Users,
  },
  {
    path: '/dialogs',
    label: 'Dialogs',
    icon: MessageCircle,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: Settings,
  },
  {
    path: '/biz-agent',
    label: 'BizAgent',
    icon: Bot,
  },
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-gray-900 text-white transition-all duration-300",
          isSidebarOpen ? "w-44" : "w-16"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
          <h1 className={cn("font-bold text-lg", !isSidebarOpen && "hidden")}>Dashboard</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            )}
          </Button>
        </div>
        <nav className="py-4">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center py-2 px-3 rounded-md transition-colors",
                      isActive 
                        ? "bg-gray-800 text-white" 
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isSidebarOpen ? "ml-44" : "ml-16"
      )}>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
