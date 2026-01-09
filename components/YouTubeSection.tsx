
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
        // We use the RSS feed for the user handle. 
        // Note: For newer handles, sometimes 'user=' doesn't work and 'channel_id=' is needed,
        // but since we are auto-detecting without IDs, we try the legacy RSS user endpoint.
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?user=${handle}`;
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
          // Detect latest 3 videos
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
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Scanning channel for videos...</p>
      </div>
    );
  }

  const hasVideos = videos.length > 0;

  return (
    <section id="youtube" className="space-y-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-red-600/5 p-8 rounded-[2rem] border border-red-500/10">
        <div className="flex items-center gap-6">
          <div className="bg-red-600 p-4 rounded-2xl shadow-xl">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-black">YouTube Channel</h2>
            <p className="text-slate-500 dark:text-slate-400">Content detected from @{handle}</p>
          </div>
        </div>
        <a href={SETTINGS.socials.youtube.url} target="_blank" rel="noreferrer" className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold transition-all shadow-lg active:scale-95">
          Visit Channel
        </a>
      </div>

      {!hasVideos ? (
        <div className="glass-card p-24 rounded-[2.5rem] text-center border-dashed border-2 border-slate-300 dark:border-slate-800">
          <p className="text-2xl font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Empty</p>
          <p className="text-slate-500 dark:text-slate-500 mt-2">No videos found on this channel yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.guid} className="glass-card overflow-hidden rounded-[2rem] group border border-slate-200 dark:border-slate-800 hover:border-red-600/50 transition-all duration-300">
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <a href={video.link} target="_blank" rel="noreferrer" className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-red-600 p-3 rounded-full"><svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                </a>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white line-clamp-2 h-14 group-hover:text-red-600 transition-colors">
                  {video.title}
                </h3>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400">{new Date(video.pubDate).toLocaleDateString()}</span>
                  <a href={video.link} target="_blank" rel="noreferrer" className="text-[10px] font-black text-red-600 hover:underline uppercase">Watch Now</a>
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
