# YuLife Website v1

A modern Next.js website with a Figma-driven design system, headless CMS architecture, and GSAP animations.

## Tech Stack

- **Next.js 16** (App Router) with TypeScript
- **Tailwind CSS v4** with design tokens
- **GSAP** for smooth animations
- **Headless CMS** abstraction (ready for Contentful, Sanity, etc.)
- **Figma Console MCP** for design-to-code sync

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── products/          # Products page
│   ├── solutions/         # Solutions page
│   ├── pricing/           # Pricing page
│   ├── about/             # About page
│   └── blog/              # Blog page
├── components/
│   ├── animations/        # GSAP animation components
│   ├── layout/            # Header, Footer
│   └── sections/          # Hero, Cards, Text sections
├── design-system/
│   ├── tokens/            # Design tokens (colors, typography, spacing, etc.)
│   └── primitives/        # Base UI components (Button, Text, Stack, Card, etc.)
└── lib/
    ├── cms/               # CMS abstraction layer
    └── gsap/              # GSAP utilities and hooks
```

## Design System

Design tokens in `src/design-system/tokens/` mirror Figma variable collections and feed into Tailwind via CSS custom properties in `globals.css`.

To sync with Figma:
1. Connect via Figma Console MCP
2. Use `figma_get_variables` to read design tokens
3. Update token files to match

## Animations

GSAP is configured for smooth animations. See [docs/ANIMATIONS.md](docs/ANIMATIONS.md) for usage examples.

Quick example:
```tsx
import { FadeIn } from "@/components/animations";

<FadeIn scrollTrigger delay={0.2}>
  <Text variant="heading-lg">Animated content</Text>
</FadeIn>
```

## CMS Integration

The CMS layer is abstracted in `src/lib/cms/`. Currently using mock data for development.

To integrate a real CMS:
1. Create a new client (e.g., `contentful-client.ts`)
2. Implement the `CMSClient` interface
3. Add to the factory in `client.ts`
4. Set `CMS_PROVIDER` in `.env`

## Build & Deploy

```bash
npm run build       # Production build
npm run start       # Start production server
```

Deploy to Vercel, Netlify, or any Node.js hosting platform.

## Documentation

- [Grid System Guide](docs/GRID.md) - 12-column grid matching Figma
- [Animation Guide](docs/ANIMATIONS.md) - GSAP animation usage
- [Font Integration Guide](docs/FONTS.md) - Custom web fonts setup
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind v4 Docs](https://tailwindcss.com/docs)
- [GSAP Docs](https://greensock.com/docs/)
