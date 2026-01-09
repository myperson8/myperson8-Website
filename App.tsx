
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SETTINGS } from './settings';
import Header from './components/Header';
import GitHubSection from './components/GitHubSection';
import YouTubeSection from './components/YouTubeSection';
import TwitchSection from './components/TwitchSection';
import TwitterSection from './components/TwitterSection';
import DiscordSection from './components/DiscordSection';
import Footer from './components/Footer';

const Home: React.FC = () => {
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    
    // First fallback to GitHub (highly reliable)
    if (target.src !== SETTINGS.profile.fallbackAvatarUrl) {
      target.src = SETTINGS.profile.fallbackAvatarUrl;
    } else {
      // Final fallback to UI Avatars if even GitHub is down (unlikely)
      target.src = `https://ui-avatars.com/api/?name=${SETTINGS.profile.displayName}&background=3b82f6&color=fff&size=200`;
    }
  };

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Hero Section */}
      <section className="text-center max-w-5xl mx-auto py-16">
        <div className="relative inline-block mb-12">
          <div className="absolute inset-0 bg-blue-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
          <img 
            src={SETTINGS.profile.avatarUrl} 
            alt={SETTINGS.profile.name} 
            className="relative w-48 h-48 rounded-[3rem] mx-auto border-[10px] border-white dark:border-slate-800 shadow-2xl object-cover bg-slate-200 dark:bg-slate-700 transition-all hover:scale-105 hover:-rotate-3 duration-500 cursor-pointer"
            onError={handleLogoError}
          />
        </div>
        <h1 className="text-8xl font-black mb-8 tracking-tighter leading-none">
          I'm <span className="gradient-text">{SETTINGS.profile.displayName}</span>
        </h1>
        <p className="text-3xl text-slate-600 dark:text-slate-400 mb-14 leading-relaxed font-medium max-w-3xl mx-auto">
          {SETTINGS.profile.bio}
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <a 
            href={SETTINGS.socials.github.url} 
            target="_blank" 
            rel="noreferrer"
            className="group px-10 py-5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all rounded-[2rem] font-black border-2 border-slate-200 dark:border-slate-700 shadow-2xl active:scale-95 flex items-center gap-4 text-xl"
          >
            <svg className="w-8 h-8 group-hover:rotate-12 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a 
            href={SETTINGS.socials.youtube.url} 
            target="_blank" 
            rel="noreferrer"
            className="group px-10 py-5 bg-red-600 hover:bg-red-500 text-white transition-all rounded-[2rem] font-black shadow-2xl shadow-red-900/30 active:scale-95 flex items-center gap-4 text-xl"
          >
            <svg className="w-8 h-8 group-hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            YouTube
          </a>
        </div>
      </section>

      {/* Grid Content for Home Tab */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <GitHubSection limit={4} />
        <TwitchSection />
      </div>

      {/* Dynamic YouTube Content (Auto-Detected) */}
      <YouTubeSection />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-50 selection:bg-blue-600/30 transition-colors duration-500">
        <Header />
        
        <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/github" element={<GitHubSection />} />
            <Route path="/youtube" element={<YouTubeSection />} />
            <Route path="/twitch" element={<TwitchSection />} />
            <Route path="/twitter" element={<TwitterSection />} />
            <Route path="/discord" element={<DiscordSection />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
