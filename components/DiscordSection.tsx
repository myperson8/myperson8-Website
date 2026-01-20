import React from 'react';
import { SETTINGS } from '../settings';

const DiscordSection: React.FC = () => {
  const { inviteUrl, serverId } = SETTINGS.socials.discord;
  const hasDiscord = (!!inviteUrl && inviteUrl !== "") || (!!serverId && serverId !== "");

  if (!hasDiscord) {
    return (
      <section className="max-w-4xl mx-auto flex flex-col items-center text-center py-16 md:py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] md:rounded-[4rem] animate-in fade-in duration-1000 px-6">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-100 dark:bg-slate-800/50 rounded-xl md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 text-slate-400">
          <svg className="w-8 h-8 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Discord Not Configured</h2>
        <p className="text-lg md:text-xl text-slate-500 max-w-md mx-auto font-medium">
          Settings missing. Configure your invite URL to activate the community hub.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 px-4 md:px-0">
      <div className="text-center mb-10 md:mb-16 w-full">
        <div className="relative inline-block mb-6 md:mb-10">
          <div className="absolute inset-0 bg-[#5865F2] blur-[60px] md:blur-[100px] opacity-30"></div>
          <div className="relative w-20 h-20 md:w-28 md:h-28 bg-[#5865F2] rounded-2xl md:rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl hover:scale-105 transition-all duration-500">
            <svg className="w-10 h-10 md:w-16 md:h-16 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z"/></svg>
          </div>
        </div>
        <h2 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter">Community</h2>
        <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 md:mb-16 font-medium leading-relaxed">
          Join a growing community. Participate in events and chat with the squad.
        </p>

        {inviteUrl && (
          <a 
            href={inviteUrl} 
            target="_blank" 
            rel="noreferrer"
            className="w-full sm:w-auto group px-10 md:px-20 py-4 md:py-8 bg-[#5865F2] hover:bg-[#4752C4] transition-all rounded-[1.5rem] md:rounded-[3rem] font-black text-xl md:text-3xl inline-flex items-center justify-center gap-4 md:gap-6 shadow-xl active:scale-95 text-white"
          >
            <svg className="w-6 h-6 md:w-10 md:h-10 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            Accept Invite
          </a>
        )}
      </div>
    </section>
  );
};

export default DiscordSection;