# Easeway Medicare Physiotherapy Clinic - Next.js Migration

This project has been successfully migrated from Vite/React to Next.js 14 with the App Router.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router (NEW)
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Client-side providers
├── src/                   # Components and utilities (EXISTING)
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── data/             # Static data
│   └── api/              # API utilities
├── public/               # Static assets
└── next.config.js        # Next.js configuration
```

## 🔄 Migration Changes

### ✅ What was migrated:

- **Vite → Next.js 14**: Modern App Router with file-based routing
- **SEO**: React Helmet → Next.js built-in metadata API
- **Components**: All existing components work without changes
- **Styling**: Tailwind CSS configuration maintained
- **Dependencies**: React Query, Framer Motion, Lucide React preserved

### ✅ Key improvements:

- **Better SEO**: Server-side rendering with metadata API
- **Performance**: Automatic code splitting and optimizations
- **Development**: Hot reload and better error messages
- **Production**: Optimized builds with static generation

### 🗑️ Removed dependencies:

- `vite` and Vite plugins
- `react-helmet-async` (replaced with Next.js metadata)
- Vite-specific configurations

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Connect your repository to Vercel
# Automatic deployments on every push to main branch
```

### Other platforms

```bash
# Build the application
npm run build

# The `out` folder contains the static files
```

## 🛠️ Development

- **Hot Reload**: Automatic browser refresh on file changes
- **TypeScript**: Full TypeScript support with better IntelliSense
- **Error Handling**: Enhanced error boundaries and debugging
- **API Routes**: Built-in API routes support (if needed)

## 📝 Notes

- All existing components remain functional
- Static assets are served from the `public` directory
- The WordPress API integration is preserved
- All animations and interactions work as before
- Tailwind CSS configuration is maintained

## 🐛 Troubleshooting

If you encounter any issues:

1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check the browser console for any client-side errors
4. Verify all imports use correct relative paths

## 📚 Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Deployment Guide](https://nextjs.org/docs/deployment)
