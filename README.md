# myperson8 - Digital Portfolio

A modern, responsive personal hub featuring GitHub repositories, YouTube content, Twitch streams, and social connections.

## 🌟 Features

- **Dynamic Hero Section** - Personalized introduction with avatar, bio, and call-to-action buttons
- **GitHub Integration** - Showcase your repositories and contributions
- **YouTube Section** - Display your latest videos
- **Twitch Integration** - Link to your streams
- **Social Links** - Connect across Twitter, Discord, and other platforms
- **Responsive Design** - Mobile-friendly layout that works on all devices
- **Dark Mode Support** - Beautiful dark theme included
- **Smooth Animations** - Modern animations and transitions throughout

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform

## 📁 Project Structure

```
├── components/
│   ├── DiscordSection.tsx      # Discord community links
│   ├── Footer.tsx              # Footer component
│   ├── GitHubSection.tsx        # GitHub repository showcase
│   ├── Header.tsx              # Navigation header
│   ├── TwitchSection.tsx        # Twitch stream integration
│   ├── TwitterSection.tsx       # Twitter feed integration
│   └── YouTubeSection.tsx       # YouTube video showcase
├── App.tsx                     # Main application component
├── index.tsx                   # React entry point
├── settings.ts                 # Configuration settings
├── types.ts                    # TypeScript type definitions
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/myperson8/myperson8-Website.git
cd myperson8-Website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or the port Vite assigns).

## 📝 Configuration

Edit `settings.ts` to customize:
- Your profile information (name, bio, avatar)
- Social media links
- GitHub username
- YouTube channel
- Twitch channel
- Twitter handle
- Discord server

## 🔨 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Customization

### Profile Settings

Update `settings.ts` with your personal information:
- Display name and bio
- Avatar URL
- Social media usernames and URLs

### Styling

The project uses Tailwind CSS. Modify component files to adjust colors, spacing, and layouts.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will auto-detect Vite configuration
4. Your site will be deployed automatically on each push

### Manual Deployment

```bash
npm run build
# Upload the `dist` folder to your hosting provider
```

## 🤝 Contributing

Feel free to fork this project and customize it for your own personal portfolio!

## 📄 License

See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Portfolio**: https://myperson8.dev
- **GitHub**: https://github.com/myperson8
- **YouTube**: https://youtube.com/@myperson8

## 💬 Support

For questions or issues, please open an issue on GitHub or reach out on Discord.

---

**Built with ❤️ by myperson8**
