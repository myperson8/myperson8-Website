
import React from 'react';
import { SETTINGS } from '../settings';

const TwitterSection: React.FC = () => {
  const { username, url, verified } = SETTINGS.socials.twitter;
  
  // We use unavatar.io for the profile image as it is highly cached and reliable
  const profileImage = `https://unavatar.io/twitter/${username}`;
  const displayName = SETTINGS.profile.displayName;

  return (
    <section className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <h2 className="text-5xl font-black flex items-center gap-5">
          <div className="bg-[#1d9bf0] p-4 rounded-[1.5rem] shadow-2xl shadow-blue-500/20">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
          X Profile
        </h2>
        
        <div className="flex items-center gap-4">
          <div className="px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Official Identity
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Minimalist X Card */}
        <div className="glass-card rounded-[3.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] group">
          
          {/* Cover Area */}
          <div className="h-48 bg-gradient-to-r from-[#1d9bf0] to-[#0f172a] relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Profile Content */}
          <div className="px-14 pb-14 relative text-center md:text-left">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between -mt-20 gap-8">
              {/* Avatar */}
              <div className="relative inline-block mx-auto md:mx-0">
                <div className="p-2 bg-white dark:bg-[#0f172a] rounded-full shadow-2xl transition-transform group-hover:scale-105 duration-500">
                  <img 
                    src={profileImage} 
                    alt={username}
                    className="w-40 h-40 rounded-full border-4 border-transparent bg-slate-100 dark:bg-slate-800 object-cover shadow-inner"
                    onError={(e) => {
                       // Fallback to a high-quality UI avatar if unavatar fails
                       (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${displayName}&background=1d9bf0&color=fff&size=200`;
                    }}
                  />
                </div>
                {verified && (
                  <div className="absolute bottom-3 right-3 bg-white dark:bg-[#0f172a] p-1.5 rounded-full shadow-xl border border-slate-100 dark:border-slate-800">
                    <svg className="w-8 h-8 text-[#1d9bf0]" fill="currentColor" viewBox="0 0 22 22">
                      <g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.44 1.245s-.567 1.169-.582 1.815c.015.648.213 1.277.568 1.817.354.54.851.972 1.436 1.247-.223.607-.272 1.264-.141 1.897.131.634.437 1.218.882 1.687.47.445 1.054.75 1.687.882.633.132 1.29.084 1.897-.14.274.587.705 1.086 1.246 1.44s1.169.566 1.815.582c.645-.016 1.272-.213 1.813-.566s.968-.854 1.239-1.44c.607.224 1.265.272 1.9.14.633-.13 1.219-.436 1.688-.882.446-.47.75-1.054.882-1.687.132-.633.084-1.29-.14-1.897.587-.275 1.086-.705 1.44-1.246s.567-1.17.583-1.816zM9.357 14.707l-2.69-2.689 1.414-1.414 1.276 1.277 4.776-4.776 1.414 1.414-6.19 6.188z"></path></g>
                    </svg>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pb-4">
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-2xl hover:bg-[#1d9bf0] dark:hover:bg-[#1d9bf0] hover:text-white dark:hover:text-white transition-all shadow-xl inline-block active:scale-95"
                >
                  Visit Profile
                </a>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {displayName}
                </h3>
                {verified && (
                  <svg className="w-8 h-8 text-[#1d9bf0]" fill="currentColor" viewBox="0 0 22 22">
                    <g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.44 1.245s-.567 1.169-.582 1.815c.015.648.213 1.277.568 1.817.354.54.851.972 1.436 1.247-.223.607-.272 1.264-.141 1.897.131.634.437 1.218.882 1.687.47.445 1.054.75 1.687.882.633.132 1.29.084 1.897-.14.274.587.705 1.086 1.246 1.44s1.169.566 1.815.582c.645-.016 1.272-.213 1.813-.566s.968-.854 1.239-1.44c.607.224 1.265.272 1.9.14.633-.13 1.219-.436 1.688-.882.446-.47.75-1.054.882-1.687.132-.633.084-1.29-.14-1.897.587-.275 1.086-.705 1.44-1.246s.567-1.17.583-1.816zM9.357 14.707l-2.69-2.689 1.414-1.414 1.276 1.277 4.776-4.776 1.414 1.414-6.19 6.188z"></path></g>
                  </svg>
                )}
              </div>
              <p className="text-2xl text-slate-500 font-bold">@{username}</p>
            </div>
          </div>
        </div>

        {/* Minimalist Footer Link */}
        <div 
          className="mt-12 p-8 bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-between group cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors" 
          onClick={() => window.open(url, '_blank')}
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-[#1d9bf0] rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
               <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
               </svg>
            </div>
            <div>
              <p className="text-white font-black text-xl">Official Presence</p>
              <p className="text-slate-400 font-bold">Follow @{username} for real-time updates</p>
            </div>
          </div>
          <div className="bg-white/10 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwitterSection;
