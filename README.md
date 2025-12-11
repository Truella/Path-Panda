# PathPanda

A comprehensive onboarding tour solution that helps guide users through your web applications with interactive, step-by-step walkthroughs.

## 📁 Repository Structure

This repository contains two main components:

```
pathpanda/
├── path_panda/          # Marketing pages and control dashboard
└── path_panda_widget/   # Embeddable tour widget
```

###  (`/path_panda`)

The application includes:
- **Marketing Pages**: Landing page, about us, and documentation
- **Control Dashboard**: Tour creation, management, and analytics interface
- **User Authentication**: Sign up, login, and account management
- **Analytics**: Track tour performance, completion rates, and user engagement

**Tech Stack:**
- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

### Widget (`/path_panda_widget`)

The embeddable widget that runs on client websites:
- **Tour Engine**: Handles tour logic, step progression, and user interactions
- **UI Components**: Tooltips, and step indicators
- **Lightweight**: Optimized for minimal bundle size

**Tech Stack:**
- Vanilla JavaScript (for maximum compatibility)
- CSS (modular and scoped)
- Hosted on Cloudflare Pages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Truella/Path-Panda.git
cd pathpanda
```

2. Install dependencies for the dashboard:
```bash
cd path_panda
npm install
```

3. Install dependencies for the widget:
```bash
cd ../path_panda_widget
npm install
```

### Development

#### Running the Next Js application

```bash
cd path_panda
npm run dev
```

The webpage will be available at `http://localhost:3000`

#### Running the Widget

```bash
cd path_panda_widget
npm run dev
```

The widget will be available at `http://localhost:5174`


## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Hosted on [Vercel](https://vercel.com/) and [Cloudflare Pages](https://pages.cloudflare.com/)

Made with ❤️ by the PathPanda Team
