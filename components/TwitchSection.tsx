
import React from 'react';
import { SETTINGS } from '../settings';

const TwitchSection: React.FC = () => {
  const { username, isLive, url } = SETTINGS.socials.twitch;
  const hasTwitch = !!username && username !== "";

  return (
    <section className="glass-card p-8 rounded-2xl flex flex-col h-full transition-all duration-300 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <svg className="w-8 h-8 text-purple-600 dark:text-purple-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
          </svg>
          Twitch Status
        </h2>
        {hasTwitch && (
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-200 dark:bg-slate-900/50 rounded-full border border-slate-300 dark:border-slate-700">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-slate-400 dark:bg-slate-500'}`}></span>
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
              {isLive ? 'Live' : 'Offline'}
            </span>
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col items-center justify-center py-10 px-6 text-center">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full"></div>
          <div className="relative bg-white dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
             <svg className="w-16 h-16 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
             </svg>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">
          {hasTwitch ? `@${username}` : 'No Stream Configured'}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs mb-8">
          The live player is disabled on this site to optimize performance. Visit the channel directly to join the chat and watch the stream.
        </p>

        {hasTwitch ? (
          <a 
            href={url} 
            target="_blank" 
            rel="noreferrer"
            className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Visit Twitch Channel
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        ) : (
          <div className="text-slate-400 dark:text-slate-600 text-sm font-medium italic">Empty</div>
        )}
      </div>
    </section>
  );
};

export default TwitchSection;