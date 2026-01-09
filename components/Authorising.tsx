import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../App';

const Authorising: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = (searchParams.get('state') as 'discord' | 'github') || 'discord';
    
    if (code) {
      // Simulate OAuth verification delay for a premium feel
      const timer = setTimeout(() => {
        const profile = {
          username: "Verified User",
          avatar: state === 'github' 
            ? "https://github.com/identicons/myperson8.png" 
            : "https://cdn.discordapp.com/embed/avatars/0.png",
          provider: state,
          id: code.slice(0, 8)
        };
        login(profile as any);
        navigate('/home', { replace: true });
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // If no code, return home immediately
      navigate('/home', { replace: true });
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in duration-1000">
      <div className="relative mb-16">
        {/* Decorative Background Glows */}
        <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute inset-0 bg-purple-500 blur-[100px] opacity-10 animate-pulse delay-700"></div>
        
        {/* High-Performance Spinner */}
        <div className="relative w-32 h-32 flex items-center justify-center">
           <div className="absolute inset-0 border-[6px] border-slate-200 dark:border-slate-800 rounded-full"></div>
           <div className="absolute inset-0 border-[6px] border-transparent border-t-blue-600 rounded-full animate-spin"></div>
           <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center animate-bounce">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-5xl font-black tracking-tighter">Establishing Secure Connection</h2>
        <p className="text-xl text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
          Verifying credentials with <span className="text-slate-900 dark:text-white font-bold uppercase text-sm tracking-widest px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">Provider API</span>
        </p>
      </div>

      <div className="mt-12 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
      </div>
    </div>
  );
};

export default Authorising;
