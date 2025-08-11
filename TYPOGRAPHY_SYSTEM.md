# Typography System Documentation

## Overview

This application now uses a consistent typography system built on top of Tailwind CSS with custom font sizes and responsive breakpoints.

## Font Families

- **Axiforma**: Primary font for headings (h1-h6)
- **Uber Move**: Primary font for body text, buttons, and UI elements
- **American Purpose**: Display font for special cases

## Typography Classes

### Headings

#### H1 - Main Page Titles

- **Desktop**: `text-h1-desktop` (56px, font-weight: 700)
- **Mobile**: `text-h1-mobile` (40px, font-weight: 700)
- **Usage**: `className="text-h1-mobile md:text-h1-desktop font-axiforma"`

#### H2 - Section Titles

- **Desktop**: `text-h2-desktop` (40px, font-weight: 600)
- **Mobile**: `text-h2-mobile` (32px, font-weight: 600)
- **Usage**: `className="text-h2-mobile md:text-h2-desktop font-axiforma"`

#### H3 - Subsection Titles

- **Desktop**: `text-h3-desktop` (32px, font-weight: 600)
- **Mobile**: `text-h3-mobile` (24px, font-weight: 600)
- **Usage**: `className="text-h3-mobile md:text-h3-desktop font-axiforma"`

#### H4 - Card Titles

- **Desktop**: `text-h4-desktop` (24px, font-weight: 600)
- **Mobile**: `text-h4-mobile` (20px, font-weight: 600)
- **Usage**: `className="text-h4-mobile md:text-h4-desktop font-axiforma"`

#### H5 - Small Headings

- **Desktop**: `text-h5-desktop` (20px, font-weight: 500)
- **Mobile**: `text-h5-mobile` (18px, font-weight: 500)
- **Usage**: `className="text-h5-mobile md:text-h5-desktop font-axiforma"`

#### H6 - Micro Headings

- **Desktop**: `text-h6-desktop` (18px, font-weight: 500)
- **Mobile**: `text-h6-mobile` (16px, font-weight: 500)
- **Usage**: `className="text-h6-mobile md:text-h6-desktop font-axiforma"`

### Body Text

#### Body Large - Important Descriptions

- **Size**: `text-body-lg` (18px, font-weight: 400)
- **Usage**: `className="text-body-lg font-uber text-gray-600"`

#### Body - Standard Text

- **Size**: `text-body` (16px, font-weight: 400)
- **Usage**: `className="text-body font-uber text-gray-600"`

#### Body Small - Secondary Text

- **Size**: `text-body-sm` (14px, font-weight: 400)
- **Usage**: `className="text-body-sm font-uber text-gray-600"`

#### Body Extra Small - Captions

- **Size**: `text-body-xs` (12px, font-weight: 400)
- **Usage**: `className="text-body-xs font-uber text-gray-500"`

### Button Text

#### Button Large

- **Size**: `text-button-lg` (16px, font-weight: 600)
- **Usage**: `className="text-button-lg font-uber"`

#### Button Standard

- **Size**: `text-button` (14px, font-weight: 600)
- **Usage**: `className="text-button font-uber"`

#### Button Small

- **Size**: `text-button-sm` (12px, font-weight: 600)
- **Usage**: `className="text-button-sm font-uber"`

## Typography Components

For easier implementation, use the provided Typography components:

```tsx
import { H1, H2, H3, H4, H5, H6, Body, BodyLarge, BodySmall, BodyXSmall } from '../ui/Typography';

// Usage examples
<H1 className="text-center">Main Title</H1>
<H2 className="mb-4">Section Title</H2>
<Body>Standard paragraph text</Body>
<BodySmall className="text-gray-500">Secondary information</BodySmall>
```

## Responsive Behavior

All typography classes follow a mobile-first responsive approach:

- **Base size**: Mobile/small screen size
- **md breakpoint**: Desktop size (768px+)

Example:

```tsx
className = "text-h2-mobile md:text-h1-desktop";
// Mobile: 32px, Desktop: 56px
```

## Color Guidelines

### Headings

- Primary headings: `text-gray-900`
- Secondary headings: `text-gray-700`

### Body Text

- Primary text: `text-gray-600`
- Secondary text: `text-gray-500`
- Muted text: `text-gray-400`

### Brand Colors

- Primary brand: `text-[#FF3133]`
- Dark brand: `text-[#0E2127]`

## Best Practices

1. **Consistency**: Always use the defined typography classes
2. **Hierarchy**: Maintain proper heading hierarchy (h1 > h2 > h3...)
3. **Responsive**: Use responsive classes for optimal mobile experience
4. **Font Family**: Use `font-axiforma` for headings, `font-uber` for body text
5. **Line Height**: Typography classes include appropriate line heights
6. **Accessibility**: Maintain proper contrast ratios with chosen colors

## Migration Guide

### Old vs New Classes

```tsx
// OLD
className = "text-xl font-semibold";
// NEW
className = "text-h4-mobile md:text-h3-desktop font-axiforma";

// OLD
className = "text-sm text-gray-600";
// NEW
className = "text-body-sm text-gray-600 font-uber";

// OLD
className = "text-2xl font-bold";
// NEW
className = "text-h3-mobile md:text-h2-desktop font-axiforma";
```

## Customization

To add new typography sizes, update the Tailwind config:

```js
// tailwind.config.js
fontSize: {
  'custom-size': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
}
```

## Support

For questions about the typography system, refer to this documentation or check the Typography component implementations in `src/components/ui/Typography.tsx`.
