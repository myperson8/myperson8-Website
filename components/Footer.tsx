
import React from 'react';
import { SETTINGS } from '../settings';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center flex-wrap gap-6 mb-8 text-slate-500 dark:text-slate-400">
          <a href={SETTINGS.socials.github.url} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-white transition">GitHub</a>
          <a href={SETTINGS.socials.youtube.url} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-white transition">YouTube</a>
          <a href={SETTINGS.socials.twitch.url} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-white transition">Twitch</a>
          <a href={SETTINGS.socials.twitter.url} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-white transition">Twitter</a>
        </div>
        
        <p className="text-slate-600 dark:text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {SETTINGS.profile.displayName}. All rights reserved.
        </p>
        <p className="text-slate-400 dark:text-slate-600 text-xs mt-2">
          Designed for {SETTINGS.profile.name} • Built with React & Tailwind
        </p>
      </div>
    </footer>
  );
};

export default Footer;