# Easeway Medicare Physiotherapy Clinic - Next.js App

Welcome to the **Easeway Medicare Physiotherapy Clinic** website! This is a modern, performant Next.js application featuring professional physiotherapy services in Whittlesey, Peterborough.

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

## ✨ Features

- **Modern Next.js 14** with App Router
- **Server-Side Rendering** for better SEO and performance
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** using Framer Motion
- **Interactive Components** including custom cursor, testimonials carousel
- **Blog Integration** with WordPress API
- **Contact Forms** with EmailJS integration
- **Newsletter Signup** with Mailchimp integration
- **Optimized Images** and static assets

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **API Requests**: React Query (@tanstack/react-query)
- **Icons**: Lucide React
- **Carousel**: Swiper.js
- **Email**: EmailJS
- **Newsletter**: Mailchimp

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Client-side providers
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── home/         # Home page components
│   │   ├── shared/       # Shared components (Header, Footer)
│   │   ├── reusables/    # Reusable components
│   │   └── animations/   # Animation components
│   ├── hooks/            # Custom React hooks
│   ├── data/             # Static data and content
│   ├── api/              # API utilities and configurations
│   └── assets/           # Fonts and static assets
├── public/               # Static files (images, icons, etc.)
└── next.config.js        # Next.js configuration
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=https://easewaymedicare.co.uk
NEXT_PUBLIC_WP_API_BASE=your_wordpress_api_base_url
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set your environment variables in the Vercel dashboard
3. Deploy automatically on every push to main branch

### Other Platforms

```bash
# Build the application
npm run build

# The `.next` folder contains the optimized build
```

## 🎨 Customization

### Colors

The primary color scheme uses:

- Primary Red: `#FF3133`
- Background: `#EDF2F6`
- Text: `#0E2127`

### Fonts

- **Axiforma**: Primary font family
- **American Purpose**: Display font for headings

### Content

Update content in:

- `src/data/data.ts` - Services, testimonials, contact info
- `src/data/blogData.ts` - Blog posts data

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build
```

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Automatic optimization with Next.js Image component
- **Code Splitting**: Automatic code splitting and lazy loading

## 🔧 Troubleshooting

### Common Issues

1. **Font Loading Issues**: Ensure all font files exist in `src/assets/fonts/`
2. **Build Errors**: Check TypeScript types and fix any linting errors
3. **Environment Variables**: Ensure all required environment variables are set

### Development Tips

- Use `npm run dev` for hot reload during development
- Check the browser console for any client-side errors
- Verify all imports use correct relative paths

## 📞 Support

For technical support or feature requests, please contact the development team.

## 📄 License

© 2025 Easeway Medicare Physiotherapy Clinic. All rights reserved.
