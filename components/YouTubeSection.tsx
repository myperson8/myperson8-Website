import React, { useState, useEffect } from 'react';
import { SETTINGS } from '../settings';

interface YouTubeVideo {
  guid: string;
  title: string;
  link: string;
  thumbnail: string;
  pubDate: string;
}

const YouTubeSection: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const handle = SETTINGS.socials.youtube.handle.replace('@', '');

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?user=${handle}`;
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const formatted = data.items.slice(0, 3).map((item: any) => ({
            guid: item.guid.split(':')[2] || item.link.split('v=')[1],
            title: item.title,
            link: item.link,
            thumbnail: item.thumbnail,
            pubDate: item.pubDate
          }));
          setVideos(formatted);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error("YouTube Detection Failed:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [handle]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-24">
        <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Scanning Channel...</p>
      </div>
    );
  }

  const hasVideos = videos.length > 0;

  return (
    <section id="youtube" className="space-y-4 md:space-y-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 bg-red-600/5 p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-red-500/10 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6">
          <div className="bg-red-600 p-2.5 md:p-4 rounded-xl md:rounded-2xl shadow-lg">
            <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-black">YouTube</h2>
            <p className="text-[10px] md:text-base text-slate-500 dark:text-slate-400 uppercase tracking-widest">@{handle}</p>
          </div>
        </div>
        <a href={SETTINGS.socials.youtube.url} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-2 md:py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all text-xs md:text-base shadow-lg active:scale-95">
          Channel →
        </a>
      </div>

      {!hasVideos ? (
        <div className="glass-card p-12 md:p-24 rounded-2xl md:rounded-[2.5rem] text-center border-dashed border-2 border-slate-200 dark:border-slate-800">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Content Found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {videos.map((video) => (
            <div key={video.guid} className="glass-card overflow-hidden rounded-2xl md:rounded-[2rem] group border border-slate-100 dark:border-slate-800/50 hover:border-red-600/50 transition-all duration-300 shadow-sm">
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <a href={video.link} target="_blank" rel="noreferrer" className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-red-600 p-2.5 rounded-full"><svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                </a>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="font-bold text-sm md:text-lg text-slate-800 dark:text-white line-clamp-2 h-10 md:h-14 group-hover:text-red-600 transition-colors leading-tight">
                  {video.title}
                </h3>
                <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800/50 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-slate-400">{new Date(video.pubDate).toLocaleDateString()}</span>
                  <a href={video.link} target="_blank" rel="noreferrer" className="text-[9px] font-black text-red-600 hover:underline uppercase tracking-wider">Watch</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default YouTubeSection;