
export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

export interface Tweet {
  id: string;
  text: string;
  createdAt: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
}
