import React, { useState, useEffect } from 'react';
import { SETTINGS } from '../settings';
import { Repository } from '../types';

interface GitHubSectionProps {
  limit?: number;
}

const GitHubSection: React.FC<GitHubSectionProps> = ({ limit }) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const username = SETTINGS.socials.github.username;
        if (!username) {
          setRepos([]);
          setLoading(false);
          return;
        }
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        if (!response.ok) {
          if (response.status === 403) throw new Error('API Rate Limited (Try again later)');
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(limit ? data.slice(0, limit) : data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [limit]);

  return (
    <section className="glass-card p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <h2 className="text-xl md:text-3xl font-black flex items-center gap-3">
          <div className="bg-slate-900 dark:bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl text-white dark:text-slate-900">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </div>
          GitHub Repos
        </h2>
        {repos.length > 0 && (
          <a href={SETTINGS.socials.github.url} target="_blank" rel="noreferrer" className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
            Profile →
          </a>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Scanning...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-red-500/5 rounded-2xl border border-red-500/20">
          <p className="text-red-500 font-bold text-sm">Connection Error</p>
          <button onClick={() => window.location.reload()} className="mt-3 px-4 py-1.5 bg-red-600 text-white rounded-lg font-bold text-[10px]">Retry</button>
        </div>
      ) : repos.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/10">
          <p className="text-slate-400 font-black text-sm">No public repos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          {repos.map((repo) => (
            <a 
              key={repo.id} 
              href={repo.html_url} 
              target="_blank"
              rel="noreferrer"
              className="p-4 md:p-6 bg-white dark:bg-slate-900/40 rounded-xl md:rounded-[1.5rem] hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all border border-slate-100 dark:border-slate-800/50 hover:border-blue-500/30 group shadow-sm active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-base md:text-lg text-blue-600 dark:text-blue-400 line-clamp-1 group-hover:underline">
                  {repo.name}
                </h3>
                <div className="flex items-center gap-1 text-[9px] font-black bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                  <span>★</span>
                  {repo.stargazers_count}
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mt-1 line-clamp-2 h-8 md:h-10 font-medium leading-relaxed">
                {repo.description || 'Exploring the boundaries of technology.'}
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                   <span className="text-[9px] font-black uppercase text-slate-400">{repo.language || 'Code'}</span>
                </div>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                  {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default GitHubSection;