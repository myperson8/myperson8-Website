
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { SETTINGS } from './settings';
import Header from './components/Header';
import GitHubSection from './components/GitHubSection';
import YouTubeSection from './components/YouTubeSection';
import TwitchSection from './components/TwitchSection';
import TwitterSection from './components/TwitterSection';
import DiscordSection from './components/DiscordSection';
import Footer from './components/Footer';

// --- Auth Context ---
interface UserProfile {
  username: string;
  avatar: string;
  id?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (userData: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// --- Components ---

const Home: React.FC = () => {
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== SETTINGS.profile.fallbackAvatarUrl) {
      target.src = SETTINGS.profile.fallbackAvatarUrl;
    } else {
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
          <a href={SETTINGS.socials.github.url} target="_blank" rel="noreferrer" className="group px-10 py-5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all rounded-[2rem] font-black border-2 border-slate-200 dark:border-slate-700 shadow-2xl flex items-center gap-4 text-xl active:scale-95">
            <svg className="w-8 h-8 group-hover:rotate-12 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a href={SETTINGS.socials.youtube.url} target="_blank" rel="noreferrer" className="group px-10 py-5 bg-red-600 hover:bg-red-500 text-white transition-all rounded-[2rem] font-black shadow-2xl flex items-center gap-4 text-xl active:scale-95">
            <svg className="w-8 h-8 group-hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            YouTube
          </a>
        </div>
      </section>

      {/* Grid Display for Dashboard Feel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <GitHubSection limit={4} />
        <TwitchSection />
      </div>

      <TwitterSection />
      <DiscordSection />
      <YouTubeSection />
    </div>
  );
};

const LoginRedirect: React.FC = () => {
  useEffect(() => {
    // Standard OAuth2 URL with scope for identity
    const discordUrl = `https://discord.com/oauth2/authorize?client_id=1459026164323586058&response_type=code&redirect_uri=https%3A%2F%2Fmyperson8.vercel.app%2Fauthorising&scope=email%20identify`;
    window.location.href = discordUrl;
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-xl font-bold">Redirecting to Discord...</p>
    </div>
  );
};

const Authorising: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      // Logic for capturing the code and setting the user state
      // In a real environment, you'd exchange this code for an access token on a backend.
      // Here, we simulate the success by populating the profile from the "authorized" code.
      setTimeout(() => {
        const mockProfile: UserProfile = {
          username: "myperson8_fan",
          avatar: "https://cdn.discordapp.com/embed/avatars/2.png",
          id: "12345678"
        };
        login(mockProfile);
        navigate('/home', { replace: true });
      }, 1200);
    } else {
      navigate('/home', { replace: true });
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 bg-[#5865F2] rounded-2xl flex items-center justify-center mb-6 animate-bounce shadow-2xl shadow-indigo-500/20">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
      </div>
      <h2 className="text-3xl font-black mb-2">Authorising...</h2>
      <p className="text-slate-500 font-medium">Connecting your Discord account</p>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('discord_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('discord_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('discord_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-50 selection:bg-blue-600/30 transition-colors duration-500">
          <Header />
          <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
            <Routes>
              {/* Essential Home Redirection */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              
              {/* Essential Logic Routes */}
              <Route path="/login" element={<LoginRedirect />} />
              <Route path="/authorising" element={<Authorising />} />
              
              {/* Essential Social Pages (Restored) */}
              <Route path="/github" element={<div className="max-w-4xl mx-auto"><GitHubSection /></div>} />
              <Route path="/youtube" element={<YouTubeSection />} />
              <Route path="/twitch" element={<div className="max-w-xl mx-auto"><TwitchSection /></div>} />
              <Route path="/twitter" element={<TwitterSection />} />
              <Route path="/discord" element={<DiscordSection />} />
              
              {/* Case-insensitive aliases (Optional but helpful) */}
              <Route path="/GitHub" element={<Navigate to="/github" replace />} />
              <Route path="/YouTube" element={<Navigate to="/youtube" replace />} />

              {/* Catch-all: Redirect any "wrong" paths to home */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
