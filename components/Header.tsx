
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SETTINGS } from '../settings';
import { useAuth } from '../App';

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== SETTINGS.profile.fallbackAvatarUrl) {
      target.src = SETTINGS.profile.fallbackAvatarUrl;
    }
  };

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'github', label: 'GitHub' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'twitch', label: 'Twitch' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'discord', label: 'Discord' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `px-4 py-2 rounded-xl text-sm font-bold transition-all ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
        : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/home" className="text-2xl font-black hover:opacity-80 transition flex items-center gap-3 group">
          <img 
            src={SETTINGS.profile.avatarUrl} 
            onError={handleLogoError}
            className="w-10 h-10 rounded-xl shadow-lg border-2 border-white dark:border-slate-700 object-cover group-hover:scale-105 transition"
            alt="Logo"
          />
          <span className="tracking-tighter">myperson8</span>
        </Link>
        
        <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
          {tabs.map((tab) => (
            <NavLink key={tab.id} to={`/${tab.id}`} className={linkClass}>
              {tab.label}
            </NavLink>
          ))}
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

          {/* Discord User Profile Section */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800/80 p-1.5 pr-1.5 pl-3 rounded-2xl border border-slate-200 dark:border-slate-700 group relative">
                <span className="text-xs font-black text-slate-700 dark:text-slate-200 truncate max-w-[120px]">
                  {user.username}
                </span>
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="w-8 h-8 rounded-xl shadow-md border border-white dark:border-slate-600"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.username}&background=5865F2&color=fff`;
                  }}
                />
                
                {/* Logout Tooltip */}
                <button 
                  onClick={logout}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-red-600 text-white text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition shadow-xl whitespace-nowrap z-[100] active:scale-95"
                >
                  Logout Session
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-black rounded-xl transition shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                Sign In
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
