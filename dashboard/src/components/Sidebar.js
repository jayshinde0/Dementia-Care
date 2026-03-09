import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Bell, Settings, Menu, ChevronLeft, LogOut, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Patients', path: '/patients' },
    { icon: <Bell size={20} />, label: 'Alerts', path: '/alerts' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen sticky top-0 left-0 p-4 border-r border-slate-200/50 bg-white/40 backdrop-blur-2xl z-40 hidden md:flex flex-col"
    >
      <div className="flex flex-col h-full bg-white/50 backdrop-blur-xl rounded-[2rem] shadow-sm border border-white/60 p-4 relative overflow-hidden">
        
        {/* Decorative blur in the background of the sidebar */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/10 blur-[40px] rounded-full -z-10 mix-blend-multiply pointer-events-none"></div>

        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div className="flex items-center space-x-2 px-2 overflow-hidden whitespace-nowrap">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-widget flex-shrink-0">
                <span className="text-white font-bold text-lg leading-none">+</span>
              </div>
              <span className="font-bold text-slate-800 text-lg tracking-tight">CareHub</span>
            </div>
          )}
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-white/80 transition-all ${isCollapsed ? 'mx-auto' : ''}`}
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center space-x-3 px-3 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden group
                ${isActive ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'}
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  {/* Active highlight background */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
                    />
                  )}
                  {/* Active line indicator */}
                  {isActive && !isCollapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full"></div>
                  )}

                  <span className={`relative z-10 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-700'}`}>
                    {item.icon}
                  </span>
                  
                  {!isCollapsed && (
                    <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto space-y-2">
           <button 
              onClick={() => window.location.href = 'http://localhost:3001'}
              className={`w-full flex items-center px-3 py-3 rounded-2xl transition-all duration-300 text-slate-500 hover:text-primary hover:bg-primary/5 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
              title={isCollapsed ? "Back to Landing Page" : undefined}
           >
              <Home size={20} />
              {!isCollapsed && <span className="whitespace-nowrap font-medium">Back to Home</span>}
           </button>
           
           <button 
              onClick={handleLogout}
              className={`w-full flex items-center px-3 py-3 rounded-2xl transition-all duration-300 text-slate-500 hover:text-alert hover:bg-alert/5 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
              title={isCollapsed ? "Logout" : undefined}
           >
              <LogOut size={20} />
              {!isCollapsed && <span className="whitespace-nowrap font-medium">Logout</span>}
           </button>
        </div>

        {/* Profile Info */}
        {!isCollapsed && (
          <div className="mt-4 p-4 bg-white/60 rounded-2xl border border-white/40 flex items-center space-x-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-accent-light border border-white shadow-sm flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-sm">{(localStorage.getItem('userName') || 'DC').charAt(0)}</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-900 truncate">{localStorage.getItem('userName') || 'Dr. Carter'}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{localStorage.getItem('userRole') || 'Attending'}</p>
            </div>
          </div>
         )}
         
         {isCollapsed && (
            <div className="mt-4 mx-auto w-10 h-10 rounded-full bg-accent-light border border-white shadow-sm flex items-center justify-center flex-shrink-0 cursor-pointer">
               <span className="text-primary font-bold text-sm">{(localStorage.getItem('userName') || 'DC').charAt(0)}</span>
             </div>
         )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
