
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
        if (!response.ok) throw new Error('Failed to fetch repositories');
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
    <section className="glass-card p-6 rounded-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          GitHub Repositories
        </h2>
        {repos.length > 0 && (
          <a href={SETTINGS.socials.github.url} target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View Profile →</a>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center py-8">Error loading repositories: {error}</p>
      ) : repos.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-100 dark:bg-slate-800/20">
          <svg className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          <p className="text-slate-600 dark:text-slate-400 font-medium">No repositories found.</p>
          <p className="text-slate-500 dark:text-slate-600 text-sm mt-1">This user hasn't shared any public code yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <a 
              key={repo.id} 
              href={repo.html_url} 
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-white dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition border border-slate-200 dark:border-transparent hover:border-blue-500/50 group"
            >
              <h3 className="font-semibold text-blue-600 dark:text-blue-300 group-hover:text-blue-500 dark:group-hover:text-blue-200">{repo.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 line-clamp-2 min-h-[2.5rem]">{repo.description || 'No description provided.'}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  {repo.language || 'Misc'}
                </span>
                <span className="flex items-center gap-1">
                  ★ {repo.stargazers_count}
                </span>
                <span>
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
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