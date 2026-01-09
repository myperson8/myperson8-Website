
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SETTINGS } from '../settings';

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme from document class
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
    { id: '', label: 'Home' },
    { id: 'github', label: 'GitHub' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'twitch', label: 'Twitch' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'discord', label: 'Discord' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
      isActive
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 active:scale-95'
        : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link 
          to="/"
          className="text-2xl font-bold hover:opacity-80 transition flex items-center gap-2"
        >
          <img 
            src={SETTINGS.profile.avatarUrl} 
            onError={handleLogoError}
            className="w-10 h-10 rounded-xl shadow-lg border-2 border-white dark:border-slate-700 object-cover"
            alt="Logo"
          />
          <span>myperson8</span>
        </Link>
        
        <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={`/${tab.id}`}
              className={linkClass}
            >
              {tab.label}
            </NavLink>
          ))}
          
          <button
            onClick={toggleTheme}
            className="ml-2 p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
