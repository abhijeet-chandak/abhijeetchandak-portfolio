# Build Guide

## Build Commands

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `out/` folder.

### Clean Build

```bash
# macOS/Linux
npm run clean

# Windows
npm run clean:win
```

Removes `.next` and `out` directories for a fresh build.

## Build Optimizations

The project includes:

- **Code Splitting**: Automatic chunk optimization
- **Minification**: SWC minifier for JavaScript and CSS
- **Tree Shaking**: Unused code elimination
- **Console Removal**: `console.log()` removed in production
- **Post-Build Optimization**: Automatic HTML optimization

## Output Folder

The `out/` folder contains all static files ready for deployment:

```
out/
├── _next/              # Next.js static assets
├── index.html          # Main HTML file
├── resume.pdf          # Resume PDF (from public/)
└── profile.jpg         # Profile image (from public/)
```

## Deployment

The `out/` folder can be deployed to any static hosting service:

- **Vercel**: Automatic deployment (recommended)
- **Netlify**: Drag and drop the `out/` folder
- **GitHub Pages**: Push `out/` contents to `gh-pages` branch
- **Any static host**: Upload `out/` folder contents

## Troubleshooting

### Build Fails

1. Clear cache: `npm run clean` (or `npm run clean:win` on Windows)
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Check for errors: `npm run lint`

### Large Build Size

1. Run `npm run build` and check the post-build analysis
2. Optimize images in the `public/` folder
3. Remove unused dependencies
