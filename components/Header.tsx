import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SETTINGS } from '../settings';
import { useAuth } from '../App';

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    { id: 'home', label: 'Home', path: '/home' },
    { id: 'github', label: 'GitHub', path: '/github' },
    { id: 'youtube', label: 'YouTube', path: '/youtube' },
    { id: 'twitch', label: 'Twitch', path: '/twitch' },
    { id: 'twitter', label: 'Twitter', path: '/twitter' },
    { id: 'discord', label: 'Discord', path: '/discord' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
        : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/home" className="flex items-center gap-3 group shrink-0">
          <img 
            src={SETTINGS.profile.avatarUrl}
            alt="Logo"
            className="w-10 h-10 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300"
            onError={handleLogoError}
          />
          <span className="text-xl font-black tracking-tighter hidden sm:block">
            myperson<span className="text-blue-600">8</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
          {tabs.map((tab) => (
            <NavLink key={tab.id} to={tab.path} className={linkClass}>
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4-9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.757 7.757l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all shadow-sm"
              >
                <img src={user.avatar} className="w-8 h-8 rounded-xl object-cover" alt="User" />
                <span className="text-sm font-black hidden md:block">{user.username}</span>
                <svg className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 glass-card rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logged in via</p>
                    <p className="text-xs font-bold capitalize text-blue-600">{user.provider}</p>
                  </div>
                  <button 
                    onClick={() => { logout(); setIsMenuOpen(false); navigate('/home'); }}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login"
              className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-black hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all shadow-lg active:scale-95 flex items-center gap-2 border border-slate-800 dark:border-slate-200"
            >
              Sign In
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;