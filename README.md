# Portfolio Website

A modern, professional portfolio website built with Next.js, TypeScript, and
Tailwind CSS.

## Features

- 🎨 Modern and attractive UI/UX design
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js
- 🎭 Smooth animations with Framer Motion
- 🌙 Dark theme optimized
- 📄 Resume download functionality

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

Build output is in the `out/` folder.

## Customization

### Add Profile Picture and Resume

1. **Profile Picture**: Place in `public/` folder as `profile.jpg` or
   `profile.png`
2. **Resume PDF**: Place in `public/` folder as `resume.pdf`

### Update Content

- **Hero Section**: `components/Hero.tsx`
- **About Section**: `components/About.tsx`
- **Skills**: `components/Skills.tsx`
- **Experience**: `components/Experience.tsx`
- **Projects**: `components/Projects.tsx`
- **Contact**: `components/Contact.tsx` and `components/Footer.tsx`

### Update Colors

Edit `tailwind.config.ts` to customize the color scheme.

## Deployment

### Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project" → Import your repository
3. Click Deploy
4. **Done!** Every push to `main` will auto-deploy

See [`.github/DEPLOYMENT.md`](.github/DEPLOYMENT.md) for details.

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Check code quality
npm run format       # Format code
npm run type-check   # Verify TypeScript
npm run validate     # Run all checks
```

## License

MIT License
